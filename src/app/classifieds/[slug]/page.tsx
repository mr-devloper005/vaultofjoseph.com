import { TaskDetailPage } from "@/components/tasks/task-detail-page";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";

export const revalidate = 3;

const FALLBACK_CLASSIFIED_DETAIL = {
  "royal-enfield-classic-350-2021-single-owner": {
    title: "Royal Enfield Classic 350 (2021) - Single Owner",
    price: "INR 1,58,000",
    location: "Ludhiana, Punjab",
    contact: "+91 98765 22011",
    posted: "Posted 2 days ago",
    category: "For Sale",
    description:
      "Single-owner bike with complete service history and valid insurance till Dec 2026. No accidental claim. New battery and rear tyre replaced in Jan 2026.",
    points: ["41,000 km run", "RC and transfer papers ready", "Test ride available on weekends"],
  },
  "2bhk-apartment-for-rent-model-town": {
    title: "2BHK Apartment for Rent Near Model Town",
    price: "INR 18,500 / month",
    location: "Model Town, Jalandhar",
    contact: "+91 98142 31008",
    posted: "Posted today",
    category: "Property",
    description:
      "Semi-furnished second-floor apartment with balcony, modular kitchen, and dedicated parking. Family-friendly lane with grocery and school within walking distance.",
    points: ["Security deposit: 1 month", "24x7 water + inverter backup", "Available for immediate move-in"],
  },
  "part-time-accountant-evening-shift": {
    title: "Part-Time Accountant Needed (Evening Shift)",
    price: "INR 15,000 - 22,000",
    location: "Amritsar, Punjab",
    contact: "+91 96462 78123",
    posted: "Posted 1 day ago",
    category: "Jobs",
    description:
      "Need part-time accountant for GST filing, vendor ledger updates, and monthly reconciliation. Prior Tally and basic Excel reporting experience preferred.",
    points: ["Shift: 5:30 PM - 9:30 PM", "Monday to Saturday", "Immediate joining preferred"],
  },
  "2019-honda-civic-lx-river-district": {
    title: "2019 Honda Civic LX",
    price: "$14,200 OBO",
    location: "River District · 12 mi",
    contact: "+1 (213) 555-0182",
    posted: "Posted 3 hours ago",
    category: "For Sale",
    description:
      "Clean title, full service history, and recently detailed interior. Well-kept daily driver with smooth transmission and cold AC.",
    points: ["Single owner", "No accident record", "Test drives on weekday evenings or Saturday morning"],
  },
  "solid-oak-dining-table-6-chairs": {
    title: "Solid oak dining table + 6 chairs",
    price: "$680",
    location: "Pickup near Old Town",
    contact: "+1 (213) 555-0116",
    posted: "Posted yesterday",
    category: "Furniture",
    description:
      "Handcrafted solid oak set in very good condition. Minor surface wear only. Ideal for family dining spaces and can be moved in two pieces.",
    points: ["Seats 6 comfortably", "Cash / Venmo accepted", "Pickup only"],
  },
  "weekend-childcare-references-on-request": {
    title: "Weekend childcare — references on request",
    price: "From $22/hr",
    location: "Eastside / flexible",
    contact: "+1 (213) 555-0193",
    posted: "Posted today",
    category: "Services",
    description:
      "CPR certified caregiver with 6+ years of babysitting experience. Comfortable with infants to pre-teens. Safety-first and parent updates included.",
    points: ["Weekend availability", "Background references available", "Meet-and-greet in public location"],
  },
} as const;

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("classified", 50);
  if (!posts.length) {
    return [
      { slug: "placeholder" },
      ...Object.keys(FALLBACK_CLASSIFIED_DETAIL).map((slug) => ({ slug })),
    ];
  }
  return [
    ...posts.map((post) => ({ slug: post.slug })),
    ...Object.keys(FALLBACK_CLASSIFIED_DETAIL).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const fallback = FALLBACK_CLASSIFIED_DETAIL[resolvedParams.slug as keyof typeof FALLBACK_CLASSIFIED_DETAIL];
  if (fallback) {
    return await buildTaskMetadata("classified", {
      title: fallback.title,
      description: `${fallback.price} • ${fallback.location}`,
    });
  }
  const post = await fetchTaskPostBySlug("classified", resolvedParams.slug);
  return post ? await buildPostMetadata("classified", post) : await buildTaskMetadata("classified");
}

export default async function ClassifiedDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const fallback = FALLBACK_CLASSIFIED_DETAIL[resolvedParams.slug as keyof typeof FALLBACK_CLASSIFIED_DETAIL];
  if (fallback) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#fdfaf6_0%,#f7efe4_100%)] text-[#2a1f1a]">
        <NavbarShell />
        <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <section className="rounded-[2rem] border border-[rgba(42,31,26,0.12)] bg-white p-7 shadow-[0_20px_54px_rgba(42,31,26,0.08)] sm:p-10">
            <p className="inline-flex rounded-full bg-[#2a1f1a] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f3e4c9]">
              {fallback.category}
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em]">{fallback.title}</h1>
            <p className="mt-3 text-2xl font-semibold text-[#a98b76]">{fallback.price}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-[#5c4a42]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#a98b76]" />
                {fallback.location}
              </span>
              <span>{fallback.posted}</span>
            </div>
            <p className="mt-6 text-sm leading-8 text-[#5c4a42]">{fallback.description}</p>
            <ul className="mt-6 space-y-2 text-sm text-[#5c4a42]">
              {fallback.points.map((point) => (
                <li key={point}>- {point}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`tel:${fallback.contact.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#a98b76] px-5 py-2.5 text-sm font-semibold text-[#fdf9f3] hover:bg-[#957963]"
              >
                <Phone className="h-4 w-4" />
                {fallback.contact}
              </a>
              <Link
                href="/classifieds"
                className="inline-flex items-center rounded-full border border-[rgba(42,31,26,0.2)] px-5 py-2.5 text-sm font-semibold text-[#2a1f1a] hover:bg-[#f3e4c9]/45"
              >
                Back to classifieds
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
  return <TaskDetailPage task="classified" slug={resolvedParams.slug} />;
}
