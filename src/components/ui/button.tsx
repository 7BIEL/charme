import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-sans text-[0.95rem] font-medium tracking-[0.01em] transition-[background-color,color,box-shadow,transform] duration-300 ease-seda disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-y-px',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_8px_24px_-12px_rgb(86_26_39/0.6)] hover:bg-vinho-escuro',
        outline: 'border border-cacau/25 bg-transparent text-cacau hover:border-cacau/60 hover:bg-creme/60',
        ghost: 'text-cacau hover:bg-creme',
        link: 'rounded-none px-0 text-cacau underline decoration-dourado underline-offset-[0.35em] hover:decoration-cacau',
      },
      size: {
        default: 'h-12 px-7',
        sm: 'h-10 px-5 text-sm',
        icon: 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

// oxlint-disable-next-line react/only-export-components
export { Button, buttonVariants }
