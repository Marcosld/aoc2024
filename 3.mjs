import { readInput } from "./utils.mjs";

const input = readInput(import.meta);

const solve1 = () => {
  const mults = input.matchAll(/mul\((\d+),(\d+)\)/g);
  return [...mults].reduce((acc, [, n1, n2]) => acc + +n1 * +n2, 0);
};

const solve2 = () => {
  const instructions = input.matchAll(/mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g);
  let acc = 0;
  let enabled = true;
  for (const [op, n1, n2] of instructions) {
    if (op[0] === "d") {
      enabled = op === "do()";
    } else if (enabled) {
      acc += +n1 * +n2;
    }
  }
  return acc;
};

console.log(solve1());
console.log(solve2());
