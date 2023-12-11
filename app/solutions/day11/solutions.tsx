import { DataBlock } from "~/components/DataBlock";
import { SolutionTest } from "~/components/SolutionTest";

interface Coord {
  x: number;
  y: number;
}

function manhattanDistance(c1: Coord, c2: Coord) {
  return Math.abs(c1.x - c2.x) + Math.abs(c1.y - c2.y);
}
function manhattanDistanceWithExpansion(
  c1: Coord,
  c2: Coord,
  rows: number[],
  columns: number[],
  factor: number
) {
  const expandedColumns =
    columns.filter((r) => r > Math.min(c1.x, c2.x) && r < Math.max(c1.x, c2.x))
      .length *
    (factor - 1);
  const expandedRows =
    rows.filter((c) => c > Math.min(c1.y, c2.y) && c < Math.max(c1.y, c2.y))
      .length *
    (factor - 1);

  return (
    Math.abs(c1.x - c2.x) +
    expandedColumns +
    (Math.abs(c1.y - c2.y) + expandedRows)
  );
}

function parse(universe: string) {
  return universe.split("\n").map((l) => l.split(""));
}

function expand(universe: string[][]) {
  // expand vertically
  let universeMap = universe.flatMap((row) =>
    row.every((p) => p === ".") ? [row, row] : [row]
  );
  // transpose
  universeMap = universeMap[0].map((_, i) => universeMap.map((row) => row[i]));
  // expand vertically
  universeMap = universeMap.flatMap((row) =>
    row.every((p) => p === ".") ? [row, row] : [row]
  );
  // transpose back
  universeMap = universeMap[0].map((_, i) => universeMap.map((row) => row[i]));

  return universeMap;
}

function expansionCoords(universe: string[][]) {
  const rows = universe.reduce(
    (acc, row, index) => (row.every((p) => p === ".") ? [...acc, index] : acc),
    [] as number[]
  );
  const columns = universe[0].reduce(
    (acc, _, index) =>
      universe.every((row) => row[index] === ".") ? [...acc, index] : acc,
    [] as number[]
  );

  return { rows, columns };
}

function findGalaxies(universe: string[][]): Coord[] {
  const galaxies: Coord[] = [];
  universe.forEach((row, y) =>
    row.forEach((g, x) => {
      if (g === "#") galaxies.push({ x, y });
    })
  );
  return galaxies;
}

function* combinations(length: number): Generator<[number, number]> {
  for (let i = 0; i < length - 1; i++) {
    for (let j = i + 1; j < length; j++) {
      yield [i, j];
    }
  }
}

export function VisualizeUniverse({
  universe,
  expected,
}: {
  universe: string;
  expected?: number;
}) {
  let distance = 0;
  const galaxies = findGalaxies(expand(parse(universe)));
  for (const [from, to] of combinations(galaxies.length)) {
    distance += manhattanDistance(galaxies[from], galaxies[to]);
  }
  return (
    <>
      <DataBlock>
        {expand(parse(universe))
          .map((row) => row.join(""))
          .join("\n")}
      </DataBlock>
      <SolutionTest result={distance} expected={expected} />
    </>
  );
}

export function VisualizeOldUniverse({
  universe,
  expansion,
  expected,
}: {
  universe: string;
  expansion: number;
  expected?: number;
}) {
  let distance = 0;
  const galaxies = findGalaxies(parse(universe));
  const { rows, columns } = expansionCoords(parse(universe));
  for (const [from, to] of combinations(galaxies.length)) {
    distance += manhattanDistanceWithExpansion(
      galaxies[from],
      galaxies[to],
      rows,
      columns,
      expansion
    );
  }
  return (
    <>
      <SolutionTest result={distance} expected={expected} />
    </>
  );
}
