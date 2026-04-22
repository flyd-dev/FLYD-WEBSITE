import clsx from 'clsx';

type Variant = 'teal' | 'ink' | 'paper';

/**
 * The "fullflyd." mark: "full" in outline, "flyd." in solid, reading as a
 * single wordmark used as an oversized graphic accent.
 */
export default function FullflydMark({
  variant = 'teal',
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const solid =
    variant === 'teal'
      ? 'text-flyd-teal'
      : variant === 'ink'
      ? 'text-flyd-ink'
      : 'text-flyd-paper';

  const outlineColor =
    variant === 'teal'
      ? '#8BC0BE'
      : variant === 'ink'
      ? '#1F1F1F'
      : '#FFFFFF';

  return (
    <span
      className={clsx(
        'wordmark inline-block select-none whitespace-nowrap leading-none',
        className,
      )}
      aria-hidden="true"
    >
      <span
        style={{
          WebkitTextStroke: `2px ${outlineColor}`,
          color: 'transparent',
        }}
      >
        full
      </span>
      <span className={solid}>flyd.</span>
    </span>
  );
}
