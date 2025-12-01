// Advent of Code 2025 - Day 1, Part 2: Secret Entrance
// https://adventofcode.com/2025/day/1

import { writeAnswer, readInput } from "../helpers/functions"
const s = { p: 50, h: 0 }

for (const line of await readInput(import.meta.url)) {
  const d = +line.slice(1)
  const r = line[0] === "R"

  let f = r ? (100 - s.p) % 100 : s.p % 100
  if (f === 0) f = 100
  if (f <= d) s.h += 1 + ((d - f) / 100 | 0)

  s.p = r
    ? (s.p + d) % 100
    : (s.p - d + 10000) % 100
}

writeAnswer(s.h, import.meta.url)
