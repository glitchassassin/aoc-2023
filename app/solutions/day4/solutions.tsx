import classNames from "classnames";
import { DataBlock } from "~/components/DataBlock";
import { LineTest } from "~/components/LineTest";
import { Solution } from "~/components/Solution";
import { SolutionTest } from "~/components/SolutionTest";

function parseCard(card: string) {
  const [cardSegment, rest] = card.split(":");
  const cardNumber = parseInt(cardSegment.replace("Card", "").trim());
  const [winningNumbers, yourNumbers] = rest
    .split("|")
    .map((line) => line.trim().replaceAll("  ", " ").split(" "));

  const yourWinningNumbers = yourNumbers.filter((n) =>
    winningNumbers.includes(n)
  ).length;
  const points =
    yourWinningNumbers > 0 ? Math.pow(2, yourWinningNumbers - 1) : 0;

  return {
    cardNumber,
    cardSegment,
    winningNumbers,
    yourNumbers,
    points,
    yourWinningNumbers,
  };
}

function countCards(cards: string[]) {
  const copies = new Map<number, number>();
  const cardData: { copies: number; card: string }[] = [];
  let total = 0;
  for (const card of cards) {
    const { cardNumber, yourWinningNumbers } = parseCard(card);
    const multiplier = (copies.get(cardNumber) ?? 0) + 1;
    total += multiplier;
    if (yourWinningNumbers > 0) {
      for (let i = cardNumber + 1; i <= cardNumber + yourWinningNumbers; i++) {
        copies.set(i, (copies.get(i) ?? 0) + multiplier);
      }
    }
    cardData.push({ copies: multiplier, card });
  }

  return {
    total,
    cardData,
  };
}

export function HighlightWinningNumbers({ card }: { card: string }) {
  const { cardSegment, winningNumbers, yourNumbers } = parseCard(card);

  return (
    <>
      {cardSegment}: {winningNumbers.map((n) => n.padStart(2, " ")).join(" ")} |{" "}
      {yourNumbers.map((n) => (
        <span
          key={n}
          className={classNames({ "text-success": winningNumbers.includes(n) })}
        >
          {n.padStart(2, " ")}&nbsp;
        </span>
      ))}
    </>
  );
}

export function RenderCard({
  card,
  expected,
}: {
  card: string;
  expected?: number;
}) {
  const { points } = parseCard(card);

  if (expected !== undefined) {
    return (
      <LineTest
        line={<HighlightWinningNumbers card={card} />}
        result={points}
        expected={expected}
      />
    );
  } else {
    return (
      <div>
        <HighlightWinningNumbers card={card} /> - {points}
      </div>
    );
  }
}

export function TotalScore({
  cards,
  expected,
}: {
  cards: string[];
  expected?: number;
}) {
  const total = cards.reduce((sum, card) => sum + parseCard(card).points, 0);
  if (expected === undefined) {
    return <Solution result={total} />;
  } else {
    return <SolutionTest result={total} expected={expected} />;
  }
}

export function RenderCardCopies({
  card,
  expected,
  copies,
}: {
  card: string;
  copies: number;
  expected?: number;
}) {
  const { yourWinningNumbers } = parseCard(card);

  if (expected !== undefined) {
    return (
      <LineTest
        line={
          <>
            {copies.toFixed(0).padStart(7, " ")}x{" "}
            <HighlightWinningNumbers card={card} />
          </>
        }
        result={yourWinningNumbers}
        expected={expected}
      />
    );
  } else {
    return (
      <div>
        {copies.toFixed(0).padStart(7, " ")}x{" "}
        <HighlightWinningNumbers card={card} /> - {yourWinningNumbers}
      </div>
    );
  }
}

export function RenderTotalCopies({
  cards,
  expected,
}: {
  cards: string[];
  expected?: number;
}) {
  const { total, cardData } = countCards(cards);

  return (
    <>
      <DataBlock>
        {cardData.map((card) => (
          <RenderCardCopies
            key={card.card}
            card={card.card}
            copies={card.copies}
          />
        ))}
      </DataBlock>
      {expected === undefined && <Solution result={total} />}
      {expected !== undefined && (
        <SolutionTest result={total} expected={expected} />
      )}
    </>
  );
}
