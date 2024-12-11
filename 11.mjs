import { readInput, DefaultObj } from "./utils.mjs";

const input = readInput(import.meta);

const blink = (stones) => {
  const newStones = DefaultObj(0);

  for (const [stoneStr, qty] of Object.entries(stones)) {
    if (stoneStr === "0") {
      newStones["1"] += qty;
    } else if (stoneStr.length % 2 === 0) {
      newStones[+stoneStr.slice(0, stoneStr.length / 2)] += qty;
      newStones[+stoneStr.slice(stoneStr.length / 2)] += qty;
    } else {
      newStones[+stoneStr * 2024] += qty;
    }
  }
  return newStones;
};

const solve = (iterations) => {
  let stones = DefaultObj(0);
  for (const num of input.split(" ")) {
    stones[num]++;
  }

  for (let i = 0; i < iterations; i++) {
    stones = blink(stones);
  }

  return Object.values(stones).reduce((acc, qty) => acc + qty, 0);
};

console.log(solve(25));
console.log(solve(75));
