import { expect, test } from "vitest";
import {
  calibrateDocumentWithWords,
  calibrateDocumentWithoutWords,
  calibrationValue,
  calibrationValueWithWords,
} from ".";
import {
  demoCalibrationDocument,
  demoCalibrationDocument2,
} from "./calibrationDocument";

test("calibrates lines without words", () => {
  const lines = demoCalibrationDocument.split("\n");
  expect(calibrationValue(lines[0])).toBe(12);
  expect(calibrationValue(lines[1])).toBe(38);
  expect(calibrationValue(lines[2])).toBe(15);
  expect(calibrationValue(lines[3])).toBe(77);
});

test("calibrates text without words", () => {
  expect(calibrateDocumentWithoutWords(demoCalibrationDocument)).toBe(142);
});

test("calibrates lines with words", () => {
  const lines = demoCalibrationDocument2.split("\n");
  expect(calibrationValueWithWords(lines[0])).toBe(29);
  expect(calibrationValueWithWords(lines[1])).toBe(83);
  expect(calibrationValueWithWords(lines[2])).toBe(13);
  expect(calibrationValueWithWords(lines[3])).toBe(24);
  expect(calibrationValueWithWords(lines[4])).toBe(42);
  expect(calibrationValueWithWords(lines[5])).toBe(14);
  expect(calibrationValueWithWords(lines[6])).toBe(76);
  expect(calibrationValueWithWords("bkt1seven")).toBe(17);
});

test("calibrates text with words", () => {
  expect(calibrateDocumentWithWords(demoCalibrationDocument2)).toBe(281);
});
