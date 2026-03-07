import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import Home from "@/pages/Home"
import Directory from "@/pages/Directory"
import Events from "@/pages/Events"
import Classifieds from "@/pages/Classifieds"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import SubmitBusiness from "@/pages/SubmitBusiness"
import Privacy from "@/pages/Privacy"
import Terms from "@/pages/Terms"
import BusinessDashboard from "@/pages/dashboard/BusinessDashboard"
import Analytics from "@/pages/dashboard/Analytics"
import ManageListing from "@/pages/dashboard/ManageListing"
import Campaigns from "@/pages/dashboard/Campaigns"
import UserProfile from "@/pages/dashboard/UserProfile"
import AdminPanel from "@/pages/dashboard/AdminPanel"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public site */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/events" element={<Events />} />
          <Route path="/classifieds" element={<Classifieds />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/submit-business" element={<SubmitBusiness />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>

        {/* Dashboard — own sidebar layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<BusinessDashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="listing" element={<ManageListing />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="admin" element={<AdminPanel />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
