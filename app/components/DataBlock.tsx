import type { ReactNode } from "react";

export function DataBlock({ children }: { children: ReactNode }) {
  return (
    <pre
      className="ps-3 border-start border-5 border-light"
      style={{ maxHeight: "300px" }}
    >
      {children}
    </pre>
  );
}
