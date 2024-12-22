import {
  readInput,
  getStraightAdjacentPositions,
  str,
  cache,
} from "./utils.mjs";

const input = readInput(import.meta);

const pruner = 16777216n;

const getNextSecret = (n) => {
  const a = (n ^ (n * 64n)) % pruner;
  const b = (a ^ (a / 32n)) % pruner;
  return (b ^ (b * 2048n)) % pruner;
};

const solve = () => {
  let acc = 0n;
  for (const num of input.split("\n").map(BigInt)) {
    let secret = num;
    for (let i = 0; i < 2000; i++) {
      secret = getNextSecret(secret);
    }
    acc += secret;
  }
  return acc;
};

console.log(solve());
