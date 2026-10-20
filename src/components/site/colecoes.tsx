import { PencilLine } from 'lucide-react'

import { loja } from '@/data/loja'
import { categorias, nomeDaCategoria } from '@/data/produtos'
import { cn } from '@/lib/utils'
import { Foto } from './foto'

export function Colecoes({ onEscolher }: { onEscolher: (id: string) => void }) {
  return (
    <section id="colecoes" aria-labelledby="titulo-colecoes" className="bg-leite py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <h2 id="titulo-colecoes" className="text-[clamp(2.25rem,6vw,4rem)] leading-none md:col-span-6">
            Coleções
          </h2>
          <p className="max-w-[40ch] text-cacau-suave md:col-span-5 md:col-start-8">
            Escolha uma coleção para ver os pijamas que fazem parte dela.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-3 md:mt-20">
          {categorias.map((c, i) => {
            const semNome = !c.nome
            return (
              <li key={c.id} className={cn(i === 1 && 'sm:mt-16')}>
                <button
                  type="button"
                  onClick={() => onEscolher(c.id)}
                  className="group block w-full cursor-pointer text-left"
                >
                  <Foto
                    foto={c.foto}
                    sizes="(min-width: 640px) 30vw, 92vw"
                    rotuloAusente="Foto da coleção"
                    className="aspect-[4/5] rounded-t-full"
                    imgClassName="transition-transform duration-[1.2s] ease-seda group-hover:scale-[1.03]"
                  />
                  <span className="mt-5 flex items-baseline justify-between gap-4">
                    <span
                      className={cn(
                        'font-display text-[1.6rem] leading-tight',
                        semNome && 'text-cacau-suave italic',
                      )}
                    >
                      {nomeDaCategoria(c, i)}
                    </span>
                    <span className="shrink-0 text-sm underline decoration-dourado underline-offset-[0.4em] group-hover:decoration-cacau">
                      Ver pijamas
                    </span>
                  </span>
                  {semNome && loja.modoDemonstracao && (
                    <span className="mt-2 inline-flex items-center gap-1.5 text-[0.8rem] text-dourado-texto">
                      <PencilLine className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
                      Nome editável, a definir com a loja
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
