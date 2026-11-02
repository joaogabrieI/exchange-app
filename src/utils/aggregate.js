import { parseISO, startOfISOWeek } from 'date-fns'

// A API devolve dados diários mesmo em 5 e 10 anos (ver docs/API_TESTS.md).
// Para o gráfico continuar legível, mantemos só o último registro de cada semana.
export function aggregateByWeek(records) {
  const lastOfWeek = new Map()

  for (const record of records) {
    const week = startOfISOWeek(parseISO(record.date)).getTime()
    lastOfWeek.set(week, record)
  }

  return [...lastOfWeek.values()]
}
