import { readInput, getStraightAdjacentPositions } from "./utils.mjs";

const input = readInput(import.meta);
const map = input.split("\n").map((x) => x.split(""));

const str = (val) => JSON.stringify(val);
const prs = (val) => JSON.parse(val);

const get = ([i, j]) => map[i]?.[j];

const calculateSides = (areaPoints) => {
  let sides = 0;
  let [minI, minJ, maxI, maxJ] = [Infinity, Infinity, -Infinity, -Infinity];
  for (const pointStr of areaPoints) {
    const [i, j] = prs(pointStr);
    minI = Math.min(i, minI);
    minJ = Math.min(j, minJ);
    maxI = Math.max(i, maxI);
    maxJ = Math.max(j, maxJ);
  }
  // check all borders from top do down
  for (let i = minI - 1; i <= maxI; i++) {
    let lastSideType = 0;
    for (let j = minJ - 1; j <= maxJ; j++) {
      const sideType =
        areaPoints.has(str([i, j])) - areaPoints.has(str([i + 1, j]));
      if (sideType && sideType !== lastSideType) {
        sides++;
      }
      lastSideType = sideType;
    }
  }
  // check all borders from left to right
  for (let j = minJ - 1; j <= maxJ; j++) {
    let lastSideType = 0;
    for (let i = minI - 1; i <= maxI; i++) {
      const sideType =
        areaPoints.has(str([i, j])) - areaPoints.has(str([i, j + 1]));
      if (sideType && sideType !== lastSideType) {
        sides++;
      }
      lastSideType = sideType;
    }
  }
  return sides;
};

const consumeArea = (firstPointStr, visited) => {
  const areaToVisit = [firstPointStr];
  const areaType = get(prs(firstPointStr));
  const areaPoints = new Set();
  let perimeterSize = 0;

  while (areaToVisit.length) {
    const visitingStr = areaToVisit.pop();
    const visiting = prs(visitingStr);
    const isPerimeterPoint = get(visiting) !== areaType;

    if (isPerimeterPoint || visited.has(visitingStr)) {
      perimeterSize += isPerimeterPoint;
      continue;
    }

    visited.add(visitingStr);
    areaPoints.add(visitingStr);
    areaToVisit.push(...getStraightAdjacentPositions(visiting).map(str));
  }
  return [
    areaPoints.size * perimeterSize,
    areaPoints.size * calculateSides(areaPoints),
  ];
};

const solve = () => {
  const visited = new Set();
  let acc = [0, 0];

  for (const i of map.keys()) {
    for (const j of map[i].keys()) {
      const toVisitNext = str([i, j]);
      if (!visited.has(toVisitNext)) {
        acc = consumeArea(toVisitNext, visited).map((x, i) => acc[i] + x);
      }
    }
  }
  return acc;
};

console.log(solve().join("\n"));
