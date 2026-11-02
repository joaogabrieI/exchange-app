import { useCallback } from 'react'
import { getRate } from '../services/frankfurterApi'
import { useApiRequest } from './useApiRequest'

// Busca a taxa do par. date vazio significa a cotação mais recente.
// enabled = false evita a consulta quando o par ou a data são inválidos.
export function useExchangeRate(from, to, date, enabled) {
  const request = useCallback(
    (signal) => getRate(from, to, date, signal),
    [from, to, date],
  )

  const { status, data, error, retry } = useApiRequest(enabled ? request : null)

  return {
    status,
    rate: data?.rate ?? null,
    effectiveDate: data?.date ?? null,
    notFound: error?.status === 404,
    retry,
  }
}
