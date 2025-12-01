#!/usr/bin/env bun
// create a new day's folder and template files for Advent of Code 2025 challenges

import { mkdir, writeFile } from "node:fs/promises"

const day = process.argv[2]
if (!day) {
  console.log("usage: bun newday <day>")
  process.exit(1)
}

const d = day.padStart(2, "0")
const dir = `./${d}`

await mkdir(dir, { recursive: true })
await writeFile(`${dir}/${d}.in`, "")

const part1 =
`// Advent of Code 2025, Day ${d}, Part 1: Name
// https://adventofcode.com/2025/day/${+d}

import { readInput, writeAnswer } from "../functions"
const s = {}

for (const line of await readInput(import.meta.url)) {

}

writeAnswer(0, import.meta.url)
`

const part2 =
`// Advent of Code 2025, Day ${d}, Part 2: Name
// https://adventofcode.com/2025/day/${+d}

import { readInput, writeAnswer } from "../functions"
const s = {}

for (const line of await readInput(import.meta.url)) {

}

writeAnswer(0, import.meta.url)
`

await writeFile(`${dir}/part1.ts`, part1)
await writeFile(`${dir}/part2.ts`, part2)

console.log("Created", d)