import { readInput } from "./utils.mjs";

const input = readInput(import.meta);
const machines = input.split("\n\n").map((line) => {
  const lines = line.split("\n");
  return lines.map((line) => line.match(/\d+/g).map(Number));
});
const priceA = 3;
const priceB = 1;

const solve = (sumator) => {
  let acc = 0;
  const mutMachines = machines.map(([butA, butB, [goalX, goalY]]) => [
    butA,
    butB,
    [goalX + sumator, goalY + sumator],
  ]);
  for (let [[a1, a2], [b1, b2], [goal1, goal2]] of mutMachines) {
    const x = ((b2 * goal1) / b1 - goal2) / ((a1 * b2) / b1 - a2);
    const y = (goal1 - a1 * x) / b1;

    const intX = Math.round(x);
    const intY = Math.round(y);
    if (intX * a1 + intY * b1 === goal1 && intX * a2 + intY * b2 === goal2) {
      acc += intX * priceA + intY * priceB;
    }
  }
  return acc;
};

console.log(solve(0));
console.log(solve(10000000000000));
