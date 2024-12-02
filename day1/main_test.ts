import { totaleDistance, similarity } from './main.ts';

function readInput(filePath: string): { list1: number[]; list2: number[] } {
    const input = Deno.readTextFileSync(filePath);

    const [list1, list2] = input
        .trim()
        .split('\n')
        .map(line => line.split(/\s+/).map(x => parseInt(x)))
        .reduce(
            ([list1, list2], numbers) => {
                if (numbers.length === 2) {
                    list1.push(numbers[0]);
                    list2.push(numbers[1]);
                }
                return [list1, list2];
            },
            [[], []] as [number[], number[]]
        );

    return { list1, list2 };
}

Deno.test('calculate total distance - example input', () => {
    const list1 = [3, 4, 2, 1, 3, 3];
    const list2 = [4, 3, 5, 3, 9, 3];
    if (totaleDistance(list1, list2) !== 11) {
        throw new Error(`Expected 11, but got ${totaleDistance(list1, list2)}`);
    }
});

Deno.test('calculate total distance - puzzle input', () => {
    const { list1, list2 } = readInput('inputs.txt');
    if (totaleDistance(list1, list2) !== 1938424) {
        throw new Error(
            `Expected 1938424, but got ${totaleDistance(list1, list2)}`
        );
    }
});

Deno.test('calculate similarity - example input', () => {
    const list1 = [3, 4, 2, 1, 3, 3];
    const list2 = [4, 3, 5, 3, 9, 3];
    if (similarity(list1, list2) !== 31) {
        throw new Error(`Expected 31, but got ${similarity(list1, list2)}`);
    }
});

Deno.test('calculate similarity - puzzle input', () => {
    const { list1, list2 } = readInput('inputs.txt');
    if (similarity(list1, list2) !== 22014209) {
        throw new Error(
            `Expected 22014209, but got ${similarity(list1, list2)}`
        );
    }
});
