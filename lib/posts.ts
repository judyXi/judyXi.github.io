import fs from "fs";
import path from "path";

// ── Obsidian BLOG 資料夾路徑 ──────────────────────────
// Windows 反斜線 & 正斜線都支援
// 優先使用 Obsidian 路徑，不存在時 fallback 到專案內的 content/blog/
const RAW_PATH = process.env.OBSIDIAN_BLOG_PATH || "";
const OBSIDIAN_DIR = RAW_PATH.replace(/\\/g, "/");
const LOCAL_DIR = path.join(process.cwd(), "content", "blog");
const BLOG_DIR = (OBSIDIAN_DIR && fs.existsSync(OBSIDIAN_DIR)) ? OBSIDIAN_DIR : LOCAL_DIR;

// ── 類型定義 ───────────────────────────────────────────
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  category: string;
  coverColor: string;
  coverImage: string;
  tags: string[];
  featured?: boolean;
}

// ── Obsidian 圖片名稱 → public 檔名（自動轉換）──────
function toSafeImageName(obsidianName: string): string {
  return obsidianName.replace(/\s+/g, "-").toLowerCase();
}

// ── frontmatter 解析 ──────────────────────────────────
type FM = {
  title?: string;
  date?: string;
  tags?: string[];
  excerpt?: string;
  category?: string;
};
function parseFrontmatter(raw: string): { data: FM; content: string } {
  // 移除 BOM
  const cleaned = raw.replace(/^\uFEFF/, "");
  // Windows 換行統一
  const text = cleaned.replace(/\r\n/g, "\n");

  if (!text.startsWith("---")) return { data: {}, content: text };
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: text };

  const fmStr = text.slice(3, end).trim();
  const content = text.slice(end + 4).trim();
  const data: FM = {};

  const lines = fmStr.split("\n");
  let currentKey = "";
  for (const line of lines) {
    // YAML 列表項（如 tags 底下的 - 寵物）
    if (line.match(/^\s+-\s+/) && currentKey === "tags") {
      if (!data.tags) data.tags = [];
      data.tags.push(line.replace(/^\s+-\s+/, "").trim());
      continue;
    }
    const ci = line.indexOf(":");
    if (ci === -1) continue;
    const key = line.slice(0, ci).trim();
    const val = line.slice(ci + 1).trim();
    currentKey = key;
    if (key === "tags" && val) {
      // 行內格式 [寵物, 貓咪]
      data.tags = val.replace(/^\[/, "").replace(/\]$/, "")
        .split(",").map((v) => v.trim()).filter(Boolean);
    } else if (key === "title") data.title = val;
    else if (key === "date") data.date = val;
    else if (key === "excerpt") data.excerpt = val;
    else if (key === "category") data.category = val;
  }
  return { data, content };
}

// ── 將 Obsidian 圖片語法轉成 HTML img 標籤 ──────────
// 支援 ![[image.png]]、![[image.png|273]]、![alt](url) 三種格式
function convertImageEmbeds(content: string): string {
  return content
    // Obsidian ![[image.ext]] or ![[image.ext|size]]
    .replace(
      /!?\[\[([^\]|]+\.(png|jpg|jpeg|webp|gif))(?:\|[^\]]+)?\]\]/gi,
      (_, filename) => `\n\n<img src="/images/${toSafeImageName(filename)}" alt="${filename}" />\n\n`
    )
    // Standard Markdown ![alt](url) — strip Obsidian size hash (#400x300 etc.)
    .replace(
      /!\[([^\]]*)\]\(([^)\s]+)\)/g,
      (_, alt, url) => {
        const cleanUrl = url.replace(/#[^)]*$/, "");
        return `\n\n<img src="${cleanUrl}" alt="${alt}" />\n\n`;
      }
    )
    .replace(/\n{3,}/g, "\n\n");
}

// ── 從 processedContent 取第一張圖片 URL ─────────────
function extractCoverImage(content: string): string {
  const m = content.match(/<img\s+src="([^"]+)"/i);
  return m ? m[1] : "";
}

// ── 清除摘要中的 ** 符號和 HTML 標籤 ────────────────
function cleanExcerpt(text: string): string {
  return text.replace(/\*\*/g, "").replace(/<[^>]+>/g, "").trim();
}

// ── slug 產生（純 ASCII，避免 Turbopack bug）─────────
function simpleHash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h).toString(36);
}
function toSlug(title: string, filename: string): string {
  const a = title.toLowerCase().replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-")
    .replace(/^-|-$/g, "").substring(0, 60);
  if (a) return a;
  const b = filename.replace(/\.md$/i, "").toLowerCase()
    .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (b) return b;
  return "post-" + simpleHash(title);
}

// ── 從內容取標題 ─────────────────────────────────────
function extractTitle(content: string, filename: string): string {
  const m = content.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : filename.replace(/\.md$/i, "");
}

// ── 從內容取摘要 ─────────────────────────────────────
function extractExcerpt(content: string): string {
  for (const line of content.split("\n")) {
    const t = line.trim();
    // 跳過標題、圖片、分隔線、HTML 標籤
    if (t && !t.startsWith("#") && !t.startsWith("!") && !t.startsWith("---") && !t.startsWith("<img") && !t.startsWith("<")) {
      const clean = cleanExcerpt(t);
      if (clean) return clean.length > 120 ? clean.substring(0, 120) + "…" : clean;
    }
  }
  return "";
}

// ── 從檔名取日期 ─────────────────────────────────────
function extractDate(filename: string, filePath: string): string {
  const m = filename.match(/(\d{4}-\d{2}-\d{2})/);
  if (m) return m[1];
  try { return fs.statSync(filePath).mtime.toISOString().split("T")[0]; }
  catch { return new Date().toISOString().split("T")[0]; }
}

// ── 閱讀時間 ─────────────────────────────────────────
function calcReadTime(text: string): number {
  return Math.max(1, Math.ceil(text.replace(/\s+/g, "").length / 400));
}

// ── 封面顏色（Botanical 配色）─────────────────────────
const COVER: Record<string, string> = {
  設計: "bg-[#8C9A84]/15",  旅行: "bg-[#DCCFC2]/30",  生活: "bg-[#C27B66]/10",
  美食: "bg-[#C27B66]/15",  閱讀: "bg-[#DCCFC2]/40",  攝影: "bg-[#8C9A84]/10",
  寵物: "bg-[#DCCFC2]/30",  健康: "bg-[#8C9A84]/15",  AI: "bg-[#8C9A84]/15",
  科技: "bg-[#8C9A84]/15",
};
const FALLBACK = ["bg-[#DCCFC2]/30", "bg-[#8C9A84]/15", "bg-[#C27B66]/10"];
function coverColor(tags: string[], i: number): string {
  for (const t of tags) { if (COVER[t]) return COVER[t]; }
  return FALLBACK[i % FALLBACK.length];
}

// ─────────────────────────────────────────────────────
// 主要函式
// ─────────────────────────────────────────────────────
export function getPosts(): Post[] {
  try {
    console.log("[Obsidian] PATH =", BLOG_DIR);

    if (!fs.existsSync(BLOG_DIR)) {
      console.warn("[Obsidian] ❌ 資料夾不存在:", BLOG_DIR);
      const parent = path.dirname(BLOG_DIR);
      if (fs.existsSync(parent)) {
        console.log("[Obsidian] 上層有:", fs.readdirSync(parent));
      } else {
        console.log("[Obsidian] 上層也不存在:", parent);
      }
      return [];
    }

    const all = fs.readdirSync(BLOG_DIR);
    const files = all.filter((f) => f.toLowerCase().endsWith(".md"));
    console.log("[Obsidian] ✅", files.length, "篇 .md，全部檔案:", all);

    return files
      .map((fn, i) => {
        const fp = path.join(BLOG_DIR, fn);
        const raw = fs.readFileSync(fp, "utf-8");
        const { data: fm, content } = parseFrontmatter(raw);
        const title = fm.title || extractTitle(content, fn);
        const processedContent = convertImageEmbeds(content);
        const excerpt = fm.excerpt
          ? cleanExcerpt(fm.excerpt)
          : extractExcerpt(processedContent);
        const date = fm.date || extractDate(fn, fp);
        const tags = fm.tags || [];
        const category = fm.category || tags[0] || "其他";
        return {
          id: fn.replace(/\.md$/i, ""),
          slug: toSlug(title, fn),
          title,
          excerpt,
          content: processedContent,
          date,
          readTime: calcReadTime(processedContent),
          category,
          coverColor: coverColor(tags, i),
          coverImage: extractCoverImage(processedContent),
          tags,
          featured: i === 0,
        };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  } catch (err) {
    console.error("[Obsidian] getPosts error:", err);
    return [];
  }
}

export function getPostBySlug(slug: string): Post | null {
  return getPosts().find((p) => p.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return getPosts().map((p) => p.slug);
}

export const categories = ["全部", "設計", "旅行", "生活", "美食", "閱讀", "攝影", "寵物", "健康", "其他"];
