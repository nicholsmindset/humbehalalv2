import { useState, useMemo } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Calendar, MapPin, ExternalLink, Users } from "lucide-react"
import { SearchBar, Badge, Card, CardContent, Button } from "@/components/ui"
import { SectionDivider } from "@/components/decorative"
import type { HalalEvent, EventCategory } from "@/types"
import { EVENT_CATEGORY_LABELS } from "@/types"
import { EVENTS } from "@/data/events"

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
    <Link to={`/events/${event.id}`} className="block group">
      <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg h-full">
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
            <h3 className="font-display text-body font-semibold text-neutral-900 leading-snug group-hover:text-primary-600 transition-colors">
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
              <div className="mt-2 inline-flex items-center gap-1 text-body-sm font-medium text-primary-600">
                Register / Learn more
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function Events() {
  const [searchParams] = useSearchParams()

  const [search, setSearch] = useState(() => searchParams.get("q") ?? "")

  const [activeCategory, setActiveCategory] = useState(() => {
    const cat = searchParams.get("category")
    if (!cat) return ALL
    return categoryTabs.find((tab) => tab.toLowerCase() === cat.toLowerCase()) ?? ALL
  })

  const filtered = useMemo(() => {
    const categoryKey = categoryMap[activeCategory]
    return EVENTS.filter((event) => {
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
