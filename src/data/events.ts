import type { HalalEvent } from "@/types"

export const EVENTS: HalalEvent[] = [
  {
    id: "1",
    title: "Ramadan Bazaar 2026",
    description:
      "Singapore's largest annual Ramadan bazaar featuring 200+ stalls of food, fashion, and crafts. Celebrate the holy month with the community. This year features a dedicated kids' zone, live nasheeds every evening, and a nightly Iftar tent with capacity for 500 diners. Free entry — all are welcome.",
    date: "2026-03-01",
    endDate: "2026-03-29",
    location: "Geylang Serai, Singapore",
    eventType: "in-person",
    category: "food",
    organizer: "Majlis Ugama Islam Singapura (MUIS)",
    externalLink: "https://example.com/ramadan-bazaar",
  },
  {
    id: "2",
    title: "Islamic Finance & Investment Webinar",
    description:
      "Learn about Shariah-compliant investment instruments, sukuk bonds, and halal mutual funds from certified Islamic finance experts. This 3-hour session covers: introduction to Islamic finance principles, available halal investment products in Singapore, how to screen stocks for Shariah compliance, and Q&A with industry practitioners.",
    date: "2026-03-15",
    location: "Online (Zoom)",
    eventType: "virtual",
    category: "business",
    organizer: "Singapore Islamic Finance Association",
    externalLink: "https://example.com/islamic-finance-webinar",
  },
  {
    id: "3",
    title: "Community Iftar Gathering",
    description:
      "Join the Muslim community for a large-scale iftar dinner. Free meal provided. Open to all — bring your family and neighbours. The event will feature doa recitation, short tazkirah, and a buffet dinner prepared by local halal caterers. Seats are limited to 800 pax, first-come first-served.",
    date: "2026-03-08",
    location: "Kampong Glam Community Club, 180 Arab Street",
    eventType: "in-person",
    category: "community",
    organizer: "Kampong Glam Community Club",
  },
  {
    id: "4",
    title: "Quran Recitation Competition 2026",
    description:
      "Annual Quran recitation (Tilawah) competition open to all age groups. Prizes for top 3 in each category. Four age categories: 7–12, 13–17, 18–35, and 36 and above. Registration closes 28 February. Both male and female participants welcome.",
    date: "2026-03-22",
    location: "Masjid Sultan, Arab Street",
    eventType: "in-person",
    category: "religious",
    organizer: "Masjid Sultan",
  },
  {
    id: "5",
    title: "Halal Food Festival Singapore",
    description:
      "A 3-day culinary celebration showcasing the best of Singapore's halal food scene, with live cooking demonstrations and tastings. 80+ food vendors, celebrity chef appearances, cooking masterclasses, and the Halal Restaurant Awards 2026 ceremony on the final evening.",
    date: "2026-04-05",
    endDate: "2026-04-07",
    location: "Suntec City Convention Centre",
    eventType: "in-person",
    category: "food",
    organizer: "HalalFest SG",
    externalLink: "https://example.com/halal-food-festival",
  },
  {
    id: "6",
    title: "Muslim Entrepreneur Bootcamp",
    description:
      "2-day intensive programme for aspiring Muslim entrepreneurs. Covers business planning, Islamic business ethics, halal certification process, digital marketing for Muslim businesses, and access to Muslim-focused funding. Lunch and networking included.",
    date: "2026-04-11",
    endDate: "2026-04-12",
    location: "JTC LaunchPad, one-north",
    eventType: "in-person",
    category: "business",
    organizer: "Muslim Business Network SG",
  },
  {
    id: "7",
    title: "Charity Run for Palestine",
    description:
      "5km fun run to raise funds for humanitarian aid. All proceeds go directly to certified relief organisations on the ground. Categories: competitive (timed), fun run (untimed), and family walk. Medal finishers, t-shirt included in registration fee.",
    date: "2026-04-18",
    location: "East Coast Park, Car Park F",
    eventType: "in-person",
    category: "charity",
    organizer: "Mercy Relief",
    externalLink: "https://example.com/charity-run",
  },
  {
    id: "8",
    title: "Islamic History & Heritage Walk",
    description:
      "Guided 2-hour walking tour of Kampong Glam's rich Islamic history — mosques, traditional shophouses, and cultural landmarks. Led by accredited NHB guides. Learn about the history of the Malay-Muslim community in Singapore from the 1800s to the present day.",
    date: "2026-04-25",
    location: "Meet at Masjid Sultan, Arab Street",
    eventType: "in-person",
    category: "education",
    organizer: "National Heritage Board",
  },
  {
    id: "9",
    title: "Youth Islamic Knowledge Quiz",
    description:
      "Online quiz competition for secondary and JC students on Islamic history, jurisprudence, and Quran. 3 rounds: multiple choice, short answer, and final buzzer round for top 10 finalists. Prizes worth $2,000. Open to Singapore residents aged 13–19.",
    date: "2026-05-02",
    location: "Online",
    eventType: "virtual",
    category: "education",
    organizer: "Islamic Religious Council of Singapore",
    externalLink: "https://example.com/youth-quiz",
  },
  {
    id: "10",
    title: "Halal Cooking Masterclass",
    description:
      "Hands-on cooking workshop with Chef Ismail learning to prepare traditional Malay wedding dishes and festive kueh. Class size limited to 20. All ingredients and equipment provided. Participants take home what they cook. Suitable for beginner to intermediate home cooks.",
    date: "2026-05-09",
    location: "SATS Catering, Airport Road",
    eventType: "in-person",
    category: "food",
    organizer: "Halal Culinary Institute",
  },
  {
    id: "11",
    title: "Eid Al-Fitr Celebration 2026",
    description:
      "Join thousands as we celebrate Eid with prayer, cultural performances, food, and a fireworks display along the Singapore River. Eid prayer begins at 7:30am at the Padang. Cultural shows run throughout the day with traditional music, dance, and storytelling for children.",
    date: "2026-04-30",
    location: "Padang, City Hall Area",
    eventType: "in-person",
    category: "religious",
    organizer: "Islamic Religious Council of Singapore",
  },
  {
    id: "12",
    title: "Zakat & Waqf Forum",
    description:
      "Annual forum bringing together scholars, practitioners, and policymakers to discuss the role of Islamic philanthropy in Singapore. Keynote by senior MUIS scholars, panel discussions, and an exhibition on waqf properties across Singapore.",
    date: "2026-05-16",
    location: "Suntec City Convention Centre",
    eventType: "in-person",
    category: "community",
    organizer: "MUIS",
  },
]

export function getEventById(id: string): HalalEvent | undefined {
  return EVENTS.find((e) => e.id === id)
}
