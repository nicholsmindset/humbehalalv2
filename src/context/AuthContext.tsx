import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type UserRole = "user" | "business-owner" | "admin"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  avatar: string
  businessName?: string
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signOut: () => void
}

// ── Mock credentials ──────────────────────────────────────────────────────────
// These simulate different user types so every role can be explored in the UI.
// Replace with real API calls when a backend is connected.
const MOCK_ACCOUNTS: (AuthUser & { password: string })[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@humblehalal.sg",
    password: "admin123",
    role: "admin",
    avatar: "AD",
  },
  {
    id: "owner-1",
    name: "Ahmad Fauzi",
    email: "owner@humblehalal.sg",
    password: "owner123",
    role: "business-owner",
    avatar: "AF",
    businessName: "Warung Nasi Padang",
  },
  {
    id: "user-1",
    name: "Nurul Ain",
    email: "user@humblehalal.sg",
    password: "user123",
    role: "user",
    avatar: "NA",
  },
]

const AuthContext = createContext<AuthContextValue | null>(null)

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = sessionStorage.getItem("hh_user")
      return stored ? (JSON.parse(stored) as AuthUser) : null
    } catch {
      return null
    }
  })

  const signIn = useCallback(async (email: string, password: string) => {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600))

    const match = MOCK_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    )

    if (!match) {
      return { success: false, error: "Invalid email or password." }
    }

    const { password: _pw, ...authUser } = match
    void _pw
    setUser(authUser)
    try {
      sessionStorage.setItem("hh_user", JSON.stringify(authUser))
    } catch {
      // ignore storage errors
    }
    return { success: true }
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
    try {
      sessionStorage.removeItem("hh_user")
    } catch {
      // ignore
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}

export { AuthProvider, useAuth }
