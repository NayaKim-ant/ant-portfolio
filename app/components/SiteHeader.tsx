import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-sheet">
        <Link className="brand-mark" href="/" aria-label="Ant home">
          Ant✌
        </Link>

        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/contact" className="nav-link">
            Contact
          </Link>

          <div className="portfolio-nav">
            <Link href="/portfolio" className="nav-link portfolio-trigger">
              Portfolio
            </Link>
            <div className="portfolio-menu" aria-label="Portfolio sections">
              <Link href="/portfolio">Overview</Link>
              <Link href="/portfolio/projects">Projects</Link>
            </div>
          </div>

          <Link href="/commissions" className="nav-link">
            Commissions
          </Link>
        </nav>
      </div>
    </header>
  );
}
