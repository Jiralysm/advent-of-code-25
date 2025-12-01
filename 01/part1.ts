// Advent of Code 2025 - Day 1, Part 1: Secret Entrance
// https://adventofcode.com/2025/day/1

import { writeAnswer, readInput } from "../functions"
const s = { p: 50, h: 0 }

for (const line of await readInput(import.meta.url)) {
  const d = +line.slice(1)
  s.p = line[0] === "R"
    ? (s.p + d) % 100
    : (s.p - d + 10000) % 100
  if (s.p === 0) s.h++
}

writeAnswer(s.h, import.meta.url)