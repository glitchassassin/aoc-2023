import type { MetaFunction } from "@remix-run/react";
import { PuzzleLayout, PuzzleSection } from "~/components/PuzzleLayout";
import { part1Example, puzzleInput } from "~/solutions/day9/inputs";
import ProblemStatement1 from "~/solutions/day9/problemStatement1.md";
import ProblemStatement2 from "~/solutions/day9/problemStatement2.md";
import {
  SolveHistories,
  SolveHistoriesBackwards,
  VisualizeHistory,
  VisualizeHistoryBackwards,
} from "~/solutions/day9/solutions";

const DAY = 9;

export const meta: MetaFunction = () => {
  return [{ title: `AoC 2023 | Day ${DAY}` }];
};

export default function DisplayProblem() {
  return (
    <PuzzleLayout day={DAY} title="Mirage Maintenance">
      <h3 className="pt-3 pb-2">Part One</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement1 />}
        testImplementation={
          <>
            <VisualizeHistory history={part1Example[0]} expected={18} />
            <VisualizeHistory history={part1Example[1]} expected={28} />
            <VisualizeHistory history={part1Example[2]} expected={68} />
            Sum:
            <SolveHistories histories={part1Example} expected={114} />
          </>
        }
        solution={<SolveHistories histories={puzzleInput} />}
      />
      <h3 className="pt-3 pb-2">Part Two</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement2 />}
        testImplementation={
          <>
            <VisualizeHistoryBackwards
              history={part1Example[0]}
              expected={-3}
            />
            <VisualizeHistoryBackwards history={part1Example[1]} expected={0} />
            <VisualizeHistoryBackwards history={part1Example[2]} expected={5} />
            Sum:
            <SolveHistoriesBackwards histories={part1Example} expected={2} />
          </>
        }
        solution={<SolveHistoriesBackwards histories={puzzleInput} />}
      />
    </PuzzleLayout>
  );
}
