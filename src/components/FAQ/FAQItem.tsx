"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = { question: string; answer: string };

export default function FAQItem({ question, answer }: Props) {
  const [open, setOpen] = useState(false);
  const contentId = useId();

  return (
    <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="font-medium">{question}</span>
        <ChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      <div
        id={contentId}
        role="region"
        aria-hidden={!open}
        className={`grid transition-all duration-200 px-4 ${open ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{answer}</p>
        </div>
      </div>
    </div>
  );
}
