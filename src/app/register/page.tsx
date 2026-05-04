'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Building2, Sparkles, User, Mail, Lock, Eye, EyeOff, Github, Chrome, ArrowRight, Shield, CheckCircle2, Info } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { REGISTER_PAGE_OVERRIDE_ENABLED, RegisterPageOverride } from '@/overrides/register-page'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG } from '@/lib/site-config'

function getRegisterConfig() {
  // Consistent homepage-style dark brown theme
  return {
    shell: 'bg-[#2a1f1a] text-[#f3e4c9]',
    panel: 'border border-[#f3e4c9]/12 bg-[#1a1411]/60',
    side: 'border border-[#f3e4c9]/10 bg-[#1a1411]/40',
    muted: 'text-[#bfa28c]',
    action: 'bg-[#a98b76] text-[#fdf9f3] hover:bg-[#957963]',
    icon: Building2,
    title: 'Create your account',
    body: 'Join the community to post classifieds, manage listings, and discover local opportunities.',
  }
}

export default function RegisterPage() {
  if (REGISTER_PAGE_OVERRIDE_ENABLED) {
    return <RegisterPageOverride />
  }

  const config = getRegisterConfig()
  const Icon = config.icon
  const router = useRouter()
  const { signup, isLoading } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [focus, setFocus] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await signup(name, email, password)
    router.push('/')
  }

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className="h-8 w-8" />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.muted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {['Different onboarding per product family', 'No repeated one-size-fits-all shell', 'Profile, publishing, and discovery aligned'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm">{item}</div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Create account</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight">Join {SITE_CONFIG.name}</h2>
            </div>
            
            {/* Social Signup Options */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              <button type="button" className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-current/10 px-4 text-sm font-medium transition-colors hover:bg-current/5 ${config.muted}`}>
                <Chrome className="h-4 w-4" />
                Google
              </button>
              <button type="button" className={`inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-current/10 px-4 text-sm font-medium transition-colors hover:bg-current/5 ${config.muted}`}>
                <Github className="h-4 w-4" />
                GitHub
              </button>
            </div>
            
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-current/10" />
              <span className={`text-xs ${config.muted}`}>or sign up with email</span>
              <div className="h-px flex-1 bg-current/10" />
            </div>
            
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${config.muted}`} />
                <input
                  className="h-12 w-full rounded-xl border border-current/10 bg-transparent pl-11 pr-4 text-sm transition-all focus:border-primary/50 focus:outline-none"
                  placeholder="Full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${config.muted}`} />
                <input
                  className="h-12 w-full rounded-xl border border-current/10 bg-transparent pl-11 pr-4 text-sm transition-all focus:border-primary/50 focus:outline-none"
                  placeholder="Email address"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <Lock className={`absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 ${config.muted}`} />
                <input
                  className="h-12 w-full rounded-xl border border-current/10 bg-transparent pl-11 pr-12 text-sm transition-all focus:border-primary/50 focus:outline-none"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 ${config.muted} hover:text-current`}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {/* Password Strength Hint */}
              <div className={`flex items-center gap-2 text-xs ${config.muted}`}>
                <Info className="h-3.5 w-3.5" />
                <span>Use 8+ characters with letters, numbers & symbols</span>
              </div>
              
              <div className="relative">
                <input
                  className="h-12 w-full rounded-xl border border-current/10 bg-transparent px-4 text-sm transition-all focus:border-primary/50 focus:outline-none"
                  placeholder="What are you creating or publishing?"
                  value={focus}
                  onChange={(event) => setFocus(event.target.value)}
                />
              </div>
              
              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-current/20 bg-transparent"
                  required
                />
                <span className={`text-sm ${config.muted}`}>
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:underline">Terms</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>
              
              <button
                type="submit"
                disabled={isLoading || !agreeTerms}
                className={`group mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] ${config.action} disabled:opacity-60`}
              >
                {isLoading ? 'Creating account...' : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
            
            <div className={`mt-6 flex items-center justify-center gap-2 text-sm ${config.muted}`}>
              <span>Already have an account?</span>
              <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                Sign in
                <Sparkles className="h-3.5 w-3.5" />
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className={`mt-6 flex items-center justify-center gap-4 border-t border-current/10 pt-6 text-xs ${config.muted}`}>
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" />
                Secure signup
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                No spam ever
              </span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
