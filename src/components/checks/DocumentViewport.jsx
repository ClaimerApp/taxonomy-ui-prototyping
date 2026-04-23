import { useEffect, useRef, useState, useCallback } from 'react'
import { A4_WIDTH } from './A4Page'
import { cn } from '../../lib/cn'

const MIN_ZOOM = 0.4
const MAX_ZOOM = 1.5
const MARGIN = 40 // horizontal gutter on each side

export function DocumentViewport({ children, className }) {
  const outerRef = useRef(null)
  const [zoom, setZoom] = useState(0.7)
  const [autoFit, setAutoFit] = useState(true)
  const [contentHeight, setContentHeight] = useState(A4_WIDTH * 1.414) // seed

  const recomputeFit = useCallback(() => {
    const el = outerRef.current
    if (!el) return
    const avail = el.clientWidth - MARGIN * 2
    const target = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, avail / A4_WIDTH))
    setZoom(target)
  }, [])

  useEffect(() => {
    if (!autoFit) return
    recomputeFit()
    const el = outerRef.current
    if (!el) return
    const obs = new ResizeObserver(recomputeFit)
    obs.observe(el)
    return () => obs.disconnect()
  }, [autoFit, recomputeFit])

  // Measure scaled content height so the scroll area sizes correctly
  const contentRef = useRef(null)
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const measure = () => setContentHeight(el.scrollHeight)
    measure()
    const obs = new ResizeObserver(measure)
    obs.observe(el)
    return () => obs.disconnect()
  }, [children])

  const clamp = (v) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, v))

  const nudge = (delta) => {
    setAutoFit(false)
    setZoom((z) => clamp(+(z + delta).toFixed(2)))
  }

  const reset = () => {
    setAutoFit(true)
    recomputeFit()
  }

  return (
    <div
      ref={outerRef}
      className={cn('relative h-full overflow-auto bg-warmgrey/10', className)}
    >
      {/* Zoom control, floats top-right */}
      <div className="sticky top-2 z-30 flex justify-end pr-3">
        <div className="flex items-center gap-1 rounded-full bg-white/95 shadow border border-warmgrey/20 px-1 py-0.5 text-xs">
          <button
            type="button"
            onClick={() => nudge(-0.1)}
            className="w-6 h-6 rounded-full hover:bg-warmgrey/15 text-charcoal/70 font-semibold"
            aria-label="Zoom out"
          >−</button>
          <button
            type="button"
            onClick={reset}
            className={cn(
              'px-2 h-6 rounded-full text-[11px] tabular-nums',
              autoFit ? 'bg-gold/20 text-nearblack' : 'hover:bg-warmgrey/15 text-charcoal/70'
            )}
            title="Reset to auto-fit"
          >{Math.round(zoom * 100)}%</button>
          <button
            type="button"
            onClick={() => nudge(0.1)}
            className="w-6 h-6 rounded-full hover:bg-warmgrey/15 text-charcoal/70 font-semibold"
            aria-label="Zoom in"
          >+</button>
        </div>
      </div>

      {/* Centring layer. The scaled child is taken out of flow so the
          scroll area reflects the *scaled* height, not the raw 794×N layout. */}
      <div className="-mt-8 flex justify-center px-5 pb-8">
        <div
          className="relative"
          style={{
            width: A4_WIDTH * zoom,
            height: contentHeight * zoom,
          }}
        >
          <div
            ref={contentRef}
            className="absolute top-0 left-0"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              width: A4_WIDTH,
            }}
          >
            <div className="py-6 space-y-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
