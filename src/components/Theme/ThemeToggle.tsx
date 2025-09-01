"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const current = theme === "system" ? systemTheme : theme;
  if (!mounted) return null;

  return (
    <button
      aria-label="Cambiar tema"
      onClick={() => setTheme(current === "dark" ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border
                 hover:bg-neutral-100 dark:hover:bg-neutral-800"
    >
      {current === "dark" ? <Sun size={18}/> : <Moon size={18}/>}
      <span className="text-sm">{current === "dark" ? "Claro" : "Oscuro"}</span>
    </button>
  );
}
