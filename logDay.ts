#!/usr/bin/env bun

import { mkdir, writeFile, readFile } from "node:fs/promises"

const dayNum = process.argv[2]
const dayName = process.argv[3]
const stars = process.argv[4]

if (!dayNum || !dayName || !stars) {
  console.log("usage: bun logDay <day_num> <day_name> <stars_count>")
  process.exit(1)
}

const d = dayNum.padStart(2, "0")
const entry = `| [Day ${d}: ${dayName}](https://adventofcode.com/2025/day/${+d}) | [2025/${d}](https://github.com/Jiralysm/advent-of-code-25/tree/main/${d}) | ${"⭐".repeat(Number(stars))} |`

let readme = ""
try {
  readme = await readFile("README.md", "utf8")
} catch {}

await writeFile("README.md", readme + "\n" + entry)

console.log("Logged", d)