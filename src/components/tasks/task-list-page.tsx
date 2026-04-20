import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory':
    'bg-[radial-gradient(ellipse_80%_50%_at_0%_0%,rgba(169,139,118,0.12),transparent_50%),linear-gradient(180deg,#fdfaf6_0%,#f3e4c9_55%,#ffffff_100%)]',
  'listing-showcase':
    'bg-[radial-gradient(circle_at_top_right,rgba(186,191,148,0.14),transparent_42%),linear-gradient(180deg,#ffffff_0%,#f7efe4_100%)]',
  'article-editorial':
    'bg-[linear-gradient(180deg,#fffdf8_0%,#f3e4c9_35%,#faf6f0_100%)] bg-[length:100%_100%]',
  'article-journal':
    'bg-[repeating-linear-gradient(90deg,rgba(42,31,26,0.03)_0,rgba(42,31,26,0.03)_1px,transparent_1px,transparent_12px),linear-gradient(180deg,#fffefb_0%,#f5ebe0_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#1a1411_0%,#2a1f1a_48%,#1f1814_100%)] text-[#f3e4c9]',
  'image-portfolio': 'bg-[linear-gradient(180deg,#241a16_0%,#3d2e26_55%,#1a1411_100%)] text-[#f3e4c9]',
  'profile-creator': 'bg-[linear-gradient(180deg,#0f0c0b_0%,#2a1f1a_100%)] text-[#f3e4c9]',
  'profile-business':
    'bg-[radial-gradient(circle_at_20%_20%,rgba(186,191,148,0.18),transparent_40%),linear-gradient(180deg,#fdfaf6_0%,#ffffff_70%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#f0e6d8_0%,#ffffff_100%)]',
  'classified-market':
    'bg-[radial-gradient(ellipse_100%_60%_at_100%_0%,rgba(169,139,118,0.14),transparent_50%),linear-gradient(180deg,#f3e4c9_0%,#fdfaf6_55%,#ffffff_100%)]',
  'sbm-curation':
    'bg-[linear-gradient(180deg,#faf7f2_0%,#ebe4dc_45%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(135deg,#f8f6f2_0%,#e8dfd6_40%,#ffffff_100%)]',
  'pdf-editorial': 'bg-[linear-gradient(180deg,#fbfcfa_0%,#e4e6dc_35%,#ffffff_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const rawLayout = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const layoutKey = (rawLayout === 'pdf-editorial' ? 'pdf-editorial' : rawLayout) as keyof typeof variantShells
  const shellClass = variantShells[layoutKey] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey as string)
  const ui = isDark
    ? {
        muted: 'text-[#cfc0b4]',
        panel: 'border border-[#f3e4c9]/12 bg-white/6',
        soft: 'border border-[#f3e4c9]/10 bg-white/5',
        input: 'border-[#f3e4c9]/15 bg-white/6 text-[#f3e4c9]',
        button: 'bg-[#a98b76] text-[#fdf9f3] hover:bg-[#957963]',
      }
    : layoutKey.startsWith('article') || layoutKey.startsWith('sbm')
      ? {
          muted: 'text-[#5c4a42]',
          panel: 'border border-[rgba(42,31,26,0.1)] bg-white/95 shadow-[0_18px_48px_rgba(42,31,26,0.06)]',
          soft: 'border border-[#e8d8bc] bg-[#fdfaf6]',
          input: 'border border-[#e8d8bc] bg-white text-[#2a1f1a]',
          button: 'bg-[#a98b76] text-[#fdf9f3] hover:bg-[#957963]',
        }
      : layoutKey === 'pdf-editorial'
        ? {
            muted: 'text-[#4d5c42]',
            panel: 'border border-[#babf94]/45 bg-white shadow-[0_20px_50px_rgba(42,31,26,0.06)]',
            soft: 'border border-[#babf94]/35 bg-[#f6f7f1]',
            input: 'border border-[#babf94]/40 bg-white text-[#2a1f1a]',
            button: 'bg-[#4d5c42] text-[#f3f4ef] hover:bg-[#3d4a35]',
          }
        : {
            muted: 'text-[#5c4a42]',
            panel: 'border border-[rgba(42,31,26,0.1)] bg-white shadow-[0_20px_55px_rgba(42,31,26,0.07)]',
            soft: 'border border-[rgba(42,31,26,0.08)] bg-[#fdfaf6]',
            input: 'border border-[#e8d8bc] bg-white text-[#2a1f1a]',
            button: 'bg-[#a98b76] text-[#fdf9f3] hover:bg-[#957963]',
          }

  return (
    <div className={`min-h-screen ${shellClass}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This reading surface uses slower pacing, stronger typographic hierarchy, and more breathing room so long-form content feels intentional rather than squeezed into a generic feed.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs font-semibold uppercase tracking-[0.24em] ${ui.muted}`}>Reading note</p>
              <p className={`mt-4 text-sm leading-7 ${ui.muted}`}>Use category filters to jump between topics without collapsing the page into the same repeated card rhythm used by other task types.</p>
              <form className="mt-5 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Curated resources arranged more like collections than a generic post feed.</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>Bookmarks, saved resources, and reference-style items need calmer grouping and lighter metadata. This variant gives them that separation.</p>
            </div>
            <div className={`rounded-[2rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.24em] ${ui.muted}`}>Collection filter</p>
              <form className="mt-4 flex items-center gap-3" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-xl px-4 text-sm font-medium ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'pdf-editorial' ? (
          <section className="mb-12 grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-stretch">
            <div className={`flex flex-col justify-between rounded-[1.5rem] p-6 ${ui.soft}`}>
              <div>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.28em] ${ui.muted}`}>Document rack</p>
                <h1 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground lg:text-4xl">{taskConfig?.description || 'Latest posts'}</h1>
              </div>
              <p className={`mt-6 text-xs leading-6 ${ui.muted}`}>Sage borders, paper-white panels, and tighter vertical rhythm so files read as archival—not like ads.</p>
            </div>
            <div className={`grid gap-3 rounded-[1.5rem] p-6 sm:grid-cols-3 ${ui.panel}`}>
              {['Download-ready', 'Category tidy', 'Pairs with articles'].map((label) => (
                <div key={label} className={`rounded-xl border border-[#babf94]/35 bg-[#f6f7f1] px-4 py-5 text-center`}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4d5c42]">{label}</p>
                </div>
              ))}
              <form className="sm:col-span-3" action={taskConfig?.route || '#'}>
                <label className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${ui.muted}`}>Filter</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <select name="category" defaultValue={normalizedCategory} className={`h-11 min-w-[12rem] flex-1 rounded-xl px-3 text-sm ${ui.input}`}>
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                  <button type="submit" className={`h-11 rounded-xl px-5 text-sm font-medium ${ui.button}`}>
                    Apply
                  </button>
                </div>
              </form>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(42,31,26,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {intro.links.map((link) => (
                <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">{link.label}</a>
              ))}
            </div>
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
