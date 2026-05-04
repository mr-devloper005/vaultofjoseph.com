import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site-config";
import { Users, Bookmark, Building2, Target, Heart, Zap, ArrowRight, Quote } from "lucide-react";

const highlights = [
  { label: "Creators onboarded", value: "12k+", icon: Users },
  { label: "Bookmarks shared", value: "180k", icon: Bookmark },
  { label: "Listings published", value: "8.6k", icon: Building2 },
];

const values = [
  { title: "Curated by people", description: "We believe trusted recommendations beat endless feeds.", icon: Heart },
  { title: "Designed for focus", description: "Clear, calm UI helps you find the next best resource fast.", icon: Target },
  { title: "Built to share", description: "Collections make collaboration and knowledge flow effortless.", icon: Zap },
];

const milestones = [
  { year: "2023", title: "Platform Launch", description: "Started with a simple mission: make local discovery easier." },
  { year: "2024", title: "Community Growth", description: "Reached 10k+ active creators publishing on the platform." },
  { year: "2025", title: "Feature Expansion", description: "Added classifieds, listings, and bookmarking tools." },
];

const testimonials = [
  { quote: "Finally, a platform that understands how local businesses actually want to be discovered.", author: "Sarah Chen", role: "Small Business Owner" },
  { quote: "The cleanest interface I've used for organizing and sharing resources with my team.", author: "Marcus Webb", role: "Product Designer" },
];

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a modern platform for creators, communities, and curated business discovery.`}
      actions={
        <Button asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      }
    >
      {/* Hero Stats Section */}
      <div className="mb-12 rounded-3xl bg-gradient-to-br from-[#2a1f1a] to-[#3d2e2a] p-8 text-[#f3e4c9] sm:p-12">
        <div className="text-center">
          <Badge className="mb-4 border-[#a98b76]/30 bg-[#a98b76]/10 text-[#f3e4c9]">Our Impact</Badge>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Building a community of creators and discoverers
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="rounded-2xl border border-[#f3e4c9]/10 bg-[#1a1411]/40 p-6 text-center">
              <item.icon className="mx-auto h-8 w-8 text-[#a98b76]" />
              <div className="mt-3 text-3xl font-bold text-[#f3e4c9]">{item.value}</div>
              <div className="text-sm text-[#bfa28c]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission & Values */}
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Badge variant="secondary">Our Story</Badge>
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            A single home for knowledge, discovery, and community.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {SITE_CONFIG.name} brings together publishing, listings, and social bookmarking so teams can move faster
            and keep their best resources close.
          </p>
          <Button variant="outline" asChild className="group">
            <Link href="/contact">
              Work with us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="space-y-4">
          {values.map((value) => (
            <Card key={value.title} className="border-border/50 bg-card/50 backdrop-blur transition-shadow hover:shadow-md">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mt-16">
        <div className="mb-8 text-center">
          <Badge variant="secondary">Our Journey</Badge>
          <h2 className="mt-3 font-display text-2xl font-semibold">How we got here</h2>
        </div>
        <div className="relative">
          <div className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 bg-border lg:block" />
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className={`relative ${index % 2 === 1 ? "lg:mt-12" : ""}`}>
                <div className="hidden lg:absolute lg:-right-3 lg:top-6 lg:block lg:h-6 lg:w-6 lg:-translate-x-1/2 lg:rounded-full lg:border-2 lg:border-background lg:bg-primary" />
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {milestone.year}
                    </span>
                    <h3 className="mt-3 font-semibold text-foreground">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-16">
        <div className="mb-8 text-center">
          <Badge variant="secondary">What People Say</Badge>
          <h2 className="mt-3 font-display text-2xl font-semibold">Trusted by the community</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.author} className="border-border/50 bg-gradient-to-br from-card to-card/50">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/20" />
                <p className="mt-4 text-lg font-medium text-foreground italic">"{t.quote}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

          </PageShell>
  );
}
