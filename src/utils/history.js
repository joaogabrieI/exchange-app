// Converte a resposta da API ({ '2026-10-01': { BRL: 5.18 }, ... }) em registros ordenados
// por data. A variação diária compara cada registro com o anterior. O primeiro não tem variação.
export function toRecords(apiRates, from, to) {
  const dates = Object.keys(apiRates).sort()

  return dates.map((date, index) => {
    const rate = apiRates[date][to]
    const previous = index > 0 ? apiRates[dates[index - 1]][to] : null

    return {
      date,
      from,
      to,
      rate,
      dailyChange: previous === null ? null : ((rate - previous) / previous) * 100,
    }
  })
}

// Espera registros em ordem crescente de data, como os de toRecords.
export function calculateStats(records) {
  if (records.length === 0) return null

  const rates = records.map((record) => record.rate)
  const first = rates[0]
  const last = rates[rates.length - 1]

  return {
    last,
    change: ((last - first) / first) * 100,
    max: Math.max(...rates),
    min: Math.min(...rates),
  }
}
