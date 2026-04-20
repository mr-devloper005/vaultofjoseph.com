import { PageShell } from "@/components/shared/page-shell";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin, Search, Tag } from "lucide-react";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";
import { TaskPostCard } from "@/components/shared/task-post-card";

export const revalidate = 3;

const SEARCH_FALLBACK_ADS = [
  {
    id: "search-fallback-1",
    title: "Royal Enfield Classic 350 (2021) - Single Owner",
    price: "INR 1,58,000",
    location: "Ludhiana, Punjab",
    summary: "Complete service history, clean papers, and weekend test ride available.",
    category: "For Sale",
    href: "/classifieds/royal-enfield-classic-350-2021-single-owner",
  },
  {
    id: "search-fallback-2",
    title: "2BHK Apartment for Rent Near Model Town",
    price: "INR 18,500 / month",
    location: "Model Town, Jalandhar",
    summary: "Semi-furnished apartment with parking, 24x7 water supply, and immediate move-in.",
    category: "Property",
    href: "/classifieds/2bhk-apartment-for-rent-model-town",
  },
  {
    id: "search-fallback-3",
    title: "Part-Time Accountant Needed (Evening Shift)",
    price: "INR 15,000 - 22,000",
    location: "Amritsar, Punjab",
    summary: "Tally and GST filing experience preferred. Flexible evening schedule.",
    category: "Jobs",
    href: "/classifieds/part-time-accountant-evening-shift",
  },
] as const;

const matchText = (value: string, query: string) =>
  value.toLowerCase().includes(query);

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");

const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";
  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster
      ? { fresh: true, category: category || undefined, task: task || undefined }
      : undefined
  );
  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((task) => getMockPostsForTask(task.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerpt = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerpt, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <PageShell
      title="Search"
      description={
        query
          ? `Results for "${query}"`
          : "Browse the latest posts across every task."
      }
      actions={
        <form action="/search" className="flex w-full gap-2 sm:w-auto">
          <input type="hidden" name="master" value="1" />
          {category ? <input type="hidden" name="category" value={category} /> : null}
          {task ? <input type="hidden" name="task" value={task} /> : null}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              defaultValue={query}
              placeholder="Search across tasks..."
              className="h-11 pl-9"
            />
          </div>
          <Button type="submit" className="h-11">
            Search
          </Button>
        </form>
      }
    >
      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((post) => {
            const task = getPostTaskKey(post);
            const href = task ? buildPostUrl(task, post.slug) : `/posts/${post.slug}`;
            return <TaskPostCard key={post.id} post={post} href={href} />;
          })}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
            No matching posts yet. Try these live-style listings:
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SEARCH_FALLBACK_ADS.map((ad) => (
              <Link
                key={ad.id}
                href={ad.href}
                className="group rounded-[1.5rem] border border-[rgba(42,31,26,0.12)] bg-white p-5 shadow-[0_14px_32px_rgba(42,31,26,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(42,31,26,0.12)]"
              >
                <p className="inline-flex items-center gap-1 rounded-full bg-[#2a1f1a] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f3e4c9]">
                  <Tag className="h-3.5 w-3.5" />
                  {ad.category}
                </p>
                <h3 className="mt-3 line-clamp-2 text-xl font-semibold leading-snug text-[#2a1f1a]">{ad.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[#a98b76]">{ad.price}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-[#5c4a42]">
                  <MapPin className="h-4 w-4 text-[#a98b76]" />
                  {ad.location}
                </p>
                <p className="mt-3 line-clamp-2 text-sm leading-7 text-[#5c4a42]">{ad.summary}</p>
                <p className="mt-5 text-sm font-semibold text-[#a98b76]">View listing →</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </PageShell>
  );
}
