type ScaleIconProps = {
  className?: string;
  size?: number;
};

export function ScaleIcon({ className = '', size = 24 }: ScaleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base */}
      <path
        d="M4 20h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vertical pole */}
      <path
        d="M12 20V4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top horizontal bar */}
      <path
        d="M6 4h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left scale */}
      <path
        d="M6 4L3 10h6L6 4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right scale */}
      <path
        d="M18 4l-3 6h6l-3-6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left scale bottom */}
      <path
        d="M3 10v1a3 3 0 006 0v-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right scale bottom */}
      <path
        d="M15 10v1a3 3 0 006 0v-1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
