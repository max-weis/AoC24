import { assertEquals } from "@std/assert";
import {
  findMiddlePage,
  isCorrectOrder,
  PageRule,
  parseInput,
  sumMiddlePagesOfCorrectUpdates,
  sumMiddlePagesOfReorderedUpdates,
} from "./main.ts";

Deno.test("Parse input correctly", () => {
  const exampleInput = `47|53
97|13

75,47,61,53,29`;

  const [rules, updates] = parseInput(exampleInput);
  assertEquals(rules.length, 2);
  assertEquals(rules[0], [47, 53]);
  assertEquals(rules[1], [97, 13]);
  assertEquals(updates.length, 1);
  assertEquals(updates[0], [75, 47, 61, 53, 29]);
});

Deno.test("Check if update is in correct order", () => {
  const rules: PageRule[] = [
    [47, 53],
    [97, 13],
    [97, 61],
    [97, 47],
    [75, 29],
    [61, 13],
    [75, 53],
    [29, 13],
    [97, 29],
    [53, 29],
    [61, 53],
    [97, 53],
    [61, 29],
    [47, 13],
    [75, 47],
    [97, 75],
    [47, 61],
    [75, 61],
    [47, 29],
    [75, 13],
    [53, 13],
  ];
  const correctUpdate = [75, 47, 61, 53, 29];
  const incorrectUpdate = [75, 97, 47, 61, 53];

  assertEquals(isCorrectOrder(rules, correctUpdate), true);
  assertEquals(isCorrectOrder(rules, incorrectUpdate), false);
});

Deno.test("Find middle page of updates", () => {
  assertEquals(findMiddlePage([1, 2, 3]), 2);
  assertEquals(findMiddlePage([1, 2, 3, 4]), 2);
  assertEquals(findMiddlePage([1, 2, 3, 4, 5]), 3);
});

const exampleInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

Deno.test("example inputs", () => {
  const [rules, updates] = parseInput(exampleInput);
  assertEquals(sumMiddlePagesOfCorrectUpdates(rules, updates), 143);
});

const puzzleInput = Deno.readTextFileSync("inputs.txt");

Deno.test("puzzle inputs", () => {
  const [rules, updates] = parseInput(puzzleInput);
  assertEquals(sumMiddlePagesOfCorrectUpdates(rules, updates), 5948);
});

Deno.test("example inputs sorted", () => {
  const [rules, updates] = parseInput(exampleInput);
  assertEquals(sumMiddlePagesOfReorderedUpdates(rules, updates), 123);
});

Deno.test("puzzle inputs sorted", () => {
  const [rules, updates] = parseInput(puzzleInput);
  assertEquals(sumMiddlePagesOfReorderedUpdates(rules, updates), 3062);
});
