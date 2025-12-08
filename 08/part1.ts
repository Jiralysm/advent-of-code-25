// Advent of Code 2025, Day 08, Part 1: Playground
// https://adventofcode.com/2025/day/8

import { readInput, writeAnswer } from "../helpers/functions";

const lines = await readInput(import.meta.url);

const pts: [number, number, number][] = [];

for (const s of lines) {
  const a = s.split(",").map(Number);
  pts.push([a[0], a[1], a[2]]);
}

const n = pts.length;
const K = 1000;

type Edge = { d: number; i: number; j: number };
const edges: Edge[] = [];

for (let i = 0; i < n; i++) {
  const [x1, y1, z1] = pts[i];
  for (let j = i + 1; j < n; j++) {
    const [x2, y2, z2] = pts[j];
    const dx = x1 - x2;
    const dy = y1 - y2;
    const dz = z1 - z2;
    const d = dx * dx + dy * dy + dz * dz;

    if (edges.length < K) {
      edges.push({ d, i, j });
    } else {
      let maxI = 0;
      let maxD = edges[0].d;
      for (let k = 1; k < K; k++) {
        if (edges[k].d > maxD) {
          maxD = edges[k].d;
          maxI = k;
        }
      }
      if (d < maxD) edges[maxI] = { d, i, j };
    }
  }
}

edges.sort((a, b) => a.d - b.d);

const parent = new Array(n);
const size = new Array(n);

for (let i = 0; i < n; i++) {
  parent[i] = i;
  size[i] = 1;
}

function find(x: number): number {
  while (x !== parent[x]) x = parent[x];
  return x;
}

function unite(a: number, b: number) {
  a = find(a);
  b = find(b);
  if (a === b) return;
  if (size[a] < size[b]) {
    parent[a] = b;
    size[b] += size[a];
  } else {
    parent[b] = a;
    size[a] += size[b];
  }
}

for (let k = 0; k < K; k++) {
  const e = edges[k];
  unite(e.i, e.j);
}

const comp = new Map<number, number>();

for (let i = 0; i < n; i++) {
  const r = find(i);
  comp.set(r, (comp.get(r) || 0) + 1);
}

const arr = [...comp.values()].sort((a, b) => b - a);

const ans = arr[0] * arr[1] * arr[2];

writeAnswer(ans, import.meta.url);