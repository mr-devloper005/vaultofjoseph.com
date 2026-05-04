'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

export function DirectoryPhotoGallery({ images, alt }: { images: string[]; alt: string }) {
  const safeImages = useMemo(() => images.filter((src) => typeof src === 'string' && src.trim()), [images])
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const openAt = (index: number) => {
    if (!safeImages.length) return
    setActiveIndex(Math.min(Math.max(index, 0), safeImages.length - 1))
    setOpen(true)
  }

  const goPrev = () => setActiveIndex((current) => (current - 1 + safeImages.length) % safeImages.length)
  const goNext = () => setActiveIndex((current) => (current + 1) % safeImages.length)

  if (!safeImages.length) {
    return null
  }

  return (
    <>
      <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white">
        <button
          type="button"
          className="relative block h-[420px] w-full overflow-hidden bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          onClick={() => openAt(0)}
          aria-label="Open photo"
        >
          <ContentImage src={safeImages[0]} alt={alt} fill className="object-cover" />
          <span className="sr-only">Open photo</span>
        </button>

        {safeImages.length > 1 ? (
          <div className="grid grid-cols-4 gap-3 bg-slate-50/60 p-4">
            {safeImages.slice(1, 5).map((image, index) => (
              <button
                key={image}
                type="button"
                className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                onClick={() => openAt(index + 1)}
                aria-label={`Open photo ${index + 2}`}
              >
                <ContentImage src={image} alt={alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-w-5xl border-0 bg-black p-0 shadow-none sm:max-w-5xl"
          aria-label="Photo viewer"
        >
          <DialogTitle className="sr-only">Photo viewer</DialogTitle>
          <div className="relative overflow-hidden rounded-2xl bg-black">
            <div className="relative aspect-[16/10] w-full">
              <ContentImage src={safeImages[activeIndex]} alt={alt} fill className="object-contain" />
            </div>

            {safeImages.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className={cn(
                    'absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                  )}
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className={cn(
                    'absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
                  )}
                  aria-label="Next photo"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {activeIndex + 1} / {safeImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

