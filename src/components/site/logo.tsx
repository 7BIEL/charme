import { cn } from '@/lib/utils'

/** Monograma da fachada: o Q dentro de um losango. */
function Monograma({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" className={className}>
      <rect
        x="9"
        y="9"
        width="26"
        height="26"
        transform="rotate(45 22 22)"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <text
        x="22"
        y="28.5"
        textAnchor="middle"
        fontFamily="'Bodoni Moda', Didot, serif"
        fontSize="19"
        fill="currentColor"
      >
        Q
      </text>
    </svg>
  )
}

export function Logo({ className, claro = false }: { className?: string; claro?: boolean }) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Monograma className="size-10 shrink-0 text-dourado sm:size-11" />
      <span className="flex flex-col items-start leading-none">
        <span
          className={cn(
            'font-display text-[1.3rem] tracking-[0.09em] sm:text-[1.45rem]',
            claro ? 'text-dourado' : 'text-cacau',
          )}
        >
          CHARMME
        </span>
        <span
          className={cn(
            'mt-1 rounded-full px-2 py-[0.2rem] font-sans text-[0.58rem] tracking-[0.36em]',
            claro ? 'bg-leite/12 text-leite/85' : 'bg-creme-profundo text-cacau-suave',
          )}
        >
          PIJAMAS
        </span>
      </span>
    </span>
  )
}
