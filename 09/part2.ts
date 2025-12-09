// Advent of Code 2025, Day 09, Part 2: Movie Theater
// https://adventofcode.com/2025/day/9

import { readInput, writeAnswer, toNumbers } from "../helpers/functions";

interface P { x: number, y: number }

const lines = await readInput(import.meta.url);

const poly: P[] = lines.map(l => {
  const [x, y] = toNumbers(l.split(","));
  return { x, y };
});

function onSeg(p: P, a: P, b: P): boolean {
  if (a.x === b.x) return p.x === a.x && p.y >= Math.min(a.y, b.y) && p.y <= Math.max(a.y, b.y);
  if (a.y === b.y) return p.y === a.y && p.x >= Math.min(a.x, b.x) && p.x <= Math.max(a.x, b.x);
  return false;
}

function onPoly(p: P): boolean {
  return poly.some((a, i) => onSeg(p, a, poly[(i + 1) % poly.length]));
}

function inside(p: P): boolean {
  if (onPoly(p)) return true;
  let c = 0;
  for (let i = 0; i < poly.length; i++) {
    const a = poly[i], b = poly[(i + 1) % poly.length];
    if ((a.y > p.y) !== (b.y > p.y)) {
      const x = a.x + (b.x - a.x) * (p.y - a.y) / (b.y - a.y);
      if (p.x < x) c++;
    }
  }
  return (c & 1) === 1;
}

function rectInside(a: P, b: P): boolean {
  const x1 = Math.min(a.x, b.x), x2 = Math.max(a.x, b.x);
  const y1 = Math.min(a.y, b.y), y2 = Math.max(a.y, b.y);
  const mx = (x1 + x2) >> 1, my = (y1 + y2) >> 1;

  const corners: P[] = [
    { x: x1, y: y1 }, { x: x1, y: y2 },
    { x: x2, y: y1 }, { x: x2, y: y2 }
  ];
  if (!corners.every(inside)) return false;

  for (let i = 0; i < poly.length; i++) {
    const A = poly[i], B = poly[(i + 1) % poly.length];
    if (A.x === B.x) {
      const ex = A.x, lo = Math.min(A.y, B.y), hi = Math.max(A.y, B.y);
      if (ex > x1 && ex < x2 && hi > y1 && lo < y2) return false;
    } else if (A.y === B.y) {
      const ey = A.y, lo = Math.min(A.x, B.x), hi = Math.max(A.x, B.x);
      if (ey > y1 && ey < y2 && hi > x1 && lo < x2) return false;
    }
  }

  const xs = [...new Set(poly.filter(v => v.x >= x1 && v.x <= x2).map(v => v.x).concat([x1, x2, mx]))];
  const ys = [...new Set(poly.filter(v => v.y >= y1 && v.y <= y2).map(v => v.y).concat([y1, y2, my]))];

  return (
    ys.every(y =>
      inside({ x: x1, y }) &&
      inside({ x: x2, y }) &&
      inside({ x: mx, y })
    ) &&
    xs.every(x =>
      inside({ x, y: y1 }) &&
      inside({ x, y: y2 }) &&
      inside({ x, y: my })
    )
  );
}

let best = 0n;

for (let i = 0; i < poly.length; i++) {
  for (let j = i + 1; j < poly.length; j++) {
    if (rectInside(poly[i], poly[j])) {
      const dx = BigInt(Math.abs(poly[i].x - poly[j].x) + 1);
      const dy = BigInt(Math.abs(poly[i].y - poly[j].y) + 1);
      const area = dx * dy;
      if (area > best) best = area;
    }
  }
}

writeAnswer(best.toString(), import.meta.url);