export function totaleDistance(left: number[], right: number[]): number {
  const sortedList1 = [...left].sort((a, b) => a - b);
  const sortedList2 = [...right].sort((a, b) => a - b);

  return sortedList1
      .reduce((totalDistance, value, index) => {
          return totalDistance + Math.abs(value - sortedList2[index]);
      }, 0);
}

export function similarity(left: number[], right: number[]): number {
  const frequencyMap = createFrequencyMap(right);

  return left.reduce((sum, num) => {
      const frequency = frequencyMap.get(num) || 0;
      return sum + num * frequency;
  }, 0);
}

export function createFrequencyMap(numbers: number[]): Map<number, number> {
  return numbers.reduce((map, num) => {
      map.set(num, (map.get(num) || 0) + 1);
      return map;
  }, new Map<number, number>());
}
