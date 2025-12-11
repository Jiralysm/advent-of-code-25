// Advent of Code 2025, Day 11, Part 2: Reactor
// https://adventofcode.com/2025/day/11

import { readInput, writeAnswer } from "../helpers/functions";

const lines = await readInput(import.meta.url);
const g = new Map<string, string[]>();

for (const line of lines) {
  const [left, right] = line.split(": ");
  g.set(left, right.split(" "));
}

const memo = new Map<string, number>();

function key(u: string, d: number, f: number) {
  return u + "|" + d + "|" + f;
}

function dfs(u: string, haveD: number, haveF: number): number {
  if (u === "out") return haveD & haveF;
  const k = key(u, haveD, haveF);
  if (memo.has(k)) return memo.get(k)!;

  let nd = haveD | (u === "dac" ? 1 : 0);
  let nf = haveF | (u === "fft" ? 1 : 0);

  let sum = 0;
  for (const v of g.get(u) || []) sum += dfs(v, nd, nf);

  memo.set(k, sum);
  return sum;
}

writeAnswer(dfs("svr", 0, 0), import.meta.url);