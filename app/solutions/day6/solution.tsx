import roots from "quadratic-roots";
import { SolutionTest } from "~/components/SolutionTest";

interface Race {
  time: number;
  distance: number;
}

function parseRaces(races: string): Race[] {
  const [time, distance] = races
    .split("\n")
    .map((line) =>
      [...line.matchAll(/\d+/g)].map((match) => parseInt(match[0]))
    );
  return time.map((time, i) => ({ time, distance: distance[i] }));
}

function parseRacesPartTwo(races: string): Race[] {
  const [time, distance] = races
    .replaceAll(" ", "")
    .split("\n")
    .map((line) =>
      [...line.matchAll(/\d+/g)].map((match) => parseInt(match[0]))
    );
  return time.map((time, i) => ({ time, distance: distance[i] }));
}

export function SimulateRace({
  races,
  index,
}: {
  races: string;
  index: number;
}) {
  const race = parseRaces(races)[index];

  return (
    <>
      <p>
        Race: {race.time}ms (record {race.distance}mm)
      </p>
      <ul>
        {new Array(race.time).fill(0).map((_, speed) => {
          const travelTime = race.time - speed;
          return (
            <li key={speed}>
              Hold the button for {speed} millisecond(s). After its remaining{" "}
              {travelTime} millisecond(s) of travel time, the boat will have
              gone {travelTime * speed} millimeters.
            </li>
          );
        })}
      </ul>
    </>
  );
}

function waysToWin(race: Race) {
  // a = time, b = record
  // (x + y) = a
  // (x * y) > b
  // x = a - y
  // (a - y) * y > b
  // -y^2 + ay > b
  // -y^2 + ay - b > 0

  const solutions = roots(-1, race.time, -race.distance);

  const min = Math.floor(Math.min(...solutions)) + 1;
  const max = Math.ceil(Math.max(...solutions)) - 1;

  return max - min + 1;
}

export function WaysToWinRace({
  races,
  index,
  expected,
}: {
  races: string;
  index: number;
  expected?: number;
}) {
  const race = parseRaces(races)[index];

  return (
    <p>
      <div>
        Race: {race.time}ms (record {race.distance}mm)
      </div>
      <SolutionTest result={waysToWin(race)} expected={expected} />
    </p>
  );
}

export function MarginOfError({
  races,
  expected,
}: {
  races: string;
  expected?: number;
}) {
  const marginOfError = parseRaces(races).reduce((a, b) => a * waysToWin(b), 1);

  return (
    <p>
      <div>Margin of Error</div>
      <SolutionTest result={marginOfError} expected={expected} />
    </p>
  );
}

export function MarginOfErrorPartTwo({
  races,
  expected,
}: {
  races: string;
  expected?: number;
}) {
  const marginOfError = parseRacesPartTwo(races).reduce(
    (a, b) => a * waysToWin(b),
    1
  );

  return (
    <p>
      <div>Margin of Error</div>
      <SolutionTest result={marginOfError} expected={expected} />
    </p>
  );
}
