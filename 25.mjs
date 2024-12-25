import { readInput } from "./utils.mjs";

const input = readInput(import.meta);
const data = {
  locks: [],
  keys: [],
};
const maxSize = 7;

const transpose = (grid) =>
  grid[0].split("").map((_, i) => grid.map((l) => l[i]));

const getType = (lines) => (lines[0][0] === "#" ? "locks" : "keys");

for (const grid of input.split("\n\n")) {
  const lines = transpose(grid.split("\n"));
  const keyOrLock = lines.map((l) =>
    l.reduce((acc, k) => acc + (k === "#"), 0),
  );
  data[getType(lines)].push(keyOrLock);
}

const fits = (lock, key) => lock.every((lKey, i) => lKey + key[i] <= maxSize);

const solve1 = () =>
  data.locks.reduce(
    (acc, lock) =>
      acc + data.keys.reduce((acc2, key) => acc2 + fits(lock, key), 0),
    0,
  );

console.log(solve1());
