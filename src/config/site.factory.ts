import type { SiteFactoryRecipe } from '@/design/factory/types'

export const SITE_FACTORY_RECIPE: SiteFactoryRecipe = {
  brandPack: 'market-utility',
  navbar: 'compact-bar',
  footer: 'columns-footer',
  homeLayout: 'classified-home',
  motionPack: 'utility-snappy',
  primaryTask: 'classified',
  enabledTasks: ['classified', 'listing', 'article', 'image', 'profile', 'sbm'],
  taskLayouts: {
    listing: 'listing-directory',
    classified: 'classified-market',
    article: 'article-editorial',
    image: 'image-portfolio',
    profile: 'profile-business',
    sbm: 'sbm-curation',
  },
}
