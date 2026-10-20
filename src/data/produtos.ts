/**
 * Vitrine da Q.CHARMME.
 *
 * As fotos abaixo são ILUSTRATIVAS (Unsplash) e servem só para mostrar o
 * layout. Para usar as fotos reais dos pijamas:
 *   1. coloque os arquivos em /public/fotos (ex.: /public/fotos/pijama-01.jpg);
 *   2. troque `url` por '/fotos/pijama-01.jpg' e `ilustrativa` por false;
 *   3. preencha nome, preço, cores e tamanhos apenas quando confirmados.
 * Campos sem valor ficam ocultos no site publicado.
 */

export interface Foto {
  url: string
  /** Descrição da imagem para leitores de tela. */
  alt: string
  /** Enquadramento (CSS object-position), ex.: '50% 30%'. */
  posicao?: string
  /** true enquanto a foto não for da própria marca. */
  ilustrativa: boolean
  credito?: string
}

export interface Categoria {
  id: string
  nome?: string
  foto: Foto
}

export interface Produto {
  id: string
  nome?: string
  preco?: string
  cores?: string[]
  tamanhos?: string[]
  descricao?: string
  categoria?: Categoria['id']
  foto: Foto
}

const unsplash = (id: string, largura = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${largura}&q=70`

const ilustrativa = (id: string, alt: string, posicao?: string): Foto => ({
  url: unsplash(id),
  alt,
  posicao,
  ilustrativa: true,
  credito: 'Unsplash',
})

export const fotoAbertura = ilustrativa(
  '1515886657613-9f3515b0c78f',
  'Imagem ilustrativa de moda feminina, a ser trocada por uma modelo usando pijama Q.CHARMME',
  '50% 25%',
)

export const fotoMarca = ilustrativa(
  '1505693416388-ac5ce068fe85',
  'Imagem ilustrativa de um quarto claro com roupa de cama branca',
)

export const categorias: Categoria[] = [
  { id: 'categoria-1', foto: ilustrativa('1441984904996-e0b6ba687e04', 'Imagem ilustrativa para a primeira categoria') },
  { id: 'categoria-2', foto: ilustrativa('1490481651871-ab68de25d43d', 'Imagem ilustrativa para a segunda categoria') },
  { id: 'categoria-3', foto: ilustrativa('1540518614846-7eded433c457', 'Imagem ilustrativa para a terceira categoria') },
]

export const produtos: Produto[] = [
  { id: 'pijama-01', categoria: 'categoria-1', foto: ilustrativa('1469334031218-e382a71b716b', 'Foto ilustrativa do pijama 1', '50% 30%') },
  { id: 'pijama-02', categoria: 'categoria-2', foto: ilustrativa('1483985988355-763728e1935b', 'Foto ilustrativa do pijama 2', '50% 35%') },
  { id: 'pijama-03', categoria: 'categoria-3', foto: ilustrativa('1434389677669-e08b4cac3105', 'Foto ilustrativa do pijama 3') },
  { id: 'pijama-04', categoria: 'categoria-1', foto: ilustrativa('1445205170230-053b83016050', 'Foto ilustrativa do pijama 4') },
  { id: 'pijama-05', categoria: 'categoria-2', foto: ilustrativa('1522771739844-6a9f6d5f14af', 'Foto ilustrativa do pijama 5') },
  { id: 'pijama-06', categoria: 'categoria-3', foto: ilustrativa('1513694203232-719a280e022f', 'Foto ilustrativa do pijama 6') },
  { id: 'pijama-07', categoria: 'categoria-1', foto: ilustrativa('1616486338812-3dadae4b4ace', 'Foto ilustrativa do pijama 7') },
  { id: 'pijama-08', categoria: 'categoria-2', foto: ilustrativa('1441986300917-64674bd600d8', 'Foto ilustrativa do pijama 8') },
]

/** Textos usados no lugar de campos ainda não confirmados (só no modo demonstração). */
export const aPreencher = {
  nomeProduto: 'Nome do modelo',
  nomeCategoria: 'Nome da categoria',
}

export const nomeDoProduto = (p: Produto, indice: number) => p.nome ?? `${aPreencher.nomeProduto} ${indice + 1}`
export const nomeDaCategoria = (c: Categoria, indice: number) => c.nome ?? `${aPreencher.nomeCategoria} ${indice + 1}`
