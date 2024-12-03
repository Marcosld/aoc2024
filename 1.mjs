import { readInput, DefaultObj } from "./utils.mjs";

const input = readInput(import.meta);

const getSortedLists = () => {
  const digits = input.split("\n").map((line) => line.split(/\s+/).map(Number));
  const l1 = digits.map((d) => d[0]).sort();
  const l2 = digits.map((d) => d[1]).sort();

  return [l1, l2];
};

const solve1 = () => {
  const [l1, l2] = getSortedLists();

  return l1.reduce((acc, n1, i) => acc + Math.abs(n1 - l2[i]), 0);
};

const solve2 = () => {
  const [l1, l2] = getSortedLists();

  const qttys = l1.reduce((qttys, n) => {
    qttys[n]++;
    return qttys;
  }, DefaultObj(0));

  return l2.reduce((acc, n) => acc + n * qttys[n], 0);
};

console.log(solve1());
console.log(solve2());
