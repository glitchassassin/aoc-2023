import type { MetaFunction } from "@remix-run/react";
import { PuzzleLayout, PuzzleSection } from "~/components/PuzzleLayout";
import { part1Example1, puzzleInput } from "~/solutions/day11/inputs";
import ProblemStatement1 from "~/solutions/day11/problemStatement1.md";
import ProblemStatement2 from "~/solutions/day11/problemStatement2.md";
import {
  VisualizeOldUniverse,
  VisualizeUniverse,
} from "~/solutions/day11/solutions";

const DAY = 11;

export const meta: MetaFunction = () => {
  return [{ title: `AoC 2023 | Day ${DAY}` }];
};

export default function DisplayProblem() {
  return (
    <PuzzleLayout day={DAY} title="Cosmic Expansion">
      <h3 className="pt-3 pb-2">Part One</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement1 />}
        testImplementation={
          <>
            <VisualizeUniverse universe={part1Example1} expected={374} />
          </>
        }
        solution={
          <>
            <VisualizeUniverse universe={puzzleInput} />
          </>
        }
      />
      <h3 className="pt-3 pb-2">Part Two</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement2 />}
        testImplementation={
          <>
            Expansion Factor: 1
            <VisualizeOldUniverse
              universe={part1Example1}
              expansion={2}
              expected={374}
            />
            Expansion Factor: 10
            <VisualizeOldUniverse
              universe={part1Example1}
              expansion={10}
              expected={1030}
            />
            Expansion Factor: 100
            <VisualizeOldUniverse
              universe={part1Example1}
              expansion={100}
              expected={8410}
            />
          </>
        }
        solution={
          <>
            <VisualizeOldUniverse universe={puzzleInput} expansion={1000000} />
          </>
        }
      />
    </PuzzleLayout>
  );
}
