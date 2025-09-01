"use client";
import { useRegion } from "./RegionProvider";

export default function RegionBar() {
  const { showBanner, setShowBanner, regions, region, setRegion } = useRegion();
  if (!showBanner) return null;

  return (
    <div className="w-full bg-amber-100 dark:bg-amber-900/40 border-b border-amber-300/60 dark:border-amber-700/60">
      <div className="max-w-6xl mx-auto px-4 py-2 text-sm flex items-center gap-3">
        <span>¿Querés ver información para tu región?</span>
        <select
          className="px-2 py-1 rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {regions.map((r) => (
            <option key={r.code} value={r.code}>{r.flag} {r.name}</option>
          ))}
        </select>
        <button onClick={() => setShowBanner(false)} className="ml-auto underline">Ocultar</button>
      </div>
    </div>
  );
}
