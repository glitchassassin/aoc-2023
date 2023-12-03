export function Solution<T>({ result }: { result: T }) {
  return (
    <div>
      Solution: <code>{JSON.stringify(result)}</code>
    </div>
  );
}
