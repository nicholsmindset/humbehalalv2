import { useState, useRef, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X, LayoutDashboard, LogOut, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"

const navLinks = [
  { label: "Directory", href: "/directory" },
  { label: "Events", href: "/events" },
  { label: "Classifieds", href: "/classifieds" },
  { label: "Prayer Times", href: "/prayer-times" },
  { label: "Halal Check", href: "/halal-checker" },
  { label: "About", href: "/about" },
]

function UserMenu() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  if (!user) return null

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-1.5 text-body-sm font-medium text-neutral-700 shadow-sm transition-colors hover:border-primary-300 hover:bg-primary-50"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
          {user.avatar}
        </div>
        <span className="max-w-[100px] truncate">{user.name.split(" ")[0]}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
          <div className="border-b border-neutral-100 px-4 py-3">
            <p className="text-body-sm font-semibold text-neutral-900">{user.name}</p>
            <p className="truncate text-caption text-neutral-400">{user.email}</p>
          </div>
          <div className="py-1">
            <button
              onClick={() => { setOpen(false); navigate("/dashboard") }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-body-sm text-neutral-600 transition-colors hover:bg-neutral-50"
            >
              <LayoutDashboard className="h-4 w-4 text-neutral-400" />
              Dashboard
            </button>
            <button
              onClick={() => { setOpen(false); navigate("/dashboard/profile") }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-body-sm text-neutral-600 transition-colors hover:bg-neutral-50"
            >
              <User className="h-4 w-4 text-neutral-400" />
              My Profile
            </button>
            <div className="my-1 border-t border-neutral-100" />
            <button
              onClick={() => { setOpen(false); signOut(); navigate("/") }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-body-sm text-red-500 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5L10 1Z" fill="white" />
            </svg>
          </div>
          <span className="font-display text-xl font-bold text-neutral-900">
            Humble<span className="text-primary-500">Halal</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-body-sm font-medium transition-colors whitespace-nowrap",
                location.pathname === link.href
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="primary" size="sm">Join Free</Button>
              </Link>
            </>
          )}
          <Link to="/submit-business">
            <Button variant="accent" size="sm">List Your Business</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="border-t border-neutral-200 bg-white lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-body font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-primary-50 text-primary-700"
                    : "text-neutral-600 hover:bg-neutral-100"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-neutral-100 pt-3">
              {isAuthenticated ? (
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="md" className="w-full">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/sign-in" onClick={() => setMobileOpen(false)}>
                    <Button variant="outline" size="md" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/sign-up" onClick={() => setMobileOpen(false)}>
                    <Button variant="primary" size="md" className="w-full">Join Free</Button>
                  </Link>
                </>
              )}
              <Link to="/submit-business" onClick={() => setMobileOpen(false)}>
                <Button variant="accent" size="md" className="w-full">List Your Business</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export { Header }
