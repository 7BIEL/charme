import { useState } from 'react'

import { Abertura } from '@/components/site/abertura'
import { AvisoDemonstracao } from '@/components/site/aviso-demonstracao'
import { Cabecalho } from '@/components/site/cabecalho'
import { Colecoes } from '@/components/site/colecoes'
import { DetalheProduto } from '@/components/site/detalhe-produto'
import { Instagram } from '@/components/site/instagram'
import { Marca } from '@/components/site/marca'
import { Rodape } from '@/components/site/rodape'
import { Vitrine } from '@/components/site/vitrine'
import { VitrineGiratoria } from '@/components/site/vitrine-giratoria'
import { irPara } from '@/lib/navegacao'

function App() {
  const [filtro, setFiltro] = useState('todos')
  const [produtoAberto, setProdutoAberto] = useState<number | null>(null)

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-full bg-cacau px-5 py-3 text-leite focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      <AvisoDemonstracao />
      <Cabecalho />
      <main id="conteudo">
        <Abertura />
        <VitrineGiratoria onAbrirProduto={setProdutoAberto} />
        <Colecoes
          onEscolher={(id) => {
            setFiltro(id)
            irPara('todos')
          }}
        />
        <Vitrine filtro={filtro} onFiltrar={setFiltro} onAbrirProduto={setProdutoAberto} />
        <Marca />
        <Instagram />
      </main>
      <Rodape />
      <DetalheProduto indice={produtoAberto} onMudar={setProdutoAberto} />
    </>
  )
}

export default App
