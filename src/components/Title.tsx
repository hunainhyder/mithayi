import { Fragment } from "react";

/** Splits settings text on "|" or newlines into lines separated by <br />. */
export function Lines({ text }: { text: string }) {
  const lines = text.split(/\s*\|\s*|\r?\n/).filter(Boolean);
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

/**
 * A heading with an italic accent, built from the `*_title` and `*_title_accent`
 * settings. The accent follows on the same line when `inline`, otherwise on its own line.
 */
export default function Title({
  text,
  accent,
  inline = false,
}: {
  text: string;
  accent?: string;
  inline?: boolean;
}) {
  return (
    <>
      <Lines text={text} />
      {accent && (
        <>
          {text && (inline ? " " : <br />)}
          <em>{accent}</em>
        </>
      )}
    </>
  );
}
