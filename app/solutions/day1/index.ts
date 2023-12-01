export function calibrationValue(line: string) {
  const digits = [...line.matchAll(/\d/g)].map((r) => r[0]);
  return parseInt(digits[0] + digits[digits.length - 1]);
}

export function calibrationValueWithWords(line: string) {
  let first: string | undefined, last: string | undefined;
  const map = new Map<string, string>();
  map.set("one", "1");
  map.set("two", "2");
  map.set("three", "3");
  map.set("four", "4");
  map.set("five", "5");
  map.set("six", "6");
  map.set("seven", "7");
  map.set("eight", "8");
  map.set("nine", "9");
  for (let i = 0; i < line.length; i++) {
    const match = line
      .slice(i)
      .match(/^(\d|one|two|three|four|five|six|seven|eight|nine)/g);
    if (match) {
      first ??= map.get(match[0]) ?? match[0];
      last = map.get(match[0]) ?? match[0];
    }
  }

  if (!first || !last) throw new Error("Failed to calibrate line: " + line);

  return parseInt(first + last);
}

export const calibrateDocument =
  (fn: (line: string) => number) => (lines: string) => {
    return lines
      .split("\n")
      .map(fn)
      .reduce((a, b) => a + b, 0);
  };

export const calibrateDocumentWithoutWords =
  calibrateDocument(calibrationValue);
export const calibrateDocumentWithWords = calibrateDocument(
  calibrationValueWithWords
);
