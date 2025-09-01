"use client";

import { MessageCircle } from "lucide-react";
import { useRegion } from "@/components/Region/RegionProvider";

export default function WhatsAppFAB() {
  const { current } = useRegion();

  return (
    <a
      href={`https://wa.me/${current.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-[60] rounded-full p-4 shadow-xl
                 bg-green-500 text-white hover:bg-green-600
                 dark:bg-emerald-600 dark:hover:bg-emerald-500"
    >
      <MessageCircle />
    </a>
  );
}
