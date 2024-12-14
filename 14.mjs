import { readInput } from "./utils.mjs";

const input = readInput(import.meta);

const solve1 = () => {
  const halfI = Math.floor(I / 2);
  const halfJ = Math.floor(J / 2);
  const Q = [0, 0, 0, 0];
  for (const line of input.split("\n")) {
    const [[i, j], [di, dj]] = line
      .split(" ")
      .map((part) => part.slice(2).split(",").map(Number));

    const [fI, fJ] = normalizePos([i + di * seconds, j + dj * seconds]);
    if (fI >= 0 && fI < halfI && fJ >= 0 && fJ < halfJ) {
      Q[0]++;
    }
    if (fI >= halfI + 1 && fI < I && fJ >= 0 && fJ < halfJ) {
      Q[1]++;
    }
    if (fI >= 0 && fI < halfI && fJ >= halfJ + 1 && fJ < J) {
      Q[2]++;
    }
    if (fI >= halfI + 1 && fI < I && fJ >= halfJ + 1 && fJ < J) {
      Q[3]++;
    }
  }
  return Q.reduce((acc, n) => acc * n, 1);
};

const printMap = (robots, I, J, k) => {
  console.log(`NEW POSSIBLE MAP: ${k + 1}`);
  for (let j = 0; j < J; j++) {
    for (let i = 0; i < I; i++) {
      if (robots.has(JSON.stringify([i, j]))) {
        process.stdout.write("#");
      } else {
        process.stdout.write(".");
      }
    }
    process.stdout.write("\n");
  }
};

const normalizePos = ([i, j]) => {
  const [nextI, nextJ] = [i % I, j % J];
  return [nextI < 0 ? I + nextI : nextI, nextJ < 0 ? J + nextJ : nextJ];
};

const getDiagonalSize = (robotPositions, robotPosStr) => {
  if (!robotPositions.has(robotPosStr)) return 0;
  const [i, j] = JSON.parse(robotPosStr);
  return (
    1 +
    getDiagonalSize(
      robotPositions,
      JSON.stringify(normalizePos([i + 1, j - 1])),
    )
  );
};

const hasLongDiagonal = (robotPositions, minSize) => {
  for (const robotPosStr of robotPositions) {
    if (getDiagonalSize(robotPositions, robotPosStr) > minSize) {
      return true;
    }
  }
  return false;
};

const solve2 = () => {
  const robots = input
    .split("\n")
    .map((line) =>
      line.split(" ").map((part) => part.slice(2).split(",").map(Number)),
    );
  for (let k = 0; k < 10000; k++) {
    const robotPositions = new Set();
    for (let [robotI, [[i, j], [di, dj]]] of robots.entries()) {
      const nextPos = normalizePos([i + di, j + dj]);
      robots[robotI][0] = nextPos;
      robotPositions.add(JSON.stringify(nextPos));
    }
    if (hasLongDiagonal(robotPositions, 5)) {
      printMap(robotPositions, I, J, k);
    }
  }
};

const [I, J, seconds] = [101, 103, 100];

console.log(solve1());
solve2();
