import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingProps {
  value: number
  max?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
  className?: string
}

const sizeClasses = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
}

function Rating({ value, max = 5, size = "md", showValue = true, className }: RatingProps) {
  const stars = Array.from({ length: max }, (_, i) => {
    const filled = i < Math.floor(value)
    const halfFilled = !filled && i < value

    return (
      <Star
        key={i}
        className={cn(
          sizeClasses[size],
          filled
            ? "fill-accent-400 text-accent-400"
            : halfFilled
              ? "fill-accent-400/50 text-accent-400"
              : "fill-neutral-200 text-neutral-200"
        )}
      />
    )
  })

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex gap-0.5">{stars}</div>
      {showValue && (
        <span className="ml-1 text-body-sm font-medium text-neutral-600">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  )
}

export { Rating }
export type { RatingProps }
