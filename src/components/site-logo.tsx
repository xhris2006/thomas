import { cx } from "@/lib/utils";

export function SiteLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 190"
      className={cx("h-14 w-14", className)}
      aria-label="Collège Saint Thomas d'Aquin"
      role="img"
    >
      <path
        d="M90 8L153 32V92C153 130 127 162 90 181C53 162 27 130 27 92V32L90 8Z"
        fill="#1A3A6B"
      />
      <path
        d="M90 19L144 39V91C144 123 122 151 90 169C58 151 36 123 36 91V39L90 19Z"
        fill="white"
      />
      <path
        d="M90 29L136 46V91C136 118 118 142 90 158C62 142 44 118 44 91V46L90 29Z"
        fill="#1A3A6B"
      />
      <path d="M63 105H117V119H63Z" fill="#C9A84C" />
      <path d="M72 71L90 46L108 71L101 75L96 69V101H84V69L79 75L72 71Z" fill="#C9A84C" />
      <path
        d="M57 109C61 93 72 84 90 84C108 84 119 93 123 109"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M61 113H119C117 126 108 135 90 141C72 135 63 126 61 113Z" fill="white" />
      <path d="M88 113H92V141H88Z" fill="#C9A84C" />
      <path d="M73 119H107" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round" />
      <text
        x="90"
        y="154"
        textAnchor="middle"
        fill="#C9A84C"
        fontSize="24"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
      >
        STA
      </text>
    </svg>
  );
}
