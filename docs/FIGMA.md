# Figma — Hermes

## Referências

- **Arquivo do design:** [`design/exchangeapp.fig`](../design/exchangeapp.fig)
- **Miniatura do arquivo:** [`design/thumbnail.png`](../design/thumbnail.png)
- **Link público do Figma:** _pendente; precisa ser preenchido pelo autor (exigido na entrega)._

## Frames

| Página | Frame | Conteúdo |
|---|---|---|
| Page 1 | Desktop · Conversor e histórico | Tela principal em 1440px |
| Page 1 | Mobile · Conversor e histórico | Tela principal em 390px |
| Page 1 | Estados · Loading, erro, vazio e validação | Estados da interface no desktop |
| Page 1 | Fluxos · Seleção, validação, ordenação e período | Fluxos de interação |
| Page 1 | Mobile · Estados | Loading, erro e vazio em 390px |
| 01 · Wireframe | Wireframe · Desktop | Baixa fidelidade, desktop |
| 01 · Wireframe | Wireframe · Mobile | Baixa fidelidade, mobile |
| 02 · Design Guide | Design Guide · Tokens | Cores, tipografia, espaçamento, raios e elevação |
| 02 · Design Guide | Design Guide · Componentes | Button, Input, PeriodChip, SortableHeader, Badge, Toast e CurrencySelect |

## Valores confirmados no arquivo

Os valores foram lidos diretamente do `.fig`, decodificando os nós do arquivo.

- **Fundos:** `bg` é `#F4F4F0` e `surface-alt` é `#F8F8F5`.
- **Raios:** chips 6, inputs 8, botões 10, campos grandes 12, cards 16 e pills 999. No mobile, os cards usam 14.
- **Sombras:** tooltip `0 6px 16px` (20%), dropdown `0 12px 32px` (14%), toast `0 8px 24px` (12%) e foco `0 0 0 4px` (12% de primary).
- **Tons fora da paleta principal:** hover de botão primary `#0A4A38`, hover de botão dark `#2A303A`, botão desabilitado `#E6E7E1` com texto `#9A9FA8`, borda de input `#D5D7D0`, borda de erro `#D92D20`, fundo de erro `#FFFBFA`, fundo de badge danger `#FDE8E4`, fundo de badge warning `#FFF4D6`.

## Decisões de interpretação

1. **Margem em telas intermediárias.** O design só define margem lateral de 120 (desktop) e 16 (mobile). Entre 769px e 1280px, usamos 32.
2. **Estatísticas no mobile.** O frame mobile mostra as 4 estatísticas em grade 2×2, em versão compacta. Seguimos o frame.
3. **Estatísticas em 10A.** O fluxo de período longo mostra Início, Variação e Atual. Mantivemos as 4 estatísticas em todos os períodos, como o requisito pede.
