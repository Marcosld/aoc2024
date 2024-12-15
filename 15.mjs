import { readInput } from "./utils.mjs";

const input = readInput(import.meta);
const [mapStr, instructionsStr] = input.split("\n\n");
const instructions = instructionsStr.replaceAll("\n", "");

const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const INS = "^>v<";

const getMapAndPos1 = () => {
  let position;
  const map = mapStr.split("\n").map((line, i) => {
    const lineMap = line.split("");
    if (lineMap.includes("@")) {
      const j = lineMap.indexOf("@");
      position = [i, j];
      lineMap[j] = ".";
    }
    return lineMap;
  });
  return [map, position];
};

const getMapAndPos2 = () => {
  let position;
  const map = mapStr.split("\n").map((lineStr, i) =>
    lineStr.split("").flatMap((c, j) => {
      if (c === "#") {
        return ["#", "#"];
      }
      if (c === ".") {
        return [".", "."];
      }
      if (c === "O") {
        return ["[", "]"];
      }
      if (c === "@") {
        position = [i, j * 2];
        return [".", "."];
      }
    }),
  );
  return [map, position];
};

const fillConnected = (map, initialPos, [di, dj]) => {
  const connectedSet = new Set();
  const queue = [initialPos];

  while (queue.length) {
    const [i, j] = queue.pop();
    if (connectedSet.has(JSON.stringify([i, j, map[i][j]]))) {
      continue;
    }
    if (map[i][j] === "#") {
      return undefined;
    }
    const boxType = "]O[".indexOf(map[i][j]);
    if (boxType !== -1) {
      connectedSet.add(JSON.stringify([i, j, map[i][j]]));
      queue.push([i, j + boxType - 1], [i + di, j + dj]);
    }
  }
  return connectedSet;
};

const move = (map, [i, j], [di, dj]) => {
  const [nI, nJ] = [i + di, j + dj];

  if (map[nI][nJ] === "#") {
    return [i, j];
  }

  const connectedSet = fillConnected(map, [nI, nJ], [di, dj]);
  if (!connectedSet) {
    return [i, j];
  }
  const connectedBoxes = [...connectedSet].map((el) => JSON.parse(el));

  for (const [boxI, boxJ] of connectedBoxes) {
    map[boxI][boxJ] = ".";
  }

  for (const [boxI, boxJ, boxChar] of connectedBoxes) {
    const [nBoxI, nBoxJ] = [boxI + di, boxJ + dj];
    map[nBoxI][nBoxJ] = boxChar;
  }

  return [nI, nJ];
};

const solve = ([currentMap, position]) => {
  for (const ins of instructions) {
    position = move(currentMap, position, DIRS[INS.indexOf(ins)]);
  }
  let acc = 0;
  for (const [i, line] of currentMap.entries()) {
    for (const [j, c] of line.entries()) {
      if (c === "[" || c === "O") {
        acc += 100 * i + j;
      }
    }
  }
  return acc;
};

console.log(solve(getMapAndPos1()));
console.log(solve(getMapAndPos2()));
