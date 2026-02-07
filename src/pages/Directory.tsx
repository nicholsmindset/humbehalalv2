import { SearchBar, Badge } from "@/components/ui"
import { SectionDivider } from "@/components/decorative"

const categories = [
  "All",
  "Restaurants",
  "Cafes",
  "Groceries",
  "Services",
  "Catering",
  "Bakeries",
  "Food Stalls",
]

function Directory() {
  return (
    <div>
      <section className="bg-white py-8">
        <div className="container-page">
          <h1>Halal Business Directory</h1>
          <p className="mt-2 text-body-lg text-neutral-500">
            Discover halal-certified businesses across Singapore
          </p>
          <div className="mt-6">
            <SearchBar placeholder="Search businesses by name, cuisine, or location..." />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={cat === "All" ? "primary" : "default"}
                size="lg"
                className="cursor-pointer transition-colors hover:bg-primary-100 hover:text-primary-700"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="section-padding-sm">
        <div className="container-page">
          <p className="text-center text-body text-neutral-500">
            Business listings will appear here. Connect to a backend to load real data.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Directory
