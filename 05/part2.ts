// Advent of Code 2025, Day 05, Part 2: Cafeteria
// https://adventofcode.com/2025/day/5

import { readInput, writeAnswer } from "../helpers/functions";
const lines = await readInput(import.meta.url);

const blank = lines.indexOf("");
const rangeLines = lines.slice(0, blank);

const ranges = rangeLines.map(line => {
  const [a, b] = line.split("-").map(Number);
  return { a, b };
});

ranges.sort((x, y) => x.a - y.a);

const merged = [];
let current = ranges[0];

for (let i = 1; i < ranges.length; i++) {
  const r = ranges[i];

  if (r.a <= current.b + 1) {
    current.b = Math.max(current.b, r.b);
  } else {
    merged.push(current);
    current = r;
  }
}

merged.push(current);

let total = 0;

for (const r of merged) {
  total += (r.b - r.a + 1);
}

writeAnswer(total, import.meta.url);
