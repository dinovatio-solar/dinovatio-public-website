"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import QuoteModal from "./QuoteModal";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const QuoteCtx = createContext<Ctx | null>(null);

export default function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const value = { isOpen, open: () => setOpen(true), close: () => setOpen(false) };

  return (
    <QuoteCtx.Provider value={value}>
      {children}
      <QuoteModal />
    </QuoteCtx.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteCtx);
  if (!ctx) throw new Error("useQuoteModal must be used within QuoteModalProvider");
  return ctx;
}
