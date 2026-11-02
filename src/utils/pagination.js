// Monta a lista de botões de página. null representa um salto ("…").
// Exemplo: página 5 de 320 → [1, null, 4, 5, 6, null, 320]
export function getPageItems(page, totalPages) {
  const items = []
  let previous = 0

  for (let current = 1; current <= totalPages; current += 1) {
    const isEdge = current === 1 || current === totalPages
    const isNear = Math.abs(current - page) <= 1

    if (isEdge || isNear) {
      if (current - previous > 1) items.push(null)
      items.push(current)
      previous = current
    }
  }
  return items
}

export function getTotalPages(totalItems, pageSize) {
  return Math.max(1, Math.ceil(totalItems / pageSize))
}
