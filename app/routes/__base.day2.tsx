import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { DataBlock } from "~/components/DataBlock";
import { LineTest } from "~/components/LineTest";
import { Solution } from "~/components/Solution";
import { SolutionTest } from "~/components/SolutionTest";
import { part1Example, puzzleInput } from "~/solutions/day2/inputs";
import {
  allGamesArePossibleWith,
  fewestCubesPower,
  fewestCubesSum,
  gameIsPossibleWith,
} from "~/solutions/day2/solution";

export const meta: MetaFunction = () => {
  return [{ title: "AoC 2023 | Day 1" }];
};

export default function Day1() {
  return (
    <>
      <h2>Day 2: Cube Conundrum</h2>
      <p>
        <Link className="link-light" to="https://adventofcode.com/2023/day/2">
          Original
        </Link>
      </p>
      <h3>Part One</h3>
      <p>
        As you walk, the Elf shows you a small bag and some cubes which are
        either red, green, or blue. Each time you play this game, he will hide a
        secret number of cubes of each color in the bag, and your goal is to
        figure out information about the number of cubes.
      </p>

      <p>
        To get information, once a bag has been loaded with cubes, the Elf will
        reach into the bag, grab a handful of random cubes, show them to you,
        and then put them back in the bag. He'll do this a few times per game.
      </p>

      <p>
        You play several games and record the information from each game (your
        puzzle input). Each game is listed with its ID number (like the{" "}
        <code>11</code> in
        <code>Game 11: ...</code>) followed by a semicolon-separated list of
        subsets of cubes that were revealed from the bag (like{" "}
        <code>3 red, 5 green, 4 blue</code>).
      </p>

      <p>For example, the record of a few games might look like this:</p>

      <DataBlock>{part1Example.join("\n")}</DataBlock>

      <p>
        In game 1, three sets of cubes are revealed from the bag (and then put
        back again). The first set is 3 blue cubes and 4 red cubes; the second
        set is 1 red cube, 2 green cubes, and 6 blue cubes; the third set is
        only 2 green cubes.
      </p>

      <p>
        The Elf would first like to know which games would have been possible if
        the bag contained{" "}
        <strong>only 12 red cubes, 13 green cubes, and 14 blue cubes?</strong>
      </p>

      <p>
        In the example above, games 1, 2, and 5 would have been{" "}
        <strong>possible</strong> if the bag had been loaded with that
        configuration. However, game 3 would have been{" "}
        <strong>impossible</strong> because at one point the Elf showed you 20
        red cubes at once; similarly, game 4 would also have been{" "}
        <strong>impossible</strong> because the Elf showed you 15 blue cubes at
        once. If you add up the IDs of the games that would have been possible,
        you get <code>8</code>.
      </p>

      <DataBlock>
        <LineTest
          line={part1Example[0]}
          result={gameIsPossibleWith({ red: 12, green: 13, blue: 14 })(
            part1Example[0]
          )}
          expected={true}
        />
        <LineTest
          line={part1Example[1]}
          result={gameIsPossibleWith({ red: 12, green: 13, blue: 14 })(
            part1Example[1]
          )}
          expected={true}
        />
        <LineTest
          line={part1Example[2]}
          result={gameIsPossibleWith({ red: 12, green: 13, blue: 14 })(
            part1Example[2]
          )}
          expected={false}
        />
        <LineTest
          line={part1Example[3]}
          result={gameIsPossibleWith({ red: 12, green: 13, blue: 14 })(
            part1Example[3]
          )}
          expected={false}
        />
        <LineTest
          line={part1Example[4]}
          result={gameIsPossibleWith({ red: 12, green: 13, blue: 14 })(
            part1Example[4]
          )}
          expected={true}
        />
      </DataBlock>

      <p>
        <SolutionTest
          result={allGamesArePossibleWith({ red: 12, green: 13, blue: 14 })(
            part1Example
          )}
          expected={8}
        />
      </p>

      <p>
        Determine which games would have been possible if the bag had been
        loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes.{" "}
        <strong>What is the sum of the IDs of those games?</strong>
      </p>

      <p>
        <Solution
          result={allGamesArePossibleWith({ red: 12, green: 13, blue: 14 })(
            puzzleInput
          )}
        />
      </p>

      <h3>Part Two</h3>

      <p>
        As you continue your walk, the Elf poses a second question: in each game
        you played, what is the fewest number of cubes of each color that could
        have been in the bag to make the game possible?
      </p>

      <p>Again consider the example games from earlier:</p>

      <DataBlock>{part1Example.join("\n")}</DataBlock>

      <ul>
        <li>
          In game 1, the game could have been played with as few as 4 red, 2
          green, and 6 blue cubes. If any color had even one fewer cube, the
          game would have been impossible.
        </li>
        <li>
          Game 2 could have been played with a minimum of 1 red, 3 green, and 4
          blue cubes.
        </li>
        <li>
          Game 3 must have been played with at least 20 red, 13 green, and 6
          blue cubes.
        </li>
        <li>Game 4 required at least 14 red, 3 green, and 15 blue cubes.</li>
        <li>
          Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the
          bag.
        </li>
      </ul>

      <p>
        The <strong>power</strong> of a set of cubes is equal to the numbers of
        red, green, and blue cubes multiplied together. The power of the minimum
        set of cubes in game 1 is <code>48</code>. In games 2-5 it was{" "}
        <code>12</code>, <code>1560</code>, <code>630</code>, and{" "}
        <code>36</code>, respectively. Adding up these five powers produces the
        sum{" "}
        <strong>
          <code>2286</code>
        </strong>
        .
      </p>

      <DataBlock>
        <LineTest
          line={part1Example[0]}
          result={fewestCubesPower(part1Example[0])}
          expected={48}
        />
        <LineTest
          line={part1Example[1]}
          result={fewestCubesPower(part1Example[1])}
          expected={12}
        />
        <LineTest
          line={part1Example[2]}
          result={fewestCubesPower(part1Example[2])}
          expected={1560}
        />
        <LineTest
          line={part1Example[3]}
          result={fewestCubesPower(part1Example[3])}
          expected={630}
        />
        <LineTest
          line={part1Example[4]}
          result={fewestCubesPower(part1Example[4])}
          expected={36}
        />
      </DataBlock>

      <p>
        <SolutionTest result={fewestCubesSum(part1Example)} expected={2286} />
      </p>

      <p>
        For each game, find the minimum set of cubes that must have been
        present. <strong>What is the sum of the power of these sets?</strong>
      </p>

      <p>
        <Solution result={fewestCubesSum(puzzleInput)} />
      </p>
    </>
  );
}
