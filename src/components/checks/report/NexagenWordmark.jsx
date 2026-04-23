// Nexagen wordmark — a biotech-feel typographic mark. Intentionally not Atlas-branded.
// Green hex orbit + "nexagen" wordmark underneath.
export function NexagenWordmark({ size = 'md' }) {
  const scale = size === 'sm' ? 0.7 : size === 'lg' ? 1.35 : 1
  const hex = 40 * scale
  const stroke = 2 * scale
  const textSize = `${14 * scale}px`
  return (
    <div className="flex items-center gap-2" style={{ color: '#0f6b55' }}>
      <svg
        width={hex}
        height={hex}
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* Hex outline */}
        <polygon
          points="20,3 35.5,12 35.5,28 20,37 4.5,28 4.5,12"
          fill="none"
          stroke="#0f6b55"
          strokeWidth={stroke}
          strokeLinejoin="round"
        />
        {/* Inner stylised "N" suggesting DNA / helix */}
        <path
          d="M13 27 L13 14 L27 26 L27 13"
          fill="none"
          stroke="#0f6b55"
          strokeWidth={stroke + 0.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="13" cy="14" r="1.8" fill="#26a884" />
        <circle cx="27" cy="26" r="1.8" fill="#26a884" />
      </svg>
      <div
        style={{ fontSize: textSize, letterSpacing: '0.02em' }}
        className="font-sans font-bold leading-none tracking-tight"
      >
        nexagen
        <span className="text-[#26a884]">.</span>
      </div>
    </div>
  )
}
