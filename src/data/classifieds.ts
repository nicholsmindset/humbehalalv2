export type ClassifiedCategory =
  | "buy-sell"
  | "services"
  | "jobs"
  | "property"
  | "vehicles"
  | "education"
  | "community"

export interface Classified {
  id: string
  title: string
  description: string
  category: ClassifiedCategory
  price?: string
  location: string
  contactPhone?: string
  contactEmail?: string
  postedDate: string
  condition?: "new" | "like-new" | "good" | "fair"
  featured?: boolean
}

export const CLASSIFIED_CATEGORY_LABELS: Record<ClassifiedCategory, string> = {
  "buy-sell": "Buy & Sell",
  services: "Services",
  jobs: "Jobs",
  property: "Property",
  vehicles: "Vehicles",
  education: "Education",
  community: "Community",
}

export const CLASSIFIEDS: Classified[] = [
  {
    id: "1",
    title: "Islamic Books Collection – 50+ Titles",
    description:
      "Large collection of Islamic books including tafsir, hadith collections, fiqh, and Islamic history. Most are in excellent condition. Selling as a bundle or individually. Books include titles by Ibn Kathir, Imam Nawawi, and more.",
    category: "buy-sell",
    price: "$150 for bundle / From $3 each",
    location: "Tampines, Singapore",
    contactPhone: "+65 9123 4567",
    postedDate: "2026-03-05",
    condition: "good",
    featured: true,
  },
  {
    id: "2",
    title: "Halal Home Catering – Malay & Indian Cuisines",
    description:
      "Home-based halal catering service for kenduri, birthdays, and corporate lunches. Specialities: Nasi Minyak, Briyani, Rendang, and traditional Malay desserts. Minimum order 20 pax. MUIS-certified kitchen.",
    category: "services",
    price: "From $15/pax",
    location: "Woodlands, Singapore",
    contactPhone: "+65 9234 5678",
    postedDate: "2026-03-04",
    featured: true,
  },
  {
    id: "3",
    title: "Part-time Quran Teacher Wanted",
    description:
      "Looking for a qualified Quran teacher (Ijazah preferred) to teach 2 children (ages 8 and 11) twice a week. Lessons at our Bedok home. $40–$60/hour depending on experience.",
    category: "jobs",
    price: "$40–$60/hour",
    location: "Bedok, Singapore",
    contactEmail: "quranteacher2026@email.com",
    postedDate: "2026-03-03",
  },
  {
    id: "4",
    title: "3-Room HDB For Rent – Muslim-Friendly",
    description:
      "Well-maintained 3-room HDB flat available for rent. Open to Muslim family or couple. No pets. Close to Masjid and halal eateries. 5 min walk to MRT. Available from 1 April 2026.",
    category: "property",
    price: "$2,200/month",
    location: "Ang Mo Kio, Singapore",
    contactPhone: "+65 9345 6789",
    postedDate: "2026-03-02",
    featured: true,
  },
  {
    id: "5",
    title: "Toyota Vios 2021 – Excellent Condition",
    description:
      "Selling my Toyota Vios 1.5G 2021. Well-maintained, single owner, full service history. Comes with dashcam and tinted windows. Reason for selling: upgrading to MPV.",
    category: "vehicles",
    price: "$62,000 negotiable",
    location: "Jurong, Singapore",
    contactPhone: "+65 9456 7890",
    postedDate: "2026-03-01",
    condition: "like-new",
  },
  {
    id: "6",
    title: "Private Malay Language Tuition (PSLE & O-Level)",
    description:
      "Experienced MOE-trained teacher offering private Malay language tuition for PSLE and O-Level students. 10+ years experience. Small group (max 4) or 1-to-1 available. High track record of A/A* results.",
    category: "education",
    price: "$50–$80/hour",
    location: "Geylang Serai, Singapore",
    contactPhone: "+65 9567 8901",
    postedDate: "2026-02-28",
  },
  {
    id: "7",
    title: "Volunteer Drivers Needed – Ramadan Meal Delivery",
    description:
      "Seeking volunteer drivers to deliver iftar meals to elderly and low-income Muslim families during Ramadan. Slots available daily from 4pm–8pm. Fuel reimbursement provided.",
    category: "community",
    location: "Multiple areas, Singapore",
    contactEmail: "volunteer@ramadandelivery.sg",
    postedDate: "2026-02-27",
    featured: true,
  },
  {
    id: "8",
    title: "Baby Items Bundle – Stroller, Cot & Accessories",
    description:
      "Baby bundle for sale: Stokke stroller (good condition), IKEA baby cot with mattress, baby carrier, playmat, and assorted baby clothes 0–12 months. Halal-certified products where applicable.",
    category: "buy-sell",
    price: "$300 for bundle",
    location: "Clementi, Singapore",
    contactPhone: "+65 9678 9012",
    postedDate: "2026-02-26",
    condition: "good",
  },
  {
    id: "9",
    title: "Halal Food Stall Operator Wanted",
    description:
      "Canteen operator looking for a halal food stall operator for a school canteen in Woodlands. Halal certification required. Low startup cost. Interested parties please call for details.",
    category: "jobs",
    price: "Negotiable",
    location: "Woodlands, Singapore",
    contactPhone: "+65 9789 0123",
    postedDate: "2026-02-25",
  },
  {
    id: "10",
    title: "Photography Services – Weddings & Akad Nikah",
    description:
      "Professional Muslim photographer specialising in Malay weddings, akad nikah, and family portraits. Packages from $800. Full-day coverage with edited digital gallery within 4 weeks.",
    category: "services",
    price: "From $800/event",
    location: "Island-wide, Singapore",
    contactPhone: "+65 9890 1234",
    contactEmail: "photos@muslimweddingsg.com",
    postedDate: "2026-02-24",
    featured: true,
  },
  {
    id: "11",
    title: "Prayer Mat & Telekung Set – New",
    description:
      "Brand new prayer mat and telekung set, brought from Mecca. High quality, beautiful design. Selling at cost price as bought extras. Limited to 5 sets.",
    category: "buy-sell",
    price: "$45/set",
    location: "Kampong Glam, Singapore",
    contactPhone: "+65 9901 2345",
    postedDate: "2026-02-23",
    condition: "new",
  },
  {
    id: "12",
    title: "Fundraising – New Masjid Building Fund",
    description:
      "Our community is fundraising for the construction of a new masjid in Jurong West. Every donation counts. All donations are tax-deductible. Bank transfer details and more info available upon request.",
    category: "community",
    location: "Jurong, Singapore",
    contactEmail: "masjid@jurong-west-mosque.sg",
    postedDate: "2026-02-22",
  },
]

export function getClassifiedById(id: string): Classified | undefined {
  return CLASSIFIEDS.find((c) => c.id === id)
}
