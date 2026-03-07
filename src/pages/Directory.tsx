import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { MapPin, Phone, Globe, Clock, Star } from "lucide-react"
import { SearchBar, Badge, Card, CardContent, HalalBadge, Rating, Button } from "@/components/ui"
import { SectionDivider } from "@/components/decorative"
import { GeometricPattern } from "@/components/decorative"
import type { Business, BusinessCategory } from "@/types"
import { DISTRICT_LABELS, CATEGORY_LABELS } from "@/types"

const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Warung Nasi Padang",
    description: "Authentic Padang cuisine with over 20 varieties of dishes served fresh daily. Family-owned since 1985.",
    category: "restaurants",
    district: "geylang-serai",
    address: "123 Geylang Road, #01-45, Singapore 389102",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6741 2345",
    website: "https://example.com",
    hours: "Mon-Sun: 7am – 9pm",
    rating: 4.8,
    reviewCount: 234,
    priceRange: 2,
    cuisineType: "Malay/Indonesian",
    featured: true,
  },
  {
    id: "2",
    name: "Kampong Glam Cafe",
    description: "Cozy cafe serving specialty coffee, Western breakfast, and local favourites in the heart of Arab Street.",
    category: "cafes",
    district: "kampong-glam",
    address: "28 Arab Street, Singapore 199734",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6291 8820",
    hours: "Daily: 8am – 10pm",
    rating: 4.6,
    reviewCount: 189,
    priceRange: 2,
    cuisineType: "Cafe/Western",
    featured: true,
  },
  {
    id: "3",
    name: "Bismillah Biryani",
    description: "Award-winning biryani restaurant serving authentic South Indian and North Indian rice dishes.",
    category: "restaurants",
    district: "woodlands",
    address: "701 Woodlands Drive 40, #01-03, Singapore 730701",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6367 0284",
    hours: "Mon-Sun: 11am – 10pm",
    rating: 4.9,
    reviewCount: 312,
    priceRange: 2,
    cuisineType: "Indian",
    featured: true,
  },
  {
    id: "4",
    name: "Al-Azhar Restaurant",
    description: "Traditional Malay cuisine including mee rebus, satay, and weekend specials. A community staple for decades.",
    category: "restaurants",
    district: "geylang-serai",
    address: "15 Geylang Serai Market, Singapore 402001",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6748 0011",
    hours: "Tue-Sun: 9am – 8pm",
    rating: 4.5,
    reviewCount: 156,
    priceRange: 1,
    cuisineType: "Malay",
  },
  {
    id: "5",
    name: "Tampines Halal Grocer",
    description: "Your one-stop halal supermarket with fresh produce, imported goods, and specialty halal-certified products.",
    category: "groceries",
    district: "tampines",
    address: "1 Tampines Central 5, #B1-20, Singapore 529508",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6787 3321",
    hours: "Daily: 9am – 10pm",
    rating: 4.3,
    reviewCount: 98,
    priceRange: 2,
  },
  {
    id: "6",
    name: "Masjid Sultan Bakehouse",
    description: "Artisan bakery specialising in traditional Malay kueh, breads, and custom halal celebration cakes.",
    category: "bakeries",
    district: "kampong-glam",
    address: "3 Bussorah Street, Singapore 199454",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6292 4405",
    hours: "Mon-Sat: 7am – 7pm",
    rating: 4.7,
    reviewCount: 203,
    priceRange: 2,
    cuisineType: "Bakery/Confectionery",
    featured: true,
  },
  {
    id: "7",
    name: "Jurong East Food Stalls",
    description: "Hawker centre featuring 40+ halal stalls serving everything from chicken rice to nasi lemak and more.",
    category: "food-stalls",
    district: "jurong",
    address: "10 Jurong East Ave 1, Singapore 609788",
    photos: [],
    halalStatus: "certified",
    hours: "Daily: 6am – 11pm",
    rating: 4.4,
    reviewCount: 421,
    priceRange: 1,
  },
  {
    id: "8",
    name: "Bedok Muslim Catering",
    description: "Full-service halal catering for weddings, corporate events, and family gatherings. Serves up to 1,000 pax.",
    category: "catering",
    district: "bedok",
    address: "416 Bedok North Ave 2, Singapore 460416",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6444 7788",
    contactEmail: "events@bedokmuslimcatering.sg",
    website: "https://example.com",
    hours: "Mon-Sat: 9am – 6pm",
    rating: 4.6,
    reviewCount: 87,
    priceRange: 3,
  },
  {
    id: "9",
    name: "AMK Islamic Finance Services",
    description: "Shariah-compliant financial advisory, insurance (takaful), and investment planning services.",
    category: "services",
    district: "ang-mo-kio",
    address: "730 Ang Mo Kio Ave 6, #05-11, Singapore 560730",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6456 9900",
    contactEmail: "info@amkislamicfinance.sg",
    hours: "Mon-Fri: 9am – 6pm",
    rating: 4.5,
    reviewCount: 62,
    priceRange: 3,
  },
  {
    id: "10",
    name: "Clementi Turkish Kitchen",
    description: "Authentic Turkish cuisine — doner kebabs, pide, and baklava — in a warm, welcoming atmosphere.",
    category: "restaurants",
    district: "clementi",
    address: "450 Clementi Ave 3, #01-301, Singapore 120450",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6778 2200",
    hours: "Tue-Sun: 11am – 9:30pm",
    rating: 4.7,
    reviewCount: 143,
    priceRange: 2,
    cuisineType: "Turkish",
  },
  {
    id: "11",
    name: "Bukit Merah Malay Kitchen",
    description: "Home-style Malay cooking with generous portions. Famous for beef rendang and assam pedas.",
    category: "restaurants",
    district: "bukit-merah",
    address: "159 Bukit Merah Central, #01-13, Singapore 150159",
    photos: [],
    halalStatus: "pending",
    contactPhone: "+65 6272 5533",
    hours: "Mon-Sat: 10am – 8pm",
    rating: 4.2,
    reviewCount: 74,
    priceRange: 1,
    cuisineType: "Malay",
  },
  {
    id: "12",
    name: "Tampines Spice Garden",
    description: "Modern Indian restaurant offering tandoori specialties, vegetarian options, and weekend brunch.",
    category: "restaurants",
    district: "tampines",
    address: "10 Tampines Central 1, #03-15, Singapore 529536",
    photos: [],
    halalStatus: "certified",
    contactPhone: "+65 6787 0022",
    hours: "Daily: 11am – 10pm",
    rating: 4.6,
    reviewCount: 118,
    priceRange: 2,
    cuisineType: "Indian",
  },
]

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
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <GeometricPattern variant="card" />
      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-50" />
      <CardContent className="relative">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Badge variant="primary" size="sm">
            {CATEGORY_LABELS[biz.category]}
          </Badge>
          <HalalBadge status={biz.halalStatus} size="sm" />
        </div>
        <h3 className="font-display text-h4 font-semibold text-neutral-900">{biz.name}</h3>
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
          <a
            href={biz.website}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center gap-1 text-body-sm text-primary-600 hover:text-primary-700"
          >
            <Globe className="h-3.5 w-3.5" />
            Visit website
          </a>
        )}
      </CardContent>
    </Card>
  )
}

function Directory() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES)

  const filtered = useMemo(() => {
    const categoryKey = categoryMap[activeCategory]
    return mockBusinesses.filter((biz) => {
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
