import { useEffect, useState } from 'react'
import { Clock, Menu } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { loja } from '@/data/loja'
import { comprar, irPara, secoes } from '@/lib/navegacao'
import { cn } from '@/lib/utils'
import { IconeInstagram } from './icone-instagram'
import { Logo } from './logo'

function LinkSecao({ id, rotulo, onNavegar }: { id: string; rotulo: string; onNavegar?: () => void }) {
  return (
    <a
      href={`#${id}`}
      onClick={(e) => {
        e.preventDefault()
        onNavegar?.()
        irPara(id)
      }}
    >
      {rotulo}
    </a>
  )
}

export function Cabecalho() {
  const [rolou, setRolou] = useState(false)
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-[background-color,box-shadow] duration-500',
        rolou ? 'bg-leite/92 shadow-[0_1px_0_var(--border)] backdrop-blur-md' : 'bg-leite',
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
        <a
          href="#inicio"
          aria-label="Q.CHARMME, voltar ao início"
          onClick={(e) => {
            e.preventDefault()
            irPara('inicio')
          }}
        >
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-9 text-[0.95rem]">
            {secoes.map((s) => (
              <li
                key={s.id}
                className="[&>a]:decoration-dourado [&>a]:underline-offset-[0.45em] [&>a:hover]:underline"
              >
                <LinkSecao {...s} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={comprar} className="hidden min-[400px]:inline-flex">
            Comprar
          </Button>

          <Dialog open={menuAberto} onOpenChange={setMenuAberto}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Abrir menu">
                <Menu className="size-6" strokeWidth={1.5} />
              </Button>
            </DialogTrigger>
            <DialogContent side="right" closeLabel="Fechar menu" className="px-7 pb-8 pt-20">
              <DialogTitle className="sr-only">Menu</DialogTitle>
              <DialogDescription className="sr-only">Navegue pelas seções da loja</DialogDescription>
              <nav aria-label="Menu móvel">
                <ul className="space-y-1">
                  {secoes.map((s) => (
                    <li key={s.id} className="font-display text-[2rem] leading-[1.5]">
                      <LinkSecao {...s} onNavegar={() => setMenuAberto(false)} />
                    </li>
                  ))}
                </ul>
              </nav>
              <Button
                className="mt-8 w-full"
                onClick={() => {
                  setMenuAberto(false)
                  comprar()
                }}
              >
                Comprar
              </Button>
              <div className="mt-auto space-y-4 border-t pt-6 text-sm text-cacau-suave">
                <a
                  href={loja.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cacau"
                >
                  <IconeInstagram className="size-5" />
                  {loja.instagram.usuario}
                </a>
                <div className="flex gap-2">
                  <Clock className="mt-0.5 size-4 shrink-0 text-dourado-texto" strokeWidth={1.5} aria-hidden="true" />
                  <p>
                    {loja.horarios.map((h) => (
                      <span key={h.dias} className="block">
                        {h.dias}: {h.horas}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
