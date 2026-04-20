'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main>
        <section className="relative overflow-hidden border-b border-[rgba(42,31,26,0.08)] bg-[linear-gradient(135deg,rgba(243,228,201,0.55)_0%,rgba(255,252,247,0.95)_45%,rgba(253,250,246,1)_100%)]">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(169,139,118,0.2),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#a98b76]">Vaultofjoseph</p>
                <h1 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] text-[#2a1f1a]">{title}</h1>
                {description && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5c4a42]">{description}</p>}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
