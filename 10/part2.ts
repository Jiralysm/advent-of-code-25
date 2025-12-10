// Advent of Code 2025, Day 10, Part 2: Factory
// https://adventofcode.com/2025/day/10

import { readInput, writeAnswer } from "../helpers/functions";

const lines = await readInput(import.meta.url);
const EPS = 1e-9;

let total = 0;

for (const line of lines) {
  const req = line
    .match(/\{([^}]*)\}/)![1]
    .split(",")
    .map(Number);

  const m = req.length;

  const rawButtons = [...line.matchAll(/\(([^)]*)\)/g)].map((m) =>
    m[1] === "" ? [] : m[1].split(",").map(Number)
  );

  const k = rawButtons.length;

  const A0: number[][] = Array.from({ length: m }, () => Array(k).fill(0));
  for (let j = 0; j < k; j++) {
    for (const idx of rawButtons[j]) {
      if (idx >= 0 && idx < m) A0[idx][j] = 1;
    }
  }

  const b0 = req.slice();
  const A = A0.map((r) => r.slice());
  const b = b0.slice();

  const pivotCols: number[] = [];
  let row = 0;

  for (let col = 0; col < k && row < m; col++) {
    let best = row;
    for (let r = row; r < m; r++) {
      if (Math.abs(A[r][col]) > Math.abs(A[best][col])) best = r;
    }
    if (Math.abs(A[best][col]) < EPS) continue;

    [A[row], A[best]] = [A[best], A[row]];
    [b[row], b[best]] = [b[best], b[row]];

    const pv = A[row][col];
    for (let j = col; j < k; j++) A[row][j] /= pv;
    b[row] /= pv;

    for (let r = 0; r < m; r++) {
      if (r === row) continue;
      const f = A[r][col];
      if (Math.abs(f) < EPS) continue;
      for (let j = col; j < k; j++) A[r][j] -= f * A[row][j];
      b[r] -= f * b[row];
    }

    pivotCols.push(col);
    row++;
  }

  const isPivot = Array(k).fill(false);
  for (const c of pivotCols) isPivot[c] = true;

  const freeCols: number[] = [];
  for (let j = 0; j < k; j++) {
    if (isPivot[j]) continue;
    let used = false;
    for (let i = 0; i < m; i++) if (A0[i][j] !== 0) used = true;
    if (used) freeCols.push(j);
  }

  const f = freeCols.length;

  const bounds: number[] = [];
  for (let idx = 0; idx < f; idx++) {
    const col = freeCols[idx];
    let minB = Infinity;
    for (let i = 0; i < m; i++) {
      if (A0[i][col] === 1 && b0[i] < minB) minB = b0[i];
    }
    bounds.push(minB === Infinity ? 0 : minB);
  }

  const order = [...Array(f).keys()].sort((i, j) => bounds[i] - bounds[j]);
  const freeOrdered = order.map((i) => freeCols[i]);
  const boundsOrdered = order.map((i) => bounds[i]);

  let best = Infinity;
  const x = Array(k).fill(0);

  function solveWithFree() {
    for (let j = 0; j < pivotCols.length; j++) {
      const col = pivotCols[j];
      let val = b[j];
      for (let t = 0; t < f; t++) {
        const c = freeOrdered[t];
        const coef = A[j][c];
        if (Math.abs(coef) > EPS) val -= coef * x[c];
      }
      const iv = Math.round(val);
      if (iv < 0) return false;
      x[col] = iv;
    }

    let sumPress = 0;
    for (let j = 0; j < k; j++) sumPress += x[j];
    if (sumPress < best) best = sumPress;
    return true;
  }

  function dfs(idx: number, curSum: number) {
    if (curSum >= best) return;
    if (idx === f) {
      solveWithFree();
      return;
    }
    const col = freeOrdered[idx];
    const maxV = boundsOrdered[idx];
    for (let v = 0; v <= maxV; v++) {
      x[col] = v;
      dfs(idx + 1, curSum + v);
    }
  }

  if (f === 0) {
    solveWithFree();
  } else {
    dfs(0, 0);
  }

  total += best;
}

writeAnswer(total, import.meta.url);
