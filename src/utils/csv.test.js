import { describe, expect, it } from 'vitest'
import { buildCsv, buildCsvFilename, escapeCsvField } from './csv'

const RECORDS = [
  { date: '2026-10-30', from: 'USD', to: 'BRL', rate: 5.3123, dailyChange: 0.16 },
  { date: '2026-10-01', from: 'USD', to: 'BRL', rate: 5.1885, dailyChange: null },
]

describe('escapeCsvField', () => {
  it('deixa textos simples como estão', () => {
    expect(escapeCsvField('USD')).toBe('USD')
    expect(escapeCsvField(5.3123)).toBe('5.3123')
  })

  it('coloca entre aspas o texto com separador ou quebra de linha', () => {
    expect(escapeCsvField('a,b')).toBe('"a,b"')
    expect(escapeCsvField('a\nb')).toBe('"a\nb"')
  })

  it('duplica aspas internas', () => {
    expect(escapeCsvField('a"b')).toBe('"a""b"')
  })
})

describe('buildCsv', () => {
  it('gera cabeçalho e uma linha por registro', () => {
    expect(buildCsv(RECORDS)).toBe(
      'data,origem,destino,cotação\r\n2026-10-30,USD,BRL,5.3123\r\n2026-10-01,USD,BRL,5.1885',
    )
  })

  it('sem registros, tem apenas o cabeçalho', () => {
    expect(buildCsv([])).toBe('data,origem,destino,cotação')
  })
})

describe('buildCsvFilename', () => {
  it('usa o par e o intervalo efetivo, em qualquer ordem de registros', () => {
    expect(buildCsvFilename('USD', 'BRL', RECORDS)).toBe('hermes_USD-BRL_2026-10-01_2026-10-30.csv')
  })
})
