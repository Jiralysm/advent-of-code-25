// Advent of Code 2025, Day 2, Part 1: Gift Shop
// https://adventofcode.com/2025/day/2

import { readInput, writeAnswer } from "../helpers/functions"

let sum = 0

for (const line of await readInput(import.meta.url)) {
  for (const range of line.split(",")) {
    if (!range) continue
    const [a, b] = range.split("-").map(Number)
    for (let n = a; n <= b; n++) {
      const s = String(n)
      const len = s.length
      if (len % 2 !== 0) continue
      const half = len / 2
      if (s.slice(0, half) === s.slice(half)) sum += n
    }
  }
}

writeAnswer(sum, import.meta.url)