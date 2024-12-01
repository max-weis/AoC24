export function totaleDistance(list1: number[], list2: number[]): number {
    if (list1.length !== list2.length) {
        return -1;
    }

    const sortedList1 = [...list1].sort((a, b) => a - b);
    const sortedList2 = [...list2].sort((a, b) => a - b);

    return sortedList1
        .reduce((totalDistance, value, index) => {
            return totalDistance + Math.abs(value - sortedList2[index]);
        }, 0);
}

export function similarity(list1: number[], list2: number[]): number {
    const frequencyMap = createFrequencyMap(list2);

    return list1.reduce((sum, num) => {
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
