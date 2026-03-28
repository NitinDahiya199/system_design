document.addEventListener("DOMContentLoaded", async function () {
  const helper = window.systemDesignContent;
  const body = document.body;
  const contentPath = body.dataset.contentFile;

  if (!helper || !contentPath) {
    return;
  }

  const heroEyebrow = document.querySelector("[data-role='hero-eyebrow']");
  const heroTitle = document.querySelector("[data-role='hero-title']");
  const heroDescription = document.querySelector("[data-role='hero-description']");
  const cardIntro = document.querySelector("[data-role='card-intro']");
  const cardGrid = document.querySelector("[data-role='card-grid']");
  const focusTitle = document.querySelector("[data-role='focus-title']");
  const focusList = document.querySelector("[data-role='focus-list']");
  const learningSteps = document.querySelector("[data-role='learning-steps']");

  try {
    const data = await helper.fetchJson(contentPath);

    document.title = data.label + " | System Design Study Hub";

    if (heroEyebrow) {
      heroEyebrow.textContent = data.heroEyebrow;
    }

    if (heroTitle) {
      heroTitle.textContent = data.heroTitle;
    }

    if (heroDescription) {
      heroDescription.textContent = data.heroDescription;
    }

    if (cardIntro) {
      cardIntro.textContent = data.cardIntro;
    }

    if (focusTitle) {
      focusTitle.textContent = "What you will study on this page";
    }

    if (focusList) {
      focusList.innerHTML = data.items
        .slice(0, 6)
        .map(function (item) {
          return "<li>" + helper.escapeHtml(item.title) + ": " + helper.escapeHtml(item.summary) + "</li>";
        })
        .join("");
    }

    if (learningSteps) {
      learningSteps.innerHTML = [
        "Open a topic card and read the short summary first.",
        "Use the quick points to revise before interviews.",
        "Read the deeper explanation, examples, and trade-offs.",
        "Follow related topics to connect ideas across pages."
      ]
        .map(function (step, index) {
          return (
            '<article class="roadmap-step">' +
            '<span class="step-number">0' + (index + 1) + "</span>" +
            "<p>" + helper.escapeHtml(step) + "</p>" +
            "</article>"
          );
        })
        .join("");
    }

    if (cardGrid) {
      cardGrid.innerHTML = data.items
        .map(function (item) {
          const quickPoints = item.quickPoints
            .slice(0, 3)
            .map(function (point) {
              return "<li>" + helper.escapeHtml(point) + "</li>";
            })
            .join("");

          return (
            '<article class="topic-card topic-link-card">' +
            '<p class="card-tag">' + helper.escapeHtml(item.tag) + "</p>" +
            "<h3>" + helper.escapeHtml(item.title) + "</h3>" +
            "<p>" + helper.escapeHtml(item.summary) + "</p>" +
            '<ul class="stack-list compact-list">' + quickPoints + "</ul>" +
            '<a class="text-link" href="' + helper.escapeHtml(helper.detailUrl(data.category, item.id)) + '">Open full explanation</a>' +
            "</article>"
          );
        })
        .join("");
    }
  } catch (error) {
    if (cardGrid) {
      cardGrid.innerHTML = '<article class="panel"><h3>Content unavailable</h3><p>Something went wrong while loading this study section. Please refresh and try again.</p></article>';
    }
  }
});
