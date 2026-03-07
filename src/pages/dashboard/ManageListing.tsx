import { useState } from "react"
import { Save, CheckCircle, AlertCircle, MapPin, Clock, Phone, Mail, Globe, ShieldCheck, Camera } from "lucide-react"
import { Button, Input, Badge } from "@/components/ui"

type Tab = "info" | "hours" | "photos" | "halal"

const businessCategories = ["Restaurants", "Cafes", "Groceries", "Services", "Catering", "Bakeries", "Food Stalls"]
const districts = ["Geylang Serai", "Kampong Glam", "Woodlands", "Tampines", "Jurong", "Bedok", "Ang Mo Kio", "Clementi", "Bukit Merah"]
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

type HoursState = Record<string, { open: string; close: string; closed: boolean }>

function ManageListing() {
  const [activeTab, setActiveTab] = useState<Tab>("info")
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    name: "Warung Nasi Padang",
    category: "Restaurants",
    district: "Geylang Serai",
    address: "123 Geylang Road, #01-45, Singapore 389102",
    phone: "+65 6741 2345",
    email: "warung@naspadang.sg",
    website: "https://warngnaspadang.sg",
    description: "Authentic Padang cuisine with over 20 varieties of dishes served fresh daily. Family-owned since 1985.",
    cuisineType: "Malay/Indonesian",
    priceRange: "2",
  })

  const [hours, setHours] = useState<HoursState>({
    Monday: { open: "07:00", close: "21:00", closed: false },
    Tuesday: { open: "07:00", close: "21:00", closed: false },
    Wednesday: { open: "07:00", close: "21:00", closed: false },
    Thursday: { open: "07:00", close: "21:00", closed: false },
    Friday: { open: "07:00", close: "21:00", closed: false },
    Saturday: { open: "07:00", close: "22:00", closed: false },
    Sunday: { open: "08:00", close: "20:00", closed: false },
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleHours(day: string, field: keyof HoursState[string], value: string | boolean) {
    setHours((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "info", label: "Business Info", icon: MapPin },
    { id: "hours", label: "Opening Hours", icon: Clock },
    { id: "photos", label: "Photos", icon: Camera },
    { id: "halal", label: "Halal Status", icon: ShieldCheck },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-h2 font-bold text-neutral-900">Manage Listing</h1>
          <p className="mt-1 text-body-sm text-neutral-500">Update your business information</p>
        </div>
        {saved && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 text-body-sm font-medium text-emerald-700">
            <CheckCircle className="h-4 w-4" />
            Changes saved!
          </div>
        )}
      </div>

      {/* Listing health banner */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <AlertCircle className="h-5 w-5 shrink-0 text-amber-600" />
        <p className="text-body-sm text-amber-700">
          <strong>Action needed:</strong> Your listing has no photos. Add at least 3 photos to increase views by up to 3×.
        </p>
        <button
          onClick={() => setActiveTab("photos")}
          className="ml-auto shrink-0 text-body-sm font-semibold text-amber-800 underline hover:no-underline"
        >
          Add photos
        </button>
      </div>

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

      <form onSubmit={handleSave}>
        {/* ── Tab: Business Info ── */}
        {activeTab === "info" && (
          <div className="space-y-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="font-display text-h3 font-semibold text-neutral-900">Basic Information</h2>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Business Name</label>
              <Input name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Category</label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                  {businessCategories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">District</label>
                <select name="district" value={form.district} onChange={handleChange}
                  className="flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                  {districts.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Address</label>
              <Input name="address" value={form.address} onChange={handleChange} icon={<MapPin className="h-4 w-4" />} />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4}
                className="w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 resize-none" />
              <p className="mt-1 text-caption text-neutral-400">{form.description.length} characters</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Cuisine Type</label>
                <Input name="cuisineType" value={form.cuisineType} onChange={handleChange} placeholder="e.g. Malay, Indian" />
              </div>
              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Price Range</label>
                <select name="priceRange" value={form.priceRange} onChange={handleChange}
                  className="flex h-10 w-full rounded-lg border border-neutral-300 bg-white px-3 text-body-sm text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20">
                  <option value="1">$ Budget</option>
                  <option value="2">$$ Mid-range</option>
                  <option value="3">$$$ Premium</option>
                  <option value="4">$$$$ Luxury</option>
                </select>
              </div>
            </div>
            <hr className="border-neutral-100" />
            <h2 className="font-display text-h3 font-semibold text-neutral-900">Contact Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Phone</label>
                <Input name="phone" value={form.phone} onChange={handleChange} icon={<Phone className="h-4 w-4" />} />
              </div>
              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Email</label>
                <Input name="email" type="email" value={form.email} onChange={handleChange} icon={<Mail className="h-4 w-4" />} />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Website</label>
              <Input name="website" value={form.website} onChange={handleChange} icon={<Globe className="h-4 w-4" />} />
            </div>
          </div>
        )}

        {/* ── Tab: Opening Hours ── */}
        {activeTab === "hours" && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 font-display text-h3 font-semibold text-neutral-900">Opening Hours</h2>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day} className="flex flex-wrap items-center gap-3">
                  <div className="w-24 text-body-sm font-medium text-neutral-700">{day}</div>
                  <label className="flex items-center gap-2 text-body-sm text-neutral-500">
                    <input
                      type="checkbox"
                      checked={hours[day].closed}
                      onChange={(e) => handleHours(day, "closed", e.target.checked)}
                      className="rounded"
                    />
                    Closed
                  </label>
                  {!hours[day].closed && (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={hours[day].open}
                        onChange={(e) => handleHours(day, "open", e.target.value)}
                        className="rounded-lg border border-neutral-300 px-2 py-1.5 text-body-sm focus:border-primary-500 focus:outline-none"
                      />
                      <span className="text-neutral-400">–</span>
                      <input
                        type="time"
                        value={hours[day].close}
                        onChange={(e) => handleHours(day, "close", e.target.value)}
                        className="rounded-lg border border-neutral-300 px-2 py-1.5 text-body-sm focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Tab: Photos ── */}
        {activeTab === "photos" && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 font-display text-h3 font-semibold text-neutral-900">Business Photos</h2>
            <p className="mb-5 text-body-sm text-neutral-500">
              Add up to 10 photos. Listings with photos receive 3× more views.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {/* Photo upload slots */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="group flex aspect-video cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50 transition-colors hover:border-primary-300 hover:bg-primary-50"
                >
                  <Camera className="h-6 w-6 text-neutral-300 group-hover:text-primary-400" />
                  <span className="text-caption text-neutral-400 group-hover:text-primary-500">Upload photo</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-caption text-neutral-400">
              Supported formats: JPG, PNG, WebP. Max 5MB per photo.
            </p>
            <div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-body-sm text-blue-700">
              <strong>Tips:</strong> Include your storefront, food/products, interior, and team. Clear, well-lit photos perform best.
            </div>
          </div>
        )}

        {/* ── Tab: Halal Status ── */}
        {activeTab === "halal" && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm space-y-5">
            <h2 className="font-display text-h3 font-semibold text-neutral-900">Halal Certification</h2>
            <div className="flex items-center gap-3 rounded-xl border border-primary-200 bg-primary-50 px-4 py-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary-600" />
              <div className="text-body-sm">
                <p className="font-semibold text-primary-800">Currently: Halal Certified</p>
                <p className="text-primary-600">MUIS Certificate · Valid until 31 Dec 2026</p>
              </div>
              <Badge variant="halal" size="sm" className="ml-auto">Certified</Badge>
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">MUIS Certificate Number</label>
              <Input defaultValue="MUIS-2024-WNP-4521" icon={<ShieldCheck className="h-4 w-4" />} />
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Certificate Expiry Date</label>
              <Input type="date" defaultValue="2026-12-31" />
            </div>
            <div className="rounded-xl bg-neutral-50 p-4 text-body-sm text-neutral-600">
              <p className="font-semibold text-neutral-800 mb-1">Certificate Renewal</p>
              <p>
                Your certificate expires in <strong>299 days</strong>. MUIS typically takes 4–6 weeks to process renewals.
                We recommend starting your renewal process 8 weeks before expiry.
              </p>
              <a
                href="https://www.muis.gov.sg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-primary-600 hover:underline"
              >
                Renew on MUIS website →
              </a>
            </div>
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <Button type="submit" variant="primary" size="lg">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ManageListing
