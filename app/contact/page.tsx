import { mockDb } from "../api/_data/mock-database";

export default function Contact() {
  const contact = mockDb.content.contact;

  return (
    <div className="site-shell paper-page">
      <main className="contact-page">
        <header className="contact-intro">
          <p className="page-eyebrow">Say hello</p>
          <h1 className="leaf-heading">Contact Ant</h1>
          <p>{contact.introduction}</p>
        </header>

        <section className="contact-method" aria-labelledby="instagram-contact">
          <div className="contact-copy">
            <h2 id="instagram-contact" className="leaf-heading">
              Instagram
            </h2>
            <p>{contact.introduction}</p>
            <a className="pencil-button" href={contact.instagramUrl}>
              Visit account
            </a>
          </div>
          <div className="contact-image-placeholder">{contact.instagramImage.alt}</div>
        </section>

        <section className="contact-method email-method" aria-labelledby="email-contact">
          <div className="contact-copy">
            <h2 id="email-contact" className="leaf-heading">
              Email
            </h2>
            <p>
              {contact.email}
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <a className="pencil-button" href={`mailto:${contact.email}`}>
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
          <p>{contact.availableHours}</p>
        </section>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
