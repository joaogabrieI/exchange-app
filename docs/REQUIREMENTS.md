# Requisitos — Hermes

## Contexto

Uma empresa de tecnologia financeira quer centralizar a consulta de taxas de câmbio. Hoje os usuários consultam vários sites, convertem valores à mão e copiam informações para planilhas. O Hermes reúne esse processo em uma Single Page Application em React que consome a API Frankfurter.

## Público-alvo

- Pessoas que precisam converter valores entre moedas e consultar a taxa usada.
- Analistas e estudantes que acompanham a evolução de um par de moedas e levam os dados para planilhas.

## Objetivo

Permitir converter valores, analisar o histórico de um par em gráfico e tabela, filtrar e ordenar os registros e exportar o resultado em CSV, sem cadastro e sem back-end.

## Escopo

**Dentro do escopo:** conversor, histórico com 8 períodos, gráfico, estatísticas, tabela com filtros e ordenação, exportação CSV, interface em português, inglês e espanhol, layout desktop e mobile.

**Fora do escopo:** autenticação, cadastro, back-end, banco de dados, pagamentos e compra ou venda real de moedas.

## Requisitos funcionais

### Conversor

| ID | Requisito |
|---|---|
| RF01 | Selecionar moeda de origem e destino em uma lista com busca por código ou nome, exibindo bandeira, código e nome. |
| RF02 | Informar um valor aceitando vírgula ou ponto como separador. |
| RF03 | Exibir valor convertido, taxa utilizada, taxa inversa e data efetiva da cotação. |
| RF04 | Inverter as moedas com um botão. |
| RF05 | Consultar a cotação de uma data escolhida, usando a mais recente por padrão. |
| RF06 | Avisar quando a data escolhida não tiver cotação publicada e informar a data usada. |
| RF07 | Validar valor inválido e moedas iguais, com mensagem e sem exibir resultado. |

### Histórico e gráfico

| ID | Requisito |
|---|---|
| RF08 | Oferecer os períodos 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A. |
| RF09 | Atualizar gráfico, estatísticas e tabela ao trocar o par ou o período. |
| RF10 | Exibir última cotação, variação percentual no período, máxima e mínima. |
| RF11 | Exibir gráfico de linha com área, eixos, linhas de grade, ponto de destaque e tooltip. |
| RF12 | Agregar a série do gráfico por semana em 5A e 10A, com eixo X em anos. |

### Tabela

| ID | Requisito |
|---|---|
| RF13 | Listar data, moeda de origem, moeda de destino, cotação e variação diária. |
| RF14 | Filtrar por data inicial, data final, cotação mínima e cotação máxima, de forma combinável. |
| RF15 | Limpar todos os filtros com um botão. |
| RF16 | Ordenar por data e por cotação, alternando entre crescente e decrescente. |
| RF17 | Exibir a quantidade de registros encontrados em relação ao total. |
| RF18 | Paginar de 8 em 8 no desktop e usar "Ver mais" no mobile. |

### Exportação

| ID | Requisito |
|---|---|
| RF19 | Exportar em CSV todos os registros filtrados, não apenas os da página atual, com cabeçalho. |
| RF20 | Nomear o arquivo com o par e o intervalo efetivo. |
| RF21 | Bloquear a exportação sem registros ou com filtros inválidos. |
| RF22 | Confirmar a exportação com uma notificação. |

### Idioma

| ID | Requisito |
|---|---|
| RF23 | Permitir trocar a interface entre PT, EN e ES, com PT como padrão. |

## Requisitos não funcionais

| ID | Requisito |
|---|---|
| RNF01 | SPA em React com JavaScript, componentes funcionais e Vite 8. |
| RNF02 | Estilos em CSS Modules e tokens em variáveis CSS globais. |
| RNF03 | Chamadas de rede apenas em `services/`, consumidas por custom hooks. |
| RNF04 | Requisições obsoletas canceladas com `AbortController`. |
| RNF05 | Layout responsivo, com adaptação mobile até 768px de largura. |
| RNF06 | Acessibilidade: labels associados, foco visível, `aria-live` em erros e resultados, tabela semântica com `aria-sort` e navegação por teclado no seletor de moedas. |
| RNF07 | Fidelidade ao design de `design/exchangeapp.fig`. |
| RNF08 | Funções de cálculo, filtro, ordenação, CSV e formatação cobertas por testes com Vitest. |
| RNF09 | Sem warnings do React e sem `console.error` no fluxo normal. |

## Regras de negócio

| ID | Regra |
|---|---|
| RN01 | A conversão é feita no app: `valor convertido = valor × taxa`. A API fornece apenas a taxa. |
| RN02 | A taxa inversa é `1 ÷ taxa`. |
| RN03 | O valor precisa ser numérico e maior que zero. |
| RN04 | Origem e destino precisam ser diferentes. Com moedas iguais, nenhuma cotação é consultada. |
| RN05 | Em fins de semana e feriados vale o último dia útil publicado. A data exibida é a do campo `date` da resposta da API. |
| RN06 | A variação no período é `(última − primeira) ÷ primeira × 100`. |
| RN07 | A variação diária compara cada registro com o registro anterior em ordem de data. O primeiro registro não tem variação. |
| RN08 | A agregação semanal usa o último registro de cada semana e afeta só o gráfico. A tabela e as estatísticas usam todos os registros retornados. |
| RN09 | A data final não pode ser anterior à inicial, e a cotação mínima não pode ser maior que a máxima. |
| RN10 | Enquanto houver filtro inválido, a tabela mantém o último resultado válido e a exportação fica bloqueada. |
| RN11 | Trocar o par ou o período limpa os filtros, porque as faixas de data e de cotação deixam de fazer sentido para os novos dados. |
| RN12 | Vermelho e verde só comunicam variação e status. |
| RN13 | As taxas são de referência do Banco Central Europeu e não se aplicam a transações reais. |

## Critérios de aceite

- **CA01:** com `1.000,00` USD e taxa 5,3123 para BRL, o app mostra `5.312,30` e `1 USD = 5,3123 BRL`.
- **CA02:** o botão de inverter troca origem e destino e atualiza conversão, gráfico e tabela.
- **CA03:** digitar `-50`, `abc` ou `0` mostra "Informe um valor numérico maior que zero." e oculta o resultado.
- **CA04:** escolher a mesma moeda nos dois lados mostra o aviso de moedas iguais e nenhuma requisição é feita.
- **CA05:** escolher um domingo mostra o aviso de data sem cotação com a data do último dia útil.
- **CA06:** cada um dos 8 períodos carrega dados reais no gráfico e na tabela.
- **CA07:** em 5A e 10A, o eixo X mostra anos e a nota sobre agregação semanal aparece.
- **CA08:** filtros de data e cotação funcionam sozinhos e combinados, e a contagem acompanha o resultado.
- **CA09:** filtros sem resultado mostram o estado vazio, `0 de N registros encontrados` e bloqueiam a exportação.
- **CA10:** filtro inválido destaca o campo, mantém a tabela anterior e bloqueia a exportação.
- **CA11:** o CSV contém apenas os registros filtrados, com cabeçalho `data,origem,destino,cotação`, e o nome segue o modelo `hermes_USD-BRL_2026-10-01_2026-10-30.csv`.
- **CA12:** com a API fora do ar, o app mostra o estado de erro, e "Tentar novamente" refaz a requisição.
- **CA13:** o app funciona em desktop e em celular, seguindo os frames correspondentes.
- **CA14:** `npm install`, `npm run dev` e `npm run build` funcionam seguindo o README.
