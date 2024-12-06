import { assertEquals } from "@std/assert";
import { predictGuardPath, predictGuardPathWithObstructions } from "./main.ts";

const convertToMatrix = (input: string): string[][] =>
  input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));

const exampleInput = convertToMatrix(`....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`);

Deno.test("distinct positions - example input", () => {
  assertEquals(predictGuardPath(exampleInput), 41);
});

Deno.test("distinct positions - example input", () => {
  assertEquals(predictGuardPathWithObstructions(exampleInput), 6);
});

const puzzleInput = convertToMatrix(Deno.readTextFileSync("inputs.txt"));

Deno.test("distinct positions - puzzle input", () => {
  assertEquals(predictGuardPath(puzzleInput), 4977);
});

Deno.test("distinct positions - puzzle input", () => {
  assertEquals(predictGuardPathWithObstructions(puzzleInput), 1729);
});
