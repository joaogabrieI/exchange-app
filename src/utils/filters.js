import { parseNumber } from './convert'

export const EMPTY_FILTERS = { startDate: '', endDate: '', minRate: '', maxRate: '' }

// Valida o que está digitado nos filtros. Devolve:
// - errors: campo → código do erro ('dateOrder', 'rateOrder' ou 'number');
// - criteria: os valores já interpretados, usados por applyFilters.
export function validateFilters(values, thousandsSeparator = '.') {
  const errors = {}

  const minRate = values.minRate.trim() === '' ? null : parseNumber(values.minRate, thousandsSeparator)
  const maxRate = values.maxRate.trim() === '' ? null : parseNumber(values.maxRate, thousandsSeparator)

  if (values.minRate.trim() !== '' && minRate === null) errors.minRate = 'number'
  if (values.maxRate.trim() !== '' && maxRate === null) errors.maxRate = 'number'
  if (minRate !== null && maxRate !== null && minRate > maxRate) errors.minRate = 'rateOrder'

  if (values.startDate && values.endDate && values.endDate < values.startDate) {
    errors.endDate = 'dateOrder'
  }

  return {
    errors,
    criteria: { startDate: values.startDate, endDate: values.endDate, minRate, maxRate },
  }
}

// Um registro precisa passar em todos os filtros preenchidos. Por isso eles se combinam.
// As datas estão em AAAA-MM-DD, formato em que a comparação de texto segue a ordem cronológica.
export function applyFilters(records, criteria) {
  return records.filter((record) => {
    if (criteria.startDate && record.date < criteria.startDate) return false
    if (criteria.endDate && record.date > criteria.endDate) return false
    if (criteria.minRate !== null && record.rate < criteria.minRate) return false
    if (criteria.maxRate !== null && record.rate > criteria.maxRate) return false
    return true
  })
}

export function countActiveFilters(values) {
  return Object.values(values).filter((value) => value.trim() !== '').length
}
