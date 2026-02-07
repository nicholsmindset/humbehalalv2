import { cva, type VariantProps } from "class-variance-authority"
import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
        secondary:
          "bg-primary-50 text-primary-700 hover:bg-primary-100 active:bg-primary-200",
        accent:
          "bg-accent-500 text-white hover:bg-accent-600 active:bg-accent-700",
        outline:
          "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 active:bg-primary-100",
        ghost:
          "text-neutral-600 hover:bg-neutral-100 active:bg-neutral-200",
        link:
          "text-primary-600 underline-offset-4 hover:underline",
        danger:
          "bg-error text-white hover:bg-red-600 active:bg-red-700",
      },
      size: {
        sm: "h-8 rounded-md px-3 text-body-sm",
        md: "h-10 rounded-lg px-4 text-body-sm",
        lg: "h-12 rounded-lg px-6 text-body",
        xl: "h-14 rounded-xl px-8 text-body-lg font-semibold",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
export type { ButtonProps }
