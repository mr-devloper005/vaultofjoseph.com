export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'n5ocotrvmv',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Vaultofjoseph',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'A structured digital space',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Vaultofjoseph organizes entries, profiles, and updates into a calm, searchable experience.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'vaultofjoseph.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://vaultofjoseph.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',
} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const
