/**
 * Vitrine da Q.CHARMME.
 *
 * Fotos reais da Q.CHARMME ficam em /public/fotos. Para incluir um modelo:
 *   1. coloque o arquivo em /public/fotos (ex.: /public/fotos/pijama-01.jpg);
 *   2. adicione-o em `fotos` com real('pijama-01.jpg', 'descrição da foto');
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

/** Foto colocada em /public/fotos, ex.: fotoLocal('pijama-01.jpg'). */
export const fotoLocal = (arquivo: string) => `${import.meta.env.BASE_URL}fotos/${arquivo}`

const real = (arquivo: string, alt: string, posicao?: string): Foto => ({
  url: fotoLocal(arquivo),
  alt,
  posicao,
  ilustrativa: false,
})

const fotos = {
  fachada: real('loja-fachada.jpg', 'Fachada da loja Q.CHARMME Pijamas, com araras de pijamas coloridos na entrada', '50% 0%'),
  verde: real(
    'pijama-verde-gestante.jpg',
    'Gestante usando pijama curto verde-sálvia com debrum creme e botões',
    '50% 35%',
  ),
  camisola: real(
    'camisola-renda-agua.jpg',
    'Detalhe de camisola verde-água com renda bordada em rosa e laços de cetim',
    '50% 40%',
  ),
  masculino: real('pijama-masculino-azul.jpg', 'Homem usando pijama azul de camiseta e calça', '50% 30%'),
  bege: real('pijama-bege-detalhe.jpg', 'Detalhe de pijama bege com gola, debrum e botões', '50% 30%'),
}

export const fotoAbertura = fotos.verde

export const fotoMarca = fotos.fachada

export const categorias: Categoria[] = [
  { id: 'categoria-1', foto: fotos.bege },
  { id: 'categoria-2', foto: fotos.camisola },
  { id: 'categoria-3', foto: fotos.masculino },
]

export const produtos: Produto[] = [
  { id: 'pijama-verde', categoria: 'categoria-1', foto: fotos.verde },
  { id: 'camisola-renda', categoria: 'categoria-2', foto: fotos.camisola },
  { id: 'pijama-masculino', categoria: 'categoria-3', foto: fotos.masculino },
  { id: 'pijama-bege', categoria: 'categoria-1', foto: fotos.bege },
]

/** Textos usados no lugar de campos ainda não confirmados (só no modo demonstração). */
export const aPreencher = {
  nomeProduto: 'Nome do modelo',
  nomeCategoria: 'Nome da categoria',
}

export const nomeDoProduto = (p: Produto, indice: number) => p.nome ?? `${aPreencher.nomeProduto} ${indice + 1}`
export const nomeDaCategoria = (c: Categoria, indice: number) => c.nome ?? `${aPreencher.nomeCategoria} ${indice + 1}`
