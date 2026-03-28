import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-main">
      <section className="page-hero">
        <p className="eyebrow">Not found</p>
        <h1>This page does not exist.</h1>
        <p>Try another topic from the home page or a category index.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">
            Go home
          </Link>
          <Link className="button button-secondary" href="/fundamentals">
            Fundamentals
          </Link>
        </div>
      </section>
    </main>
  );
}
