// Advent of Code 2025, Day 07, Part 1: Laboratories
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

let splits = 0;
const stack: { x: number; y: number }[] = [{ x: sx, y: sy + 1 }];
const seen = new Set<string>();

while (stack.length) {
  const { x, y } = stack.pop()!;
  const key = x + "," + y;

  if (seen.has(key)) continue;
  seen.add(key);

  if (x < 0 || x >= w || y < 0 || y >= h) continue;

  const c = g[y][x];

  if (c === "^") {
    splits++;

    stack.push({ x: x - 1, y: y + 1 });
    stack.push({ x: x + 1, y: y + 1 });
    continue;
  }

  if (c === ".") {
    stack.push({ x, y: y + 1 });
  }
}

writeAnswer(splits, import.meta.url);