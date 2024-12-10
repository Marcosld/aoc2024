import { readInput, getStraightAdjacentPositions } from "./utils.mjs";

const input = readInput(import.meta);
const map = input.split("\n").map((line) => line.split(""));

const get = ([i, j]) => map[i]?.[j];

const getTrailheads = (pos, calcType, visited = new Set()) => {
  const serializedPos = JSON.stringify(pos);

  if (visited.has(serializedPos) && calcType === "count") {
    return 0;
  }
  visited.add(serializedPos);

  if (get(pos) === "9") {
    return 1;
  }

  return getStraightAdjacentPositions(pos)
    .filter((newPos) => +get(newPos) === +get(pos) + 1)
    .reduce((acc, newPos) => acc + getTrailheads(newPos, calcType, visited), 0);
};

const solve = (calcType) => {
  let acc = 0;
  for (const [i, line] of map.entries()) {
    for (const [j, tile] of line.entries()) {
      if (tile === "0") {
        acc += getTrailheads([i, j], calcType);
      }
    }
  }
  return acc;
};

console.log(solve("count"));
console.log(solve("rating"));
