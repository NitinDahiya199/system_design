import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "scripts", "detail-page.js"), "utf8");

const start = src.indexOf("function sectionBlock");
const end = src.indexOf("function setupSectionNav");
if (start === -1 || end === -1) {
  throw new Error("Could not slice detail-page.js");
}
let helpers = src.slice(start, end);

helpers = helpers.replace(/helper\.escapeHtml/g, "escapeHtml");
helpers = helpers.replace(/helper\.linkList\(/g, "linkListHtml(");

const header = `/* eslint-disable @typescript-eslint/no-explicit-any */
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

`;

const out = header + helpers;
fs.writeFileSync(path.join(root, "lib", "detail-render.ts"), out);
console.log("Wrote lib/detail-render.ts");
