// Advent of Code 2025, Day 07, Part 2: Laboratories
// https://adventofcode.com/2025/day/7

import { readInput, writeAnswer } from "../helpers/functions";

const g = await readInput(import.meta.url);
const h = g.length;
const w = g[0].length;

let sx = 0;
let sy = 0;

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (g[y][x] === "S") {
      sx = x;
      sy = y;
    }
  }
}

const dp: number[][] = Array.from({ length: h }, () =>
  Array(w).fill(0)
);

if (sy + 1 < h) dp[sy + 1][sx] = 1;

let total = 0;

for (let y = sy + 1; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const c = dp[y][x];
    if (!c) continue;

    if (y === h - 1) {
      total += c;
      continue;
    }

    const below = g[y + 1][x];

    if (below === ".") {
      dp[y + 1][x] += c;
    } else if (below === "^") {
      const ny = y + 1;
      const lx = x - 1;
      const rx = x + 1;

      if (lx >= 0) {
        dp[ny][lx] += c;
      } else {
        total += c;
      }

      if (rx < w) {
        dp[ny][rx] += c;
      } else {
        total += c;
      }
    } else {
      dp[y + 1][x] += c;
    }
  }
}

writeAnswer(total, import.meta.url);