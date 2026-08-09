"use client";
import { useEffect, useRef, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useQuoteModal } from "./QuoteModalProvider";
import { useRegion } from "@/components/Region/RegionProvider";

// —— Tipos ——
type Form = {
  name: string;
  email: string;
  phone: string; // WhatsApp
  region: string;
  type: "residencial" | "industrial" | "asesoria" | "campo";
  consumption: string; // kWh/mes
  message: string;
};

const empty: Form = {
  name: "",
  email: "",
  phone: "",
  region: "AR",
  type: "residencial",
  consumption: "",
  message: "",
};

const API_ORIGIN = 'https://api.dinovatio.com.ar';

const API_QUOTE_URL = `${API_ORIGIN}/api/quote`;

// —— Estilos reutilizables ——
const fieldBase =
  "w-full rounded-xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 px-3 py-2 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 disabled:opacity-60 disabled:cursor-not-allowed text-sm sm:text-base";

const labelBase = "text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200";

const hintBase = "mt-1 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400";

const errorText = "mt-1 text-[11px] sm:text-xs text-red-600";

// —— Config adjuntos ——
const MAX_FILES = 6;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
]);

type ImgFile = { id: string; file: File; url: string };

export default function QuoteModal() {
  const { isOpen, close } = useQuoteModal();
  const { region, setRegion, regions } = useRegion();

  const [data, setData] = useState<Form>({ ...empty, region });
  const [loading, setLoading] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});

  // —— Adjuntos ——
  const [photos, setPhotos] = useState<ImgFile[]>([]);
  const [photosError, setPhotosError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // —— Refs & focus ——
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  // Mantener region en sync con el provider
  useEffect(() => {
    setData((d) => ({ ...d, region }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, isOpen]);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    if (!isOpen) return;
    lastActiveElement.current = document.activeElement as HTMLElement;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Foco inicial
    setTimeout(() => firstFieldRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = originalOverflow;
      // Restaurar foco
      lastActiveElement.current?.focus?.();
    };
  }, [isOpen]);

  // Limpiar adjuntos al cerrar
  useEffect(() => {
    if (isOpen) return;
    // revoke urls
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setPhotos([]);
    setPhotosError(null);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cerrar con ESC y trap de foco
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") trapFocus(e);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  // Focus trap sencillo
  const trapFocus = (e: KeyboardEvent) => {
    const el = dialogRef.current;
    if (!el) return;
    const focusables = el.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement;
    if (e.shiftKey && active === first) {
      (last as HTMLElement).focus();
      e.preventDefault();
    } else if (!e.shiftKey && active === last) {
      (first as HTMLElement).focus();
      e.preventDefault();
    }
  };

  if (!isOpen) return null;

  const onChange = (k: keyof Form, v: string) => {
    setData((d) => ({ ...d, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
    if (k === "region") setRegion(v);
  };

  // Validaciones por campo
  const validate = (): Partial<Record<keyof Form, string>> => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!data.name.trim()) e.name = "El nombre es requerido";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Email inválido";
    if (!/^\+?\d{8,15}$/.test(data.phone.replace(/\s/g, ""))) e.phone = "WhatsApp inválido";
    if (!data.consumption || Number(data.consumption) <= 0) e.consumption = "Consumo debe ser mayor a 0";
    return e;
  };

  // Foco en el primer error
  const focusFirstError = (map: Partial<Record<keyof Form, string>>) => {
    const order: (keyof Form)[] = [
      "name",
      "email",
      "phone",
      "region",
      "type",
      "consumption",
      "message",
    ];
    const firstKey = order.find((k) => map[k]);
    if (!firstKey) return;
    const el = dialogRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`);
    el?.focus?.();
  };

  // ——— Manejo de imágenes ———
  const addFiles = (list: FileList | File[]) => {
    const incoming = Array.from(list);
    const currentCount = photos.length;
    let next: ImgFile[] = [];
    let error: string | null = null;

    for (const f of incoming) {
      if (currentCount + next.length >= MAX_FILES) {
        error = `Máximo ${MAX_FILES} fotos.`;
        break;
      }
      if (!ACCEPTED_MIME.has(f.type)) {
        error = "Formato no soportado. Usa JPG, PNG, WEBP, GIF o HEIC/HEIF.";
        continue;
      }
      if (f.size > MAX_SIZE) {
        error = `Cada archivo debe pesar hasta ${Math.round(MAX_SIZE / (1024 * 1024))} MB.`;
        continue;
      }
      const id = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`).toString();
      const url = URL.createObjectURL(f);
      next.push({ id, file: f, url });
    }

    if (error) setPhotosError(error);
    else setPhotosError(null);

    if (next.length) setPhotos((prev) => [...prev, ...next]);
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) addFiles(files);
    // reset input to allow re-selecting same file name
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => {
      const item = prev.find((p) => p.id === id);
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const dt = e.dataTransfer;
    if (dt?.files && dt.files.length) addFiles(dt.files);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };
  const onDragLeave = () => setDragOver(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOkMsg(null);
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) {
      focusFirstError(v);
      return;
    }
    setLoading(true);
    try {
      let res: Response;

      if (photos.length > 0) {
        // Enviar como multipart/form-data si hay fotos
        const formData = new FormData();
        Object.entries(data).forEach(([k, val]) => formData.append(k, String(val ?? "")));
        photos.forEach((p, idx) => formData.append("photos", p.file, p.file.name || `photo-${idx + 1}.jpg`));

        res = await fetch(API_QUOTE_URL, {
          method: "POST",
          body: formData,
          mode: "cors",
          credentials: "omit",
        });
      } else {
        // JSON como antes
        res = await fetch(API_QUOTE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          mode: "cors",
          credentials: "omit",
        });
      }

      if (!res.ok) throw new Error("No se pudo enviar la cotización");
      setOkMsg("¡Enviado! Te contactaremos a la brevedad.");
      // limpiar
      photos.forEach((p) => URL.revokeObjectURL(p.url));
      setPhotos([]);
      setPhotosError(null);
      setData((d) => ({ ...empty, region: d.region }));
    } catch {
      // Fallback: mailto (abre cliente de correo) — no adjunta archivos automáticamente.
      const body = encodeURIComponent(
        `Nombre: ${data.name}\nEmail: ${data.email}\nWhatsApp: ${data.phone}\nProvincia: ${data.region}\nTipo: ${data.type}\nConsumo (kWh/mes): ${data.consumption}\n\n${data.message}\n\n(Puedes adjuntar las fotos respondiendo este correo.)`
      );
      window.location.href = `mailto:contacto@dinovatio.com.ar?subject=Cotización Dínamo Energía&body=${body}`;
      setOkMsg("Abriendo tu cliente de correo…");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center px-2"
      aria-hidden={!isOpen}
    >
      {/* Fondo */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm sm:backdrop-blur-md"
        onClick={close}
        aria-label="Cerrar"
      />

      {/* Contenedor del diálogo */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        aria-describedby="quote-desc"
        className="pointer-events-auto relative w-full sm:max-w-2xl mx-auto rounded-t-2xl sm:rounded-2xl shadow-xl sm:shadow-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-neutral-950/95 overflow-hidden flex flex-col max-h-[min(92svh,700px)] sm:max-h-[min(92vh,720px)]"
      >
        {/* Header (sticky) */}
        <div className="sticky top-0 z-10 flex items-start justify-between px-4 sm:px-6 pt-4 pb-3 sm:pt-6 sm:pb-4 bg-gradient-to-b from-emerald-50 to-transparent dark:from-emerald-950/20">
          <div>
            <h3 id="quote-title" className="text-base sm:text-xl font-semibold tracking-tight">
              Solicitar cotización
            </h3>
            <p id="quote-desc" className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
              Déjanos tus datos y te contactamos. Los campos marcados con * son obligatorios.
            </p>
          </div>
          <button
            onClick={close}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Cerrar"
          >
            <X />
          </button>
        </div>

        {/* Formulario (scrollable content) */}
        <form onSubmit={onSubmit} aria-busy={loading} className="flex min-h-0 flex-1 flex-col overscroll-contain">
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-1 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {/* Nombre */}
              <div>
                <label htmlFor="name" className={labelBase}>
                  Nombre y apellido *
                </label>
                <input
                  ref={firstFieldRef}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={`${fieldBase} mt-1 ${errors.name ? "ring-2 ring-red-500/70" : ""}`}
                  value={data.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "err-name" : undefined}
                  required
                />
                {errors.name && (
                  <p id="err-name" role="alert" className={errorText}>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelBase}>
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={`${fieldBase} mt-1 ${errors.email ? "ring-2 ring-red-500/70" : ""}`}
                  value={data.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "err-email" : "email-hint"}
                  required
                />
                {!errors.email && <p id="email-hint" className={hintBase}></p>}
                {errors.email && (
                  <p id="err-email" role="alert" className={errorText}>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="phone" className={labelBase}>
                  WhatsApp (incluye código país) *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder={data.region === "AR" ? "+54 9 11 1234 5678" : "+54 261 1234 5678"}
                  className={`${fieldBase} mt-1 ${errors.phone ? "ring-2 ring-red-500/70" : ""}`}
                  value={data.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "err-phone" : undefined}
                  required
                />
                {errors.phone && (
                  <p id="err-phone" role="alert" className={errorText}>
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Región */}
              <div>
                <label htmlFor="region" className={labelBase}>
                  Región
                </label>
                <select
                  id="region"
                  name="region"
                  className={`${fieldBase} mt-1`}
                  value={data.region}
                  onChange={(e) => onChange("region", e.target.value)}
                >
                  {regions.map((x) => (
                    <option key={x.code} value={x.code}>
                      {x.flag} {x.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tipo */}
              <div>
                <label htmlFor="type" className={labelBase}>
                  Tipo de proyecto
                </label>
                <select
                  id="type"
                  name="type"
                  className={`${fieldBase} mt-1`}
                  value={data.type}
                  onChange={(e) => onChange("type", e.target.value)}
                >
                  <option value="residencial">Residencial</option>
                  <option value="industrial">Industrial</option>
                  <option value="campo">Campo</option>
                  <option value="asesoria">Asesoría</option>
                </select>
              </div>

              {/* Consumo */}
              <div>
                <label htmlFor="consumption" className={labelBase}>
                  Consumo mensual promedio (kWh) *
                </label>
                <input
                  id="consumption"
                  name="consumption"
                  type="number"
                  min={1}
                  className={`${fieldBase} mt-1 ${errors.consumption ? "ring-2 ring-red-500/70" : ""}`}
                  value={data.consumption}
                  onChange={(e) => onChange("consumption", e.target.value)}
                  aria-invalid={!!errors.consumption}
                  aria-describedby={errors.consumption ? "err-consumption" : "consumption-hint"}
                  required
                />
                {!errors.consumption && (
                  <p id="consumption-hint" className={hintBase}>
                    Un estimado nos ayuda a dimensionar la potencia del sistema.
                  </p>
                )}
                {errors.consumption && (
                  <p id="err-consumption" role="alert" className={errorText}>
                    {errors.consumption}
                  </p>
                )}
              </div>

              {/* Mensaje */}
              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelBase}>
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className={`${fieldBase} mt-1`}
                  placeholder="Cuéntanos brevemente tu necesidad y algunas características de tu instalación, por ejemplo: Tipo de techo, conexión monofásica o trifásica, si cuentas con conexión a la red, orientación del techo, etc. "
                  value={data.message}
                  onChange={(e) => onChange("message", e.target.value)}
                />
                <p className={hintBase}></p>
              </div>

              {/* Fotos del techo (opcional) */}
              <div className="sm:col-span-2">
                <label className={labelBase} htmlFor="photos-trigger">
                  Fotos del techo (opcional)
                </label>

                <div
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  className={[
                    "mt-1 rounded-xl border-2 border-dashed p-4 sm:p-5 transition",
                    dragOver
                      ? "border-emerald-500 bg-emerald-50/40 dark:bg-emerald-900/10"
                      : "border-black/10 dark:border-white/10 bg-white/60 dark:bg-neutral-900/60",
                  ].join(" ")}
                  aria-label="Zona para arrastrar y soltar imágenes"
                  aria-describedby="photos-hint"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      id="photos-trigger"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center justify-center rounded-lg border border-black/10 dark:border-white/10 px-3 py-2 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                    >
                      Seleccionar fotos
                    </button>
                    <p id="photos-hint" className="text-xs text-neutral-600 dark:text-neutral-400">
                      Arrastra y suelta aquí o haz clic para subir. Hasta {MAX_FILES} imágenes, máx {Math.round(MAX_SIZE / (1024 * 1024))} MB c/u. Formatos: JPG, PNG, WEBP, GIF, HEIC.
                    </p>
                  </div>

                  <input
                    ref={fileInputRef}
                    id="photos"
                    name="photos"
                    type="file"
                    accept="image/*,.heic,.heif"
                    multiple
                    className="sr-only"
                    onChange={onFileInputChange}
                  />

                  {/* Previews */}
                  {photos.length > 0 && (
                    <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {photos.map((p) => (
                        <div
                          key={p.id}
                          className="relative group aspect-square overflow-hidden rounded-lg border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-neutral-800"
                        >
                          <img
                            src={p.url}
                            alt="Vista previa"
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(p.id)}
                            className="absolute top-1 right-1 rounded-md bg-black/60 text-white p-1 opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
                            aria-label="Eliminar foto"
                            title="Eliminar"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Contador / error */}
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400">
                      {photos.length}/{MAX_FILES} seleccionadas
                    </span>
                    {photosError && (
                      <span role="alert" className={errorText}>
                        {photosError}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mensajes de estado accesibles */}
            <div aria-live="polite" className="mt-3 min-h-6">
              {okMsg && (
                <div className="rounded-lg bg-emerald-50 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200 border border-emerald-200/50 px-3 py-2 text-xs sm:text-sm">
                  {okMsg}
                </div>
              )}
              {Object.keys(errors).length > 0 && (
                <div
                  role="alert"
                  className="mt-2 rounded-lg bg-red-50 text-red-900 dark:bg-red-950/30 dark:text-red-200 border border-red-200/50 px-3 py-2 text-xs sm:text-sm"
                >
                  Revisa los campos marcados en rojo.
                </div>
              )}
            </div>
          </div>

          {/* Acciones (sticky bottom) */}
          <div className="sticky bottom-0 z-10 border-t border-black/5 dark:border-white/10 bg-white/95 dark:bg-neutral-950/95 px-4 sm:px-6 py-3 sm:py-4 pb-[calc(.75rem+env(safe-area-inset-bottom))]">
            <div className="flex justify-end gap-2 sm:gap-3">
              <button
                type="button"
                onClick={close}
                className="rounded-xl border border-black/10 dark:border-white/10 px-3 py-2 sm:px-4 sm:py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-sm sm:text-base"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 sm:px-5 sm:py-2.5 font-medium text-white shadow-sm hover:bg-emerald-700 disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Enviando…
                  </>
                ) : (
                  "Solicitar cotización"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
