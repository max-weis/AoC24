export const sumMul = (memory: string): number => {
  return parseMul(memory).reduce((acc, [num1, num2]) => acc + num1 * num2, 0);
};

export const parseMul = (memory: string): [number, number][] => {
  const regex = /mul\(([1-9][0-9]{0,2}),([1-9][0-9]{0,2})\)/g;

  return Array.from(memory.matchAll(regex), (match) => [
    parseInt(match[1], 10),
    parseInt(match[2], 10),
  ]);
};


export const sumMulEnabled = (memory: string): number => {
  let mulEnabled = true;
  const results: number[] = [];

  const matches = Array.from(memory.matchAll(/mul\(([1-9][0-9]{0,2}),([1-9][0-9]{0,2})\)|do\(\)|don't\(\)/g));

  for (const match of matches) {
    if (match[0] === 'do()') {
      mulEnabled = true;
    } else if (match[0] === 'don\'t()') {
      mulEnabled = false;
    } else if (match[0].startsWith('mul(')) {
      if (mulEnabled) {
        const num1 = parseInt(match[1], 10);
        const num2 = parseInt(match[2], 10);
        results.push(num1 * num2);
      }
    }
  }

  return results.reduce((acc, val) => acc + val, 0);
};

export const parseMulEnabled = (memory: string): [number, number][] => {
  let mulEnabled = true;
  const results: [number, number][] = [];

  const matches = Array.from(memory.matchAll(/mul\(([1-9][0-9]{0,2}),([1-9][0-9]{0,2})\)|do\(\)|don't\(\)/g));

  for (const match of matches) {
    if (match[0] === 'do()') {
      mulEnabled = true;
    } else if (match[0] === 'don\'t()') {
      mulEnabled = false;
    } else if (match[0].startsWith('mul(')) {
      if (mulEnabled) {
        const num1 = parseInt(match[1], 10);
        const num2 = parseInt(match[2], 10);
        results.push([num1, num2]);
      }
    }
  }

  return results;
};