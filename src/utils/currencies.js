import { POPULAR_CURRENCIES } from '../constants/currencies'

// O navegador traduz o nome da moeda ("USD" → "Dólar americano"). A API só fornece em inglês,
// então o nome da API serve de alternativa.
export function getCurrencyName(code, locale = 'pt-BR', fallback = code) {
  try {
    const name = new Intl.DisplayNames(locale, { type: 'currency', fallback: 'none' }).of(code)
    // Em espanhol o nome vem em minúsculas ("dólar estadounidense").
    return name ? name.charAt(0).toUpperCase() + name.slice(1) : fallback
  } catch {
    return fallback
  }
}

// Moedas populares primeiro, na ordem do design. As demais em ordem alfabética.
export function buildCurrencyOptions(apiCurrencies, locale = 'pt-BR') {
  const options = Object.entries(apiCurrencies).map(([code, apiName]) => ({
    code,
    apiName,
    name: getCurrencyName(code, locale, apiName),
  }))

  function rank(code) {
    const position = POPULAR_CURRENCIES.indexOf(code)
    return position === -1 ? POPULAR_CURRENCIES.length : position
  }

  return options.sort((a, b) => rank(a.code) - rank(b.code) || a.code.localeCompare(b.code))
}

// Remove acentos e maiúsculas: "dolar" encontra "Dólar".
function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
}

// Busca por código, pelo nome traduzido ou pelo nome em inglês da API.
export function filterCurrencies(options, query) {
  const search = normalize(query.trim())
  if (!search) return options

  return options.filter((option) =>
    [option.code, option.name, option.apiName].some((text) => normalize(text).includes(search)),
  )
}
