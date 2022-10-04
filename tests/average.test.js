import { average } from '../utils/for_testing.js'

describe('average', () => {
  test('of non array argument throw error', () => {
    expect(() => average('non array')).toThrow()
    expect(() => average('non array')).toThrow(Error)
  })

  test('of a number is itself', () => {
    const result = average([1])

    expect(result).toBe(1)
  })

  test('of many is calculated right', () => {
    const result = average([1, 2, 3, 4, 5, 6])

    expect(result).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
