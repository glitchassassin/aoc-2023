import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import {
  RenderSchematic,
  RenderSchematicHighlightGears,
  RenderSchematicHighlightParts,
  SumGearRatios,
  SumSchematicParts,
} from "~/solutions/day3/RenderSchematic";
import { part1Example, puzzleInput } from "~/solutions/day3/inputs";

export const meta: MetaFunction = () => {
  return [{ title: "AoC 2023 | Day 3" }];
};

export default function Day3() {
  return (
    <>
      <h2>Day 3: Gear Ratios</h2>
      <p>
        <Link className="link-light" to="https://adventofcode.com/2023/day/3">
          Original
        </Link>
      </p>
      <h3 className="pt-3 pb-2">Part One</h3>
      <h4 className="pt-3 pb-2">Problem Statement</h4>
      <p>
        The engineer explains that an engine part seems to be missing from the
        engine, but nobody can figure out which one. If you can add up all the
        part numbers in the engine schematic, it should be easy to work out
        which part is missing.
      </p>

      <p>
        The engine schematic (your puzzle input) consists of a visual
        representation of the engine. There are lots of numbers and symbols you
        don't really understand, but apparently any number adjacent to a symbol,
        even diagonally, is a "part number" and should be included in your sum.
        (Periods (.) do not count as a symbol.)
      </p>

      <p>Here is an example engine schematic:</p>

      <RenderSchematic schematic={part1Example} />

      <p>
        In this schematic, two numbers are <strong>not</strong> part numbers
        because they are not adjacent to a symbol: <code>114</code> (top right)
        and <code>58</code> (middle right). Every other number is adjacent to a
        symbol and so <strong>is</strong> a part number; their sum is{" "}
        <strong>
          <code>4361</code>
        </strong>
        .
      </p>

      <p>
        Of course, the actual engine schematic is much larger.{" "}
        <strong>
          What is the sum of all of the part numbers in the engine schematic?
        </strong>
      </p>

      <h4 className="pt-3 pb-2">Test Implementation</h4>

      <RenderSchematicHighlightParts schematic={part1Example} />
      <SumSchematicParts schematic={part1Example} expected={4361} />

      <h4 className="pt-3 pb-2">Solution</h4>

      <RenderSchematicHighlightParts schematic={puzzleInput} />
      <SumSchematicParts schematic={puzzleInput} />

      <h3 className="pt-3 pb-2">Part Two</h3>
      <h4 className="pt-3 pb-2">Problem Statement</h4>

      <p>
        The missing part wasn't the only issue - one of the gears in the engine
        is wrong. A <strong>gear</strong> is any * symbol that is adjacent to{" "}
        <strong>exactly two part numbers.</strong> Its{" "}
        <strong>gear ratio</strong> is the result of multiplying those two
        numbers together.
      </p>

      <p>
        This time, you need to find the gear ratio of every gear and add them
        all up so that the engineer can figure out which gear needs to be
        replaced.
      </p>

      <p>Consider the same engine schematic again:</p>

      <RenderSchematic schematic={part1Example} />

      <p>
        In this schematic, there are <strong>two</strong> gears. The first is in
        the top left; it has part numbers <code>467</code> and <code>35</code>,
        so its gear ratio is <code>16345</code>. The second gear is in the lower
        right; its gear ratio is <code>451490</code>. (The * adjacent to{" "}
        <code>617</code> is <strong>not</strong> a gear because it is only
        adjacent to one part number.) Adding up all of the gear ratios produces{" "}
        <strong>
          <code>467835</code>
        </strong>
        .
      </p>

      <p>
        <strong>
          What is the sum of all of the gear ratios in your engine schematic?
        </strong>
      </p>

      <h4 className="pt-3 pb-2">Test Implementation</h4>

      <RenderSchematicHighlightGears schematic={part1Example} />
      <SumGearRatios schematic={part1Example} expected={467835} />

      <h4 className="pt-3 pb-2">Solution</h4>

      <RenderSchematicHighlightGears schematic={puzzleInput} />
      <SumGearRatios schematic={puzzleInput} />
    </>
  );
}
