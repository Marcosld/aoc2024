import { readInput, range } from "./utils.mjs";

const input = readInput(import.meta);

const matrix = input.split("\n").map((line) => line.split(""));

const get = ([i, j]) => matrix[i]?.[j];

const dirs = [-1, 0, 1];

const countXmas = ([i, j]) => {
  let acc = 0;
  for (const di of dirs) {
    for (const dj of dirs) {
      const line = range(4).reduce(
        (acc, n) => acc + get([i + di * n, j + dj * n]),
        "",
      );
      if (line === "XMAS") {
        acc++;
      }
    }
  }
  return acc;
};

const matchesMas = (str) => str === "MAS" || str === "SAM";

const countX_mas = ([i, j]) => {
  const d1 = dirs.reduce((acc, d) => acc + get([i + d, j + d]), "");
  const d2 = dirs.reduce((acc, d) => acc + get([i - d, j + d]), "");
  return Number(matchesMas(d1) && matchesMas(d2));
};

const solve = (countFn) => {
  let acc = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      acc += countFn([i, j]);
    }
  }
  return acc;
};

console.log(solve(countXmas));
console.log(solve(countX_mas));
