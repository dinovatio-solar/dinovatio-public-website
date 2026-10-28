"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import QuoteModal from "./QuoteModal";
import { EVENTS, trackEvent } from "@/lib/analytics";

type Ctx = { open: () => void; close: () => void; isOpen: boolean };
const QuoteCtx = createContext<Ctx | null>(null);

export default function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const value = {
    isOpen,
    open: () => {
      // Intencion de cotizar, todavia no es un lead: el lead es el envio.
      trackEvent(EVENTS.quoteOpen, {
        page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
      setOpen(true);
    },
    close: () => setOpen(false),
  };

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
