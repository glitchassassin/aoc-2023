import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return json({}, { status: 404, statusText: "Not Found" });
};

export default function PageNotFound() {
  return (
    <>
      <h2>Oops</h2>
      <p>Page Not Found</p>
    </>
  );
}
