import { Col, Row } from "react-bootstrap";
import { LineTest } from "~/components/LineTest";
import { Solution } from "~/components/Solution";
import { SolutionTest } from "~/components/SolutionTest";
import { SpanTest } from "~/components/SpanTest";

interface Range {
  start: number;
  length: number;
}
type RangeMap = {
  range: Range;
  offset: number;
};

const inRange = (range: Range) => (input: number) =>
  input >= range.start && input < rangeEnd(range);

const rangeEnd = (range: Range) => range.start + range.length;

const rangeOverlaps = (range1: Range) => (range2: Range) =>
  inRange(range1)(range2.start) ||
  inRange(range1)(rangeEnd(range2)) ||
  inRange(range2)(range1.start) ||
  inRange(range2)(rangeEnd(range1));

function parseMap(input: string): RangeMap {
  const numbers = input.split(" ").map((n) => parseInt(n));
  if (numbers.length !== 3) throw new Error("Expected three numbers in a map");
  const [destinationRangeStart, start, length] = numbers;

  return {
    range: { start, length },
    offset: destinationRangeStart - start,
  };
}

function parseSeeds(input: string) {
  return input
    .replace("seeds: ", "")
    .split(" ")
    .map((n) => parseInt(n));
}

function parseSeedsAsRanges(input: string) {
  return [...input.replace("seeds: ", "").matchAll(/\d+ \d+/g)].map(
    ([range]) => {
      const [start, length] = range.split(" ").map((n) => parseInt(n));
      return { start, length };
    }
  );
}

function parseAlmanac<S>(input: string[], seedsFn: (input: string) => S) {
  const seeds = seedsFn(input[0]);
  const maps: Record<string, RangeMap[]> = {};
  let currentMap = "";
  for (const line of input.slice(1)) {
    if (line === "") {
      // reset for next map type
      currentMap = "";
    } else if (currentMap === "") {
      // new map type starting
      currentMap = line.replace(" map:", "");
      maps[currentMap] = [];
    } else {
      // read map
      maps[currentMap].push(parseMap(line));
    }
  }
  return {
    seeds,
    maps,
  };
}

function doRangeMap(input: number, ranges: RangeMap[]) {
  const map = ranges.find(({ range }) => inRange(range)(input));
  return input + (map?.offset ?? 0);
}

function mapRangeToRanges(input: Range, ranges: RangeMap[]) {
  const matchingRanges = ranges
    .filter(({ range }) => rangeOverlaps(input)(range))
    .sort((a, b) => a.range.start - b.range.start);

  if (matchingRanges.length === 0) return [input]; // unmapped range

  const mappedRanges: Range[] = [];
  let start = input.start;
  for (const { range, offset } of matchingRanges) {
    if (range.start > start) {
      // unmapped range
      mappedRanges.push({
        start,
        length: range.start - start,
      });
    }

    if (rangeEnd(range) < start) continue; // range already mapped

    // mapped range
    const actualStart = Math.max(start, range.start);
    start = Math.min(rangeEnd(range), rangeEnd(input));
    console.log(start, start - range.start);
    mappedRanges.push({
      start: actualStart + offset,
      length: start - actualStart,
    });
  }
  if (start < rangeEnd(input)) {
    mappedRanges.push({
      start,
      length: rangeEnd(input) - start,
    });
  }
  return mappedRanges;
}

export function TestRangeMap({
  almanac,
  seed,
  expected,
}: {
  almanac: string[];
  seed: number;
  expected: number;
}) {
  const { maps } = parseAlmanac(almanac, parseSeeds);
  return (
    <LineTest
      line={`Seed number ${seed} corresponds to soil number`}
      result={doRangeMap(seed, maps["seed-to-soil"])}
      expected={expected}
    />
  );
}

export function TestSeedToLocationMap({
  almanac,
  seed,
  expected,
}: {
  almanac: string[];
  seed: number;
  expected: number[];
}) {
  const { maps } = parseAlmanac(almanac, parseSeeds);
  const soil = doRangeMap(seed, maps["seed-to-soil"]);
  const fertilizer = doRangeMap(soil, maps["soil-to-fertilizer"]);
  const water = doRangeMap(fertilizer, maps["fertilizer-to-water"]);
  const light = doRangeMap(water, maps["water-to-light"]);
  const temperature = doRangeMap(light, maps["light-to-temperature"]);
  const humidity = doRangeMap(temperature, maps["temperature-to-humidity"]);
  const location = doRangeMap(humidity, maps["humidity-to-location"]);
  return (
    <>
      <SpanTest label="Seed" result={seed} expected={seed} />
      <SpanTest label=", soil" result={soil} expected={expected[0]} />
      <SpanTest
        label=", fertilizer"
        result={fertilizer}
        expected={expected[1]}
      />
      <SpanTest label=", water" result={water} expected={expected[2]} />
      <SpanTest label=", light" result={light} expected={expected[3]} />
      <SpanTest
        label=", temperature"
        result={temperature}
        expected={expected[4]}
      />
      <SpanTest label=", humidity" result={humidity} expected={expected[5]} />
      <SpanTest label=", location" result={location} expected={expected[6]} />
    </>
  );
}

export function LowestLocation({
  almanac,
  expected,
}: {
  almanac: string[];
  expected?: number;
}) {
  const { seeds, maps } = parseAlmanac(almanac, parseSeeds);
  let lowest = Infinity;
  for (const seed of seeds) {
    lowest = Math.min(
      lowest,
      [
        "seed-to-soil",
        "soil-to-fertilizer",
        "fertilizer-to-water",
        "water-to-light",
        "light-to-temperature",
        "temperature-to-humidity",
        "humidity-to-location",
      ].reduce((mapped, map) => doRangeMap(mapped, maps[map]), seed)
    );
  }
  if (expected !== undefined)
    return <SolutionTest result={lowest} expected={expected} />;
  return <Solution result={lowest} />;
}

function VisualizeRange({ range }: { range: Range }) {
  return `[${range.start},${range.start + range.length})`;
}

export function VisualizeRanges({ almanac }: { almanac: string[] }) {
  const { seeds, maps } = parseAlmanac(almanac, parseSeedsAsRanges);

  const mapsList: [string, RangeMap[]][] = [
    ["Soil", maps["seed-to-soil"]],
    ["Fertilizer", maps["soil-to-fertilizer"]],
    ["Water", maps["fertilizer-to-water"]],
    ["Light", maps["water-to-light"]],
    ["Temperature", maps["light-to-temperature"]],
    ["Humidity", maps["temperature-to-humidity"]],
    ["Location", maps["humidity-to-location"]],
  ];

  return (
    <Col xs="auto" className="border-start border-5 border-light ps-3">
      <Row>
        <Col xs="auto">Seed</Col>
      </Row>
      {seeds.map((seed) => (
        <Row key={seed.start}>
          <Col xs="auto">
            <VisualizeRange range={seed} />
          </Col>
          <NestedVisualizeRange
            key={seed.start}
            range={seed}
            mapsList={mapsList}
          />
        </Row>
      ))}
    </Col>
  );
}

function NestedVisualizeRange({
  range,
  mapsList,
}: {
  range: Range;
  mapsList: [string, RangeMap[]][];
}) {
  const [title, maps] = mapsList[0];
  return (
    <Col xs="auto">
      <Row>
        <Col xs="auto">{title}</Col>
      </Row>
      {mapRangeToRanges(range, maps).map((nestedRange) => (
        <Row key={nestedRange.start}>
          <Col xs="auto">
            <VisualizeRange range={nestedRange} />
          </Col>
          {mapsList.length > 1 && (
            <NestedVisualizeRange
              range={nestedRange}
              mapsList={mapsList.slice(1)}
            />
          )}
        </Row>
      ))}
    </Col>
  );
}

export function LowestLocationRange({
  almanac,
  expected,
}: {
  almanac: string[];
  expected?: number;
}) {
  const { seeds, maps } = parseAlmanac(almanac, parseSeedsAsRanges);

  const mappedRanges = [
    "seed-to-soil",
    "soil-to-fertilizer",
    "fertilizer-to-water",
    "water-to-light",
    "light-to-temperature",
    "temperature-to-humidity",
    "humidity-to-location",
  ].reduce(
    (ranges, map) => ranges.flatMap((r) => mapRangeToRanges(r, maps[map])),
    seeds
  );

  const result = Math.min(...mappedRanges.map((r) => r.start));

  if (expected === undefined) {
    return <Solution result={result} />;
  } else {
    return <SolutionTest result={result} expected={expected} />;
  }
}
