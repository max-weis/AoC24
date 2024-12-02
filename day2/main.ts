export const count = (data: number[][]): number =>
  data.reduce((counter, row) => checkReport(row) ? counter + 1 : counter, 0);

export const checkReport = (data: number[]): boolean => {
  return data.reduce<{ valid: boolean; trend: boolean | null }>(
    (acc, curr, index, arr) => {
      // Skip the first element
      if (index === 0) return acc;

      const diff = curr - arr[index - 1];
      const isValidDiff = Math.abs(diff) >= 1 && Math.abs(diff) <= 3;

      return {
        valid: acc.valid && isValidDiff && (
          acc.trend === null ||
          (acc.trend ? diff > 0 : diff < 0)
        ),
        trend: acc.trend === null ? diff > 0 : acc.trend,
      };
    },
    { valid: true, trend: null }, // Initial value for accumulator
  ).valid;
};

export const countWithDampener = (data: number[][]): number =>
  data.reduce(
    (counter, row) => checkReportWithDampener(row) ? counter + 1 : counter,
    0,
  );

export const checkReportWithDampener = (data: number[]): boolean => {
  if (checkReport(data)) return true;

  // Helper function to check if the report is valid after removing one element
  const isValidAfterRemoval = (i: number) =>
    checkReport([...data.slice(0, i), ...data.slice(i + 1)]);

  // Check if removing any element makes the report valid
  return Array.from({ length: data.length }, (_, i) => i).some(
    isValidAfterRemoval,
  );
};
