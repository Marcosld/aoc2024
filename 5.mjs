import { readInput, DefaultObj } from "./utils.mjs";

const input = readInput(import.meta);
const rules = DefaultObj([]);
const [rulesInput, printedPagesInput] = input.split("\n\n");
const printedPages = printedPagesInput.split("\n").map((l) => l.split(","));

for (const rule of rulesInput.split("\n")) {
  const [k, r] = rule.split("|");
  rules[k].push(r);
}

const checkPage = (printedPage) => {
  const pastKeys = new Set();
  for (const k of printedPage) {
    const toRightKeys = rules[k];
    if (toRightKeys.some((toRightKey) => pastKeys.has(toRightKey))) {
      return false;
    }
    pastKeys.add(k);
  }
  return true;
};

const solve1 = () => {
  let acc = 0;
  for (const printedPage of printedPages) {
    if (checkPage(printedPage)) {
      acc += +printedPage[Math.floor(printedPage.length / 2)];
    }
  }
  return acc;
};

const getInsertionIndex = (page, toRightKeys) => {
  const toFindKeys = new Set(toRightKeys).intersection(new Set(page));
  let i = page.length;
  while (toFindKeys.size) {
    i--;
    if (toFindKeys.has(page[i])) {
      toFindKeys.delete(page[i]);
    }
  }
  return i;
};

const reorderPage = (printedPage) => {
  const reorderedPage = [];
  for (const k of printedPage) {
    const toRightKeys = rules[k];
    reorderedPage.splice(getInsertionIndex(reorderedPage, toRightKeys), 0, k);
  }
  return reorderedPage;
};

const solve2 = () => {
  let acc = 0;
  for (const printedPage of printedPages) {
    if (!checkPage(printedPage)) {
      const reorderedPage = reorderPage(printedPage);
      acc += +reorderedPage[Math.floor(reorderedPage.length / 2)];
    }
  }
  return acc;
};

const solve2_2 = () => {
  let acc = 0;
  for (const printedPage of printedPages) {
    if (!checkPage(printedPage)) {
      const reorderedPage = printedPage.sort((a, b) =>
        rules[a].includes(b) ? 1 : -1,
      );
      acc += +reorderedPage[Math.floor(reorderedPage.length / 2)];
    }
  }
  return acc;
};

console.log(solve1());
console.log(solve2());
console.log(solve2_2());
