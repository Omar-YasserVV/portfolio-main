"use client";
import { useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PostCard } from "@/components/post-card";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  fundamentals: "JS Fundamentals",
  advanced_js: "Advanced JS",
  advanced_topics: "Advanced Topics",
};

const CATEGORY_MATCHERS: Record<string, (cat: string) => boolean> = {
  all: () => true,
  fundamentals: (cat: string) => /fundamentals?/i.test(cat),
  advanced_js: (cat: string) => /adv(anced)?\s*js/i.test(cat),
  advanced_topics: (cat: string) => /adv(anced)?\s*topics?/i.test(cat),
};

function normalizeCategories(category?: string | string[]) {
  if (!category) return [] as string[];
  return Array.isArray(category) ? category : [category];
}

export function BlogListWithFilter({ posts }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const selected = (params.get("category") || "all").toLowerCase();

  const setCategory = (key: string) => {
    const sp = new URLSearchParams(params.toString());
    if (key === "all") sp.delete("category");
    else sp.set("category", key);
    router.push(`${pathname}?${sp.toString()}`);
  };

  const filtered = useMemo(() => {
    const matcher = CATEGORY_MATCHERS[selected] || CATEGORY_MATCHERS.all;
    return posts.filter((p: any) => {
      const cats = normalizeCategories(p.metadata.category);
      if (cats.length === 0) return selected === "all";
      return cats.some((c) => matcher(c));
    });
  }, [posts, selected]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      <aside className="md:sticky md:top-24 md:h-[calc(100vh-6rem)]">
        <nav className="dark:bg-secondary/40 backdrop-blur-md rounded-xl shadow-lg border border-white/5 p-3 md:p-4 space-y-1">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
            const isActive =
              selected === key || (key === "all" && selected === "");
            return (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-white/10 text-white border border-white/20"
                    : "text-blue-100 hover:bg-white/5"
                }`}
              >
                {label === "JS Fundamentals" ? (
                  <span>
                    JS Fundamentals <br /> ( helps with adv topics )
                  </span>
                ) : (
                  label
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      <div className="space-y-6">
        {filtered
          .sort((a: any, b: any) =>
            new Date(a.metadata.publishedAt) < new Date(b.metadata.publishedAt)
              ? -1
              : 1,
          )
          .map((post: any, id: any) => (
            <PostCard
              key={id}
              category={post.metadata.category || []}
              readTime={post.metadata.readTime}
              title={post.metadata.title}
              slug={post.slug}
              description={post.metadata.summary}
              date={post.metadata.publishedAt}
            />
          ))}
        {filtered.length === 0 && (
          <div className="text-blue-100">No posts found for this category.</div>
        )}
      </div>
    </div>
  );
}

export default BlogListWithFilter;
