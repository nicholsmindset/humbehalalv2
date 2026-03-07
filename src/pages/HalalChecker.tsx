import { useState } from "react"
import { Search, ShieldCheck, AlertCircle, Clock, ExternalLink } from "lucide-react"
import { Button, Card, CardContent, Badge } from "@/components/ui"
import { GeometricPattern, SectionDivider } from "@/components/decorative"

type CheckStatus = "idle" | "loading" | "certified" | "not-found" | "expired"

interface CertResult {
  businessName: string
  certNumber: string
  issuedDate: string
  expiryDate: string
  category: string
  address: string
  isExpired: boolean
}

// Mock MUIS certificate database
const MOCK_CERTS: Record<string, CertResult> = {
  "MUIS-2024-WNP-4521": {
    businessName: "Warung Nasi Padang",
    certNumber: "MUIS-2024-WNP-4521",
    issuedDate: "1 Jan 2025",
    expiryDate: "31 Dec 2026",
    category: "Restaurant",
    address: "123 Geylang Road, #01-45, Singapore 389102",
    isExpired: false,
  },
  "MUIS-2023-KGC-1102": {
    businessName: "Kampong Glam Cafe",
    certNumber: "MUIS-2023-KGC-1102",
    issuedDate: "15 Mar 2024",
    expiryDate: "14 Mar 2026",
    category: "Food & Beverage",
    address: "28 Arab Street, Singapore 199734",
    isExpired: false,
  },
  "MUIS-2022-OLD-9988": {
    businessName: "Old Expired Restaurant",
    certNumber: "MUIS-2022-OLD-9988",
    issuedDate: "1 Jun 2022",
    expiryDate: "31 May 2024",
    category: "Restaurant",
    address: "99 Expired Street, Singapore 999999",
    isExpired: true,
  },
}

// Also search by business name
const CERT_BY_NAME: Record<string, string> = {
  "warung nasi padang": "MUIS-2024-WNP-4521",
  "kampong glam cafe": "MUIS-2023-KGC-1102",
  "bismillah biryani": "MUIS-2024-WNP-4521",
}

const recentChecks = [
  { name: "Warung Nasi Padang", status: "certified" as const, time: "2 min ago" },
  { name: "Bismillah Biryani", status: "certified" as const, time: "8 min ago" },
  { name: "Tampines Food Court", status: "certified" as const, time: "15 min ago" },
  { name: "Unknown Restaurant XYZ", status: "not-found" as const, time: "22 min ago" },
]

function HalalChecker() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<CheckStatus>("idle")
  const [result, setResult] = useState<CertResult | null>(null)

  async function handleCheck() {
    if (!query.trim()) return
    setStatus("loading")
    setResult(null)

    // Simulate API call
    await new Promise((r) => setTimeout(r, 900))

    const q = query.trim()

    // Try direct cert number lookup
    let cert = MOCK_CERTS[q.toUpperCase()]

    // Try business name lookup
    if (!cert) {
      const certNum = CERT_BY_NAME[q.toLowerCase()]
      if (certNum) cert = MOCK_CERTS[certNum]
    }

    if (!cert) {
      setStatus("not-found")
      return
    }

    setResult(cert)
    setStatus(cert.isExpired ? "expired" : "certified")
  }

  function handleReset() {
    setQuery("")
    setStatus("idle")
    setResult(null)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-16 text-white">
        <GeometricPattern variant="hero" />
        <div className="container-page relative z-10 text-center">
          <Badge variant="accent" size="lg" className="mb-4">
            <ShieldCheck className="mr-1.5 h-4 w-4" />
            Powered by MUIS Data
          </Badge>
          <h1 className="font-display text-h1 font-bold text-white">Halal Certification Checker</h1>
          <p className="mx-auto mt-3 max-w-xl text-body-lg text-primary-200">
            Verify any halal certificate or search by business name instantly.
            Stay confident about what you eat.
          </p>

          {/* Search box */}
          <div className="mx-auto mt-8 max-w-2xl">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-neutral-400">
                  <Search className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCheck()}
                  placeholder="Enter cert number (e.g. MUIS-2024-WNP-4521) or business name…"
                  className="h-14 w-full rounded-2xl border-0 bg-white pl-12 pr-4 text-body text-neutral-900 shadow-lg placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>
              <Button
                variant="accent"
                size="lg"
                onClick={handleCheck}
                disabled={status === "loading" || !query.trim()}
                className="shrink-0 rounded-2xl px-6"
              >
                {status === "loading" ? "Checking…" : "Verify"}
              </Button>
            </div>
            <p className="mt-3 text-caption text-primary-300">
              Try: "Warung Nasi Padang" or "MUIS-2024-WNP-4521"
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="section-padding-sm">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-6">

            {/* Loading skeleton */}
            {status === "loading" && (
              <div className="animate-pulse rounded-2xl border border-neutral-200 bg-white p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-neutral-200" />
                  <div className="space-y-2">
                    <div className="h-5 w-48 rounded bg-neutral-200" />
                    <div className="h-3 w-32 rounded bg-neutral-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  {[80, 60, 70, 50].map((w) => (
                    <div key={w} className="h-3 rounded bg-neutral-100" style={{ width: `${w}%` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Certified result */}
            {status === "certified" && result && (
              <Card className="overflow-hidden border-emerald-200">
                <div className="flex items-center gap-4 border-b border-emerald-100 bg-emerald-50 px-6 py-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-white">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-h3 font-bold text-emerald-900">{result.businessName}</h2>
                      <Badge variant="success" size="sm">Halal Certified ✓</Badge>
                    </div>
                    <p className="text-body-sm text-emerald-600">{result.certNumber}</p>
                  </div>
                </div>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Certificate Number", value: result.certNumber },
                      { label: "Category", value: result.category },
                      { label: "Issued Date", value: result.issuedDate },
                      { label: "Expiry Date", value: result.expiryDate },
                      { label: "Business Address", value: result.address },
                      { label: "Issuing Authority", value: "MUIS (Majlis Ugama Islam Singapura)" },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-caption font-semibold uppercase tracking-wider text-neutral-400">{label}</p>
                        <p className="mt-0.5 text-body-sm text-neutral-800">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-neutral-100 pt-5">
                    <a
                      href="https://www.muis.gov.sg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-body-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Verify on MUIS.gov.sg
                    </a>
                    <button onClick={handleReset} className="text-body-sm text-neutral-400 hover:text-neutral-600 underline">
                      Check another
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Expired */}
            {status === "expired" && result && (
              <Card className="overflow-hidden border-amber-200">
                <div className="flex items-center gap-4 border-b border-amber-100 bg-amber-50 px-6 py-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-white">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-display text-h3 font-bold text-amber-900">{result.businessName}</h2>
                      <Badge variant="warning" size="sm">Certificate Expired</Badge>
                    </div>
                    <p className="text-body-sm text-amber-700">
                      This certificate expired on <strong>{result.expiryDate}</strong>.
                    </p>
                  </div>
                </div>
                <CardContent>
                  <p className="text-body-sm text-neutral-600">
                    This business's MUIS halal certificate has expired. Their listing may still appear as "Pending
                    Verification" until they renew. We recommend contacting the business directly or checking
                    the MUIS website for the latest status.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <a
                      href="https://www.muis.gov.sg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-1.5 h-4 w-4" />
                        Check on MUIS
                      </Button>
                    </a>
                    <Button variant="ghost" size="sm" onClick={handleReset}>Check another</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Not found */}
            {status === "not-found" && (
              <Card className="overflow-hidden border-red-200">
                <div className="flex items-center gap-4 border-b border-red-100 bg-red-50 px-6 py-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-400 text-white">
                    <AlertCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="font-display text-h3 font-bold text-red-900">Not Found</h2>
                    <p className="text-body-sm text-red-600">
                      No valid halal certificate found for "<strong>{query}</strong>"
                    </p>
                  </div>
                </div>
                <CardContent>
                  <p className="text-body-sm text-neutral-600">
                    This could mean the business is not halal-certified, the certificate number is incorrect,
                    or the certificate has been revoked. Always verify directly with MUIS for critical decisions.
                  </p>
                  <div className="mt-4 flex gap-3">
                    <a
                      href="https://www.muis.gov.sg"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" size="sm">
                        <ExternalLink className="mr-1.5 h-4 w-4" />
                        Search on MUIS.gov.sg
                      </Button>
                    </a>
                    <Button variant="ghost" size="sm" onClick={handleReset}>Try again</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Info cards (shown when idle or after check) */}
            {status === "idle" && (
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  {
                    icon: ShieldCheck,
                    color: "bg-primary-100 text-primary-600",
                    title: "Real-Time Verification",
                    body: "Check any MUIS halal certificate instantly by certificate number or business name.",
                  },
                  {
                    icon: Search,
                    color: "bg-blue-100 text-blue-600",
                    title: "Search by Name",
                    body: "Don't have the cert number? Search by business name and we'll find it for you.",
                  },
                  {
                    icon: AlertCircle,
                    color: "bg-amber-100 text-amber-600",
                    title: "Expiry Alerts",
                    body: "We flag expired certificates so you can make informed choices with confidence.",
                  },
                ].map(({ icon: Icon, color, title, body }) => (
                  <Card key={title}>
                    <CardContent className="text-center">
                      <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="font-display text-body font-semibold text-neutral-900">{title}</h3>
                      <p className="mt-1 text-body-sm text-neutral-500">{body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Recent checks */}
            <Card>
              <CardContent>
                <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">Recent Checks</h3>
                <div className="space-y-0">
                  {recentChecks.map((check, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 py-3 ${i < recentChecks.length - 1 ? "border-b border-neutral-100" : ""}`}
                    >
                      <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${check.status === "certified" ? "bg-emerald-400" : "bg-red-400"}`} />
                      <span className="flex-1 text-body-sm text-neutral-700">{check.name}</span>
                      <Badge variant={check.status === "certified" ? "success" : "error"} size="sm">
                        {check.status === "certified" ? "Certified" : "Not Found"}
                      </Badge>
                      <span className="text-caption text-neutral-400">{check.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-body-sm text-neutral-500">
              <strong className="text-neutral-700">Disclaimer:</strong> HumbleHalal strives to keep certification
              data accurate but is not affiliated with MUIS. For legally binding verification, always check directly
              at{" "}
              <a
                href="https://www.muis.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                www.muis.gov.sg
              </a>
              .
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HalalChecker
