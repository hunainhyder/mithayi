export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-US")}`;
}

/** Strips tags from CMS HTML so it can be shown as a short plain-text blurb. */
export function toPlainText(html: string, maxLength = 90): string {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}…` : text;
}

export function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
