import { loja } from '@/data/loja'

/** Marca um dado ainda não confirmado. Some quando o modo demonstração é desligado. */
export function CampoAPreencher({ children }: { children: React.ReactNode }) {
  if (!loja.modoDemonstracao) return null
  return (
    <span className="inline-block rounded-full border border-dashed border-dourado px-2.5 py-0.5 text-[0.78rem] leading-snug text-dourado-texto">
      {children}
    </span>
  )
}
