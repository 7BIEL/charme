import { Button } from '@/components/ui/button'
import { loja } from '@/data/loja'
import { fotoAbertura } from '@/data/produtos'
import { irPara } from '@/lib/navegacao'
import { Foto } from './foto'
import { IconeInstagram } from './icone-instagram'

export function Abertura() {
  return (
    <section id="inicio" aria-labelledby="titulo-abertura" className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:px-8 md:min-h-[calc(100svh-6.5rem)] md:grid-cols-12 md:gap-8 md:py-12">
        <div className="md:col-span-7 lg:col-span-6">
          <h1
            id="titulo-abertura"
            className="anim-surgir max-w-[12ch] md:max-w-none text-[clamp(2.75rem,8.5vw,5.75rem)] leading-[1.02] tracking-[-0.02em]"
          >
            Seu momento de conforto começa aqui.
          </h1>
          <p
            className="anim-surgir mt-7 max-w-[34ch] text-lg leading-relaxed text-cacau-suave"
            style={{ animationDelay: '180ms' }}
          >
            Pijamas para transformar seus momentos de descanso em experiências ainda mais especiais.
          </p>
          <div
            className="anim-surgir mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
            style={{ animationDelay: '320ms' }}
          >
            <Button onClick={() => irPara('pijamas')}>Conheça os pijamas</Button>
            <a
              href={loja.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.95rem] underline decoration-dourado underline-offset-[0.4em] hover:decoration-cacau"
            >
              <IconeInstagram className="size-[1.1rem]" />
              {loja.instagram.usuario}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-[min(100%,26rem)] md:col-span-5 md:col-start-8 md:w-full lg:col-span-5 lg:col-start-8">
          {/* contorno dourado deslocado, como a cabeceira de uma cama */}
          <div
            aria-hidden="true"
            className="absolute inset-0 translate-x-3 translate-y-3 rounded-t-full border border-dourado sm:translate-x-5 sm:translate-y-5"
          />
          <Foto
            foto={fotoAbertura}
            prioridade
            sizes="(min-width: 768px) 40vw, 90vw"
            rotuloAusente="Foto de modelo com pijama Q.CHARMME"
            className="anim-arco aspect-[4/5] rounded-t-full shadow-[0_30px_60px_-35px_rgb(42_29_23/0.5)]"
          />
        </div>
      </div>
    </section>
  )
}
