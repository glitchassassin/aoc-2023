import classNames from "classnames";
import { DataBlock } from "~/components/DataBlock";
import { Solution } from "~/components/Solution";
import { SolutionTest } from "~/components/SolutionTest";

export const RenderSchematic = ({ schematic }: { schematic: string[][] }) => {
  return (
    <pre
      className="ps-3 border-start border-5 border-light"
      style={{ maxHeight: "300px" }}
    >
      {schematic.map((line) => line.join("")).join("\n")}
    </pre>
  );
};

type Coord = { x: number; y: number };
function* coords(matrix: string[][]): Generator<Coord> {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      yield { x, y };
    }
  }
}
function* neighbors(coord: Coord) {
  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      if (x === 0 && y === 0) continue;
      yield { x: coord.x + x, y: coord.y + y };
    }
  }
}
function* numberNeighbors(coord: Coord) {
  for (let x = -1; x <= 1; x++) {
    if (x === 0) continue;
    yield { x: coord.x + x, y: coord.y };
  }
}
function partCoords(schematic: string[][]): {
  parts: Set<string>;
  symbolNeighbors: Set<string>;
} {
  // Calculate the coordinates that represent parts.
  const parts = new Set<string>();
  const symbolNeighbors = new Set<string>();
  function markNeighborsAsParts(coord: Coord) {
    for (const neighbor of numberNeighbors(coord)) {
      const key = JSON.stringify(neighbor);
      if (!parts.has(key) && schematic[neighbor.y]?.[neighbor.x]?.match(/\d/)) {
        parts.add(key);
        markNeighborsAsParts(neighbor);
      }
    }
  }
  // Iterate through `coords(schematic)` to find symbols (not a digit or a period).
  for (const { x, y } of coords(schematic)) {
    if (!schematic[y][x].match(/(\d|\.)/)) {
      // Found a symbol. For each neighboring digit that isn't already a part, mark it as a part and repeat.
      for (const neighbor of neighbors({ x, y })) {
        symbolNeighbors.add(JSON.stringify(neighbor));
        if (schematic[neighbor.y]?.[neighbor.x]?.match(/\d/)) {
          parts.add(JSON.stringify(neighbor));
          markNeighborsAsParts(neighbor);
        }
      }
    }
  }
  return { parts, symbolNeighbors };
}

export const RenderSchematicHighlightParts = ({
  schematic,
}: {
  schematic: string[][];
}) => {
  const { parts, symbolNeighbors } = partCoords(schematic);
  return (
    <pre
      className="ps-3 border-start border-5 border-light"
      style={{ maxHeight: "300px" }}
    >
      {schematic.map((line, y) => (
        <div key={y}>
          {line.map((cell, x) => (
            <span
              key={x}
              className={classNames({
                "text-success": parts.has(JSON.stringify({ x, y })),
                "text-decoration-underline": symbolNeighbors.has(
                  JSON.stringify({ x, y })
                ),
              })}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
};

export const SumSchematicParts = ({
  schematic,
  expected,
}: {
  schematic: string[][];
  expected?: number;
}) => {
  const { parts } = partCoords(schematic);

  let partsList = [];

  let currentNumber = "";
  for (const { x, y } of coords(schematic)) {
    if (schematic[y][x].match(/\d/) && parts.has(JSON.stringify({ x, y }))) {
      currentNumber += schematic[y][x];
    } else if (currentNumber.length) {
      partsList.push(parseInt(currentNumber));
      currentNumber = "";
    }
  }

  return (
    <>
      <DataBlock wrap>Parts: {partsList.join(" + ")}</DataBlock>
      {expected === undefined && (
        <Solution result={partsList.reduce((a, b) => a + b, 0)} />
      )}
      {expected !== undefined && (
        <SolutionTest
          result={partsList.reduce((a, b) => a + b, 0)}
          expected={expected}
        />
      )}
    </>
  );
};

function gearRatio(schematic: string[][], coord: Coord) {
  // get connected digits
  const digits: Coord[] = [];
  function addNumberNeighbors(coord: Coord) {
    for (const neighbor of numberNeighbors(coord)) {
      if (
        schematic[neighbor.y]?.[neighbor.x]?.match(/\d/) &&
        !digits.some((c) => c.x === neighbor.x && c.y === neighbor.y)
      ) {
        digits.push(neighbor);
        addNumberNeighbors(neighbor);
      }
    }
  }
  for (const neighbor of neighbors(coord)) {
    if (
      schematic[neighbor.y]?.[neighbor.x]?.match(/\d/) &&
      !digits.some((c) => c.x === neighbor.x && c.y === neighbor.y)
    ) {
      digits.push(neighbor);
      addNumberNeighbors(neighbor);
    }
  }

  // parse numbers
  const numbers: number[] = [];
  let number = "";
  for (
    let y = Math.min(...digits.map(({ y }) => y));
    y <= Math.max(...digits.map(({ y }) => y));
    y++
  ) {
    for (
      let x = Math.min(...digits.map(({ x }) => x));
      x <= Math.max(...digits.map(({ x }) => x));
      x++
    ) {
      if (digits.some((d) => d.x === x && d.y === y)) {
        number += schematic[y][x];
      } else if (number.length) {
        numbers.push(parseInt(number));
        number = "";
      }
    }
    if (number.length) {
      numbers.push(parseInt(number));
      number = "";
    }
  }

  const ratio = numbers.length === 2 ? numbers[0] * numbers[1] : undefined;

  return {
    digits,
    ratio,
    calculation: `${numbers.join(" * ")} = ${ratio}`,
  };
}

function gears(schematic: string[][]) {
  const asterisks: (Coord & { calculation: string })[] = [];
  const gearNumbers: Coord[] = [];
  const nonGearNumbers: Coord[] = [];
  let total = 0;
  for (const coord of coords(schematic)) {
    if (schematic[coord.y]?.[coord.x] === "*") {
      // found a gear
      const { digits, ratio, calculation } = gearRatio(schematic, coord);
      asterisks.push({ ...coord, calculation });
      if (ratio) {
        gearNumbers.push(...digits);
        total += ratio;
      } else {
        nonGearNumbers.push(...digits);
      }
    }
  }
  return {
    asterisks,
    gearNumbers,
    nonGearNumbers,
    total,
  };
}

export const RenderSchematicHighlightGears = ({
  schematic,
}: {
  schematic: string[][];
}) => {
  const { asterisks, gearNumbers, nonGearNumbers } = gears(schematic);
  return (
    <pre
      className="ps-3 border-start border-5 border-light"
      style={{ maxHeight: "300px" }}
    >
      {schematic.map((line, y) => (
        <div key={y}>
          {line.map((cell, x) => (
            <span
              key={x}
              title={asterisks.find((n) => n.x === x && n.y === y)?.calculation}
              className={classNames({
                "text-success": gearNumbers.some((n) => n.x === x && n.y === y),
                "text-danger": asterisks.some((n) => n.x === x && n.y === y),
                "text-warning": nonGearNumbers.some(
                  (n) => n.x === x && n.y === y
                ),
              })}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
};

export const SumGearRatios = ({
  schematic,
  expected,
}: {
  schematic: string[][];
  expected?: number;
}) => {
  const { total } = gears(schematic);

  return (
    <>
      {expected !== undefined && (
        <SolutionTest result={total} expected={expected} />
      )}
      {expected === undefined && <Solution result={total} />}
    </>
  );
};
