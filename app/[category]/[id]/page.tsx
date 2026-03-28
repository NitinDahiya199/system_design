import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isCategorySlug, type CategorySlug } from "@/lib/categories";
import { allCategoryBundles, getCategoryData } from "@/lib/load-data";
import { renderDetailParts } from "@/lib/detail-render";
import { SectionNavTracker } from "@/components/SectionNavTracker";

type Props = {
  params: Promise<{ category: string; id: string }>;
};

export async function generateStaticParams() {
  return allCategoryBundles().flatMap((data) =>
    data.items.map((item) => ({
      category: data.category,
      id: (item as { id: string }).id,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: cat, id: rawId } = await params;
  if (!isCategorySlug(cat)) return {};
  const data = getCategoryData(cat);
  const id = decodeURIComponent(rawId);
  const item = data.items.find((i) => (i as { id: string }).id === id) as
    | { title: string; summary?: string }
    | undefined;
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function DetailPage({ params }: Props) {
  const { category: cat, id: rawId } = await params;
  if (!isCategorySlug(cat)) notFound();

  const category = cat as CategorySlug;
  const data = getCategoryData(category);
  const id = decodeURIComponent(rawId);
  const item = data.items.find((i) => (i as { id: string }).id === id);

  if (!item) {
    notFound();
  }

  const parts = renderDetailParts(
    data as Record<string, unknown>,
    item as Record<string, unknown>,
  );

  return (
    <main className="page-main" data-role="detail-shell">
      <nav
        className="breadcrumb"
        aria-label="Breadcrumb"
        dangerouslySetInnerHTML={{ __html: parts.breadcrumbHtml }}
      />

      <section className="page-hero detail-hero">
        <div>
          <p className="eyebrow" data-role="detail-eyebrow">
            {data.label}
          </p>
          <h1 data-role="detail-title">{(item as { title: string }).title}</h1>
          <p data-role="detail-description">
            {(item as { summary: string }).summary}
          </p>
        </div>
        <aside
          className="hero-panel"
          data-role="summary-panel"
          dangerouslySetInnerHTML={{ __html: parts.summaryHtml }}
        />
      </section>

      <section className="detail-layout">
        <aside className="panel detail-sidebar">
          <div className="section-heading compact">
            <p className="eyebrow">On this page</p>
            <h2>Study map</h2>
          </div>
          <SectionNavTracker html={parts.sectionNavHtml} />
        </aside>

        <div
          className="detail-content"
          data-role="detail-content"
          dangerouslySetInnerHTML={{ __html: parts.contentHtml }}
        />
      </section>
    </main>
  );
}
