import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { DataBlock } from "~/components/DataBlock";
import { part1Example, puzzleInput } from "~/solutions/day5/inputs";
import {
  LowestLocation,
  LowestLocationRange,
  TestRangeMap,
  TestSeedToLocationMap,
  VisualizeRanges,
} from "~/solutions/day5/solutions";

const DAY = 5;

export const meta: MetaFunction = () => {
  return [{ title: `AoC 2023 | Day ${DAY}` }];
};

export default function DisplayProblem() {
  return (
    <>
      <h2>Day {DAY}: If You Give A Seed A Fertilizer</h2>
      <p>
        <Link
          className="link-light"
          to={`https://adventofcode.com/2023/day/${DAY}`}
        >
          Original
        </Link>
      </p>
      <h3 className="pt-3 pb-2">Part One</h3>
      <h4 className="pt-3 pb-2">Problem Statement</h4>
      <p>
        The almanac (your puzzle input) lists all of the seeds that need to be
        planted. It also lists what type of soil to use with each kind of seed,
        what type of fertilizer to use with each kind of soil, what type of
        water to use with each kind of fertilizer, and so on. Every type of
        seed, soil, fertilizer and so on is identified with a number, but
        numbers are reused by each category - that is, soil 123 and fertilizer
        123 aren't necessarily related to each other.
      </p>
      <p>For example:</p>
      <DataBlock>{part1Example.join("\n")}</DataBlock>
      <p>
        The almanac starts by listing which seeds need to be planted: seeds{" "}
        <code>79</code>, <code>14</code>, <code>55</code>, and <code>13</code>.
      </p>
      <p>
        The rest of the almanac contains a list of <strong>maps</strong> which
        describe how to convert numbers from a <strong>source category</strong>{" "}
        into numbers in a <strong>destination category</strong>. That is, the
        section that starts with seed-to-soil map: describes how to convert a{" "}
        <strong>seed number</strong> (the source) to a{" "}
        <strong>soil number</strong> (the destination). This lets the gardener
        and his team know which soil to use with which seeds, which water to use
        with which fertilizer, and so on.
      </p>
      <p>
        Rather than list every source number and its corresponding destination
        number one by one, the maps describe entire <strong>ranges</strong> of
        numbers that can be converted. Each line within a map contains three
        numbers: the <strong>destination range start</strong>, the{" "}
        <strong>source range start</strong>, and the{" "}
        <strong>range length</strong>.
      </p>
      <p>
        Consider again the example <code>seed-to-soil map</code>:
      </p>
      <DataBlock>{part1Example.slice(3, 5).join("\n")}</DataBlock>
      <p>
        The first line has a <strong>destination range start</strong> of{" "}
        <code>50</code>, a <strong>source range start</strong> of{" "}
        <code>98</code>, and a <strong>range length</strong> of <code>2</code>.
        This line means that the source range starts at <code>98</code> and
        contains two values: <code>98</code> and <code>99</code>. The
        destination range is the same length, but it starts at <code>50</code>,
        so its two values are <code>50</code> and
        <code>51</code>. With this information, you know that seed number{" "}
        <code>98</code> corresponds to soil number <code>50</code> and that seed
        number <code>99</code> corresponds to soil number <code>51</code>.
      </p>
      <p>
        The second line means that the source range starts at <code>50</code>{" "}
        and contains <code>48</code> values: <code>50</code>, <code>51</code>,
        ..., <code>96</code>, <code>97</code>. This corresponds to a destination
        range starting at <code>52</code> and also containing <code>48</code>{" "}
        values: <code>52</code>, <code>53</code>, ..., <code>98</code>,{" "}
        <code>99</code>. So, seed number <code>53</code> corresponds to soil
        number <code>55</code>.
      </p>
      <p>
        Any source numbers that <strong>aren't mapped</strong> correspond to the{" "}
        <strong>same</strong> destination number. So, seed number{" "}
        <code>10</code> corresponds to soil number <code>10</code>.
      </p>
      <p>
        So, the entire list of seed numbers and their corresponding soil numbers
        looks like this:
      </p>
      <DataBlock>
        {`seed  soil
0     0
1     1
...   ...
48    48
49    49
50    52
51    53
...   ...
96    98
97    99
98    50
99    51`}
      </DataBlock>
      With this map, you can look up the soil number required for each initial
      seed number:
      <ul>
        <li>
          <TestRangeMap almanac={part1Example} seed={79} expected={81} />
        </li>
        <li>
          <TestRangeMap almanac={part1Example} seed={14} expected={14} />
        </li>
        <li>
          <TestRangeMap almanac={part1Example} seed={55} expected={57} />
        </li>
        <li>
          <TestRangeMap almanac={part1Example} seed={13} expected={13} />
        </li>
      </ul>
      <p>
        The gardener and his team want to get started as soon as possible, so
        they'd like to know the closest location that needs a seed. Using these
        maps, find{" "}
        <strong>
          the lowest location number that corresponds to any of the initial
          seeds
        </strong>
        . To do this, you'll need to convert each seed number through other
        categories until you can find its corresponding{" "}
        <strong>location number</strong>. In this example, the corresponding
        types are:
      </p>
      <ul>
        <li>
          Seed <code>79</code>, soil <code>81</code>, fertilizer <code>81</code>
          , water <code>81</code>, light <code>74</code>, temperature{" "}
          <code>78</code>, humidity <code>78</code>,{" "}
          <strong>
            location <code>82</code>
          </strong>
          .
        </li>
        <li>
          Seed <code>14</code>, soil <code>14</code>, fertilizer <code>53</code>
          , water <code>49</code>, light <code>42</code>, temperature{" "}
          <code>42</code>, humidity <code>43</code>,{" "}
          <strong>
            location <code>43</code>
          </strong>
          .
        </li>
        <li>
          Seed <code>55</code>, soil <code>57</code>, fertilizer <code>57</code>
          , water <code>53</code>, light <code>46</code>, temperature{" "}
          <code>82</code>, humidity <code>82</code>,{" "}
          <strong>
            location <code>86</code>
          </strong>
          .
        </li>
        <li>
          Seed <code>13</code>, soil <code>13</code>, fertilizer <code>52</code>
          , water <code>41</code>, light <code>34</code>, temperature{" "}
          <code>34</code>, humidity <code>35</code>,{" "}
          <strong>
            location <code>35</code>
          </strong>
          .
        </li>
      </ul>
      <p>
        So, the lowest location number in this example is{" "}
        <strong>
          <code>35</code>
        </strong>
        .
      </p>
      <p>
        <strong>
          What is the lowest location number that corresponds to any of the
          initial seed numbers?
        </strong>
      </p>
      <h4 className="pt-3 pb-2">Test Implementation</h4>
      <ul>
        <li>
          <TestSeedToLocationMap
            almanac={part1Example}
            seed={79}
            expected={[81, 81, 81, 74, 78, 78, 82]}
          />
        </li>
        <li>
          <TestSeedToLocationMap
            almanac={part1Example}
            seed={14}
            expected={[14, 53, 49, 42, 42, 43, 43]}
          />
        </li>
        <li>
          <TestSeedToLocationMap
            almanac={part1Example}
            seed={55}
            expected={[57, 57, 53, 46, 82, 82, 86]}
          />
        </li>
        <li>
          <TestSeedToLocationMap
            almanac={part1Example}
            seed={13}
            expected={[13, 52, 41, 34, 34, 35, 35]}
          />
        </li>
      </ul>
      <LowestLocation almanac={part1Example} expected={35} />
      <h4 className="pt-3 pb-2">Solution</h4>
      <LowestLocation almanac={puzzleInput} />
      <h3 className="pt-3 pb-2">Part Two</h3>
      <h4 className="pt-3 pb-2">Problem Statement</h4>
      <p>
        Everyone will starve if you only plant such a small number of seeds.
        Re-reading the almanac, it looks like the <code>seeds:</code> line
        actually describes
        <strong>ranges of seed numbers</strong>.
      </p>
      <p>
        The values on the initial <code>seeds:</code> line come in pairs. Within
        each pair, the first value is the <strong>start</strong> of the range
        and the second value is the
        <strong>length</strong> of the range. So, in the first line of the
        example above:
      </p>
      <DataBlock>seeds: 79 14 55 13</DataBlock>
      <p>
        This line describes two ranges of seed numbers to be planted in the
        garden. The first range starts with seed number <code>79</code> and
        contains <code>14</code> values: <code>79</code>, <code>80</code>, ...,{" "}
        <code>91</code>, <code>92</code>. The second range starts with seed
        number <code>55</code> and contains <code>13</code> values:{" "}
        <code>55</code>, <code>56</code>, ..., <code>66</code>, <code>67</code>.
      </p>
      <p>
        Now, rather than considering four seed numbers, you need to consider a
        total of <strong>27</strong> seed numbers.
      </p>
      <p>
        In the above example, the lowest location number can be obtained from
        seed number <code>82</code>, which corresponds to soil <code>84</code>,
        fertilizer <code>84</code>, water <code>84</code>, light <code>77</code>
        , temperature <code>45</code>, humidity <code>46</code>, and{" "}
        <strong>
          location <code>46</code>
        </strong>
        . So, the lowest location number is{" "}
        <strong>
          <code>46</code>
        </strong>
        .
      </p>
      <p>
        Consider all of the initial seed numbers listed in the ranges on the
        first line of the almanac.{" "}
        <strong>
          What is the lowest location number that corresponds to any of the
          initial seed numbers?
        </strong>
      </p>
      <h4 className="pt-3 pb-2">Test Implementation</h4>
      <p>
        At each stage, we're mapping one or more Ranges to one or more Ranges.
        At the end, the Range with the smallest start value is the lowest
        location number.
      </p>
      <VisualizeRanges almanac={part1Example} />
      <LowestLocationRange almanac={part1Example} expected={46} />
      <h4 className="pt-3 pb-2">Solution</h4>
      <LowestLocationRange almanac={puzzleInput} />
    </>
  );
}
