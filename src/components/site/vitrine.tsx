import { Button } from '@/components/ui/button'
import { categorias, nomeDaCategoria, nomeDoProduto, produtos } from '@/data/produtos'
import { cn } from '@/lib/utils'
import { CampoAPreencher } from './campo-a-preencher'
import { Foto } from './foto'

interface VitrineProps {
  filtro: string
  onFiltrar: (id: string) => void
  onAbrirProduto: (indice: number) => void
}

export function Vitrine({ filtro, onFiltrar, onAbrirProduto }: VitrineProps) {
  const visiveis = produtos
    .map((p, indice) => ({ p, indice }))
    .filter(({ p }) => filtro === 'todos' || p.categoria === filtro)

  const opcoes = [{ id: 'todos', rotulo: 'Todos' }, ...categorias.map((c, i) => ({ id: c.id, rotulo: nomeDaCategoria(c, i) }))]

  return (
    <section id="todos" aria-labelledby="titulo-todos" className="border-t bg-leite pb-24 pt-20 md:pb-32 md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <h2 id="titulo-todos" className="text-[clamp(2rem,5vw,3.25rem)] leading-tight">
          Todos os pijamas
        </h2>

        <div role="group" aria-label="Filtrar por coleção" className="mt-8 flex flex-wrap gap-2">
          {opcoes.map((o) => {
            const ativo = filtro === o.id
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={ativo}
                onClick={() => onFiltrar(o.id)}
                className={cn(
                  'h-10 cursor-pointer rounded-full border px-4 text-sm transition-colors duration-300',
                  ativo ? 'border-cacau bg-cacau text-leite' : 'border-cacau/20 hover:border-cacau/60',
                )}
              >
                {o.rotulo}
              </button>
            )
          })}
        </div>

        {visiveis.length === 0 ? (
          <div className="mt-12 rounded-lg bg-creme px-6 py-14 text-center">
            <p className="font-display text-2xl">Nenhum pijama nesta coleção por enquanto.</p>
            <Button variant="outline" className="mt-6" onClick={() => onFiltrar('todos')}>
              Ver todos os pijamas
            </Button>
          </div>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {visiveis.map(({ p, indice }) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onAbrirProduto(indice)}
                  className="group block w-full cursor-pointer text-left"
                  aria-label={`Ver detalhes: ${nomeDoProduto(p, indice)}`}
                >
                  <Foto
                    foto={p.foto}
                    sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                    className="aspect-[3/4] rounded-md"
                    imgClassName="transition-transform duration-[1.2s] ease-seda group-hover:scale-[1.03]"
                  />
                  <span className={cn('mt-4 block font-display text-[1.15rem] leading-snug', !p.nome && 'italic text-cacau-suave')}>
                    {nomeDoProduto(p, indice)}
                  </span>
                  <span className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.95rem]">
                    {p.preco ? <span>{p.preco}</span> : <CampoAPreencher>Preço a informar</CampoAPreencher>}
                    <span className="text-sm underline decoration-dourado underline-offset-[0.4em] group-hover:decoration-cacau">
                      Ver detalhes
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
