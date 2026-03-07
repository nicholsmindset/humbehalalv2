import { useState } from "react"
import { Clock, MapPin, Bell, Moon, Sun } from "lucide-react"
import { Badge, Card, CardContent } from "@/components/ui"
import { GeometricPattern, SectionDivider } from "@/components/decorative"

// Singapore prayer times for March 2026 (approximate, based on MUIS timetable)
// Format: [Subuh, Syuruk, Zohor, Asar, Maghrib, Isyak]
const PRAYER_DATA: Record<number, string[]> = {
  1:  ["05:43", "07:01", "13:09", "16:24", "19:15", "20:26"],
  2:  ["05:43", "07:01", "13:09", "16:23", "19:14", "20:26"],
  3:  ["05:42", "07:00", "13:08", "16:23", "19:14", "20:25"],
  4:  ["05:42", "07:00", "13:08", "16:22", "19:13", "20:25"],
  5:  ["05:42", "07:00", "13:08", "16:22", "19:13", "20:24"],
  6:  ["05:41", "06:59", "13:07", "16:22", "19:13", "20:24"],
  7:  ["05:41", "06:59", "13:07", "16:21", "19:12", "20:23"],
  8:  ["05:40", "06:58", "13:07", "16:21", "19:12", "20:23"],
  9:  ["05:40", "06:58", "13:06", "16:20", "19:11", "20:22"],
  10: ["05:39", "06:57", "13:06", "16:20", "19:11", "20:22"],
  11: ["05:39", "06:57", "13:06", "16:19", "19:10", "20:21"],
  12: ["05:38", "06:56", "13:05", "16:19", "19:10", "20:21"],
  13: ["05:38", "06:56", "13:05", "16:18", "19:09", "20:20"],
  14: ["05:37", "06:55", "13:05", "16:18", "19:09", "20:20"],
  15: ["05:37", "06:55", "13:04", "16:17", "19:08", "20:19"],
  16: ["05:36", "06:54", "13:04", "16:17", "19:08", "20:19"],
  17: ["05:36", "06:54", "13:03", "16:16", "19:07", "20:18"],
  18: ["05:35", "06:53", "13:03", "16:16", "19:07", "20:18"],
  19: ["05:35", "06:53", "13:03", "16:15", "19:06", "20:17"],
  20: ["05:34", "06:52", "13:02", "16:15", "19:06", "20:17"],
  21: ["05:34", "06:52", "13:02", "16:14", "19:05", "20:16"],
  22: ["05:33", "06:51", "13:01", "16:14", "19:05", "20:16"],
  23: ["05:33", "06:51", "13:01", "16:13", "19:04", "20:15"],
  24: ["05:32", "06:50", "13:01", "16:13", "19:04", "20:15"],
  25: ["05:32", "06:50", "13:00", "16:12", "19:03", "20:14"],
  26: ["05:31", "06:49", "13:00", "16:12", "19:03", "20:14"],
  27: ["05:31", "06:49", "12:59", "16:11", "19:02", "20:13"],
  28: ["05:30", "06:48", "12:59", "16:11", "19:01", "20:13"],
  29: ["05:30", "06:48", "12:59", "16:10", "19:01", "20:12"],
  30: ["05:29", "06:47", "12:58", "16:10", "19:00", "20:12"],
  31: ["05:29", "06:47", "12:58", "16:09", "19:00", "20:11"],
}

const PRAYERS = [
  { name: "Subuh", arabic: "الصبح", icon: Moon, description: "Dawn prayer before sunrise", idx: 0 },
  { name: "Syuruk", arabic: "الشروق", icon: Sun, description: "Sunrise — no congregational prayer", idx: 1, isInfo: true },
  { name: "Zohor", arabic: "الظهر", icon: Sun, description: "Midday prayer", idx: 2 },
  { name: "Asar", arabic: "العصر", icon: Sun, description: "Afternoon prayer", idx: 3 },
  { name: "Maghrib", arabic: "المغرب", icon: Moon, description: "Sunset prayer", idx: 4 },
  { name: "Isyak", arabic: "العشاء", icon: Moon, description: "Night prayer", idx: 5 },
]

function toMinutes(t: string) {
  const [h, m] = t.split(":").map(Number)
  return h * 60 + m
}

function getCurrentPrayer(times: string[], nowMinutes: number): number {
  // Return index of current/next prayer
  for (let i = times.length - 1; i >= 0; i--) {
    if (nowMinutes >= toMinutes(times[i])) return i
  }
  return 5 // After Isyak — wraps to Subuh tomorrow
}

function getNextPrayer(times: string[], nowMinutes: number): { name: string; time: string; inMinutes: number } {
  for (let i = 0; i < times.length; i++) {
    const pMin = toMinutes(times[i])
    if (pMin > nowMinutes) {
      return {
        name: PRAYERS[i].name,
        time: times[i],
        inMinutes: pMin - nowMinutes,
      }
    }
  }
  // After Isyak — next is Subuh
  const subuhTomorrow = toMinutes(times[0]) + 24 * 60
  return {
    name: "Subuh (tomorrow)",
    time: times[0],
    inMinutes: subuhTomorrow - nowMinutes,
  }
}

function formatCountdown(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) return `${h}h ${m}m`
  return `${m}m`
}

function PrayerTimes() {
  const today = new Date()
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [selectedMonth] = useState("March 2026")

  const todayTimes = PRAYER_DATA[today.getDate()] ?? PRAYER_DATA[1]
  const displayTimes = PRAYER_DATA[selectedDay] ?? PRAYER_DATA[1]

  // Current time in Singapore (SGT = UTC+8)
  const nowSGT = new Date(today.getTime() + 8 * 60 * 60 * 1000)
  const nowMinutes = nowSGT.getUTCHours() * 60 + nowSGT.getUTCMinutes()
  const currentPrayerIdx = getCurrentPrayer(todayTimes, nowMinutes)
  const nextPrayer = getNextPrayer(todayTimes, nowMinutes)

  const isToday = selectedDay === today.getDate()
  const daysInMonth = 31

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-14 text-white">
        <GeometricPattern variant="hero" />
        <div className="container-page relative z-10 text-center">
          <Badge variant="accent" size="lg" className="mb-4">
            <MapPin className="mr-1.5 h-4 w-4" />
            Singapore
          </Badge>
          <h1 className="font-display text-h1 font-bold text-white">Prayer Times</h1>
          <p className="mt-2 text-body-lg text-primary-200">
            {selectedMonth} · Based on MUIS official timetable
          </p>

          {/* Live countdown */}
          <div className="mx-auto mt-8 max-w-sm rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-body-sm text-primary-200">Next prayer</p>
            <p className="mt-1 font-display text-h2 font-bold text-white">{nextPrayer.name}</p>
            <p className="text-body-sm text-primary-200">at {nextPrayer.time}</p>
            <div className="mt-3 flex items-center justify-center gap-2 text-accent-300">
              <Clock className="h-4 w-4" />
              <span className="font-semibold">in {formatCountdown(nextPrayer.inMinutes)}</span>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="section-padding-sm">
        <div className="container-page">
          <div className="mx-auto max-w-3xl space-y-6">

            {/* Day picker */}
            <Card>
              <CardContent>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-display text-h4 font-semibold text-neutral-900">{selectedMonth}</h3>
                  {!isToday && (
                    <button
                      onClick={() => setSelectedDay(today.getDate())}
                      className="text-body-sm font-medium text-primary-600 hover:underline"
                    >
                      Back to today
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <div key={d} className="py-1 text-center text-caption font-semibold uppercase text-neutral-400">
                      {d}
                    </div>
                  ))}
                  {/* March 2026 starts on Sunday */}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                    const isSelected = day === selectedDay
                    const isTodayDay = day === today.getDate()
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`aspect-square rounded-xl text-body-sm font-medium transition-all ${
                          isSelected
                            ? "bg-primary-600 text-white shadow-md"
                            : isTodayDay
                            ? "border-2 border-primary-400 text-primary-700"
                            : "text-neutral-600 hover:bg-neutral-100"
                        }`}
                      >
                        {day}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Prayer times table */}
            <Card>
              <CardContent>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-h4 font-semibold text-neutral-900">
                      {isToday ? "Today's Prayer Times" : `Prayer Times — ${selectedDay} March 2026`}
                    </h3>
                    <p className="text-body-sm text-neutral-400">All times in Singapore Standard Time (SGT)</p>
                  </div>
                  <button className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-body-sm text-neutral-600 hover:bg-neutral-50">
                    <Bell className="h-4 w-4" />
                    Set reminders
                  </button>
                </div>

                <div className="divide-y divide-neutral-100">
                  {PRAYERS.map((prayer) => {
                    const time = displayTimes[prayer.idx]
                    const isPast = isToday && toMinutes(time) < nowMinutes && !prayer.isInfo
                    const isCurrent = isToday && prayer.idx === currentPrayerIdx && !prayer.isInfo

                    return (
                      <div
                        key={prayer.name}
                        className={`flex items-center gap-4 py-4 transition-colors ${
                          isCurrent ? "rounded-xl bg-primary-50 px-3" : ""
                        }`}
                      >
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                            isCurrent
                              ? "bg-primary-500 text-white"
                              : prayer.isInfo
                              ? "bg-amber-100 text-amber-600"
                              : isPast
                              ? "bg-neutral-100 text-neutral-400"
                              : "bg-primary-100 text-primary-600"
                          }`}
                        >
                          <prayer.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`font-semibold ${
                                isCurrent ? "text-primary-700" : isPast ? "text-neutral-400" : "text-neutral-800"
                              }`}
                            >
                              {prayer.name}
                            </span>
                            <span className="font-arabic text-body-sm text-neutral-400">{prayer.arabic}</span>
                            {isCurrent && <Badge variant="primary" size="sm">Current</Badge>}
                            {prayer.isInfo && <Badge variant="warning" size="sm">Info only</Badge>}
                          </div>
                          <p className="text-caption text-neutral-400">{prayer.description}</p>
                        </div>
                        <div
                          className={`font-mono text-h4 font-bold tabular-nums ${
                            isCurrent
                              ? "text-primary-700"
                              : isPast
                              ? "text-neutral-300"
                              : "text-neutral-800"
                          }`}
                        >
                          {time}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Monthly at-a-glance */}
            <Card>
              <CardContent>
                <h3 className="mb-4 font-display text-h4 font-semibold text-neutral-900">
                  Monthly Summary — Subuh &amp; Maghrib
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-body-sm">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        {["Date", "Subuh", "Syuruk", "Zohor", "Asar", "Maghrib", "Isyak"].map((h) => (
                          <th key={h} className="pb-2 pr-3 text-left text-caption font-semibold uppercase tracking-wider text-neutral-400">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[1, 5, 10, 15, 20, 25, 31].map((day) => {
                        const times = PRAYER_DATA[day] ?? PRAYER_DATA[1]
                        const isCurrentDay = day === today.getDate()
                        return (
                          <tr
                            key={day}
                            className={`border-b border-neutral-50 ${isCurrentDay ? "bg-primary-50 font-semibold" : ""}`}
                          >
                            <td className="py-2 pr-3 text-neutral-600">{day} Mar</td>
                            {times.map((t, i) => (
                              <td key={i} className="py-2 pr-3 font-mono text-neutral-700">{t}</td>
                            ))}
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  <p className="mt-3 text-caption text-neutral-400">
                    Showing every 5th day. Click a date in the calendar above for exact times.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Qibla & Resources */}
            <div className="grid gap-5 sm:grid-cols-2">
              <Card>
                <CardContent>
                  <h3 className="mb-3 font-display text-h4 font-semibold text-neutral-900">Qibla Direction</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-primary-200 bg-primary-50">
                      <div className="relative h-12 w-12">
                        {/* Compass arrow pointing ~293° (NW) from Singapore to Mecca */}
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ transform: "rotate(293deg)" }}
                        >
                          <div className="h-10 w-1 rounded-full bg-primary-500" style={{ transformOrigin: "center bottom" }} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-3 w-3 rounded-full border-2 border-primary-500 bg-white" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-body-sm font-semibold text-neutral-800">293° North-West</p>
                      <p className="text-body-sm text-neutral-500">From Singapore to Makkah al-Mukarramah</p>
                      <p className="mt-1 text-caption text-neutral-400">Distance: ~6,350 km</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <h3 className="mb-3 font-display text-h4 font-semibold text-neutral-900">Useful Links</h3>
                  <ul className="space-y-2">
                    {[
                      { label: "MUIS Official Prayer Timetable", href: "https://www.muis.gov.sg" },
                      { label: "MUIS Mosque Finder", href: "https://www.muis.gov.sg" },
                      { label: "Halal Certification Check", href: "/halal-checker" },
                      { label: "Community Events", href: "/events" },
                    ].map(({ label, href }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-2 text-body-sm text-primary-600 hover:underline"
                        >
                          <span className="text-primary-400">→</span>
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <p className="text-center text-caption text-neutral-400">
              Prayer times are approximate and based on the MUIS Singapore timetable for March 2026.
              Always verify with the official MUIS timetable for accuracy.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PrayerTimes
