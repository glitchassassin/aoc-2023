import type { MetaFunction } from "@remix-run/react";
import { PuzzleLayout, PuzzleSection } from "~/components/PuzzleLayout";
import {
  part1Example1,
  part1Example2,
  part2Example1,
  part2Example2,
  part2Example3,
  part2Example4,
  puzzleInput,
} from "~/solutions/day10/inputs";
import ProblemStatement1 from "~/solutions/day10/problemStatement1.md";
import ProblemStatement2 from "~/solutions/day10/problemStatement2.md";
import { VisualizeBounds, VisualizePipes } from "~/solutions/day10/solutions";

const DAY = 10;

export const meta: MetaFunction = () => {
  return [{ title: `AoC 2023 | Day ${DAY}` }];
};

export default function DisplayProblem() {
  return (
    <PuzzleLayout day={DAY} title="Pipe Maze">
      <h3 className="pt-3 pb-2">Part One</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement1 />}
        testImplementation={
          <>
            <VisualizePipes pipeMap={part1Example1} expected={4} />
            <VisualizePipes pipeMap={part1Example2} expected={8} />
          </>
        }
        solution={
          <>
            <VisualizePipes pipeMap={puzzleInput} />
          </>
        }
      />
      <h3 className="pt-3 pb-2">Part Two</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement2 />}
        testImplementation={
          <>
            <VisualizeBounds pipeMap={part2Example1} expected={4} />
            <VisualizeBounds pipeMap={part2Example2} expected={4} />
            <VisualizeBounds pipeMap={part2Example3} expected={8} />
            <VisualizeBounds pipeMap={part2Example4} expected={10} />
          </>
        }
        solution={
          <>
            <VisualizeBounds pipeMap={puzzleInput} />
          </>
        }
      />
    </PuzzleLayout>
  );
}
