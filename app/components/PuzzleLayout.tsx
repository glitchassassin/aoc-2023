import { Link } from "@remix-run/react";
import { ReactNode } from "react";

export function PuzzleLayout({
  title,
  day,
  children,
}: {
  title: string;
  day: number;
  children: ReactNode;
}) {
  return (
    <>
      <h2>
        Day {day}: {title}
      </h2>
      <p>
        <Link
          className="link-light"
          to={`https://adventofcode.com/2023/day/${day}`}
        >
          Original
        </Link>
      </p>
      {children}
    </>
  );
}

export function PuzzleSection({
  problemStatement,
  testImplementation,
  solution,
}: {
  problemStatement: ReactNode;
  testImplementation: ReactNode;
  solution: ReactNode;
}) {
  return (
    <>
      <h4 className="pt-3 pb-2">Problem Statement</h4>
      {problemStatement}
      <h4 className="pt-3 pb-2">Test Implementation</h4>
      {testImplementation}
      <h4 className="pt-3 pb-2">Solution</h4>
      {solution}
    </>
  );
}
