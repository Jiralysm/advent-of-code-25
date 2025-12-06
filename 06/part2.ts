// Advent of Code 2025, Day 06, Part 2: Trash Compactor
// https://adventofcode.com/2025/day/6

import { readInput, writeAnswer } from "../helpers/functions";
const g = await readInput(import.meta.url);

const h = g.length;
const w = g[0].length;

let total = 0;
let x = 0;

while (x < w) {
  let empty = true;
  for (let y = 0; y < h; y++) {
    if (g[y][x] !== " ") {
      empty = false;
      break;
    }
  }

  if (empty) {
    x++;
    continue;
  }

  const cols: number[] = [];

  while (x < w) {
    let blank = true;
    for (let y = 0; y < h; y++) {
      if (g[y][x] !== " ") {
        blank = false;
        break;
      }
    }
    if (blank) break;

    cols.push(x);
    x++;
  }

  const nums: number[] = [];
  let op: string | null = null;
  const bottom = h - 1;

  for (const cx of cols) {
    const c = g[bottom][cx];
    if (c === "+" || c === "*") {
      op = c;
      break;
    }
  }

  for (const cx of cols) {
    let s = "";
    for (let y = 0; y < bottom; y++) {
      const c = g[y][cx];
      if (c >= "0" && c <= "9") s += c;
    }
    if (s !== "") nums.push(Number(s));
  }

  let res = op === "+" ? 0 : 1;

  for (const n of nums) {
    if (op === "+") res += n;
    else res *= n;
  }

  total += res;
}

writeAnswer(total, import.meta.url);