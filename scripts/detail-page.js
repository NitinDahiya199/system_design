document.addEventListener("DOMContentLoaded", async function () {
  const helper = window.systemDesignContent;

  if (!helper) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const id = params.get("id");
  const pageShell = document.querySelector("[data-role='detail-shell']");

  if (!category || !id || !pageShell) {
    return;
  }

  const contentFile = "../data/" + category + ".json";

  try {
    const data = await helper.fetchJson(contentFile);
    const item = data.items.find(function (entry) {
      return entry.id === id;
    });

    if (!item) {
      renderMissingState(category);
      return;
    }

    document.title = item.title + " | System Design Study Hub";

    renderDetailPage(data, item);
  } catch (error) {
    renderMissingState(category);
  }

  function renderDetailPage(data, item) {
    const breadcrumb = document.querySelector("[data-role='breadcrumb']");
    const heroEyebrow = document.querySelector("[data-role='detail-eyebrow']");
    const heroTitle = document.querySelector("[data-role='detail-title']");
    const heroDescription = document.querySelector("[data-role='detail-description']");
    const summaryPanel = document.querySelector("[data-role='summary-panel']");
    const sectionNav = document.querySelector("[data-role='section-nav']");
    const bodyContent = document.querySelector("[data-role='detail-content']");

    if (breadcrumb) {
      breadcrumb.innerHTML =
        '<a href="../index.html">Home</a>' +
        '<span>/</span>' +
        '<a href="' + helper.escapeHtml(helper.getCategoryPagePath(data.category)) + '">' + helper.escapeHtml(data.label) + "</a>" +
        "<span>/</span>" +
        "<strong>" + helper.escapeHtml(item.title) + "</strong>";
    }

    if (heroEyebrow) {
      heroEyebrow.textContent = data.label;
    }

    if (heroTitle) {
      heroTitle.textContent = item.title;
    }

    if (heroDescription) {
      heroDescription.textContent = item.summary;
    }

    if (summaryPanel) {
      summaryPanel.innerHTML =
        "<h2>Quick Revision</h2>" +
        "<p>" + helper.escapeHtml(item.whatItMeans) + "</p>" +
        '<ul class="stack-list compact-list">' +
        item.quickPoints
          .map(function (point) {
            return "<li>" + helper.escapeHtml(point) + "</li>";
          })
          .join("") +
        "</ul>";
    }

    const stepFlow = item.stepFlow && item.stepFlow.length ? item.stepFlow : createDefaultStepFlow(data, item);
    const diagramBlocks = item.diagramBlocks && item.diagramBlocks.length ? item.diagramBlocks : createDefaultDiagramBlocks(data, item);
    const navItems = [
      { id: "what-it-means", title: "What it means", show: hasText(item.whatItMeans) },
      { id: "why-it-matters", title: "Why it matters", show: hasText(item.whyItMatters) },
      { id: "examples", title: "Examples", show: hasText(item.simpleExample) || hasList(item.realWorldExamples) },
      { id: "study-flow", title: "Step-by-step flow", show: hasList(stepFlow) },
      { id: "diagram-map", title: "Diagram", show: hasList(diagramBlocks) },
      { id: "interview-tip", title: "Interview tip", show: hasText(item.interviewTip) },
      { id: "estimation-walkthrough", title: "Estimation walkthrough", show: !!item.estimationWalkthrough },
      { id: "sample-answer", title: "Sample answer", show: !!item.sampleAnswer },
      { id: "design-checklist", title: "Design checklist", show: hasList(item.designChecklist) },
      { id: "what-interviewer-expects", title: "What interviewer expects", show: hasList(item.whatInterviewerExpects) },
      { id: "follow-up-questions", title: "Follow-up questions", show: hasList(item.followUpQuestions) },
      { id: "trade-offs", title: "Trade-offs", show: hasList(item.tradeOffs) },
      { id: "mistakes", title: "Common mistakes", show: hasList(item.commonMistakes) },
      { id: "related", title: "Related topics", show: hasList(item.relatedTopics) }
    ]
      .filter(function (navItem) {
        return navItem.show;
      })
      .concat(
        (item.sections || []).map(function (section, index) {
          return {
            id: "section-" + index,
            title: section.title
          };
        })
      );

    if (sectionNav) {
      sectionNav.innerHTML = navItems
        .map(function (navItem) {
          return '<a class="mini-link" href="#' + helper.escapeHtml(navItem.id) + '">' + helper.escapeHtml(navItem.title) + "</a>";
        })
        .join("");
    }

    if (bodyContent) {
      bodyContent.innerHTML =
        sectionBlock("what-it-means", "What it means", [item.whatItMeans]) +
        sectionBlock("why-it-matters", "Why it matters", [item.whyItMatters]) +
        sectionBlock("examples", "Simple example", [item.simpleExample], item.realWorldExamples, "More real examples") +
        stepFlowBlock(stepFlow) +
        diagramBlocksMarkup(diagramBlocks) +
        sectionBlock("interview-tip", "In interviews, say this", [item.interviewTip]) +
        estimationBlock(item.estimationWalkthrough) +
        sampleAnswerBlock(item.sampleAnswer) +
        listPanelBlock("design-checklist", "Design checklist", item.designChecklist) +
        listPanelBlock("what-interviewer-expects", "What interviewer expects", item.whatInterviewerExpects) +
        listPanelBlock("follow-up-questions", "Common follow-up questions", item.followUpQuestions) +
        sectionBlock("trade-offs", "Trade-offs", [], item.tradeOffs) +
        sectionBlock("mistakes", "Common mistakes", [], item.commonMistakes) +
        (item.sections || [])
          .map(function (section, index) {
            return sectionBlock("section-" + index, section.title, section.paragraphs, section.bullets);
          })
          .join("") +
        relatedBlock(item.relatedTopics);
    }
  }

  function sectionBlock(id, title, paragraphs, bullets, bulletsTitle) {
    if (!hasText(title) || (!hasList(paragraphs) && !hasList(bullets))) {
      return "";
    }

    const paragraphHtml = (paragraphs || [])
      .map(function (paragraph) {
        return "<p>" + helper.escapeHtml(paragraph) + "</p>";
      })
      .join("");

    const bulletHtml = bullets && bullets.length
      ? '<div class="detail-list-wrap">' +
        (bulletsTitle ? "<h3>" + helper.escapeHtml(bulletsTitle) + "</h3>" : "") +
        '<ul class="check-list">' +
        bullets
          .map(function (point) {
            return "<li>" + helper.escapeHtml(point) + "</li>";
          })
          .join("") +
        "</ul></div>"
      : "";

    return (
      '<section class="detail-section panel" id="' + helper.escapeHtml(id) + '">' +
      "<h2>" + helper.escapeHtml(title) + "</h2>" +
      paragraphHtml +
      bulletHtml +
      "</section>"
    );
  }

  function relatedBlock(relatedTopics) {
    if (!relatedTopics || !relatedTopics.length) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="related">' +
      "<h2>Related topics</h2>" +
      '<div class="mini-link-row">' +
      helper.linkList(relatedTopics) +
      "</div>" +
      "</section>"
    );
  }

  function listPanelBlock(id, title, items) {
    if (!hasList(items)) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="' + helper.escapeHtml(id) + '">' +
      "<h2>" + helper.escapeHtml(title) + "</h2>" +
      '<ul class="check-list">' +
      items
        .map(function (itemText) {
          return "<li>" + helper.escapeHtml(itemText) + "</li>";
        })
        .join("") +
      "</ul>" +
      "</section>"
    );
  }

  function stepFlowBlock(stepFlow) {
    if (!hasList(stepFlow)) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="study-flow">' +
      "<h2>Step-by-step flow</h2>" +
      '<div class="step-flow">' +
      stepFlow
        .map(function (step, index) {
          return (
            '<article class="flow-step">' +
            '<span class="flow-number">' + helper.escapeHtml(step.step || String(index + 1)) + "</span>" +
            "<h3>" + helper.escapeHtml(step.title) + "</h3>" +
            "<p>" + helper.escapeHtml(step.description) + "</p>" +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</section>"
    );
  }

  function diagramBlocksMarkup(diagramBlocks) {
    if (!hasList(diagramBlocks)) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="diagram-map">' +
      "<h2>Diagram and system map</h2>" +
      '<div class="diagram-stack">' +
      diagramBlocks
        .map(function (block) {
          return (
            '<article class="diagram-card">' +
            "<h3>" + helper.escapeHtml(block.title) + "</h3>" +
            '<div class="diagram-grid">' +
            (block.columns || [])
              .map(function (column) {
                return (
                  '<section class="diagram-column">' +
                  "<h4>" + helper.escapeHtml(column.label) + "</h4>" +
                  '<ul class="diagram-list">' +
                  (column.items || [])
                    .map(function (itemText) {
                      return "<li>" + helper.escapeHtml(itemText) + "</li>";
                    })
                    .join("") +
                  "</ul>" +
                  "</section>"
                );
              })
              .join("") +
            "</div>" +
            (hasText(block.footer) ? '<p class="muted diagram-footer">' + helper.escapeHtml(block.footer) + "</p>" : "") +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</section>"
    );
  }

  function estimationBlock(estimationWalkthrough) {
    if (!estimationWalkthrough) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="estimation-walkthrough">' +
      "<h2>" + helper.escapeHtml(estimationWalkthrough.title || "Estimation walkthrough") + "</h2>" +
      '<div class="estimation-grid">' +
      listCard("Assumptions", estimationWalkthrough.assumptions) +
      listCard("Rough calculations", estimationWalkthrough.calculations) +
      "</div>" +
      (hasText(estimationWalkthrough.takeaway)
        ? '<p class="takeaway-note">' + helper.escapeHtml(estimationWalkthrough.takeaway) + "</p>"
        : "") +
      "</section>"
    );
  }

  function sampleAnswerBlock(sampleAnswer) {
    if (!sampleAnswer) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="sample-answer">' +
      "<h2>Sample answer structure</h2>" +
      '<div class="sample-answer">' +
      (hasText(sampleAnswer.intro) ? "<p>" + helper.escapeHtml(sampleAnswer.intro) + "</p>" : "") +
      (hasList(sampleAnswer.bullets)
        ? '<ol class="ordered-list">' +
          sampleAnswer.bullets
            .map(function (bullet) {
              return "<li>" + helper.escapeHtml(bullet) + "</li>";
            })
            .join("") +
          "</ol>"
        : "") +
      (hasText(sampleAnswer.closing) ? '<p class="muted">' + helper.escapeHtml(sampleAnswer.closing) + "</p>" : "") +
      "</div>" +
      "</section>"
    );
  }

  function listCard(title, items) {
    if (!hasList(items)) {
      return "";
    }

    return (
      '<article class="estimation-card">' +
      "<h3>" + helper.escapeHtml(title) + "</h3>" +
      '<ul class="check-list">' +
      items
        .map(function (itemText) {
          return "<li>" + helper.escapeHtml(itemText) + "</li>";
        })
        .join("") +
      "</ul>" +
      "</article>"
    );
  }

  function createDefaultStepFlow(data, item) {
    if (data.category === "case-studies") {
      return [
        { step: "1", title: "Clarify the goal", description: item.summary },
        { step: "2", title: "Map the main user flow", description: item.whatItMeans },
        { step: "3", title: "Add key building blocks", description: firstSectionText(item.sections) || item.simpleExample },
        { step: "4", title: "Discuss scale and trade-offs", description: firstItem(item.tradeOffs) || item.interviewTip }
      ];
    }

    return [
      { step: "1", title: "Understand the idea", description: item.whatItMeans },
      { step: "2", title: "See why it matters", description: item.whyItMatters },
      { step: "3", title: "Connect it to an example", description: item.simpleExample },
      { step: "4", title: "Use it in interviews", description: item.interviewTip }
    ].filter(function (step) {
      return hasText(step.description);
    });
  }

  function createDefaultDiagramBlocks(data, item) {
    if (data.category === "case-studies") {
      return [
        {
          title: "Case study view",
          columns: [
            {
              label: "Goal",
              items: [item.summary, item.simpleExample].filter(Boolean)
            },
            {
              label: "System pieces",
              items: firstSectionBullets(item.sections).length ? firstSectionBullets(item.sections) : (item.quickPoints || [])
            },
            {
              label: "Scale checks",
              items: (item.tradeOffs || []).slice(0, 3)
            }
          ],
          footer: "Start with the core user journey, then add only the components that solve the biggest risks."
        }
      ];
    }

    return [
      {
        title: "Concept map",
        columns: [
          {
            label: "Meaning",
            items: [item.whatItMeans, item.simpleExample].filter(Boolean)
          },
          {
            label: "Why it matters",
            items: [item.whyItMatters].concat((item.quickPoints || []).slice(0, 2)).filter(Boolean)
          },
          {
            label: "Interview use",
            items: [item.interviewTip].concat((item.tradeOffs || []).slice(0, 2)).filter(Boolean)
          }
        ],
        footer: "Use this map as a quick memory anchor before you read the longer explanation."
      }
    ];
  }

  function firstSectionText(sections) {
    if (!hasList(sections)) {
      return "";
    }

    const firstSection = sections[0];
    if (firstSection && hasList(firstSection.paragraphs)) {
      return firstSection.paragraphs[0];
    }

    return "";
  }

  function firstSectionBullets(sections) {
    if (!hasList(sections)) {
      return [];
    }

    const firstSection = sections[0];
    return firstSection && hasList(firstSection.bullets) ? firstSection.bullets.slice(0, 4) : [];
  }

  function firstItem(items) {
    return hasList(items) ? items[0] : "";
  }

  function hasList(items) {
    return Array.isArray(items) && items.length > 0;
  }

  function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function renderMissingState(categoryValue) {
    pageShell.innerHTML =
      '<section class="page-hero">' +
      '<p class="eyebrow">Content not found</p>' +
      "<h1>This study page could not be loaded.</h1>" +
      "<p>Use the category page to choose another topic.</p>" +
      '<div class="hero-actions">' +
      '<a class="button button-primary" href="' + helper.escapeHtml(helper.getCategoryPagePath(categoryValue || "fundamentals")) + '">Back to topics</a>' +
      '<a class="button button-secondary" href="../index.html">Go home</a>' +
      "</div>" +
      "</section>";
  }
});
