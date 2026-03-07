import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react"
import { Button, Input, Badge } from "@/components/ui"
import { GeometricPattern } from "@/components/decorative"
import { useAuth } from "@/context/AuthContext"

type AccountType = "user" | "business-owner"

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "Contains a number", ok: /\d/.test(password) },
    { label: "Contains a letter", ok: /[a-zA-Z]/.test(password) },
  ]
  const score = checks.filter((c) => c.ok).length
  const colors = ["bg-red-400", "bg-amber-400", "bg-emerald-400"]
  const labels = ["Weak", "Fair", "Strong"]

  if (!password) return null

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i < score ? colors[score - 1] : "bg-neutral-200"}`}
          />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {checks.map((c) => (
            <span key={c.label} className={`flex items-center gap-1 text-caption ${c.ok ? "text-emerald-600" : "text-neutral-400"}`}>
              <CheckCircle className="h-3 w-3" />
              {c.label}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span className={`text-caption font-semibold ${score === 3 ? "text-emerald-600" : score === 2 ? "text-amber-600" : "text-red-500"}`}>
            {labels[score - 1]}
          </span>
        )}
      </div>
    </div>
  )
}

function SignUp() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [accountType, setAccountType] = useState<AccountType>("user")
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError("")
    if (form.password !== form.confirm) {
      setError("Passwords do not match.")
      return
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    setLoading(true)

    // Simulate registration then auto sign-in with the owner demo account
    await new Promise((r) => setTimeout(r, 800))

    // For demo: sign in as business-owner or user depending on selection
    const demoEmail = accountType === "business-owner" ? "owner@humblehalal.sg" : "user@humblehalal.sg"
    const demoPass = accountType === "business-owner" ? "owner123" : "user123"
    await signIn(demoEmail, demoPass)

    setLoading(false)
    navigate("/dashboard", { replace: true })
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      <div className="w-full max-w-md px-6">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-hero px-8 py-8 text-white">
            <GeometricPattern variant="hero" className="opacity-20" />
            <div className="relative z-10">
              <Badge variant="accent" size="sm" className="mb-3">Free Account</Badge>
              <h1 className="font-display text-h2 font-bold text-white">Join HumbleHalal</h1>
              <p className="mt-1 text-body-sm text-primary-200">
                Singapore's halal business &amp; events community
              </p>
            </div>
          </div>

          <div className="px-8 py-6">
            {/* Account type toggle */}
            <div className="mb-5">
              <p className="mb-2 text-body-sm font-medium text-neutral-700">I am a…</p>
              <div className="grid grid-cols-2 gap-2">
                {(["user", "business-owner"] as AccountType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAccountType(type)}
                    className={`rounded-xl border-2 px-4 py-3 text-body-sm font-medium transition-all ${
                      accountType === type
                        ? "border-primary-500 bg-primary-50 text-primary-700"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    {type === "user" ? "Community Member" : "Business Owner"}
                  </button>
                ))}
              </div>
              {accountType === "business-owner" && (
                <p className="mt-2 text-caption text-neutral-400">
                  You'll get access to the business dashboard and can list up to 3 businesses for free.
                </p>
              )}
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
                  Full name
                </label>
                <Input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ahmad bin Abdullah"
                  required
                  icon={<User className="h-4 w-4" />}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                  Email address
                </label>
                <Input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  required
                  icon={<Mail className="h-4 w-4" />}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
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
                <PasswordStrength password={form.password} />
              </div>

              <div>
                <label className="mb-1.5 block text-body-sm font-medium text-neutral-700">
                  Confirm password
                </label>
                <Input
                  name="confirm"
                  type="password"
                  value={form.confirm}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  icon={<Lock className="h-4 w-4" />}
                />
              </div>

              <p className="text-caption text-neutral-400">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-primary-600 hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary-600 hover:underline">Privacy Policy</Link>.
              </p>

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                {loading ? "Creating account…" : "Create Free Account"}
              </Button>
            </form>

            <p className="mt-5 text-center text-body-sm text-neutral-500">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-semibold text-primary-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
