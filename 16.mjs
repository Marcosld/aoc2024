import {
  readInput,
  getStraightAdjacentPositions,
  DefaultObj,
} from "./utils.mjs";

const input = readInput(import.meta);
const map = input.split("\n").map((l) => l.split(""));
const S = [[map.length - 2, 1], ">"];
const E = [1, map[1].length - 2];

const DIRS = ">v<^";

const str = (val) => JSON.stringify(val);
const prs = (val) => JSON.parse(val);

const getPossibleMoves = (pos, dir, score) =>
  getStraightAdjacentPositions(pos)
    .map((newPos, i) => [newPos, i])
    .filter(([[i, j]]) => map[i][j] !== "#")
    .map(([newPos, newDirI]) => {
      const newDir = DIRS[newDirI];
      if (dir === newDir) {
        return [newPos, newDir, score + 1];
      }
      const dirsDistance = Math.abs(DIRS.indexOf(dir) - DIRS.indexOf(newDir));
      const nOfTurns = dirsDistance > 2 ? 1 : dirsDistance;
      return [pos, newDir, score + 1000 * nOfTurns];
    });

const solve = () => {
  const positions = new Set([str(S)]);
  const seen = DefaultObj(Infinity);
  const previouses = DefaultObj(new Set());
  let bestEnds = [];
  seen[str(S)] = 0;
  while (positions.size) {
    const posDirStr = positions.keys().next().value;
    positions.delete(posDirStr);
    const [pos, dir] = prs(posDirStr);
    const score = seen[posDirStr];
    const possibleMoves = getPossibleMoves(pos, dir, score);
    possibleMoves.forEach(([nextPos, nextDir, nextScore]) => {
      const nextPosDirStr = str([nextPos, nextDir]);
      if (nextScore < seen[nextPosDirStr]) {
        seen[nextPosDirStr] = nextScore;
        previouses[nextPosDirStr] = new Set();
        if (pos[0] === E[0] && pos[1] === E[1]) {
          bestEnds = [];
        }
      }
      if (nextScore <= seen[nextPosDirStr]) {
        previouses[nextPosDirStr].add(posDirStr);
        positions.add(nextPosDirStr);
        if (pos[0] === E[0] && pos[1] === E[1]) {
          bestEnds.push(posDirStr);
        }
      }
    });
  }
  return [seen[bestEnds[0]], traverse(bestEnds, previouses)];
};

const traverse = (keys, previouses, visited = new Set()) => {
  for (const key of keys) {
    visited.add(str(prs(key)[0]));
    traverse(previouses[key], previouses, visited);
  }
  return visited.size;
};

console.time("solve");
console.log(solve().join("\n"));
console.timeEnd("solve");
