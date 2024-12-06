import { readInput } from "./utils.mjs";

const input = readInput(import.meta);

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const map = input.split("\n").map((line) => line.split(""));
const startPos = [
  Math.floor(input.split("^")[0].length / map.length),
  Math.floor(input.split("^")[0].length % (map[0].length + 1)),
];

const get = ([i, j]) => {
  return map[i]?.[j];
};

const getNextPos = ([i, j], dir) => [i + dirs[dir][0], j + dirs[dir][1]];

const getNextPosDir = (pos, dir) => {
  let nextDir = dir;
  while (get(getNextPos(pos, nextDir)) === "#") {
    nextDir++;
    nextDir %= 4;
  }
  return [getNextPos(pos, nextDir), nextDir];
};

const getVisited = () => {
  const visited = new Set();
  let dir = 0;
  let pos = startPos;
  while (get(pos)) {
    visited.add(JSON.stringify(pos));
    [pos, dir] = getNextPosDir(pos, dir);
  }
  return visited;
};

const solve1 = () => {
  return getVisited().size;
};

const hasCycle = () => {
  const visitedWithDirs = new Set();
  let dir = 0;
  let pos = startPos;
  while (get(pos)) {
    if (visitedWithDirs.has(JSON.stringify([pos, dir]))) {
      return true;
    }
    visitedWithDirs.add(JSON.stringify([pos, dir]));
    [pos, dir] = getNextPosDir(pos, dir);
  }
  return false;
};

const solve2 = () => {
  const visited = getVisited();
  let acc = 0;
  for (const strPos of visited.keys()) {
    const obstaclePos = JSON.parse(strPos);
    map[obstaclePos[0]][obstaclePos[1]] = "#";
    if (hasCycle(map)) {
      acc++;
    }
    map[obstaclePos[0]][obstaclePos[1]] = ".";
  }
  return acc;
};

console.log(solve1());
console.log(solve2());
