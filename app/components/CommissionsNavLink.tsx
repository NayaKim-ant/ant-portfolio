"use client";

import Link from "next/link";
import { useAntPortfolioStore } from "../store";

export function CommissionsNavLink() {
  const setCommissionView = useAntPortfolioStore(
    (state) => state.setCommissionView,
  );
  const closeCommissionModal = useAntPortfolioStore(
    (state) => state.closeCommissionModal,
  );

  return (
    <Link
      href="/commissions"
      className="nav-link"
      onClick={() => {
        setCommissionView("commissions");
        closeCommissionModal();
      }}
    >
      Commissions
    </Link>
  );
}
