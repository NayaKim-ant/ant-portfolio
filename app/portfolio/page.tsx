import Link from "next/link";
import { mockDb } from "../api/_data/mock-database";

export default function PortfolioOverview() {
  const portfolio = mockDb.content.portfolio;
  const projects = mockDb.content.projects;

  return (
    <div className="site-shell paper-page">
      <main className="portfolio-overview">
        <header className="portfolio-intro">
          <p className="page-eyebrow">Portfolio</p>
          <h1>Overview</h1>
          <p>{portfolio.introduction}</p>
        </header>

        <section className="featured-work" aria-labelledby="featured-title">
          <h2 id="featured-title" className="visually-hidden">
            Featured artwork
          </h2>
          <div className="hanging-line" aria-hidden="true" />
          <div className="hanging-gallery">
            {portfolio.featuredWorks.map((work) => (
              <figure className="hanging-note" key={work.id}>
                <span className="paper-pin" aria-hidden="true" />
                <div className="art-placeholder">{work.alt}</div>
                <figcaption>{work.alt}</figcaption>
              </figure>
            ))}
          </div>
          <p className="section-description">
            {portfolio.introduction}
          </p>
        </section>

        <section className="portfolio-section viewpoint-section">
          <h2 className="leaf-heading">Artistic viewpoint</h2>
          <div className="viewpoint-layout">
            <p>{portfolio.artisticViewpoint.body}</p>
            <div className="sticky-pair" aria-label="Artistic viewpoint artwork placeholders">
              {portfolio.artisticViewpoint.media.map((work) => (
                <div className="sticky-art" key={work.id}>{work.alt}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="portfolio-section workflow-section">
          <h2 className="leaf-heading">Workflow</h2>
          <div className="workflow-list">
            {portfolio.workflow.map((step, index) => (
              <div className="workflow-step" key={step.key}>
                <div className="workflow-image">
                  <span>{step.media[0].alt}</span>
                </div>
                <p>
                  <strong>0{index + 1}</strong> {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="portfolio-section traditional-section">
          <h2 className="leaf-heading">Traditional art &amp; crafts</h2>
          <div className="traditional-layout">
            <div className="traditional-notes" aria-label="Traditional artwork placeholders">
              {portfolio.traditionalArt.media.map((work) => (
                <div className="sticky-art wide-sticky" key={work.id}>{work.alt}</div>
              ))}
            </div>
            <p>{portfolio.traditionalArt.body}</p>
          </div>
        </section>

        <section className="portfolio-section projects-preview">
          <h2 className="leaf-heading">Projects</h2>

          {projects.map((project, index) => (
            <article
              className={`project-preview ${index % 2 ? "reverse-preview" : ""}`}
              key={project.id}
            >
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div className="open-book" aria-label={`${project.title} artwork placeholders`}>
                {project.media.map((work) => (
                  <div className="book-page" key={work.id}>{work.alt}</div>
                ))}
              </div>
            </article>
          ))}

          <Link className="projects-link" href="/portfolio/projects">
            View more projects
          </Link>
        </section>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
