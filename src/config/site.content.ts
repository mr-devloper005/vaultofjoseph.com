import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'A structured digital space',
  },
  footer: {
    tagline: 'A structured digital space',
  },
  hero: {
    eyebrow: 'Signals, entries, and references arranged for quick scanning.',
    title: ['Navigate focused spaces -', 'without extra noise.'],
    description:
      'Each entry highlights only key points up front, with deeper detail available when needed.',
    primaryCta: {
      label: 'Explore entries',
      href: '/classifieds',
    },
    secondaryCta: {
      label: 'Search everything',
      href: '/search',
    },
    searchPlaceholder: 'Search entries, profiles, and updates',
    focusLabel: 'Focus',
    featureCardBadge: 'live stream',
    featureCardTitle: 'Fresh updates keep the experience current.',
    featureCardDescription: 'New items appear in clear groups so browsing stays simple.',
    featureHighlights: [
      {
        title: 'Priority details first',
        body: 'Core points stay visible first so each card is immediately readable.',
      },
      {
        title: 'Consistent structure',
        body: 'Information follows a stable pattern so comparison is quick.',
      },
      {
        title: 'Unified discovery',
        body: 'Multiple content types answer the same search flow.',
      },
    ],
  },
  home: {
    metadata: {
      title: 'Structured entries and curated surfaces',
      description:
        'Explore a structured set of entries, profiles, and updates designed for fast discovery.',
      openGraphTitle: 'Structured entries and curated surfaces',
      openGraphDescription: 'A refined multi-surface experience for browsing and discovery.',
      keywords: ['entries', 'profiles', 'discovery', 'updates', 'surfaces', 'Vaultofjoseph'],
    },
    introBadge: 'Overview',
    introTitle: 'One interface connecting multiple content surfaces.',
    introParagraphs: [
      'Short-form entries lead the default flow for quick scanning.',
      'Structured detail surfaces sit alongside for deeper context.',
      'Long-form and media sections are available without crowding the primary view.',
    ],
    sideBadge: 'Snapshot',
    sidePoints: [
      'Clear grouping across all enabled sections.',
      'Secondary surfaces for deeper context.',
      'Global search across every surface.',
      'Fast and lightweight interface behavior.',
    ],
    primaryLink: {
      label: 'Explore entries',
      href: '/classifieds',
    },
    secondaryLink: {
      label: 'Open secondary stream',
      href: '/listings',
    },
  },
  cta: {
    badge: 'Continue',
    title: 'Create a new entry or connect your profile surface in minutes.',
    description: 'A direct flow with minimal friction and clear steps.',
    primaryCta: {
      label: 'Open stream',
      href: '/classifieds',
    },
    secondaryCta: {
      label: 'Contact',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Newest items in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Long-form',
    description: 'Extended notes and editorial context.',
  },
  listing: {
    title: 'Structured entries',
    description: 'Detail-focused cards with consistent fields.',
  },
  classified: {
    title: 'Explore entries',
    description: 'Fast-moving short-form entry feed.',
  },
  image: {
    title: 'Visual stream',
    description: 'Image-led cards and media content.',
  },
  profile: {
    title: 'Profiles',
    description: 'Identity and contributor surfaces.',
  },
  sbm: {
    title: 'Collections',
    description: 'Saved references and grouped resources.',
  },
  pdf: {
    title: 'Documents',
    description: 'Downloadable files and references.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Structured surface',
    paragraphs: [
      'This section prioritizes orderly cards and stable detail blocks.',
      'Use it when you want a quieter comparison flow.',
      'Filtering stays lightweight for faster movement.',
    ],
    links: [
      { label: 'Explore entries', href: '/classifieds' },
      { label: 'Long-form', href: '/articles' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'Editorial surface',
    paragraphs: [
      'Longer writing and context live here.',
      'Typography and spacing are optimized for reading pace.',
      'You can return to quicker streams at any time.',
    ],
    links: [
      { label: 'Structured entries', href: '/listings' },
      { label: 'Explore entries', href: '/classifieds' },
      { label: 'Documents', href: '/pdf' },
    ],
  },
  classified: {
    title: 'Explore entries',
    paragraphs: [
      'This stream favors concise cards and faster update rhythm.',
      'Quick summaries appear before deeper detail.',
      'Global search remains available throughout.',
    ],
    links: [
      { label: 'See entries', href: '/classifieds' },
      { label: 'Create entry', href: '/register' },
      { label: 'Search all', href: '/search' },
    ],
  },
  image: {
    title: 'Visual stream',
    paragraphs: [
      'This section emphasizes media-first browsing.',
      'Cards are larger and metadata is quieter.',
      'Use it for quick visual scanning before deeper reads.',
    ],
    links: [
      { label: 'Long-form', href: '/articles' },
      { label: 'Structured entries', href: '/listings' },
      { label: 'Explore entries', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Identity surface',
    paragraphs: [
      'Profiles provide context around contributors and entities.',
      'Identity details remain clear and persistent.',
      'Related entries are linked for continuity.',
    ],
    links: [
      { label: 'Structured entries', href: '/listings' },
      { label: 'Explore entries', href: '/classifieds' },
      { label: 'Collections', href: '/sbm' },
    ],
  },
  sbm: {
    title: 'Collection surface',
    paragraphs: [
      'Grouped links and references are organized for reuse.',
      'Dense layouts improve scanning across many items.',
      'Useful for recurring research and saved context.',
    ],
    links: [
      { label: 'Long-form', href: '/articles' },
      { label: 'Documents', href: '/pdf' },
      { label: 'Structured entries', href: '/listings' },
    ],
  },
  pdf: {
    title: 'Document surface',
    paragraphs: [
      'Files are presented in a cleaner archival style.',
      'The layout is quieter and less feed-oriented.',
      'Related context is accessible through linked surfaces.',
    ],
    links: [
      { label: 'Long-form', href: '/articles' },
      { label: 'Structured entries', href: '/listings' },
      { label: 'Profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Short updates',
    paragraphs: [
      'Brief updates for lightweight context signals.',
      'Designed to complement, not dominate, core surfaces.',
    ],
    links: [
      { label: 'Structured entries', href: '/listings' },
      { label: 'Explore entries', href: '/classifieds' },
      { label: 'Long-form', href: '/articles' },
    ],
  },
  comment: {
    title: 'Responses',
    paragraphs: ['Discussion remains attached to source context.'],
    links: [
      { label: 'Long-form', href: '/articles' },
      { label: 'Explore entries', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Organization surface',
    paragraphs: ['Structured entity pages with related linked context.'],
    links: [
      { label: 'Structured entries', href: '/listings' },
      { label: 'Long-form', href: '/articles' },
      { label: 'Documents', href: '/pdf' },
    ],
  },
}

