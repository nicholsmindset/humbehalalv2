import { useState, useMemo } from "react"
import { Calendar, MapPin, ExternalLink, Users } from "lucide-react"
import { SearchBar, Badge, Card, CardContent, Button } from "@/components/ui"
import { SectionDivider } from "@/components/decorative"
import type { HalalEvent, EventCategory } from "@/types"
import { EVENT_CATEGORY_LABELS } from "@/types"

const mockEvents: HalalEvent[] = [
  {
    id: "1",
    title: "Ramadan Bazaar 2026",
    description:
      "Singapore's largest annual Ramadan bazaar featuring 200+ stalls of food, fashion, and crafts. Celebrate the holy month with the community.",
    date: "2026-03-01",
    endDate: "2026-03-29",
    location: "Geylang Serai, Singapore",
    eventType: "in-person",
    category: "food",
    organizer: "Majlis Ugama Islam Singapura (MUIS)",
    externalLink: "https://example.com/ramadan-bazaar",
  },
  {
    id: "2",
    title: "Islamic Finance & Investment Webinar",
    description:
      "Learn about Shariah-compliant investment instruments, sukuk bonds, and halal mutual funds from certified Islamic finance experts.",
    date: "2026-03-15",
    location: "Online (Zoom)",
    eventType: "virtual",
    category: "business",
    organizer: "Singapore Islamic Finance Association",
    externalLink: "https://example.com/islamic-finance-webinar",
  },
  {
    id: "3",
    title: "Community Iftar Gathering",
    description:
      "Join the Muslim community for a large-scale iftar dinner. Free meal provided. Open to all — bring your family and neighbours.",
    date: "2026-03-08",
    location: "Kampong Glam, Singapore",
    eventType: "in-person",
    category: "community",
    organizer: "Kampong Glam Community Club",
  },
  {
    id: "4",
    title: "Quran Recitation Competition 2026",
    description:
      "Annual Quran recitation (Tilawah) competition open to all age groups. Prizes for top 3 in each category. Register by Feb 28.",
    date: "2026-03-22",
    location: "Masjid Sultan, Arab Street",
    eventType: "in-person",
    category: "religious",
    organizer: "Masjid Sultan",
  },
  {
    id: "5",
    title: "Halal Food Festival Singapore",
    description:
      "A 3-day culinary celebration showcasing the best of Singapore's halal food scene, with live cooking demonstrations and tastings.",
    date: "2026-04-05",
    endDate: "2026-04-07",
    location: "Suntec City Convention Centre",
    eventType: "in-person",
    category: "food",
    organizer: "HalalFest SG",
    externalLink: "https://example.com/halal-food-festival",
  },
  {
    id: "6",
    title: "Muslim Entrepreneur Bootcamp",
    description:
      "2-day intensive programme for aspiring Muslim entrepreneurs. Covers business planning, Islamic business ethics, and halal certification.",
    date: "2026-04-11",
    endDate: "2026-04-12",
    location: "JTC LaunchPad, one-north",
    eventType: "in-person",
    category: "business",
    organizer: "Muslim Business Network SG",
  },
  {
    id: "7",
    title: "Charity Run for Palestine",
    description:
      "5km fun run to raise funds for humanitarian aid. All proceeds go directly to certified relief organisations on the ground.",
    date: "2026-04-18",
    location: "East Coast Park",
    eventType: "in-person",
    category: "charity",
    organizer: "Mercy Relief",
    externalLink: "https://example.com/charity-run",
  },
  {
    id: "8",
    title: "Islamic History & Heritage Walk",
    description:
      "Guided 2-hour walking tour of Kampong Glam's rich Islamic history — mosques, traditional shophouses, and cultural landmarks.",
    date: "2026-04-25",
    location: "Meet at Masjid Sultan, Arab Street",
    eventType: "in-person",
    category: "education",
    organizer: "National Heritage Board",
  },
  {
    id: "9",
    title: "Youth Islamic Knowledge Quiz",
    description:
      "Online quiz competition for secondary and JC students on Islamic history, jurisprudence, and Quran. Prizes worth $2,000.",
    date: "2026-05-02",
    location: "Online",
    eventType: "virtual",
    category: "education",
    organizer: "Islamic Religious Council of Singapore",
    externalLink: "https://example.com/youth-quiz",
  },
  {
    id: "10",
    title: "Halal Cooking Masterclass",
    description:
      "Hands-on cooking workshop with Chef Ismail learning to prepare traditional Malay wedding dishes and festive kueh.",
    date: "2026-05-09",
    location: "SATS Catering, Airport Road",
    eventType: "in-person",
    category: "food",
    organizer: "Halal Culinary Institute",
  },
  {
    id: "11",
    title: "Eid Al-Fitr Celebration 2026",
    description:
      "Join thousands as we celebrate Eid with prayer, cultural performances, food, and a fireworks display along the Singapore River.",
    date: "2026-04-30",
    location: "Padang, Singapore",
    eventType: "in-person",
    category: "religious",
    organizer: "Islamic Religious Council of Singapore",
  },
  {
    id: "12",
    title: "Zakat & Waqf Forum",
    description:
      "Annual forum bringing together scholars, practitioners, and policymakers to discuss the role of Islamic philanthropy in Singapore.",
    date: "2026-05-16",
    location: "Suntec City Convention Centre",
    eventType: "in-person",
    category: "community",
    organizer: "MUIS",
  },
]

const ALL = "All"
const categoryTabs = [ALL, "Religious", "Community", "Food", "Business", "Charity", "Education"]
const categoryMap: Record<string, EventCategory | null> = {
  All: null,
  Religious: "religious",
  Community: "community",
  Food: "food",
  Business: "business",
  Charity: "charity",
  Education: "education",
}

function formatDate(dateStr: string, endDateStr?: string) {
  const opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }
  const start = new Date(dateStr).toLocaleDateString("en-SG", opts)
  if (endDateStr) {
    const end = new Date(endDateStr).toLocaleDateString("en-SG", opts)
    return `${start} – ${end}`
  }
  return start
}

function EventCard({ event }: { event: HalalEvent }) {
  const dateObj = new Date(event.date)
  const dayNum = dateObj.getDate()
  const monthShort = dateObj.toLocaleDateString("en-SG", { month: "short" })

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="flex flex-1 gap-4">
        {/* Date block */}
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-primary-50 text-primary-700">
          <span className="font-sans text-h3 font-bold leading-tight">{dayNum}</span>
          <span className="text-caption font-semibold uppercase tracking-wider">{monthShort}</span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
            <Badge
              variant={event.eventType === "virtual" ? "info" : "primary"}
              size="sm"
            >
              {event.eventType === "virtual" ? "Virtual" : "In-Person"}
            </Badge>
            <Badge variant="default" size="sm">
              {EVENT_CATEGORY_LABELS[event.category]}
            </Badge>
          </div>
          <h3 className="font-display text-body font-semibold text-neutral-900 leading-snug">
            {event.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-body-sm text-neutral-500">{event.description}</p>
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-body-sm text-neutral-400">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              {formatDate(event.date, event.endDate)}
            </div>
            <div className="flex items-center gap-1.5 text-body-sm text-neutral-400">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              {event.location}
            </div>
            <div className="flex items-center gap-1.5 text-body-sm text-neutral-400">
              <Users className="h-3.5 w-3.5 shrink-0" />
              {event.organizer}
            </div>
          </div>
          {event.externalLink && (
            <a
              href={event.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-body-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Register / Learn more
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Events() {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState(ALL)

  const filtered = useMemo(() => {
    const categoryKey = categoryMap[activeCategory]
    return mockEvents.filter((event) => {
      const matchesCategory = !categoryKey || event.category === categoryKey
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.location.toLowerCase().includes(q) ||
        event.organizer.toLowerCase().includes(q)
      return matchesCategory && matchesSearch
    })
  }, [search, activeCategory])

  return (
    <div>
      {/* ── Header ── */}
      <section className="bg-white py-8 shadow-sm">
        <div className="container-page">
          <h1>Community Events</h1>
          <p className="mt-2 text-body-lg text-neutral-500">
            Islamic events, food festivals, and community gatherings
          </p>
          <div className="mt-6">
            <SearchBar
              placeholder="Search events by name, location, or organiser..."
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
              {filtered.length === 1 ? "event" : "events"}
              {activeCategory !== ALL && (
                <span> in <span className="font-medium">{activeCategory}</span></span>
              )}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-20 text-center">
              <div className="text-4xl">📅</div>
              <p className="text-body font-medium text-neutral-700">No events found</p>
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
            <div className="grid gap-5 lg:grid-cols-2">
              {filtered.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Events
