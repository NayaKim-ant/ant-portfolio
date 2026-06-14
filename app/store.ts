"use client";

import { create } from "zustand";

type PortfolioSection = "overview" | "projects";
export type CommissionView = "commissions" | "account" | "detail";
export type CommissionModal =
  | "login"
  | "emailSent"
  | "updateInfo"
  | "logout"
  | null;

type CommissionUser = {
  name: string;
  email: string;
};

type AntPortfolioState = {
  activePortfolioSection: PortfolioSection;
  commissionOpen: boolean;
  commissionView: CommissionView;
  commissionModal: CommissionModal;
  commissionUser: CommissionUser | null;
  pendingCommissionUser: CommissionUser | null;
  selectedCommissionId: string | null;
  setActivePortfolioSection: (section: PortfolioSection) => void;
  setCommissionOpen: (open: boolean) => void;
  setCommissionView: (view: CommissionView) => void;
  openCommissionModal: (modal: Exclude<CommissionModal, null>) => void;
  closeCommissionModal: () => void;
  sendMagicLink: (user: CommissionUser) => void;
  completeMagicLinkLogin: () => void;
  updateCommissionUser: (user: CommissionUser) => void;
  selectCommission: (id: string) => void;
  logoutCommissionUser: () => void;
};

export const useAntPortfolioStore = create<AntPortfolioState>((set) => ({
  activePortfolioSection: "overview",
  commissionOpen: true,
  commissionView: "commissions",
  commissionModal: null,
  commissionUser: null,
  pendingCommissionUser: null,
  selectedCommissionId: null,
  setActivePortfolioSection: (section) =>
    set({ activePortfolioSection: section }),
  setCommissionOpen: (open) => set({ commissionOpen: open }),
  setCommissionView: (view) => set({ commissionView: view }),
  openCommissionModal: (modal) => set({ commissionModal: modal }),
  closeCommissionModal: () => set({ commissionModal: null }),
  sendMagicLink: (user) =>
    set({ pendingCommissionUser: user, commissionModal: "emailSent" }),
  completeMagicLinkLogin: () =>
    set((state) => ({
      commissionUser: state.pendingCommissionUser,
      pendingCommissionUser: null,
      commissionModal: null,
      commissionView: "commissions",
    })),
  updateCommissionUser: (user) =>
    set({ commissionUser: user, commissionModal: null }),
  selectCommission: (id) =>
    set({
      selectedCommissionId: id,
      commissionView: "detail",
    }),
  logoutCommissionUser: () =>
    set({
      commissionUser: null,
      commissionView: "commissions",
      commissionModal: null,
      pendingCommissionUser: null,
      selectedCommissionId: null,
    }),
}));
