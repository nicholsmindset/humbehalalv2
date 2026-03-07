export interface Business {
  id: string
  name: string
  description: string
  category: BusinessCategory
  district: District
  address: string
  photos: string[]
  halalStatus: "certified" | "pending"
  contactPhone?: string
  contactEmail?: string
  website?: string
  hours?: string
  rating: number
  reviewCount: number
  priceRange: 1 | 2 | 3 | 4
  cuisineType?: string
  featured?: boolean
}

export type BusinessCategory =
  | "restaurants"
  | "cafes"
  | "groceries"
  | "services"
  | "catering"
  | "bakeries"
  | "food-stalls"

export type District =
  | "geylang-serai"
  | "kampong-glam"
  | "woodlands"
  | "tampines"
  | "jurong"
  | "bedok"
  | "ang-mo-kio"
  | "clementi"
  | "bukit-merah"

export interface HalalEvent {
  id: string
  title: string
  description: string
  date: string
  endDate?: string
  location: string
  eventType: "in-person" | "virtual"
  externalLink?: string
  category: EventCategory
  image?: string
  organizer: string
}

export type EventCategory =
  | "religious"
  | "community"
  | "food"
  | "business"
  | "charity"
  | "education"

export interface User {
  id: string
  email: string
  name: string
  role: "user" | "business-owner" | "admin"
  avatar?: string
  phone?: string
  location?: string
  bio?: string
  joinedDate?: string
}

export interface Review {
  id: string
  businessId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
  reply?: string
}

export interface Campaign {
  id: string
  businessId: string
  type: "featured" | "spotlight" | "campaign-boost" | "social"
  status: "active" | "paused" | "ended" | "draft"
  startDate: string
  endDate: string
  budget: number
  spent: number
  views: number
  clicks: number
}

export const DISTRICT_LABELS: Record<District, string> = {
  "geylang-serai": "Geylang Serai",
  "kampong-glam": "Kampong Glam",
  woodlands: "Woodlands",
  tampines: "Tampines",
  jurong: "Jurong",
  bedok: "Bedok",
  "ang-mo-kio": "Ang Mo Kio",
  clementi: "Clementi",
  "bukit-merah": "Bukit Merah",
}

export const CATEGORY_LABELS: Record<BusinessCategory, string> = {
  restaurants: "Restaurants",
  cafes: "Cafes",
  groceries: "Groceries",
  services: "Services",
  catering: "Catering",
  bakeries: "Bakeries",
  "food-stalls": "Food Stalls",
}

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  religious: "Religious",
  community: "Community",
  food: "Food",
  business: "Business",
  charity: "Charity",
  education: "Education",
}
