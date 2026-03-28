import type { CategorySlug } from "./categories";
import fundamentals from "@/data/fundamentals.json";
import components from "@/data/components.json";
import interviewPrep from "@/data/interview-prep.json";
import caseStudies from "@/data/case-studies.json";
import productionDepth from "@/data/production-depth.json";

export type CategoryBundle = {
  category: string;
  label: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  cardIntro: string;
  items: Record<string, unknown>[];
};

const byCategory: Record<CategorySlug, CategoryBundle> = {
  fundamentals: fundamentals as CategoryBundle,
  components: components as CategoryBundle,
  "interview-prep": interviewPrep as CategoryBundle,
  "case-studies": caseStudies as CategoryBundle,
  "production-depth": productionDepth as CategoryBundle,
};

export function getCategoryData(slug: CategorySlug): CategoryBundle {
  return byCategory[slug];
}

export function allCategoryBundles(): CategoryBundle[] {
  return Object.values(byCategory);
}
