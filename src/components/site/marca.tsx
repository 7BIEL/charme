import { loja } from '@/data/loja'
import { fotoMarca } from '@/data/produtos'
import { Foto } from './foto'

export function Marca() {
  return (
    <section aria-labelledby="titulo-marca" className="overflow-hidden bg-rose/45 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <blockquote className="font-display text-[clamp(2.6rem,9vw,6rem)] italic leading-[1] tracking-[-0.02em] text-vinho">
          <p className="max-w-[14ch]">{loja.assinatura}.</p>
        </blockquote>

        <div className="mt-16 grid items-center gap-12 md:mt-24 md:grid-cols-12 md:gap-8">
          <Foto
            foto={fotoMarca}
            sizes="(min-width: 768px) 40vw, 92vw"
            rotuloAusente="Foto da loja"
            className="mx-auto aspect-[4/5] w-full max-w-md rounded-md md:col-span-5"
          />
          <div className="md:col-span-6 md:col-start-7">
            <h2 id="titulo-marca" className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.08]">
              Conforto que combina com você
            </h2>
            <p className="mt-6 max-w-[42ch] text-lg leading-[1.7] text-cacau-suave">
              Descansar também é um momento seu. Um pijama bonito deixa o fim do dia mais leve e faz a manhã começar
              do jeito certo: com você se sentindo bem.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
