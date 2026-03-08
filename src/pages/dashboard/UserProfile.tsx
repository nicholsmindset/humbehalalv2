import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail, Phone, MapPin, Shield, Bell, Heart, Clock, LogOut, CheckCircle, Store } from "lucide-react"
import { Button, Input, Badge, Card, CardContent, HalalBadge, Rating } from "@/components/ui"
import { useSaved } from "@/hooks/useSaved"
import { useAuth } from "@/context/AuthContext"
import { BUSINESSES } from "@/data/businesses"
import { CATEGORY_LABELS, DISTRICT_LABELS } from "@/types"

type ProfileTab = "account" | "saved" | "activity" | "notifications" | "security"

const activityLog = [
  { id: "1", action: "Viewed listing", target: "Warung Nasi Padang", time: "2 hours ago", icon: Store },
  { id: "2", action: "Left a review", target: "Bismillah Biryani", time: "1 day ago", icon: Heart },
  { id: "3", action: "Saved listing", target: "Kampong Glam Cafe", time: "3 days ago", icon: Heart },
  { id: "4", action: "Viewed listing", target: "Jurong East Food Stalls", time: "5 days ago", icon: Store },
  { id: "5", action: "Submitted business", target: "My New Business", time: "1 week ago", icon: Store },
]

function UserProfile() {
  const navigate = useNavigate()
  const { signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<ProfileTab>("account")
  const [saved, setSaved] = useState(false)
  const { savedIds, remove: removeSaved } = useSaved()
  const savedBusinesses = BUSINESSES.filter((b) => savedIds.includes(b.id))
  const [form, setForm] = useState({
    name: "Ahmad Fauzi",
    email: "ahmad@email.sg",
    phone: "+65 9123 4567",
    location: "Geylang Serai",
    bio: "Food lover and community advocate. Always looking for the best halal spots in Singapore.",
  })

  const [notifications, setNotifications] = useState({
    newBusinesses: true,
    events: true,
    reviews: false,
    promotions: true,
    newsletter: true,
    sms: false,
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs: { id: ProfileTab; label: string; icon: React.ElementType }[] = [
    { id: "account", label: "Account", icon: User },
    { id: "saved", label: "Saved", icon: Heart },
    { id: "activity", label: "Activity", icon: Clock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-h2 font-bold text-neutral-900">My Profile</h1>
          <p className="mt-1 text-body-sm text-neutral-500">Manage your account and preferences</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-body-sm font-medium text-emerald-700">
            <CheckCircle className="h-4 w-4" />
            Saved!
          </div>
        )}
      </div>

      {/* Profile card */}
      <Card>
        <CardContent className="flex items-center gap-5">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary-100 text-h2 font-bold text-primary-700">
            AF
          </div>
          <div className="flex-1">
            <h2 className="font-display text-h3 font-bold text-neutral-900">{form.name}</h2>
            <p className="text-body-sm text-neutral-500">{form.email}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="primary" size="sm">Member</Badge>
              <Badge variant="default" size="sm">Joined Feb 2025</Badge>
              <Badge variant="success" size="sm">12 reviews</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">Change Photo</Button>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex overflow-x-auto rounded-xl border border-neutral-200 bg-white p-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2 text-body-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary-600 text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Account ── */}
      {activeTab === "account" && (
        <form onSubmit={handleSave} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
          <h2 className="font-display text-h3 font-semibold text-neutral-900">Personal Information</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Full Name</label>
              <Input name="name" value={form.name} onChange={handleChange} icon={<User className="h-4 w-4" />} />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Email Address</label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} icon={<Mail className="h-4 w-4" />} />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Phone Number</label>
              <Input name="phone" value={form.phone} onChange={handleChange} icon={<Phone className="h-4 w-4" />} />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Location / District</label>
              <Input name="location" value={form.location} onChange={handleChange} icon={<MapPin className="h-4 w-4" />} />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Bio (optional)</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none"
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => { signOut(); navigate("/") }}
              className="flex items-center gap-2 text-body-sm text-red-500 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
            <Button type="submit" variant="primary" size="md">Save Changes</Button>
          </div>
        </form>
      )}

      {/* ── Saved Businesses ── */}
      {activeTab === "saved" && (
        <div className="space-y-4">
          <p className="text-body-sm text-neutral-500">
            {savedBusinesses.length === 0
              ? "No saved businesses yet."
              : `${savedBusinesses.length} saved ${savedBusinesses.length === 1 ? "business" : "businesses"}`}
          </p>
          {savedBusinesses.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="mx-auto mb-3 h-10 w-10 text-neutral-200" />
                <p className="font-medium text-neutral-700">Nothing saved yet</p>
                <p className="mt-1 text-body-sm text-neutral-400">
                  Hit the heart icon on any business to save it here.
                </p>
                <Link to="/directory">
                  <Button variant="primary" size="sm" className="mt-4">Browse Directory</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {savedBusinesses.map((biz) => (
                <Card key={biz.id} className="relative group overflow-hidden">
                  <Link to={`/directory/${biz.id}`}>
                    <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-50" />
                  </Link>
                  <CardContent>
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="primary" size="sm">{CATEGORY_LABELS[biz.category]}</Badge>
                      <HalalBadge status={biz.halalStatus} size="sm" />
                    </div>
                    <Link to={`/directory/${biz.id}`}>
                      <h3 className="font-display text-h4 font-semibold text-neutral-900 hover:text-primary-600 transition-colors">{biz.name}</h3>
                    </Link>
                    <div className="mt-1 flex items-center gap-1 text-body-sm text-neutral-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {DISTRICT_LABELS[biz.district]}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <Rating value={biz.rating} size="sm" />
                      <button
                        onClick={() => removeSaved(biz.id)}
                        className="text-caption text-red-400 hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── Activity ── */}
      {activeTab === "activity" && (
        <Card>
          <CardContent>
            <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">Recent Activity</h3>
            <div className="space-y-0">
              {activityLog.map((entry, i) => (
                <div key={entry.id} className={`flex items-center gap-4 py-3 ${i < activityLog.length - 1 ? "border-b border-neutral-100" : ""}`}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50">
                    <entry.icon className="h-4 w-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-body-sm text-neutral-700">
                      <span className="font-medium">{entry.action}:</span>{" "}
                      <span className="text-primary-700">{entry.target}</span>
                    </p>
                  </div>
                  <span className="shrink-0 text-caption text-neutral-400">{entry.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Notifications ── */}
      {activeTab === "notifications" && (
        <Card>
          <CardContent>
            <h3 className="mb-5 font-display text-h4 font-semibold text-neutral-900">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { key: "newBusinesses" as const, label: "New Businesses Nearby", desc: "Get notified when new halal businesses are listed in your area" },
                { key: "events" as const, label: "Community Events", desc: "Upcoming Islamic events and festivals" },
                { key: "reviews" as const, label: "Review Replies", desc: "When businesses reply to your reviews" },
                { key: "promotions" as const, label: "Promotions & Deals", desc: "Special offers from featured businesses" },
                { key: "newsletter" as const, label: "Weekly Newsletter", desc: "Curated halal picks and community news" },
                { key: "sms" as const, label: "SMS Notifications", desc: "Text message alerts for important updates" },
              ].map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between gap-4 py-2 border-b border-neutral-100 last:border-0">
                  <div>
                    <p className="text-body-sm font-medium text-neutral-800">{label}</p>
                    <p className="text-caption text-neutral-400">{desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={`relative h-6 w-11 rounded-full transition-colors ${notifications[key] ? "bg-primary-500" : "bg-neutral-200"}`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${notifications[key] ? "left-5" : "left-0.5"}`}
                    />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="primary" size="md" className="mt-5">Save Preferences</Button>
          </CardContent>
        </Card>
      )}

      {/* ── Security ── */}
      {activeTab === "security" && (
        <div className="space-y-5">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-display text-h3 font-semibold text-neutral-900">Change Password</h2>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Current Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Confirm New Password</label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <Button variant="primary" size="md">Update Password</Button>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="font-display text-h3 font-semibold text-neutral-900">Two-Factor Authentication</h2>
            <p className="text-body-sm text-neutral-500">
              Add an extra layer of security to your account using an authenticator app or SMS.
            </p>
            <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              <div>
                <p className="text-body-sm font-medium text-neutral-800">Authenticator App</p>
                <p className="text-caption text-neutral-400">Not configured</p>
              </div>
              <Button variant="outline" size="sm">Set Up</Button>
            </div>
          </div>
          <div className="rounded-2xl border border-red-100 bg-red-50 p-6 space-y-3">
            <h2 className="font-display text-h3 font-semibold text-red-800">Danger Zone</h2>
            <p className="text-body-sm text-red-600">
              Once you delete your account, all your data will be permanently removed. This action cannot be undone.
            </p>
            <Button variant="danger" size="sm">Delete Account</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
