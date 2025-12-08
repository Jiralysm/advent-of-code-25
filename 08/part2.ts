// Advent of Code 2025, Day 08, Part 2: Playground
// https://adventofcode.com/2025/day/8

import { readInput, writeAnswer } from "../helpers/functions";

const lines = await readInput(import.meta.url);

const pts: [number, number, number][] = [];

for (const s of lines) {
  const a = s.split(",").map(Number);
  pts.push([a[0], a[1], a[2]]);
}

const n = pts.length;

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
    edges.push({ d, i, j });
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

function unite(a: number, b: number): boolean {
  a = find(a);
  b = find(b);
  if (a === b) return false;
  if (size[a] < size[b]) {
    parent[a] = b;
    size[b] += size[a];
  } else {
    parent[b] = a;
    size[a] += size[b];
  }
  return true;
}

let comps = n;
let last = 0;

for (const e of edges) {
  if (unite(e.i, e.j)) {
    comps--;
    last = edges.indexOf(e);
    if (comps === 1) break;
  }
}

const f = edges[last];
const ans = pts[f.i][0] * pts[f.j][0];

writeAnswer(ans, import.meta.url);