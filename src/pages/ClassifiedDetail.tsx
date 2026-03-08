import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { MapPin, Phone, Mail, Tag, Clock, ArrowLeft, ChevronRight, Send } from "lucide-react"
import { Button, Card, CardContent, Badge } from "@/components/ui"
import { GeometricPattern, SectionDivider } from "@/components/decorative"
import { getClassifiedById, CLASSIFIED_CATEGORY_LABELS } from "@/data/classifieds"
import { useToast } from "@/context/ToastContext"

function formatRelativeDate(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
  if (diff === 0) return "Today"
  if (diff === 1) return "Yesterday"
  if (diff < 7) return `${diff} days ago`
  return date.toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })
}

const conditionColors: Record<string, "success" | "primary" | "default" | "warning"> = {
  new: "success",
  "like-new": "primary",
  good: "default",
  fair: "warning",
}

function ClassifiedDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const classified = getClassifiedById(id ?? "")
  const { success, info } = useToast()

  const [senderName, setSenderName] = useState("")
  const [senderEmail, setSenderEmail] = useState("")
  const [message, setMessage] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (!classified) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-h3 font-display font-bold text-neutral-800">Listing Not Found</p>
        <p className="text-body text-neutral-500">This listing may have been removed or doesn't exist.</p>
        <Link to="/classifieds">
          <Button variant="primary">Back to Classifieds</Button>
        </Link>
      </div>
    )
  }

  async function handleContact(e: React.FormEvent) {
    e.preventDefault()
    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      info("Please fill in all fields before sending.")
      return
    }
    setSending(true)
    await new Promise((r) => setTimeout(r, 700))
    setSending(false)
    setSent(true)
    success("Your message has been sent to the poster!")
  }

  function handleCall() {
    info(`Calling ${classified?.contactPhone}…`)
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
            <Link to="/classifieds" className="hover:text-white">Classifieds</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{classified.title}</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge variant="primary" size="sm">{CLASSIFIED_CATEGORY_LABELS[classified.category]}</Badge>
                {classified.condition && (
                  <Badge variant={conditionColors[classified.condition]} size="sm">
                    {classified.condition.charAt(0).toUpperCase() + classified.condition.slice(1).replace("-", " ")}
                  </Badge>
                )}
                {classified.featured && <Badge variant="accent" size="sm">Featured</Badge>}
              </div>
              <h1 className="font-display text-h1 font-bold text-white">{classified.title}</h1>
              {classified.price && (
                <p className="mt-2 text-h3 font-display font-bold text-accent-400">{classified.price}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-4 text-body-sm text-primary-200">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {classified.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  Posted {formatRelativeDate(classified.postedDate)}
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
                  <h2 className="mb-4 font-display text-h3 font-bold text-neutral-900">Description</h2>
                  <p className="text-body text-neutral-600 leading-relaxed whitespace-pre-line">
                    {classified.description}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h2 className="mb-4 font-display text-h3 font-bold text-neutral-900">Listing Details</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { icon: Tag, label: "Category", value: CLASSIFIED_CATEGORY_LABELS[classified.category] },
                      { icon: MapPin, label: "Location", value: classified.location },
                      ...(classified.price ? [{ icon: Tag, label: "Price", value: classified.price }] : []),
                      ...(classified.condition ? [{ icon: Tag, label: "Condition", value: classified.condition.charAt(0).toUpperCase() + classified.condition.slice(1).replace("-", " ") }] : []),
                      { icon: Clock, label: "Posted", value: formatRelativeDate(classified.postedDate) },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50">
                          <Icon className="h-3.5 w-3.5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-caption font-semibold uppercase tracking-wider text-neutral-400">{label}</p>
                          <p className="mt-0.5 text-body-sm text-neutral-800">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Contact */}
            <div className="space-y-4">
              {/* Direct contact */}
              <Card>
                <CardContent>
                  <h3 className="mb-4 font-display text-h4 font-bold text-neutral-900">Contact Poster</h3>
                  <div className="space-y-3">
                    {classified.contactPhone && (
                      <Button variant="primary" className="w-full" onClick={handleCall}>
                        <Phone className="mr-2 h-4 w-4" />
                        {classified.contactPhone}
                      </Button>
                    )}
                    {classified.contactEmail && (
                      <a href={`mailto:${classified.contactEmail}`} className="block">
                        <Button variant="outline" className="w-full">
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Message form */}
              <Card>
                <CardContent>
                  <h3 className="mb-4 font-display text-h4 font-bold text-neutral-900">
                    <Send className="mr-2 inline h-4 w-4 text-primary-500" />
                    Send a Message
                  </h3>

                  {sent ? (
                    <div className="rounded-xl bg-emerald-50 p-4 text-center">
                      <p className="font-semibold text-emerald-800">Message sent!</p>
                      <p className="mt-1 text-body-sm text-emerald-600">The poster will get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleContact} className="space-y-3">
                      <div>
                        <label className="mb-1 block text-body-sm font-medium text-neutral-700">Your Name</label>
                        <input
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="Full name"
                          className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-body-sm placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-body-sm font-medium text-neutral-700">Your Email</label>
                        <input
                          type="email"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-body-sm placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-body-sm font-medium text-neutral-700">Message</label>
                        <textarea
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          rows={4}
                          placeholder="Hi, I'm interested in your listing…"
                          className="w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-body-sm placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                        />
                      </div>
                      <Button type="submit" variant="primary" className="w-full" disabled={sending}>
                        {sending ? "Sending…" : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              <p className="text-center text-caption text-neutral-400">
                Always meet in a safe, public place. HumbleHalal is not liable for transactions between users.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ClassifiedDetail
