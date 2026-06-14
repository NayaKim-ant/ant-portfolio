export default function Contact() {
  return (
    <div className="site-shell paper-page">
      <main className="contact-page">
        <header className="contact-intro">
          <p className="page-eyebrow">Say hello</p>
          <h1 className="leaf-heading">Contact Ant</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Send a
            message through the places below.
          </p>
        </header>

        <section className="contact-method" aria-labelledby="instagram-contact">
          <div className="contact-copy">
            <h2 id="instagram-contact" className="leaf-heading">
              Instagram
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Direct
              messages and comments are welcome.
            </p>
            <a className="pencil-button" href="#">
              Visit account
            </a>
          </div>
          <div className="contact-image-placeholder">Instagram image</div>
        </section>

        <section className="contact-method email-method" aria-labelledby="email-contact">
          <div className="contact-copy">
            <h2 id="email-contact" className="leaf-heading">
              Email
            </h2>
            <p>
              contact@example.com
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <a className="pencil-button" href="mailto:contact@example.com">
              Send an email
            </a>
          </div>
          <div className="letter-placeholder" aria-hidden="true">
            <span />
          </div>
        </section>

        <section className="availability" aria-labelledby="available-hours">
          <h2 id="available-hours" className="leaf-heading">
            Available hours
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            tempus tellus sed justo volutpat, vitae luctus lorem dignissim.
          </p>
        </section>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
