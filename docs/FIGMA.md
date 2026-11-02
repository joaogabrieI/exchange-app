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
4. **Campos de data.** Usamos `<input type="date">`, que oferece o calendário do navegador e sempre entrega uma data válida. O placeholder e o formato exibido (`dd/mm/aaaa`) dependem do idioma do navegador, não do idioma escolhido no app.
5. **Dica de decimais nos filtros.** O frame principal não mostra a dica, e o fluxo de validação mostra. Ela aparece só enquanto há erro nos filtros, o que mantém a altura do frame principal.
6. **Loading e erro do histórico.** O conteúdo do card é substituído, mas os chips de período continuam disponíveis. A tabela fica oculta até os dados chegarem, como nos frames mobile. A etiqueta "Falha na API Frankfurter" é um rótulo do frame de estados, não parte da interface, então não é exibida.
7. **Toast do CSV.** O título reúne "Exportação concluída" e a quantidade de registros. A descrição traz o nome do arquivo e as colunas.
8. **Filtros no mobile.** Começam abertos, como no frame "Filters (expanded)", e podem ser recolhidos.
9. **"Usar a mais recente".** Botão que não está no design. Foi adicionado porque o seletor de data não tinha outro caminho para voltar à cotação mais recente.
10. **Faixa de datas no estado vazio.** Sem filtro de data, o resumo mostra o intervalo dos dados carregados.
11. **Taxas muito pequenas.** Abaixo de 0,01 usamos 4 algarismos significativos, porque 4 casas transformariam 0,00005514 em 0,0001.
12. **Nomes das moedas.** Vêm de `Intl.DisplayNames`, que traduz para o idioma atual. O nome em inglês da API é a alternativa e também vale na busca.
13. **Rótulos de período em inglês.** 1A, 5A e 10A viram 1Y, 5Y e 10Y.
14. **Ordenação inicial.** Ao clicar em Cotação, a ordem começa crescente, como no fluxo. Ao clicar em Data, começa pelas mais recentes.
15. **Imagens do design.** Não exportamos PNGs dos frames, porque os valores foram lidos diretamente do `.fig`. Para as evidências da entrega, o autor deve exportá-los pelo Figma.
