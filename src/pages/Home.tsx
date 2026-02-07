import { Link } from "react-router-dom"
import {
  MapPin,
  Calendar,
  Users,
  ShieldCheck,
  ArrowRight,
  Utensils,
  Coffee,
  ShoppingBag,
  Briefcase,
  ChefHat,
  CakeSlice,
  Store,
} from "lucide-react"
import { Button, Card, CardContent, Badge, SearchBar, Rating, HalalBadge } from "@/components/ui"
import { GeometricPattern, SectionDivider } from "@/components/decorative"
import { DISTRICT_LABELS, type District } from "@/types"

const districts: { id: District; image: string }[] = [
  { id: "geylang-serai", image: "" },
  { id: "kampong-glam", image: "" },
  { id: "woodlands", image: "" },
  { id: "tampines", image: "" },
  { id: "jurong", image: "" },
  { id: "bedok", image: "" },
]

const categories = [
  { label: "Restaurants", icon: Utensils, count: 245 },
  { label: "Cafes", icon: Coffee, count: 128 },
  { label: "Groceries", icon: ShoppingBag, count: 89 },
  { label: "Services", icon: Briefcase, count: 67 },
  { label: "Catering", icon: ChefHat, count: 34 },
  { label: "Bakeries", icon: CakeSlice, count: 56 },
  { label: "Food Stalls", icon: Store, count: 312 },
]

const featuredBusinesses = [
  {
    id: "1",
    name: "Warung Nasi Padang",
    category: "Restaurants",
    district: "Geylang Serai",
    rating: 4.8,
    reviewCount: 234,
    halalStatus: "certified" as const,
    priceRange: "$$",
  },
  {
    id: "2",
    name: "Kampong Glam Cafe",
    category: "Cafes",
    district: "Kampong Glam",
    rating: 4.6,
    reviewCount: 189,
    halalStatus: "certified" as const,
    priceRange: "$",
  },
  {
    id: "3",
    name: "Bismillah Biryani",
    category: "Restaurants",
    district: "Woodlands",
    rating: 4.9,
    reviewCount: 312,
    halalStatus: "certified" as const,
    priceRange: "$$",
  },
]

const upcomingEvents = [
  {
    id: "1",
    title: "Ramadan Bazaar 2026",
    date: "Mar 1, 2026",
    location: "Geylang Serai",
    category: "Food",
    eventType: "in-person" as const,
  },
  {
    id: "2",
    title: "Islamic Finance Webinar",
    date: "Feb 15, 2026",
    location: "Online",
    category: "Business",
    eventType: "virtual" as const,
  },
  {
    id: "3",
    title: "Community Iftar Gathering",
    date: "Mar 8, 2026",
    location: "Kampong Glam",
    category: "Community",
    eventType: "in-person" as const,
  },
]

const stats = [
  { label: "Halal Businesses", value: "1,200+", icon: ShieldCheck },
  { label: "Monthly Visitors", value: "50K+", icon: Users },
  { label: "Events Listed", value: "300+", icon: Calendar },
  { label: "Districts Covered", value: "15+", icon: MapPin },
]

function Home() {
  return (
    <div>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 text-white md:py-28">
        <GeometricPattern variant="hero" />
        <div className="container-page relative z-10 flex flex-col items-center text-center">
          <Badge variant="accent" size="lg" className="mb-6">
            Singapore&apos;s #1 Halal Directory
          </Badge>
          <h1 className="max-w-3xl text-display font-bold text-white">
            Discover Halal Businesses & Events in Singapore
          </h1>
          <p className="mt-4 max-w-xl text-body-lg text-primary-200">
            Connecting Singapore&apos;s Muslim community with trusted
            halal-certified businesses, restaurants, and community events.
          </p>
          <div className="mt-8 w-full max-w-2xl">
            <SearchBar placeholder="Search halal restaurants, cafes, services..." />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {["Nasi Padang", "Biryani", "Halal BBQ", "Murtabak"].map((tag) => (
              <span
                key={tag}
                className="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-body-sm text-white/80 transition-colors hover:bg-white/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-b border-neutral-200 bg-white py-6">
        <div className="container-page grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans text-h4 font-bold text-neutral-900">{stat.value}</p>
                <p className="text-caption text-neutral-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Browse by Category ── */}
      <section className="section-padding-sm bg-neutral-50">
        <div className="container-page">
          <div className="mb-8 text-center">
            <h2>Browse by Category</h2>
            <p className="mt-2 text-body text-neutral-500">
              Find exactly what you&apos;re looking for
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {categories.map((cat) => (
              <Link
                key={cat.label}
                to={`/directory?category=${cat.label.toLowerCase()}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-neutral-200 bg-white p-4 text-center transition-all hover:border-primary-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-colors group-hover:bg-primary-100">
                  <cat.icon className="h-6 w-6" />
                </div>
                <span className="text-body-sm font-medium text-neutral-700">{cat.label}</span>
                <span className="text-caption text-neutral-400">{cat.count} listings</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Featured Districts ── */}
      <section className="section-padding-sm">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2>Featured Districts</h2>
              <p className="mt-2 text-body text-neutral-500">
                Explore halal businesses by neighborhood
              </p>
            </div>
            <Link
              to="/directory"
              className="hidden items-center gap-1 text-body-sm font-medium text-primary-600 hover:text-primary-700 md:flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {districts.map((district) => (
              <Link
                key={district.id}
                to={`/directory?district=${district.id}`}
                className="group relative overflow-hidden rounded-xl bg-primary-900"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-primary-800 to-primary-600 transition-transform duration-300 group-hover:scale-105">
                  <GeometricPattern variant="hero" className="opacity-15" />
                </div>
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-5">
                  <div>
                    <h3 className="font-display text-h4 font-semibold text-white">
                      {DISTRICT_LABELS[district.id]}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-body-sm text-white/70">
                      <MapPin className="h-3.5 w-3.5" />
                      Explore businesses
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Featured Businesses ── */}
      <section className="section-padding-sm bg-neutral-50">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2>Featured Businesses</h2>
              <p className="mt-2 text-body text-neutral-500">
                Top-rated halal-certified establishments
              </p>
            </div>
            <Link
              to="/directory"
              className="hidden items-center gap-1 text-body-sm font-medium text-primary-600 hover:text-primary-700 md:flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBusinesses.map((biz) => (
              <Card key={biz.id} className="relative overflow-hidden">
                <GeometricPattern variant="card" />
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-50" />
                <CardContent className="relative">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge variant="primary" size="sm">{biz.category}</Badge>
                    <HalalBadge status={biz.halalStatus} size="sm" />
                  </div>
                  <h3 className="font-display text-h4 font-semibold text-neutral-900">{biz.name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-body-sm text-neutral-500">
                    <MapPin className="h-3.5 w-3.5" />
                    {biz.district}
                    <span className="text-neutral-300">|</span>
                    {biz.priceRange}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <Rating value={biz.rating} size="sm" />
                    <span className="text-caption text-neutral-400">
                      {biz.reviewCount} reviews
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ── Upcoming Events ── */}
      <section className="section-padding-sm">
        <div className="container-page">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2>Upcoming Events</h2>
              <p className="mt-2 text-body text-neutral-500">
                Community events, food festivals, and more
              </p>
            </div>
            <Link
              to="/events"
              className="hidden items-center gap-1 text-body-sm font-medium text-primary-600 hover:text-primary-700 md:flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="flex gap-4">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <Badge
                        variant={event.eventType === "virtual" ? "info" : "primary"}
                        size="sm"
                      >
                        {event.eventType === "virtual" ? "Virtual" : "In-Person"}
                      </Badge>
                      <Badge variant="default" size="sm">{event.category}</Badge>
                    </div>
                    <h3 className="font-display text-body font-semibold text-neutral-900">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-body-sm text-neutral-500">
                      {event.date} &middot; {event.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="relative overflow-hidden bg-gradient-hero py-16 text-white">
        <GeometricPattern variant="hero" />
        <div className="container-page relative z-10 text-center">
          <h2 className="text-h1 font-bold text-white">Stay Connected</h2>
          <p className="mx-auto mt-3 max-w-lg text-body-lg text-primary-200">
            Get the latest halal business listings, community events, and
            exclusive offers delivered to your inbox.
          </p>
          <div className="mx-auto mt-8 flex max-w-md gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl border-0 bg-white/10 px-4 py-3 text-body text-white placeholder:text-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <Button variant="accent" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
