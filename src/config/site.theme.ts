import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'market',
  hero: {
    variant: 'search-first',
    eyebrow: 'Local ads & listings',
  },
  home: {
    layout: 'directory-stack',
    primaryTask: 'classified',
    featuredTaskKeys: ['classified', 'listing'],
  },
  navigation: {
    variant: 'capsule',
  },
  footer: {
    variant: 'columns',
  },
  cards: {
    listing: 'catalog-grid',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'listing-elevated',
    classified: 'catalog-grid',
    pdf: 'editorial-feature',
    sbm: 'editorial-feature',
    social: 'catalog-grid',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
