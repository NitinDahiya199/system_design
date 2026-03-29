export function PageLoader() {
  return (
    <main className="page-loader" aria-busy="true" aria-live="polite">
      <span className="page-loader__sr">Loading page…</span>
      <div className="page-loader__hero">
        <div className="page-loader__line page-loader__line--eyebrow" />
        <div className="page-loader__line page-loader__line--title" />
        <div className="page-loader__line page-loader__line--text" />
        <div className="page-loader__line page-loader__line--text page-loader__line--short" />
      </div>
      <div className="page-loader__grid">
        <div className="page-loader__card" />
        <div className="page-loader__card" />
        <div className="page-loader__card" />
      </div>
    </main>
  );
}
