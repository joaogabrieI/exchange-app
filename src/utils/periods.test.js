import { describe, expect, it } from 'vitest'
import { PERIODS } from '../constants/periods'
import { getPeriodRange, toIsoDate } from './periods'

const TODAY = new Date(2026, 10, 2)

describe('getPeriodRange', () => {
  it.each([
    ['7D', '2026-10-26'],
    ['15D', '2026-10-18'],
    ['30D', '2026-10-03'],
    ['3M', '2026-08-02'],
    ['6M', '2026-05-02'],
    ['1A', '2025-11-02'],
    ['5A', '2021-11-02'],
    ['10A', '2016-11-02'],
  ])('%s começa em %s', (id, startDate) => {
    const period = PERIODS.find((item) => item.id === id)
    expect(getPeriodRange(period, TODAY)).toEqual({ startDate, endDate: '2026-11-02' })
  })
})

describe('toIsoDate', () => {
  it('usa a data local no formato AAAA-MM-DD', () => {
    expect(toIsoDate(TODAY)).toBe('2026-11-02')
  })
})
