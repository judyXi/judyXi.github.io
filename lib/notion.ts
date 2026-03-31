import { Client } from "@notionhq/client";
import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// ── Notion 客戶端 ──────────────────────────────────────
const notion = new Client({ auth: process.env.NOTION_TOKEN });

const DATABASE_ID   = process.env.NOTION_DATABASE_ID!;
const BLOG_CHANNEL  = "32e6cd30-5ec1-80c0-9a43-e726a6cf9ba8"; // BLOG 頻道 ID

// ── 類型定義 ───────────────────────────────────────────
export interface Post {
  id:         string;
  slug:       string;
  title:      string;
  excerpt:    string;
  content:    string;
  date:       string;
  readTime:   number;
  category:   string;
  coverColor: string;
  tags:       string[];
  featured?:  boolean;
}

// ── 輔助：文章標題轉 slug ──────────────────────────────
function titleToSlug(title: string, id: string): string {
  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]/g, "")
    .substring(0, 60);
  // 如果標題全是特殊字符，退回使用 page id
  return slug || id.replace(/-/g, "").substring(0, 16);
}

// ── 輔助：依標籤決定封面顏色 ──────────────────────────
const COVER_MAP: Record<string, string> = {
  "設計":     "bg-[#C4B5FD]",
  "旅行":     "bg-[#FF6B6B]",
  "生活":     "bg-[#FFD93D]",
  "美食":     "bg-[#FF6B6B]",
  "閱讀":     "bg-[#FFD93D]",
  "攝影":     "bg-[#C4B5FD]",
  "心理學效應":"bg-[#C4B5FD]",
  "歷史奇聞": "bg-[#FF6B6B]",
  "宇宙與天文":"bg-[#C4B5FD]",
};
const COVER_FALLBACK = ["bg-[#C4B5FD]", "bg-[#FF6B6B]", "bg-[#FFD93D]"];
function getCoverColor(tags: string[], idx: number): string {
  for (const t of tags) {
    if (COVER_MAP[t]) return COVER_MAP[t];
  }
  return COVER_FALLBACK[idx % COVER_FALLBACK.length];
}

// ── 輔助：讀取 RichText 純文字 ────────────────────────
function richText(items: RichTextItemResponse[]): string {
  return items.map((t) => t.plain_text).join("");
}

// ── 輔助：Notion Blocks → Markdown 字串 ──────────────
function blocksToMarkdown(blocks: BlockObjectResponse[]): string {
  const lines: string[] = [];
  let listCounter = 0;

  for (const block of blocks) {
    switch (block.type) {
      case "paragraph": {
        const text = richText(block.paragraph.rich_text);
        lines.push(text ? text + "\n" : "");
        listCounter = 0;
        break;
      }
      case "heading_1": {
        lines.push("# " + richText(block.heading_1.rich_text) + "\n");
        listCounter = 0;
        break;
      }
      case "heading_2": {
        lines.push("## " + richText(block.heading_2.rich_text) + "\n");
        listCounter = 0;
        break;
      }
      case "heading_3": {
        lines.push("### " + richText(block.heading_3.rich_text) + "\n");
        listCounter = 0;
        break;
      }
      case "bulleted_list_item": {
        lines.push("- " + richText(block.bulleted_list_item.rich_text));
        listCounter = 0;
        break;
      }
      case "numbered_list_item": {
        listCounter++;
        lines.push(`${listCounter}. ` + richText(block.numbered_list_item.rich_text));
        break;
      }
      case "quote": {
        lines.push("> " + richText(block.quote.rich_text) + "\n");
        listCounter = 0;
        break;
      }
      case "callout": {
        lines.push("💡 " + richText(block.callout.rich_text) + "\n");
        listCounter = 0;
        break;
      }
      case "divider": {
        lines.push("---\n");
        listCounter = 0;
        break;
      }
      case "code": {
        const lang = block.code.language || "";
        lines.push("```" + lang + "\n" + richText(block.code.rich_text) + "\n```\n");
        listCounter = 0;
        break;
      }
      default:
        listCounter = 0;
        break;
    }
  }
  return lines.join("\n");
}

// ── 計算閱讀時間（約每分鐘 400 字）────────────────────
function calcReadTime(text: string): number {
  const words = text.replace(/\s+/g, " ").split(" ").length;
  return Math.max(1, Math.ceil(words / 400));
}

// ─────────────────────────────────────────────────────
// 主要函式：取得所有已發布的部落格文章
// ─────────────────────────────────────────────────────
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          // 只抓屬於 BLOG 頻道的文章
          {
            property: "Channel",
            relation: { contains: BLOG_CHANNEL },
          },
          // 只抓 Completed 或 Ready to Publish
          {
            or: [
              { property: "Status", status: { equals: "Completed" } },
              { property: "Status", status: { equals: "Ready to Publish" } },
            ],
          },
        ],
      },
      sorts: [{ property: "Publish Date", direction: "descending" }],
    });

    const posts: Post[] = res.results.map((page, idx) => {
      const p = page as PageObjectResponse;

      // 標題
      const nameProp  = p.properties["Name"];
      const title = nameProp?.type === "title"
        ? richText(nameProp.title) : "（無標題）";

      // 摘要
      const descProp = p.properties["Description"];
      const excerpt = descProp?.type === "rich_text"
        ? richText(descProp.rich_text) : "";

      // 標籤
      const tagsProp = p.properties["Tags"];
      const tags = tagsProp?.type === "multi_select"
        ? tagsProp.multi_select.map((t) => t.name) : [];

      // 日期
      const dateProp = p.properties["Publish Date"];
      const date = dateProp?.type === "date" && dateProp.date
        ? dateProp.date.start
        : p.created_time.split("T")[0];

      // 分類（取第一個標籤，沒有則「其他」）
      const category = tags[0] || "其他";

      return {
        id:         p.id,
        slug:       titleToSlug(title, p.id),
        title,
        excerpt,
        content:    "",       // 詳細頁才載入
        date,
        readTime:   5,        // 詳細頁才計算
        category,
        coverColor: getCoverColor(tags, idx),
        tags,
        featured:   idx === 0,
      };
    });

    return posts;
  } catch (err) {
    console.error("[Notion] getPosts error:", err);
    return [];
  }
}

// ─────────────────────────────────────────────────────
// 依 slug 取得單篇文章（含正文）
// ─────────────────────────────────────────────────────
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  const meta  = posts.find((p) => p.slug === slug);
  if (!meta) return null;

  try {
    // 讀取頁面 Blocks
    const blocksRes = await notion.blocks.children.list({
      block_id: meta.id,
      page_size: 100,
    });

    const content  = blocksToMarkdown(
      blocksRes.results as BlockObjectResponse[]
    );
    const readTime = calcReadTime(content);

    return { ...meta, content, readTime };
  } catch (err) {
    console.error("[Notion] getPostBySlug error:", err);
    return meta;
  }
}

// ─────────────────────────────────────────────────────
// 給 generateStaticParams 用：列出所有 slugs
// ─────────────────────────────────────────────────────
export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPosts();
  return posts.map((p) => p.slug);
}

export const categories = ["全部", "設計", "旅行", "生活", "美食", "閱讀", "攝影", "其他"];
