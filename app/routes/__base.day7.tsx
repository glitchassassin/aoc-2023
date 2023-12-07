import { useLoaderData, type MetaFunction } from "@remix-run/react";
import fs from "node:fs/promises";
import Markdown from "react-markdown";
import { PuzzleLayout, PuzzleSection } from "~/components/PuzzleLayout";
import { part1Example, puzzleInput } from "~/solutions/day7/inputs";
import { ScoreHands, ScoreHandsWithJokers } from "~/solutions/day7/solution";

const DAY = 7;

export const meta: MetaFunction = () => {
  return [{ title: `AoC 2023 | Day ${DAY}` }];
};

export const loader = async () => {
  const [problemStatement1, problemStatement2] = await Promise.all(
    ["problemStatement1.md", "problemStatement2.md"].map((file) =>
      fs.readFile(`./app/solutions/day${DAY}/${file}`).then((f) => f.toString())
    )
  );
  return {
    problemStatement1,
    problemStatement2,
  };
};

export default function DisplayProblem() {
  const { problemStatement1, problemStatement2 } =
    useLoaderData<typeof loader>();
  return (
    <PuzzleLayout day={DAY} title="Camel Cards">
      <h3 className="pt-3 pb-2">Part One</h3>
      <PuzzleSection
        problemStatement={<Markdown>{problemStatement1}</Markdown>}
        testImplementation={<ScoreHands hands={part1Example} expected={6440} />}
        solution={<ScoreHands hands={puzzleInput} />}
      />
      <h3 className="pt-3 pb-2">Part Two</h3>
      <PuzzleSection
        problemStatement={<Markdown>{problemStatement2}</Markdown>}
        testImplementation={
          <ScoreHandsWithJokers hands={part1Example} expected={5905} />
        }
        solution={<ScoreHandsWithJokers hands={puzzleInput} />}
      />
    </PuzzleLayout>
  );
}
