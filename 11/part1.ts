// Advent of Code 2025, Day 11, Part 1: Reactor
// https://adventofcode.com/2025/day/11

import { readInput, writeAnswer } from "../helpers/functions";

const lines = await readInput(import.meta.url);
const g = new Map<string, string[]>();

for (const line of lines) {
  const [left, right] = line.split(": ");
  g.set(left, right.split(" "));
}

const memo = new Map<string, number>();

function dfs(u: string): number {
  if (memo.has(u)) return memo.get(u)!;
  if (u === "out") return 1;
  const next = g.get(u) || [];
  let sum = 0;
  for (const v of next) sum += dfs(v);
  memo.set(u, sum);
  return sum;
}

writeAnswer(dfs("you"), import.meta.url);