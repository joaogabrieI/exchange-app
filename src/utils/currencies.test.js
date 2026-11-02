import { describe, expect, it } from 'vitest'
import { buildCurrencyOptions, filterCurrencies, getCurrencyName } from './currencies'

const API = {
  AUD: 'Australian Dollar',
  BRL: 'Brazilian Real',
  EUR: 'Euro',
  JPY: 'Japanese Yen',
  USD: 'United States Dollar',
}

describe('buildCurrencyOptions', () => {
  it('coloca as populares primeiro', () => {
    expect(buildCurrencyOptions(API).map((option) => option.code)).toEqual([
      'USD',
      'EUR',
      'JPY',
      'BRL',
      'AUD',
    ])
  })

  it('traduz o nome pelo idioma', () => {
    expect(getCurrencyName('USD', 'pt-BR')).toBe('Dólar americano')
    expect(getCurrencyName('USD', 'en-US')).toBe('US Dollar')
  })
})

describe('filterCurrencies', () => {
  const options = buildCurrencyOptions(API)
  const codesFor = (query) => filterCurrencies(options, query).map((option) => option.code)

  it('busca por código, sem diferenciar maiúsculas', () => {
    expect(codesFor('brl')).toEqual(['BRL'])
  })

  it('busca pelo nome traduzido, ignorando acentos', () => {
    expect(codesFor('dolar')).toEqual(['USD', 'AUD'])
  })

  it('busca pelo nome em inglês da API', () => {
    expect(codesFor('yen')).toEqual(['JPY'])
  })

  it('busca vazia devolve tudo, e busca sem resultado devolve lista vazia', () => {
    expect(codesFor('  ')).toHaveLength(5)
    expect(codesFor('zzz')).toEqual([])
  })
})
