import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { DataBlock } from "~/components/DataBlock";
import { part1Example, puzzleInput } from "~/solutions/day4/inputs";
import {
  RenderCard,
  RenderTotalCopies,
  TotalScore,
} from "~/solutions/day4/solutions";

export const meta: MetaFunction = () => {
  return [{ title: "AoC 2023 | Day 4" }];
};

export default function Day4() {
  return (
    <>
      <h2>Day 4: Scratchcards</h2>
      <p>
        <Link className="link-light" to="https://adventofcode.com/2023/day/3">
          Original
        </Link>
      </p>
      <h3 className="pt-3 pb-2">Part One</h3>
      <h4 className="pt-3 pb-2">Problem Statement</h4>
      <p>
        The Elf leads you over to the pile of colorful cards. There, you
        discover dozens of scratchcards, all with their opaque covering already
        scratched off. Picking one up, it looks like each card has two lists of
        numbers separated by a vertical bar (|): a list of{" "}
        <strong>winning numbers</strong> and then a list of{" "}
        <strong>numbers you have</strong>. You organize the information into a
        table (your puzzle input).
      </p>

      <p>
        As far as the Elf has been able to figure out, you have to figure out
        which of the <strong>numbers you have</strong> appear in the list of{" "}
        <strong>winning numbers</strong>. The first match makes the card worth{" "}
        <strong>one point</strong> and each match after the first{" "}
        <strong>doubles</strong> the point value of that card.
      </p>

      <p>For example:</p>

      <DataBlock>{part1Example.join("\n")}</DataBlock>

      <p>
        In the above example, card 1 has five winning numbers (<code>41</code>,{" "}
        <code>48</code>, <code>83</code>, <code>86</code>, and <code>17</code>)
        and eight numbers you have (<code>83</code>, <code>86</code>,{" "}
        <code>6</code>, <code>31</code>, <code>17</code>, <code>9</code>,{" "}
        <code>48</code>, and <code>53</code>). Of the numbers you have, four of
        them (<code>48</code>, <code>83</code>, <code>17</code>, and{" "}
        <code>86</code>) are winning numbers! That means card 1 is worth{" "}
        <strong>
          <code>8</code>
        </strong>{" "}
        points (1 for the first match, then doubled three times for each of the
        three matches after the first).
      </p>

      <ul>
        <li>
          Card 2 has two winning numbers (<code>32</code> and <code>61</code>),
          so it is worth{" "}
          <strong>
            <code>2</code>
          </strong>{" "}
          points.
        </li>
        <li>
          Card 3 has two winning numbers (<code>1</code> and <code>21</code>),
          so it is worth{" "}
          <strong>
            <code>2</code>
          </strong>{" "}
          points.
        </li>
        <li>
          Card 4 has one winning number (<code>84</code>), so it is worth{" "}
          <strong>
            <code>1</code>
          </strong>{" "}
          point.
        </li>
        <li>Card 5 has no winning numbers, so it is worth no points.</li>
        <li>Card 6 has no winning numbers, so it is worth no points.</li>
      </ul>
      <p>
        So, in this example, the Elf's pile of scratchcards is worth{" "}
        <strong>
          <code>13</code>
        </strong>{" "}
        points.
      </p>

      <p>
        Take a seat in the large pile of colorful cards.{" "}
        <strong>How many points are they worth in total?</strong>
      </p>

      <h4 className="pt-3 pb-2">Test Implementation</h4>

      <DataBlock>
        <RenderCard card={part1Example[0]} expected={8} />
        <RenderCard card={part1Example[1]} expected={2} />
        <RenderCard card={part1Example[2]} expected={2} />
        <RenderCard card={part1Example[3]} expected={1} />
        <RenderCard card={part1Example[4]} expected={0} />
        <RenderCard card={part1Example[5]} expected={0} />
      </DataBlock>

      <TotalScore cards={part1Example} expected={13} />

      <h4 className="pt-3 pb-2">Solution</h4>

      <DataBlock>
        {puzzleInput.map((card) => (
          <RenderCard key={card} card={card} />
        ))}
      </DataBlock>

      <TotalScore cards={puzzleInput} />

      <h3 className="pt-3 pb-2">Part Two</h3>
      <h4 className="pt-3 pb-2">Problem Statement</h4>
      <p>
        There's no such thing as "points". Instead, scratchcards only cause you
        to <strong>win more scratchcards</strong> equal to the number of winning
        numbers you have.
      </p>

      <p>
        Specifically, you win <strong>copies</strong> of the scratchcards below
        the winning card equal to the number of matches. So, if card 10 were to
        have 5 matching numbers, you would win one copy each of cards 11, 12,
        13, 14, and 15.
      </p>

      <p>
        Copies of scratchcards are scored like normal scratchcards and have the
        <strong>same card number</strong> as the card they copied. So, if you
        win a copy of card 10 and it has 5 matching numbers, it would then win a
        copy of the same cards that the original card 10 won: cards 11, 12, 13,
        14, and 15. This process repeats until none of the copies cause you to
        win any more cards. (Cards will never make you copy a card past the end
        of the table.)
      </p>

      <p>This time, the above example goes differently:</p>

      <DataBlock>{part1Example.join("\n")}</DataBlock>

      <ul>
        <li>
          Card 1 has four matching numbers, so you win one copy each of the next
          four cards: cards 2, 3, 4, and 5.
        </li>
        <li>
          Your original card 2 has two matching numbers, so you win one copy
          each of cards 3 and 4.
        </li>
        <li>Your copy of card 2 also wins one copy each of cards 3 and 4.</li>
        <li>
          Your four instances of card 3 (one original and three copies) have two
          matching numbers, so you win <strong>four</strong> copies each of
          cards 4 and 5.
        </li>
        <li>
          Your eight instances of card 4 (one original and seven copies) have
          one matching number, so you win <strong>eight</strong> copies of card
          5.
        </li>
        <li>
          Your fourteen instances of card 5 (one original and thirteen copies)
          have no matching numbers and win no more cards.
        </li>
        <li>
          Your one instance of card 6 (one original) has no matching numbers and
          wins no more cards.
        </li>
      </ul>

      <p>
        Once all of the originals and copies have been processed, you end up
        with{" "}
        <strong>
          <code>1</code>
        </strong>{" "}
        instance of card 1,{" "}
        <strong>
          <code>2</code>
        </strong>{" "}
        instances of card 2,{" "}
        <strong>
          <code>4</code>
        </strong>{" "}
        instances of card 3,{" "}
        <strong>
          <code>8</code>
        </strong>{" "}
        instances of card 4,{" "}
        <strong>
          <code>14</code>
        </strong>{" "}
        instances of card 5, and{" "}
        <strong>
          <code>1</code>
        </strong>{" "}
        instance of card 6. In total, this example pile of scratchcards causes
        you to ultimately have{" "}
        <strong>
          <code>30</code>
        </strong>{" "}
        scratchcards!
      </p>

      <p>
        Process all of the original and copied scratchcards until no more
        scratchcards are won. Including the original set of scratchcards, how
        many total scratchcards do you end up with?
      </p>

      <h4 className="pt-3 pb-2">Test Implementation</h4>

      <RenderTotalCopies cards={part1Example} expected={30} />

      <h4 className="pt-3 pb-2">Solution</h4>

      <RenderTotalCopies cards={puzzleInput} />
    </>
  );
}
