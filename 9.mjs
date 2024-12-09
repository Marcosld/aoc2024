import { readInput, DefaultObj } from "./utils.mjs";

const input = readInput(import.meta);
const diskMap = input.split("").map(Number);

const infSum = (n) => (n * (n + 1)) / 2;

const calcSum = (i, n) => infSum(i + n - 1) - infSum(i - 1);

const solve1 = () => {
  let acc = 0;
  let pos = 0;
  let j = diskMap.length - 1;
  let jLeft = diskMap[j];
  let i = 0;

  const consumeEmptySpace = () => {
    let spaceAvailable = diskMap[i];
    while (spaceAvailable > 0 && j > i) {
      const id = j / 2;
      if (jLeft <= spaceAvailable) {
        acc += id * calcSum(pos, jLeft);
        pos += jLeft;
        spaceAvailable -= jLeft;
        j -= 2;
        jLeft = diskMap[j];
      } else {
        acc += id * calcSum(pos, spaceAvailable);
        pos += spaceAvailable;
        jLeft -= spaceAvailable;
        spaceAvailable = 0;
      }
    }
    i++;
  };

  while (j >= i) {
    if (i % 2 === 0) {
      const id = i / 2;
      acc += id * calcSum(pos, j === i ? jLeft : diskMap[i]);
      pos += diskMap[i];
      i++;
    } else {
      consumeEmptySpace();
    }
  }
  return acc;
};

const filled = [];
const empty = [];
let pos = 0;
for (const [i, size] of diskMap.entries()) {
  if (i % 2 === 0) {
    filled.push([pos, size, i / 2]);
  } else {
    empty.push([pos, size]);
  }
  pos += size;
}

/*
[
  [ 0, 2 ],  [ 5, 3 ],
  [ 11, 1 ], [ 15, 3 ],
  [ 19, 2 ], [ 22, 4 ],
  [ 27, 4 ], [ 32, 3 ],
  [ 36, 4 ], [ 40, 2 ]
] [
  [ 2, 3 ],  [ 8, 3 ],
  [ 12, 3 ], [ 18, 1 ],
  [ 21, 1 ], [ 26, 1 ],
  [ 31, 1 ], [ 35, 1 ],
  [ 40, 0 ]
]
 */

const fill1 = (filled, emptySpace) => {
  let offset = 0;
  for (let j = filled.length - 1; j >= 0; j--) {
    if (emptySpace[1] <= 0) {
      return;
    }
    const file = filled[j];
    const newPos = emptySpace[0] + offset;
    if (newPos < file[0]) {
      if (file[1] <= emptySpace[1]) {
        // move whole
        file[0] = newPos;
        emptySpace[1] -= file[1];
        offset += file[1];
      } else {
        file[1] -= emptySpace[1];
        filled.shift([newPos, emptySpace[1], file[2]]);
        emptySpace[1] = 0;
        // move split
      }
    }
  }
};

const anotherSolve1 = () => {
  const filled_ = structuredClone(filled);
  const empty_ = structuredClone(empty);
  for (const emptySpace of empty_) {
    fill1(filled_, emptySpace);
  }
  return filled_.reduce((acc, [pos, n, id]) => {
    return acc + calcSum(pos, n) * id;
  }, 0);
};

const fill = (emptySpace) => {
  let offset = 0;
  for (let j = filled.length - 1; j >= 0; j--) {
    const file = filled[j];
    const newPos = emptySpace[0] + offset;
    if (file[1] <= emptySpace[1] && newPos < file[0]) {
      file[0] = newPos;
      emptySpace[1] -= file[1];
      offset += file[1];
    }
  }
};

const solve2 = () => {
  for (const emptySpace of empty) {
    fill(emptySpace);
  }
  return filled.reduce((acc, [pos, n], i) => {
    return acc + calcSum(pos, n) * i;
  }, 0);
};

console.log(solve1());
console.log(anotherSolve1());
console.log(solve2());
