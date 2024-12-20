import {
  readInput,
  range,
  getStraightAdjacentPositions,
  DefaultObj,
  prs,
  str,
} from "./utils.mjs";

const input = readInput(import.meta);
const blocks = input.split("\n").map((b) => b.split(",").map(Number));
const SIZE = 70 + 1;
const map = {};
const BYTES = 1024;
const E = [SIZE - 1, SIZE - 1];

const initMap = () => {
  for (const i of range(SIZE)) {
    for (const j of range(SIZE)) {
      map[str([i, j])] = ".";
    }
  }
};

const getPossibleMoves = (pos, score) =>
  getStraightAdjacentPositions(pos)
    .filter((newPos) => map[str(newPos)] === ".")
    .map((newPos) => [newPos, score + 1]);

const getFastestPath = () => {
  const positions = new Set([str([0, 0])]);
  const seen = DefaultObj(Infinity);
  seen[str([0, 0])] = 0;
  while (positions.size) {
    const posStr = positions.keys().next().value;
    positions.delete(posStr);
    const pos = prs(posStr);
    const score = seen[posStr];
    if (pos[0] === E[0] && pos[1] === E[1]) {
      return score;
    }
    seen[posStr] = score;
    const possibleMoves = getPossibleMoves(pos, score);
    possibleMoves.forEach(([pos, score]) => {
      const strPos = str(pos);
      if (score < seen[strPos]) {
        seen[strPos] = score;
        positions.add(strPos);
      }
    });
  }
  return Infinity;
};

const solve1 = () => {
  initMap();
  for (const [i, j] of blocks.slice(0, BYTES)) {
    map[str([i, j])] = "#";
  }
  return getFastestPath();
};

const solve2 = () => {
  initMap();
  for (const [i, j] of blocks) {
    map[str([i, j])] = "#";
    if (!Number.isFinite(getFastestPath())) {
      return [i, j];
    }
  }
};

console.log(solve1());
console.log(solve2());
