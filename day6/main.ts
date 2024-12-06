// First, we need to define our types and helper functions

type Map = string[][];
type Position = [number, number];

enum Direction {
  Up = 0,
  Right = 1,
  Down = 2,
  Left = 3,
}

// The main logic functions

function findStart(m: Map): Position {
  for (let r = 0; r < m.length; r++) {
    for (let c = 0; c < m[0].length; c++) {
      if (m[r][c] === "^") {
        return [r, c];
      }
    }
  }
  throw new Error("No starting position found");
}

function walk(m: Map, sr: number, sc: number): Set<string> | undefined {
  const seen = new Set<string>();
  let r = sr;
  let c = sc;
  let d = Direction.Up;

  while (true) {
    const key = `${r},${c},${d}`;
    if (seen.has(key)) {
      return undefined; // Infinite loop detected
    }
    seen.add(key);

    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    const [dr, dc] = directions[d];
    const [rr, cc] = [r + dr, c + dc];

    if (rr < 0 || rr >= m.length || cc < 0 || cc >= m[0].length) {
      return new Set(
        Array.from(seen).map((pos) => pos.split(",").slice(0, 2).join(",")),
      );
    }

    if (m[rr][cc] === "#") {
      d = (d + 1) % 4;
    } else {
      r = rr;
      c = cc;
    }
  }
}

export const predictGuardPath = (m: Map): number => {
  const [sr, sc] = findStart(m);
  const visited = walk(m, sr, sc);
  if (visited === undefined) throw new Error("Invalid map configuration");
  return visited.size;
};

export const predictGuardPathWithObstructions = (m: Map): number => {
  const visited = walk(m, ...findStart(m))!; // We assume walk returns a Set here
  let count = 0;

  for (let posStr of visited) {
    const [r, c] = posStr.split(",").map(Number);
    if (m[r][c] === "^") continue; // Skip starting position

    const saved = m[r][c];
    m[r][c] = "#"; // Temporarily place an obstruction

    // Check if this new obstruction causes an infinite loop
    if (walk(m, ...findStart(m)) === undefined) {
      count++;
    }

    m[r][c] = saved; // Restore the original map
  }

  return count;
};
