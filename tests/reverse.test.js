import { reverse } from '../utils/for_testing.js'

describe("reverse", () => {
  test('of a', () => {
    const result = reverse('a')

    expect(result).toBe('a')
  })

  test('of react', () => {
    const result = reverse('react')

    expect(result).toBe('tcaer')
  })

  test('of releveler', () => {
    expect(reverse('releveler')).toBe('releveler')
  })
})
