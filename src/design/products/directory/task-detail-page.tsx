import Link from 'next/link'
import {
  ArrowRight,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Tag,
  Flag,
  Heart,
  MessageCircle,
  Map as MapIcon,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import { DirectoryPhotoGallery } from '@/design/products/directory/photo-gallery'
import type { SitePost } from '@/lib/site-connector'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const asString = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
  const asNumber = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : null)
  const asStringOrNumber = (value: unknown) => {
    const rawString = asString(value)
    if (rawString) return rawString
    const rawNumber = asNumber(value)
    return rawNumber === null ? '' : String(rawNumber)
  }

  const location = typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const price = asStringOrNumber(content.price)
  const sellerName = asString(content.author) || post.authorName?.trim() || 'Seller'
  const sellerType = asString(content.sellerType) || 'Individual'
  const referenceId = post.id
  const postedAt = post.publishedAt || post.createdAt || ''
  const postedLabel = postedAt
    ? new Date(postedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
    : ''
  const highlights = Array.isArray(content.highlights) ? content.highlights.filter((item): item is string => typeof item === 'string') : []
  const listingUrl = `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${taskRoute}/${post.slug}`
  const descriptionHtml = formatRichHtml(description, 'Details coming soon.')
  const sellerInitials = sellerName
    .split(' ')
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link href={taskRoute} className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950">
          ← Back to {taskLabel}
        </Link>

        <section className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
          <header className="relative overflow-hidden border-b border-white/10 bg-[linear-gradient(90deg,#7a3e1b_0%,#5b2b3b_55%,#2a160c_100%)] px-6 py-5 text-white sm:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,221,156,0.18),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.28),transparent_30%)]" />
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/85">{category || taskLabel}</p>
                <h1 className="mt-2 truncate text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{post.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/85">
                  {postedLabel ? <span>{postedLabel}</span> : null}
                  {location ? (
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      {location}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
                <div className="rounded-xl bg-fuchsia-600/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_rgba(124,58,237,0.28)]">
                  Price: {price || 'Check with seller'}
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.5fr_0.9fr] lg:items-start">
            <div className="space-y-8">
              <DirectoryPhotoGallery images={images} alt={post.title} />

              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Description</h2>
                <RichContent html={descriptionHtml} className="mt-4 text-sm leading-8 text-slate-600 prose-p:my-4 prose-ul:my-4" />
                {highlights.length ? (
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {highlights.slice(0, 6).map((item) => (
                      <div key={item} className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                        {item}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">More details</h2>
                <dl className="mt-4 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Reference</dt>
                    <dd className="mt-1 break-all font-medium text-slate-900">{referenceId}</dd>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Listing URL</dt>
                    <dd className="mt-1 break-all font-medium text-slate-900">{listingUrl}</dd>
                  </div>
                  {website ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Website</dt>
                      <dd className="mt-1 break-all font-medium text-slate-900">{website}</dd>
                    </div>
                  ) : null}
                  {phone ? (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Phone</dt>
                      <dd className="mt-1 break-all font-medium text-slate-900">{phone}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 text-2xl font-semibold tracking-[-0.02em] text-slate-500">
                    {sellerInitials || 'U'}
                  </div>
                  <p className="mt-4 text-base font-semibold text-slate-950">{sellerName}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">{sellerType}</p>
                </div>

                <div className="mt-6 grid gap-2">
                  {phone ? (
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                    >
                      <Phone className="h-4 w-4" /> Call
                    </a>
                  ) : null}
                  {email ? (
                    <a
                      href={`mailto:${email}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      <MessageCircle className="h-4 w-4" /> Message
                    </a>
                  ) : null}
                  {website ? (
                    <a
                      href={website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                    >
                      <Globe className="h-4 w-4" /> Visit Website <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>

                <div className="mt-5 grid gap-2">
                  {mapEmbedUrl ? (
                    <a
                      href="#location-map"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-200"
                    >
                      <MapIcon className="h-4 w-4" /> Location Map
                    </a>
                  ) : null}
                  <Link
                    href={`/contact?topic=report&ref=${encodeURIComponent(post.slug)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700"
                  >
                    <Flag className="h-4 w-4" /> Report this Ad
                  </Link>
                  <Link
                    href={`${taskRoute}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-slate-50"
                  >
                    <Heart className="h-4 w-4" /> Browse more
                  </Link>
                </div>

                {location || phone || email ? (
                  <div className="mt-6 space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                    {location ? (
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 text-slate-500" />
                        <span>{location}</span>
                      </div>
                    ) : null}
                    {phone ? (
                      <div className="flex items-start gap-2">
                        <Phone className="mt-0.5 h-4 w-4 text-slate-500" />
                        <span className="break-all">{phone}</span>
                      </div>
                    ) : null}
                    {email ? (
                      <div className="flex items-start gap-2">
                        <Mail className="mt-0.5 h-4 w-4 text-slate-500" />
                        <span className="break-all">{email}</span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="rounded-[1.6rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Useful info</h2>
                <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                  <li>Pay safely and meet in a public place when possible.</li>
                  <li>Never share OTP codes or banking passwords.</li>
                  <li>Avoid wire transfers to unknown recipients.</li>
                  <li>If an offer feels rushed or too good, double-check details.</li>
                </ul>
              </div>

              {mapEmbedUrl ? (
                <div id="location-map" className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <div className="border-b border-slate-200 px-6 py-4">
                    <p className="text-sm font-semibold text-slate-950">Location map</p>
                  </div>
                  <iframe
                    src={mapEmbedUrl}
                    title={`${post.title} map`}
                    className="h-[320px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : null}
            </aside>
          </div>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related surfaces</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Keep browsing nearby matches.</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
