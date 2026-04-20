"use client";

import { useMemo } from "react";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { buildPostUrl } from "@/lib/task-data";
import { normalizeCategory, isValidCategory } from "@/lib/categories";
import type { TaskKey } from "@/lib/site-config";
import type { SitePost } from "@/lib/site-connector";
import { getLocalPostsForTask } from "@/lib/local-posts";

type Props = {
  task: TaskKey;
  initialPosts: SitePost[];
  category?: string;
};

const CLASSIFIED_FALLBACK_ADS = [
  {
    id: "classified-fallback-1",
    slug: "royal-enfield-classic-350-2021-single-owner",
    title: "Royal Enfield Classic 350 (2021) - Single Owner",
    price: "INR 1,58,000",
    location: "Ludhiana, Punjab",
    summary: "Well-maintained bike with service records, insurance valid till Dec 2026, and no accidental history.",
    badge: "For Sale",
  },
  {
    id: "classified-fallback-2",
    slug: "2bhk-apartment-for-rent-model-town",
    title: "2BHK Apartment for Rent Near Model Town",
    price: "INR 18,500 / month",
    location: "Model Town, Jalandhar",
    summary: "Semi-furnished, 24x7 water supply, gated entry, and walking distance to market and schools.",
    badge: "Property",
  },
  {
    id: "classified-fallback-3",
    slug: "part-time-accountant-evening-shift",
    title: "Part-Time Accountant Needed (Evening Shift)",
    price: "INR 15,000 - 22,000",
    location: "Amritsar, Punjab",
    summary: "GST and Tally experience preferred. Suitable for candidates looking for flexible evening work.",
    badge: "Jobs",
  },
] as const;

export function TaskListClient({ task, initialPosts, category }: Props) {
  const localPosts = getLocalPostsForTask(task);

  const merged = useMemo(() => {
    const bySlug = new Set<string>();
    const combined: Array<SitePost & { localOnly?: boolean; task?: TaskKey }> = [];

    localPosts.forEach((post) => {
      if (post.slug) {
        bySlug.add(post.slug);
      }
      combined.push(post);
    });

    initialPosts.forEach((post) => {
      if (post.slug && bySlug.has(post.slug)) return;
      combined.push(post);
    });

    const normalizedCategory = category ? normalizeCategory(category) : "all";
    if (normalizedCategory === "all") {
      return combined.filter((post) => {
        const content = post.content && typeof post.content === "object" ? post.content : {};
        const value = typeof (content as any).category === "string" ? (content as any).category : "";
        return !value || isValidCategory(value);
      });
    }

    return combined.filter((post) => {
      const content = post.content && typeof post.content === "object" ? post.content : {};
      const value =
        typeof (content as any).category === "string"
          ? normalizeCategory((content as any).category)
          : "";
      return value === normalizedCategory;
    });
  }, [category, initialPosts, localPosts]);

  if (!merged.length) {
    if (task === "classified") {
      return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLASSIFIED_FALLBACK_ADS.map((ad) => (
            <a
              key={ad.id}
              href={`/classifieds/${ad.slug}`}
              className="group rounded-[1.5rem] border border-[rgba(42,31,26,0.12)] bg-white p-5 shadow-[0_14px_32px_rgba(42,31,26,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(42,31,26,0.12)]"
            >
              <p className="inline-flex rounded-full bg-[#2a1f1a] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f3e4c9]">
                {ad.badge}
              </p>
              <h3 className="mt-3 line-clamp-2 text-xl font-semibold leading-snug text-[#2a1f1a]">{ad.title}</h3>
              <p className="mt-2 text-sm font-semibold text-[#a98b76]">{ad.price}</p>
              <p className="mt-2 text-sm text-[#5c4a42]">{ad.location}</p>
              <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#5c4a42]">{ad.summary}</p>
              <p className="mt-5 text-sm font-semibold text-[#a98b76]">View details</p>
            </a>
          ))}
        </div>
      );
    }

    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        No posts yet for this section.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {merged.map((post) => {
        const localOnly = (post as any).localOnly;
        const href = localOnly
          ? `/local/${task}/${post.slug}`
          : buildPostUrl(task, post.slug);
        return <TaskPostCard key={post.id} post={post} href={href} taskKey={task} />;
      })}
    </div>
  );
}
