import React from "react";

function inline(text: string): React.ReactNode[] {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|==[^=]+==|~~[^~]+~~|\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) return <code key={i}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("==") && part.endsWith("==")) return <mark key={i}>{part.slice(2, -2)}</mark>;
    if (part.startsWith("~~") && part.endsWith("~~")) return <del key={i}>{part.slice(2, -2)}</del>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <a key={i} href={link[2]} target="_blank" rel="noreferrer">{link[1]}</a>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function cells(line: string) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}

export default function MarkdownContent({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    const image = line.trim().match(/^<img src="([^"]+)" alt="([^"]*)" \/>$/);
    if (image) {
      blocks.push(<figure key={i} className="obsidian-image"><img src={image[1]} alt={image[2]} /></figure>);
      i++; continue;
    }

    const fence = line.match(/^```(.*)$/);
    if (fence) {
      const language = fence[1].trim();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      if (i < lines.length) i++;
      blocks.push(<pre key={i} data-language={language || undefined}><code>{code.join("\n")}</code></pre>);
      continue;
    }

    if (line.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) quote.push(lines[i++].replace(/^>\s?/, ""));
      const callout = quote[0]?.match(/^\[!([^\]]+)\]\s*(.*)$/i);
      blocks.push(callout ? (
        <aside key={i} className={`obsidian-callout callout-${callout[1].toLowerCase()}`}>
          <div className="callout-title">⚡ {callout[2] || callout[1]}</div>
          {quote.slice(1).length > 0 && <p>{inline(quote.slice(1).join("\n"))}</p>}
        </aside>
      ) : <blockquote key={i}>{quote.map((q, n) => <p key={n}>{inline(q)}</p>)}</blockquote>);
      continue;
    }

    if (line.includes("|") && i + 1 < lines.length && /^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) {
      const header = cells(line); i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) rows.push(cells(lines[i++]));
      blocks.push(<div key={i} className="table-wrap"><table><thead><tr>{header.map((c, n) => <th key={n}>{inline(c)}</th>)}</tr></thead><tbody>{rows.map((row, r) => <tr key={r}>{row.map((c, n) => <td key={n}>{inline(c)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      if (level > 1) blocks.push(React.createElement(`h${level}`, { key: i }, inline(heading[2])));
      i++; continue;
    }

    if (/^[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i])) items.push(lines[i++].replace(/^[-*+]\s+/, ""));
      blocks.push(<ul key={i}>{items.map((item, n) => <li key={n}>{inline(item)}</li>)}</ul>);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) items.push(lines[i++].replace(/^\d+\.\s+/, ""));
      blocks.push(<ol key={i}>{items.map((item, n) => <li key={n}>{inline(item)}</li>)}</ol>);
      continue;
    }

    if (line.trim() === "---") { blocks.push(<hr key={i++} />); continue; }

    const paragraph = [line.trim()]; i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,6})\s|^```|^>|^[-*+]\s+|^\d+\.\s+|^<img /.test(lines[i])) paragraph.push(lines[i++].trim());
    blocks.push(<p key={i}>{inline(paragraph.join("\n"))}</p>);
  }
  return <div className="obsidian-content">{blocks}</div>;
}
