# Componentes — Hermes

## Hierarquia

```
main.jsx
└── LanguageProvider
    └── App                      estado do par e do período; useCurrencies; useHistory
        ├── Header               seletor de idioma
        ├── PageTitle            Badge
        ├── Converter            useExchangeRate; valor, data e validações
        │   └── CurrencySelect   (2×) CurrencyFlag e lista com busca
        ├── HistoryCard          PeriodChip, StatCard, StatusMessage, Button
        │   └── HistoryChart     Recharts
        ├── RatesTable           useTableFilters; exportação; só existe com dados carregados
        │   ├── TableFilters     Input, Button
        │   ├── RatesGrid        desktop: SortableHeader, CurrencyFlag
        │   ├── RatesList        mobile
        │   ├── Pagination       desktop
        │   ├── StatusMessage    filtros sem resultado
        │   └── Toast            confirmação do CSV
        └── Footer
```

## Como os dados circulam

- **Lifting state up:** `from`, `to` e `periodId` ficam no `App`, porque o conversor, o gráfico e a tabela dependem deles.
- **Estado local:** o valor digitado e a data ficam no `Converter`. Filtros, ordenação e página ficam na `RatesTable`, por meio de `useTableFilters`.
- **Reinício dos filtros:** a `RatesTable` só é renderizada com o histórico carregado. Ao trocar o par ou o período, ela é desmontada e seu estado volta ao inicial.
- **Rede:** componentes não chamam `fetch`. O caminho é `services/frankfurterApi.js` → hooks → componentes.
- **Idioma:** `LanguageProvider` entrega idioma e textos por contexto, lidos com `useLanguage`.

## Custom hooks

| Hook | Responsabilidade | Retorno principal |
|---|---|---|
| `useApiRequest` | Base das consultas: executa a requisição, cancela a anterior com `AbortController` e permite nova tentativa | `status`, `data`, `error`, `retry` |
| `useCurrencies` | Lista de moedas, com nomes traduzidos | `options`, `status`, `retry` |
| `useExchangeRate` | Taxa do par em uma data ou a mais recente | `status`, `rate`, `effectiveDate`, `notFound`, `retry` |
| `useHistory` | Histórico do período, estatísticas e pontos do gráfico | `status`, `records`, `stats`, `points`, `startDate`, `endDate`, `retry` |
| `useTableFilters` | Filtros, último resultado válido, ordenação, paginação e "ver mais" | `values`, `errors`, `filtered`, `sort`, `page`, `pageRecords`, `mobileRecords` e funções de alteração |
| `useIsMobile` | Informa se a tela está no layout mobile | booleano |
| `useLanguage` | Lê o idioma atual e os textos | `language`, `setLanguage`, `t`, `locale` |

## Componentes de página

Todos ficam em `src/components/<Nome>/`, com `<Nome>.jsx` e `<Nome>.module.css`, exceto `LanguageProvider`, que não tem estilos.

| Componente | Responsabilidade | Principais props | Estados | Relações |
|---|---|---|---|---|
| `LanguageProvider` | Mantém o idioma, salva a escolha e atualiza `lang` e o título da página | `children` | `language` | Envolve o `App` |
| `Header` | Marca e troca de idioma: botões no desktop, select no mobile | — | — | Usa `useLanguage` |
| `PageTitle` | Título, subtítulo e origem dos dados | — | — | Usa `Badge` |
| `Footer` | Aviso legal e fonte | — | — | — |
| `Converter` | Conversão, troca de moedas, data, validações e avisos | `from`, `to`, `currencies`, `onFromChange`, `onToChange`, `onSwap` | `amountText`, `selectedDate`, `dismissedDate` | Usa `Card` e `CurrencySelect` |
| `CurrencySelect` | Seleção de moeda com busca, teclado e clique fora | `label`, `value`, `options`, `status`, `onRetry`, `onChange`, `variant` | `isOpen`; na lista: `query`, `activeIndex` | Usado pelo `Converter` |
| `CurrencyFlag` | Bandeira da moeda, com ícone alternativo | `code`, `size` | — | Usado pelo `CurrencySelect` e pela `RatesGrid` |
| `HistoryCard` | Períodos, estatísticas, gráfico e estados do histórico | `from`, `to`, `period`, `onPeriodChange`, `history` | — | Recebe os dados do `App` |
| `HistoryChart` | Gráfico de área com eixos, grade e tooltip | `points`, `from`, `to`, `weekly`, `label` | — | Usado pelo `HistoryCard` |
| `StatCard` | Uma estatística, com tendência opcional | `label`, `value`, `trend` | — | Usado pelo `HistoryCard` |
| `RatesTable` | Contagem, exportação e escolha entre tabela e lista | `from`, `to`, `records` | `exported`; hook `useTableFilters` | Coordena os componentes da tabela |
| `TableFilters` | Campos de filtro e erros; recolhível e com ordenação no mobile | `values`, `errors`, `activeCount`, `sortValue`, `onChange`, `onClear`, `onSortChange` | `isOpen` | Usado pela `RatesTable` |
| `RatesGrid` | Tabela semântica do desktop | `records`, `sort`, `onSort`, `caption` | — | Usa `SortableHeader` |
| `RatesList` | Lista do mobile | `records`, `caption` | — | Usado pela `RatesTable` |
| `Pagination` | Navegação entre páginas, com saltos | `page`, `totalPages`, `onPageChange` | — | Usado pela `RatesTable` |
| `StatusMessage` | Bloco de erro ou de ausência de dados | `icon`, `tone`, `title`, `description`, `role`, `children` | — | Usado pelo `HistoryCard` e pela `RatesTable` |

## Componentes reutilizáveis do Design Guide

| Componente | Responsabilidade | Principais props | Variações |
|---|---|---|---|
| `Button` | Botão com ícone opcional | `variant`, `icon`, `iconSize`, `fullWidth` e props de `<button>` | Primary, Secondary, Dark; Default, Hover, Disabled |
| `Input` | Campo com label, ícone e mensagem | `label`, `helper`, `error`, `icon` e props de `<input>` | Default, Focus, Error, Disabled |
| `Card` | Superfície com borda e sem sombra | `as`, `className`, `children` | — |
| `Badge` | Etiqueta em formato de pílula | `tone`, `children` | Primary, Neutral, Danger, Warning |
| `Toast` | Notificação flutuante que fecha sozinha em 6 segundos | `type`, `title`, `description`, `closeLabel`, `onClose` | Info, Success, Error |
| `PeriodChip` | Botão de período | `label`, `active`, `onClick` | Default, Hover, Active |
| `SortableHeader` | Cabeçalho ordenável, com `aria-sort` | `label`, `direction`, `onSort` | None, Asc, Desc |

## Funções puras (`src/utils`)

| Arquivo | Conteúdo |
|---|---|
| `convert.js` | Interpretação de números digitados, validação, conversão e taxa inversa |
| `format.js` | Formatação de valores, taxas, percentuais e datas conforme o idioma |
| `history.js` | Registros da API, variação diária e estatísticas |
| `aggregate.js` | Agregação semanal |
| `periods.js` | Cálculo do intervalo de cada período |
| `filters.js` | Validação e aplicação dos filtros |
| `sort.js` | Ordenação e alternância de direção |
| `pagination.js` | Total de páginas e botões com saltos |
| `csv.js` | Escape, conteúdo, nome e download do CSV |
| `currencies.js` | Nomes traduzidos, ordem da lista e busca |
| `chartAxis.js` | Marcas dos eixos do gráfico |
