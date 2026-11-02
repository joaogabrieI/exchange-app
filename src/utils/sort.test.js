import { describe, expect, it } from 'vitest'
import { sortRecords, sortToValue, toggleSort, valueToSort } from './sort'

const RECORDS = [
  { date: '2026-10-21', rate: 5.5 },
  { date: '2026-10-23', rate: 5.1 },
  { date: '2026-10-22', rate: 5.3 },
]

function ratesOf(sort) {
  return sortRecords(RECORDS, sort).map((record) => record.rate)
}

describe('sortRecords', () => {
  it('ordena por data', () => {
    expect(ratesOf({ column: 'date', direction: 'desc' })).toEqual([5.1, 5.3, 5.5])
    expect(ratesOf({ column: 'date', direction: 'asc' })).toEqual([5.5, 5.3, 5.1])
  })

  it('ordena por cotação', () => {
    expect(ratesOf({ column: 'rate', direction: 'asc' })).toEqual([5.1, 5.3, 5.5])
    expect(ratesOf({ column: 'rate', direction: 'desc' })).toEqual([5.5, 5.3, 5.1])
  })

  it('não altera o array original', () => {
    const copy = [...RECORDS]
    sortRecords(RECORDS, { column: 'rate', direction: 'asc' })
    expect(RECORDS).toEqual(copy)
  })
})

describe('toggleSort', () => {
  it('inverte a direção na mesma coluna', () => {
    expect(toggleSort({ column: 'date', direction: 'desc' }, 'date')).toEqual({
      column: 'date',
      direction: 'asc',
    })
  })

  it('usa a direção inicial ao trocar de coluna', () => {
    expect(toggleSort({ column: 'date', direction: 'desc' }, 'rate')).toEqual({
      column: 'rate',
      direction: 'asc',
    })
    expect(toggleSort({ column: 'rate', direction: 'asc' }, 'date')).toEqual({
      column: 'date',
      direction: 'desc',
    })
  })
})

describe('valor do select', () => {
  it('converte nos dois sentidos', () => {
    expect(sortToValue({ column: 'rate', direction: 'asc' })).toBe('rate-asc')
    expect(valueToSort('date-desc')).toEqual({ column: 'date', direction: 'desc' })
  })
})
