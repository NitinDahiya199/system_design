import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, isCategorySlug, type CategorySlug } from "@/lib/categories";
import { getCategoryData } from "@/lib/load-data";
import { detailPath } from "@/lib/content-helpers";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: raw } = await params;
  if (!isCategorySlug(raw)) return {};
  const data = getCategoryData(raw);
  return {
    title: data.label,
    description: data.heroDescription,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: raw } = await params;
  if (!isCategorySlug(raw)) notFound();

  const category = raw as CategorySlug;
  const data = getCategoryData(category);

  const focusItems = data.items.slice(0, 6).map((item) => {
    const rec = item as { id: string; title?: string; summary?: string };
    return (
      <li key={rec.id}>
        <strong>{rec.title}</strong>
        {": "}
        {rec.summary}
      </li>
    );
  });

  const learningSteps = [
    "Open a topic card and read the short summary first.",
    "Use the quick points to revise before interviews.",
    "Read the deeper explanation, examples, and trade-offs.",
    "Follow related topics to connect ideas across pages.",
  ];

  return (
    <main className="page-main">
      <section className="page-hero detail-hero">
        <div>
          <p className="eyebrow">{data.heroEyebrow}</p>
          <h1>{data.heroTitle}</h1>
          <p>{data.heroDescription}</p>
        </div>
        <aside className="hero-panel">
          <h2>Why this section matters</h2>
          <p className="muted">
            Good interviews become much easier when you can explain system basics
            in simple words before you talk about tools.
          </p>
          <ul className="stack-list">{focusItems}</ul>
        </aside>
      </section>

      <section className="content-block">
        <div className="section-heading">
          <p className="eyebrow">Topic Index</p>
          <h2>Pick a concept to study deeply</h2>
          <p>{data.cardIntro}</p>
        </div>
        <div className="card-grid">
          {data.items.map((rawItem) => {
            const item = rawItem as {
              id: string;
              title: string;
              tag: string;
              summary: string;
              quickPoints: string[];
            };
            const quickPoints = item.quickPoints.slice(0, 3).map((point) => (
              <li key={point}>{point}</li>
            ));
            return (
              <article
                key={item.id}
                className="topic-card topic-link-card"
              >
                <p className="card-tag">{item.tag}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <ul className="stack-list compact-list">{quickPoints}</ul>
                <Link
                  className="text-link"
                  href={detailPath(data.category, item.id)}
                >
                  Open full explanation
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-block">
        <div className="section-heading compact">
          <p className="eyebrow">Study Flow</p>
          <h2>How to use this section</h2>
        </div>
        <div className="roadmap compact-roadmap">
          {learningSteps.map((step, index) => (
            <article key={step} className="roadmap-step">
              <span className="step-number">0{index + 1}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
