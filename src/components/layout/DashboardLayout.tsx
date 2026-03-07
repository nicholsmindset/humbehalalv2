import { useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  BarChart3,
  Store,
  Megaphone,
  User,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Bell,
  Menu,
} from "lucide-react"
import { Badge } from "@/components/ui"

type UserRole = "business-owner" | "user" | "admin"

interface MockUser {
  name: string
  email: string
  role: UserRole
  avatar: string
}

// Mock current user — in production this comes from auth context
const MOCK_USER: MockUser = {
  name: "Ahmad Fauzi",
  email: "ahmad@warngnaspadang.sg",
  role: "business-owner",
  avatar: "AF",
}

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number
  roles: UserRole[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["business-owner", "user", "admin"],
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    roles: ["business-owner", "admin"],
  },
  {
    label: "My Listing",
    href: "/dashboard/listing",
    icon: Store,
    roles: ["business-owner"],
  },
  {
    label: "Campaigns",
    href: "/dashboard/campaigns",
    icon: Megaphone,
    roles: ["business-owner", "admin"],
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    icon: User,
    roles: ["business-owner", "user", "admin"],
  },
  {
    label: "Admin Panel",
    href: "/dashboard/admin",
    icon: ShieldCheck,
    badge: 23,
    roles: ["admin"],
  },
]

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const user = MOCK_USER
  const visibleNav = NAV_ITEMS.filter((item) => item.roles.includes(user.role))

  const roleLabel: Record<UserRole, string> = {
    "business-owner": "Business Owner",
    user: "Member",
    admin: "Admin",
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5L10 1Z"
              fill="white"
            />
          </svg>
        </div>
        <span className="font-display text-base font-bold text-white">
          Humble<span className="text-primary-400">Halal</span>
        </span>
      </div>

      {/* User card */}
      <div className="border-b border-neutral-800 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
            {user.avatar}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user.name}</p>
            <p className="truncate text-xs text-neutral-400">{user.email}</p>
          </div>
        </div>
        <div className="mt-2">
          <Badge variant="primary" size="sm">{roleLabel[user.role]}</Badge>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {visibleNav.map((item) => (
            <li key={item.href}>
              <NavLink
                to={item.href}
                end={item.href === "/dashboard"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary-700 text-white"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-4.5 w-4.5 shrink-0" />
                  {item.label}
                </div>
                <div className="flex items-center gap-2">
                  {item.badge !== undefined && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-neutral-800 px-3 py-4 space-y-1">
        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
        >
          <Store className="h-4.5 w-4.5 shrink-0" />
          View Live Listing
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-red-400"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-neutral-100">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 overflow-hidden bg-neutral-900 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-neutral-900 shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-neutral-200 bg-white px-4 shadow-sm">
          <button
            className="rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden text-sm text-neutral-400 lg:block">
            Dashboard — HumbleHalal Business Portal
          </div>
          <div className="flex items-center gap-3">
            <button className="relative rounded-lg p-1.5 text-neutral-500 hover:bg-neutral-100">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
              {user.avatar}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export { DashboardLayout }
