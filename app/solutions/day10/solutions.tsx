import classNames from "classnames";
import { DataBlock } from "~/components/DataBlock";
import { SolutionTest } from "~/components/SolutionTest";

interface Coord {
  x: number;
  y: number;
}

interface Pipe {
  pos: Coord;
  neighbors: Coord[];
}

function toKey(pos: Coord): string {
  return `${pos.x}_${pos.y}`;
}
function fromKey(key: string): Coord {
  const [x, y] = key.split("_").map((n) => parseInt(n));
  return { x, y };
}

function north(pos: Coord): Coord {
  return { ...pos, y: pos.y - 1 };
}
function south(pos: Coord): Coord {
  return { ...pos, y: pos.y + 1 };
}
function east(pos: Coord): Coord {
  return { ...pos, x: pos.x + 1 };
}
function west(pos: Coord): Coord {
  return { ...pos, x: pos.x - 1 };
}
function eq(pos1: Coord, pos2: Coord): boolean {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

const PIPE_MAP: Record<string, (typeof north)[]> = {
  "|": [north, south],
  "-": [east, west],
  L: [north, east],
  J: [north, west],
  "7": [south, west],
  F: [south, east],
};
const UNICODE_MAP: Record<string, string> = {
  "|": "│",
  "-": "─",
  L: "└",
  J: "┘",
  "7": "┐",
  F: "┌",
  // ".": " ",
};

function parsePipes(map: string): { pipes: Map<string, Pipe>; start: string } {
  const pipes = new Map<string, Pipe>();
  let start: string | undefined;
  map.split("\n").forEach((line, y) => {
    line.split("").forEach((cell, x) => {
      const pos = { x, y };
      const key = toKey(pos);
      if (cell === "S") {
        start = key;
      }
      pipes.set(key, {
        pos,
        neighbors: PIPE_MAP[cell]?.map((fn) => fn(pos)) ?? [],
      });
    });
  });
  if (!start) throw new Error("Didn't find start");

  // attach start neighbors
  const startPos = fromKey(start);
  const startNeighbors = [north, south, east, west]
    .map((fn) => fn(startPos))
    .filter((key) =>
      pipes.get(toKey(key))?.neighbors.some((pos) => eq(pos, startPos))
    );

  const startPipe = pipes.get(start)!;
  startPipe.neighbors = startNeighbors;

  return {
    pipes,
    start,
  };
}

function walkDistances(pipes: Map<string, Pipe>, start: string) {
  const distances = new Map<string, number>();
  distances.set(start, 0);
  const frontier = [start];

  while (frontier.length) {
    const pos = frontier.shift();
    if (!pos) break;
    const neighbors = pipes.get(pos)?.neighbors ?? [];
    frontier.push(...neighbors.map(toKey).filter((p) => !distances.has(p)));

    const distance = (distances.get(pos) ?? 0) + 1;
    neighbors.forEach((n) =>
      distances.set(
        toKey(n),
        Math.min(distance, distances.get(toKey(n)) ?? Infinity)
      )
    );
  }

  return { distances, maxDistance: Math.max(...distances.values()) };
}

function leftSideTiles(c1: Coord, c2: Coord, c3: Coord): Coord[] {
  if (c1.y === c2.y && c2.y === c3.y && c1.x < c3.x) {
    // _ X _
    // 1 2 3
    // _ _ _
    return [north(c2)];
  } else if (c1.y === c2.y && c2.y < c3.y && c1.x < c3.x) {
    // _ X _
    // 1 2 X
    // _ 3 _
    return [north(c2), east(c2)];
  } else if (c1.x === c2.x && c2.x === c3.x && c1.y < c3.y) {
    // _ 1 _
    // _ 2 X
    // _ 3 _
    return [east(c2)];
  } else if (c1.x === c2.x && c2.x > c3.x && c1.y < c3.y) {
    // _ 1 _
    // 3 2 X
    // _ X _
    return [south(c2), east(c2)];
  } else if (c1.y === c2.y && c2.y === c3.y && c1.x > c3.x) {
    // _ _ _
    // 3 2 1
    // _ X _
    return [south(c2)];
  } else if (c1.y > c2.y && c2.y === c3.y && c2.x < c3.x) {
    // _ X _
    // X 2 3
    // _ 1 _
    return [north(c2), west(c2)];
  } else if (c1.x === c2.x && c2.x === c3.x && c1.y > c3.y) {
    // _ 3 _
    // X 2 _
    // _ 1 _
    return [west(c2)];
  } else if (c1.y === c2.y && c1.y < c3.y && c1.x < c2.x) {
    // _ X _
    // 1 2 X
    // _ 3 _
    return [north(c2), east(c2)];
  } else return [];
}

/**
 * Pick a direction and walk through the Pipes, tracking every empty
 * square on the left side of the current direction. For example, if
 * this tile is East of the last one, and the next one is West, the
 * left-hand
 */
function enclosedPipes(
  pipes: Map<string, Pipe>,
  connected: Map<string, number>,
  start: string,
  orientation: 0 | 1
) {
  const leftSide = new Set<string>();
  let c1 = fromKey(start);
  let c2 = pipes.get(toKey(c1))!.neighbors[orientation];
  let c3 = pipes.get(toKey(c2))!.neighbors.find((n) => !eq(n, c1))!;

  while (!eq(fromKey(start), c2)) {
    const left = leftSideTiles(c1, c2, c3);
    left
      .filter((c) => !connected.has(toKey(c)))
      .forEach((c) => leftSide.add(toKey(c)));
    c1 = c2;
    c2 = c3;
    c3 = pipes.get(toKey(c3))!.neighbors.find((n) => !eq(n, c1))!;
  }

  return leftSide;
}

function floodfill(
  pipes: Map<string, Pipe>,
  connected: Map<string, number>,
  starting: Set<string>
) {
  const frontier = [...starting];
  const visited = new Set();

  while (frontier.length) {
    const next = frontier.shift();
    if (!next) break;
    if (visited.has(next)) continue;
    visited.add(next);
    console.log(visited.size, next);
    const neighbors = [north, south, east, west]
      .map((fn) => fn(fromKey(next)))
      .map(toKey)
      .filter((n) => pipes.has(n) && !connected.has(n) && !visited.has(n));
    frontier.push(...neighbors);
  }

  return visited;
}

export function VisualizePipes({
  pipeMap,
  expected,
}: {
  pipeMap: string;
  expected?: number;
}) {
  const { pipes, start } = parsePipes(pipeMap);

  const { distances, maxDistance } = walkDistances(pipes, start);

  return (
    <>
      <DataBlock>
        {pipeMap.split("\n").map((line, y) => {
          return (
            <div key={y}>
              {line.split("").map((cell, x) => {
                const key = toKey({ x, y });
                return (
                  <span
                    title={distances.get(key)?.toFixed()}
                    className={classNames({
                      "text-danger": key === start,
                      "text-warning":
                        key !== start &&
                        distances.has(key) &&
                        distances.get(key) !== maxDistance,
                      "text-success":
                        key !== start && distances.get(key) === maxDistance,
                    })}
                    key={x}
                  >
                    {UNICODE_MAP[cell] ?? cell}
                  </span>
                );
              })}
            </div>
          );
        })}
      </DataBlock>
      <SolutionTest result={maxDistance} expected={expected} />
    </>
  );
}

export function VisualizeBounds({
  pipeMap,
  expected,
}: {
  pipeMap: string;
  expected?: number;
}) {
  const { pipes, start } = parsePipes(pipeMap);

  const { distances } = walkDistances(pipes, start);

  const leftSide = enclosedPipes(pipes, distances, start, 0);
  const rightSide = enclosedPipes(pipes, distances, start, 1);

  const leftArea = floodfill(pipes, distances, leftSide);
  const rightArea = floodfill(pipes, distances, rightSide);

  const outside = leftArea.has("0_0") ? leftArea : rightArea;
  const inside = leftArea.has("0_0") ? rightArea : leftArea;

  return (
    <>
      <DataBlock>
        {pipeMap.split("\n").map((line, y) => {
          return (
            <div key={y}>
              {line.split("").map((cell, x) => {
                const key = toKey({ x, y });
                return (
                  <span
                    title={distances.get(key)?.toFixed()}
                    className={classNames({
                      "text-danger": outside.has(key),
                      "text-warning": distances.has(key),
                      "text-success": inside.has(key),
                    })}
                    key={x}
                  >
                    {UNICODE_MAP[cell] ?? cell}
                  </span>
                );
              })}
            </div>
          );
        })}
      </DataBlock>
      <SolutionTest result={inside.size} expected={expected} />
    </>
  );
}
