import { describe, expect, it } from 'vitest'
import {
  formatAmount,
  formatConverted,
  formatDate,
  formatDayMonth,
  formatPercent,
  formatRate,
  formatRatePair,
  formatWeekday,
} from './format'

describe('formatação pt-BR', () => {
  it('formata valores com 2 casas', () => {
    expect(formatAmount(1000)).toBe('1.000,00')
    expect(formatAmount(5312.3)).toBe('5.312,30')
  })

  it('formata taxas com 4 casas', () => {
    expect(formatRate(5.3123)).toBe('5,3123')
    expect(formatRate(157.9)).toBe('157,9000')
  })

  it('mantém algarismos significativos em taxas muito pequenas', () => {
    expect(formatRate(0.00005514)).toBe('0,00005514')
  })

  it('formata o par de moedas', () => {
    expect(formatRatePair(5.3123, 'USD', 'BRL')).toBe('1 USD = 5,3123 BRL')
  })

  it('formata percentuais com sinal', () => {
    expect(formatPercent(0.16)).toBe('+0,16%')
    expect(formatPercent(-2.87)).toBe('−2,87%')
    expect(formatPercent(0)).toBe('0,00%')
    expect(formatPercent(-0.001)).toBe('0,00%')
  })

  it('formata datas', () => {
    expect(formatDate('2026-10-30')).toBe('30/10/2026')
    expect(formatDayMonth('2026-10-30')).toBe('30/10')
    expect(formatWeekday('2026-11-01')).toBe('domingo')
  })

  it('não arredonda para zero um valor convertido muito pequeno', () => {
    expect(formatConverted(0.00005514)).toBe('0,00005514')
    expect(formatConverted(12.5)).toBe('12,50')
  })
})

describe('outros idiomas', () => {
  it('usa o formato do idioma', () => {
    expect(formatAmount(1000, 'en-US')).toBe('1,000.00')
    expect(formatRate(5.3123, 'en-US')).toBe('5.3123')
    expect(formatDate('2026-10-30', 'en-US')).toBe('10/30/2026')
    expect(formatRate(5.3123, 'es-ES')).toBe('5,3123')
  })
})
