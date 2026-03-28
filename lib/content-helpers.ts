export function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Next.js route: /category/topic-id */
export function detailPath(category: string, id: string): string {
  return `/${category}/${encodeURIComponent(id)}`;
}

export function categoryPath(category: string): string {
  return `/${category}`;
}

export function linkListHtml(
  items: { category: string; id: string; title: string }[],
): string {
  return items
    .map(
      (item) =>
        `<a class="mini-link" href="${escapeHtml(detailPath(item.category, item.id))}">${escapeHtml(item.title)}</a>`,
    )
    .join("");
}
