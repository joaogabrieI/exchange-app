# Hermes

Single Page Application em React para converter moedas, analisar o histórico de um par e exportar cotações em CSV, usando as taxas de referência do Banco Central Europeu pela API Frankfurter.

Projeto 01 — Currency Exchange App (projeto acadêmico individual).

## Funcionalidades

- **Conversor:** seleção de moedas com busca, valor com vírgula ou ponto, troca de moedas, taxa utilizada, taxa inversa, data efetiva e consulta por data.
- **Histórico:** períodos de 7D, 15D, 30D, 3M, 6M, 1A, 5A e 10A, com última cotação, variação, máxima e mínima.
- **Gráfico:** linha com área e tooltip. Em 5A e 10A, a série é agregada por semana.
- **Tabela:** variação diária, filtros combináveis por data e cotação, ordenação, contagem, paginação no desktop e "Ver mais" no mobile.
- **Exportação CSV:** todos os registros filtrados, gerados no navegador, com nome que indica o par e o intervalo.
- **Estados da interface:** loading, erro com nova tentativa, ausência de dados, validações e data sem cotação.
- **Idiomas:** português, inglês e espanhol.
- **Responsividade:** layouts para desktop e celular.

## Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React + JSX | 19.3.1 | Interface com componentes funcionais |
| Vite | 8.3.5 | Desenvolvimento e build |
| CSS Modules | — | Estilos isolados por componente |
| Recharts | 3.10.1 | Gráfico |
| lucide-react | 1.66.0 | Ícones |
| date-fns | 4.4.0 | Cálculo de datas |
| @fontsource/inter | 5.3.0 | Fonte Inter |
| Vitest | 4.1.12 | Testes das funções puras |
| ESLint | 9.39.5 | Análise do código |

As bandeiras são do conjunto [circle-flags](https://github.com/HatScripts/circle-flags) (licença MIT) e estão em `src/assets/flags/`.

O CSV é gerado sem bibliotecas, em `src/utils/csv.js`.

## Requisitos

- **Node.js** `^20.19.0` ou `>=22.12.0`, exigência do Vite 8
- **npm**
- Acesso à internet, porque os dados vêm de `api.frankfurter.dev`

As versões estão fixadas no `package.json`. O Vitest fica na versão 4 porque a 5 não aceita Node 20, e o projeto precisa rodar nas mesmas versões de Node que o Vite 8.

## Instalação

```bash
git clone https://github.com/joaogabrieI/exchange-app.git
```

```bash
cd exchange-app
```

```bash
npm install
```

## Execução

```bash
npm run dev
```

O Vite mostra no terminal o endereço local, normalmente `http://localhost:5173`.

## Outros comandos

| Comando | O que faz |
|---|---|
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão gerada |
| `npm test` | Roda os testes |
| `npm run lint` | Analisa o código |

O `npm run build` mostra um aviso de tamanho do arquivo JavaScript por causa da biblioteca de gráficos. É apenas um aviso e não impede o build.

## Arquitetura

```
src/
  assets/flags/    bandeiras em SVG
  components/      um diretório por componente: Componente.jsx + Componente.module.css
  hooks/           useApiRequest, useCurrencies, useExchangeRate, useHistory, useTableFilters...
  services/        frankfurterApi.js: todas as chamadas fetch
  utils/           funções puras, testadas com Vitest
  constants/       períodos, moedas, idiomas e textos
  App.jsx          estado compartilhado: par e período
docs/              documentação do projeto
design/            arquivo do Figma
postman/           collection da API
```

O fluxo dos dados é `services` → `hooks` → `components`:

1. `services/frankfurterApi.js` faz as requisições.
2. Os hooks controlam loading, erro, cancelamento e nova tentativa.
3. As funções de `utils/` calculam registros, estatísticas, filtros e CSV.
4. Os componentes só exibem o resultado e avisam das ações do usuário.

A conversão é feita no app (`valor × taxa`). A API fornece apenas a taxa.

## Documentação

- [Requisitos e regras de negócio](docs/REQUIREMENTS.md)
- [Componentes](docs/COMPONENTS.md)
- [Figma](docs/FIGMA.md)
- [Testes da API](docs/API_TESTS.md)
- [Testes das funções](docs/FUNCTION_TESTS.md)
- [Uso de IA](docs/AI_USAGE.md)
- [Collection do Postman](postman/hermes.postman_collection.json)

## Aviso

As taxas são de referência do Banco Central Europeu e não se aplicam a transações reais.
