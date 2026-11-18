type Props = { size?: number; shadow?: boolean };

/** SK monogram — heavy overlapping letters on a white ring badge. */
export default function Logo({ size = 74 }: Props) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="19.4" fill="#F4F4F5" />
      <circle cx="20" cy="20" r="16.6" fill="#FFFFFF" stroke="#E2E2E4" strokeWidth="0.8" />
      <text
        x="20.4"
        y="26.4"
        textAnchor="middle"
        fill="#0A0A0A"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinejoin="round"
        style={{
          fontFamily: 'var(--font-outfit), system-ui, sans-serif',
          fontWeight: 800,
          fontSize: 18,
          letterSpacing: -2,
          paintOrder: 'stroke fill',
        }}
      >
        SK
      </text>
    </svg>
  );
}
