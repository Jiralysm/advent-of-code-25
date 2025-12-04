// Advent of Code 2025, Day 04, Part 2: Printing Department
// https://adventofcode.com/2025/day/4

import { readInput, writeAnswer } from "../helpers/functions"

const lines = await readInput(import.meta.url)
const g = lines.map(l => l.split(""))

const h = g.length
const w = g[0].length

let removed = 0

while (true) {
    const rm: [number, number][] = []

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (g[y][x] !== "@") continue;

            let adj = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    let ny = y + dy;
                    let nx = x + dx;
                    if (ny < 0 || ny >= h || nx < 0 || nx >= w) continue;
                    if (g[ny][nx] === "@") adj++;
                }
            }

            if (adj < 4) rm.push([y, x])
        }
    }

    if (rm.length === 0) break;

    for (const [y, x] of rm) {
        g[y][x] = ".";
        removed++;
    }
}

writeAnswer(removed, import.meta.url);