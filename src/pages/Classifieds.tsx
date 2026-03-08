import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { MapPin, Tag, Phone, Clock, X, CheckCircle } from "lucide-react"
import { SearchBar, Badge, Card, CardContent, Button } from "@/components/ui"
import { SectionDivider, GeometricPattern } from "@/components/decorative"
import {
  CLASSIFIEDS,
  CLASSIFIED_CATEGORY_LABELS,
  type ClassifiedCategory,
  type Classified,
} from "@/data/classifieds"
import { useToast } from "@/context/ToastContext"

const ALL = "All"
const categoryTabs = [
  ALL,
  "Buy & Sell",
  "Services",
  "Jobs",
  "Property",
  "Vehicles",
  "Education",
  "Community",
]
const categoryMap: Record<string, ClassifiedCategory | null> = {
  All: null,
  "Buy & Sell": "buy-sell",
  Services: "services",
  Jobs: "jobs",
  Property: "property",
  Vehicles: "vehicles",
  Education: "education",
  Community: "community",
}

const conditionColors: Record<string, "success" | "primary" | "default" | "warning"> = {
  new: "success",
  "like-new": "primary",
  good: "default",
  fair: "warning",
}

function formatRelativeDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return "Today"
  if (diff === 1) return "Yesterday"
  if (diff < 7) return `${diff} days ago`
  return date.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })
}

const emptyForm = {
  title: "",
  category: "buy-sell" as ClassifiedCategory,
  price: "",
  description: "",
  location: "",
  contactPhone: "",
  contactEmail: "",
  condition: "" as "" | "new" | "like-new" | "good" | "fair",
}

function PostAdModal({ onClose, onPosted }: { onClose: () => void; onPosted: (item: Classified) => void }) {
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const e: Record<string, string> = {}
    if (!form.title.trim()) e.title = "Title is required"
    if (!form.description.trim()) e.description = "Description is required"
    if (!form.location.trim()) e.location = "Location is required"
    if (!form.contactPhone.trim() && !form.contactEmail.trim()) {
      e.contact = "Provide at least a phone number or email"
    }
    return e
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 900))
    const newItem: Classified = {
      id: `new-${Date.now()}`,
      title: form.title.trim(),
      category: form.category,
      description: form.description.trim(),
      location: form.location.trim(),
      price: form.price.trim() || undefined,
      contactPhone: form.contactPhone.trim() || undefined,
      contactEmail: form.contactEmail.trim() || undefined,
      condition: form.condition || undefined,
      postedDate: new Date().toISOString().split("T")[0],
      featured: false,
    }
    onPosted(newItem)
  }

  function field(name: string, label: string, node: React.ReactNode) {
    return (
      <div>
        <label className="mb-1 block text-body-sm font-medium text-neutral-700">{label}</label>
        {node}
        {errors[name] && <p className="mt-1 text-caption text-red-500">{errors[name]}</p>}
      </div>
    )
  }

  const inputCls = (name: string) =>
    `w-full rounded-xl border px-3 py-2.5 text-body-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-100 ${
      errors[name] ? "border-red-300 focus:border-red-400" : "border-neutral-200 focus:border-primary-400"
    }`

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-100 bg-white px-6 py-4">
          <h2 className="font-display text-h3 font-bold text-neutral-900">Post an Ad</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {field("title", "Title *",
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Islamic Books for Sale"
              className={inputCls("title")}
            />
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {field("category", "Category",
              <select
                value={form.category}
                onChange={(e) => setForm((p) => ({ ...p, category: e.target.value as ClassifiedCategory }))}
                className={inputCls("category")}
              >
                {(Object.entries(CLASSIFIED_CATEGORY_LABELS) as [ClassifiedCategory, string][]).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            )}
            {field("condition", "Condition (optional)",
              <select
                value={form.condition}
                onChange={(e) => setForm((p) => ({ ...p, condition: e.target.value as typeof form.condition }))}
                className={inputCls("condition")}
              >
                <option value="">Not applicable</option>
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {field("price", "Price (optional)",
              <input
                type="text"
                value={form.price}
                onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                placeholder="e.g. $50 or From $15/pax"
                className={inputCls("price")}
              />
            )}
            {field("location", "Location *",
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                placeholder="e.g. Tampines, Singapore"
                className={inputCls("location")}
              />
            )}
          </div>

          {field("description", "Description *",
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={4}
              placeholder="Describe your item, service, or listing in detail…"
              className={inputCls("description")}
            />
          )}

          <div>
            <p className="mb-2 text-body-sm font-medium text-neutral-700">Contact Info * <span className="text-neutral-400 font-normal">(at least one)</span></p>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="tel"
                value={form.contactPhone}
                onChange={(e) => setForm((p) => ({ ...p, contactPhone: e.target.value }))}
                placeholder="Phone number"
                className={inputCls("contact")}
              />
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm((p) => ({ ...p, contactEmail: e.target.value }))}
                placeholder="Email address"
                className={inputCls("contact")}
              />
            </div>
            {errors.contact && <p className="mt-1 text-caption text-red-500">{errors.contact}</p>}
          </div>

          <div className="flex justify-end gap-3 border-t border-neutral-100 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? "Posting…" : "Post Ad"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ClassifiedCard({ item }: { item: Classified }) {
  return (
    <Link to={`/classifieds/${item.id}`} className="block group">
      <Card className="relative overflow-hidden transition-all hover:shadow-lg h-full">
        {item.featured && (
          <div className="absolute right-3 top-3 z-10">
            <Badge variant="accent" size="sm">Featured</Badge>
          </div>
        )}
        <GeometricPattern variant="card" />
        <CardContent className="relative">
          <div className="mb-2 flex flex-wrap items-center gap-1.5">
            <Badge variant="primary" size="sm">
              {CLASSIFIED_CATEGORY_LABELS[item.category]}
            </Badge>
            {item.condition && (
              <Badge variant={conditionColors[item.condition]} size="sm">
                {item.condition.charAt(0).toUpperCase() + item.condition.slice(1).replace("-", " ")}
              </Badge>
            )}
          </div>
          <h3 className="font-display text-h4 font-semibold text-neutral-900 leading-snug group-hover:text-primary-600 transition-colors">
            {item.title}
          </h3>
          <p className="mt-1.5 line-clamp-3 text-body-sm text-neutral-500">{item.description}</p>
          <div className="mt-3 flex flex-col gap-1">
            {item.price && (
              <div className="flex items-center gap-1.5 text-body-sm font-semibold text-primary-700">
                <Tag className="h-3.5 w-3.5 shrink-0" />
                {item.price}
              </div>
            )}
            <div className="flex items-center gap-1.5 text-body-sm text-neutral-400">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {item.location}
            </div>
            <div className="flex items-center gap-1.5 text-body-sm text-neutral-400">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              Posted {formatRelativeDate(item.postedDate)}
            </div>
            {item.contactPhone && (
              <div className="flex items-center gap-1.5 text-body-sm text-neutral-400">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                {item.contactPhone}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function NewListingBanner({ item, onDismiss }: { item: Classified; onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 mb-5">
      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-body-sm text-emerald-900">Ad posted!</p>
        <p className="text-body-sm text-emerald-700 truncate">"{item.title}" is now live in {CLASSIFIED_CATEGORY_LABELS[item.category]}.</p>
      </div>
      <button onClick={onDismiss} className="shrink-0 text-emerald-400 hover:text-emerald-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

function Classifieds() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(ALL)
  const [showModal, setShowModal] = useState(false)
  const [extraListings, setExtraListings] = useState<Classified[]>([])
  const [newBanner, setNewBanner] = useState<Classified | null>(null)
  const { success } = useToast()

  const allListings = [...extraListings, ...CLASSIFIEDS]

  const filtered = useMemo(() => {
    const categoryKey = categoryMap[activeCategory]
    return allListings.filter((item) => {
      const matchesCategory = !categoryKey || item.category === categoryKey
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory, extraListings])

  function handlePosted(item: Classified) {
    setExtraListings((prev) => [item, ...prev])
    setShowModal(false)
    setNewBanner(item)
    success(`Your ad "${item.title}" has been posted!`)
  }

  return (
    <div>
      {showModal && (
        <PostAdModal
          onClose={() => setShowModal(false)}
          onPosted={handlePosted}
        />
      )}

      {/* ── Header ── */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container-page">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1>Community Classifieds</h1>
              <p className="mt-2 text-body-lg text-neutral-500">
                Buy, sell, find services, and connect with the Muslim community
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)}>
              + Post an Ad
            </Button>
          </div>
          <div className="mt-6">
            <SearchBar
              placeholder="Search classifieds..."
              onSearch={setSearch}
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categoryTabs.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="focus:outline-none"
              >
                <Badge
                  variant={activeCategory === cat ? "primary" : "default"}
                  size="lg"
                  className="cursor-pointer transition-colors hover:bg-primary-100 hover:text-primary-700"
                >
                  {cat}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Listings ── */}
      <section className="section-padding-sm">
        <div className="container-page">
          {newBanner && (
            <NewListingBanner item={newBanner} onDismiss={() => setNewBanner(null)} />
          )}

          <div className="mb-4">
            <p className="text-body-sm text-neutral-500">
              Showing <span className="font-semibold text-neutral-900">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "listing" : "listings"}
              {activeCategory !== ALL && (
                <span> in <span className="font-medium">{activeCategory}</span></span>
              )}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <div className="text-4xl">📋</div>
              <p className="text-body font-medium text-neutral-700">No listings found</p>
              <p className="text-body-sm text-neutral-500">Try adjusting your search or filter</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setSearch(""); setActiveCategory(ALL) }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <ClassifiedCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Classifieds
