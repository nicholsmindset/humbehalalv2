import { useState, useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { MapPin, Phone, Globe, Clock, Star } from "lucide-react"
import { SearchBar, Badge, Card, CardContent, HalalBadge, Rating, Button } from "@/components/ui"
import { SectionDivider } from "@/components/decorative"
import { GeometricPattern } from "@/components/decorative"
import type { Business, BusinessCategory, District } from "@/types"
import { DISTRICT_LABELS, CATEGORY_LABELS } from "@/types"
import { BUSINESSES } from "@/data/businesses"

const ALL_CATEGORIES = "All"

const categoryTabs = [
  ALL_CATEGORIES,
  "Restaurants",
  "Cafes",
  "Groceries",
  "Services",
  "Catering",
  "Bakeries",
  "Food Stalls",
]

const categoryMap: Record<string, BusinessCategory | null> = {
  All: null,
  Restaurants: "restaurants",
  Cafes: "cafes",
  Groceries: "groceries",
  Services: "services",
  Catering: "catering",
  Bakeries: "bakeries",
  "Food Stalls": "food-stalls",
}

function priceRangeLabel(range: number) {
  return "$".repeat(range)
}

function BusinessCard({ biz }: { biz: Business }) {
  return (
    <Link to={`/directory/${biz.id}`} className="block group">
      <Card className="relative overflow-hidden transition-all hover:shadow-lg h-full">
        <GeometricPattern variant="card" />
        <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-50" />
        <CardContent className="relative">
          <div className="mb-2 flex items-start justify-between gap-2">
            <Badge variant="primary" size="sm">
              {CATEGORY_LABELS[biz.category]}
            </Badge>
            <HalalBadge status={biz.halalStatus} size="sm" />
          </div>
          <h3 className="font-display text-h4 font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{biz.name}</h3>
          <p className="mt-1 line-clamp-2 text-body-sm text-neutral-500">{biz.description}</p>
          <div className="mt-2 flex items-center gap-2 text-body-sm text-neutral-500">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{DISTRICT_LABELS[biz.district]}</span>
            <span className="text-neutral-300">|</span>
            <span>{priceRangeLabel(biz.priceRange)}</span>
          </div>
          {biz.hours && (
            <div className="mt-1 flex items-center gap-2 text-body-sm text-neutral-400">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{biz.hours}</span>
            </div>
          )}
          {biz.contactPhone && (
            <div className="mt-1 flex items-center gap-2 text-body-sm text-neutral-400">
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {biz.contactPhone}
            </div>
          )}
          <div className="mt-3 flex items-center justify-between">
            <Rating value={biz.rating} size="sm" />
            <span className="text-caption text-neutral-400">
              {biz.reviewCount} reviews
            </span>
          </div>
          {biz.website && (
            <div className="mt-3 flex items-center gap-1 text-body-sm text-primary-600">
              <Globe className="h-3.5 w-3.5" />
              Visit website
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}

function Directory() {
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(() => {
    const q = searchParams.get("q") ?? ""
    const district = searchParams.get("district")
    if (q) return q
    if (district) return DISTRICT_LABELS[district as District] ?? ""
    return ""
  })

  const [activeCategory, setActiveCategory] = useState(() => {
    const cat = searchParams.get("category")
    if (!cat) return ALL_CATEGORIES
    return categoryTabs.find((tab) => categoryMap[tab] === cat) ?? ALL_CATEGORIES
  })

  const filtered = useMemo(() => {
    const categoryKey = categoryMap[activeCategory]
    return BUSINESSES.filter((biz) => {
      const matchesCategory = !categoryKey || biz.category === categoryKey
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        biz.name.toLowerCase().includes(q) ||
        biz.description.toLowerCase().includes(q) ||
        DISTRICT_LABELS[biz.district].toLowerCase().includes(q) ||
        (biz.cuisineType?.toLowerCase().includes(q) ?? false)
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
              <h1>Halal Business Directory</h1>
              <p className="mt-2 text-body-lg text-neutral-500">
                Discover halal-certified businesses across Singapore
              </p>
            </div>
            <Link to="/submit-business">
              <Button variant="primary" size="sm">
                + List Your Business
              </Button>
            </Link>
          </div>
          <div className="mt-6">
            <SearchBar
              placeholder="Search by name, cuisine, or location..."
              onSearch={setSearch}
              defaultValue={search}
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
          <div className="mb-4 flex items-center justify-between">
            <p className="text-body-sm text-neutral-500">
              Showing <span className="font-semibold text-neutral-900">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "business" : "businesses"}
              {activeCategory !== ALL_CATEGORIES && (
                <span> in <span className="font-medium">{activeCategory}</span></span>
              )}
            </p>
            <div className="flex items-center gap-1 text-body-sm text-neutral-400">
              <Star className="h-3.5 w-3.5 text-accent-400" />
              Sorted by rating
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <div className="text-4xl">🔍</div>
              <p className="text-body font-medium text-neutral-700">No businesses found</p>
              <p className="text-body-sm text-neutral-500">Try adjusting your search or filter</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => { setSearch(""); setActiveCategory(ALL_CATEGORIES) }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((biz) => (
                <BusinessCard key={biz.id} biz={biz} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Directory
