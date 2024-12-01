import { totaleDistance, similarity } from '../src/index';
import { describe, test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';

describe('calculate total distance', () => {
  test('example input', () => {
    let list1: number[] = [3, 4, 2, 1, 3, 3]
    let list2: number[] = [4, 3, 5, 3, 9, 3]

    expect(totaleDistance(list1, list2)).toBe(11);
  });

  test('puzzle input', () => {
    let { list1, list2 } = readInput('inputs.txt');
    expect(totaleDistance(list1, list2)).toBe(1938424);
  });
});

describe('calculate similarity', () => {
  test('example input', () => {
    let list1: number[] = [3, 4, 2, 1, 3, 3]
    let list2: number[] = [4, 3, 5, 3, 9, 3]

    expect(similarity(list1, list2)).toBe(31);
  });

  test('puzzle input', () => {
    let { list1, list2 } = readInput('inputs.txt');
    expect(similarity(list1, list2)).toBe(22014209);
  });
});

function readInput(filePath: string): { list1: number[], list2: number[] } {
  const absolutePath = path.resolve(__dirname, filePath);
  const input = fs.readFileSync(absolutePath, 'utf-8');

  const [list1, list2] = input
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
      [[], []]
    );

  return { list1, list2 };
}
