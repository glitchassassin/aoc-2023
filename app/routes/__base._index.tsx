import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => redirect("/day1");

export default function Index() {
  return <p>Select a day from the sidebar</p>;
}
