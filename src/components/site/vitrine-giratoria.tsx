import { useMemo, useRef } from 'react'

import { Button } from '@/components/ui/button'
import { CircularGallery, type GalleryItem } from '@/components/ui/circular-gallery'
import { loja } from '@/data/loja'
import { nomeDoProduto, produtos } from '@/data/produtos'
import { useMediaQuery } from '@/hooks/use-media-query'
import { irPara } from '@/lib/navegacao'

export function VitrineGiratoria({ onAbrirProduto }: { onAbrirProduto: (indice: number) => void }) {
  const secaoRef = useRef<HTMLElement>(null)
  const largo = useMediaQuery('(min-width: 768px)')

  const itens: GalleryItem[] = useMemo(
    () =>
      produtos.map((p, i) => ({
        common: nomeDoProduto(p, i),
        binomial: p.cores?.join(', ') ?? (loja.modoDemonstracao ? 'Cores a confirmar' : ''),
        photo: {
          url: p.foto.url,
          text: p.foto.alt,
          pos: p.foto.posicao,
          by: p.foto.ilustrativa ? `${p.foto.credito ?? ''} (ilustrativa)` : 'Q.CHARMME',
        },
      })),
    [],
  )

  return (
    <section
      id="pijamas"
      ref={secaoRef}
      aria-labelledby="titulo-pijamas"
      className="relative bg-creme"
      style={{ height: largo ? '260vh' : '210vh' }}
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-wrap items-end justify-between gap-x-10 gap-y-3 px-4 pt-24 sm:px-8 md:pt-28">
          <h2 id="titulo-pijamas" className="text-[clamp(2.25rem,6vw,4rem)] leading-none">
            Os pijamas
          </h2>
          <p className="max-w-[36ch] text-[0.95rem] text-cacau-suave">
            Role a página para girar a vitrine e toque em um pijama para ver os detalhes.
          </p>
        </div>

        <div className="relative min-h-0 flex-1">
          <CircularGallery
            items={itens}
            scrollTargetRef={secaoRef}
            radius={largo ? 560 : 290}
            itemWidth={largo ? 280 : 210}
            itemHeight={largo ? 380 : 290}
            autoRotateSpeed={0.03}
            creditLabel="Foto:"
            fallbackLabel="Foto do pijama"
            aria-label="Vitrine giratória de pijamas"
            onItemClick={(_, i) => onAbrirProduto(i)}
            className="[&_[role=group]>button>div]:listras-pijama [&_[role=group]>button>div]:rounded-md [&_[role=group]>button>div]:shadow-[0_28px_50px_-28px_rgb(42_29_23/0.6)]"
          />
        </div>

        <div className="relative z-10 flex justify-center pb-10">
          <Button variant="outline" onClick={() => irPara('todos')} className="bg-leite/70">
            Ver todos os pijamas
          </Button>
        </div>
      </div>
    </section>
  )
}
