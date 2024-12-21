import { readInput, getStraightAdjacentPositions, str } from "./utils.mjs";

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

const getNumericPadPath = (fKey, tKey) => {
  if (fKey === tKey) {
    return [""];
  }

  const fKeyPos = getKeyPos(numericPad, fKey);

  const positions = [[fKeyPos, ""]];
  const visited = new Set([str(fKeyPos)]);
  const candidates = [];

  while (positions.length) {
    const [pos, path] = positions.shift();
    visited.add(str(pos));

    if (numericPad[pos[0]][pos[1]] === tKey) {
      candidates.push(path);
      continue;
    }

    if (candidates.length) {
      continue;
    }

    for (const [l, [i, j]] of getStraightAdjacentPositions(pos).entries()) {
      const nextKey = numericPad[i]?.[j];

      if (nextKey !== undefined && !visited.has(str([i, j]))) {
        positions.push([[i, j], path + DIRS[l]]);
      }
    }
  }
  return candidates;
};

const getDirectionalPadPath = (fKey, tKey) => {
  if (fKey === tKey) {
    return [""];
  }

  const fKeyPos = getKeyPos(directionalPad, fKey);

  const positions = [[fKeyPos, ""]];
  const visited = new Set([str(fKeyPos)]);
  const candidates = [];

  while (positions.length) {
    const [pos, path] = positions.shift();
    visited.add(str(pos));

    if (directionalPad[pos[0]][pos[1]] === tKey) {
      candidates.push(path);
      continue;
    }

    if (candidates.length) {
      continue;
    }

    for (const [l, [i, j]] of getStraightAdjacentPositions(pos).entries()) {
      const nextKey = directionalPad[i]?.[j];

      if (nextKey !== undefined && !visited.has(str([i, j]))) {
        positions.push([[i, j], path + DIRS[l]]);
      }
    }
  }
  return candidates;
};

const solve = (line, solver) => {
  let solutions = ["A"];
  for (let i = 0; i < line.length - 1; i++) {
    const paths = solver(line[i], line[i + 1]);
    solutions = solutions.flatMap((solution) =>
      paths.map((path) => solution + path + "A"),
    );
  }
  return solutions;
};

const solve1 = () => {
  let acc = 0;
  for (const readLine of input.split("\n")) {
    const numericPadSolutions = solve(`A${readLine}`, getNumericPadPath);
    const directionalPadSolutions1 = numericPadSolutions.flatMap((line) =>
      solve(line, getDirectionalPadPath),
    );
    const directionalPadSolutions2 = directionalPadSolutions1.flatMap((line) =>
      solve(line, getDirectionalPadPath),
    );
    const bestPath = directionalPadSolutions2.sort(
      (a, b) => a.length - b.length,
    )[0];
    console.log(bestPath.length);
    acc += (bestPath.length - 1) * +readLine.slice(0, -1);
  }
  return acc;
};

console.log(solve1());

// BAd: 244490
