import type { ReactNode } from "react";

export function SpanTest<T>({
  label,
  result,
  expected,
}: {
  label: ReactNode;
  result: T;
  expected: T;
}) {
  return (
    <>
      {label}{" "}
      {result === expected && (
        <span className="text-success">{JSON.stringify(result)} ✓</span>
      )}
      {result !== expected && (
        <>
          <span className="text-danger">{JSON.stringify(result)} ✗</span>{" "}
          (expected {JSON.stringify(expected)})
        </>
      )}
    </>
  );
}
