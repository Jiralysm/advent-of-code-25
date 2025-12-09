// Advent of Code 2025, Day 09, Part 1: Movie Theater
// https://adventofcode.com/2025/day/9

import { readInput, writeAnswer, toNumbers } from "../helpers/functions";

const lines = await readInput(import.meta.url);

const pts = lines.map(line => {
  const [x, y] = toNumbers(line.split(","));
  return { x, y };
});

let best = 0;

for (let i = 0; i < pts.length; i++) {
  for (let j = i + 1; j < pts.length; j++) {
    const a = pts[i];
    const b = pts[j];

    const w = Math.abs(a.x - b.x) + 1;
    const h = Math.abs(a.y - b.y) + 1;

    const area = w * h;
    if (area > best) best = area;
  }
}

writeAnswer(best, import.meta.url);