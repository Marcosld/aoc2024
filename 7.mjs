import { readInput } from "./utils.mjs";

const input = readInput(import.meta);

const add = (a, b) => a + b;
const mult = (a, b) => a * b;
const concat = (a, b) => Number("" + a + b);

const canProduceDesired = (acc, desired, operands, ops) => {
  if (acc > desired || operands.length === 0) {
    return acc === desired;
  }
  return ops.some((op) =>
    canProduceDesired(op(acc, operands[0]), desired, operands.slice(1), ops),
  );
};

const solve = (ops = [add, mult]) => {
  let acc = 0;
  for (const line of input.split("\n")) {
    const desired = +line.split(": ")[0];
    const operands = line.split(": ")[1].split(" ").map(Number);
    if (canProduceDesired(operands[0], desired, operands.slice(1), ops)) {
      acc += desired;
    }
  }
  return acc;
};

const solve1 = () => solve([add, mult]);
const solve2 = () => solve([add, mult, concat]);

console.log(solve1());
console.log(solve2());
