import Link from "next/link";
import { CommissionSamplesCarousel } from "./components/CommissionSamplesCarousel";

export default function Home() {
  return (
    <div className="site-shell home-shell">
      <div className="home-paper">
        <main className="home-main">
          <section className="home-hero" aria-labelledby="home-title">
            <div className="hero-title">
              <p>Have you seen</p>
              <h1 id="home-title">
                an <span>Ant</span> draw?
              </h1>
            </div>
            <div className="ant-mascot" aria-label="Ant mascot placeholder">
              <div className="ant-head" />
              <div className="ant-body" />
              <div className="ant-note" />
            </div>
          </section>

          <section className="do-section" aria-labelledby="what-ant-does">
            <h2 id="what-ant-does" className="leaf-heading centered-heading">
              What does Ant do?
            </h2>

            <article className="insta-row">
              <div className="instagram-card" aria-label="Instagram image placeholder">
                <div className="insta-avatar" />
                <div className="insta-lines">
                  <span />
                  <span />
                </div>
                <div className="insta-grid">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="insta-icons">
                  <b />
                  <b />
                  <b />
                </div>
              </div>

              <div className="text-block">
                <h3 className="leaf-heading">Instagram account</h3>
                <p className="home-placeholder-copy">
                  [Instagram account description goes here. Introduce what you
                  share and invite visitors to follow the account.]
                </p>
              </div>
            </article>

            <p className="aphids-line">
              ...it&apos;s a space for the Aphids &amp; the Ant
            </p>

            <article className="fan-row">
              <div className="text-block short-copy">
                <p className="home-placeholder-copy">
                  [Describe moments, stories, or interactions shared with the
                  Aphids and the Ant community.]
                </p>
              </div>
              <div className="fan-photos">
                <div className="soft-photo brown-photo" />
                <div className="soft-photo cream-photo" />
              </div>
            </article>
          </section>

          <section className="art-world-section" aria-labelledby="art-world">
            <h2 id="art-world" className="leaf-heading">
              Ant&apos;s artistic world
            </h2>

            <CommissionSamplesCarousel
              title="Ant's artistic world"
              samples={[
                "artwork placeholder 1",
                "artwork placeholder 2",
                "artwork placeholder 3",
                "artwork placeholder 4",
              ]}
              destinationHref="/portfolio"
            />

            <p className="home-placeholder-copy home-placeholder-wide">
              [Describe Ant&apos;s artistic world here. Add your skills,
              preferred styles, media, subjects, and the ideas behind your
              artwork.]
            </p>
          </section>

          <section className="commissions-home" aria-labelledby="home-commissions">
            <div className="commission-stack" aria-label="Commission samples placeholder">
              <div className="soft-photo stacked-photo photo-a" />
              <div className="soft-photo stacked-photo photo-b" />
              <div className="soft-photo stacked-photo photo-c" />
            </div>

            <div className="commission-copy">
              <h2 id="home-commissions" className="leaf-heading">
                Commissions
              </h2>
              <p className="home-placeholder-copy">
                [Introduce your commissions here. Mention what visitors can
                request and any important availability information.]
              </p>
              <Link className="commission-button" href="/commissions">
                Click here to commission!
              </Link>
            </div>
          </section>
        </main>

        <footer className="site-footer">©2026 Ant text</footer>
      </div>
    </div>
  );
}
