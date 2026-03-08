import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { MapPin, Tag, Phone, Clock } from "lucide-react"
import { SearchBar, Badge, Card, CardContent, Button } from "@/components/ui"
import { SectionDivider, GeometricPattern } from "@/components/decorative"
import {
  CLASSIFIEDS,
  CLASSIFIED_CATEGORY_LABELS,
  type ClassifiedCategory,
  type Classified,
} from "@/data/classifieds"

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

function Classifieds() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(ALL)

  const filtered = useMemo(() => {
    const categoryKey = categoryMap[activeCategory]
    return CLASSIFIEDS.filter((item) => {
      const matchesCategory = !categoryKey || item.category === categoryKey
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.location.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

  return (
    <div>
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
            <Button variant="primary" size="sm">
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
