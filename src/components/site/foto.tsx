import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

import { loja } from '@/data/loja'
import type { Foto as DadosFoto } from '@/data/produtos'
import { cn } from '@/lib/utils'

const larguras = [480, 800, 1200]

function srcSet(url: string) {
  if (!url.includes('images.unsplash.com')) return undefined
  return larguras.map((w) => `${url.replace(/w=\d+/, `w=${w}`)} ${w}w`).join(', ')
}

interface FotoProps {
  foto: DadosFoto
  sizes?: string
  prioridade?: boolean
  className?: string
  imgClassName?: string
  /** Texto do espaço reservado quando a imagem não carrega. */
  rotuloAusente?: string
  mostrarSelo?: boolean
}

/**
 * Imagem com espaço reservado listrado (como tecido de pijama) para quando a
 * foto ainda não existe ou não carrega, e selo de "foto ilustrativa".
 */
export function Foto({
  foto,
  sizes = '(min-width: 1024px) 33vw, 50vw',
  prioridade = false,
  className,
  imgClassName,
  rotuloAusente = 'Foto do pijama',
  mostrarSelo = true,
}: FotoProps) {
  const [falhou, setFalhou] = useState(false)
  const [carregou, setCarregou] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-creme', className)}>
      {falhou ? (
        <div className="listras-pijama absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center text-sm text-cacau-suave">
          <ImageIcon className="size-6 text-dourado-texto" strokeWidth={1.25} aria-hidden="true" />
          <span className="rounded-full bg-leite/90 px-3 py-1">{rotuloAusente}</span>
        </div>
      ) : (
        <img
          src={foto.url}
          srcSet={srcSet(foto.url)}
          sizes={sizes}
          alt={foto.alt}
          loading={prioridade ? 'eager' : 'lazy'}
          fetchPriority={prioridade ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setCarregou(true)}
          onError={() => setFalhou(true)}
          className={cn(
            'absolute inset-0 size-full object-cover transition-opacity duration-700',
            carregou ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
          style={{ objectPosition: foto.posicao ?? 'center' }}
        />
      )}
      {mostrarSelo && foto.ilustrativa && loja.modoDemonstracao && (
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-leite/90 px-2.5 py-1 text-[0.7rem] leading-none text-cacau">
          Foto ilustrativa
        </span>
      )}
    </div>
  )
}
