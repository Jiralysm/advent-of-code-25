// Advent of Code 2025, Day 3, Part 1: Lobby
// https://adventofcode.com/2025/day/3

import { readInput, writeAnswer } from "../helpers/functions"

let sum = 0

for (const line of await readInput(import.meta.url)) {
  let best = 0
  let bestRight = -1

  for (let i = line.length - 1; i >= 0; i--) {
    const d = line.charCodeAt(i) - 48
    if (bestRight >= 0) {
      const val = d * 10 + bestRight
      if (val > best) best = val
    }
    if (d > bestRight) bestRight = d
  }

  sum += best
}

writeAnswer(sum, import.meta.url)