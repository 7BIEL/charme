import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close
const DialogPortal = DialogPrimitive.Portal

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-cacau/40 backdrop-blur-[2px] data-[state=open]:animate-[overlay-in_300ms_ease-out]',
        className,
      )}
      {...props}
    />
  )
}

type Side = 'center' | 'right'

function DialogContent({
  className,
  children,
  side = 'center',
  closeLabel = 'Fechar',
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { side?: Side; closeLabel?: string }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          'fixed z-50 bg-leite text-cacau shadow-[0_30px_80px_-30px_rgb(42_29_23/0.55)] outline-none',
          side === 'center' &&
            'left-1/2 top-1/2 max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg data-[state=open]:animate-[dialog-in_420ms_var(--ease-seda)]',
          side === 'right' &&
            'inset-y-0 right-0 flex h-dvh w-[min(22rem,88vw)] flex-col data-[state=open]:animate-[sheet-in_420ms_var(--ease-seda)]',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 grid size-11 place-items-center rounded-full bg-leite/85 text-cacau transition-colors hover:bg-creme">
          <X className="size-5" strokeWidth={1.5} />
          <span className="sr-only">{closeLabel}</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title data-slot="dialog-title" className={cn('font-display', className)} {...props} />
}

function DialogDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-cacau-suave', className)}
      {...props}
    />
  )
}

export { Dialog, DialogTrigger, DialogClose, DialogContent, DialogTitle, DialogDescription }
