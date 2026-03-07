import { useState, useMemo } from "react"
import { MapPin, Tag, Phone, Clock } from "lucide-react"
import { SearchBar, Badge, Card, CardContent, Button } from "@/components/ui"
import { SectionDivider, GeometricPattern } from "@/components/decorative"

type ClassifiedCategory =
  | "buy-sell"
  | "services"
  | "jobs"
  | "property"
  | "vehicles"
  | "education"
  | "community"

interface Classified {
  id: string
  title: string
  description: string
  category: ClassifiedCategory
  price?: string
  location: string
  contactPhone?: string
  contactEmail?: string
  postedDate: string
  condition?: "new" | "like-new" | "good" | "fair"
  featured?: boolean
}

const CLASSIFIED_CATEGORY_LABELS: Record<ClassifiedCategory, string> = {
  "buy-sell": "Buy & Sell",
  services: "Services",
  jobs: "Jobs",
  property: "Property",
  vehicles: "Vehicles",
  education: "Education",
  community: "Community",
}

const mockClassifieds: Classified[] = [
  {
    id: "1",
    title: "Islamic Books Collection – 50+ Titles",
    description:
      "Large collection of Islamic books including tafsir, hadith collections, fiqh, and Islamic history. Most are in excellent condition. Selling as a bundle or individually. Books include titles by Ibn Kathir, Imam Nawawi, and more.",
    category: "buy-sell",
    price: "$150 for bundle / From $3 each",
    location: "Tampines, Singapore",
    contactPhone: "+65 9123 4567",
    postedDate: "2026-03-05",
    condition: "good",
    featured: true,
  },
  {
    id: "2",
    title: "Halal Home Catering – Malay & Indian Cuisines",
    description:
      "Home-based halal catering service for kenduri, birthdays, and corporate lunches. Specialities: Nasi Minyak, Briyani, Rendang, and traditional Malay desserts. Minimum order 20 pax. MUIS-certified kitchen.",
    category: "services",
    price: "From $15/pax",
    location: "Woodlands, Singapore",
    contactPhone: "+65 9234 5678",
    postedDate: "2026-03-04",
    featured: true,
  },
  {
    id: "3",
    title: "Part-time Quran Teacher Wanted",
    description:
      "Looking for a qualified Quran teacher (Ijazah preferred) to teach 2 children (ages 8 and 11) twice a week. Lessons at our Bedok home. $40–$60/hour depending on experience.",
    category: "jobs",
    price: "$40–$60/hour",
    location: "Bedok, Singapore",
    contactEmail: "quranteacher2026@email.com",
    postedDate: "2026-03-03",
  },
  {
    id: "4",
    title: "3-Room HDB For Rent – Muslim-Friendly",
    description:
      "Well-maintained 3-room HDB flat available for rent. Open to Muslim family or couple. No pets. Close to Masjid and halal eateries. 5 min walk to MRT. Available from 1 April 2026.",
    category: "property",
    price: "$2,200/month",
    location: "Ang Mo Kio, Singapore",
    contactPhone: "+65 9345 6789",
    postedDate: "2026-03-02",
    featured: true,
  },
  {
    id: "5",
    title: "Toyota Vios 2021 – Excellent Condition",
    description:
      "Selling my Toyota Vios 1.5G 2021. Well-maintained, single owner, full service history. Comes with dashcam and tinted windows. Reason for selling: upgrading to MPV.",
    category: "vehicles",
    price: "$62,000 negotiable",
    location: "Jurong, Singapore",
    contactPhone: "+65 9456 7890",
    postedDate: "2026-03-01",
    condition: "like-new",
  },
  {
    id: "6",
    title: "Private Malay Language Tuition (PSLE & O-Level)",
    description:
      "Experienced MOE-trained teacher offering private Malay language tuition for PSLE and O-Level students. 10+ years experience. Small group (max 4) or 1-to-1 available. High track record of A/A* results.",
    category: "education",
    price: "$50–$80/hour",
    location: "Geylang Serai, Singapore",
    contactPhone: "+65 9567 8901",
    postedDate: "2026-02-28",
  },
  {
    id: "7",
    title: "Volunteer Drivers Needed – Ramadan Meal Delivery",
    description:
      "Seeking volunteer drivers to deliver iftar meals to elderly and low-income Muslim families during Ramadan. Slots available daily from 4pm–8pm. Fuel reimbursement provided.",
    category: "community",
    location: "Multiple areas, Singapore",
    contactEmail: "volunteer@ramadandelivery.sg",
    postedDate: "2026-02-27",
    featured: true,
  },
  {
    id: "8",
    title: "Baby Items Bundle – Stroller, Cot & Accessories",
    description:
      "Baby bundle for sale: Stokke stroller (good condition), IKEA baby cot with mattress, baby carrier, playmat, and assorted baby clothes 0–12 months. Halal-certified products where applicable.",
    category: "buy-sell",
    price: "$300 for bundle",
    location: "Clementi, Singapore",
    contactPhone: "+65 9678 9012",
    postedDate: "2026-02-26",
    condition: "good",
  },
  {
    id: "9",
    title: "Halal Food Stall Operator Wanted",
    description:
      "Canteen operator looking for a halal food stall operator for a school canteen in Woodlands. Halal certification required. Low startup cost. Interested parties please call for details.",
    category: "jobs",
    price: "Negotiable",
    location: "Woodlands, Singapore",
    contactPhone: "+65 9789 0123",
    postedDate: "2026-02-25",
  },
  {
    id: "10",
    title: "Photography Services – Weddings & Akad Nikah",
    description:
      "Professional Muslim photographer specialising in Malay weddings, akad nikah, and family portraits. Packages from $800. Full-day coverage with edited digital gallery within 4 weeks.",
    category: "services",
    price: "From $800/event",
    location: "Island-wide, Singapore",
    contactPhone: "+65 9890 1234",
    contactEmail: "photos@muslimweddingsg.com",
    postedDate: "2026-02-24",
    featured: true,
  },
  {
    id: "11",
    title: "Prayer Mat & Telekung Set – New",
    description:
      "Brand new prayer mat and telekung set, brought from Mecca. High quality, beautiful design. Selling at cost price as bought extras. Limited to 5 sets.",
    category: "buy-sell",
    price: "$45/set",
    location: "Kampong Glam, Singapore",
    contactPhone: "+65 9901 2345",
    postedDate: "2026-02-23",
    condition: "new",
  },
  {
    id: "12",
    title: "Fundraising – New Masjid Building Fund",
    description:
      "Our community is fundraising for the construction of a new masjid in Jurong West. Every donation counts. All donations are tax-deductible. Bank transfer details and more info available upon request.",
    category: "community",
    location: "Jurong, Singapore",
    contactEmail: "masjid@jurong-west-mosque.sg",
    postedDate: "2026-02-22",
  },
]

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
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
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
        <h3 className="font-display text-h4 font-semibold text-neutral-900 leading-snug">
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
          {item.contactEmail && (
            <a
              href={`mailto:${item.contactEmail}`}
              className="text-body-sm text-primary-600 hover:text-primary-700"
            >
              {item.contactEmail}
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Classifieds() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(ALL)

  const filtered = useMemo(() => {
    const categoryKey = categoryMap[activeCategory]
    return mockClassifieds.filter((item) => {
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
