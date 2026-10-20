import { loja, temLinkCompra } from '@/data/loja'

export const secoes = [
  { id: 'inicio', rotulo: 'Início' },
  { id: 'pijamas', rotulo: 'Pijamas' },
  { id: 'colecoes', rotulo: 'Coleções' },
  { id: 'contato', rotulo: 'Contato' },
] as const

export function irPara(id: string) {
  const alvo = document.getElementById(id)
  if (!alvo) return
  const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  alvo.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', `#${id}`)
}

/** "Comprar": abre a loja oficial quando configurada; senão, leva à vitrine. */
export function comprar() {
  if (temLinkCompra) {
    window.open(loja.linkCompra, '_blank', 'noopener,noreferrer')
  } else {
    irPara('todos')
  }
}
