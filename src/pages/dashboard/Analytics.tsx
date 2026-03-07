import { useState } from "react"
import { TrendingUp, Eye, MousePointerClick, Phone, Star, Users, BarChart2 } from "lucide-react"
import { Badge, Card, CardContent } from "@/components/ui"

type Period = "7d" | "30d" | "90d"

const periodLabel: Record<Period, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
}

// Mock time-series data
const viewsData: Record<Period, number[]> = {
  "7d": [320, 410, 380, 490, 520, 640, 580],
  "30d": [280, 320, 410, 380, 490, 520, 640, 580, 620, 590, 710, 650, 680, 720, 760, 700, 740, 810, 850, 790, 820, 880, 920, 870, 900, 950, 930, 980, 960, 1020],
  "90d": Array.from({ length: 90 }, (_, i) => Math.floor(300 + Math.sin(i / 10) * 100 + i * 5 + Math.random() * 50)),
}

// Aggregate KPIs by period
const kpisByPeriod: Record<Period, { views: number; clicks: number; calls: number; rating: number; newReviews: number; conversions: number }> = {
  "7d": { views: 1240, clicks: 186, calls: 28, rating: 4.8, newReviews: 5, conversions: 6.7 },
  "30d": { views: 7847, clicks: 1123, calls: 234, rating: 4.8, newReviews: 34, conversions: 7.2 },
  "90d": { views: 21430, clicks: 3067, calls: 612, rating: 4.8, newReviews: 87, conversions: 6.9 },
}

function MiniBarChart({ data, color = "bg-primary-400" }: { data: number[]; color?: string }) {
  const max = Math.max(...data)
  // Show last 14 points if data is long
  const display = data.slice(-14)
  return (
    <div className="flex items-end gap-0.5 h-16">
      {display.map((val, i) => (
        <div
          key={i}
          className={`flex-1 rounded-t ${color} opacity-80 hover:opacity-100 transition-opacity`}
          style={{ height: `${(val / max) * 100}%` }}
          title={String(val)}
        />
      ))}
    </div>
  )
}

function LineChart({ data }: { data: number[] }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const W = 600
  const H = 160
  const pad = 10
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (W - 2 * pad)
    const y = pad + ((max - v) / range) * (H - 2 * pad)
    return `${x},${y}`
  })
  const polyline = pts.join(" ")
  // Area fill
  const first = pts[0]
  const last = pts[pts.length - 1]
  const areaPoints = `${first} ${polyline} ${last.split(",")[0]},${H - pad} ${pad},${H - pad}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#areaGrad)" />
      <polyline points={polyline} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DonutChart({ slices }: { slices: { label: string; value: number; color: string }[] }) {
  const total = slices.reduce((s, sl) => s + sl.value, 0)
  let cumulative = 0
  const R = 45
  const cx = 60
  const cy = 60

  function polarToXY(deg: number) {
    const rad = ((deg - 90) * Math.PI) / 180
    return { x: cx + R * Math.cos(rad), y: cy + R * Math.sin(rad) }
  }

  const paths = slices.map((sl) => {
    const startDeg = (cumulative / total) * 360
    const sliceDeg = (sl.value / total) * 360
    cumulative += sl.value
    const endDeg = startDeg + sliceDeg
    const start = polarToXY(startDeg)
    const end = polarToXY(endDeg)
    const large = sliceDeg > 180 ? 1 : 0
    return { ...sl, d: `M${cx},${cy} L${start.x},${start.y} A${R},${R} 0 ${large},1 ${end.x},${end.y} Z` }
  })

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 120 120" className="h-24 w-24 shrink-0">
        {paths.map((p) => <path key={p.label} d={p.d} fill={p.color} />)}
        <circle cx={cx} cy={cy} r={28} fill="white" />
      </svg>
      <div className="space-y-1.5">
        {slices.map((sl) => (
          <div key={sl.label} className="flex items-center gap-2 text-body-sm">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: sl.color }} />
            <span className="text-neutral-600">{sl.label}</span>
            <span className="ml-auto font-semibold text-neutral-800">{((sl.value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Analytics() {
  const [period, setPeriod] = useState<Period>("30d")
  const kpis = kpisByPeriod[period]
  const viewsSeries = viewsData[period]

  const kpiCards = [
    { label: "Total Views", value: kpis.views.toLocaleString(), icon: Eye, color: "text-primary-600", bg: "bg-primary-50", sub: "profile page impressions" },
    { label: "Clicks & Enquiries", value: kpis.clicks.toLocaleString(), icon: MousePointerClick, color: "text-blue-600", bg: "bg-blue-50", sub: "website, email, directions" },
    { label: "Phone Calls", value: kpis.calls.toLocaleString(), icon: Phone, color: "text-purple-600", bg: "bg-purple-50", sub: "from listing phone number" },
    { label: "Conversion Rate", value: `${kpis.conversions}%`, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", sub: "views → action" },
    { label: "New Reviews", value: String(kpis.newReviews), icon: Star, color: "text-accent-600", bg: "bg-accent-50", sub: "avg rating 4.8 ★" },
    { label: "Unique Visitors", value: Math.floor(kpis.views * 0.72).toLocaleString(), icon: Users, color: "text-rose-600", bg: "bg-rose-50", sub: "estimated unique users" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-h2 font-bold text-neutral-900">Analytics</h1>
          <p className="mt-1 text-body-sm text-neutral-500">Warung Nasi Padang · Geylang Serai</p>
        </div>
        <div className="flex rounded-xl border border-neutral-200 bg-white p-1">
          {(["7d", "30d", "90d"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`rounded-lg px-3 py-1.5 text-body-sm font-medium transition-colors ${
                period === p ? "bg-primary-600 text-white" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <p className="text-caption text-neutral-400">{periodLabel[period]}</p>

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpiCards.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="flex items-start gap-4">
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${kpi.bg}`}>
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-caption text-neutral-400">{kpi.label}</p>
                <p className="mt-0.5 font-sans text-h3 font-bold text-neutral-900">{kpi.value}</p>
                <p className="text-caption text-neutral-400">{kpi.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Views trend chart */}
      <Card>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-h4 font-semibold text-neutral-900">Views Over Time</h3>
              <p className="text-body-sm text-neutral-400">Daily profile view count</p>
            </div>
            <Badge variant="primary" size="sm">
              Total: {kpis.views.toLocaleString()}
            </Badge>
          </div>
          <div className="h-40">
            <LineChart data={viewsSeries} />
          </div>
          <div className="mt-2 flex justify-between text-caption text-neutral-300">
            <span>Start</span>
            <span>End</span>
          </div>
        </CardContent>
      </Card>

      {/* Lower charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Action breakdown */}
        <Card>
          <CardContent>
            <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">
              Action Breakdown
            </h3>
            <div className="space-y-4">
              {[
                { label: "Website Visits", value: Math.floor(kpis.clicks * 0.38), bar: 38, color: "bg-primary-400" },
                { label: "Get Directions", value: Math.floor(kpis.clicks * 0.29), bar: 29, color: "bg-blue-400" },
                { label: "Phone Calls", value: kpis.calls, bar: 22, color: "bg-purple-400" },
                { label: "Email Enquiries", value: Math.floor(kpis.clicks * 0.11), bar: 11, color: "bg-accent-400" },
              ].map(({ label, value, bar, color }) => (
                <div key={label}>
                  <div className="mb-1 flex justify-between text-body-sm">
                    <span className="text-neutral-600">{label}</span>
                    <span className="font-semibold text-neutral-800">{value.toLocaleString()}</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100">
                    <div className={`h-2 rounded-full ${color} transition-all`} style={{ width: `${bar}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic sources donut */}
        <Card>
          <CardContent>
            <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">
              Traffic Sources
            </h3>
            <DonutChart
              slices={[
                { label: "Direct Search", value: 52, color: "#10B981" },
                { label: "Category Browse", value: 28, color: "#3B82F6" },
                { label: "District Filter", value: 13, color: "#8B5CF6" },
                { label: "Featured Slot", value: 7, color: "#F59E0B" },
              ]}
            />
          </CardContent>
        </Card>

        {/* Daily views sparklines */}
        <Card>
          <CardContent>
            <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">
              Views by Day of Week
            </h3>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const vals = [580, 620, 660, 590, 710, 960, 890]
                const max = 960
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <div className="flex h-20 w-full items-end">
                      <div
                        className="w-full rounded-t-md bg-primary-300 hover:bg-primary-400 transition-colors"
                        style={{ height: `${(vals[i] / max) * 100}%` }}
                        title={`${vals[i]} views`}
                      />
                    </div>
                    <span className="text-[10px] text-neutral-400">{day}</span>
                    <span className="text-[10px] font-medium text-neutral-600">{vals[i]}</span>
                  </div>
                )
              })}
            </div>
            <p className="mt-3 text-caption text-neutral-400">
              Peak traffic on <strong>Saturday</strong> — consider running weekend promotions.
            </p>
          </CardContent>
        </Card>

        {/* Rating trend */}
        <Card>
          <CardContent>
            <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">
              Rating Trend
            </h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="text-center">
                <p className="font-sans text-h1 font-bold text-neutral-900">4.8</p>
                <p className="text-body-sm text-neutral-400">Current</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const counts: Record<number, number> = { 5: 172, 4: 43, 3: 12, 2: 5, 1: 2 }
                  const pct = Math.round((counts[star] / 234) * 100)
                  return (
                    <div key={star} className="flex items-center gap-2 text-body-sm">
                      <span className="w-4 text-right text-neutral-400">{star}</span>
                      <span className="text-amber-400">★</span>
                      <div className="h-1.5 flex-1 rounded-full bg-neutral-100">
                        <div className="h-1.5 rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-6 text-right text-neutral-400">{counts[star]}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <MiniBarChart
              data={[4.5, 4.6, 4.7, 4.6, 4.8, 4.7, 4.8, 4.9, 4.8, 4.8, 4.9, 4.8].map(v => Math.round(v * 100))}
              color="bg-amber-400"
            />
            <p className="mt-2 text-caption text-neutral-400">Monthly average rating — last 12 months</p>
          </CardContent>
        </Card>
      </div>

      {/* Competitor comparison */}
      <Card>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-h4 font-semibold text-neutral-900">
                Category Ranking
              </h3>
              <p className="text-body-sm text-neutral-400">
                Your position among restaurants in Geylang Serai
              </p>
            </div>
            <Badge variant="accent" size="sm">
              <BarChart2 className="mr-1 h-3 w-3" />
              #2 of 24
            </Badge>
          </div>
          <div className="grid gap-3 sm:grid-cols-4">
            {[
              { metric: "Views", yours: 2847, avg: 1204, rank: "#2" },
              { metric: "Rating", yours: 4.8, avg: 4.1, rank: "#3" },
              { metric: "Reviews", yours: 234, avg: 89, rank: "#1" },
              { metric: "Clicks", yours: 423, avg: 178, rank: "#2" },
            ].map(({ metric, yours, avg, rank }) => (
              <div key={metric} className="rounded-xl bg-neutral-50 p-4 text-center">
                <p className="text-body-sm text-neutral-500">{metric}</p>
                <p className="mt-1 font-sans text-h3 font-bold text-primary-700">{yours}</p>
                <p className="text-caption text-neutral-400">Avg: {avg}</p>
                <Badge variant="success" size="sm" className="mt-1">{rank}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics
