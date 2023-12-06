import type { MetaFunction } from "@remix-run/react";
import { DataBlock } from "~/components/DataBlock";
import { PuzzleLayout, PuzzleSection } from "~/components/PuzzleLayout";
import { part1Example, puzzleInput } from "~/solutions/day6/inputs";
import {
  MarginOfError,
  MarginOfErrorPartTwo,
  SimulateRace,
  WaysToWinRace,
} from "~/solutions/day6/solution";

const DAY = 6;

export const meta: MetaFunction = () => {
  return [{ title: `AoC 2023 | Day ${DAY}` }];
};

export default function DisplayProblem() {
  return (
    <PuzzleLayout day={DAY} title="Wait For It">
      <h3 className="pt-3 pb-2">Part One</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement1 />}
        testImplementation={
          <>
            <SimulateRace races={part1Example} index={0} />
            <WaysToWinRace races={part1Example} index={0} expected={4} />
            <WaysToWinRace races={part1Example} index={1} expected={8} />
            <WaysToWinRace races={part1Example} index={2} expected={9} />
            <MarginOfError races={part1Example} expected={288} />
          </>
        }
        solution={<MarginOfError races={puzzleInput} />}
      />
      <h3 className="pt-3 pb-2">Part Two</h3>
      <PuzzleSection
        problemStatement={<ProblemStatement2 />}
        testImplementation={
          <>
            <MarginOfErrorPartTwo races={part1Example} expected={71503} />
          </>
        }
        solution={<MarginOfErrorPartTwo races={puzzleInput} />}
      />
    </PuzzleLayout>
  );
}

function ProblemStatement1() {
  return (
    <div>
      <p>
        As part of signing up, you get a sheet of paper (your puzzle input) that
        lists the <strong>time</strong> allowed for each race and also the best{" "}
        <strong>distance</strong> ever recorded in that race. To guarantee you
        win the grand prize, you need to make sure you{" "}
        <strong>go farther in each race</strong> than the current record holder.
      </p>
      <p>
        The organizer brings you over to the area where the boat races are held.
        The boats are much smaller than you expected - they're actually{" "}
        <strong>toy boats</strong>, each with a big button on top. Holding down
        the button <strong>charges the boat</strong>, and releasing the button{" "}
        <strong>allows the boat to move</strong>. Boats move faster if their
        button was held longer, but time spent holding the button counts against
        the total race time. You can only hold the button at the start of the
        race, and boats don't move until the button is released.
      </p>
      <p>For example:</p>
      <DataBlock>{part1Example}</DataBlock>
      <p>This document describes three races:</p>

      <ul>
        <li>
          The first race lasts 7 milliseconds. The record distance in this race
          is 9 millimeters.
        </li>
        <li>
          The second race lasts 15 milliseconds. The record distance in this
          race is 40 millimeters.
        </li>
        <li>
          The third race lasts 30 milliseconds. The record distance in this race
          is 200 millimeters.
        </li>
      </ul>
      <p>
        Your toy boat has a starting speed of{" "}
        <strong>zero millimeters per millisecond</strong>. For each whole
        millisecond you spend at the beginning of the race holding down the
        button, the boat's speed increases by{" "}
        <strong>one millimeter per millisecond</strong>.
      </p>
      <p>
        So, because the first race lasts 7 milliseconds, you only have a few
        options:
      </p>
      <ul>
        <li>
          Don't hold the button at all (that is, hold it for{" "}
          <strong>
            <code>0</code> milliseconds
          </strong>
          ) at the start of the race. The boat won't move; it will have traveled{" "}
          <strong>
            <code>0</code> millimeters
          </strong>{" "}
          by the end of the race.
        </li>
        <li>
          Hold the button for{" "}
          <strong>
            <code>1</code> millisecond
          </strong>{" "}
          at the start of the race. Then, the boat will travel at a speed of{" "}
          <code>1</code> millimeter per millisecond for 6 milliseconds, reaching
          a total distance traveled of{" "}
          <strong>
            <code>6</code> millimeters
          </strong>
          .
        </li>
        <li>
          Hold the button for{" "}
          <strong>
            <code>2</code> milliseconds
          </strong>
          , giving the boat a speed of <code>2</code> millimeters per
          millisecond. It will then get 5 milliseconds to move, reaching a total
          distance of{" "}
          <strong>
            <code>10</code> millimeters
          </strong>
          .
        </li>
        <li>
          Hold the button for{" "}
          <strong>
            <code>3</code> milliseconds
          </strong>
          . After its remaining 4 milliseconds of travel time, the boat will
          have gone{" "}
          <strong>
            <code>12</code> millimeters
          </strong>
          .
        </li>
        <li>
          Hold the button for{" "}
          <strong>
            <code>4</code> milliseconds
          </strong>
          . After its remaining 3 milliseconds of travel time, the boat will
          have gone{" "}
          <strong>
            <code>12</code> millimeters
          </strong>
          .
        </li>
        <li>
          Hold the button for{" "}
          <strong>
            <code>5</code> milliseconds
          </strong>
          , causing the boat to travel a total of{" "}
          <strong>
            <code>10</code> millimeters
          </strong>
          .
        </li>
        <li>
          Hold the button for{" "}
          <strong>
            <code>6</code> milliseconds
          </strong>
          , causing the boat to travel a total of{" "}
          <strong>
            <code>6</code> millimeters
          </strong>
          .
        </li>
        <li>
          Hold the button for{" "}
          <strong>
            <code>7</code> milliseconds
          </strong>
          . That's the entire duration of the race. You never let go of the
          button. The boat can't move until you let go of the button. Please
          make sure you let go of the button so the boat gets to move.{" "}
          <strong>
            <code>0</code> millimeters
          </strong>
          .
        </li>
      </ul>
      <p>
        Since the current record for this race is <code>9</code> millimeters,
        there are actually <code>4</code> different ways you could win: you
        could hold the button for <code>2</code>, <code>3</code>, <code>4</code>
        , or <code>5</code> milliseconds at the start of the race.
      </p>
      <p>
        In the second race, you could hold the button for at least{" "}
        <code>4</code> milliseconds and at most <code>11</code> milliseconds and
        beat the record, a total of{" "}
        <strong>
          <code>8</code>
        </strong>{" "}
        different ways to win.
      </p>
      <p>
        In the third race, you could hold the button for at least{" "}
        <code>11</code>
        milliseconds and no more than <code>19</code> milliseconds and still
        beat the record, a total of <code>9</code> ways you could win.
      </p>
      <p>
        To see how much margin of error you have, determine the{" "}
        <strong>number of ways you can beat the record</strong> in each race; in
        this example, if you multiply these values together, you get{" "}
        <strong>
          <code>288</code>
        </strong>{" "}
        (<code>4</code> * <code>8</code> * <code>9</code>).
      </p>
      <p>
        Determine the number of ways you could beat the record in each race.{" "}
        <strong>What do you get if you multiply these numbers together?</strong>
      </p>
    </div>
  );
}

function ProblemStatement2() {
  return (
    <div>
      <p>
        As the race is about to start, you realize the piece of paper with race
        times and record distances you got earlier actually just has very bad
        kerning. There's really <strong>only one race</strong> - ignore the
        spaces between the numbers on each line.
      </p>
      <p>So, the example from before:</p>

      <DataBlock>{part1Example}</DataBlock>

      <p>...now instead means this:</p>

      <DataBlock>{"Time: 71530\nDistance: 940200"}</DataBlock>
      <p>
        Now, you have to figure out how many ways there are to win this single
        race. In this example, the race lasts for{" "}
        <strong>
          <code>71530</code> milliseconds
        </strong>{" "}
        and the record distance you need to beat is{" "}
        <strong>
          <code>940200</code> millimeters
        </strong>
        . You could hold the button anywhere from <code>14</code> to{" "}
        <code>71516</code> milliseconds and beat the record, a total of{" "}
        <strong>
          <code>71503</code>
        </strong>{" "}
        ways!
      </p>
      <p>
        <strong>
          How many ways can you beat the record in this one much longer race?
        </strong>
      </p>
    </div>
  );
}
