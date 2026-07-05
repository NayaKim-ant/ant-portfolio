import { mockDb } from "../../api/_data/mock-database";

export default function PortfolioProjects() {
  const projects = mockDb.content.projects;

  return (
    <div className="site-shell">
      <main className="placeholder-page">
        <section className="paper-panel page-note">
          <p className="kicker">portfolio</p>
          <h1>Projects</h1>
          <p>Project collection placeholder text from the mock data source.</p>
          {projects.map((project) => (
            <article key={project.id}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="art-placeholder">{project.media[0]?.alt}</div>
            </article>
          ))}
        </section>
      </main>
      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
