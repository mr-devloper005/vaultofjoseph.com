import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Premium local classifieds',
  },
  footer: {
    tagline: 'Premium local classifieds',
  },
  hero: {
    eyebrow: 'Local ads, offers, and listings—laid out so you see the hook before the fine print.',
    title: ['Buy, sell, hire, and rent—', 'without the noise.'],
    description:
      'Each ad is built to scan: what it is, where it applies, and how to respond—then you drill into listings or profiles only when you want more.',
    primaryCta: {
      label: 'Browse classifieds',
      href: '/classifieds',
    },
    secondaryCta: {
      label: 'Search ads',
      href: '/search',
    },
    searchPlaceholder: 'Search ads, listings, articles, and more',
    focusLabel: 'Category',
    featureCardBadge: 'active board',
    featureCardTitle: 'Fresh posts keep the board honest and current.',
    featureCardDescription:
      'New classifieds and listings surface with clear categories so you can skim with confidence.',
    featureHighlights: [
      {
        title: 'Offer line first',
        body: 'Titles, category, and the ask stay visible so every post reads like a real ad—not a buried story.',
      },
      {
        title: 'Price & terms visible',
        body: 'When sellers include numbers or deadlines, they stay near the top so you compare offers without reopening posts.',
      },
      {
        title: 'One search, every ad type',
        body: 'Classified blurbs, full listings, and articles all answer the same query—fewer dead ends when you are hunting for something specific.',
      },
    ],
  },
  home: {
    metadata: {
      title: 'Local classifieds and trusted listings',
      description:
        'Discover local classifieds, services, and offers on Vaultofjoseph—structured for fast scanning and clear next steps.',
      openGraphTitle: 'Local classifieds and trusted listings',
      openGraphDescription:
        'Browse classifieds and business listings in one premium board experience.',
      keywords: ['classifieds', 'local ads', 'listings', 'services', 'marketplace', 'Vaultofjoseph'],
    },
    introBadge: 'How it works',
    introTitle: 'One board for offers, services, and supporting resources.',
    introParagraphs: [
      'Classifieds lead the experience: short, scannable posts with categories that make sense for real local commerce.',
      'Business listings sit alongside as a steadier lane for verified services, hours, and contact paths.',
      'Articles, images, bookmarks, and profiles stay available when you need deeper context—without crowding the main lanes.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Classified-first discovery with premium typography and spacing.',
      'Listings as the secondary lane for structured business surfaces.',
      'Search stays global so every post type remains reachable in one query.',
      'Light motion and CSS-first polish for fast loads.',
    ],
    primaryLink: {
      label: 'Open classifieds',
      href: '/classifieds',
    },
    secondaryLink: {
      label: 'Browse listings',
      href: '/listings',
    },
  },
  cta: {
    badge: 'Ready when you are',
    title: 'Post an ad or claim a listing surface in minutes.',
    description: 'Join the board with a straightforward flow—built for clarity, not clutter.',
    primaryCta: {
      label: 'Browse classifieds',
      href: '/classifieds',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles & updates',
    description: 'Editorial notes and guides that pair with the classifieds board.',
  },
  listing: {
    title: 'Business listings',
    description: 'Structured listings for services, shops, and professionals.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Offers, jobs, housing, and local notices in a marketplace rhythm.',
  },
  image: {
    title: 'Visual gallery',
    description: 'Image-led posts and media surfaces from the community.',
  },
  profile: {
    title: 'Profiles',
    description: 'Public profiles behind listings, ads, and creative work.',
  },
  sbm: {
    title: 'Bookmarks & shelves',
    description: 'Curated links and saved resources in a research-friendly layout.',
  },
  pdf: {
    title: 'Documents',
    description: 'Downloadable PDFs and reference files.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings built for trust and comparison',
    paragraphs: [
      'Each listing is framed like a storefront card: location, category, and proof points stay visible so you can compare quickly.',
      'Use this lane when you want steadier business detail than a short classified line allows.',
      'Filters stay lightweight—pick a category, scan, then jump into a profile or article when you need more.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Articles', href: '/articles' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Editorial desk for context and craft',
    paragraphs: [
      'Longer reads live here with room for narrative, data, and visuals—separate from the fast classified skim.',
      'Typography favors comfortable line length and clear hierarchy so guides and stories feel intentional.',
      'Jump back into offers or listings anytime; the board logic stays the same underneath.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
  classified: {
    title: 'The main board for timely local posts',
    paragraphs: [
      'Classifieds are tuned for urgency: price cues, categories, and short copy that respects busy readers.',
      'Pair them with listings when you want a fuller business story, or browse profiles to see who is behind the post.',
      'Everything stays searchable from one global search—no dead ends.',
    ],
    links: [
      { label: 'Browse latest classifieds', href: '/classifieds' },
      { label: 'Post your ad', href: '/register' },
      { label: 'Search all ads', href: '/search' },
    ],
  },
  image: {
    title: 'Gallery lane for visual-first posts',
    paragraphs: [
      'When imagery carries the message, this section opens with larger frames and calmer metadata.',
      'It is intentionally different from the classified grid—more studio wall, less spreadsheet.',
      'Use it to preview work, spaces, or products before you read the longer story.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'People and brands behind the posts',
    paragraphs: [
      'Profiles anchor trust: who you are hiring, buying from, or meeting in person.',
      'The layout keeps identity up front with softer supporting stats—different from listing grids.',
      'Follow through to classifieds or listings when you want proof in the form of live offers.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Bookmarks', href: '/sbm' },
    ],
  },
  sbm: {
    title: 'Research shelves for saved links',
    paragraphs: [
      'Bookmarks favor density and order: collections read like a personal library, not a social feed.',
      'Cards stay compact so you can scan dozens of references without losing context.',
      'Great for tools, docs, and recurring sources that support your listings research.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'PDFs', href: '/pdf' },
      { label: 'Listings', href: '/listings' },
    ],
  },
  pdf: {
    title: 'Documents and downloads',
    paragraphs: [
      'PDFs sit in a paper-bright layout with crisp borders—built for forms, menus, and long reports.',
      'This lane is intentionally quieter than classifieds so files feel archival, not promotional.',
      'Pair downloads with articles or listings when you need supporting evidence.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Listings', href: '/listings' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates',
    paragraphs: [
      'Quick signals when you need a pulse check without opening a full article.',
      'They stay lightweight so classifieds and listings keep the spotlight.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Articles', href: '/articles' },
    ],
  },
  comment: {
    title: 'Comments',
    paragraphs: [
      'Responses stay tethered to articles so discussion never drifts far from the source.',
    ],
    links: [
      { label: 'Articles', href: '/articles' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organizations',
    paragraphs: [
      'Teams and brands get a structured surface that complements listings and classifieds.',
    ],
    links: [
      { label: 'Listings', href: '/listings' },
      { label: 'Articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
