import { Building2, Mail, Phone, Sparkles, Clock, CheckCircle, MessageSquare, MessageSquareText, ShieldCheck, Twitter, Linkedin, Github, Send } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'
import { ContactLeadForm } from "@/components/shared/contact-lead-form";

function getContactEmail() {
  const configured = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()
  if (configured) return configured
  const domain = SITE_CONFIG.domain?.trim()
  if (domain) return `hello@${domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '')}`
  return 'hello@example.com'
}

function getTone() {
  return {
    shell: "bg-stone-50 text-stone-950",
    panel: "border border-stone-200 bg-white shadow-sm",
    soft: "border border-stone-200 bg-stone-50",
    muted: "text-stone-600",
    action: "bg-stone-950 text-white hover:bg-stone-800",
  }
}

const contactHighlights = [
  { icon: Mail, title: 'Direct response', copy: 'Your request is routed to the relevant internal queue.' },
  { icon: MessageSquareText, title: 'General assistance', copy: 'Share questions, feedback, or process issues in one place.' },
  { icon: ShieldCheck, title: 'Reliable follow-up', copy: 'Each conversation is recorded so updates remain traceable.' },
];

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const tone = getTone()
  const siteName = SITE_CONFIG.name || SITE_CONFIG.title || SITE_CONFIG.domain || "this site"
  const contactEmail = getContactEmail()
  const lanes = [
    { icon: Building2, title: 'Business support', body: 'Add listings, verify details, and bring your business surface live quickly.' },
    { icon: Mail, title: 'General inquiries', body: 'Questions about the platform, partnerships, or general support requests.' },
    { icon: Phone, title: 'Partnership opportunities', body: 'Talk through collaborations, advertising, and business development.' },
  ]

  return (
    <div className={`min-h-screen ${tone.shell}`}>
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden px-6 py-20 md:px-10 lg:px-16">
          <div className="absolute left-[-10%] top-10 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute bottom-0 right-[-8%] h-80 w-80 rounded-full bg-stone-300/50 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.35em] text-stone-500">Contact</p>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-stone-950 md:text-7xl">
                Contact the support team.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-700">
                Use this form to reach {siteName}. We will route your request to the right team and follow up.
              </p>

              <div className="mt-8 grid gap-4">
                {contactHighlights.map((item) => (
                  <div key={item.title} className="flex gap-4 rounded-3xl border border-stone-200 bg-white/60 p-5 shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone-950 text-white">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-black text-stone-950">{item.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-stone-600">{item.copy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <h2 className="text-2xl font-semibold">Send a message</h2>
            <ContactLeadForm />

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
