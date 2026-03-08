import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  Calendar, MapPin, Users, ExternalLink, ArrowLeft, ChevronRight,
  Monitor, Clock, CheckCircle,
} from "lucide-react"
import { Button, Card, CardContent, Badge } from "@/components/ui"
import { GeometricPattern, SectionDivider } from "@/components/decorative"
import { getEventById } from "@/data/events"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/context/ToastContext"
import { EVENT_CATEGORY_LABELS } from "@/types"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-SG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

const categoryColors: Record<string, "primary" | "success" | "info" | "warning" | "accent" | "default"> = {
  religious: "primary",
  community: "success",
  food: "accent",
  business: "info",
  charity: "warning",
  education: "default",
}

function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const event = getEventById(id ?? "")
  const { isAuthenticated } = useAuth()
  const { success, info } = useToast()

  const [registered, setRegistered] = useState(false)
  const [registering, setRegistering] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  if (!event) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-h3 font-display font-bold text-neutral-800">Event Not Found</p>
        <p className="text-body text-neutral-500">This event may have ended or doesn't exist.</p>
        <Link to="/events">
          <Button variant="primary">Back to Events</Button>
        </Link>
      </div>
    )
  }

  const isMultiDay = Boolean(event.endDate)
  const dateLabel = isMultiDay
    ? `${formatDate(event.date)} – ${formatDate(event.endDate!)}`
    : formatDate(event.date)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!isAuthenticated && !name.trim()) {
      info("Please enter your name to register.")
      return
    }
    setRegistering(true)
    await new Promise((r) => setTimeout(r, 800))
    setRegistering(false)
    setRegistered(true)
    success(`You're registered for "${event!.title}"! Check your email for confirmation.`)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-12 text-white">
        <GeometricPattern variant="hero" />
        <div className="container-page relative z-10">
          <nav className="mb-4 flex items-center gap-2 text-caption text-primary-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/events" className="hover:text-white">Events</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{event.title}</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant={categoryColors[event.category] ?? "default"} size="sm">
                  {EVENT_CATEGORY_LABELS[event.category]}
                </Badge>
                <Badge variant={event.eventType === "virtual" ? "info" : "default"} size="sm">
                  {event.eventType === "virtual" ? (
                    <><Monitor className="mr-1 h-3 w-3" />Virtual</>
                  ) : (
                    <><Users className="mr-1 h-3 w-3" />In-Person</>
                  )}
                </Badge>
              </div>
              <h1 className="font-display text-h1 font-bold text-white">{event.title}</h1>
              <p className="mt-1.5 text-body-lg text-primary-200">Organised by {event.organizer}</p>

              <div className="mt-4 flex flex-wrap gap-4 text-body-sm text-primary-200">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{isMultiDay ? `${event.date} – ${event.endDate}` : event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-body-sm text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="section-padding-sm">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-3">

            {/* Left: Description */}
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardContent>
                  <h2 className="mb-4 font-display text-h3 font-bold text-neutral-900">About This Event</h2>
                  <p className="text-body text-neutral-600 leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </CardContent>
              </Card>

              {/* Event details grid */}
              <Card>
                <CardContent>
                  <h2 className="mb-4 font-display text-h3 font-bold text-neutral-900">Event Details</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { icon: Calendar, label: "Date", value: dateLabel },
                      { icon: Clock, label: "Type", value: event.eventType === "virtual" ? "Online / Virtual" : "In-Person" },
                      { icon: MapPin, label: "Location", value: event.location },
                      { icon: Users, label: "Organiser", value: event.organizer },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                          <Icon className="h-4 w-4 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-caption font-semibold uppercase tracking-wider text-neutral-400">{label}</p>
                          <p className="mt-0.5 text-body-sm text-neutral-800">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {event.externalLink && (
                    <div className="mt-5 border-t border-neutral-100 pt-5">
                      <a
                        href={event.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-body-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Official event page
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right: Registration */}
            <div>
              <Card className="sticky top-4">
                <CardContent>
                  {registered ? (
                    <div className="py-4 text-center">
                      <div className="mb-3 flex justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                          <CheckCircle className="h-8 w-8 text-emerald-500" />
                        </div>
                      </div>
                      <h3 className="font-display text-h4 font-bold text-emerald-900">You're Registered!</h3>
                      <p className="mt-2 text-body-sm text-neutral-500">
                        A confirmation has been sent to your email. See you at {event.title}!
                      </p>
                      <Link to="/events">
                        <Button variant="outline" size="sm" className="mt-4">
                          Browse More Events
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <h3 className="mb-4 font-display text-h4 font-bold text-neutral-900">Register for This Event</h3>
                      <form onSubmit={handleRegister} className="space-y-3">
                        {!isAuthenticated && (
                          <>
                            <div>
                              <label className="mb-1 block text-body-sm font-medium text-neutral-700">Full Name</label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                                className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-body-sm placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-body-sm font-medium text-neutral-700">Email</label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-body-sm placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                              />
                            </div>
                          </>
                        )}
                        <Button
                          type="submit"
                          variant="primary"
                          className="w-full"
                          disabled={registering}
                        >
                          {registering ? "Registering…" : "Register Now — Free"}
                        </Button>
                      </form>

                      {event.externalLink && (
                        <div className="mt-3 text-center">
                          <a
                            href={event.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-body-sm text-neutral-400 hover:text-neutral-600"
                          >
                            Or register on the official site →
                          </a>
                        </div>
                      )}

                      {!isAuthenticated && (
                        <p className="mt-3 text-center text-caption text-neutral-400">
                          <Link to="/sign-in" className="text-primary-600 hover:underline">Sign in</Link> for faster registration.
                        </p>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventDetail
