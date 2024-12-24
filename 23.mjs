import {
  readInput,
  getStraightAdjacentPositions,
  str,
  cache,
  DefaultObj,
} from "./utils.mjs";

const input = readInput(import.meta);
const graph = DefaultObj(new Set());
const nodes = new Set();

for (const line of input.split("\n")) {
  const [v1, v2] = line.split("-");
  nodes.add(v1);
  nodes.add(v2);
  graph[v1].add(v2);
  graph[v2].add(v1);
}

const nodeList = [...nodes];

const explore = (node) => {
  const subsets = [new Set([node])];
  for (const toNode of graph[node]) {
    for (const subset of subsets) {
      if (subset.isSubsetOf(graph[toNode])) {
        subset.add(toNode);
        break;
      }
    }
    subsets.push(new Set([node, toNode]));
  }
  return subsets;
};

const getCombinations = (arr, size = 3, result = "") => {
  if (size === 0) {
    return [result];
  }
  const combinations = [];
  for (let i = 0; i <= arr.length - size; i++) {
    combinations.push(
      ...getCombinations(arr.slice(i + 1), size - 1, `${result},${arr[i]}`),
    );
  }
  return combinations;
};

const solve = () => {
  let maxConnected = new Set();
  const p1Combs = new Set();
  for (const node of nodeList) {
    for (const subset of explore(node)) {
      if (subset.size >= 3) {
        for (const comb of getCombinations([...subset].sort(), 3)) {
          if (comb.includes(",t")) {
            p1Combs.add(comb);
          }
        }
      }
      if (subset.size > maxConnected.size) {
        maxConnected = subset;
      }
    }
  }
  return [[...maxConnected.keys()].sort().join(","), p1Combs.size];
};

console.log(solve().join("\n"));
