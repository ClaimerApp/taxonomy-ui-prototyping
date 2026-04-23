import { cn } from '../../lib/cn'

// A4 at 96dpi: 794 x 1123 px (8.27" x 11.69" × 96)
export const A4_WIDTH = 794
export const A4_HEIGHT = 1123

export function A4Page({
  children,
  pageNum,
  totalPages,
  headerLeft,
  headerRight,
  footerLeft,
  footerRight,
  variant = 'report',
  className,
}) {
  const isForm = variant === 'ct600'
  return (
    <div
      className={cn(
        'relative bg-white shadow-[0_6px_28px_rgba(26,20,18,0.18)] mx-auto',
        isForm ? 'font-hmrc text-nearblack' : 'text-charcoal',
        className,
      )}
      style={{ width: A4_WIDTH, minHeight: A4_HEIGHT }}
    >
      {/* Header strip */}
      {(headerLeft || headerRight) && (
        <div
          className={cn(
            'absolute left-0 right-0 top-0 flex items-start justify-between px-16 pt-8',
            isForm ? 'text-[11px]' : 'text-[10px] text-charcoal/40 uppercase tracking-wider',
          )}
        >
          <div className="max-w-[55%]">{headerLeft}</div>
          <div className="text-right max-w-[45%]">{headerRight}</div>
        </div>
      )}

      {/* Body — large top margin leaves room for header */}
      <div className={cn('px-16', headerLeft || headerRight ? 'pt-24' : 'pt-16', 'pb-20')}>
        {children}
      </div>

      {/* Footer strip */}
      <div
        className={cn(
          'absolute left-0 right-0 bottom-0 flex items-end justify-between px-16 pb-6 text-[10px]',
          isForm ? 'text-charcoal/60' : 'text-charcoal/40 uppercase tracking-wider',
        )}
      >
        <div>{footerLeft}</div>
        <div className="text-charcoal/50">
          {pageNum != null ? (totalPages != null ? `Page ${pageNum} of ${totalPages}` : `Page ${pageNum}`) : null}
        </div>
        <div>{footerRight}</div>
      </div>
    </div>
  )
}
