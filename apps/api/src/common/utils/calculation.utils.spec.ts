import { calculateLitersSold, multiply } from './calculation.utils';

describe('multiply', () => {
  it('returns 20 when given 4 and 5', () => {
    expect(multiply(4, 5)).toBe(20);
  });

  it('returns 0 when one value is 0', () => {
    expect(multiply(4, 0)).toBe(0);
  });
});

describe('calculateLitersSold', () => {
  it('returns 3 liters when total goes from 20.000 to 50.000', () => {
    expect(calculateLitersSold(20000, 50000)).toBe(3);
  });

  it('returns a decimal value for partial liters', () => {
    // 20.000 -> 35.500 = 15.500 / 10.000 = 1.55 liters
    expect(calculateLitersSold(20000, 35500)).toBeCloseTo(1.55);
  });

  it('returns 0 when total does not change', () => {
    expect(calculateLitersSold(20000, 20000)).toBe(0);
  });

  it('throws when price per liter is 0', () => {
    expect(() => calculateLitersSold(0, 10000, 0)).toThrow();
  });
});
