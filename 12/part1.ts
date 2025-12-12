// Advent of Code 2025, Day 12, Part 1: Christmas Tree Farm
// https://adventofcode.com/2025/day/12

import { readInput, writeAnswer } from "../helpers/functions";

const lines = await readInput(import.meta.url);

let i = 0;
const areas: number[] = [];

while (/^\d+:$/.test(lines[i])) {
  i++;
  let area = 0;
  while (i < lines.length && lines[i] !== "") {
    for (const c of lines[i]) if (c === "#") area++;
    i++;
  }
  areas.push(area);
  i++;
}

let answer = 0;

for (; i < lines.length; i++) {
  if (!lines[i]) continue;

  const [dim, rest] = lines[i].split(": ");
  const [w, h] = dim.split("x").map(Number);
  const counts = rest.split(" ").map(Number);

  let need = 0;
  for (let j = 0; j < counts.length; j++) {
    need += counts[j] * areas[j];
  }

  if (need <= w * h) answer++;
}

writeAnswer(answer, import.meta.url);