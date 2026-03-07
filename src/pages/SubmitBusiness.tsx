import { useState } from "react"
import { CheckCircle, ShieldCheck, MapPin, Phone, Mail, Globe } from "lucide-react"
import { Button, Input, Badge } from "@/components/ui"
import { GeometricPattern } from "@/components/decorative"

type FormState = "idle" | "submitting" | "success"

const businessCategories = [
  "Restaurants",
  "Cafes",
  "Groceries",
  "Services",
  "Catering",
  "Bakeries",
  "Food Stalls",
]

const districts = [
  "Geylang Serai",
  "Kampong Glam",
  "Woodlands",
  "Tampines",
  "Jurong",
  "Bedok",
  "Ang Mo Kio",
  "Clementi",
  "Bukit Merah",
]

function SubmitBusiness() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    district: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    description: "",
    halalCertNumber: "",
    ownerName: "",
    ownerEmail: "",
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState("submitting")
    // Simulate async submission
    setTimeout(() => setFormState("success"), 1200)
  }

  if (formState === "success") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto max-w-md px-6 py-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
              <CheckCircle className="h-10 w-10 text-primary-600" />
            </div>
          </div>
          <h2 className="font-display text-h2 font-bold text-neutral-900">
            Submission Received!
          </h2>
          <p className="mt-3 text-body text-neutral-500">
            Thank you for submitting <strong>{form.businessName}</strong>. Our team will review
            your listing and verify the halal certification within 3–5 business days. You'll
            receive a confirmation at{" "}
            <span className="font-medium text-primary-700">{form.ownerEmail}</span>.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="mt-6"
            onClick={() => {
              setFormState("idle")
              setForm({
                businessName: "", category: "", district: "", address: "",
                phone: "", email: "", website: "", description: "",
                halalCertNumber: "", ownerName: "", ownerEmail: "",
              })
            }}
          >
            Submit Another Business
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-hero py-16 text-white">
        <GeometricPattern variant="hero" />
        <div className="container-page relative z-10 text-center">
          <Badge variant="accent" size="lg" className="mb-4">
            Free Listing
          </Badge>
          <h1 className="text-h1 font-bold text-white">List Your Halal Business</h1>
          <p className="mx-auto mt-3 max-w-xl text-body-lg text-primary-200">
            Reach Singapore's Muslim community. Listing is free — we only ask for valid halal
            certification to ensure trust and quality.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {[
              { icon: ShieldCheck, text: "Verified halal listings" },
              { icon: MapPin, text: "Reach your local community" },
              { icon: CheckCircle, text: "Free to list" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-body-sm text-primary-100">
                <Icon className="h-4 w-4" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form ── */}
      <section className="section-padding-sm">
        <div className="container-page">
          <div className="mx-auto max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Business Details */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 font-display text-h3 font-semibold text-neutral-900">
                  Business Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Business Name <span className="text-error-500">*</span>
                    </label>
                    <Input
                      name="businessName"
                      value={form.businessName}
                      onChange={handleChange}
                      placeholder="e.g. Warung Nasi Padang"
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                        Category <span className="text-error-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="flex h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-body text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      >
                        <option value="">Select category</option>
                        {businessCategories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                        District <span className="text-error-500">*</span>
                      </label>
                      <select
                        name="district"
                        value={form.district}
                        onChange={handleChange}
                        required
                        className="flex h-11 w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-body text-neutral-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      >
                        <option value="">Select district</option>
                        {districts.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Full Address <span className="text-error-500">*</span>
                    </label>
                    <Input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="e.g. 123 Arab Street, #01-01, Singapore 199734"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Business Description <span className="text-error-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder="Tell customers what makes your business special..."
                      className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2.5 text-body text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 font-display text-h3 font-semibold text-neutral-900">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                        Phone Number
                      </label>
                      <Input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+65 9XXX XXXX"
                        icon={<Phone className="h-4 w-4" />}
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                        Business Email
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="business@example.com"
                        icon={<Mail className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Website (optional)
                    </label>
                    <Input
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="https://yourbusiness.com"
                      icon={<Globe className="h-4 w-4" />}
                    />
                  </div>
                </div>
              </div>

              {/* Halal Certification */}
              <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary-600" />
                  <h2 className="font-display text-h3 font-semibold text-neutral-900">
                    Halal Certification
                  </h2>
                </div>
                <p className="mb-4 text-body-sm text-neutral-600">
                  We require a valid MUIS (Majlis Ugama Islam Singapura) halal certificate or
                  equivalent. Listings without valid certification will be marked as "Pending
                  Verification."
                </p>
                <div>
                  <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                    MUIS Certificate Number (if available)
                  </label>
                  <Input
                    name="halalCertNumber"
                    value={form.halalCertNumber}
                    onChange={handleChange}
                    placeholder="e.g. MUIS-2025-XXXXX"
                    icon={<ShieldCheck className="h-4 w-4" />}
                  />
                </div>
              </div>

              {/* Owner Details */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 font-display text-h3 font-semibold text-neutral-900">
                  Your Details
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Your Name <span className="text-error-500">*</span>
                    </label>
                    <Input
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Your Email <span className="text-error-500">*</span>
                    </label>
                    <Input
                      name="ownerEmail"
                      type="email"
                      value={form.ownerEmail}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      icon={<Mail className="h-4 w-4" />}
                    />
                  </div>
                </div>
                <p className="mt-3 text-caption text-neutral-400">
                  We'll send your listing confirmation and any updates to this email.
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="xl"
                className="w-full"
                disabled={formState === "submitting"}
              >
                {formState === "submitting" ? "Submitting..." : "Submit Business Listing"}
              </Button>
              <p className="text-center text-caption text-neutral-400">
                By submitting, you agree to our{" "}
                <a href="/terms" className="text-primary-600 hover:underline">Terms of Service</a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SubmitBusiness
