import { describe, expect, it } from 'vitest'
import { getDateTicks, getYearTicks, getYTicks } from './chartAxis'

describe('getYTicks', () => {
  it('gera marcas redondas que cobrem os dados', () => {
    expect(getYTicks(5.2871, 5.4693, 6)).toEqual({
      ticks: [5.25, 5.3, 5.35, 5.4, 5.45, 5.5],
      decimals: 2,
    })
  })

  it('funciona com valores iguais', () => {
    const { ticks } = getYTicks(5, 5, 6)
    expect(ticks[0]).toBeLessThanOrEqual(5)
    expect(ticks[ticks.length - 1]).toBeGreaterThanOrEqual(5)
    expect(ticks.length).toBeGreaterThan(0)
  })
})

describe('marcas do eixo X', () => {
  const points = (dates) => dates.map((date) => ({ date }))

  it('inclui a primeira e a última data', () => {
    const dates = ['01', '02', '03', '04', '05', '06', '07', '08', '09']
    expect(getDateTicks(points(dates), 3)).toEqual(['01', '05', '09'])
  })

  it('com poucos pontos, usa todos', () => {
    expect(getDateTicks(points(['a', 'b']), 5)).toEqual(['a', 'b'])
  })

  it('usa a primeira data de cada ano', () => {
    const dates = ['2024-11-01', '2024-12-01', '2025-01-03', '2025-02-01', '2026-01-02']
    expect(getYearTicks(points(dates))).toEqual(['2024-11-01', '2025-01-03', '2026-01-02'])
  })

  it('pula anos quando há anos demais', () => {
    const dates = Array.from({ length: 11 }, (_, index) => `${2016 + index}-01-01`)
    expect(getYearTicks(points(dates), 6)).toEqual([
      '2016-01-01',
      '2018-01-01',
      '2020-01-01',
      '2022-01-01',
      '2024-01-01',
      '2026-01-01',
    ])
  })
})
