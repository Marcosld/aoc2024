import {
  readInput,
  getStraightAdjacentPositions,
  str,
  cache,
  DefaultObj,
} from "./utils.mjs";

const input = readInput(import.meta);

const pruner = 16777216n;

const bananaCounts = DefaultObj(0n);

const getNextSecret = (n) => {
  const a = (n ^ (n * 64n)) % pruner;
  const b = (a ^ (a / 32n)) % pruner;
  return (b ^ (b * 2048n)) % pruner;
};

const solve = () => {
  let acc = 0n;
  for (const num of input.split("\n").map(BigInt)) {
    const seenKeys = new Set();
    let varianceKey = "";
    let secret = num;
    for (let i = 0; i < 2000; i++) {
      const temp = getNextSecret(secret);
      const bananas = temp % 10n;
      const variance = bananas - (secret % 10n);
      varianceKey += variance >= 0 ? "+" + variance : variance;
      if (varianceKey.length > 8) {
        varianceKey = varianceKey.slice(2);
      }
      if (varianceKey.length === 8 && !seenKeys.has(varianceKey)) {
        bananaCounts[varianceKey] += bananas;
        seenKeys.add(varianceKey);
      }
      secret = temp;
    }
    acc += secret;
  }
  return [
    acc,
    Object.values(bananaCounts).sort((a, b) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    })[0],
  ];
};

console.time("a");
console.log(solve().join("\n"));
console.timeEnd("a");
