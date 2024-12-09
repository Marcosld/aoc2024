import { readInput } from "./utils.mjs";

const input = readInput(import.meta);

const infiniteSum = (n) => (n * (n + 1)) / 2;

const calcSum = (i, n) => infiniteSum(i + n - 1) - infiniteSum(i - 1);

const solve1 = () => {
  const diskMap = input.split("").map(Number);

  let checksum = 0;
  let diskPos = 0;
  let j = diskMap.length - 1;
  let i = 0;

  const updateChecksumAndDiskPos = (filePos, consumedSpace) => {
    const id = filePos / 2;
    checksum += id * calcSum(diskPos, consumedSpace);
    diskPos += consumedSpace;
  };

  const consumeEmptySpace = () => {
    while (diskMap[i] > 0 && j > i) {
      const consumedSpace = Math.min(diskMap[j], diskMap[i]);
      updateChecksumAndDiskPos(j, consumedSpace);
      diskMap[i] -= consumedSpace;
      diskMap[j] -= consumedSpace;
      if (diskMap[i] > 0) {
        j -= 2;
      }
    }
  };

  while (j >= i) {
    if (i % 2 === 0) {
      updateChecksumAndDiskPos(i, diskMap[i]);
    } else {
      consumeEmptySpace();
    }
    i++;
  }
  return checksum;
};

const solve2 = () => {
  const diskMap = input.split("").map(Number);
  const filled = [];
  const empty = [];
  let pos = 0;
  for (const [i, size] of diskMap.entries()) {
    if (i % 2 === 0) {
      filled.push([pos, size]);
    } else {
      empty.push([pos, size]);
    }
    pos += size;
  }

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

  for (const emptySpace of empty) {
    fill(emptySpace);
  }
  return filled.reduce((acc, [pos, n], i) => {
    return acc + calcSum(pos, n) * i;
  }, 0);
};

console.log(solve1());
console.log(solve2());
