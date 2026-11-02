# Testes das funções JavaScript

Testes automatizados com Vitest 4.1.12, executados em **02/11/2026** com Node 24.15.0.

```bash
npm test
```

**Resultado da execução:** 11 arquivos, 83 testes, 83 aprovados e 0 reprovados.

Nas tabelas abaixo, "Obtido" é igual a "Esperado" porque todos os testes passaram. Os casos completos estão nos arquivos `*.test.js`.

## Resumo por arquivo

| Arquivo | Testes | Situação |
|---|---|---|
| `src/utils/convert.test.js` | 22 | Aprovado |
| `src/utils/filters.test.js` | 10 | Aprovado |
| `src/utils/periods.test.js` | 9 | Aprovado |
| `src/utils/format.test.js` | 8 | Aprovado |
| `src/utils/chartAxis.test.js` | 6 | Aprovado |
| `src/utils/csv.test.js` | 6 | Aprovado |
| `src/utils/currencies.test.js` | 6 | Aprovado |
| `src/utils/history.test.js` | 6 | Aprovado |
| `src/utils/sort.test.js` | 6 | Aprovado |
| `src/utils/pagination.test.js` | 3 | Aprovado |
| `src/constants/texts.test.js` | 1 | Aprovado |

## Conversão (`convert.js`)

| Função | Entrada | Esperado | Obtido |
|---|---|---|---|
| `parseNumber` | `'1.000,50'` | `1000.5` | `1000.5` |
| `parseNumber` | `'1,000.50'` | `1000.5` | `1000.5` |
| `parseNumber` | `'1,5'` | `1.5` | `1.5` |
| `parseNumber` | `'1.000'` | `1000` | `1000` |
| `parseNumber` | `'1,000'`, separador de milhar `,` | `1000` | `1000` |
| `parseNumber` | `'-50'`, `'abc'`, `''`, `'1.5.0'` | `null` | `null` |
| `isValidAmount` | `10` | `true` | `true` |
| `isValidAmount` | `0`, `null` | `false` | `false` |
| `convertAmount` | `1000`, `5.3123` | `≈ 5312.3` | `≈ 5312.3` |
| `inverseRate` | `5.3123` | `≈ 0.1882` | `≈ 0.1882` |

## Formatação (`format.js`)

| Função | Entrada | Esperado | Obtido |
|---|---|---|---|
| `formatAmount` | `1000` | `1.000,00` | `1.000,00` |
| `formatAmount` | `1000`, `en-US` | `1,000.00` | `1,000.00` |
| `formatRate` | `5.3123` | `5,3123` | `5,3123` |
| `formatRate` | `0.00005514` | `0,00005514` | `0,00005514` |
| `formatRatePair` | `5.3123`, `USD`, `BRL` | `1 USD = 5,3123 BRL` | `1 USD = 5,3123 BRL` |
| `formatPercent` | `0.16` | `+0,16%` | `+0,16%` |
| `formatPercent` | `-2.87` | `−2,87%` | `−2,87%` |
| `formatDate` | `2026-10-30` | `30/10/2026` | `30/10/2026` |
| `formatWeekday` | `2026-11-01` | `domingo` | `domingo` |

## Filtros (`filters.js`)

Dados de teste: quatro registros de 20 a 23/10/2026, com cotações de 5,2 a 5,5.

| Caso | Entrada | Esperado | Obtido |
|---|---|---|---|
| Sem filtros | — | 4 registros | 4 registros |
| Data inicial | `2026-10-22` | dias 22 e 23 | dias 22 e 23 |
| Data final | `2026-10-21` | dias 20 e 21 | dias 20 e 21 |
| Cotação mínima | `5,4` | dias 22 e 23 | dias 22 e 23 |
| Cotação máxima | `5.3` | dias 20 e 21 | dias 20 e 21 |
| Combinados | 21 a 23/10, cotação de `5,35` a `5,45` | dia 22 | dia 22 |
| Sem resultado | cotação de `6` a `6,5` | lista vazia | lista vazia |
| Datas invertidas | início 22/10, fim 21/10 | `{ endDate: 'dateOrder' }` | `{ endDate: 'dateOrder' }` |
| Faixa invertida | mínima `6`, máxima `5` | `{ minRate: 'rateOrder' }` | `{ minRate: 'rateOrder' }` |
| Texto inválido | mínima `abc`, máxima `-1` | erro `number` nos dois campos | erro `number` nos dois campos |

## Ordenação (`sort.js`)

| Função | Entrada | Esperado | Obtido |
|---|---|---|---|
| `sortRecords` | data, `desc` | mais recente primeiro | mais recente primeiro |
| `sortRecords` | cotação, `asc` | `5.1, 5.3, 5.5` | `5.1, 5.3, 5.5` |
| `sortRecords` | qualquer ordem | array original intacto | array original intacto |
| `toggleSort` | data `desc`, clique em data | data `asc` | data `asc` |
| `toggleSort` | data `desc`, clique em cotação | cotação `asc` | cotação `asc` |

## CSV (`csv.js`)

| Função | Entrada | Esperado | Obtido |
|---|---|---|---|
| `escapeCsvField` | `a,b` | `"a,b"` | `"a,b"` |
| `escapeCsvField` | `a"b` | `"a""b"` | `"a""b"` |
| `buildCsv` | 2 registros | cabeçalho + 2 linhas | cabeçalho + 2 linhas |
| `buildCsv` | lista vazia | só o cabeçalho | só o cabeçalho |
| `buildCsvFilename` | registros de 01 a 30/10/2026 | `hermes_USD-BRL_2026-10-01_2026-10-30.csv` | `hermes_USD-BRL_2026-10-01_2026-10-30.csv` |

## Histórico (`history.js`, `aggregate.js`, `periods.js`)

| Função | Entrada | Esperado | Obtido |
|---|---|---|---|
| `toRecords` | datas fora de ordem | ordenadas por data | ordenadas por data |
| `toRecords` | taxas 5 → 5,5 → 4,95 | variação `null`, `+10%`, `−10%` | variação `null`, `+10%`, `−10%` |
| `calculateStats` | os mesmos registros | última 4,95; variação −1%; máxima 5,5; mínima 4,95 | última 4,95; variação −1%; máxima 5,5; mínima 4,95 |
| `calculateStats` | lista vazia | `null` | `null` |
| `aggregateByWeek` | 05, 09, 12 e 13/10/2026 | 09 e 13/10/2026 | 09 e 13/10/2026 |
| `getPeriodRange` | 30D, em 02/11/2026 | início 03/10/2026 | início 03/10/2026 |
| `getPeriodRange` | 10A, em 02/11/2026 | início 02/11/2016 | início 02/11/2016 |

## Outras funções

| Função | Entrada | Esperado | Obtido |
|---|---|---|---|
| `getPageItems` | página 5 de 320 | `[1, null, 4, 5, 6, null, 320]` | `[1, null, 4, 5, 6, null, 320]` |
| `getTotalPages` | 14 registros, 8 por página | `2` | `2` |
| `filterCurrencies` | `dolar` | `USD, AUD` | `USD, AUD` |
| `filterCurrencies` | `yen` | `JPY` | `JPY` |
| `getYTicks` | 5,2871 a 5,4693 | `5.25` a `5.5`, de 0,05 em 0,05 | `5.25` a `5.5`, de 0,05 em 0,05 |
| `getYearTicks` | 11 anos, máximo de 6 marcas | anos pares de 2016 a 2026 | anos pares de 2016 a 2026 |
| Textos | PT, EN e ES | mesmas chaves | mesmas chaves |

## Testes no navegador

Executados em **02/11/2026** no app rodando com `npm run dev`, em Chromium, com a API real, exceto onde indicado. Os valores dependem das cotações do dia.

| Item do checklist | Como foi testado | Resultado |
|---|---|---|
| Conversão | 1.000,00 USD → BRL | 5.437,80, com taxa `1 USD = 5,4378 BRL` e inversa `1 BRL = 0,1839 USD` |
| Inversão | Botão de inverter | Conversor, gráfico e tabela passaram para BRL → USD |
| Troca do par | USD → JPY e IDR → USD | Os dados foram atualizados. A taxa pequena apareceu como `0,00005514` |
| 8 períodos | Clique em cada chip | 7D: 6 registros; 15D: 12; 30D: 22; 3M: 67; 6M: 132; 1A: 256; 5A: 1.281; 10A: 2.559 |
| Agregação | Períodos 5A e 10A | Nota exibida. Em 10A, eixo X de 2016 a 2026, de 2 em 2 anos |
| Filtros | Individuais e combinados | Contagem e nome do arquivo acompanharam o resultado |
| Ordenação | Cabeçalhos de Data e Cotação | Alterna ↑/↓, com `aria-sort` correto |
| Exportação | Conteúdo do arquivo capturado no navegador | Cabeçalho, registros filtrados, nome e notificação corretos. O arquivo não foi aberto depois de salvo em disco |
| Entradas inválidas | `-50`, `abc`, `0` | Mensagem de erro, sem resultado |
| Moedas iguais | USD → USD | Aviso exibido, sem requisição e sem tabela |
| Filtros inválidos | Data e cotação invertidas | 2 campos destacados, tabela mantida e exportação bloqueada |
| Filtros sem resultado | Cotação de 6 a 6,5 | `0 de 22 registros encontrados`, exportação bloqueada |
| Data sem cotação | 01/11/2026 | Aviso de domingo, usando a cotação de 30/10/2026 |
| Data fora do intervalo | 2090 e 04/01/1999 | Mensagens específicas |
| Falha da API | `fetch` substituído por uma função que falha | Estado de erro. "Tentar novamente" recuperou os dados depois que a rede voltou |
| Loading e cancelamento | `fetch` atrasado em 800 ms, com 3 cliques em seguida | Loader exibido, 2 requisições canceladas e só a última aplicada |
| Seletor de moedas | Busca, Enter, Esc e clique fora | Funcionam, e o foco volta ao botão |
| Idiomas | PT, EN e ES | Textos, formatos, `lang` e título atualizados. A escolha fica salva |
| Responsividade | 1440px, 900px e 375px | Sem rolagem horizontal. O corte do valor em 900px foi encontrado e corrigido |
