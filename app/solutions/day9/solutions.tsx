import { DataBlock } from "~/components/DataBlock";
import { SolutionTest } from "~/components/SolutionTest";

function last<T>(list: T[]) {
  return list[list.length - 1];
}
function first<T>(list: T[]) {
  return list[0];
}
function sum(a: number, b: number) {
  return a + b;
}

const parseHistory = (history: string) =>
  history.split(" ").map((n) => parseInt(n));

const sequenceHistory = (history: number[]) => {
  let sequence = [];
  for (let i = 0; i < history.length - 1; i++) {
    sequence.push(history[i + 1] - history[i]);
  }
  return sequence;
};

const extrapolateHistory = (history: number[]) => {
  const sequences = [history];
  while (!last(sequences).every((n) => n === 0)) {
    sequences.push(sequenceHistory(last(sequences)));
  }
  // begin extrapolation
  last(sequences).push(0);
  for (let i = sequences.length - 2; i >= 0; i--) {
    const nextExtrapolation = last(sequences[i + 1]);
    sequences[i].push(last(sequences[i]) + nextExtrapolation);
  }
  return sequences;
};

const extrapolateHistoryBackwards = (history: number[]) => {
  const sequences = [history];
  while (!last(sequences).every((n) => n === 0)) {
    sequences.push(sequenceHistory(last(sequences)));
  }
  // begin extrapolation
  last(sequences).unshift(0);
  for (let i = sequences.length - 2; i >= 0; i--) {
    const nextExtrapolation = first(sequences[i + 1]);
    sequences[i].unshift(first(sequences[i]) - nextExtrapolation);
  }
  return sequences;
};

const scoreHistory = (history: number[][]) => last(history[0]);
const scoreHistoryBackwards = (history: number[][]) => first(history[0]);

export function VisualizeHistory({
  history,
  expected,
}: {
  history: string;
  expected?: number;
}) {
  const parsed = parseHistory(history);

  const sequences = extrapolateHistory(parsed);

  return (
    <>
      <DataBlock>
        {sequences
          .map((seq) => seq.map((n) => n.toFixed(0).padStart(2)).join(" "))
          .map((line, i) => Array(i).fill(" ").join("") + line)
          .join("\n")}
      </DataBlock>
      <SolutionTest result={scoreHistory(sequences)} expected={expected} />
    </>
  );
}

export function SolveHistories({
  histories,
  expected,
}: {
  histories: string[];
  expected?: number;
}) {
  const score = histories
    .map(parseHistory)
    .map(extrapolateHistory)
    .map(scoreHistory)
    .reduce(sum, 0);
  return <SolutionTest result={score} expected={expected} />;
}

export function VisualizeHistoryBackwards({
  history,
  expected,
}: {
  history: string;
  expected?: number;
}) {
  const parsed = parseHistory(history);

  const sequences = extrapolateHistoryBackwards(parsed);

  return (
    <>
      <DataBlock>
        {sequences
          .map((seq) => seq.map((n) => n.toFixed(0).padStart(2)).join(" "))
          .map((line, i) => Array(i).fill(" ").join("") + line)
          .join("\n")}
      </DataBlock>
      <SolutionTest
        result={scoreHistoryBackwards(sequences)}
        expected={expected}
      />
    </>
  );
}

export function SolveHistoriesBackwards({
  histories,
  expected,
}: {
  histories: string[];
  expected?: number;
}) {
  const score = histories
    .map(parseHistory)
    .map(extrapolateHistoryBackwards)
    .map(scoreHistoryBackwards)
    .reduce(sum, 0);
  return <SolutionTest result={score} expected={expected} />;
}
