import { readInput, range } from "./utils.mjs";

const input = readInput(import.meta);
const [p1, p2] = input.split("\n\n");
let registers = p1.split("\n").map((l) => +l.split(": ")[1]);
let instructions = p2.split(": ")[1].split(",").map(Number);

const out = [];

const getCombo = (n) => {
  if (n < 4) {
    return n;
  }
  return registers[n - 4];
};

const performOp = (optn, opnd, pnt) => {
  if (optn === 0) {
    registers[0] = Math.floor(registers[0] / 2 ** getCombo(opnd));
    return pnt + 2;
  }
  if (optn === 1) {
    registers[1] = registers[1] ^ opnd;
    return pnt + 2;
  }
  if (optn === 2) {
    registers[1] = getCombo(opnd) % 8;
    return pnt + 2;
  }
  if (optn === 3) {
    if (registers[0] === 0) {
      return pnt + 2;
    }
    return opnd;
  }
  if (optn === 4) {
    registers[1] = registers[1] ^ registers[2];
    return pnt + 2;
  }
  if (optn === 5) {
    out.push(getCombo(opnd) % 8);
    return pnt + 2;
  }
  if (optn === 6) {
    registers[1] = Math.floor(registers[0] / 2 ** getCombo(opnd));
    return pnt + 2;
  }
  if (optn === 7) {
    registers[2] = Math.floor(registers[0] / 2 ** getCombo(opnd));
    return pnt + 2;
  }
};

const solve1 = () => {
  let pnt = 0;
  while (pnt < instructions.length) {
    pnt = performOp(instructions[pnt], instructions[pnt + 1], pnt);
  }
  return out.join(",");
};

const solve2 = () => {
  let nextPossibleRegisters = [0n];
  let currRegisters = [];

  while (instructions.length) {
    currRegisters = nextPossibleRegisters;
    nextPossibleRegisters = [];
    const out = BigInt(instructions.pop());
    while (currRegisters.length) {
      const currA = currRegisters.pop();
      nextPossibleRegisters.push(
        ...range(8)
          .map((n) => 8n * currA + BigInt(n))
          .filter((A) => {
            const temp = A % 8n ^ 6n;
            const B = temp ^ (A / 2n ** temp) ^ 7n;
            return B % 8n === out;
          }),
      );
    }
  }
  return nextPossibleRegisters.pop();
};

console.log(solve1());
console.log(solve2());
