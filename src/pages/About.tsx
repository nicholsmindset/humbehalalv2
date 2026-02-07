import { ShieldCheck, Heart, Users } from "lucide-react"
import { GeometricPattern, SectionDivider } from "@/components/decorative"

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Transparency",
    description:
      "We verify every halal certification to ensure our community can dine and shop with confidence.",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "Built by the community, for the community. We celebrate Singapore's rich Muslim heritage and culture.",
  },
  {
    icon: Users,
    title: "Inclusive Platform",
    description:
      "Whether you're a local resident or a visitor, everyone is welcome to explore and discover.",
  },
]

function About() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-hero py-16 text-white">
        <GeometricPattern variant="hero" />
        <div className="container-page relative z-10 text-center">
          <h1 className="text-display font-bold text-white">About HumbleHalal</h1>
          <p className="mx-auto mt-4 max-w-2xl text-body-lg text-primary-200">
            Connecting Singapore&apos;s Muslim community with trusted
            halal-certified businesses, events, and services since 2024.
          </p>
        </div>
      </section>

      <SectionDivider className="my-8" />

      <section className="section-padding-sm">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <h2>Our Mission</h2>
            <p className="mt-4 text-body-lg text-neutral-600">
              HumbleHalal is Singapore&apos;s premier platform for discovering
              halal-certified businesses and community events. We bridge the gap
              between halal businesses and the community they serve, making it
              easy for everyone to find trusted halal options across the island.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding-sm bg-neutral-50">
        <div className="container-page">
          <h2 className="mb-8 text-center">Our Values</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-h4 font-semibold">{value.title}</h3>
                <p className="mt-2 text-body text-neutral-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
