// Interpreta o que o usuário digitou. Devolve um número, ou null se o texto for inválido.
// Aceita vírgula ou ponto: se os dois aparecem, o último é o separador decimal
// ("1.000,50" e "1,000.50"). Com um só, depende do idioma: "1.000" é mil em português,
// e "1,000" é mil em inglês. thousandsSeparator informa qual é o separador de milhar local.
export function parseNumber(text, thousandsSeparator = '.') {
  const clean = text.trim().replace(/\s/g, '')
  if (!/^\d[\d.,]*$/.test(clean) || /[.,]$/.test(clean)) return null

  const lastDot = clean.lastIndexOf('.')
  const lastComma = clean.lastIndexOf(',')
  let decimalIndex = -1

  if (lastDot !== -1 && lastComma !== -1) {
    decimalIndex = Math.max(lastDot, lastComma)
  } else if (lastDot !== -1 || lastComma !== -1) {
    const separator = lastDot !== -1 ? '.' : ','
    const isSingle = clean.indexOf(separator) === clean.lastIndexOf(separator)
    const looksLikeThousands = /^\d{1,3}[.,]\d{3}$/.test(clean) && separator === thousandsSeparator

    if (isSingle && !looksLikeThousands) decimalIndex = clean.lastIndexOf(separator)
  }

  const integerPart = (decimalIndex === -1 ? clean : clean.slice(0, decimalIndex)).replace(/[.,]/g, '')
  const decimalPart = decimalIndex === -1 ? '' : clean.slice(decimalIndex + 1)
  if (/[.,]/.test(decimalPart)) return null

  return Number(`${integerPart}.${decimalPart || '0'}`)
}

export function isValidAmount(amount) {
  return amount !== null && amount > 0
}

export function convertAmount(amount, rate) {
  return amount * rate
}

export function inverseRate(rate) {
  return 1 / rate
}
