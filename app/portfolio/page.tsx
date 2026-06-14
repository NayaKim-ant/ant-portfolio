import Link from "next/link";

const workflowSteps = ["rough sketch", "color study", "final artwork"];

export default function PortfolioOverview() {
  return (
    <div className="site-shell paper-page">
      <main className="portfolio-overview">
        <header className="portfolio-intro">
          <p className="page-eyebrow">Portfolio</p>
          <h1>Overview</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere, lectus sed facilisis hendrerit, erat nibh viverra neque,
            vitae feugiat tellus arcu eget justo.
          </p>
        </header>

        <section className="featured-work" aria-labelledby="featured-title">
          <h2 id="featured-title" className="visually-hidden">
            Featured artwork
          </h2>
          <div className="hanging-line" aria-hidden="true" />
          <div className="hanging-gallery">
            <figure className="hanging-note">
              <span className="paper-pin" aria-hidden="true" />
              <div className="art-placeholder">best piece 01</div>
              <figcaption>Artwork title</figcaption>
            </figure>
            <figure className="hanging-note">
              <span className="paper-pin" aria-hidden="true" />
              <div className="art-placeholder">best piece 02</div>
              <figcaption>Artwork title</figcaption>
            </figure>
            <figure className="hanging-note">
              <span className="paper-pin" aria-hidden="true" />
              <div className="art-placeholder">best piece 03</div>
              <figcaption>Artwork title</figcaption>
            </figure>
          </div>
          <p className="section-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            viverra velit quis justo eleifend, sed viverra augue dictum.
          </p>
        </section>

        <section className="portfolio-section viewpoint-section">
          <h2 className="leaf-heading">Artistic viewpoint</h2>
          <div className="viewpoint-layout">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              facilisi. Curabitur commodo, quam vel malesuada feugiat, justo
              dolor aliquet sem, quis finibus tellus lectus ut nisi. Vivamus
              pretium felis vitae sapien posuere.
            </p>
            <div className="sticky-pair" aria-label="Artistic viewpoint artwork placeholders">
              <div className="sticky-art">artwork</div>
              <div className="sticky-art">artwork</div>
            </div>
          </div>
        </section>

        <section className="portfolio-section workflow-section">
          <h2 className="leaf-heading">Workflow</h2>
          <div className="workflow-list">
            {workflowSteps.map((step, index) => (
              <div className="workflow-step" key={step}>
                <div className="workflow-image">
                  <span>{step}</span>
                </div>
                <p>
                  <strong>0{index + 1}</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="portfolio-section traditional-section">
          <h2 className="leaf-heading">Traditional art &amp; crafts</h2>
          <div className="traditional-layout">
            <div className="traditional-notes" aria-label="Traditional artwork placeholders">
              <div className="sticky-art wide-sticky">traditional art</div>
              <div className="sticky-art tall-sticky">craft</div>
              <div className="sticky-art small-sticky">detail</div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt nibh in magna tincidunt, vel elementum lacus
              sollicitudin. Suspendisse potenti.
            </p>
          </div>
        </section>

        <section className="portfolio-section projects-preview">
          <h2 className="leaf-heading">Projects</h2>

          <article className="project-preview">
            <div>
              <h3>Original characters</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                euismod neque quis massa malesuada.
              </p>
            </div>
            <div className="open-book" aria-label="Original character artwork placeholders">
              <div className="book-page">artwork</div>
              <div className="book-page">artwork</div>
            </div>
          </article>

          <article className="project-preview reverse-preview">
            <div>
              <h3>Fanarts</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                euismod neque quis massa malesuada.
              </p>
            </div>
            <div className="open-book" aria-label="Fanart placeholders">
              <div className="book-page">artwork</div>
              <div className="book-page">artwork</div>
            </div>
          </article>

          <Link className="projects-link" href="/portfolio/projects">
            View more projects
          </Link>
        </section>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
