import { Clock } from 'lucide-react'

import { loja } from '@/data/loja'
import { irPara, secoes } from '@/lib/navegacao'
import { IconeInstagram } from './icone-instagram'
import { Logo } from './logo'

const ano = new Date().getFullYear()

export function Rodape() {
  const { whatsapp, email, endereco } = loja.contato
  const temContato = Boolean(whatsapp || email || endereco)
  const faltaConfirmar = !temContato || loja.politicas.length === 0

  return (
    <footer id="contato" aria-labelledby="titulo-contato" className="bg-marinho pb-10 pt-20 text-leite md:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo claro />
            <p className="mt-6 max-w-[26ch] font-display text-xl italic text-leite/85">{loja.assinatura}.</p>
          </div>

          <div className="md:col-span-4">
            <h2 id="titulo-contato" className="text-[1.75rem]">
              Atendimento
            </h2>
            <dl className="mt-5 space-y-2 text-leite/85">
              {loja.horarios.map((h) => (
                <div key={h.dias} className="flex gap-3">
                  <Clock className="mt-1 size-4 shrink-0 text-dourado" strokeWidth={1.5} aria-hidden="true" />
                  <dt>{h.dias}:</dt>
                  <dd className="tabular-nums">{h.horas}</dd>
                </div>
              ))}
            </dl>
            <a
              href={loja.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 underline decoration-dourado underline-offset-[0.4em] hover:decoration-leite"
            >
              <IconeInstagram className="size-[1.1rem]" />
              {loja.instagram.usuario}
            </a>
            {temContato && (
              <ul className="mt-6 space-y-2 text-leite/85">
                {whatsapp && <li>WhatsApp: {whatsapp}</li>}
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="underline decoration-dourado underline-offset-[0.4em]">
                      {email}
                    </a>
                  </li>
                )}
                {endereco && <li>{endereco}</li>}
              </ul>
            )}
          </div>

          <nav aria-label="Rodapé" className="md:col-span-3 md:col-start-10">
            <ul className="space-y-3">
              {secoes.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      irPara(s.id)
                    }}
                    className="text-leite/85 decoration-dourado underline-offset-[0.4em] hover:text-leite hover:underline"
                  >
                    {s.rotulo}
                  </a>
                </li>
              ))}
              {loja.politicas.map((p) => (
                <li key={p.url}>
                  <a href={p.url} className="text-leite/85 hover:text-leite hover:underline">
                    {p.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {loja.modoDemonstracao && faltaConfirmar && (
          <p className="mt-16 rounded-md border border-dashed border-dourado/60 px-5 py-4 text-sm leading-relaxed text-leite/80">
            Espaço reservado: WhatsApp, e-mail, endereço e políticas da loja entram aqui depois de confirmados pela
            Q.CHARMME.
          </p>
        )}

        <p className="mt-16 border-t border-leite/15 pt-8 text-sm text-leite/65">
          © {ano} Q.CHARMME | Pijamas
        </p>
      </div>
    </footer>
  )
}
