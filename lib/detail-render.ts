// @ts-nocheck — generated from scripts/detail-page.js; types are intentionally loose.
import { escapeHtml, linkListHtml, categoryPath } from "./content-helpers";

export type TopicJson = Record<string, any>;

export function renderDetailParts(data: TopicJson, item: TopicJson) {
  const breadcrumbHtml =
    '<a href="/">Home</a>' +
    '<span>/</span>' +
    '<a href="' +
    escapeHtml(categoryPath(String(data.category))) +
    '">' +
    escapeHtml(data.label) +
    "</a>" +
    "<span>/</span>" +
    "<strong>" +
    escapeHtml(item.title) +
    "</strong>";

  const summaryHtml =
    "<h2>Quick Revision</h2>" +
    "<p>" +
    escapeHtml(item.whatItMeans) +
    "</p>" +
    '<ul class="stack-list compact-list">' +
    (Array.isArray(item.quickPoints) ? item.quickPoints : [])
      .map(function (point: string) {
        return "<li>" + escapeHtml(point) + "</li>";
      })
      .join("") +
    "</ul>";

  const stepFlow =
    item.stepFlow && item.stepFlow.length
      ? item.stepFlow
      : createDefaultStepFlow(data, item);
  const diagramBlocks =
    item.diagramBlocks && item.diagramBlocks.length
      ? item.diagramBlocks
      : createDefaultDiagramBlocks(data, item);

  const navItems = [
    { id: "what-it-means", title: "What it means", show: hasText(item.whatItMeans) },
    { id: "why-it-matters", title: "Why it matters", show: hasText(item.whyItMatters) },
    {
      id: "examples",
      title: "Examples",
      show: hasText(item.simpleExample) || hasList(item.realWorldExamples),
    },
    { id: "study-flow", title: "Step-by-step flow", show: hasList(stepFlow) },
    { id: "diagram-map", title: "Diagram", show: hasList(diagramBlocks) },
    { id: "interview-tip", title: "Interview tip", show: hasText(item.interviewTip) },
    {
      id: "estimation-walkthrough",
      title: "Estimation walkthrough",
      show: !!item.estimationWalkthrough,
    },
    { id: "sample-answer", title: "Sample answer", show: !!item.sampleAnswer },
    { id: "spoken-answer", title: "Sample spoken answer", show: !!item.spokenAnswer },
    { id: "timed-prompts", title: "Timed practice", show: hasList(item.timedPrompts) },
    { id: "mock-conversation", title: "Mock interview", show: hasList(item.mockConversation) },
    {
      id: "answer-quality",
      title: "Answer quality levels",
      show: hasList(item.answerQualityLevels),
    },
    {
      id: "answer-comparison",
      title: "Good vs weak answer",
      show: !!item.goodVsWeakAnswer,
    },
    {
      id: "failure-scenarios",
      title: "Failure scenarios",
      show: hasList(item.failureScenarios),
    },
    {
      id: "debugging-checklist",
      title: "Debugging checklist",
      show: hasList(item.debuggingChecklist),
    },
    { id: "design-checklist", title: "Design checklist", show: hasList(item.designChecklist) },
    {
      id: "what-interviewer-expects",
      title: "What interviewer expects",
      show: hasList(item.whatInterviewerExpects),
    },
    {
      id: "follow-up-questions",
      title: "Follow-up questions",
      show: hasList(item.followUpQuestions),
    },
    {
      id: "senior-considerations",
      title: "Senior-level considerations",
      show: hasList(item.seniorConsiderations),
    },
    { id: "migration-playbook", title: "Migration playbook", show: !!item.migrationPlaybook },
    { id: "slo-pack", title: "SLOs and error budgets", show: !!item.sloPack },
    { id: "incident-runbook", title: "Incident runbook", show: !!item.incidentRunbook },
    { id: "cost-model", title: "Cost and capacity", show: !!item.costModel },
    {
      id: "tenant-isolation-notes",
      title: "Tenant isolation",
      show: hasList(item.tenantIsolationNotes),
    },
    {
      id: "abuse-fraud-notes",
      title: "Abuse and fraud",
      show: hasList(item.abuseFraudNotes),
    },
    { id: "evolution-stages", title: "Evolution path", show: hasList(item.evolutionStages) },
    {
      id: "multi-region-notes",
      title: "Multi-region design",
      show: hasList(item.multiRegionNotes),
    },
    {
      id: "observability-notes",
      title: "Observability",
      show: hasList(item.observabilityNotes),
    },
    {
      id: "security-privacy-notes",
      title: "Security and privacy",
      show: hasList(item.securityPrivacyNotes),
    },
    { id: "trade-offs", title: "Trade-offs", show: hasList(item.tradeOffs) },
    { id: "mistakes", title: "Common mistakes", show: hasList(item.commonMistakes) },
    { id: "related", title: "Related topics", show: hasList(item.relatedTopics) },
  ]
    .filter(function (navItem: { show: boolean }) {
      return navItem.show;
    })
    .concat(
      (item.sections || []).map(function (section: { title: string }, index: number) {
        return {
          id: "section-" + index,
          title: section.title,
        };
      }),
    );

  const sectionNavHtml = navItems
    .map(function (navItem: { id: string; title: string }) {
      return (
        '<a class="mini-link" href="#' +
        escapeHtml(navItem.id) +
        '">' +
        escapeHtml(navItem.title) +
        "</a>"
      );
    })
    .join("");

  const contentHtml =
    sectionBlock("what-it-means", "What it means", [item.whatItMeans]) +
    sectionBlock("why-it-matters", "Why it matters", [item.whyItMatters]) +
    sectionBlock(
      "examples",
      "Simple example",
      [item.simpleExample],
      item.realWorldExamples,
      "More real examples",
    ) +
    stepFlowBlock(stepFlow) +
    diagramBlocksMarkup(diagramBlocks) +
    sectionBlock("interview-tip", "In interviews, say this", [item.interviewTip]) +
    estimationBlock(item.estimationWalkthrough) +
    sampleAnswerBlock(item.sampleAnswer) +
    spokenAnswerBlock(item.spokenAnswer) +
    timedPromptsBlock(item.timedPrompts) +
    mockConversationBlock(item.mockConversation) +
    answerQualityBlock(item.answerQualityLevels) +
    answerComparisonBlock(item.goodVsWeakAnswer) +
    failureScenariosBlock(item.failureScenarios) +
    listPanelBlock("debugging-checklist", "Debugging checklist", item.debuggingChecklist) +
    listPanelBlock("design-checklist", "Design checklist", item.designChecklist) +
    listPanelBlock("what-interviewer-expects", "What interviewer expects", item.whatInterviewerExpects) +
    listPanelBlock("follow-up-questions", "Common follow-up questions", item.followUpQuestions) +
    listPanelBlock("senior-considerations", "Senior-level considerations", item.seniorConsiderations) +
    migrationPlaybookBlock(item.migrationPlaybook) +
    sloPackBlock(item.sloPack) +
    incidentRunbookBlock(item.incidentRunbook) +
    costModelBlock(item.costModel) +
    listPanelBlock("tenant-isolation-notes", "Tenant isolation", item.tenantIsolationNotes) +
    listPanelBlock("abuse-fraud-notes", "Abuse and fraud", item.abuseFraudNotes) +
    evolutionStagesBlock(item.evolutionStages) +
    listPanelBlock("multi-region-notes", "Multi-region design", item.multiRegionNotes) +
    listPanelBlock("observability-notes", "Observability and debugging signals", item.observabilityNotes) +
    listPanelBlock("security-privacy-notes", "Security and privacy decisions", item.securityPrivacyNotes) +
    sectionBlock("trade-offs", "Trade-offs", [], item.tradeOffs) +
    sectionBlock("mistakes", "Common mistakes", [], item.commonMistakes) +
    (item.sections || [])
      .map(function (section: any, index: number) {
        return sectionBlock("section-" + index, section.title, section.paragraphs, section.bullets);
      })
      .join("") +
    relatedBlock(item.relatedTopics);

  return {
    breadcrumbHtml,
    summaryHtml,
    sectionNavHtml,
    contentHtml,
  };
}

function sectionBlock(
  id: string,
  title: string,
  paragraphs: unknown,
  bullets?: unknown,
  bulletsTitle?: string,
) {
    if (!hasText(title) || (!hasList(paragraphs) && !hasList(bullets))) {
      return "";
    }

    const paragraphHtml = (Array.isArray(paragraphs) ? paragraphs : [])
      .map(function (paragraph: unknown) {
        return "<p>" + escapeHtml(paragraph) + "</p>";
      })
      .join("");

    const bulletList = Array.isArray(bullets) ? bullets : [];
    const bulletHtml = bulletList.length
      ? '<div class="detail-list-wrap">' +
        (bulletsTitle ? "<h3>" + escapeHtml(bulletsTitle) + "</h3>" : "") +
        '<ul class="check-list">' +
        bulletList
          .map(function (point: unknown) {
            return "<li>" + escapeHtml(point) + "</li>";
          })
          .join("") +
        "</ul></div>"
      : "";

    return (
      '<section class="detail-section panel" id="' + escapeHtml(id) + '">' +
      "<h2>" + escapeHtml(title) + "</h2>" +
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
      linkListHtml(relatedTopics) +
      "</div>" +
      "</section>"
    );
  }

  function listPanelBlock(id, title, items) {
    if (!hasList(items)) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="' + escapeHtml(id) + '">' +
      "<h2>" + escapeHtml(title) + "</h2>" +
      '<ul class="check-list">' +
      items
        .map(function (itemText) {
          return "<li>" + escapeHtml(itemText) + "</li>";
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
            '<span class="flow-number">' + escapeHtml(step.step || String(index + 1)) + "</span>" +
            "<h3>" + escapeHtml(step.title) + "</h3>" +
            "<p>" + escapeHtml(step.description) + "</p>" +
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
            "<h3>" + escapeHtml(block.title) + "</h3>" +
            '<div class="diagram-grid">' +
            (block.columns || [])
              .map(function (column) {
                return (
                  '<section class="diagram-column">' +
                  "<h4>" + escapeHtml(column.label) + "</h4>" +
                  '<ul class="diagram-list">' +
                  (column.items || [])
                    .map(function (itemText) {
                      return "<li>" + escapeHtml(itemText) + "</li>";
                    })
                    .join("") +
                  "</ul>" +
                  "</section>"
                );
              })
              .join("") +
            "</div>" +
            (hasText(block.footer) ? '<p class="muted diagram-footer">' + escapeHtml(block.footer) + "</p>" : "") +
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
      "<h2>" + escapeHtml(estimationWalkthrough.title || "Estimation walkthrough") + "</h2>" +
      '<div class="estimation-grid">' +
      listCard("Assumptions", estimationWalkthrough.assumptions) +
      listCard("Rough calculations", estimationWalkthrough.calculations) +
      "</div>" +
      (hasText(estimationWalkthrough.takeaway)
        ? '<p class="takeaway-note">' + escapeHtml(estimationWalkthrough.takeaway) + "</p>"
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
      (hasText(sampleAnswer.intro) ? "<p>" + escapeHtml(sampleAnswer.intro) + "</p>" : "") +
      (hasList(sampleAnswer.bullets)
        ? '<ol class="ordered-list">' +
          sampleAnswer.bullets
            .map(function (bullet) {
              return "<li>" + escapeHtml(bullet) + "</li>";
            })
            .join("") +
          "</ol>"
        : "") +
      (hasText(sampleAnswer.closing) ? '<p class="muted">' + escapeHtml(sampleAnswer.closing) + "</p>" : "") +
      "</div>" +
      "</section>"
    );
  }

  function spokenAnswerBlock(spokenAnswer) {
    if (!spokenAnswer) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="spoken-answer">' +
      "<h2>" + escapeHtml(spokenAnswer.title || "Sample spoken answer") + "</h2>" +
      '<div class="spoken-answer-block">' +
      (spokenAnswer.paragraphs || [])
        .map(function (paragraph) {
          return '<p class="spoken-answer-line">' + escapeHtml(paragraph) + "</p>";
        })
        .join("") +
      "</div>" +
      "</section>"
    );
  }

  function timedPromptsBlock(timedPrompts) {
    if (!hasList(timedPrompts)) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="timed-prompts">' +
      "<h2>Timed practice prompts</h2>" +
      '<div class="timed-prompt-grid">' +
      timedPrompts
        .map(function (prompt) {
          return (
            '<article class="timed-prompt-card">' +
            '<div class="timed-header">' +
            "<h3>" + escapeHtml(prompt.title) + "</h3>" +
            '<span class="time-badge">' + escapeHtml(prompt.timeBox || "Timed") + "</span>" +
            "</div>" +
            (hasText(prompt.goal) ? '<p class="muted">' + escapeHtml(prompt.goal) + "</p>" : "") +
            (hasText(prompt.prompt) ? "<p>" + escapeHtml(prompt.prompt) + "</p>" : "") +
            (hasList(prompt.checkpoints)
              ? '<ul class="check-list">' +
                prompt.checkpoints
                  .map(function (point) {
                    return "<li>" + escapeHtml(point) + "</li>";
                  })
                  .join("") +
                "</ul>"
              : "") +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</section>"
    );
  }

  function mockConversationBlock(mockConversation) {
    if (!hasList(mockConversation)) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="mock-conversation">' +
      "<h2>Mock interview conversation</h2>" +
      '<div class="conversation-thread">' +
      mockConversation
        .map(function (entry) {
          return (
            '<article class="conversation-line">' +
            '<span class="speaker-badge">' + escapeHtml(entry.speaker) + "</span>" +
            "<p>" + escapeHtml(entry.text) + "</p>" +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</section>"
    );
  }

  function answerQualityBlock(answerQualityLevels) {
    if (!hasList(answerQualityLevels)) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="answer-quality">' +
      "<h2>Expected answer quality</h2>" +
      '<div class="quality-grid">' +
      answerQualityLevels
        .map(function (level) {
          return (
            '<article class="quality-card">' +
            '<span class="quality-badge quality-' + escapeHtml((level.level || "").toLowerCase()) + '">' + escapeHtml(level.level) + "</span>" +
            "<p>" + escapeHtml(level.summary) + "</p>" +
            (hasList(level.traits)
              ? '<ul class="check-list">' +
                level.traits
                  .map(function (trait) {
                    return "<li>" + escapeHtml(trait) + "</li>";
                  })
                  .join("") +
                "</ul>"
              : "") +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</section>"
    );
  }

  function answerComparisonBlock(goodVsWeakAnswer) {
    if (!goodVsWeakAnswer) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="answer-comparison">' +
      "<h2>Good answer vs weak answer</h2>" +
      (hasText(goodVsWeakAnswer.question) ? "<p>" + escapeHtml(goodVsWeakAnswer.question) + "</p>" : "") +
      '<div class="comparison-grid">' +
      '<article class="comparison-card weak-answer">' +
      "<h3>Weak answer</h3>" +
      "<p>" + escapeHtml(goodVsWeakAnswer.weakAnswer || "") + "</p>" +
      "</article>" +
      '<article class="comparison-card good-answer">' +
      "<h3>Good answer</h3>" +
      "<p>" + escapeHtml(goodVsWeakAnswer.goodAnswer || "") + "</p>" +
      "</article>" +
      "</div>" +
      (hasText(goodVsWeakAnswer.whyGoodWorks)
        ? '<p class="takeaway-note">' + escapeHtml(goodVsWeakAnswer.whyGoodWorks) + "</p>"
        : "") +
      "</section>"
    );
  }

  function failureScenariosBlock(failureScenarios) {
    if (!hasList(failureScenarios)) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="failure-scenarios">' +
      "<h2>Failure and debugging scenarios</h2>" +
      '<div class="failure-grid">' +
      failureScenarios
        .map(function (scenario) {
          return (
            '<article class="failure-card">' +
            "<h3>" + escapeHtml(scenario.title) + "</h3>" +
            (hasText(scenario.issue) ? "<p>" + escapeHtml(scenario.issue) + "</p>" : "") +
            (hasText(scenario.strongResponse)
              ? '<p class="muted"><strong>Strong response:</strong> ' + escapeHtml(scenario.strongResponse) + "</p>"
              : "") +
            "</article>"
          );
        })
        .join("") +
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
      "<h3>" + escapeHtml(title) + "</h3>" +
      '<ul class="check-list">' +
      items
        .map(function (itemText) {
          return "<li>" + escapeHtml(itemText) + "</li>";
        })
        .join("") +
      "</ul>" +
      "</article>"
    );
  }

  function migrationPlaybookBlock(migrationPlaybook) {
    if (!migrationPlaybook) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="migration-playbook">' +
      "<h2>" + escapeHtml(migrationPlaybook.title || "Migration playbook") + "</h2>" +
      (hasText(migrationPlaybook.intro) ? "<p>" + escapeHtml(migrationPlaybook.intro) + "</p>" : "") +
      (hasList(migrationPlaybook.phases)
        ? '<div class="step-flow">' +
          migrationPlaybook.phases
            .map(function (phase, index) {
              return (
                '<article class="flow-step">' +
                '<span class="flow-number">' + escapeHtml(phase.step || String(index + 1)) + "</span>" +
                "<h3>" + escapeHtml(phase.title) + "</h3>" +
                "<p>" + escapeHtml(phase.description) + "</p>" +
                "</article>"
              );
            })
            .join("") +
          "</div>"
        : "") +
      (hasList(migrationPlaybook.risks)
        ? '<div class="detail-list-wrap"><h3>What can go wrong</h3><ul class="check-list">' +
          migrationPlaybook.risks
            .map(function (risk) {
              return "<li>" + escapeHtml(risk) + "</li>";
            })
            .join("") +
          "</ul></div>"
        : "") +
      (hasText(migrationPlaybook.closing) ? '<p class="takeaway-note">' + escapeHtml(migrationPlaybook.closing) + "</p>" : "") +
      "</section>"
    );
  }

  function sloPackBlock(sloPack) {
    if (!sloPack) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="slo-pack">' +
      "<h2>" + escapeHtml(sloPack.title || "SLOs and error budgets") + "</h2>" +
      (hasText(sloPack.intro) ? "<p>" + escapeHtml(sloPack.intro) + "</p>" : "") +
      '<div class="estimation-grid">' +
      listCard("Key indicators", sloPack.indicators) +
      listCard("Target examples", sloPack.targets) +
      listCard("Error budget policy", sloPack.errorBudgetPolicies) +
      listCard("Interview framing", sloPack.interviewMoves) +
      "</div>" +
      (hasText(sloPack.closing) ? '<p class="takeaway-note">' + escapeHtml(sloPack.closing) + "</p>" : "") +
      "</section>"
    );
  }

  function incidentRunbookBlock(incidentRunbook) {
    if (!incidentRunbook) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="incident-runbook">' +
      "<h2>" + escapeHtml(incidentRunbook.title || "Incident runbook") + "</h2>" +
      (hasText(incidentRunbook.intro) ? "<p>" + escapeHtml(incidentRunbook.intro) + "</p>" : "") +
      (hasList(incidentRunbook.stages)
        ? '<div class="step-flow">' +
          incidentRunbook.stages
            .map(function (stage, index) {
              return (
                '<article class="flow-step">' +
                '<span class="flow-number">' + escapeHtml(stage.step || String(index + 1)) + "</span>" +
                "<h3>" + escapeHtml(stage.title) + "</h3>" +
                "<p>" + escapeHtml(stage.description) + "</p>" +
                "</article>"
              );
            })
            .join("") +
          "</div>"
        : "") +
      '<div class="estimation-grid">' +
      listCard("Immediate actions", incidentRunbook.immediateActions) +
      listCard("Communication rules", incidentRunbook.communicationRules) +
      listCard("Recovery checks", incidentRunbook.recoveryChecks) +
      listCard("Postmortem follow-up", incidentRunbook.postmortemActions) +
      "</div>" +
      (hasText(incidentRunbook.closing) ? '<p class="takeaway-note">' + escapeHtml(incidentRunbook.closing) + "</p>" : "") +
      "</section>"
    );
  }

  function costModelBlock(costModel) {
    if (!costModel) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="cost-model">' +
      "<h2>" + escapeHtml(costModel.title || "Cost and capacity") + "</h2>" +
      (hasText(costModel.intro) ? "<p>" + escapeHtml(costModel.intro) + "</p>" : "") +
      '<div class="estimation-grid">' +
      listCard("Main cost drivers", costModel.costDrivers) +
      listCard("Capacity checks", costModel.capacityChecks) +
      listCard("Optimization levers", costModel.optimizationLevers) +
      listCard("When to spend more", costModel.whenToSpendMore) +
      "</div>" +
      (hasText(costModel.closing) ? '<p class="takeaway-note">' + escapeHtml(costModel.closing) + "</p>" : "") +
      "</section>"
    );
  }

  function evolutionStagesBlock(evolutionStages) {
    if (!hasList(evolutionStages)) {
      return "";
    }

    return (
      '<section class="detail-section panel" id="evolution-stages">' +
      "<h2>Evolution path</h2>" +
      '<div class="step-flow">' +
      evolutionStages
        .map(function (stage, index) {
          return (
            '<article class="flow-step">' +
            '<span class="flow-number">' + escapeHtml(stage.stage || String(index + 1)) + "</span>" +
            "<h3>" + escapeHtml(stage.title) + "</h3>" +
            "<p>" + escapeHtml(stage.description) + "</p>" +
            "</article>"
          );
        })
        .join("") +
      "</div>" +
      "</section>"
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

  