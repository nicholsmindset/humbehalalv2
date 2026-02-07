import { Mail, MapPin, Phone } from "lucide-react"
import { Button, Input } from "@/components/ui"

function Contact() {
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
                Reach out to us through any of these channels or fill out the
                contact form.
              </p>
              <div className="mt-8 flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Email</p>
                    <p className="text-body-sm text-neutral-500">hello@humblehalal.sg</p>
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
              <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                    Name
                  </label>
                  <Input placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                    Email
                  </label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                    Subject
                  </label>
                  <Input placeholder="How can we help?" />
                </div>
                <div>
                  <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us more..."
                    className="flex w-full rounded-lg border border-neutral-300 bg-white px-4 py-2 text-body-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-colors resize-none"
                  />
                </div>
                <Button variant="primary" size="lg" className="mt-2 w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
