import { readInput, getStraightAdjacentPositions } from "./utils.mjs";

const input = readInput(import.meta);
const map = input.split("\n").map((l) => l.split(""));
const vertexes = [];
const graph = {}

const DIRS = ">v<^";

for (const [i, line] of map.entries()) {
  for (const [j, c] of line.entries()) {
    if (c === ".") {
      const ways = getStraightAdjacentPositions([i, j])
        .map((pos, i) => [pos, DIRS[i]])
        .filter(([[i, j]]) => map[i][j] === ".")
        .map(([, dir]) => dir)
        .join("");
      if (ways !== "v^" && ways !== "><") {
        ways
          .split("")
          .forEach((dir) => vertexes.push(JSON.stringify([i, j, dir])));
      }
    }
  }
}

const expand = ([i, j], [di, dj]) => {

}

for (const v of vertexes) {
  graph[v] =
}



// const solve1 = () => {
//   let positions = [[S, ">", 0]];
//   let lowest = Infinity;
//   const seen = {}; // just lowest for each position
//   while (positions.length) {
//     positions = positions.sort((a, b) => estimate(...b) - estimate(...a));
//     const [pos, dir, score] = positions.shift();
//     if (pos[0] === E[0] && pos[1] === E[1]) {
//       lowest = Math.min(lowest, score);
//     }
//     const keySeen = JSON.stringify(pos);
//     if (keySeen in seen && seen[keySeen] < score) {
//       continue;
//     }
//     seen[keySeen] = score;
//     const possibleMoves = getPossibleMoves(pos, dir, score);
//     positions.push(...possibleMoves);
//   }
//   return lowest;
// };
//
// console.log(solve1());
