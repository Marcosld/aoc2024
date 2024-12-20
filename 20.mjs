import { readInput, str, getStraightAdjacentPositions, prs } from "./utils.mjs";

const input = readInput(import.meta);
const map = input.split("\n").map((l) => l.split(""));
let path = [];
let S, E;

for (const [i, line] of map.entries()) {
  for (const [j, c] of line.entries()) {
    if (c === "E") {
      E = [i, j];
    }
    if (c === "S") {
      S = [i, j];
    }
  }
}

const buildPath = (initialPos) => {
  const visited = new Set();
  let pos = initialPos;
  while (str(pos) !== str(E)) {
    const posStr = str(pos);
    visited.add(posStr);
    path.push(pos);
    for (const [i, j] of getStraightAdjacentPositions(pos)) {
      const nextPosStr = str([i, j]);
      if (!visited.has(nextPosStr) && map[i][j] !== "#") {
        pos = [i, j];
        break;
      }
    }
  }
  path.push(E);
};

buildPath(S);

const solve = (savedTime, cheatSeconds) => {
  const maxTime = path.length - savedTime;
  let acc = 0;

  for (let i = 0; i < path.length; i++) {
    for (let j = i + 1; j < path.length; j++) {
      const [i1, j1] = path[i];
      const [i2, j2] = path[j];
      const dis = Math.abs(i1 - i2) + Math.abs(j1 - j2);
      if (dis <= cheatSeconds && i + path.length - j + dis <= maxTime) {
        acc++;
      }
      if (dis <= cheatSeconds && j + path.length - i + dis <= maxTime) {
        acc++;
      }
    }
  }

  return acc;
};

console.log(solve(100, 2));
console.log(solve(100, 20));
