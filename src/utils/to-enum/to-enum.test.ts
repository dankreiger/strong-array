// toEnum.spec.ts
import { describe, expect, it } from 'bun:test'
import { toEnum } from './to-enum'

/**
 * Example tests for the `toEnum` function.
 */
describe('toEnum', () => {
  it('returns an empty object for an empty array', () => {
    const emptyArr = [] as const
    const result = toEnum(emptyArr)

    // Expect the returned object to have no own properties
    expect(Object.keys(result)).toHaveLength(0)
    // Also can verify it's an object
    expect(result).toEqual({})
  })

  it('maps a string array to an object with the same string keys and values', () => {
    const stringArr = ['FOO', 'BAR'] as const
    const enumObj = toEnum(stringArr)

    // Should have keys "FOO" and "BAR"
    expect(Object.keys(enumObj)).toEqual(['FOO', 'BAR'])

    // Values should match the keys
    expect(enumObj.FOO).toBe('FOO')
    expect(enumObj.BAR).toBe('BAR')
  })

  it('maps a number array to an object with the same numeric keys and values', () => {
    const numArr = [1, 2, 10, 42] as const
    const enumObj = toEnum(numArr)

    // Check property existence
    expect(enumObj[1]).toBe(1)
    expect(enumObj[2]).toBe(2)
    expect(enumObj[10]).toBe(10)
    expect(enumObj[42]).toBe(42)

    // Confirm only these four keys
    expect(Object.keys(enumObj)).toEqual(['1', '2', '10', '42'])
  })

  it('maps a symbol array to an object with the same symbol keys and values', () => {
    const A = Symbol('A')
    const B = Symbol('B')
    const C = Symbol('C')
    const symbolArr = [A, B, C] as const
    const enumObj = toEnum(symbolArr)

    expect(enumObj).toEqual({
      [A]: A,
      [B]: B,
      [C]: C,
    })

    // The property keys won't show up in Object.keys since they're symbols
    // but we can check them individually
    expect(enumObj[A]).toBe(A)
    expect(enumObj[B]).toBe(B)
    expect(enumObj[C]).toBe(C)

    // `Object.getOwnPropertySymbols` should return [A, B, C]
    const keys = Object.getOwnPropertySymbols(enumObj)
    expect(keys).toContain(A)
    expect(keys).toContain(B)
    expect(keys).toContain(C)
    expect(keys).toHaveLength(3)
  })

  it('maps a mixed array to an object with the same keys and values', () => {
    const BAR = Symbol('BAR')

    const mixedArr = ['FOO', 42, BAR, 100, 2, 'DOG', 5, -1] as const
    const enumObj = toEnum(mixedArr)

    expect(enumObj).toEqual({
      FOO: 'FOO',
      42: 42,
      [BAR]: BAR,
      100: 100,
      2: 2,
      DOG: 'DOG',
      5: 5,
      '-1': -1,
    })

    // Check property existence
    expect(enumObj.FOO).toBe('FOO')
    expect(enumObj[42]).toBe(42)
    expect(enumObj[mixedArr[2]]).toBe(mixedArr[2])

    // Confirm keys
    expect(Object.keys(enumObj)).toEqual([
      '2',
      '5',
      '42',
      '100',
      'FOO',
      'DOG',
      '-1',
    ])
    expect(Object.getOwnPropertySymbols(enumObj)).toContain(mixedArr[2])
  })
})
