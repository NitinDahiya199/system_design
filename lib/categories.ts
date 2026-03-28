export const CATEGORIES = [
  "fundamentals",
  "components",
  "interview-prep",
  "case-studies",
  "production-depth",
] as const;

export type CategorySlug = (typeof CATEGORIES)[number];

export function isCategorySlug(s: string): s is CategorySlug {
  return (CATEGORIES as readonly string[]).includes(s);
}
