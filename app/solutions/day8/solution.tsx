import { SolutionTest } from "~/components/SolutionTest";

const parseMaps = (maps: string) => {
  const [instructions, network] = maps.split("\n\n");
  return {
    instructions,
    networkMap: network.split("\n"),
  };
};

const parseNetwork = (networkMap: string[]) => {
  const network: Record<string, { L: string; R: string }> = {};

  for (const line of networkMap) {
    const [key, L, R] = [
      ...line.matchAll(/(.{3}) = \((.{3}), (.{3})\)/g),
    ][0].slice(1, 4);
    network[key] = { L, R };
  }

  return network;
};

type Network = ReturnType<typeof parseNetwork>;

const navigateNetwork = (network: Network, instructions: string) => {
  let current = "AAA";
  let iterator = 0;
  while (current !== "ZZZ") {
    current =
      network[current][
        instructions[iterator % instructions.length] as "L" | "R"
      ];
    iterator++;
  }
  return iterator;
};

const factors = (n: number) =>
  new Array(n)
    .fill(0)
    .map((_, i) => i + 1)
    .filter((i) => n % i === 0);

const greatestCommonFactor = (numbers: number[]) => {
  const allFactors = numbers.map((n) => factors(n).reverse());
  return allFactors[0].find((f) => allFactors.every((s) => s.includes(f))) ?? 1;
};

const stepsToFirstZ = (
  network: Network,
  instructions: string,
  startingAt: string
) => {
  let current = startingAt;
  let iterator = 0;
  while (!current.endsWith("Z")) {
    current =
      network[current][
        instructions[iterator % instructions.length] as "L" | "R"
      ];
    iterator++;
  }
  return iterator;
};

const simultaneousNavigateNetwork = (
  network: Network,
  instructions: string
) => {
  let current = Object.keys(network).filter((k) => k.endsWith("A"));
  const steps = current.map((startingAt) =>
    stepsToFirstZ(network, instructions, startingAt)
  );

  const gcf = greatestCommonFactor(steps);

  return steps.map((s) => s / gcf).reduce((a, b) => a * b) * gcf;
};

export function NavigateMaps({
  maps,
  expected,
}: {
  maps: string;
  expected?: number;
}) {
  const { instructions, networkMap } = parseMaps(maps);
  const network = parseNetwork(networkMap);

  const steps = navigateNetwork(network, instructions);

  return <SolutionTest result={steps} expected={expected} />;
}

export function NavigatePathPeriods({ maps }: { maps: string }) {
  const { instructions, networkMap } = parseMaps(maps);
  const network = parseNetwork(networkMap);

  const paths = Object.keys(network)
    .filter((k) => k.endsWith("A"))
    .map((startingPoint) => ({
      startingPoint,
      z: stepsToFirstZ(network, instructions, startingPoint),
    }));
  const gcf = greatestCommonFactor(paths.map(({ z }) => z));

  return (
    <>
      <ul>
        {paths.map(({ startingPoint, z }) => {
          return (
            <li key={startingPoint}>
              Path {startingPoint}: first Z at {z} (factors{" "}
              {JSON.stringify(factors(z))})
            </li>
          );
        })}
      </ul>
      <p>Greatest Common Factor: {gcf}</p>
      <p>
        Formula:{" "}
        <code>
          ((z<sub>1</sub> / gcf) * (z<sub>2</sub> / gcf) * (...)) * gcf
        </code>
      </p>
    </>
  );
}

export function SimultaneousNavigateMaps({
  maps,
  expected,
}: {
  maps: string;
  expected?: number;
}) {
  const { instructions, networkMap } = parseMaps(maps);
  const network = parseNetwork(networkMap);

  const steps = simultaneousNavigateNetwork(network, instructions);

  return (
    <SolutionTest result={steps.toString()} expected={expected?.toString()} />
  );
}
