import { readInput, cache } from "./utils.mjs";

const input = readInput(import.meta);
const [towelsStr, patternsStr] = input.split("\n\n");
const TOWELS = towelsStr.split(", ");
const PATTERNS = patternsStr.split("\n");

const getPossibleArrangements = cache((pattern) => {
  if (!pattern.length) {
    return 1;
  }
  let acc = 0;
  for (const towel of TOWELS) {
    if (pattern.startsWith(towel)) {
      acc += getPossibleArrangements(pattern.slice(towel.length));
    }
  }
  return acc;
});

const solve = () => {
  let accs = [0, 0];
  for (const pattern of PATTERNS) {
    const nOfArrangements = getPossibleArrangements(pattern, TOWELS);
    accs = [accs[0] + Boolean(nOfArrangements), accs[1] + nOfArrangements];
  }
  return accs;
};

console.log(solve().join("\n"));
