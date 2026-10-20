# Q.CHARMME | Pijamas — prévia do site

Prévia demonstrativa da vitrine digital da Q.CHARMME (“Durma confortável e acorde linda”).

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # versão de produção em dist/
```

Stack: Vite + React 19 + TypeScript + Tailwind CSS v4, com estrutura shadcn/ui (`components.json`, alias `@/*`, `src/lib/utils.ts` com `cn`).

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Instagram, horários, contato, políticas, link de compra | `src/data/loja.ts` |
| Pijamas, coleções e fotos | `src/data/produtos.ts` |
| Cores e fontes da marca | `src/index.css` (`:root`) |

### Trocar as fotos ilustrativas pelas fotos reais

1. Coloque as fotos em `public/fotos/` (ex.: `public/fotos/pijama-01.jpg`).
2. Em `src/data/produtos.ts`, troque `url` por `fotoLocal('pijama-01.jpg')` e `ilustrativa` por `false`.
3. Preencha `nome`, `preco`, `cores` e `tamanhos` **somente** com dados confirmados.

Campos vazios não aparecem no site. Enquanto `modoDemonstracao` estiver `true` em `src/data/loja.ts`, eles aparecem como “a informar”; mude para `false` antes de publicar.

### Ponto de integração da compra

`linkCompra` em `src/data/loja.ts`. Enquanto estiver vazio:
- “Comprar” leva até a vitrine;
- “Consultar no Instagram” (no detalhe do pijama) abre o perfil oficial.

Quando o endereço oficial da loja for confirmado, basta preenchê-lo: os botões passam a abrir a loja. Não há pagamento, estoque nem WhatsApp simulados.

## Componentes

- `src/components/ui/` — componentes base no padrão shadcn (`button`, `dialog`, `circular-gallery`). A CLI do shadcn instala tudo nessa pasta (alias `ui` em `components.json`), então manter os componentes reutilizáveis ali permite rodar `npx shadcn add …` depois sem conflito de caminhos.
- `src/components/site/` — as seções da página (abertura, vitrine giratória, coleções, vitrine, marca, Instagram, rodapé).

### `CircularGallery`

Galeria 3D giratória usada na seção “Os pijamas”. Em relação ao componente original, ganhou props opcionais (a API original continua igual):

- `scrollTargetRef` — gira conforme o progresso de rolagem de uma seção (em vez da página toda), sem “pular” ao começar a rolar;
- `itemWidth` / `itemHeight` — tamanho dos cartões (menores no celular);
- `onItemClick` — cartões viram botões (abre o detalhe do pijama);
- `creditLabel` / `fallbackLabel` — textos traduzíveis;
- respeita “reduzir movimento”, pausa fora da tela e esconde o verso dos cartões.

## Publicação (GitHub Pages)

A cada push em `main` ou `claude/site-qcharmme-pijamas`, o workflow `.github/workflows/pages.yml` gera o site e o envia para a branch `gh-pages`.

Para ativar (uma vez): **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `gh-pages` / `(root)` → Save**. O site fica em `https://7biel.github.io/charme/`.

GitHub Pages em repositório privado exige plano pago (GitHub Pro); no plano gratuito, o repositório precisa ser público.
