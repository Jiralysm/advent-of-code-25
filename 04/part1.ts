// Advent of Code 2025, Day 04, Part 1: Printing Department
// https://adventofcode.com/2025/day/4

import { readInput, writeAnswer } from "../helpers/functions";
const grid = await readInput(import.meta.url);

let total = 0;
const h = grid.length;
const w = grid[0].length;

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    if (grid[y][x] !== "@") continue;

    let adj = 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        const ny = y + dy;
        const nx = x + dx;

        if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;
        if (grid[ny][nx] === "@") adj++;
      }
    }

    if (adj < 4) total++;
  }
}

writeAnswer(total, import.meta.url);
