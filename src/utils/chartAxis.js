// Calcula as marcas do eixo Y em valores "redondos" (5,25 / 5,30 / 5,35...).
// Devolve também quantas casas decimais são necessárias para exibi-las.
export function getYTicks(min, max, count = 6) {
  const range = max - min || Math.abs(max) * 0.01 || 1
  const roughStep = range / (count - 1)
  const magnitude = 10 ** Math.floor(Math.log10(roughStep))
  const normalized = roughStep / magnitude

  let niceFactor = 10
  if (normalized <= 1) niceFactor = 1
  else if (normalized <= 2) niceFactor = 2
  else if (normalized <= 5) niceFactor = 5

  const step = niceFactor * magnitude
  const decimals = Math.max(0, -Math.floor(Math.log10(step)))
  const first = Math.floor(min / step)
  const last = Math.ceil(max / step)

  const ticks = []
  for (let index = first; index <= last; index += 1) {
    ticks.push(Number((index * step).toFixed(decimals)))
  }
  return { ticks, decimals }
}

// Escolhe datas espaçadas igualmente para o eixo X, incluindo a primeira e a última.
export function getDateTicks(points, count = 5) {
  if (points.length <= count) return points.map((point) => point.date)

  const ticks = []
  for (let index = 0; index < count; index += 1) {
    const position = Math.round((index * (points.length - 1)) / (count - 1))
    ticks.push(points[position].date)
  }
  return ticks
}

// Para 5A e 10A: a primeira data de cada ano, pulando anos se houver mais que maxTicks.
export function getYearTicks(points, maxTicks = 6) {
  const firstOfYear = []
  let currentYear = null
  for (const point of points) {
    const year = point.date.slice(0, 4)
    if (year !== currentYear) {
      firstOfYear.push(point.date)
      currentYear = year
    }
  }

  const skip = Math.ceil(firstOfYear.length / maxTicks)
  return firstOfYear.filter((_, index) => index % skip === 0)
}
