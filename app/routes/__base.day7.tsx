import type { MetaFunction } from "@remix-run/react";
import { DataBlock } from "~/components/DataBlock";
import { PuzzleLayout, PuzzleSection } from "~/components/PuzzleLayout";
import { part1Example, puzzleInput } from "~/solutions/day7/inputs";
import { ScoreHands, ScoreHandsWithJokers } from "~/solutions/day7/solution";

const DAY = 7;

export const meta: MetaFunction = () => {
  return [{ title: `AoC 2023 | Day ${DAY}` }];
};

export default function DisplayProblem() {
  return (
    <PuzzleLayout day={DAY} title="Wait For It">
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

function ProblemStatement1() {
  return (
    <div>
      <p>
        In Camel Cards, you get a list of <strong>hands</strong>, and your goal
        is to order them based on the <strong>strength</strong> of each hand. A
        hand consists of <strong>five cards</strong> labeled one of{" "}
        <code>A</code>, <code>K</code>, <code>Q</code>, <code>J</code>,{" "}
        <code>T</code>, <code>9</code>, <code>8</code>, <code>7</code>,{" "}
        <code>6</code>, <code>5</code>, <code>4</code>, <code>3</code>, or{" "}
        <code>2</code>. The relative strength of each card follows this order,
        where <code>A</code> is the highest and <code>2</code> is the lowest.
      </p>
      <p>
        Every hand is exactly one <strong>type</strong>. From strongest to
        weakest, they are:
      </p>

      <ul>
        <li>
          <strong>Five of a kind</strong>, where all five cards have the same
          label: <code>AAAAA</code>
        </li>
        <li>
          <strong>Four of a kind</strong>, where four cards have the same label
          and one card has a different label: <code>AA8AA</code>
        </li>
        <li>
          <strong>Full house</strong>, where three cards have the same label,
          and the remaining two cards share a different label:{" "}
          <code>23332</code>
        </li>
        <li>
          <strong>Three of a kind</strong>, where three cards have the same
          label, and the remaining two cards are each different from any other
          card in the hand: <code>TTT98</code>
        </li>
        <li>
          <strong>Two pair</strong>, where two cards share one label, two other
          cards share a second label, and the remaining card has a third label:{" "}
          <code>23432</code>
        </li>
        <li>
          <strong>One pair</strong>, where two cards share one label, and the
          other three cards have a different label from the pair and each other:{" "}
          <code>A23A4</code>
        </li>
        <li>
          <strong>High card</strong>, where all cards' labels are distinct:{" "}
          <code>23456</code>
        </li>
      </ul>
      <p>
        Hands are primarily ordered based on type; for example, every{" "}
        <strong>full house</strong> is stronger than any{" "}
        <strong>three of a kind</strong>.
      </p>
      <p>
        If two hands have the same type, a second ordering rule takes effect.
        Start by comparing the <strong>first card in each hand</strong>. If
        these cards are different, the hand with the stronger first card is
        considered stronger. If the first card in each hand have the{" "}
        <strong>same label</strong>, however, then move on to considering the{" "}
        <strong>second card in each hand</strong>. If they differ, the hand with
        the higher second card wins; otherwise, continue with the third card in
        each hand, then the fourth, then the fifth.
      </p>
      <p>
        So, <code>33332</code> and <code>2AAAA</code> are both{" "}
        <strong>four of a kind hands</strong>, but <code>33332</code> is
        stronger because its first card is stronger. Similarly,{" "}
        <code>77888</code> and <code>77788</code> are both a{" "}
        <strong>full house</strong>, but <code>77888</code> is stronger because
        its third card is stronger (and both hands have the same first and
        second card).
      </p>
      <p>
        To play Camel Cards, you are given a list of hands and their
        corresponding <strong>bid</strong> (your puzzle input). For example:
      </p>

      <DataBlock>{part1Example.join("\n")}</DataBlock>

      <p>
        This example shows five hands; each hand is followed by its{" "}
        <strong>bid</strong> amount. Each hand wins an amount equal to its bid
        multiplied by its <strong>rank</strong>, where the weakest hand gets
        rank 1, the second-weakest hand gets rank 2, and so on up to the
        strongest hand. Because there are five hands in this example, the
        strongest hand will have rank 5 and its bid will be multiplied by 5.
      </p>
      <p>So, the first step is to put the hands in order of strength:</p>

      <ul>
        <li>
          32T3K is the only <strong>one pair</strong> and the other hands are
          all a stronger type, so it gets rank <strong>1</strong>.
        </li>
        <li>
          KK677 and KTJJT are both <strong>two pair</strong>. Their first cards
          both have the same label, but the second card of KK677 is stronger (K
          vs T), so KTJJT gets rank <strong>2</strong> and KK677 gets rank{" "}
          <strong>3</strong>.
        </li>
        <li>
          T55J5 and QQQJA are both <strong>three of a kind</strong>. QQQJA has a
          stronger first card, so it gets rank <strong>5</strong> and T55J5 gets
          rank <strong>4</strong>.
        </li>
      </ul>
      <p>
        Now, you can determine the total winnings of this set of hands by adding
        up the result of multiplying each hand's bid with its rank (
        <code>765</code> * 1 +<code>220</code> * 2 + <code>28</code> * 3 +{" "}
        <code>684</code> * 4 + <code>483</code> * 5). So the{" "}
        <strong>total winnings</strong> in this example are{" "}
        <strong>
          <code>6440</code>
        </strong>
        .
      </p>
      <p>
        Find the rank of every hand in your set.{" "}
        <strong>What are the total winnings?</strong>
      </p>
    </div>
  );
}

function ProblemStatement2() {
  return (
    <div>
      <p>
        To make things a little more interesting, the Elf introduces one
        additional rule. Now, <code>J</code> cards are jokers - wildcards that
        can act like whatever card would make the hand the strongest type
        possible.
      </p>
      <p>
        To balance this,{" "}
        <strong>
          <code>J</code> cards are now the weakest
        </strong>{" "}
        individual cards, weaker even than <code>2</code>. The other cards stay
        in the same order: <code>A</code>, <code>K</code>, <code>Q</code>,{" "}
        <code>T</code>, <code>9</code>, <code>8</code>,<code>7</code>,{" "}
        <code>6</code>, <code>5</code>, <code>4</code>, <code>3</code>,{" "}
        <code>2</code>, <code>J</code>.
      </p>
      <p>
        <code>J</code> cards can pretend to be whatever card is best for the
        purpose of determining hand type; for example, <code>QJJQ2</code> is now
        considered four of a kind. However, for the purpose of breaking ties
        between two hands of the same type, <code>J</code> is always treated as{" "}
        <code>J</code>, not the card it's pretending to be: JKKK2 is weaker than{" "}
        <code>QQQQ2</code> because <code>J</code> is weaker than <code>Q</code>.
      </p>
      <p>Now, the above example goes very differently:</p>

      <DataBlock>{part1Example.join("\n")}</DataBlock>

      <ul>
        <li>
          <code>32T3K</code> is still the only <strong>one pair</strong>; it
          doesn't contain any jokers, so its strength doesn't increase.
        </li>
        <li>
          <code>KK677</code> is now the only <strong>two pair</strong>, making
          it the second-weakest hand.
        </li>
        <li>
          <code>T55J5</code>, <code>KTJJT</code>, and <code>QQQJA</code> are now
          all <strong>four of a kind</strong>! <code>T55J5</code> gets rank 3,
          <code>QQQJA</code> gets rank 4, and <code>KTJJT</code> gets rank 5.
        </li>
      </ul>
      <p>
        With the new joker rule, the total winnings in this example are{" "}
        <strong>
          <code>5905</code>
        </strong>
        .
      </p>
      <p>
        Using the new joker rule, find the rank of every hand in your set.{" "}
        <strong>What are the new total winnings?</strong>
      </p>
    </div>
  );
}
