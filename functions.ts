import chalk from "chalk"

// write final answer with full metadata
export const writeAnswer = (value: unknown, url: string) => {
  const full = url.replace("file://", "")
  const parts = full.split("/")
  const file = parts.pop()!
  const sub = parts.pop()!
  const folder = parts.pop()!

  const year = folder
  const day = sub
  const part = file.replace(".ts", "").replace("part", "")

  console.log(
    chalk.blue("Advent of Code") + " " +
    chalk.yellow(year) + ", " +
    chalk.cyan("Day") + " " +
    chalk.magenta(day) + ", " +
    chalk.green("Part") + " " +
    chalk.red(part) + ": " +
    chalk.bold.white(String(value))
  )
}

export const readInput = async (url: string) =>
  (await Bun.file(url.replace(".ts", ".in")).text()).trim().split(/\r?\n/)

export const toNumbers = (a: string[]) => a.map(Number)

export const sum = (n: number[]) => n.reduce((a, b) => a + b, 0)

export const range = (n: number) => [...Array(n).keys()]

export const get = (g: string[], x: number, y: number) =>
  g[y]?.[x] ?? null

export const neighbors4 = (x: number, y: number) =>
  [[x+1,y],[x-1,y],[x,y+1],[x,y-1]]

export const time = <T>(label: string, fn: () => T) => {
  const t = performance.now()
  const v = fn()
  console.log(label, (performance.now() - t).toFixed(2) + "ms")
  return v
}

export const filePathFromMeta = (url: string, ext: string) =>
  url.replace(".ts", ext).replace("file://", "")
