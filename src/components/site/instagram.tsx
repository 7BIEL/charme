import { Button } from '@/components/ui/button'
import { loja } from '@/data/loja'
import { IconeInstagram } from './icone-instagram'

export function Instagram() {
  return (
    <section aria-labelledby="titulo-instagram" className="bg-salvia-escura py-24 text-leite md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <h2 id="titulo-instagram" className="text-[clamp(2rem,5vw,3.25rem)] leading-tight">
            Novidades no Instagram
          </h2>
          <p className="mt-4 max-w-[44ch] text-lg text-leite/85">
            Acompanhe os novos modelos e fale com a Q.CHARMME pelo perfil oficial.
          </p>
          <a
            href={loja.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex max-w-full items-center gap-3 font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-tight decoration-dourado decoration-1 underline-offset-[0.2em] hover:underline"
          >
            <IconeInstagram className="size-[0.8em] shrink-0 text-dourado" />
            <span className="min-w-0 break-all">{loja.instagram.usuario}</span>
          </a>
        </div>
        <div className="md:col-span-4 md:col-start-9 md:justify-self-end">
          <Button
            asChild
            variant="outline"
            className="border-leite/40 text-leite hover:border-leite hover:bg-leite/10"
          >
            <a href={loja.instagram.url} target="_blank" rel="noopener noreferrer">
              Abrir o perfil no Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
