/**
 * KakaoTalk speech-bubble mark. lucide-react has no Kakao icon, so this is inline.
 * Always decorative — the accessible name lives on the wrapping link.
 */
export function KakaoIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 3C6.9 3 2.75 6.29 2.75 10.35c0 2.59 1.72 4.86 4.31 6.16-.19.69-.69 2.5-.79 2.89-.12.48.18.48.37.35.15-.1 2.4-1.63 3.38-2.29.64.09 1.3.14 1.98.14 5.1 0 9.25-3.29 9.25-7.35S17.1 3 12 3Z" />
    </svg>
  );
}
