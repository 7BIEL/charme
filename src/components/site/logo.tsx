import { cn } from '@/lib/utils'

export function Logo({ className, claro = false }: { className?: string; claro?: boolean }) {
  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span className="font-display text-[1.4rem] tracking-[0.07em] sm:text-[1.55rem]">
        Q<span className="text-dourado">.</span>CHARMME
      </span>
      <span
        className={cn(
          'mt-1.5 flex items-center gap-2 font-sans text-[0.62rem] tracking-[0.42em]',
          claro ? 'text-leite/75' : 'text-cacau-suave',
        )}
      >
        <span className="h-px w-4 bg-dourado" aria-hidden="true" />
        PIJAMAS
      </span>
    </span>
  )
}
