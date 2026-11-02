# Hermes

SPA de câmbio em React + JavaScript que consome a API Frankfurter. Projeto acadêmico: Projeto 01 — Currency Exchange App.

> README inicial: a versão completa entra na fase final do projeto.

## Requisitos

- **Node.js** `^20.19.0` ou `>=22.12.0` (exigência do Vite 8)
- **Vite** `8.3.5`, **React** `19.3.1` e **Vitest** `4.1.12`, com versões fixadas no `package.json`

O Vitest fica na versão 4 porque a 5 não aceita Node 20, e o projeto precisa rodar nas mesmas versões de Node que o Vite 8.

## Como rodar

```bash
npm install
```

```bash
npm run dev
```

## Outros comandos

- `npm run build`: gera a versão de produção em `dist/`
- `npm run lint`: roda o ESLint
- `npm test`: roda os testes com o Vitest
