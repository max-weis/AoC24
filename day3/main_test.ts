import { assertEquals } from "@std/assert";
import { parseMul, parseMulEnabled, sumMul, sumMulEnabled } from "./main.ts";

const corruptedMemory: string =
  "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";

const puzzleInput = Deno.readTextFileSync("inputs.txt");

Deno.test("sumMul - example input", () => {
  assertEquals(parseMul(corruptedMemory)[0], [2, 4]);
  assertEquals(parseMul(corruptedMemory)[1], [5, 5]);
  assertEquals(parseMul(corruptedMemory)[2], [11, 8]);
  assertEquals(parseMul(corruptedMemory)[3], [8, 5]);

  assertEquals(sumMul(corruptedMemory), 161);
});

Deno.test("sumMul - puzzle input", () => {
  assertEquals(sumMul(puzzleInput), 165225049);
});

Deno.test("sumMulEnabled - example input", () => {
  assertEquals(parseMulEnabled(corruptedMemory)[0], [2, 4]);
  assertEquals(parseMulEnabled(corruptedMemory)[3], [8, 5]);

  assertEquals(sumMul(corruptedMemory), 161);
});

Deno.test("sumMul - puzzle input", () => {
  assertEquals(sumMulEnabled(puzzleInput), 165225049);
});
