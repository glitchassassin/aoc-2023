import type { ReactNode } from "react";

export function DataBlock({
  children,
  wrap,
}: {
  children: ReactNode;
  wrap?: boolean;
}) {
  return (
    <pre
      className="ps-3 border-start border-5 border-light lh-1"
      style={{ maxHeight: "300px", whiteSpace: wrap ? "normal" : undefined }}
    >
      {children}
    </pre>
  );
}
