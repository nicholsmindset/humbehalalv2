import { Link } from "react-router-dom"
import {
  Eye,
  MousePointerClick,
  Phone,
  Star,
  TrendingUp,
  TrendingDown,
  MessageSquare,
  MapPin,
  ShieldCheck,
  AlertCircle,
  ArrowRight,
  Pencil,
  Megaphone,
  BarChart3,
} from "lucide-react"
import { Badge, Card, CardContent, HalalBadge, Rating, Button } from "@/components/ui"

interface KpiCardProps {
  label: string
  value: string
  change: number
  icon: React.ElementType
  color: string
}

function KpiCard({ label, value, change, icon: Icon, color }: KpiCardProps) {
  const positive = change >= 0
  return (
    <Card>
      <CardContent className="flex items-start justify-between gap-4">
        <div>
          <p className="text-body-sm text-neutral-500">{label}</p>
          <p className="mt-1 font-sans text-h2 font-bold text-neutral-900">{value}</p>
          <div className={`mt-1 flex items-center gap-1 text-body-sm font-medium ${positive ? "text-emerald-600" : "text-red-500"}`}>
            {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {positive ? "+" : ""}{change}% vs last month
          </div>
        </div>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </CardContent>
    </Card>
  )
}

const kpis: KpiCardProps[] = [
  { label: "Profile Views", value: "2,847", change: 18, icon: Eye, color: "bg-primary-500" },
  { label: "Clicks & Enquiries", value: "423", change: 12, icon: MousePointerClick, color: "bg-blue-500" },
  { label: "Phone Calls", value: "87", change: -5, icon: Phone, color: "bg-purple-500" },
  { label: "Reviews This Month", value: "14", change: 40, icon: Star, color: "bg-accent-400" },
]

const recentReviews = [
  { id: "1", name: "Nurul Ain", rating: 5, comment: "Best nasi padang in Singapore! The beef rendang is incredibly tender. Will definitely come back.", date: "2 days ago" },
  { id: "2", name: "Ismail Tan", rating: 4, comment: "Great food and generous portions. A bit crowded during lunch but worth the wait.", date: "5 days ago" },
  { id: "3", name: "Siti Rahimah", rating: 5, comment: "Authentic taste that reminds me of kampong cooking. The ayam gulai is superb.", date: "1 week ago" },
]

const quickActions = [
  { label: "Edit Listing", icon: Pencil, href: "/dashboard/listing", color: "bg-primary-50 text-primary-700 hover:bg-primary-100" },
  { label: "Run Campaign", icon: Megaphone, href: "/dashboard/campaigns", color: "bg-accent-50 text-accent-700 hover:bg-accent-100" },
  { label: "View Analytics", icon: BarChart3, href: "/dashboard/analytics", color: "bg-blue-50 text-blue-700 hover:bg-blue-100" },
]

function BusinessDashboard() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-h2 font-bold text-neutral-900">Business Overview</h1>
          <p className="mt-1 text-body-sm text-neutral-500">March 2026 — Warung Nasi Padang</p>
        </div>
        <Link to="/dashboard/campaigns">
          <Button variant="accent" size="sm">
            <Megaphone className="mr-2 h-4 w-4" />
            Boost Listing
          </Button>
        </Link>
      </div>

      {/* Halal status alert */}
      <div className="flex items-center gap-3 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3">
        <ShieldCheck className="h-5 w-5 shrink-0 text-primary-600" />
        <div className="flex-1 text-body-sm">
          <span className="font-semibold text-primary-800">Halal Certified</span>
          <span className="ml-1 text-primary-600">— MUIS Certificate valid until 31 Dec 2026.</span>
        </div>
        <HalalBadge status="certified" size="sm" />
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </div>

      {/* Main grid: chart + quick actions + recent reviews */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Weekly views sparkline */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-h4 font-semibold text-neutral-900">Weekly Views</h3>
                  <p className="text-body-sm text-neutral-400">Last 8 weeks</p>
                </div>
                <Badge variant="primary" size="sm">This Month: 2,847</Badge>
              </div>
              {/* CSS bar chart */}
              <div className="flex items-end gap-2 h-32">
                {[420, 380, 510, 670, 590, 720, 810, 750].map((val, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-t-md bg-primary-400 transition-all hover:bg-primary-500"
                      style={{ height: `${(val / 810) * 100}%` }}
                      title={`${val} views`}
                    />
                    <span className="text-[10px] text-neutral-400">W{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-4">
                {[
                  { label: "Peak Day", value: "Saturday" },
                  { label: "Peak Time", value: "12pm – 2pm" },
                  { label: "Avg Session", value: "2m 14s" },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <p className="text-caption text-neutral-400">{label}</p>
                    <p className="text-body-sm font-semibold text-neutral-800">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <Card>
            <CardContent>
              <h3 className="mb-3 font-display text-h4 font-semibold text-neutral-900">Quick Actions</h3>
              <div className="space-y-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.label}
                    to={action.href}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-body-sm font-medium transition-colors ${action.color}`}
                  >
                    <div className="flex items-center gap-2">
                      <action.icon className="h-4 w-4" />
                      {action.label}
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Listing health */}
          <Card>
            <CardContent>
              <h3 className="mb-3 font-display text-h4 font-semibold text-neutral-900">Listing Health</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Photos", status: "missing", note: "No photos added" },
                  { label: "Business hours", status: "ok", note: "Complete" },
                  { label: "Phone number", status: "ok", note: "Verified" },
                  { label: "Website", status: "ok", note: "Linked" },
                  { label: "Description", status: "ok", note: "80 words" },
                ].map(({ label, status, note }) => (
                  <div key={label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {status === "ok" ? (
                        <ShieldCheck className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-body-sm text-neutral-700">{label}</span>
                    </div>
                    <span className={`text-caption ${status === "ok" ? "text-neutral-400" : "font-medium text-red-500"}`}>
                      {note}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg bg-amber-50 px-3 py-2">
                <p className="text-caption text-amber-700">
                  <strong>Tip:</strong> Listings with photos get 3× more views. Add at least 3 photos!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent reviews */}
      <Card>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-h4 font-semibold text-neutral-900">Recent Reviews</h3>
              <p className="text-body-sm text-neutral-400">
                Average rating: <span className="font-semibold text-neutral-700">4.8</span> · 234 total
              </p>
            </div>
            <div className="flex items-center gap-1 text-body-sm font-medium text-primary-600">
              <MessageSquare className="h-4 w-4" />
              92% response rate
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentReviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-neutral-100 bg-neutral-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                    {review.name.charAt(0)}
                  </div>
                  <Rating value={review.rating} size="sm" />
                </div>
                <p className="text-body-sm font-medium text-neutral-800">{review.name}</p>
                <p className="mt-1 line-clamp-3 text-body-sm text-neutral-500">{review.comment}</p>
                <p className="mt-2 text-caption text-neutral-400">{review.date}</p>
                <button className="mt-2 text-body-sm font-medium text-primary-600 hover:text-primary-700">
                  Reply →
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Traffic sources */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardContent>
            <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">Traffic Sources</h3>
            <div className="space-y-3">
              {[
                { label: "Direct Search", pct: 52, count: 1480 },
                { label: "Category Browse", pct: 28, count: 797 },
                { label: "District Filter", pct: 13, count: 370 },
                { label: "Featured Placement", pct: 7, count: 199 },
              ].map(({ label, pct, count }) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-body-sm">
                    <span className="text-neutral-600">{label}</span>
                    <span className="font-medium text-neutral-800">{count.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100">
                    <div
                      className="h-2 rounded-full bg-primary-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">Visitor Locations</h3>
            <div className="space-y-3">
              {[
                { district: "Geylang Serai", icon: MapPin, pct: 31 },
                { district: "Tampines", icon: MapPin, pct: 19 },
                { district: "Bedok", icon: MapPin, pct: 16 },
                { district: "Kampong Glam", icon: MapPin, pct: 12 },
                { district: "Other", icon: MapPin, pct: 22 },
              ].map(({ district, pct }) => (
                <div key={district}>
                  <div className="mb-1 flex justify-between text-body-sm">
                    <span className="text-neutral-600">{district}</span>
                    <span className="font-medium text-neutral-800">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100">
                    <div
                      className="h-2 rounded-full bg-accent-400"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BusinessDashboard
