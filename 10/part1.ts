// Advent of Code 2025, Day 10, Part 1: Factory
// https://adventofcode.com/2025/day/10

import { readInput, writeAnswer } from "../helpers/functions";

const lines = await readInput(import.meta.url);

function parse(line: string) {
  const t = [...line.match(/\[([.#]+)\]/)![1]].map(c => c === "#" ? 1 : 0);
  const btn = [...line.matchAll(/\(([^)]*)\)/g)].map(m =>
    m[1] ? m[1].split(",").map(Number) : []
  );
  return { t, btn };
}

function solve(t: number[], btn: number[][]) {
  const n = t.length, m = btn.length;

  const A = Array.from({ length: n }, () => Array(m).fill(0));
  const b = t.slice();

  for (let j = 0; j < m; j++)
    for (const k of btn[j]) A[k][j] ^= 1;

  const piv = Array(m).fill(-1);
  let r = 0;

  for (let c = 0; c < m && r < n; c++) {
    let s = -1;
    for (let i = r; i < n; i++) if (A[i][c]) { s = i; break; }
    if (s < 0) continue;

    [A[r], A[s]] = [A[s], A[r]];
    [b[r], b[s]] = [b[s], b[r]];
    piv[c] = r;

    for (let i = r + 1; i < n; i++)
      if (A[i][c]) {
        for (let j = c; j < m; j++) A[i][j] ^= A[r][j];
        b[i] ^= b[r];
      }

    r++;
  }

  const free = [];
  for (let c = 0; c < m; c++) if (piv[c] === -1) free.push(c);

  let best = Infinity;
  const F = free.length;
  const LIMIT = 18;
  const end = F <= LIMIT ? 1 << F : 1;

  for (let mask = 0; mask < end; mask++) {
    const x = Array(m).fill(0);

    for (let i = 0; i < F; i++)
      if ((mask >> i) & 1) x[free[i]] = 1;

    for (let c = m - 1; c >= 0; c--) {
      const pr = piv[c];
      if (pr < 0) continue;

      let s = b[pr];
      for (let j = c + 1; j < m; j++) s ^= A[pr][j] & x[j];
      x[c] = s;
    }

    let cost = 0;
    for (let j = 0; j < m; j++) cost += x[j];
    if (cost < best) best = cost;
  }

  return best;
}

let total = 0;
for (const line of lines) {
  const { t, btn } = parse(line);
  total += solve(t, btn);
}

writeAnswer(total, import.meta.url);