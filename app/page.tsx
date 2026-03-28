import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Design Study Hub",
  description:
    "A site for learning system design and preparing for interviews.",
};

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Static learning site for interviews</p>
          <h1>
            Study system design with simple lessons, deep pages, and
            interview-ready examples.
          </h1>
          <p className="hero-text">
            Move from basic ideas to full case studies without leaving the site.
            Study fundamentals, architecture building blocks, interview strategy,
            production-depth topics, and a much larger set of classic prompts in
            one place, with timed practice, mock conversations, and stronger
            senior-level trade-offs.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/fundamentals">
              Start With Basics
            </Link>
            <Link className="button button-secondary" href="/case-studies">
              Open Case Studies
            </Link>
          </div>
        </div>

        <aside className="hero-panel" aria-label="Study focus areas">
          <h2>This site now helps you do more</h2>
          <ul className="stack-list">
            <li>Open every major topic in its own full explanation page</li>
            <li>Learn in simple words with multiple real-world examples</li>
            <li>Connect related ideas through linked study pages</li>
            <li>Prepare for interviews without jumping to other sites</li>
            <li>
              Use deeper case studies like Netflix, WhatsApp, Zoom, and payment
              systems
            </li>
            <li>
              Practice with timed drills, sample spoken answers, and answer-quality
              comparisons
            </li>
          </ul>
        </aside>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Roadmap</p>
          <h2>A practical study flow</h2>
          <p>
            Use the pages in order if you are starting out, or jump straight to
            the interview prep and case-study sections when revising.
          </p>
        </div>

        <div className="roadmap">
          <article className="roadmap-step">
            <span className="step-number">01</span>
            <h3>Fundamentals</h3>
            <p>
              Build intuition around scaling, performance, consistency, and
              reliability.
            </p>
          </article>
          <article className="roadmap-step">
            <span className="step-number">02</span>
            <h3>Components</h3>
            <p>
              Learn where caches, queues, CDNs, proxies, and databases fit in.
            </p>
          </article>
          <article className="roadmap-step">
            <span className="step-number">03</span>
            <h3>Interview Prep</h3>
            <p>
              Practice clarifying requirements, estimating scale, and comparing
              options.
            </p>
          </article>
          <article className="roadmap-step">
            <span className="step-number">04</span>
            <h3>Case Studies</h3>
            <p>
              Apply the framework to classic prompts like chat, feeds, and URL
              shorteners.
            </p>
          </article>
          <article className="roadmap-step">
            <span className="step-number">05</span>
            <h3>Production Depth</h3>
            <p>
              Study migrations, SLOs, incidents, compliance, cost, and how
              systems evolve safely.
            </p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Study Topics</p>
          <h2>Pick a learning track</h2>
          <p>
            Each section now opens into many detailed pages, so you can move from
            summary cards to full explanations.
          </p>
        </div>

        <div className="card-grid">
          <article className="topic-card">
            <p className="card-tag">Core ideas</p>
            <h3>Fundamentals</h3>
            <p>
              Understand latency, throughput, availability, partitioning,
              replication, and consistency before diving into system building
              blocks.
            </p>
            <Link className="text-link" href="/fundamentals">
              Explore fundamentals
            </Link>
          </article>

          <article className="topic-card">
            <p className="card-tag">Architecture pieces</p>
            <h3>Components</h3>
            <p>
              Review how load balancers, caches, databases, queues, APIs, and
              CDNs are used in modern distributed systems.
            </p>
            <Link className="text-link" href="/components">
              Review components
            </Link>
          </article>

          <article className="topic-card">
            <p className="card-tag">Interview strategy</p>
            <h3>Interview Prep</h3>
            <p>
              Follow a repeatable answer framework, estimation checklist, and
              bottleneck review process for whiteboard interviews.
            </p>
            <Link className="text-link" href="/interview-prep">
              Practice the framework
            </Link>
          </article>

          <article className="topic-card">
            <p className="card-tag">Applied practice</p>
            <h3>Case Studies</h3>
            <p>
              See how prompts like URL shortener, YouTube, Uber, and Dropbox are
              broken down into requirements, architecture, and scaling
              decisions.
            </p>
            <Link className="text-link" href="/case-studies">
              Open case studies
            </Link>
          </article>

          <article className="topic-card">
            <p className="card-tag">Senior production layer</p>
            <h3>Production Depth</h3>
            <p>
              Learn the missing senior material: safe rollouts, live migrations,
              incidents, cost planning, compliance, multi-tenancy, and hard
              distributed-system failures.
            </p>
            <Link className="text-link" href="/production-depth">
              Open production depth
            </Link>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Featured Deep Dives</p>
          <h2>Jump straight into popular interview topics</h2>
          <p>
            These are good starting points if you want detailed study pages right
            away.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <p className="card-tag">Fundamental</p>
            <h3>Idempotency</h3>
            <p>
              Understand why retries can create duplicate actions and how good
              systems prevent that.
            </p>
            <Link className="text-link" href="/fundamentals/idempotency">
              Open full page
            </Link>
          </article>

          <article className="feature-card">
            <p className="card-tag">Component</p>
            <h3>Search Systems</h3>
            <p>
              Learn why search is a separate system, how indexes work, and what
              freshness trade-offs appear.
            </p>
            <Link className="text-link" href="/components/search-systems">
              Open full page
            </Link>
          </article>

          <article className="feature-card">
            <p className="card-tag">Case Study</p>
            <h3>Design Payment System</h3>
            <p>
              Study correctness, idempotency, audit logs, retries, and safe
              payment state changes.
            </p>
            <Link className="text-link" href="/case-studies/payment-system">
              Open full page
            </Link>
          </article>

          <article className="feature-card">
            <p className="card-tag">Production Depth</p>
            <h3>Safe Deployments and Rollouts</h3>
            <p>
              Study canaries, feature flags, blast-radius control, and safe
              release thinking for senior interviews.
            </p>
            <Link
              className="text-link"
              href="/production-depth/safe-deployments-and-rollouts"
            >
              Open full page
            </Link>
          </article>
        </div>
      </section>

      <section className="section split-panel">
        <article className="panel">
          <div className="section-heading compact">
            <p className="eyebrow">Practice Mode</p>
            <h2>Train like a real interview</h2>
          </div>
          <ul className="check-list">
            <li>Timed prompts help you practice short structured answers.</li>
            <li>
              Mock interview conversations show how a strong answer sounds out
              loud.
            </li>
            <li>
              Good-vs-weak comparisons make answer quality easier to judge.
            </li>
            <li>
              Failure scenarios and debugging checklists push beyond memorized
              answers.
            </li>
          </ul>
        </article>

        <article className="panel">
          <div className="section-heading compact">
            <p className="eyebrow">Senior Depth</p>
            <h2>Go beyond beginner answers</h2>
          </div>
          <ul className="stack-list">
            <li>Multi-region design where it matters.</li>
            <li>Production consistency trade-offs and stale-data decisions.</li>
            <li>Observability, backpressure, and overload protection.</li>
            <li>Security and privacy decisions for real production systems.</li>
            <li>
              Migrations, SLOs, incidents, tenancy, and cost-growth decisions.
            </li>
          </ul>
        </article>
      </section>

      <section className="section split-panel">
        <article className="panel">
          <div className="section-heading compact">
            <p className="eyebrow">Revision Strategy</p>
            <h2>How to use this site effectively</h2>
          </div>
          <ul className="check-list">
            <li>
              Start each session with the quick revision notes on a topic page.
            </li>
            <li>
              Read the deeper explanation only after you can restate the
              headline ideas.
            </li>
            <li>Say trade-offs out loud as if you are answering an interviewer.</li>
            <li>
              Use the case studies page to connect concepts into end-to-end
              designs.
            </li>
          </ul>
        </article>

        <article className="panel">
          <div className="section-heading compact">
            <p className="eyebrow">What Interviewers Want</p>
            <h2>Signals you should practice</h2>
          </div>
          <div className="pill-row" aria-label="Interview signals">
            <span className="pill">Clarity</span>
            <span className="pill">Trade-offs</span>
            <span className="pill">Scalability</span>
            <span className="pill">Reliability</span>
            <span className="pill">Prioritization</span>
            <span className="pill">Communication</span>
          </div>
          <p className="muted">
            Strong interview answers are rarely about naming every tool. They
            focus on choosing the right trade-offs for the scale and product
            requirements.
          </p>
        </article>
      </section>
    </main>
  );
}
