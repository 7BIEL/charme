/**
 * Informações da loja Q.CHARMME.
 *
 * Tudo aqui foi confirmado no perfil oficial do Instagram, exceto os campos
 * vazios ('' ou []), que ficam aguardando confirmação da proprietária.
 * Campos vazios simplesmente não aparecem no site publicado.
 */
export const loja = {
  nome: 'Q.CHARMME',
  assinatura: 'Durma confortável e acorde linda',

  instagram: {
    usuario: '@charmme_pijamas',
    url: 'https://www.instagram.com/charmme_pijamas/',
  },

  /**
   * PONTO DE INTEGRAÇÃO: endereço oficial de compra (loja virtual, catálogo
   * etc.). Enquanto estiver vazio, os botões de compra levam à vitrine e as
   * consultas de produto abrem o Instagram oficial.
   */
  linkCompra: '',

  horarios: [
    { dias: 'Segunda a sexta', horas: '9h às 18h' },
    { dias: 'Sábado', horas: '9h às 13h' },
  ],

  /** Preencher somente com dados confirmados. */
  contato: {
    whatsapp: '',
    email: '',
    endereco: '',
  },

  /** Ex.: [{ rotulo: 'Trocas e devoluções', url: '/trocas' }] */
  politicas: [] as { rotulo: string; url: string }[],

  /** Mostra avisos de "prévia" e os campos que ainda precisam ser preenchidos. */
  modoDemonstracao: true,
}

export const temLinkCompra = loja.linkCompra.trim() !== ''
