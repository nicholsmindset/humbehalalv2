import { Link } from "react-router-dom"
import { GeometricPattern } from "@/components/decorative/GeometricPattern"

const footerLinks = {
  explore: [
    { label: "Business Directory", href: "/directory" },
    { label: "Events", href: "/events" },
    { label: "Featured Districts", href: "/directory" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "List Your Business", href: "/submit-business" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}

function Footer() {
  return (
    <footer className="relative border-t border-neutral-200 bg-neutral-900 text-neutral-300">
      <GeometricPattern variant="hero" className="opacity-5" />

      <div className="container-page relative py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5L10 1Z"
                    fill="white"
                  />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-white">
                Humble<span className="text-primary-400">Halal</span>
              </span>
            </Link>
            <p className="mt-3 text-body-sm text-neutral-400">
              Connecting Singapore's Muslim community with halal-certified
              businesses and events.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-3 font-sans text-body-sm font-semibold uppercase tracking-wider text-neutral-200">
              Explore
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-body-sm text-neutral-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 font-sans text-body-sm font-semibold uppercase tracking-wider text-neutral-200">
              Company
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-body-sm text-neutral-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 font-sans text-body-sm font-semibold uppercase tracking-wider text-neutral-200">
              Legal
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-body-sm text-neutral-400 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-neutral-800 pt-6 text-center">
          <p className="text-caption text-neutral-500">
            &copy; {new Date().getFullYear()} HumbleHalal. All rights reserved.
            Made with care in Singapore.
          </p>
        </div>
      </div>
    </footer>
  )
}

export { Footer }
