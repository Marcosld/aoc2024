import { readInput } from "./utils.mjs";

const input = readInput(import.meta);

const isValidArr = (arr) => {
  const diffs = arr.slice(1).map((x, i) => x - arr[i]);
  return (
    diffs.every((diff) => diff >= 1 && diff <= 3) ||
    diffs.every((diff) => diff <= -1 && diff >= -3)
  );
};

const getSub1Arrs = (arr) =>
  arr.map((_, i) => [...arr.slice(0, i), ...arr.slice(i + 1)]);

const checkArray = (arr) => getSub1Arrs(arr).some(isValidArr);

const solve = (validityFn) => {
  const numArrays = input
    .split("\n")
    .map((line) => line.split(" ").map(Number));

  return numArrays.reduce((acc, arr) => (validityFn(arr) ? acc + 1 : acc), 0);
};

console.log(solve(isValidArr));
console.log(solve(checkArray));
