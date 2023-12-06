import { Solution } from "./Solution";

export function SolutionTest<T>({
  result,
  expected,
}: {
  result: T;
  expected?: T;
}) {
  if (expected === undefined) {
    return <Solution result={result} />;
  }
  return (
    <div>
      Solution:&nbsp;
      {result === expected && (
        <span className="text-success">{JSON.stringify(result)} ✓</span>
      )}
      {result !== expected && (
        <>
          <span className="text-danger">{JSON.stringify(result)} ✗</span>{" "}
          (expected {JSON.stringify(expected)})
        </>
      )}
    </div>
  );
}
