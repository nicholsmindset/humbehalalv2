import { useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  MapPin, Phone, Globe, Clock, Star, ArrowLeft, ShieldCheck,
  ExternalLink, MessageSquare, ChevronRight, Heart,
} from "lucide-react"
import { Button, Card, CardContent, Badge, HalalBadge, Rating } from "@/components/ui"
import { GeometricPattern, SectionDivider } from "@/components/decorative"
import { getBusinessById } from "@/data/businesses"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/context/ToastContext"
import { useSaved } from "@/hooks/useSaved"
import { CATEGORY_LABELS, DISTRICT_LABELS } from "@/types"

const mockReviews = [
  { id: "r1", userName: "Aisha Rahman", rating: 5, comment: "Best nasi padang in Singapore! The rendang is absolutely amazing — tender, rich, and full of flavour. Will definitely be back.", createdAt: "2026-02-20" },
  { id: "r2", userName: "Mohammad Farid", rating: 4, comment: "Great variety of dishes, very generous portions. The queue can get long during lunch but it's worth the wait.", createdAt: "2026-02-15" },
  { id: "r3", userName: "Nurul Huda", rating: 5, comment: "Family-run place with such warm hospitality. You can taste the love in every dish. My go-to spot for decades.", createdAt: "2026-02-08" },
]

const priceRangeLabel: Record<number, string> = { 1: "$", 2: "$$", 3: "$$$", 4: "$$$$" }

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="text-neutral-300 transition-colors hover:text-amber-400"
        >
          <Star
            className="h-6 w-6"
            fill={(hovered || value) >= n ? "#fbbf24" : "none"}
            stroke={(hovered || value) >= n ? "#fbbf24" : "currentColor"}
          />
        </button>
      ))}
    </div>
  )
}

function BusinessDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const business = getBusinessById(id ?? "")
  const { user, isAuthenticated } = useAuth()
  const { success, info } = useToast()
  const { isSaved, toggle: toggleSaved } = useSaved()

  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [reviews, setReviews] = useState(mockReviews)

  if (!business) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-h3 font-display font-bold text-neutral-800">Business Not Found</p>
        <p className="text-body text-neutral-500">This listing may have been removed or doesn't exist.</p>
        <Link to="/directory">
          <Button variant="primary">Back to Directory</Button>
        </Link>
      </div>
    )
  }

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault()
    if (!isAuthenticated) {
      info("Please sign in to leave a review.")
      navigate("/sign-in", { state: { from: `/directory/${id}` } })
      return
    }
    if (reviewRating === 0) {
      info("Please select a star rating.")
      return
    }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 700))
    setReviews((prev) => [
      {
        id: `r${Date.now()}`,
        userName: user?.name ?? "Anonymous",
        rating: reviewRating,
        comment: reviewComment,
        createdAt: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ])
    setReviewRating(0)
    setReviewComment("")
    setSubmitting(false)
    success("Your review has been posted!")
  }

  function handleCallClick() {
    info(`Calling ${business?.contactPhone}…`)
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
            <Link to="/directory" className="hover:text-white">Directory</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white">{business.name}</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <HalalBadge status={business.halalStatus} />
                <Badge variant="primary" size="sm">{CATEGORY_LABELS[business.category]}</Badge>
                {business.featured && <Badge variant="accent" size="sm">Featured</Badge>}
              </div>
              <h1 className="font-display text-h1 font-bold text-white">{business.name}</h1>
              {business.cuisineType && (
                <p className="mt-1 text-body-lg text-primary-200">{business.cuisineType} · {priceRangeLabel[business.priceRange]}</p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Rating value={business.rating} size="sm" />
                  <span className="text-body-sm text-primary-200">
                    {business.rating} ({business.reviewCount} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-primary-200">
                  <MapPin className="h-4 w-4" />
                  <span className="text-body-sm">{DISTRICT_LABELS[business.district]}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  toggleSaved(business.id)
                  isSaved(business.id) ? info("Removed from saved.") : success("Saved to your profile!")
                }}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-body-sm font-medium transition-colors ${
                  isSaved(business.id)
                    ? "bg-red-500/20 text-red-200 hover:bg-red-500/30"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                <Heart className={`h-4 w-4 ${isSaved(business.id) ? "fill-red-300" : ""}`} />
                {isSaved(business.id) ? "Saved" : "Save"}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-body-sm text-white hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="section-padding-sm">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-3">

            {/* Left: Details */}
            <div className="space-y-6 lg:col-span-2">
              {/* About */}
              <Card>
                <CardContent>
                  <h2 className="mb-3 font-display text-h3 font-bold text-neutral-900">About</h2>
                  <p className="text-body text-neutral-600 leading-relaxed">{business.description}</p>
                </CardContent>
              </Card>

              {/* Halal Certification */}
              <Card className={business.halalStatus === "certified" ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${business.halalStatus === "certified" ? "bg-emerald-500" : "bg-amber-400"} text-white`}>
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-body font-semibold text-neutral-900">
                        {business.halalStatus === "certified" ? "Halal Certified" : "Certification Pending"}
                      </h3>
                      <p className="text-body-sm text-neutral-600">
                        {business.halalStatus === "certified"
                          ? "This business holds a valid MUIS halal certificate."
                          : "This business's halal certification is currently under review."}
                      </p>
                      <Link to="/halal-checker" className="mt-1.5 inline-flex items-center gap-1 text-body-sm font-medium text-primary-600 hover:text-primary-700">
                        <ExternalLink className="h-3.5 w-3.5" />
                        Verify certificate
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardContent>
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-display text-h3 font-bold text-neutral-900">
                      Reviews <span className="text-body font-normal text-neutral-400">({reviews.length})</span>
                    </h2>
                    <div className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-neutral-800">{business.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-neutral-100 pb-5 last:border-0 last:pb-0">
                        <div className="mb-2 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-body-sm text-neutral-900">{review.userName}</p>
                            <p className="text-caption text-neutral-400">{review.createdAt}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-3.5 w-3.5" fill={i < review.rating ? "#fbbf24" : "none"} stroke={i < review.rating ? "#fbbf24" : "#d1d5db"} />
                            ))}
                          </div>
                        </div>
                        <p className="text-body-sm text-neutral-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Leave a review */}
              <Card>
                <CardContent>
                  <h2 className="mb-4 font-display text-h3 font-bold text-neutral-900">
                    <MessageSquare className="mr-2 inline h-5 w-5 text-primary-500" />
                    Leave a Review
                  </h2>
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Your Rating</label>
                      <StarInput value={reviewRating} onChange={setReviewRating} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">Comment</label>
                      <textarea
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        rows={4}
                        placeholder="Share your experience with this business…"
                        className="w-full rounded-xl border border-neutral-200 px-4 py-3 text-body-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
                      />
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={submitting}
                      className="w-full sm:w-auto"
                    >
                      {submitting ? "Posting…" : "Post Review"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right: Contact sidebar */}
            <div className="space-y-4">
              {/* Contact card */}
              <Card className="sticky top-4">
                <CardContent>
                  <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">Contact & Info</h3>

                  <div className="space-y-3">
                    {business.address && (
                      <div className="flex items-start gap-3">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                        <p className="text-body-sm text-neutral-700">{business.address}</p>
                      </div>
                    )}
                    {business.hours && (
                      <div className="flex items-start gap-3">
                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                        <p className="text-body-sm text-neutral-700">{business.hours}</p>
                      </div>
                    )}
                    {business.contactPhone && (
                      <div className="flex items-start gap-3">
                        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                        <p className="text-body-sm text-neutral-700">{business.contactPhone}</p>
                      </div>
                    )}
                    {business.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                        <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-body-sm text-primary-600 hover:underline">
                          Visit website
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 space-y-2">
                    {business.contactPhone && (
                      <Button variant="primary" className="w-full" onClick={handleCallClick}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Button>
                    )}
                    {business.website && (
                      <a href={business.website} target="_blank" rel="noopener noreferrer" className="block">
                        <Button variant="outline" className="w-full">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Visit Website
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Map placeholder */}
              <Card>
                <CardContent>
                  <h3 className="mb-3 font-display text-h4 font-semibold text-neutral-900">Location</h3>
                  <div className="flex h-40 items-center justify-center rounded-xl bg-neutral-100 text-body-sm text-neutral-400">
                    <MapPin className="mr-1.5 h-4 w-4" />
                    {DISTRICT_LABELS[business.district]}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BusinessDetail
