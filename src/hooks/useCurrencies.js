import { useMemo } from 'react'
import { getCurrencies } from '../services/frankfurterApi'
import { buildCurrencyOptions } from '../utils/currencies'
import { useApiRequest } from './useApiRequest'

export function useCurrencies(locale) {
  const { status, data, retry } = useApiRequest(getCurrencies)

  const options = useMemo(() => buildCurrencyOptions(data ?? {}, locale), [data, locale])

  return { options, status, retry }
}
