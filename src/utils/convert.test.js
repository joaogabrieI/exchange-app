import { describe, expect, it } from 'vitest'
import { convertAmount, inverseRate, isValidAmount, parseNumber } from './convert'

describe('parseNumber', () => {
  it.each([
    ['1000', 1000],
    ['1.000,50', 1000.5],
    ['1,000.50', 1000.5],
    ['1,5', 1.5],
    ['1.5', 1.5],
    ['1.000', 1000],
    ['1,000', 1],
    ['1.000.000', 1000000],
    [' 25 ', 25],
    ['0', 0],
  ])('em português, "%s" vira %d', (text, expected) => {
    expect(parseNumber(text)).toBe(expected)
  })

  it('em inglês, a vírgula sozinha com 3 dígitos é milhar', () => {
    expect(parseNumber('1,000', ',')).toBe(1000)
    expect(parseNumber('1.000', ',')).toBe(1)
  })

  it.each(['', 'abc', '-50', '12a', '1,', '1.5.0', '1,2,3', ',5'])('"%s" é inválido', (text) => {
    expect(parseNumber(text)).toBeNull()
  })
})

describe('isValidAmount', () => {
  it('aceita só números maiores que zero', () => {
    expect(isValidAmount(10)).toBe(true)
    expect(isValidAmount(0.01)).toBe(true)
    expect(isValidAmount(0)).toBe(false)
    expect(isValidAmount(null)).toBe(false)
  })
})

describe('conversão', () => {
  it('multiplica o valor pela taxa', () => {
    expect(convertAmount(1000, 5.3123)).toBeCloseTo(5312.3, 6)
  })

  it('calcula a taxa inversa', () => {
    expect(inverseRate(5.3123)).toBeCloseTo(0.18824, 4)
  })
})
