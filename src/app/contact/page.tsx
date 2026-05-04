import { Building2, Mail, Phone, Sparkles, Clock, CheckCircle, MessageSquare, Twitter, Linkedin, Github, Send } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

function getContactEmail() {
  const configured = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()
  if (configured) return configured
  const domain = SITE_CONFIG.domain?.trim()
  if (domain) return `hello@${domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}`
  return 'hello@example.com'
}

function getTone() {
  // Consistent homepage-style dark brown theme
  return {
    shell: 'bg-[#2a1f1a] text-[#f3e4c9]',
    panel: 'border border-[#f3e4c9]/12 bg-[#1a1411]/60',
    soft: 'border border-[#f3e4c9]/10 bg-[#1a1411]/40',
    muted: 'text-[#bfa28c]',
    action: 'bg-[#a98b76] text-[#fdf9f3] hover:bg-[#957963]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const tone = getTone()
  const contactEmail = getContactEmail()
  const lanes = [
    { icon: Building2, title: 'Business support', body: 'Add listings, verify details, and bring your business surface live quickly.' },
    { icon: Mail, title: 'General inquiries', body: 'Questions about the platform, partnerships, or general support requests.' },
    { icon: Phone, title: 'Partnership opportunities', body: 'Talk through collaborations, advertising, and business development.' },
  ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Contact {SITE_CONFIG.name}</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em]">A support page that matches the product, not a generic contact form.</h1>
            <p className={`mt-5 max-w-2xl text-sm leading-8 ${tone.muted}`}>Tell us what you are trying to publish, fix, or launch. We will route it through the right lane instead of forcing every request into the same support bucket.</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
                  <lane.icon className="h-5 w-5" />
                  <h2 className="mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <form className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium opacity-70">Your name</label>
                  <input className="h-12 w-full rounded-xl border border-current/10 bg-transparent px-4 text-sm focus:border-primary/50 focus:outline-none" placeholder="John Smith" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium opacity-70">Email address</label>
                  <input className="h-12 w-full rounded-xl border border-current/10 bg-transparent px-4 text-sm focus:border-primary/50 focus:outline-none" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium opacity-70">What do you need help with?</label>
                <input className="h-12 w-full rounded-xl border border-current/10 bg-transparent px-4 text-sm focus:border-primary/50 focus:outline-none" placeholder="Business listing, support, partnership..." />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium opacity-70">Message</label>
                <textarea className="min-h-[140px] w-full rounded-2xl border border-current/10 bg-transparent px-4 py-3 text-sm focus:border-primary/50 focus:outline-none" placeholder="Share the full context so we can respond with the right next step." />
              </div>
              <button type="submit" className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${tone.action}`}>
                <Send className="h-4 w-4" />
                Send message
              </button>
            </form>

            <div className={`mt-6 rounded-[1.6rem] p-5 ${tone.soft}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Email</p>
              <p className={`mt-2 text-sm ${tone.muted}`}>Prefer email? Reach us directly.</p>
              <a
                href={`mailto:${contactEmail}`}
                className={`mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold ${tone.action}`}
              >
                <Mail className="h-4 w-4" />
                {contactEmail}
              </a>
            </div>

            {/* Response Time */}
            <div className={`mt-4 flex items-center gap-3 rounded-[1.6rem] p-4 ${tone.soft}`}>
              <Clock className="h-5 w-5 opacity-60" />
              <div>
                <p className="text-sm font-medium">Typical response time</p>
                <p className={`text-xs ${tone.muted}`}>Within 24 hours on business days</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* FAQ Section */}
      <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">FAQ</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">Common questions</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { q: "How do I create a listing?", a: "Sign up for an account, then click 'Create' in the navigation and select 'Classified' to get started." },
            { q: "Is there a fee to post?", a: "Basic listings are free. We offer premium features for businesses that want enhanced visibility." },
            { q: "How can I edit my published content?", a: "Go to your dashboard, find the post you want to edit, and click the edit button." },
            { q: "Can I promote my business?", a: "Yes! Contact our partnership team for advertising and promotional opportunities." },
          ].map((faq) => (
            <div key={faq.q} className={`rounded-[1.6rem] p-5 ${tone.soft}`}>
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary/60" />
                <div>
                  <h3 className="font-semibold">{faq.q}</h3>
                  <p className={`mt-1 text-sm ${tone.muted}`}>{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section className="mx-auto mt-16 max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className={`rounded-[2rem] p-8 text-center ${tone.panel}`}>
          <MessageSquare className="mx-auto h-8 w-8 opacity-40" />
          <h2 className="mt-4 text-xl font-semibold">Connect with us</h2>
          <p className={`mt-2 text-sm ${tone.muted}`}>Follow us for updates, tips, and community highlights</p>
          <div className="mt-6 flex justify-center gap-3">
            {[
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Github, href: "https://github.com", label: "GitHub" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-110 ${tone.soft}`}
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
