const BASE_URL = 'https://api.frankfurter.dev/v1'

// Erro com o status HTTP, para os hooks diferenciarem 404 de falha de rede.
export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, signal) {
  const response = await fetch(`${BASE_URL}${path}`, { signal })
  const data = await response.json()

  if (!response.ok) {
    throw new ApiError(response.status, data.message)
  }
  return data
}

// { USD: 'United States Dollar', ... }
export function getCurrencies(signal) {
  return request('/currencies', signal)
}

// Sem data, busca a cotação mais recente. Em dias sem cotação, a API responde com
// o último dia útil, e o campo date traz a data efetiva.
export async function getRate(from, to, date, signal) {
  const endpoint = date || 'latest'
  const data = await request(`/${endpoint}?base=${from}&symbols=${to}`, signal)
  return { rate: data.rates[to], date: data.date }
}

// { '2026-10-01': { BRL: 5.1885 }, ... }
export async function getHistory(from, to, startDate, endDate, signal) {
  const data = await request(`/${startDate}..${endDate}?base=${from}&symbols=${to}`, signal)
  return data.rates
}
