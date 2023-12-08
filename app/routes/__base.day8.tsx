import type { MetaFunction } from "@remix-run/react";
import { DataBlock } from "~/components/DataBlock";
import { PuzzleLayout, PuzzleSection } from "~/components/PuzzleLayout";
import {
  part1example1,
  part1example2,
  part2example1,
  puzzleInput,
} from "~/solutions/day8/inputs";
import ProblemStatement1 from "~/solutions/day8/problemStatement1.mdx";
import ProblemStatement2 from "~/solutions/day8/problemStatement2.mdx";
import {
  NavigateMaps,
  NavigatePathPeriods,
  SimultaneousNavigateMaps,
} from "~/solutions/day8/solution";

const DAY = 8;

export const meta: MetaFunction = () => {
  return [{ title: `AoC 2023 | Day ${DAY}` }];
};

export default function DisplayProblem() {
  return (
    <PuzzleLayout day={DAY} title="Haunted Wasteland">
      <h3 className="pt-3 pb-2">Part One</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement1 />}
        testImplementation={
          <>
            <DataBlock>{part1example1}</DataBlock>
            <NavigateMaps maps={part1example1} expected={2} />
            <DataBlock>{part1example1}</DataBlock>
            <NavigateMaps maps={part1example2} expected={6} />
          </>
        }
        solution={<NavigateMaps maps={puzzleInput} />}
      />
      <h3 className="pt-3 pb-2">Part Two</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement2 />}
        testImplementation={
          <>
            <DataBlock>{part2example1}</DataBlock>
            <NavigatePathPeriods maps={part2example1} />
            <SimultaneousNavigateMaps maps={part2example1} expected={6} />
          </>
        }
        solution={
          <>
            <NavigatePathPeriods maps={puzzleInput} />
            <SimultaneousNavigateMaps maps={puzzleInput} />
          </>
        }
      />
    </PuzzleLayout>
  );
}
