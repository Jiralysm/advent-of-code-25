#!/usr/bin/env bun

import { readFile, writeFile } from "node:fs/promises"

const dayNum = process.argv[2]
const dayName = process.argv.slice(3, process.argv.length - 1).join(" ")
const stars = Number(process.argv[process.argv.length - 1])

if (!dayNum || !dayName || !stars) {
  console.log("usage: bun logDay <day_num> <day_name> <stars_count>")
  process.exit(1)
}

const d = dayNum.padStart(2, "0")
const entry =
  `| [Day ${d}: ${dayName}](https://adventofcode.com/2025/day/${+d}) | ` +
  `[2025/${d}](https://github.com/Jiralysm/advent-of-code-25/tree/main/${d}) | ` +
  `${"⭐".repeat(stars)} |`

let readme = await readFile("README.md", "utf8")

const totalStars = countTotalStars(readme) + stars

readme = updateBadge(readme, totalStars)

if (!readme.includes(entry)) {
  readme = readme.trimEnd() + "\n" + entry + "\n"
}

await writeFile("README.md", readme)

console.log("Logged", d)

/* --- */

function countTotalStars(md: string): number {
  const starMatches = md.match(/\|[^|]+\|[^|]+\|\s*(⭐+)\s*\|/g) || []
  let total = 0
  for (const row of starMatches) {
    const m = row.match(/(⭐+)/)
    if (m) total += m[1].length
  }
  return total
}

function updateBadge(md: string, totalStars: number): string {
  const encoded = `%E2%AD%90%20%20${totalStars}`

  return md.replace(
    /https:\/\/img\.shields\.io\/badge\/2025-[^?"]+/,
    `https://img.shields.io/badge/2025-${encoded}-gray`
  )
}
