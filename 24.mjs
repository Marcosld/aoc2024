import {
  readInput,
  getStraightAdjacentPositions,
  str,
  cache,
  DefaultObj,
} from "./utils.mjs";

const input = readInput(import.meta);
const [resultsStr, doorsStr] = input.split("\n\n");

const results = {};
const doors = [];
const ops = {
  AND: (a, b) => a & b,
  OR: (a, b) => a | b,
  XOR: (a, b) => a ^ b,
};

for (const resultStr of resultsStr.split("\n")) {
  const [k, vStr] = resultStr.split(": ");
  results[k] = +vStr;
}

for (const doorStr of doorsStr.split("\n")) {
  const [kStr, res] = doorStr.split(" -> ");
  doors.push([...kStr.split(" "), res]);
}

const solve1 = () => {
  let operations = doors;
  const currResults = structuredClone(results);
  while (operations.length) {
    const nextOperations = [];
    for (const [op1Key, opKey, op2Key, resKey] of operations) {
      if (op1Key in currResults && op2Key in currResults) {
        currResults[resKey] = ops[opKey](
          currResults[op1Key],
          currResults[op2Key],
        );
        continue;
      }
      nextOperations.push([op1Key, opKey, op2Key, resKey]);
    }
    operations = nextOperations;
  }
  return parseInt(
    Object.keys(currResults)
      .filter((k) => k.startsWith("z"))
      .sort()
      .toReversed()
      .map((k) => currResults[k])
      .join(""),
    2,
  );
};

const getBinary = (results, keyStartsWith) =>
  Object.keys(results)
    .filter((k) => k.startsWith(keyStartsWith))
    .sort()
    .toReversed()
    .map((k) => results[k]);

const parseBinary = (binary) => parseInt(binary.join(""), 2);

const solve2 = () => {
  const xBinary = getBinary(results, "x");
  const yBinary = getBinary(results, "y");
  const expectedZBinary = (parseBinary(xBinary) + parseBinary(yBinary))
    .toString(2)
    .split("");
  console.log(xBinary, parseBinary(xBinary));
  console.log(yBinary, parseBinary(yBinary));
  console.log(parseBinary(xBinary) + parseBinary(yBinary));
  console.log(expectedZBinary);
};

// console.log(solve1());
console.log(solve2());
