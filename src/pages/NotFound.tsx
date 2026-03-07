import { Link } from "react-router-dom"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui"
import { GeometricPattern } from "@/components/decorative"

const quickLinks = [
  { label: "Business Directory", href: "/directory" },
  { label: "Community Events", href: "/events" },
  { label: "Classifieds", href: "/classifieds" },
  { label: "About HumbleHalal", href: "/about" },
]

function NotFound() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden bg-gradient-hero px-6 py-20 text-white">
      <GeometricPattern variant="hero" className="opacity-10" />

      <div className="relative z-10 text-center">
        {/* Large 404 */}
        <p className="font-display text-[8rem] font-bold leading-none text-white/20 select-none">
          404
        </p>

        <div className="-mt-6">
          {/* Islamic star */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5L10 1Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>

          <h1 className="font-display text-h1 font-bold text-white">Page Not Found</h1>
          <p className="mx-auto mt-3 max-w-md text-body-lg text-primary-200">
            This page has gone on a journey. Let&apos;s get you back on the right path.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/">
              <Button variant="accent" size="lg">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link to="/directory">
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Search className="mr-2 h-4 w-4" />
                Browse Directory
              </Button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-12">
            <p className="mb-4 text-body-sm text-primary-300">Or try one of these:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-body-sm text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
