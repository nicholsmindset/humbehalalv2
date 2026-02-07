import { cn } from "@/lib/utils"

interface GeometricPatternProps {
  variant?: "hero" | "section" | "card"
  className?: string
}

/**
 * Islamic geometric pattern as an SVG background decoration.
 * Based on traditional 8-point star (Khatam) motif common in Islamic art.
 */
function GeometricPattern({ variant = "section", className }: GeometricPatternProps) {
  const patternId = `islamic-pattern-${variant}`

  if (variant === "hero") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden opacity-10",
          className
        )}
        aria-hidden="true"
      >
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* 8-point star pattern */}
              <path
                d="M40 0 L48 16 L64 8 L56 24 L72 24 L60 36 L72 48 L56 48 L64 64 L48 56 L40 72 L32 56 L16 64 L24 48 L8 48 L20 36 L8 24 L24 24 L16 8 L32 16 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
              {/* Inner octagon */}
              <path
                d="M40 20 L48 28 L56 36 L48 44 L40 52 L32 44 L24 36 L32 28 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>
    )
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute -right-4 -top-4 opacity-5",
          className
        )}
        aria-hidden="true"
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Single decorative star */}
          <path
            d="M60 0 L72 24 L96 12 L84 36 L108 36 L90 54 L108 72 L84 72 L96 96 L72 84 L60 108 L48 84 L24 96 L36 72 L12 72 L30 54 L12 36 L36 36 L24 12 L48 24 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary-500"
          />
          <path
            d="M60 30 L72 42 L84 54 L72 66 L60 78 L48 66 L36 54 L48 42 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary-500"
          />
        </svg>
      </div>
    )
  }

  // section variant - horizontal border pattern
  return (
    <div
      className={cn(
        "pointer-events-none flex justify-center overflow-hidden opacity-20",
        className
      )}
      aria-hidden="true"
    >
      <svg
        width="400"
        height="24"
        viewBox="0 0 400 24"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary-500"
      >
        {/* Repeating diamond border */}
        {Array.from({ length: 17 }, (_, i) => (
          <g key={i} transform={`translate(${i * 24}, 0)`}>
            <path
              d="M12 0 L24 12 L12 24 L0 12 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M12 6 L18 12 L12 18 L6 12 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

export { GeometricPattern }
