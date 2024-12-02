import { assertEquals } from "@std/assert";
import {
  checkReport,
  checkReportWithDampener,
  count,
  countWithDampener,
} from "./main.ts";

function readInput(filePath: string): number[][] {
  const input = Deno.readTextFileSync(filePath);

  return input
    .trim()
    .split("\n")
    .map((line) =>
      line
        .trim()
        .split(/\s+/)
        .map(Number)
    );
}

Deno.test("check if safe - example input", () => {
  const unusualData: number[][] = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ];

  assertEquals(checkReport(unusualData[0]), true);
  assertEquals(checkReport(unusualData[1]), false);
  assertEquals(checkReport(unusualData[2]), false);
  assertEquals(checkReport(unusualData[3]), false);
  assertEquals(checkReport(unusualData[4]), false);
  assertEquals(checkReport(unusualData[5]), true);

  assertEquals(count(unusualData), 2);
});

Deno.test("check if safe - puzzle input", () => {
  const puzzleInput = readInput("inputs.txt");
  assertEquals(count(puzzleInput), 326);
});

Deno.test("check if safe with dampener - example input", () => {
  const unusualData: number[][] = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ];

  assertEquals(checkReportWithDampener(unusualData[0]), true);
  assertEquals(checkReportWithDampener(unusualData[1]), false);
  assertEquals(checkReportWithDampener(unusualData[2]), false);
  assertEquals(checkReportWithDampener(unusualData[3]), true);
  assertEquals(checkReportWithDampener(unusualData[4]), true);
  assertEquals(checkReportWithDampener(unusualData[5]), true);

  assertEquals(countWithDampener(unusualData), 4);
});

Deno.test("check if safe with dampener - puzzle input", () => {
  const puzzleInput = readInput("inputs.txt");
  assertEquals(countWithDampener(puzzleInput), 381);
});