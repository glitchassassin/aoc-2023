export function LineTest<T>({
  line,
  result,
  expected,
}: {
  line: string;
  result: T;
  expected: T;
}) {
  return (
    <div>
      {line}&nbsp;
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
