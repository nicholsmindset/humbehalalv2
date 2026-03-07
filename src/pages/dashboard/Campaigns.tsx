import { useState } from "react"
import { Megaphone, Star, Zap, Target, CheckCircle, TrendingUp, Clock, BarChart3, X } from "lucide-react"
import { Badge, Card, CardContent, Button } from "@/components/ui"

type CampaignStatus = "active" | "paused" | "ended" | "draft"

interface Campaign {
  id: string
  name: string
  type: string
  status: CampaignStatus
  budget: string
  spent: string
  views: number
  clicks: number
  startDate: string
  endDate: string
}

interface Package {
  id: string
  name: string
  price: string
  period: string
  icon: React.ElementType
  color: string
  features: string[]
  highlight?: boolean
  badge?: string
}

const activeCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Ramadan Featured Listing",
    type: "Featured Placement",
    status: "active",
    budget: "$58",
    spent: "$29",
    views: 4231,
    clicks: 312,
    startDate: "1 Mar 2026",
    endDate: "31 Mar 2026",
  },
]

const pastCampaigns: Campaign[] = [
  {
    id: "2",
    name: "Hari Raya Spotlight",
    type: "Homepage Banner",
    status: "ended",
    budget: "$49",
    spent: "$49",
    views: 8320,
    clicks: 521,
    startDate: "15 Apr 2025",
    endDate: "15 May 2025",
  },
  {
    id: "3",
    name: "December Promo",
    type: "Featured Placement",
    status: "ended",
    budget: "$29",
    spent: "$29",
    views: 3410,
    clicks: 198,
    startDate: "1 Dec 2025",
    endDate: "31 Dec 2025",
  },
]

const packages: Package[] = [
  {
    id: "featured",
    name: "Featured Listing",
    price: "$29",
    period: "/month",
    icon: Star,
    color: "bg-primary-500",
    features: [
      "Top placement in category search",
      "\"Featured\" badge on listing card",
      "Priority in district browse results",
      "Estimated +120% more views",
      "Cancel anytime",
    ],
  },
  {
    id: "spotlight",
    name: "Homepage Spotlight",
    price: "$49",
    period: "/month",
    icon: Zap,
    color: "bg-accent-500",
    highlight: true,
    badge: "Most Popular",
    features: [
      "Everything in Featured Listing",
      "Appear on homepage \"Featured Businesses\"",
      "\"Spotlight\" badge on listing",
      "Estimated +300% more views",
      "Priority customer support",
    ],
  },
  {
    id: "campaign",
    name: "Campaign Boost",
    price: "$19",
    period: "/event",
    icon: Megaphone,
    color: "bg-purple-500",
    features: [
      "Promote a specific event or promo",
      "Banner on Events page",
      "Push notification to subscribers",
      "Social media story inclusion",
      "3-day minimum duration",
    ],
  },
  {
    id: "social",
    name: "Social Media Boost",
    price: "$39",
    period: "/week",
    icon: Target,
    color: "bg-rose-500",
    features: [
      "Feature in HumbleHalal Instagram story",
      "Facebook post to 15K+ followers",
      "WhatsApp broadcast mention",
      "Branded photo template provided",
      "Performance report included",
    ],
  },
]

const statusColors: Record<CampaignStatus, string> = {
  active: "success",
  paused: "warning",
  ended: "default",
  draft: "info",
}

function CampaignRow({ c }: { c: Campaign }) {
  const ctr = c.views > 0 ? ((c.clicks / c.views) * 100).toFixed(1) : "0"
  return (
    <div className="grid grid-cols-[1fr,auto,auto,auto,auto,auto] items-center gap-4 py-3 text-body-sm border-b border-neutral-100 last:border-0">
      <div>
        <p className="font-medium text-neutral-800">{c.name}</p>
        <p className="text-caption text-neutral-400">{c.type} · {c.startDate} – {c.endDate}</p>
      </div>
      <Badge variant={statusColors[c.status] as "success" | "warning" | "default" | "info"} size="sm">
        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
      </Badge>
      <div className="text-right">
        <p className="font-semibold text-neutral-800">{c.views.toLocaleString()}</p>
        <p className="text-caption text-neutral-400">views</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-neutral-800">{c.clicks}</p>
        <p className="text-caption text-neutral-400">clicks</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-neutral-800">{ctr}%</p>
        <p className="text-caption text-neutral-400">CTR</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-neutral-800">{c.spent}</p>
        <p className="text-caption text-neutral-400">of {c.budget}</p>
      </div>
    </div>
  )
}

function Campaigns() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [purchaseSuccess, setPurchaseSuccess] = useState(false)

  function handlePurchase() {
    setPurchaseSuccess(true)
    setSelectedPackage(null)
    setTimeout(() => setPurchaseSuccess(false), 4000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-h2 font-bold text-neutral-900">Campaigns & Monetisation</h1>
        <p className="mt-1 text-body-sm text-neutral-500">Boost your visibility and reach more customers</p>
      </div>

      {purchaseSuccess && (
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <p className="text-body-sm font-medium text-emerald-700">
            Campaign activated! Your listing will start receiving boosted traffic within 1 hour.
          </p>
        </div>
      )}

      {/* ROI summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Invested", value: "$77", icon: TrendingUp, sub: "all campaigns" },
          { label: "Total Views Generated", value: "11,741", icon: BarChart3, sub: "from paid campaigns" },
          { label: "Avg Cost Per View", value: "$0.007", icon: Target, sub: "very efficient" },
        ].map(({ label, value, icon: Icon, sub }) => (
          <Card key={label}>
            <CardContent className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
                <Icon className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-caption text-neutral-400">{label}</p>
                <p className="font-sans text-h3 font-bold text-neutral-900">{value}</p>
                <p className="text-caption text-neutral-400">{sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active campaigns */}
      <Card>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-h4 font-semibold text-neutral-900">Active Campaigns</h3>
            <Badge variant="success" size="sm">
              <Clock className="mr-1 h-3 w-3" />
              1 running
            </Badge>
          </div>
          {activeCampaigns.map((c) => <CampaignRow key={c.id} c={c} />)}
        </CardContent>
      </Card>

      {/* Packages */}
      <div>
        <h2 className="mb-2 font-display text-h3 font-semibold text-neutral-900">Promotion Packages</h2>
        <p className="mb-5 text-body-sm text-neutral-500">
          Choose the right boost for your business goals
        </p>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative overflow-hidden transition-all ${
                pkg.highlight ? "border-2 border-accent-400 shadow-lg" : ""
              }`}
            >
              {pkg.badge && (
                <div className="absolute right-0 top-0">
                  <div className="rounded-bl-xl bg-accent-400 px-3 py-1 text-caption font-bold text-white">
                    {pkg.badge}
                  </div>
                </div>
              )}
              <CardContent className="flex flex-col gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${pkg.color}`}>
                  <pkg.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-h4 font-semibold text-neutral-900">{pkg.name}</h3>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="font-sans text-h2 font-bold text-neutral-900">{pkg.price}</span>
                    <span className="text-body-sm text-neutral-400">{pkg.period}</span>
                  </div>
                </div>
                <ul className="flex-1 space-y-2">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-body-sm text-neutral-600">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={pkg.highlight ? "accent" : "outline"}
                  size="md"
                  className="w-full"
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Past campaigns */}
      <Card>
        <CardContent>
          <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">Campaign History</h3>
          {pastCampaigns.map((c) => <CampaignRow key={c.id} c={c} />)}
        </CardContent>
      </Card>

      {/* Referral programme */}
      <Card>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Badge variant="accent" size="sm">New</Badge>
              <h3 className="font-display text-h4 font-semibold text-neutral-900">Refer a Business</h3>
            </div>
            <p className="text-body-sm text-neutral-500">
              Refer another halal business to HumbleHalal and earn <strong>$15 credit</strong> when they list.
              They get their first month featured for free.
            </p>
          </div>
          <Button variant="primary" size="sm" className="shrink-0">
            Get Referral Link
          </Button>
        </CardContent>
      </Card>

      {/* Purchase modal */}
      {selectedPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedPackage(null)} />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button
              className="absolute right-4 top-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-100"
              onClick={() => setSelectedPackage(null)}
            >
              <X className="h-5 w-5" />
            </button>
            {(() => {
              const pkg = packages.find((p) => p.id === selectedPackage)!
              return (
                <div className="space-y-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${pkg.color}`}>
                    <pkg.icon className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-h3 font-semibold text-neutral-900">{pkg.name}</h3>
                    <p className="text-body-sm text-neutral-500">Complete your purchase to activate</p>
                  </div>
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
                    <div className="flex justify-between text-body-sm">
                      <span className="text-neutral-600">{pkg.name}</span>
                      <span className="font-semibold">{pkg.price}{pkg.period}</span>
                    </div>
                    <div className="mt-3 border-t border-neutral-200 pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary-700">{pkg.price}</span>
                    </div>
                  </div>
                  <p className="text-caption text-neutral-400">
                    Payment processed securely via Stripe. Cancel anytime from your dashboard.
                  </p>
                  <Button variant="primary" size="lg" className="w-full" onClick={handlePurchase}>
                    Confirm & Pay {pkg.price}
                  </Button>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default Campaigns
