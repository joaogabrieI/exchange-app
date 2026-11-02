import { describe, expect, it } from 'vitest'
import { texts } from './texts'

function keysOf(object, prefix = '') {
  return Object.entries(object).flatMap(([key, value]) =>
    typeof value === 'object' ? keysOf(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  )
}

describe('textos', () => {
  it('os três idiomas têm exatamente as mesmas chaves', () => {
    const portuguese = keysOf(texts.pt).sort()
    expect(keysOf(texts.en).sort()).toEqual(portuguese)
    expect(keysOf(texts.es).sort()).toEqual(portuguese)
  })
})
