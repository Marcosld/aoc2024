import { readInput } from "./utils.mjs";

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
  const [op1, op, op2] = kStr.split(" ");
  doors.push([op1, op, op2, res]);
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

const pad = (n) => n.toString().padStart(2, "0");

const findDoor = (op1, op, op2) => {
  const foundDoor = doors.find(
    ([dop1, dop, dop2]) =>
      dop === op &&
      (dop1 === op1 || dop1 === op2 || dop2 === op1 || dop2 === op2),
  );
  const [dop1, , dop2, res] = foundDoor;
  if (dop1 !== op1 && dop1 !== op2) {
    return [res, dop1];
  }
  if (dop2 !== op1 && dop2 !== op2) {
    return [res, dop2];
  }
  return [res];
};

const solve2 = () => {
  const wrongDoors = new Set();
  let [carry] = findDoor(`x00`, "AND", `y00`);
  let i = 2;
  while (i < 45) {
    const [currXor] = findDoor(`x${pad(i)}`, "XOR", `y${pad(i)}`);
    const [lastAnd] = findDoor(`x${pad(i - 1)}`, "AND", `y${pad(i - 1)}`);
    const [lastXor] = findDoor(`x${pad(i - 1)}`, "XOR", `y${pad(i - 1)}`);
    const [op3, wrong1] = findDoor(carry, "AND", lastXor);
    const [op2, wrong2] = findDoor(lastAnd, "OR", op3);
    const [res, wrong3] = findDoor(currXor, "XOR", op2);
    const zDoor = `z${pad(i)}`;

    [wrong1, wrong2, wrong3].forEach((wrongDoor) => {
      if (wrongDoor) {
        wrongDoors.add(wrongDoor);
      }
    });
    if (res !== zDoor) {
      wrongDoors.add(zDoor);
    }

    carry = op2;
    i++;
  }
  return [...wrongDoors].sort().join(",");
};

console.log(solve1());
console.log(solve2());
