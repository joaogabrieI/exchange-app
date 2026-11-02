import { useCallback, useMemo } from 'react'
import { getHistory } from '../services/frankfurterApi'
import { aggregateByWeek } from '../utils/aggregate'
import { calculateStats, toRecords } from '../utils/history'
import { getPeriodRange } from '../utils/periods'
import { useApiRequest } from './useApiRequest'

// Busca o histórico do par e calcula o que gráfico, estatísticas e tabela precisam.
export function useHistory(from, to, period) {
  const { startDate, endDate } = getPeriodRange(period)

  const request = useCallback(
    (signal) => getHistory(from, to, startDate, endDate, signal),
    [from, to, startDate, endDate],
  )

  const { status, data, retry } = useApiRequest(from === to ? null : request)

  const records = useMemo(() => (data ? toRecords(data, from, to) : []), [data, from, to])
  const stats = useMemo(() => calculateStats(records), [records])
  const points = useMemo(
    () => (period.weekly ? aggregateByWeek(records) : records),
    [records, period.weekly],
  )

  return { status, records, stats, points, startDate, endDate, retry }
}
