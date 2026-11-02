import { describe, expect, it } from 'vitest'
import { applyFilters, countActiveFilters, EMPTY_FILTERS, validateFilters } from './filters'

const RECORDS = [
  { date: '2026-10-20', rate: 5.2 },
  { date: '2026-10-21', rate: 5.3 },
  { date: '2026-10-22', rate: 5.4 },
  { date: '2026-10-23', rate: 5.5 },
]

function datesOf(values) {
  const { criteria } = validateFilters({ ...EMPTY_FILTERS, ...values })
  return applyFilters(RECORDS, criteria).map((record) => record.date.slice(-2))
}

describe('applyFilters', () => {
  it('sem filtros, devolve tudo', () => {
    expect(datesOf({})).toEqual(['20', '21', '22', '23'])
  })

  it('filtra por data inicial e por data final, incluindo os limites', () => {
    expect(datesOf({ startDate: '2026-10-22' })).toEqual(['22', '23'])
    expect(datesOf({ endDate: '2026-10-21' })).toEqual(['20', '21'])
  })

  it('filtra por cotação mínima e máxima, incluindo os limites', () => {
    expect(datesOf({ minRate: '5,4' })).toEqual(['22', '23'])
    expect(datesOf({ maxRate: '5.3' })).toEqual(['20', '21'])
  })

  it('combina filtros', () => {
    expect(
      datesOf({ startDate: '2026-10-21', endDate: '2026-10-23', minRate: '5,35', maxRate: '5,45' }),
    ).toEqual(['22'])
  })

  it('devolve lista vazia quando nada atende', () => {
    expect(datesOf({ minRate: '6', maxRate: '6,5' })).toEqual([])
  })
})

describe('validateFilters', () => {
  it('aceita filtros vazios', () => {
    expect(validateFilters(EMPTY_FILTERS).errors).toEqual({})
  })

  it('aponta data final anterior à inicial', () => {
    const values = { ...EMPTY_FILTERS, startDate: '2026-10-22', endDate: '2026-10-21' }
    expect(validateFilters(values).errors).toEqual({ endDate: 'dateOrder' })
  })

  it('aponta mínima maior que a máxima', () => {
    const values = { ...EMPTY_FILTERS, minRate: '6', maxRate: '5' }
    expect(validateFilters(values).errors).toEqual({ minRate: 'rateOrder' })
  })

  it('aponta texto que não é número', () => {
    const values = { ...EMPTY_FILTERS, minRate: 'abc', maxRate: '-1' }
    expect(validateFilters(values).errors).toEqual({ minRate: 'number', maxRate: 'number' })
  })
})

describe('countActiveFilters', () => {
  it('conta só os campos preenchidos', () => {
    expect(countActiveFilters({ ...EMPTY_FILTERS, minRate: '5', endDate: '2026-10-21' })).toBe(2)
    expect(countActiveFilters({ ...EMPTY_FILTERS, minRate: '  ' })).toBe(0)
  })
})
