export const DEFAULT_SORT = { column: 'date', direction: 'desc' }

// Devolve uma cópia ordenada: o array original (o histórico) não é alterado.
export function sortRecords(records, { column, direction }) {
  const factor = direction === 'asc' ? 1 : -1

  return [...records].sort((a, b) => {
    if (column === 'date') return a.date.localeCompare(b.date) * factor
    return (a.rate - b.rate) * factor
  })
}

// Clicar na coluna atual inverte a direção. Ao trocar de coluna, data começa pelas mais
// recentes e cotação pela menor.
export function toggleSort(current, column) {
  if (current.column === column) {
    return { column, direction: current.direction === 'asc' ? 'desc' : 'asc' }
  }
  return { column, direction: column === 'date' ? 'desc' : 'asc' }
}

// Usado no select do mobile, cujas opções são textos como "rate-asc".
export function sortToValue({ column, direction }) {
  return `${column}-${direction}`
}

export function valueToSort(value) {
  const [column, direction] = value.split('-')
  return { column, direction }
}
