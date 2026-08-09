import type { TechniqueSlug } from "@/lib/content";

/**
 * The four vessel icons — jar, globe, pot, moss ball.
 * Shared 1.4px stroke on a 32-unit grid, matching the logo's construction
 * weight. This is the identity's most reusable asset: it gives four disparate
 * offerings one visual family without forcing four photographs to match.
 */
export function VesselIcon({
  technique,
  size = 32,
  className = "",
}: {
  technique: TechniqueSlug;
  size?: number;
  className?: string;
}) {
  const paths: Record<TechniqueSlug, React.ReactNode> = {
    sealed: (
      <>
        <path d="M11 5h10v3l-1 2v14a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10l-1-2z" />
        <path d="M12 20h8" />
      </>
    ),
    open: (
      <>
        <circle cx="16" cy="18" r="9" />
        <path d="M13 9.5A9 9 0 0 1 19 9.5" />
        <path d="M16 4v3" />
        <path d="M8.5 22h15" />
      </>
    ),
    potted: (
      <>
        <path d="M7 12h18l-2 13a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2z" />
        <path d="M6 9h20v3H6z" />
      </>
    ),
    bound: (
      <>
        <circle cx="16" cy="21" r="7" />
        <path d="M16 14V8M16 8c-2-1-3-3-3-5M16 8c2-1 3-3 3-5" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[technique]}
    </svg>
  );
}

/**
 * The Rosette A. Two leaves radiate from a single growth point and read as the
 * diagonals of an A; a third lies flat as the crossbar. Three shapes, so it
 * survives at 16px. Deliberately a generic growing plant rather than a named
 * species, because three of the four workshops use soil.
 */
export function Logo({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <g fill="currentColor">
        <path d="M50 14 C50 44 38 68 14 84 C30 64 44 42 44 15 Z" />
        <path d="M50 14 C50 44 62 68 86 84 C70 64 56 42 56 15 Z" />
      </g>
      <path d="M28 64 C40 60 60 60 72 64 C60 68 40 68 28 64 Z" fill="#93C13F" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6a11 11 0 0 1-4.2-3.9c-.3-.5-.7-1.2-.7-2.2 0-1 .5-1.5.7-1.7.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.3.4c-.1.1-.2.3-.1.5.2.4.7 1.1 1.3 1.6.7.6 1.3.8 1.6.9.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3v.8Z" />
    </svg>
  );
}

export function MailIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  );
}
