import { describe, expect, it } from 'vitest'
import { aggregateByWeek } from './aggregate'
import { calculateStats, toRecords } from './history'

const API_RATES = {
  '2026-10-02': { BRL: 5.5 },
  '2026-10-01': { BRL: 5 },
  '2026-10-05': { BRL: 4.95 },
}

describe('toRecords', () => {
  const records = toRecords(API_RATES, 'USD', 'BRL')

  it('ordena por data e preenche o par', () => {
    expect(records.map((record) => record.date)).toEqual(['2026-10-01', '2026-10-02', '2026-10-05'])
    expect(records[0]).toMatchObject({ from: 'USD', to: 'BRL', rate: 5 })
  })

  it('calcula a variação diária entre registros consecutivos', () => {
    expect(records[0].dailyChange).toBeNull()
    expect(records[1].dailyChange).toBeCloseTo(10, 6)
    expect(records[2].dailyChange).toBeCloseTo(-10, 6)
  })
})

describe('calculateStats', () => {
  it('calcula última, variação, máxima e mínima', () => {
    const stats = calculateStats(toRecords(API_RATES, 'USD', 'BRL'))
    expect(stats.last).toBe(4.95)
    expect(stats.change).toBeCloseTo(-1, 6)
    expect(stats.max).toBe(5.5)
    expect(stats.min).toBe(4.95)
  })

  it('sem registros, devolve null', () => {
    expect(calculateStats([])).toBeNull()
  })
})

describe('aggregateByWeek', () => {
  it('mantém o último registro de cada semana (segunda a domingo)', () => {
    const records = [
      { date: '2026-10-05', rate: 1 },
      { date: '2026-10-09', rate: 2 },
      { date: '2026-10-12', rate: 3 },
      { date: '2026-10-13', rate: 4 },
    ]
    expect(aggregateByWeek(records).map((record) => record.date)).toEqual([
      '2026-10-09',
      '2026-10-13',
    ])
  })

  it('sem registros, devolve lista vazia', () => {
    expect(aggregateByWeek([])).toEqual([])
  })
})
