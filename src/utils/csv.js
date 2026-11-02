const CSV_HEADER = ['data', 'origem', 'destino', 'cotação']

// Campos com vírgula, aspas ou quebra de linha vão entre aspas, e aspas internas são duplicadas.
export function escapeCsvField(value) {
  const text = String(value)
  if (/[",\r\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

// A cotação sai como número puro, com ponto, para qualquer planilha ou programa conseguir ler.
export function buildCsv(records) {
  const rows = records.map((record) => [record.date, record.from, record.to, record.rate])
  return [CSV_HEADER, ...rows].map((row) => row.map(escapeCsvField).join(',')).join('\r\n')
}

// Usa o intervalo efetivo: a menor e a maior data entre os registros exportados.
export function buildCsvFilename(from, to, records) {
  const dates = records.map((record) => record.date).sort()
  return `hermes_${from}-${to}_${dates[0]}_${dates[dates.length - 1]}.csv`
}

// Gera o arquivo no próprio navegador e dispara o download por um link temporário.
export function downloadCsv(content, filename) {
  // O BOM (\uFEFF) faz o Excel reconhecer o UTF-8 e exibir "cotação" corretamente.
  const blob = new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
