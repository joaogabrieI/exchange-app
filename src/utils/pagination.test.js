import { describe, expect, it } from 'vitest'
import { getPageItems, getTotalPages } from './pagination'

describe('getPageItems', () => {
  it('mostra todas as páginas quando são poucas', () => {
    expect(getPageItems(1, 2)).toEqual([1, 2])
    expect(getPageItems(2, 3)).toEqual([1, 2, 3])
  })

  it('usa saltos quando são muitas', () => {
    expect(getPageItems(5, 320)).toEqual([1, null, 4, 5, 6, null, 320])
    expect(getPageItems(1, 320)).toEqual([1, 2, null, 320])
  })
})

describe('getTotalPages', () => {
  it('arredonda para cima, com no mínimo 1', () => {
    expect(getTotalPages(14, 8)).toBe(2)
    expect(getTotalPages(16, 8)).toBe(2)
    expect(getTotalPages(0, 8)).toBe(1)
  })
})
