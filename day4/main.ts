export const countXMAS = (matrix: string[][]): number => {
  const word = "XMAS";
  let count = 0;

  const checkDirection = (
    i: number,
    j: number,
    di: number,
    dj: number,
  ): boolean => {
    for (let k = 0; k < word.length; k++) {
      const ni = i + k * di;
      const nj = j + k * dj;

      if (ni < 0 || ni >= matrix.length || nj < 0 || nj >= matrix[0].length) {
        return false;
      }

      if (matrix[ni][nj] !== word[k]) {
        return false;
      }
    }
    return true;
  };

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === "X") {
        const directions = [
          [-1, 0],
          [1, 0],
          [0, -1],
          [0, 1],
          [-1, -1],
          [1, 1],
          [-1, 1],
          [1, -1],
        ];

        for (const [di, dj] of directions) {
          if (checkDirection(i, j, di, dj)) {
            count++;
          }
        }
      }
    }
  }

  return count;
};

export const countXShapeMAS = (matrix: string[][]): number => {
  let count = 0;

  const checkX = (matrix: string[][], i: number, j: number): boolean => {
    const xString = matrix[i - 1][j - 1] + matrix[i + 1][j + 1] +
      matrix[i - 1][j + 1] + matrix[i + 1][j - 1];
    return ["MSMS", "SMSM", "SMMS", "MSSM"].includes(xString);
  };

  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix.length - 1; j++) {
      if (matrix[i][j] === "A") {
        count += checkX(matrix, i, j) ? 1 : 0;
      }
    }
  }

  return count;
};
