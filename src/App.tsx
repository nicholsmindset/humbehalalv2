import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout"
import Home from "@/pages/Home"
import Directory from "@/pages/Directory"
import Events from "@/pages/Events"
import Classifieds from "@/pages/Classifieds"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import SubmitBusiness from "@/pages/SubmitBusiness"
import Privacy from "@/pages/Privacy"
import Terms from "@/pages/Terms"

function App() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  )
}

export default App
