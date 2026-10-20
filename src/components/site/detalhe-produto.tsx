import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { loja, temLinkCompra } from '@/data/loja'
import { categorias, nomeDaCategoria, nomeDoProduto, produtos } from '@/data/produtos'
import { cn } from '@/lib/utils'
import { CampoAPreencher } from './campo-a-preencher'
import { Foto } from './foto'
import { IconeInstagram } from './icone-instagram'

interface DetalheProdutoProps {
  indice: number | null
  onMudar: (indice: number | null) => void
}

function Linha({ rotulo, valor, aPreencher }: { rotulo: string; valor?: string; aPreencher: string }) {
  if (!valor && !loja.modoDemonstracao) return null
  return (
    <div className="flex items-baseline justify-between gap-6 border-b py-3.5">
      <dt className="text-sm text-cacau-suave">{rotulo}</dt>
      <dd className="text-right">{valor ?? <CampoAPreencher>{aPreencher}</CampoAPreencher>}</dd>
    </div>
  )
}

export function DetalheProduto({ indice, onMudar }: DetalheProdutoProps) {
  const total = produtos.length
  const produto = indice === null ? null : produtos[indice]
  const indiceCategoria = produto ? categorias.findIndex((c) => c.id === produto.categoria) : -1
  const categoria = indiceCategoria >= 0 ? nomeDaCategoria(categorias[indiceCategoria], indiceCategoria) : undefined

  const navegar = (passo: number) => {
    if (indice === null) return
    onMudar((indice + passo + total) % total)
  }

  return (
    <Dialog open={produto !== null} onOpenChange={(aberto) => !aberto && onMudar(null)}>
      <DialogContent
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') navegar(1)
          if (e.key === 'ArrowLeft') navegar(-1)
        }}
      >
        {produto && indice !== null && (
          <div className="grid md:grid-cols-2">
            <div className="relative">
              <Foto
                key={produto.id}
                foto={produto.foto}
                prioridade
                sizes="(min-width: 768px) 450px, 100vw"
                className="aspect-[4/5] md:h-full md:aspect-auto md:min-h-[34rem]"
              />
              <div className="absolute bottom-3 right-3 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navegar(-1)}
                  aria-label="Pijama anterior"
                  className="bg-leite/90 hover:bg-leite"
                >
                  <ChevronLeft strokeWidth={1.5} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navegar(1)}
                  aria-label="Próximo pijama"
                  className="bg-leite/90 hover:bg-leite"
                >
                  <ChevronRight strokeWidth={1.5} />
                </Button>
              </div>
            </div>

            <div className="flex flex-col p-6 sm:p-10">
              <p className="text-sm tabular-nums text-cacau-suave">
                {indice + 1} de {total}
              </p>
              <DialogTitle className={cn('mt-3 text-[2.1rem] leading-tight', !produto.nome && 'italic text-cacau-suave')}>
                {nomeDoProduto(produto, indice)}
              </DialogTitle>
              <DialogDescription className="mt-3">
                {produto.descricao ??
                  (loja.modoDemonstracao
                    ? 'Descrição do modelo a ser escrita com a loja.'
                    : 'Fale com a Q.CHARMME para saber mais sobre este pijama.')}
              </DialogDescription>

              <dl className="mt-8 border-t">
                <Linha rotulo="Preço" valor={produto.preco} aPreencher="A informar" />
                <Linha rotulo="Cores" valor={produto.cores?.join(', ')} aPreencher="A confirmar" />
                <Linha rotulo="Tamanhos" valor={produto.tamanhos?.join(', ')} aPreencher="A confirmar" />
                <Linha rotulo="Coleção" valor={categoria} aPreencher="A definir" />
              </dl>

              <div className="mt-auto pt-10">
                {temLinkCompra ? (
                  <Button asChild className="w-full">
                    <a href={loja.linkCompra} target="_blank" rel="noopener noreferrer">
                      Comprar na loja
                      <ExternalLink />
                    </a>
                  </Button>
                ) : (
                  <Button asChild className="w-full">
                    <a href={loja.instagram.url} target="_blank" rel="noopener noreferrer">
                      <IconeInstagram />
                      Consultar no Instagram
                    </a>
                  </Button>
                )}
                <DialogClose asChild>
                  <Button variant="link" className="mt-4 w-full">
                    Continuar vendo
                  </Button>
                </DialogClose>
                {!temLinkCompra && loja.modoDemonstracao && (
                  <p className="mt-6 text-[0.8rem] leading-relaxed text-cacau-suave">
                    Prévia: este botão passa a levar ao endereço oficial de compra assim que ele for confirmado.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
