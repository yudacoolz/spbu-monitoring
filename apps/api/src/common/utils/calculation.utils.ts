export const multiply = (a: number, b: number): number => a * b;

export const calculateLitersSold = (
  previousTotal: number,
  currentTotal: number,
  pricePerLiter = 10000,
): number => {
  if (pricePerLiter <= 0) {
    throw new Error('pricePerLiter must be greater than 0');
  }
  return (currentTotal - previousTotal) / pricePerLiter;
};
