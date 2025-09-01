import Image, { type StaticImageData } from "next/image";

export type Story = {
  id: string;
  title: string;
  subtitle: string;
  image: string | StaticImageData; // ⬅️ acepta import estático o path string
  alt: string;
  kpi: { label: string; value: string }[];
  quote: string;
  author: string;
};

type Props = { story: Story };

export default function StoryCard({ story }: Props) {
  return (
    <article
      className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition"
      aria-labelledby={`story-${story.id}-title`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={story.image}
          alt={story.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-4 sm:p-5">
        <h3 id={`story-${story.id}-title`} className="text-lg font-semibold">
          {story.title}
        </h3>
        {story.subtitle && (
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            {story.subtitle}
          </p>
        )}

        {story.kpi && story.kpi.length > 0 && (
          <dl className="mt-4 grid grid-cols-2 gap-3">
            {story.kpi.map((k) => (
              <div key={k.label} className="rounded-xl bg-neutral-50 dark:bg-neutral-800 p-3">
                <dt className="text-xs text-neutral-500">{k.label}</dt>
                <dd className="text-base font-bold">{k.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {story.quote && (
          <blockquote className="mt-4 text-sm italic text-neutral-700 dark:text-neutral-300">
            “{story.quote}”
            {story.author && (
              <footer className="mt-2 not-italic text-xs text-neutral-500">— {story.author}</footer>
            )}
          </blockquote>
        )}
      </div>
    </article>
  );
}
