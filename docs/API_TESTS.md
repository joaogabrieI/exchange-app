# Testes da API Frankfurter

Investigação feita em **02/11/2026** com `curl` contra a API real (`https://api.frankfurter.dev/v1`). As respostas abaixo foram copiadas das execuções e resumidas onde indicado.

A collection com estas requisições está em [`postman/hermes.postman_collection.json`](../postman/hermes.postman_collection.json). Ela inclui testes automáticos, mas **ainda não foi executada no Postman**: os resultados deste documento vêm do `curl`. Executar a collection no Postman fica como pendência do autor, já que o enunciado pede essa investigação.

## Moedas disponíveis

`GET /currencies` → **200**

```json
{"AUD":"Australian Dollar","BRL":"Brazilian Real","CAD":"Canadian Dollar", "...": "30 moedas no total"}
```

Moedas retornadas: AUD, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF, IDR, ILS, INR, ISK, JPY, KRW, MXN, MYR, NOK, NZD, PHP, PLN, RON, SEK, SGD, THB, TRY, USD e ZAR.

## Cotação mais recente

`GET /latest?base=USD&symbols=BRL` → **200**

```json
{"amount":1.0,"base":"USD","date":"2026-11-02","rates":{"BRL":5.4378}}
```

Sem parâmetros, `GET /latest` usa EUR como base e devolve todas as moedas.

O parâmetro `amount` existe (`amount=10` devolve `{"BRL":54.378}`), mas o app **não o usa**: o enunciado pede que a conversão seja feita na aplicação.

### Taxas muito pequenas

`GET /latest?base=IDR&symbols=USD` → **200**

```json
{"amount":1.0,"base":"IDR","date":"2026-11-02","rates":{"USD":0.00005514}}
```

Com 4 casas decimais essa taxa apareceria como `0,0001`. Por isso o app usa mais casas para taxas menores que 0,01.

## Cotação em uma data

`GET /2026-10-30?base=USD&symbols=BRL` (sexta-feira) → **200**

```json
{"amount":1.0,"base":"USD","date":"2026-10-30","rates":{"BRL":5.4325}}
```

### Data sem cotação

`GET /2026-11-01?base=USD&symbols=BRL` (domingo) → **200**

```json
{"amount":1.0,"base":"USD","date":"2026-10-30","rates":{"BRL":5.4325}}
```

A API não devolve erro: ela responde com o último dia útil, e o campo `date` traz a data efetiva. O app compara esse campo com a data pedida para mostrar o aviso.

## Histórico por intervalo

`GET /2026-10-01..2026-10-07?base=USD&symbols=BRL` → **200**

```json
{"amount":1.0,"base":"USD","start_date":"2026-10-01","end_date":"2026-10-07",
 "rates":{"2026-10-01":{"BRL":5.1885},"2026-10-02":{"BRL":5.2214},"2026-10-05":{"BRL":4.9847},
          "2026-10-06":{"BRL":4.9686},"2026-10-07":{"BRL":5.0061}}}
```

Os fins de semana não aparecem na lista.

### Intervalo que começa sem cotação

| Requisição | `start_date` retornado | Registros |
|---|---|---|
| `/2026-11-01..2026-11-01` | `2026-10-30` | 1 |
| `/2026-10-31..2026-11-01` | `2026-10-30` | 1 |
| `/2025-11-02..2026-11-02` | `2025-10-31` | 256 |

A API recua o início até o último dia útil. Por isso o nome do CSV e os textos usam as datas dos registros retornados.

### Intervalo sem data final

`GET /2026-11-01..?base=USD&symbols=BRL` → **200**, de `2026-10-30` até `2026-11-02`.

## Granularidade em intervalos longos

| Período | Requisição | Registros | Primeiras datas |
|---|---|---|---|
| 1A | `/2025-11-02..2026-11-02` | 256 | 31/10, 03/11, 04/11, 05/11 de 2025 |
| 5A | `/2021-11-02..2026-11-02` | 1.281 | 02/11, 03/11, 04/11, 05/11 de 2021 |
| 10A | `/2016-11-02..2026-11-02` | 2.559 | 02/11, 03/11, 04/11, 07/11 de 2016 |

**Conclusão:** a API devolve dados **diários** mesmo em intervalos longos. A agregação semanal do gráfico em 5A e 10A precisa ser feita no app, em `utils/aggregate.js`. A tabela lista todos os registros.

## Respostas de erro

| Caso | Requisição | Status | Corpo |
|---|---|---|---|
| Moeda de destino inexistente | `/latest?base=USD&symbols=XXX` | 404 | `{"message":"not found"}` |
| Moeda de origem inexistente | `/latest?base=XXX&symbols=BRL` | 404 | `{"message":"not found"}` |
| Moedas iguais | `/latest?base=USD&symbols=USD` | 422 | `{"message":"bad currency pair"}` |
| Data malformada | `/2026-13-45?base=USD&symbols=BRL` | 422 | `{"message":"invalid date"}` |
| Data muito antiga | `/1900-01-01?base=USD&symbols=BRL` | 404 | `{"message":"not found"}` |
| Data futura distante | `/2099-01-01?base=USD&symbols=BRL` | 404 | `{"message":"not found"}` |
| Intervalo invertido | `/2026-11-05..2026-10-01?base=USD&symbols=BRL` | 404 | `{"message":"not found"}` |
| Data anterior aos dados do par | `/1999-01-04?base=USD&symbols=BRL` | 404 | `{"message":"not found"}` |

**Consequências no app:**

- Moedas iguais não chegam à API: o app mostra um aviso antes de consultar.
- O seletor de data limita o intervalo entre 04/01/1999 e hoje. Mesmo assim, uma moeda pode não ter dados em datas antigas, como USD → BRL em 04/01/1999. Esse 404 vira uma mensagem específica no conversor.
- Os demais erros levam ao estado de erro com "Tentar novamente".

## CORS e cache

`GET /latest?base=USD&symbols=BRL` com `Origin: http://localhost:5173`:

```
HTTP/2 200
content-type: application/json; charset=utf-8
access-control-allow-origin: *
cache-control: public, max-age=86400
```

O CORS é liberado, então o navegador pode chamar a API diretamente, sem back-end.
