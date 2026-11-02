import { parseISO } from 'date-fns'

const MINUS_SIGN = '−'

export function formatNumber(value, locale = 'pt-BR', decimals = 2) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

export function formatAmount(value, locale = 'pt-BR') {
  return formatNumber(value, locale, 2)
}

// Taxas usam 4 casas. Abaixo de 0,01 elas sumiriam (IDR → USD = 0,00005514),
// então mostramos 4 algarismos significativos.
export function formatRate(value, locale = 'pt-BR') {
  if (value !== 0 && Math.abs(value) < 0.01) {
    return new Intl.NumberFormat(locale, { maximumSignificantDigits: 4 }).format(value)
  }
  return formatNumber(value, locale, 4)
}

export function formatRatePair(rate, from, to, locale = 'pt-BR') {
  return `1 ${from} = ${formatRate(rate, locale)} ${to}`
}

export function formatPercent(value, locale = 'pt-BR') {
  const rounded = Math.round(value * 100) / 100
  let sign = ''
  if (rounded > 0) sign = '+'
  if (rounded < 0) sign = MINUS_SIGN
  return `${sign}${formatNumber(Math.abs(rounded), locale, 2)}%`
}

export function formatDate(isoDate, locale = 'pt-BR') {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parseISO(isoDate))
}

export function formatDayMonth(isoDate, locale = 'pt-BR') {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: '2-digit' }).format(
    parseISO(isoDate),
  )
}

export function formatWeekday(isoDate, locale = 'pt-BR') {
  return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(parseISO(isoDate))
}

// Valores muito pequenos (1 IDR em USD) usam a mesma regra das taxas para não virar 0,00.
export function formatConverted(value, locale = 'pt-BR') {
  return value < 0.01 ? formatRate(value, locale) : formatAmount(value, locale)
}
