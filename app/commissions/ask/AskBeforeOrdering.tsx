"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { BackButton } from "../../components/BackButton";

const faqs = [
  {
    question: "What should I prepare before asking?",
    answer: "A short idea, references, intended use, and preferred deadline.",
  },
  {
    question: "Can I ask for a custom type?",
    answer: "Yes. Describe the format and I will tell you whether it is possible.",
  },
  {
    question: "How is the final price decided?",
    answer: "It depends on complexity, usage, timing, and requested additions.",
  },
  {
    question: "Can I ask without ordering afterward?",
    answer: "Of course. An inquiry does not commit you to an order.",
  },
  {
    question: "When will Ant reply?",
    answer: "Reply-time and available-hour details will be written here.",
  },
];

export function AskBeforeOrdering() {
  const [messages, setMessages] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = draft.trim();
    if (!message) return;
    setMessages((current) => [...current, message]);
    setDraft("");
  };

  return (
    <div className="site-shell paper-page">
      <main className="ask-commissions-page">
        <div className="subpage-title-row">
          <header className="ask-heading">
            <h1>Ask Ant anything about the commissions before ordering!</h1>
          </header>
          <BackButton href="/commissions" />
        </div>

        <section className="ask-section">
          <h2 className="leaf-heading">FAQs</h2>
          <div className="faq-note-grid">
            {faqs.map((faq) => (
              <article className="faq-note" key={faq.question}>
                <h3>Q. {faq.question}</h3>
                <p>A. {faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ask-section">
          <h2 className="leaf-heading">Messages</h2>
          <div className="inquiry-chat">
            <div className="inquiry-chat-log">
              {messages.length === 0 ? (
                <div className="empty-chat-state">
                  <p>
                    Start the chat by typing!
                    <br />
                    Or if you&apos;re ready:
                  </p>
                  <Link className="pencil-button" href="/commissions/order">
                    Order a commission
                  </Link>
                </div>
              ) : (
                messages.map((message, index) => (
                  <p className="chat-bubble user" key={`${message}-${index}`}>
                    {message}
                  </p>
                ))
              )}
            </div>
            <form className="chat-form" onSubmit={sendMessage}>
              <label className="visually-hidden" htmlFor="inquiry-message">
                Message
              </label>
              <input
                id="inquiry-message"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Start typing..."
              />
              <button className="pencil-button" type="submit">
                Send
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">© 2026 Ant</footer>
    </div>
  );
}
