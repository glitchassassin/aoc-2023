import type { MetaFunction } from "@remix-run/react";
import { PuzzleLayout, PuzzleSection } from "~/components/PuzzleLayout";
import { part1Example, puzzleInput } from "~/solutions/day7/inputs";
import ProblemStatement1 from "~/solutions/day7/problemStatement1.md";
import ProblemStatement2 from "~/solutions/day7/problemStatement2.md";
import { ScoreHands, ScoreHandsWithJokers } from "~/solutions/day7/solution";

const DAY = 7;

export const meta: MetaFunction = () => {
  return [{ title: `AoC 2023 | Day ${DAY}` }];
};

export default function DisplayProblem() {
  return (
    <PuzzleLayout day={DAY} title="Camel Cards">
      <h3 className="pt-3 pb-2">Part One</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement1 />}
        testImplementation={<ScoreHands hands={part1Example} expected={6440} />}
        solution={<ScoreHands hands={puzzleInput} />}
      />
      <h3 className="pt-3 pb-2">Part Two</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement2 />}
        testImplementation={
          <ScoreHandsWithJokers hands={part1Example} expected={5905} />
        }
        solution={<ScoreHandsWithJokers hands={puzzleInput} />}
      />
    </PuzzleLayout>
  );
}
