import Link from "next/link";

type BackButtonProps =
  | {
      href: string;
      onClick?: never;
    }
  | {
      href?: never;
      onClick: () => void;
    };

export function BackButton({ href, onClick }: BackButtonProps) {
  const content = <span>Back</span>;

  if (href) {
    return (
      <Link
        className="shared-back-button"
        href={href}
        aria-label="Go back"
        title="Back"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className="shared-back-button"
      type="button"
      onClick={onClick}
      aria-label="Go back"
      title="Back"
    >
      {content}
    </button>
  );
}
