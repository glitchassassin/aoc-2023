import type { MetaFunction } from "@remix-run/react";
import { Link } from "@remix-run/react";
import {
  calibrateDocumentWithWords,
  calibrateDocumentWithoutWords,
  calibrationValue,
  calibrationValueWithWords,
} from "~/solutions/day1";
import {
  demoCalibrationDocument,
  demoCalibrationDocument2,
  puzzleInput,
} from "~/solutions/day1/calibrationDocument";

export const meta: MetaFunction = () => {
  return [{ title: "AoC 2023 | Day 1" }];
};

export default function Day1() {
  return (
    <>
      <h2>
        <Link className="link-light" to="https://adventofcode.com/2023/day/1">
          Day 1: Trebuchet?!
        </Link>
      </h2>
      <h3>Part One</h3>
      <p>
        The newly-improved calibration document consists of lines of text; each
        line originally contained a specific calibration value that the Elves
        now need to recover. On each line, the calibration value can be found by
        combining the first digit and the last digit (in that order) to form a
        single two-digit number.
      </p>

      <p>For example:</p>

      <pre className="ps-3 border-start border-5 border-light">
        {demoCalibrationDocument}
      </pre>

      <p>
        In this example, the calibration values of these four lines are{" "}
        <code>12</code>, <code>38</code>, <code>15</code>, and <code>77</code>.
        Adding these together produces <code>142</code>.
      </p>

      <p>
        Consider your entire calibration document. What is the sum of all of the
        calibration values?
      </p>

      <pre
        className="ps-3 border-start border-5 border-light"
        style={{ maxHeight: "300px" }}
      >
        {puzzleInput
          .split("\n")
          .map((l) => `${l}: ${calibrationValue(l)}`)
          .join("\n")}
      </pre>

      <p>
        Solution: <code>{calibrateDocumentWithoutWords(puzzleInput)}</code>
      </p>

      <h3>Part Two</h3>
      <p>
        Your calculation isn't quite right. It looks like some of the digits are
        actually spelled out with letters: <code>one</code>, <code>two</code>,{" "}
        <code>three</code>, <code>four</code>, <code>five</code>,{" "}
        <code>six</code>, <code>seven</code>, <code>eight</code>, and{" "}
        <code>nine</code> also count as valid "digits".
      </p>
      <p>
        Equipped with this new information, you now need to find the real first
        and last digit on each line. For example:
      </p>

      <pre className="ps-3 border-start border-5 border-light">
        {demoCalibrationDocument2}
      </pre>

      <p>
        In this example, the calibration values are <code>29</code>,{" "}
        <code>83</code>, <code>13</code>, <code>24</code>, <code>42</code>,{" "}
        <code>14</code>, and <code>76</code>. Adding these together produces{" "}
        <code>281</code>.
      </p>

      <p>What is the sum of all of the calibration values?</p>

      <pre
        className="ps-3 border-start border-5 border-light"
        style={{ maxHeight: "300px" }}
      >
        {puzzleInput
          .split("\n")
          .map((l) => `${l}: ${calibrationValueWithWords(l)}`)
          .join("\n")}
      </pre>

      <p>
        Solution: <code>{calibrateDocumentWithWords(puzzleInput)}</code>
      </p>
    </>
  );
}
