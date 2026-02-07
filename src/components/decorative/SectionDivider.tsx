import { cn } from "@/lib/utils"

interface SectionDividerProps {
  className?: string
}

function SectionDivider({ className }: SectionDividerProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-4 py-2", className)}
      aria-hidden="true"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="text-primary-400 shrink-0"
      >
        <path
          d="M10 0 L14 6 L20 10 L14 14 L10 20 L6 14 L0 10 L6 6 Z"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
    </div>
  )
}

export { SectionDivider }
