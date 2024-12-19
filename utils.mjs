import path from "node:path";
import fs from "node:fs";

export const readInput = (importMeta) => {
  return fs.readFileSync(
    `${path.basename(importMeta.url, path.extname(importMeta.url))}.in`,
    "utf8",
  );
};

export const DefaultObj = (defaultValue) =>
  new Proxy(
    {},
    {
      get(target, prop) {
        if (!(prop in target)) {
          target[prop] = structuredClone(defaultValue);
        }
        return target[prop];
      },
    },
  );
export const getAdjacentPositions = ([i, j]) => [
  ...getStraightAdjacentPositions([i, j]),
  [i + 1, j + 1],
  [i + 1, j - 1],
  [i - 1, j - 1],
  [i - 1, j + 1],
];

export const getStraightAdjacentPositions = ([i, j]) => [
  [i, j + 1],
  [i + 1, j],
  [i, j - 1],
  [i - 1, j],
];

export const range = (n) => [...Array(n).keys()];

export const cache = (fn) => {
  const cached = {};
  return (...args) => {
    const argsStr = JSON.stringify(args);
    if (!(argsStr in cached)) {
      cached[argsStr] = fn(...args);
    }
    return cached[argsStr];
  };
};
