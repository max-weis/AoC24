import { assertEquals } from "@std/assert";
import { countXMAS, countXShapeMAS } from "./main.ts";

const convertToMatrix = (input: string): string[][] =>
  input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));

const puzzleInput = convertToMatrix(Deno.readTextFileSync("inputs.txt"));

Deno.test("xmas - example input", () => {
  const exampleInput = convertToMatrix(`MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`);

  assertEquals(countXMAS(exampleInput), 18);
});

Deno.test("xmas - puzzle input", () => {
  assertEquals(countXMAS(puzzleInput), 2603);
});

Deno.test("x-mas - simple input", () => {
  const exampleInput = convertToMatrix(`M.S
.A.
M.S`);

  assertEquals(countXShapeMAS(exampleInput), 1);
});

Deno.test("x-mas - example input", () => {
  const exampleInput = convertToMatrix(`.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........`);

  assertEquals(countXShapeMAS(exampleInput), 9);
});

Deno.test("x-mas - puzzle input", () => {
  assertEquals(countXShapeMAS(puzzleInput), 1965);
});
