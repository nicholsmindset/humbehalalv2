import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/context/AuthContext"
import { ToastProvider } from "@/context/ToastContext"
import { Layout } from "@/components/layout"
import { DashboardLayout } from "@/components/layout/DashboardLayout"

// Eagerly loaded — critical path (home + directory are first destinations)
import Home from "@/pages/Home"
import Directory from "@/pages/Directory"

// Lazy loaded — loaded on demand
const BusinessDetail = lazy(() => import("@/pages/BusinessDetail"))
const Events = lazy(() => import("@/pages/Events"))
const EventDetail = lazy(() => import("@/pages/EventDetail"))
const Classifieds = lazy(() => import("@/pages/Classifieds"))
const ClassifiedDetail = lazy(() => import("@/pages/ClassifiedDetail"))
const About = lazy(() => import("@/pages/About"))
const Contact = lazy(() => import("@/pages/Contact"))
const SubmitBusiness = lazy(() => import("@/pages/SubmitBusiness"))
const Privacy = lazy(() => import("@/pages/Privacy"))
const Terms = lazy(() => import("@/pages/Terms"))
const SignIn = lazy(() => import("@/pages/SignIn"))
const SignUp = lazy(() => import("@/pages/SignUp"))
const HalalChecker = lazy(() => import("@/pages/HalalChecker"))
const PrayerTimes = lazy(() => import("@/pages/PrayerTimes"))
const NotFound = lazy(() => import("@/pages/NotFound"))

// Dashboard pages — only loaded when user reaches /dashboard
const BusinessDashboard = lazy(() => import("@/pages/dashboard/BusinessDashboard"))
const Analytics = lazy(() => import("@/pages/dashboard/Analytics"))
const ManageListing = lazy(() => import("@/pages/dashboard/ManageListing"))
const Campaigns = lazy(() => import("@/pages/dashboard/Campaigns"))
const UserProfile = lazy(() => import("@/pages/dashboard/UserProfile"))
const AdminPanel = lazy(() => import("@/pages/dashboard/AdminPanel"))

function PageLoader() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* ── Public site (shared header/footer) ── */}
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/directory/:id" element={<BusinessDetail />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/classifieds" element={<Classifieds />} />
                <Route path="/classifieds/:id" element={<ClassifiedDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/submit-business" element={<SubmitBusiness />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/halal-checker" element={<HalalChecker />} />
                <Route path="/prayer-times" element={<PrayerTimes />} />
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* ── Dashboard — own sidebar layout (auth-gated inside DashboardLayout) ── */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<BusinessDashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="listing" element={<ManageListing />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="profile" element={<UserProfile />} />
                <Route path="admin" element={<AdminPanel />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
