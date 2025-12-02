// Advent of Code 2025, Day 2, Part 2: Gift Shop
// https://adventofcode.com/2025/day/2

import { readInput, writeAnswer } from "../helpers/functions"

let sum = 0

for (const line of await readInput(import.meta.url)) {
  for (const range of line.split(",")) {
    if (!range) continue
    const [a, b] = range.split("-").map(Number)

    for (let n = a; n <= b; n++) {
      const s = String(n)
      const L = s.length
      let bad = false

      for (let k = 1; k <= L / 2; k++) {
        if (L % k !== 0) continue
        const rep = s.slice(0, k)
        if (rep.repeat(L / k) === s) {
          bad = true
          break
        }
      }

      if (bad) sum += n
    }
  }
}

writeAnswer(sum, import.meta.url)