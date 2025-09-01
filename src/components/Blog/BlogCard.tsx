import Image from "next/image";
import Link from "next/link";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;
  alt?: string;
  date?: string; // ISO
  minutes?: number;
};

type Props = { post: Post };

export default function BlogCard({ post }: Props) {
  return (
    <article
      className="rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-neutral-900 hover:shadow-md transition"
      aria-labelledby={`post-${post.slug}-title`}
    >
      {post.cover && (
        <div className="relative h-40 w-full">
          <Image
            src={post.cover}
            alt={post.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}

      <div className="p-4 sm:p-5">
        <h3 id={`post-${post.slug}-title`} className="text-lg font-semibold">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
          {post.excerpt}
        </p>

        {(post.date || post.minutes) && (
          <p className="mt-3 text-xs text-neutral-500">
            {post.date && new Date(post.date).toLocaleDateString("es-AR")} · {post.minutes || 4} min
          </p>
        )}
      </div>
    </article>
  );
}
