import {
  readInput,
  getStraightAdjacentPositions,
  str,
  cache,
  DefaultObj,
} from "./utils.mjs";

const input = readInput(import.meta);

const pruner = (1 << 24) - 1; // Doing modulo X where X = 2**N is the same than doing & X - 1

const bananaCounts = new Uint32Array(19 ** 4);
const seenKeys = new Uint32Array(19 ** 4);

const getNextSecret = (n) => {
  const a = (n ^ (n << 6)) & pruner;
  const b = (a ^ (a >>> 5)) & pruner;
  return (b ^ (b << 11)) & pruner;
};

const solve = () => {
  let acc = 0;
  for (const [lineNo_, num] of input.split("\n").map(Number).entries()) {
    const lineNo = lineNo_ + 1;
    let varianceKey = 0;
    let secret = num;
    for (let i = 0; i < 2000; i++) {
      const temp = getNextSecret(secret);
      const bananas = temp % 10;
      const variance = bananas - (secret % 10);
      varianceKey = (varianceKey * 19 + variance + 9) % 19 ** 4;
      if (i >= 3 && seenKeys[varianceKey] !== lineNo) {
        bananaCounts[varianceKey] += bananas;
        seenKeys[varianceKey] = lineNo;
      }
      secret = temp;
    }
    acc += secret;
  }
  let max = 0;
  for (const v of bananaCounts) {
    if (v > max) {
      max = v;
    }
  }
  return [acc, max];
};

console.time();
console.log(solve().join("\n"));
console.timeEnd();
