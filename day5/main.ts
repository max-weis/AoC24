export type PageRule = [number, number];
export type Update = number[];

export const parseInput = (input: string): [PageRule[], Update[]] => {
  const [rulesPart, updatesPart] = input.split("\n\n").map((part) =>
    part.split("\n")
  );

  const rules = rulesPart.map((rule) => {
    const [before, after] = rule.split("|").map(Number);
    return [before, after] as PageRule;
  });

  const updates = updatesPart.map((line) => line.split(",").map(Number));

  return [rules, updates];
};

export const isCorrectOrder = (rules: PageRule[], update: Update): boolean => {
  for (let i = 0; i < update.length - 1; i++) {
    for (let j = i + 1; j < update.length; j++) {
      if (
        // This checks if Y comes before X
        rules.some(([before, after]) =>
          before === update[j] && after === update[i]
        )
      ) {
        return false;
      }
    }
  }
  return true;
};

export const findMiddlePage = (update: Update): number => {
  const middleIndex = Math.floor((update.length - 1) / 2);
  return update[middleIndex];
};

export const sumMiddlePagesOfCorrectUpdates = (
  rules: PageRule[],
  updates: Update[],
): number => {
  return updates
    .filter((update) => isCorrectOrder(rules, update))
    .reduce((sum, update) => sum + findMiddlePage(update), 0);
};

export const sortUpdate = (rules: PageRule[], update: Update): Update => {
  const graph = new Map<number, number[]>();
  for (const [before, after] of rules) {
    if (!graph.has(before)) graph.set(before, []);
    if (!graph.has(after)) graph.set(after, []);
    graph.get(before)?.push(after);
  }

  const visited = new Set<number>();
  const stack: number[] = [];
  const remainingPages = new Set(update); // Set of pages to ensure all are included

  function visit(node: number) {
    if (visited.has(node)) return;
    visited.add(node);
    remainingPages.delete(node); // Remove from remaining pages
    for (const neighbor of (graph.get(node) || [])) {
      if (update.includes(neighbor)) { // Only visit if it's in the current update
        visit(neighbor);
      }
    }
    stack.push(node);
  }

  // Visit all pages that are part of the rules first
  update.forEach((page) => {
    if (graph.has(page)) visit(page);
  });

  // Any remaining pages that weren't part of the rules are added in order
  for (const page of update) {
    if (remainingPages.has(page)) {
      stack.push(page);
    }
  }

  return stack.reverse();
};

export const sumMiddlePagesOfReorderedUpdates = (
  rules: PageRule[],
  updates: Update[],
): number => {
  return updates
    .filter((update) => !isCorrectOrder(rules, update)) // Incorrect order
    .map((update) => sortUpdate(rules, update)) // Reorder them
    .reduce((sum, update) => sum + findMiddlePage(update), 0);
};
