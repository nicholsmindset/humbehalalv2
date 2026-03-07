import { useState } from "react"
import { Mail, MapPin, Phone, CheckCircle } from "lucide-react"
import { Button, Input } from "@/components/ui"

type FormState = "idle" | "submitting" | "success"

function Contact() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState("submitting")
    setTimeout(() => setFormState("success"), 1000)
  }

  return (
    <div className="section-padding-sm">
      <div className="container-page">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h1>Contact Us</h1>
            <p className="mt-2 text-body-lg text-neutral-500">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {/* Contact Info */}
            <div>
              <h2 className="text-h3">Get in Touch</h2>
              <p className="mt-2 text-body text-neutral-500">
                Reach out to us through any of these channels or fill out the contact form.
              </p>
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Email</p>
                    <a
                      href="mailto:hello@humblehalal.sg"
                      className="text-body-sm text-primary-600 hover:underline"
                    >
                      hello@humblehalal.sg
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Phone</p>
                    <p className="text-body-sm text-neutral-500">+65 6123 4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Location</p>
                    <p className="text-body-sm text-neutral-500">Singapore</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-card">
              {formState === "success" ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
                    <CheckCircle className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="font-display text-h3 font-semibold text-neutral-900">
                    Message Sent!
                  </h3>
                  <p className="text-body-sm text-neutral-500">
                    Thanks for reaching out, <strong>{form.name}</strong>. We'll reply to{" "}
                    <strong>{form.email}</strong> within 1–2 business days.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFormState("idle")
                      setForm({ name: "", email: "", subject: "", message: "" })
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder="Tell us more..."
                      className="flex w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-body-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="mt-2 w-full"
                    disabled={formState === "submitting"}
                  >
                    {formState === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
