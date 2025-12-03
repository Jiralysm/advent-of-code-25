// Advent of Code 2025, Day 3, Part 2: Lobby
// https://adventofcode.com/2025/day/3

import { readInput, writeAnswer } from "../helpers/functions"

let sum = 0

for (const line of await readInput(import.meta.url)) {
  let need = 12
  let i = 0
  let out = ""

  while (need > 0) {
    const remain = line.length - i
    const windowEnd = line.length - (need - 1)
    let bestDigit = -1
    let bestIndex = i

    for (let j = i; j < windowEnd; j++) {
      const d = line.charCodeAt(j) - 48
      if (d > bestDigit) {
        bestDigit = d
        bestIndex = j
        if (d === 9) break
      }
    }

    out += String(bestDigit)
    i = bestIndex + 1
    need--
  }

  sum += Number(out)
}

writeAnswer(sum, import.meta.url)