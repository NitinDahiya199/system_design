(function () {
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function getCategoryPagePath(category) {
    return {
      fundamentals: "fundamentals.html",
      components: "components.html",
      "interview-prep": "interview-prep.html",
      "case-studies": "case-studies.html",
      "production-depth": "production-depth.html"
    }[category] || "fundamentals.html";
  }

  function detailUrl(category, id) {
    return "detail.html?category=" + encodeURIComponent(category) + "&id=" + encodeURIComponent(id);
  }

  async function fetchJson(path) {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error("Failed to load content from " + path);
    }

    return response.json();
  }

  function linkList(items) {
    return items
      .map(function (item) {
        return '<a class="mini-link" href="' + escapeHtml(detailUrl(item.category, item.id)) + '">' + escapeHtml(item.title) + "</a>";
      })
      .join("");
  }

  window.systemDesignContent = {
    escapeHtml: escapeHtml,
    fetchJson: fetchJson,
    getCategoryPagePath: getCategoryPagePath,
    detailUrl: detailUrl,
    linkList: linkList
  };
})();
