import { useState, type FormEvent } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button, Input } from "@/components/ui"
import { GeometricPattern } from "@/components/decorative"
import { useAuth } from "@/context/AuthContext"

const DEMO_ACCOUNTS = [
  { label: "Admin", email: "admin@humblehalal.sg", password: "admin123", color: "bg-purple-100 text-purple-700 border-purple-200" },
  { label: "Business Owner", email: "owner@humblehalal.sg", password: "owner123", color: "bg-primary-100 text-primary-700 border-primary-200" },
  { label: "Member", email: "user@humblehalal.sg", password: "user123", color: "bg-blue-100 text-blue-700 border-blue-200" },
]

function SignIn() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string })?.from ?? "/dashboard"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const result = await signIn(email, password)
    setLoading(false)
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error ?? "Sign in failed.")
    }
  }

  function fillDemo(acc: typeof DEMO_ACCOUNTS[number]) {
    setEmail(acc.email)
    setPassword(acc.password)
    setError("")
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md px-6">
        {/* Card */}
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
          {/* Header strip */}
          <div className="relative overflow-hidden bg-gradient-hero px-8 py-8 text-white">
            <GeometricPattern variant="hero" className="opacity-20" />
            <div className="relative z-10">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5L10 1Z" fill="white" />
                </svg>
              </div>
              <h1 className="font-display text-h2 font-bold text-white">Welcome back</h1>
              <p className="mt-1 text-body-sm text-primary-200">Sign in to your HumbleHalal account</p>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            {/* Demo account quickfill */}
            <div className="mb-5">
              <p className="mb-2 text-caption font-semibold uppercase tracking-wider text-neutral-400">
                Demo accounts — click to fill
              </p>
              <div className="flex flex-wrap gap-2">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => fillDemo(acc)}
                    className={`rounded-lg border px-3 py-1.5 text-caption font-semibold transition-opacity hover:opacity-80 ${acc.color}`}
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-body-sm text-red-700">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                  Email address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  required
                  icon={<Mail className="h-4 w-4" />}
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-body-sm font-medium text-neutral-700">Password</label>
                  <a href="#" className="text-caption text-primary-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    icon={<Lock className="h-4 w-4" />}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Signing in…" : "Sign In"}
              </Button>
            </form>

            <p className="mt-5 text-center text-body-sm text-neutral-500">
              Don&apos;t have an account?{" "}
              <Link to="/sign-up" className="font-semibold text-primary-600 hover:underline">
                Create one free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
