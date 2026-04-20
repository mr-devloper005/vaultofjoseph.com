import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'directory',
  themePack: 'directory-premium',
  homepageTemplate: 'classified-home',
  navbarTemplate: 'utility-bar',
  footerTemplate: 'minimal-footer',
  motionPack: 'utility-snappy',
  primaryTask: 'classified',
  enabledTasks: ['classified', 'listing', 'article', 'image', 'profile', 'sbm'],
  taskTemplates: {
    classified: 'classified-market',
    listing: 'listing-directory',
    article: 'article-editorial',
    image: 'image-portfolio',
    profile: 'profile-business',
    sbm: 'sbm-curation',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}
