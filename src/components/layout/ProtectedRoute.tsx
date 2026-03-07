import { Navigate, useLocation } from "react-router-dom"
import { useAuth, type UserRole } from "@/context/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
  /** If specified, user must have one of these roles */
  roles?: UserRole[]
}

function ProtectedRoute({ children, roles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />
  }

  if (roles && user && !roles.includes(user.role)) {
    // Authenticated but wrong role — redirect to their own dashboard home
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}

export { ProtectedRoute }
