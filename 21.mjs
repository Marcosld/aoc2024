import {
  readInput,
  getStraightAdjacentPositions,
  str,
  cache,
} from "./utils.mjs";

const input = readInput(import.meta);

const DIRS = ">v<^";

const numericPad = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  [undefined, "0", "A"],
];

const directionalPad = [
  [undefined, "^", "A"],
  ["<", "v", ">"],
];

const getKeyPos = (pad, key) => {
  for (const [i, arr] of pad.entries()) {
    for (const [j, k] of arr.entries()) {
      if (k === key) {
        return [i, j];
      }
    }
  }
};

const getPaths = (fKey = "A", tKey, pad) => {
  const fKeyPos = getKeyPos(pad, fKey);

  const positions = [[fKeyPos, ""]];
  const visited = new Set([str(fKeyPos)]);
  const candidates = [];

  while (positions.length) {
    const [[i, j], path] = positions.shift();
    visited.add(str([i, j]));

    if (pad[i][j] === tKey) {
      candidates.push(path + "A");
      continue;
    }

    if (candidates.length) {
      break;
    }

    const iterator = getStraightAdjacentPositions([i, j]).entries();
    for (const [l, [nI, nJ]] of iterator) {
      if (pad[nI]?.[nJ] !== undefined && !visited.has(str([nI, nJ]))) {
        positions.push([[nI, nJ], path + DIRS[l]]);
      }
    }
  }
  return candidates;
};

const solveLine = cache((line, directionalIterations, iteration = 0) => {
  let acc = 0;
  for (let i = 0; i < line.length; i++) {
    const pad = iteration === 0 ? numericPad : directionalPad;
    const possiblePaths = getPaths(line[i - 1], line[i], pad);

    acc += Math.min(
      ...possiblePaths.map((path) =>
        iteration === directionalIterations
          ? path.length
          : solveLine(path, directionalIterations, iteration + 1),
      ),
    );
  }
  return acc;
});

const solve = (iterations) => {
  let acc = 0;
  for (const readLine of input.split("\n")) {
    const solution = solveLine(readLine, iterations);
    acc += solution * +readLine.slice(0, -1);
  }
  return acc;
};

console.log(solve(2));
console.log(solve(25));
