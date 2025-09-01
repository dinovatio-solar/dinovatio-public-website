// src/components/Region/isoToFlag.ts
export function isoToFlag(iso?: string) {
  if (!iso || iso.length !== 2) return "🌎";
  const code = iso.toUpperCase();
  const BASE = 0x1f1e6; // Regional Indicator 'A'
  const A = 65;         // 'A'
  return String.fromCodePoint(
    ...[...code].map((c) => BASE + (c.charCodeAt(0) - A))
  );
}
