export function SolutionTest<T>({
  result,
  expected,
}: {
  result: T;
  expected: T;
}) {
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
