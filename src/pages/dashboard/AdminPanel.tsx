import { useState } from "react"
import {
  Store, Users, Calendar, DollarSign, ShieldCheck, AlertCircle,
  CheckCircle, X, Eye, BarChart3, TrendingUp, Newspaper, Settings,
} from "lucide-react"
import { Badge, Card, CardContent, Button } from "@/components/ui"

type AdminTab = "overview" | "approvals" | "businesses" | "users" | "revenue" | "settings"

interface PendingBusiness {
  id: string
  name: string
  owner: string
  email: string
  category: string
  district: string
  submittedDate: string
  hasCert: boolean
}

interface ManagedBusiness {
  id: string
  name: string
  category: string
  district: string
  status: "live" | "pending" | "suspended"
  rating: number
  reviews: number
  views: number
  halalStatus: "certified" | "pending"
  featured: boolean
}

const pendingApprovals: PendingBusiness[] = [
  { id: "1", name: "Bedok Muslim Delights", owner: "Rahman bin Ali", email: "rahman@email.sg", category: "Restaurants", district: "Bedok", submittedDate: "5 Mar 2026", hasCert: true },
  { id: "2", name: "AMK Halal Grocer", owner: "Siti Nora", email: "siti@email.sg", category: "Groceries", district: "Ang Mo Kio", submittedDate: "6 Mar 2026", hasCert: false },
  { id: "3", name: "Woodlands Makan Corner", owner: "Hafiz Daud", email: "hafiz@email.sg", category: "Food Stalls", district: "Woodlands", submittedDate: "6 Mar 2026", hasCert: true },
  { id: "4", name: "Clementi Catering Services", owner: "Zainab Hassan", email: "zainab@email.sg", category: "Catering", district: "Clementi", submittedDate: "7 Mar 2026", hasCert: true },
]

const managedBusinesses: ManagedBusiness[] = [
  { id: "1", name: "Warung Nasi Padang", category: "Restaurants", district: "Geylang Serai", status: "live", rating: 4.8, reviews: 234, views: 2847, halalStatus: "certified", featured: true },
  { id: "2", name: "Kampong Glam Cafe", category: "Cafes", district: "Kampong Glam", status: "live", rating: 4.6, reviews: 189, views: 1923, halalStatus: "certified", featured: false },
  { id: "3", name: "Bismillah Biryani", category: "Restaurants", district: "Woodlands", status: "live", rating: 4.9, reviews: 312, views: 3120, halalStatus: "certified", featured: true },
  { id: "4", name: "Bukit Merah Malay Kitchen", category: "Restaurants", district: "Bukit Merah", status: "live", rating: 4.2, reviews: 74, views: 820, halalStatus: "pending", featured: false },
  { id: "5", name: "Old Listings Restaurant", category: "Restaurants", district: "Jurong", status: "suspended", rating: 3.1, reviews: 23, views: 210, halalStatus: "pending", featured: false },
]

const revenueData = [
  { month: "Sep", revenue: 1240 },
  { month: "Oct", revenue: 1680 },
  { month: "Nov", revenue: 2100 },
  { month: "Dec", revenue: 2890 },
  { month: "Jan", revenue: 3120 },
  { month: "Feb", revenue: 3540 },
  { month: "Mar", revenue: 3840 },
]

const adminStats = [
  { label: "Total Businesses", value: "1,247", icon: Store, trend: "+23 this month", color: "bg-primary-500" },
  { label: "Registered Users", value: "18,432", icon: Users, trend: "+412 this month", color: "bg-blue-500" },
  { label: "Events Listed", value: "45", icon: Calendar, trend: "This month", color: "bg-purple-500" },
  { label: "Monthly Revenue", value: "$3,840", icon: DollarSign, trend: "+8.5% vs last month", color: "bg-emerald-500" },
  { label: "Pending Approvals", value: "23", icon: AlertCircle, trend: "Requires action", color: "bg-amber-500" },
  { label: "Halal Certified", value: "89%", icon: ShieldCheck, trend: "of all listings", color: "bg-teal-500" },
]

type ApprovalState = Record<string, "approved" | "rejected" | null>

function AdminPanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview")
  const [approvals, setApprovals] = useState<ApprovalState>({})

  function handleApproval(id: string, action: "approved" | "rejected") {
    setApprovals((prev) => ({ ...prev, [id]: action }))
  }

  const tabs: { id: AdminTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "approvals", label: "Approvals", icon: AlertCircle, badge: pendingApprovals.filter(p => !approvals[p.id]).length },
    { id: "businesses", label: "Businesses", icon: Store },
    { id: "users", label: "Users", icon: Users },
    { id: "revenue", label: "Revenue", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-h2 font-bold text-neutral-900">Admin Panel</h1>
            <Badge variant="error" size="sm">Admin Only</Badge>
          </div>
          <p className="mt-1 text-body-sm text-neutral-500">Platform management — HumbleHalal</p>
        </div>
        <Button variant="outline" size="sm">
          <Newspaper className="mr-1.5 h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto rounded-xl border border-neutral-200 bg-white p-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-body-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary-600 text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {adminStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-caption text-neutral-400">{stat.label}</p>
                    <p className="font-sans text-h3 font-bold text-neutral-900">{stat.value}</p>
                    <p className="text-caption text-neutral-400">{stat.trend}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Revenue trend */}
          <Card>
            <CardContent>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-h4 font-semibold text-neutral-900">Revenue Trend</h3>
                  <p className="text-body-sm text-neutral-400">Monthly platform revenue (SGD)</p>
                </div>
                <div className="flex items-center gap-1 text-body-sm font-medium text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  +8.5% MoM
                </div>
              </div>
              <div className="flex items-end gap-3 h-32">
                {revenueData.map(({ month, revenue }) => {
                  const max = Math.max(...revenueData.map(r => r.revenue))
                  return (
                    <div key={month} className="flex flex-1 flex-col items-center gap-1">
                      <span className="text-caption font-medium text-neutral-700">${(revenue / 1000).toFixed(1)}k</span>
                      <div
                        className="w-full rounded-t-md bg-primary-500 hover:bg-primary-600 transition-colors"
                        style={{ height: `${(revenue / max) * 80}%` }}
                        title={`$${revenue}`}
                      />
                      <span className="text-[10px] text-neutral-400">{month}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardContent>
                <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">
                  Top Categories
                </h3>
                <div className="space-y-3">
                  {[
                    { cat: "Restaurants", count: 487, pct: 39 },
                    { cat: "Food Stalls", count: 321, pct: 26 },
                    { cat: "Cafes", count: 198, pct: 16 },
                    { cat: "Groceries", count: 124, pct: 10 },
                    { cat: "Other", count: 117, pct: 9 },
                  ].map(({ cat, count, pct }) => (
                    <div key={cat}>
                      <div className="mb-1 flex justify-between text-body-sm">
                        <span className="text-neutral-600">{cat}</span>
                        <span className="font-medium">{count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-neutral-100">
                        <div className="h-2 rounded-full bg-primary-400" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">
                  Platform Health
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Uptime (30d)", value: "99.97%", status: "good" },
                    { label: "Avg Load Time", value: "1.2s", status: "good" },
                    { label: "Halal Cert Rate", value: "89%", status: "good" },
                    { label: "Pending Reviews", value: "12", status: "warn" },
                    { label: "Support Tickets", value: "3 open", status: "warn" },
                  ].map(({ label, value, status }) => (
                    <div key={label} className="flex items-center justify-between py-1 border-b border-neutral-100 last:border-0">
                      <div className="flex items-center gap-2">
                        {status === "good"
                          ? <CheckCircle className="h-4 w-4 text-emerald-500" />
                          : <AlertCircle className="h-4 w-4 text-amber-500" />
                        }
                        <span className="text-body-sm text-neutral-600">{label}</span>
                      </div>
                      <span className="text-body-sm font-semibold text-neutral-800">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ── Approvals ── */}
      {activeTab === "approvals" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-body-sm text-neutral-500">
              {pendingApprovals.filter(p => !approvals[p.id]).length} listings awaiting review
            </p>
          </div>
          {pendingApprovals.map((biz) => {
            const decision = approvals[biz.id]
            return (
              <Card key={biz.id}>
                <CardContent>
                  {decision ? (
                    <div className={`flex items-center gap-3 ${decision === "approved" ? "text-emerald-600" : "text-red-500"}`}>
                      {decision === "approved"
                        ? <CheckCircle className="h-5 w-5" />
                        : <X className="h-5 w-5" />
                      }
                      <span className="font-medium">
                        {biz.name} — {decision === "approved" ? "Approved & Live" : "Rejected"}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-h4 font-semibold text-neutral-900">{biz.name}</h3>
                          <Badge variant="primary" size="sm">{biz.category}</Badge>
                          {biz.hasCert
                            ? <Badge variant="success" size="sm"><ShieldCheck className="mr-1 h-3 w-3" />Has MUIS Cert</Badge>
                            : <Badge variant="warning" size="sm"><AlertCircle className="mr-1 h-3 w-3" />No Cert</Badge>
                          }
                        </div>
                        <p className="mt-1 text-body-sm text-neutral-500">
                          {biz.district} · Owner: {biz.owner} · {biz.email}
                        </p>
                        <p className="text-caption text-neutral-400">Submitted: {biz.submittedDate}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1.5 h-4 w-4" />
                          Review
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApproval(biz.id, "approved")}
                        >
                          <CheckCircle className="mr-1.5 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleApproval(biz.id, "rejected")}
                        >
                          <X className="mr-1.5 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* ── Businesses ── */}
      {activeTab === "businesses" && (
        <Card>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-h4 font-semibold text-neutral-900">All Businesses</h3>
              <p className="text-body-sm text-neutral-400">1,247 total</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-body-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-left">
                    {["Business", "Category", "District", "Status", "Rating", "Views", "Halal", "Featured", "Actions"].map((h) => (
                      <th key={h} className="pb-3 pr-4 text-caption font-semibold uppercase tracking-wider text-neutral-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {managedBusinesses.map((biz) => (
                    <tr key={biz.id} className="border-b border-neutral-100 last:border-0">
                      <td className="py-3 pr-4 font-medium text-neutral-800">{biz.name}</td>
                      <td className="py-3 pr-4 text-neutral-500">{biz.category}</td>
                      <td className="py-3 pr-4 text-neutral-500">{biz.district}</td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant={biz.status === "live" ? "success" : biz.status === "pending" ? "warning" : "error"}
                          size="sm"
                        >
                          {biz.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4 text-neutral-700">⭐ {biz.rating}</td>
                      <td className="py-3 pr-4 text-neutral-700">{biz.views.toLocaleString()}</td>
                      <td className="py-3 pr-4">
                        <Badge variant={biz.halalStatus === "certified" ? "success" : "warning"} size="sm">
                          {biz.halalStatus}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <span className={`text-body-sm font-medium ${biz.featured ? "text-accent-600" : "text-neutral-300"}`}>
                          {biz.featured ? "★ Yes" : "—"}
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-1">
                          <button className="rounded px-2 py-1 text-caption text-primary-600 hover:bg-primary-50">Edit</button>
                          <button className="rounded px-2 py-1 text-caption text-red-500 hover:bg-red-50">
                            {biz.status === "suspended" ? "Restore" : "Suspend"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Users ── */}
      {activeTab === "users" && (
        <Card>
          <CardContent>
            <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">User Management</h3>
            <div className="mb-4 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Total Users", value: "18,432", color: "bg-blue-50 text-blue-700" },
                { label: "Business Owners", value: "1,247", color: "bg-primary-50 text-primary-700" },
                { label: "Admins", value: "4", color: "bg-purple-50 text-purple-700" },
              ].map(({ label, value, color }) => (
                <div key={label} className={`rounded-xl p-4 ${color}`}>
                  <p className="text-caption font-semibold uppercase tracking-wider">{label}</p>
                  <p className="mt-1 font-sans text-h3 font-bold">{value}</p>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-body-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-left">
                    {["Name", "Email", "Role", "Joined", "Reviews", "Status"].map((h) => (
                      <th key={h} className="pb-3 pr-4 text-caption font-semibold uppercase tracking-wider text-neutral-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Ahmad Fauzi", email: "ahmad@email.sg", role: "Business Owner", joined: "Feb 2025", reviews: 12, active: true },
                    { name: "Nurul Ain", email: "nurul@email.sg", role: "User", joined: "Jan 2026", reviews: 34, active: true },
                    { name: "Ismail Tan", email: "ismail@email.sg", role: "User", joined: "Mar 2025", reviews: 7, active: true },
                    { name: "Siti Rahimah", email: "siti@email.sg", role: "Business Owner", joined: "Jun 2025", reviews: 3, active: false },
                  ].map((user) => (
                    <tr key={user.email} className="border-b border-neutral-100 last:border-0">
                      <td className="py-3 pr-4 font-medium text-neutral-800">{user.name}</td>
                      <td className="py-3 pr-4 text-neutral-500">{user.email}</td>
                      <td className="py-3 pr-4">
                        <Badge variant={user.role === "Business Owner" ? "primary" : "default"} size="sm">{user.role}</Badge>
                      </td>
                      <td className="py-3 pr-4 text-neutral-500">{user.joined}</td>
                      <td className="py-3 pr-4 text-neutral-700">{user.reviews}</td>
                      <td className="py-3">
                        <Badge variant={user.active ? "success" : "default"} size="sm">{user.active ? "Active" : "Inactive"}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Revenue ── */}
      {activeTab === "revenue" && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "MRR (Mar 2026)", value: "$3,840", trend: "+8.5%" },
              { label: "Annual Run Rate", value: "$46,080", trend: "Projected" },
              { label: "Active Subscribers", value: "132", trend: "Featured listings" },
            ].map(({ label, value, trend }) => (
              <Card key={label}>
                <CardContent>
                  <p className="text-caption text-neutral-400">{label}</p>
                  <p className="mt-1 font-sans text-h2 font-bold text-neutral-900">{value}</p>
                  <Badge variant="primary" size="sm" className="mt-1">{trend}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardContent>
              <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">Revenue by Package</h3>
              <div className="space-y-3">
                {[
                  { pkg: "Featured Listing ($29/mo)", subs: 78, revenue: "$2,262", pct: 59 },
                  { pkg: "Homepage Spotlight ($49/mo)", subs: 31, revenue: "$1,519", pct: 40 },
                  { pkg: "Campaign Boost ($19/event)", subs: 12, revenue: "$228", pct: 6 },
                  { pkg: "Social Media Boost ($39/wk)", subs: 6, revenue: "$234", pct: 6 },
                ].map(({ pkg, subs, revenue, pct }) => (
                  <div key={pkg}>
                    <div className="mb-1 flex flex-wrap justify-between gap-2 text-body-sm">
                      <span className="text-neutral-600">{pkg}</span>
                      <div className="flex gap-4">
                        <span className="text-neutral-400">{subs} subs</span>
                        <span className="font-semibold text-neutral-800">{revenue}</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100">
                      <div className="h-2 rounded-full bg-emerald-400" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ── Settings ── */}
      {activeTab === "settings" && (
        <div className="space-y-5">
          {[
            {
              title: "Platform Settings",
              items: [
                { label: "Allow public business submissions", desc: "Users can submit new business listings", enabled: true },
                { label: "Auto-approve MUIS-certified listings", desc: "Skip manual review for verified certificates", enabled: false },
                { label: "Show pending listings", desc: "Pending listings visible in directory", enabled: false },
                { label: "Enable classifieds section", desc: "Community classifieds marketplace", enabled: true },
              ],
            },
            {
              title: "Notification Settings",
              items: [
                { label: "Email alerts for new submissions", desc: "Notify admins on new business submissions", enabled: true },
                { label: "Weekly platform digest", desc: "Weekly summary email to admin team", enabled: true },
                { label: "Revenue alerts", desc: "Alert when monthly revenue hits milestones", enabled: false },
              ],
            },
          ].map(({ title, items }) => (
            <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 font-display text-h3 font-semibold text-neutral-900">{title}</h2>
              <div className="space-y-4">
                {items.map(({ label, desc, enabled }) => (
                  <div key={label} className="flex items-center justify-between gap-4 py-2 border-b border-neutral-100 last:border-0">
                    <div>
                      <p className="text-body-sm font-medium text-neutral-800">{label}</p>
                      <p className="text-caption text-neutral-400">{desc}</p>
                    </div>
                    <div className={`relative h-6 w-11 rounded-full ${enabled ? "bg-primary-500" : "bg-neutral-200"}`}>
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? "left-5" : "left-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="flex justify-end">
            <Button variant="primary" size="md">Save Settings</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel
