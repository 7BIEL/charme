import { loja } from '@/data/loja'

export function AvisoDemonstracao() {
  if (!loja.modoDemonstracao) return null
  return (
    <p className="bg-salvia-escura px-4 py-2 text-center text-[0.8rem] leading-snug text-leite">
      Prévia demonstrativa. As fotos são ilustrativas e serão trocadas pelas fotos reais da Q.CHARMME.
    </p>
  )
}
