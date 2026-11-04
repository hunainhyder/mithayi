import type { Category } from "@/types/api";

/** A top-level category with its sub-categories. */
export type CategoryNode = Category & { children: Category[] };

/**
 * The CMS has no parent field yet, so the admin records the hierarchy in the
 * description: "parent category" on parents and "sub category of <parent name>" on
 * children. A real `parent_id` on the category wins over the description when present.
 */
const SUB_CATEGORY_OF = /^\s*sub\s*-?\s*categor(?:y|ies)\s+of\s+([^\n]+)/i;

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function referencedParent(category: Category): string[] | null {
  const match = category.description?.match(SUB_CATEGORY_OF);
  const ref = match ? tokens(match[1]) : [];
  return ref.length > 0 ? ref : null;
}

/**
 * Finds the parent a description points at. Admins don't type the exact name
 * ("return and favours" for "Return Gifts & favours"), so a candidate matches when it
 * contains every word of the reference; the closest-sized one wins and ties match nothing.
 */
function matchParent(ref: string[], candidates: Category[]): Category | null {
  let best: Category | null = null;
  let bestScore = 0;
  let tie = false;

  for (const candidate of candidates) {
    const words = tokens(candidate.name);
    if (!ref.every((word) => words.includes(word))) continue;
    const score = ref.length / words.length;
    if (score > bestScore) {
      best = candidate;
      bestScore = score;
      tie = false;
    } else if (score === bestScore) {
      tie = true;
    }
  }
  return tie ? null : best;
}

/** Groups a flat category list into top-level categories and their children, in admin (id) order. */
export function buildCategoryTree(categories: Category[]): CategoryNode[] {
  const sorted = [...categories].sort((a, b) => a.id - b.id);
  const ids = new Set(sorted.map((category) => category.id));
  const refs = new Map(sorted.map((c) => [c.id, referencedParent(c)] as const));

  // Only categories that are not themselves children can be parents
  const candidates = sorted.filter(
    (c) => typeof c.parent_id !== "number" && !refs.get(c.id),
  );

  const parentOf = new Map<number, number>();
  for (const category of sorted) {
    if (typeof category.parent_id === "number" && ids.has(category.parent_id)) {
      parentOf.set(category.id, category.parent_id);
      continue;
    }
    const ref = refs.get(category.id);
    if (!ref) continue;
    const parent = matchParent(ref, candidates.filter((c) => c.id !== category.id));
    if (parent) parentOf.set(category.id, parent.id);
  }

  // Two levels only: a child of a child is shown at the top level instead
  for (const [child, parent] of parentOf) {
    if (parentOf.has(parent)) parentOf.delete(child);
  }

  return sorted
    .filter((category) => !parentOf.has(category.id))
    .map((category) => ({
      ...category,
      children: sorted.filter((child) => parentOf.get(child.id) === category.id),
    }));
}

/** The top-level node a category belongs to (itself when it is top-level). */
export function findFamily(tree: CategoryNode[], slug: string): CategoryNode | null {
  return (
    tree.find(
      (node) => node.slug === slug || node.children.some((child) => child.slug === slug),
    ) ?? null
  );
}
