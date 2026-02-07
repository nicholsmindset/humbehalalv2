import { ShieldCheck, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface HalalBadgeProps {
  status: "certified" | "pending"
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeConfig = {
  sm: { badge: "px-2 py-0.5 text-caption gap-1", icon: "h-3 w-3" },
  md: { badge: "px-2.5 py-1 text-body-sm gap-1.5", icon: "h-4 w-4" },
  lg: { badge: "px-3 py-1.5 text-body gap-2", icon: "h-5 w-5" },
}

function HalalBadge({ status, size = "md", className }: HalalBadgeProps) {
  const config = sizeConfig[size]

  if (status === "certified") {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-full font-semibold bg-primary-100 text-primary-700 border border-primary-300 halal-glow",
          config.badge,
          className
        )}
      >
        <ShieldCheck className={config.icon} />
        Halal Certified
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium bg-accent-100 text-accent-700 border border-accent-300",
        config.badge,
        className
      )}
    >
      <Clock className={config.icon} />
      Pending Verification
    </span>
  )
}

export { HalalBadge }
export type { HalalBadgeProps }
