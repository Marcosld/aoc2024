import { readInput, DefaultObj } from "./utils.mjs";

const input = readInput(import.meta);

const [I, J] = [input.split("\n").length, input.split("\n")[0].length];

const inBounds = ([i, j]) => i >= 0 && i < I && j >= 0 && j < J;

const antennasMap = DefaultObj([]);

for (const [i, line] of input.split("\n").entries()) {
  for (const [j, tile] of line.split("").entries()) {
    if (tile !== ".") {
      antennasMap[tile].push([i, j]);
    }
  }
}

const calcAntinodesP2 = ([x, y], [dx, dy]) => {
  const antinodes = [];
  let [nx, ny] = [x + dx, y + dy];
  while (inBounds([nx, ny])) {
    antinodes.push([nx, ny]);
    [nx, ny] = [nx + dx, ny + dy];
  }
  return antinodes;
};

const getAntinodesP1 = ([x1, y1], [x2, y2], [dx, dy]) =>
  [
    [x1 - dx, y1 - dy],
    [x2 + dx, y2 + dy],
  ].filter((p) => inBounds(p));

const getAntinodesP2 = ([x1, y1], [x2, y2], [dx, dy]) => [
  [x1, y1],
  ...calcAntinodesP2([x1, y1], [dx, dy]),
  ...calcAntinodesP2([x1, y1], [-dx, -dy]),
];

const solve = (getAntinodeFn) => {
  const antinodes = new Set();

  for (const pairsOfAntennas of Object.values(antennasMap)) {
    for (let i = 0; i < pairsOfAntennas.length; i++) {
      for (let j = i + 1; j < pairsOfAntennas.length; j++) {
        const [x1, y1] = pairsOfAntennas[i];
        const [x2, y2] = pairsOfAntennas[j];
        const [dx, dy] = [x2 - x1, y2 - y1];

        getAntinodeFn([x1, y1], [x2, y2], [dx, dy]).forEach((p) =>
          antinodes.add(JSON.stringify(p)),
        );
      }
    }
  }
  return antinodes.size;
};

console.log(solve(getAntinodesP1));
console.log(solve(getAntinodesP2));
