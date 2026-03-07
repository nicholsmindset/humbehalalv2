import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { forwardRef, type InputHTMLAttributes } from "react"

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, onSearch, ...props }, ref) => {
    return (
      <div className={cn("relative w-full max-w-2xl", className)}>
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          ref={ref}
          type="search"
          className="flex h-14 w-full rounded-2xl border border-neutral-200 bg-white pl-12 pr-4 py-2 text-body text-neutral-900 shadow-md placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
          onChange={(e) => {
            if (onSearch) onSearch(e.currentTarget.value)
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onSearch) {
              onSearch(e.currentTarget.value)
            }
          }}
          {...props}
        />
      </div>
    )
  }
)
SearchBar.displayName = "SearchBar"

export { SearchBar }
