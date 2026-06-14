"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { commissionTypes } from "../api/commission-types/data";
import { useAntPortfolioStore } from "../store";
import type { CommissionModal } from "../store";

type AuthAction = "inquiry" | "order" | "account";

const processSteps = [
  ["01", "Inquiry", "Share the idea, references, deadline, and intended use."],
  ["02", "Quote", "I confirm the scope, price, and estimated schedule."],
  ["03", "Sketch", "You review the initial direction before rendering begins."],
  ["04", "Creation", "I complete the artwork and send progress updates."],
  ["05", "Delivery", "Final files are delivered after approval and payment."],
];

const commissions = [
  {
    id: "003",
    title: "Illustration",
    status: "In progress",
    type: "Illustration",
    quote: "$000",
    invoice: "Pending",
    current: true,
  },
  {
    id: "004",
    title: "Chibi pair",
    status: "Paid",
    type: "Chibi pair",
    quote: "$000",
    invoice: "Paid",
    current: true,
  },
  {
    id: "002",
    title: "Sketch",
    status: "Delivered",
    type: "Sketch",
    quote: "$000",
    invoice: "Paid",
    current: false,
  },
  {
    id: "001",
    title: "Illustration",
    status: "Delivered",
    type: "Illustration",
    quote: "$000",
    invoice: "Paid",
    current: false,
  },
];

const initialMessages = [
  { from: "admin", text: "Hello! I received your references." },
  { from: "user", text: "Thank you. Let me know if you need anything else." },
  { from: "admin", text: "I will send the first sketch here soon." },
];

export function CommissionsExperience() {
  const {
    commissionOpen,
    commissionView,
    commissionModal,
    commissionUser,
    selectedCommissionId,
    setCommissionView,
    openCommissionModal,
    closeCommissionModal,
    sendMagicLink,
    completeMagicLinkLogin,
    updateCommissionUser,
    selectCommission,
    logoutCommissionUser,
  } = useAntPortfolioStore();

  const [pendingAction, setPendingAction] = useState<AuthAction | null>(null);
  const [messages, setMessages] = useState(initialMessages);
  const [messageDraft, setMessageDraft] = useState("");

  const selectedCommission =
    commissions.find((commission) => commission.id === selectedCommissionId) ??
    commissions[0];
  const activeView =
    !commissionUser && commissionView !== "commissions"
      ? "commissions"
      : commissionView;

  const requireLogin = (action: AuthAction) => {
    if (!commissionUser) {
      setPendingAction(action);
      openCommissionModal("login");
      return;
    }

    setCommissionView("account");
  };

  const finishVerification = () => {
    completeMagicLinkLogin();
    setCommissionView(pendingAction === "account" ? "account" : "commissions");
    setPendingAction(null);
  };

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = messageDraft.trim();
    if (!text) return;
    setMessages((current) => [...current, { from: "user", text }]);
    setMessageDraft("");
  };

  return (
    <div className="site-shell paper-page commissions-shell">
      {activeView === "commissions" && (
        <CommissionsLanding
          loggedIn={Boolean(commissionUser)}
          userName={commissionUser?.name ?? ""}
          commissionOpen={commissionOpen}
          onLogin={() => requireLogin("account")}
          onMyPage={() => setCommissionView("account")}
          onInquiry={() => requireLogin("inquiry")}
          onOrder={() => requireLogin("order")}
        />
      )}

      {activeView === "account" && commissionUser && (
        <AccountPage
          name={commissionUser.name}
          email={commissionUser.email}
          onBack={() => setCommissionView("commissions")}
          onUpdate={() => openCommissionModal("updateInfo")}
          onSelectCommission={selectCommission}
          onInquiry={() => setCommissionView("commissions")}
          onOrder={() => setCommissionView("commissions")}
          onLogout={() => openCommissionModal("logout")}
        />
      )}

      {activeView === "detail" && commissionUser && (
        <CommissionDetail
          commission={selectedCommission}
          messages={messages}
          draft={messageDraft}
          onDraftChange={setMessageDraft}
          onSendMessage={sendMessage}
          onBack={() => setCommissionView("account")}
        />
      )}

      <CommissionModalLayer
        modal={commissionModal}
        currentName={commissionUser?.name ?? ""}
        currentEmail={commissionUser?.email ?? ""}
        onClose={closeCommissionModal}
        onAuthenticate={sendMagicLink}
        onVerified={finishVerification}
        onUpdate={updateCommissionUser}
        onLogout={logoutCommissionUser}
      />
    </div>
  );
}

function CommissionsLanding({
  loggedIn,
  userName,
  commissionOpen,
  onLogin,
  onMyPage,
  onInquiry,
  onOrder,
}: {
  loggedIn: boolean;
  userName: string;
  commissionOpen: boolean;
  onLogin: () => void;
  onMyPage: () => void;
  onInquiry: () => void;
  onOrder: () => void;
}) {
  return (
    <>
      <main className="commissions-page">
        <section className="commission-account-banner">
          <div>
            <h1>
              <span aria-hidden="true">{loggedIn ? "○" : "!"}</span>{" "}
              {loggedIn ? `Welcome, ${userName}!` : "Not logged in"}
            </h1>
            <p>
              {loggedIn
                ? "Your commission space is ready."
                : "Log in with only your name and email to order or ask a question."}
            </p>
          </div>
          <button
            className="pencil-button"
            type="button"
            onClick={loggedIn ? onMyPage : onLogin}
          >
            {loggedIn ? "My page" : "Click here to log in"}
          </button>
        </section>

        <section className="commission-hero">
          <h2 className="double-leaf-title">
            Commissions <strong>{commissionOpen ? "OPEN" : "CLOSED"}</strong>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tell me
            about the artwork you would like to make together.
          </p>
          <div className="commission-actions">
            <button className="outline-pencil-button" type="button" onClick={onInquiry}>
              Ask before ordering
            </button>
            <button
              className="pencil-button"
              type="button"
              onClick={onOrder}
              disabled={!commissionOpen}
            >
              Order a commission
            </button>
          </div>
        </section>

        <section className="commission-section">
          <h2 className="leaf-heading">Types available</h2>
          <div className="commission-type-list">
            {commissionTypes.map((type, index) => (
              <article className="commission-type-card" key={type.title}>
                <div className="commission-type-image">
                  {index === commissionTypes.length - 1 ? "your idea" : "sample"}
                </div>
                <div>
                  <h3>{type.title}</h3>
                  <p>{type.shortDescription}</p>
                  <Link
                    className="text-action"
                    href={`/commissions/${type.slug}`}
                  >
                    View more or buy this type
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="commission-section choice-help">
          <h2 className="leaf-heading">Not sure what to choose?</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Explain
            your idea and I can help find the right type.
          </p>
          <button className="outline-pencil-button" type="button" onClick={onInquiry}>
            Ask before ordering
          </button>
        </section>

        <section className="commission-section">
          <h2 className="leaf-heading">Process</h2>
          <div className="commission-process">
            {processSteps.map(([number, title, description]) => (
              <article className="process-card" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="commission-section commission-notes">
          <h2 className="leaf-heading">Notes &amp; disclaimers</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Prices,
            turnaround, revisions, usage rights, refunds, and final delivery
            details will be stated here.
          </p>
        </section>
      </main>
      <footer className="site-footer">© 2026 Ant</footer>
    </>
  );
}

function AccountPage({
  name,
  email,
  onBack,
  onUpdate,
  onSelectCommission,
  onInquiry,
  onOrder,
  onLogout,
}: {
  name: string;
  email: string;
  onBack: () => void;
  onUpdate: () => void;
  onSelectCommission: (id: string) => void;
  onInquiry: () => void;
  onOrder: () => void;
  onLogout: () => void;
}) {
  const current = commissions.filter((commission) => commission.current);
  const past = commissions.filter((commission) => !commission.current);

  return (
    <>
      <main className="commission-account-page">
        <div className="commission-page-heading">
          <h1 className="double-leaf-title">{name}&apos;s page</h1>
          <button className="text-action" type="button" onClick={onBack}>
            Back
          </button>
        </div>

        <section className="account-thread-section">
          <h2 className="leaf-heading">My account</h2>
          <div className="account-info">
            <dl>
              <div>
                <dt>Name</dt>
                <dd>{name}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{email}</dd>
              </div>
            </dl>
            <button className="outline-pencil-button" type="button" onClick={onUpdate}>
              Update my information
            </button>
          </div>
        </section>

        <CommissionList
          title="Current commissions"
          commissions={current}
          onSelect={onSelectCommission}
        />
        <CommissionList
          title="Past commissions"
          commissions={past}
          onSelect={onSelectCommission}
        />

        <section className="account-thread-section">
          <h2 className="leaf-heading">New chattings</h2>
          <div className="account-actions">
            <button className="outline-pencil-button" type="button" onClick={onInquiry}>
              Start an inquiry
            </button>
            <button className="pencil-button" type="button" onClick={onOrder}>
              Order a new commission
            </button>
          </div>
        </section>

        <section className="account-thread-section logout-section">
          <h2 className="leaf-heading">Logout</h2>
          <p>
            Logging out removes this mock session from the page. Your future
            database records will remain connected to your email.
          </p>
          <button className="outline-pencil-button" type="button" onClick={onLogout}>
            Log out
          </button>
        </section>
      </main>
      <footer className="site-footer">© 2026 Ant</footer>
    </>
  );
}

function CommissionList({
  title,
  commissions: list,
  onSelect,
}: {
  title: string;
  commissions: typeof commissions;
  onSelect: (id: string) => void;
}) {
  return (
    <section className="account-thread-section">
      <h2 className="leaf-heading">{title}</h2>
      <div className="account-commission-list">
        {list.map((commission) => (
          <button
            className="account-commission-card"
            type="button"
            key={commission.id}
            onClick={() => onSelect(commission.id)}
          >
            <span>#{commission.id}</span>
            <strong>{commission.title}</strong>
            <em>{commission.status}</em>
          </button>
        ))}
      </div>
    </section>
  );
}

function CommissionDetail({
  commission,
  messages,
  draft,
  onDraftChange,
  onSendMessage,
  onBack,
}: {
  commission: (typeof commissions)[number];
  messages: typeof initialMessages;
  draft: string;
  onDraftChange: (value: string) => void;
  onSendMessage: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}) {
  return (
    <>
      <main className="commission-detail-page">
        <div className="commission-page-heading">
          <p className="page-eyebrow">Commission detail</p>
          <button className="text-action" type="button" onClick={onBack}>
            Back
          </button>
        </div>

        <article className="commission-postcard">
          <span className="masking-tape" aria-hidden="true" />
          <h1>Commission #{commission.id}</h1>
          <dl>
            <div>
              <dt>Status</dt>
              <dd>{commission.status}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{commission.type}</dd>
            </div>
            <div>
              <dt>Quote</dt>
              <dd>{commission.quote}</dd>
            </div>
            <div>
              <dt>Invoice</dt>
              <dd>{commission.invoice}</dd>
            </div>
          </dl>
        </article>

        <section className="messages-section">
          <h2 className="leaf-heading">Messages</h2>
          <div className="chat-window">
            <div className="chat-log">
              {messages.map((message, index) => (
                <p className={`chat-bubble ${message.from}`} key={`${message.text}-${index}`}>
                  {message.text}
                </p>
              ))}
            </div>
            <form className="chat-form" onSubmit={onSendMessage}>
              <label className="visually-hidden" htmlFor="commission-message">
                Message
              </label>
              <input
                id="commission-message"
                value={draft}
                onChange={(event) => onDraftChange(event.target.value)}
                placeholder="Write a message..."
              />
              <button className="pencil-button" type="submit">
                Send
              </button>
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer">© 2026 Ant</footer>
    </>
  );
}

function CommissionModalLayer({
  modal,
  currentName,
  currentEmail,
  onClose,
  onAuthenticate,
  onVerified,
  onUpdate,
  onLogout,
}: {
  modal: CommissionModal;
  currentName: string;
  currentEmail: string;
  onClose: () => void;
  onAuthenticate: (user: { name: string; email: string }) => void;
  onVerified: () => void;
  onUpdate: (user: { name: string; email: string }) => void;
  onLogout: () => void;
}) {
  if (!modal) return null;

  return (
    <div className="commission-modal-backdrop" role="presentation">
      <div
        className="commission-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="commission-modal-title"
      >
        {modal === "login" && (
          <UserForm
            title="Welcome!"
            submitLabel="Authenticate"
            initialName={currentName}
            initialEmail={currentEmail}
            onCancel={onClose}
            onSubmit={onAuthenticate}
          />
        )}

        {modal === "emailSent" && (
          <>
            <h2 id="commission-modal-title">Email sent</h2>
            <p>
              A mock authentication email has been sent. In the future, its
              magic link will verify the user and reopen this page.
            </p>
            <div className="modal-actions">
              <button className="outline-pencil-button" type="button">
                Resend email
              </button>
              <button className="pencil-button" type="button" onClick={onVerified}>
                Continue as verified
              </button>
            </div>
          </>
        )}

        {modal === "updateInfo" && (
          <UserForm
            title="Update information"
            submitLabel="Confirm"
            initialName={currentName}
            initialEmail={currentEmail}
            onCancel={onClose}
            onSubmit={onUpdate}
          />
        )}

        {modal === "logout" && (
          <>
            <h2 id="commission-modal-title">Are you sure to log out?</h2>
            <p>
              You will return to the public commissions page and need to log in
              again to see My Page.
            </p>
            <div className="modal-actions">
              <button className="outline-pencil-button" type="button" onClick={onClose}>
                Cancel
              </button>
              <button className="pencil-button" type="button" onClick={onLogout}>
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function UserForm({
  title,
  submitLabel,
  initialName,
  initialEmail,
  onCancel,
  onSubmit,
}: {
  title: string;
  submitLabel: string;
  initialName: string;
  initialEmail: string;
  onCancel: () => void;
  onSubmit: (user: { name: string; email: string }) => void;
}) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({
      name: name.trim() || "Aphid",
      email: email.trim() || "aphid@example.com",
    });
  };

  return (
    <form onSubmit={submit}>
      <h2 id="commission-modal-title">{title}</h2>
      <label>
        Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
      </label>
      <div className="modal-actions">
        <button className="outline-pencil-button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className="pencil-button" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
