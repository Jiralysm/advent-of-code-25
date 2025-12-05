// Advent of Code 2025, Day 05, Part 1: Cafeteria
// https://adventofcode.com/2025/day/5

import { readInput, writeAnswer } from "../helpers/functions";
const lines = await readInput(import.meta.url);

const blank = lines.indexOf("");
const rangeLines = lines.slice(0, blank);
const idLines = lines.slice(blank + 1);

const ranges = rangeLines.map(line => {
  const [a, b] = line.split("-").map(Number);
  return { a, b };
});

let total = 0;

for (const raw of idLines) {
  const id = Number(raw);

  let fresh = false;

  for (const r of ranges) {
    if (id >= r.a && id <= r.b) {
      fresh = true;
      break;
    }
  }

  if (fresh) total++;
}

writeAnswer(total, import.meta.url);
