import { DataBlock } from "~/components/DataBlock";
import { SolutionTest } from "~/components/SolutionTest";

function countUniqueCharacters(str: string) {
  const unique = new Map<string, number>();
  for (const char of str) {
    unique.set(char, (unique.get(char) ?? 0) + 1);
  }
  return [...unique.values()].sort((a, b) => b - a); // descending order
}

function countUniqueCharactersWithJokers(str: string) {
  const unique = new Map<string, number>();
  let jokers = 0;
  for (const char of str) {
    if (char === "J") {
      jokers += 1;
      continue;
    }
    unique.set(char, (unique.get(char) ?? 0) + 1);
  }
  const uniqueList = [...unique.values()].sort((a, b) => b - a); // descending order
  if (uniqueList.length === 0) uniqueList.push(0);
  uniqueList[0] += jokers;
  return uniqueList;
}

function arrayStartsWith<T>(arr: T[], check: T[]) {
  return check.every((value, index) => arr[index] === value);
}

const CARD_ORDER = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
const JOKER_CARD_ORDER = [
  "A",
  "K",
  "Q",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "J",
];
const HAND_ORDER = (countUniqueFunction: (hand: string) => number[]) =>
  [
    {
      type: "Five of a kind",
      isType: (hand: string) => arrayStartsWith(countUniqueFunction(hand), [5]),
    },
    {
      type: "Four of a kind",
      isType: (hand: string) => arrayStartsWith(countUniqueFunction(hand), [4]),
    },
    {
      type: "Full house",
      isType: (hand: string) =>
        arrayStartsWith(countUniqueFunction(hand), [3, 2]),
    },
    {
      type: "Three of a kind",
      isType: (hand: string) => arrayStartsWith(countUniqueFunction(hand), [3]),
    },
    {
      type: "Two pair",
      isType: (hand: string) =>
        arrayStartsWith(countUniqueFunction(hand), [2, 2]),
    },
    {
      type: "One pair",
      isType: (hand: string) => arrayStartsWith(countUniqueFunction(hand), [2]),
    },
    { type: "High card", isType: (hand: string) => true },
  ].map((value, index) => ({ ...value, index }));

const parseHand = (line: string) => {
  const [hand, bid] = line.split(" ");
  return { hand, bid: parseInt(bid) };
};
type Hand = ReturnType<typeof parseHand>;

const parseHands = (hands: string[]) => hands.map(parseHand);

const totalWinnings = (rankedHands: Hand[]) =>
  rankedHands
    .map((hand, rank) => hand.bid * (rank + 1))
    .reduce((a, b) => a + b, 0);

const scoreHandType = (hand: Hand, jokers?: boolean) =>
  HAND_ORDER(
    jokers ? countUniqueCharactersWithJokers : countUniqueCharacters
  ).find((v) => v.isType(hand.hand))!.index;

const rankHands =
  (jokers?: boolean) =>
  (hand1: Hand, hand2: Hand): number => {
    // sort by hand type first
    const typeScore1 = scoreHandType(hand1, jokers);
    const typeScore2 = scoreHandType(hand2, jokers);
    if (typeScore1 !== typeScore2) return typeScore2 - typeScore1;

    // sort by high card next
    const ORDER = jokers ? JOKER_CARD_ORDER : CARD_ORDER;
    for (let i = 0; i < hand1.hand.length; i++) {
      if (hand1.hand[i] === hand2.hand[i]) continue;

      return ORDER.indexOf(hand2.hand[i]) - ORDER.indexOf(hand1.hand[i]);
    }

    return 0;
  };

export function ScoreHands({
  hands,
  expected,
}: {
  hands: string[];
  expected?: number;
}) {
  const rankedHands = parseHands(hands).sort(rankHands(false));
  return (
    <>
      <DataBlock>
        {rankedHands
          .map((hand) => {
            const { type, index } = HAND_ORDER(countUniqueCharacters).find(
              (v) => v.isType(hand.hand)
            )!;
            return `${hand.hand} ${hand.bid} ([${index}] ${type})`;
          })
          .join("\n")}
      </DataBlock>
      <SolutionTest result={totalWinnings(rankedHands)} expected={expected} />
    </>
  );
}

export function ScoreHandsWithJokers({
  hands,
  expected,
}: {
  hands: string[];
  expected?: number;
}) {
  const rankedHands = parseHands(hands).sort(rankHands(true));
  return (
    <>
      <DataBlock>
        {rankedHands
          .map((hand) => {
            const { type, index } = HAND_ORDER(
              countUniqueCharactersWithJokers
            ).find((v) => v.isType(hand.hand))!;
            return `${hand.hand} ${hand.bid} ([${index}] ${type})`;
          })
          .join("\n")}
      </DataBlock>
      <SolutionTest result={totalWinnings(rankedHands)} expected={expected} />
    </>
  );
}
