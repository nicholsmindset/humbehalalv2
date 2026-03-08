import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { CheckCircle, AlertCircle, Info, X } from "lucide-react"

type ToastType = "success" | "error" | "info" | "warning"

interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const icons: Record<ToastType, React.ElementType> = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertCircle,
  info: Info,
}

const styles: Record<ToastType, string> = {
  success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-amber-50 border-amber-200 text-amber-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
}

const iconStyles: Record<ToastType, string> = {
  success: "text-emerald-500",
  error: "text-red-500",
  warning: "text-amber-500",
  info: "text-blue-500",
}

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((message: string, type: ToastType = "info") => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { id, type, message }])
    setTimeout(() => remove(id), 4000)
  }, [remove])

  const success = useCallback((msg: string) => toast(msg, "success"), [toast])
  const error = useCallback((msg: string) => toast(msg, "error"), [toast])
  const info = useCallback((msg: string) => toast(msg, "info"), [toast])

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      {/* Toast portal */}
      <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2" aria-live="polite">
        {toasts.map((t) => {
          const Icon = icons[t.type]
          return (
            <div
              key={t.id}
              className={`flex w-80 max-w-[calc(100vw-2.5rem)] items-start gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm transition-all ${styles[t.type]}`}
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${iconStyles[t.type]}`} />
              <p className="flex-1 text-body-sm font-medium">{t.message}</p>
              <button
                onClick={() => remove(t.id)}
                className="shrink-0 opacity-50 hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>")
  return ctx
}

export { ToastProvider, useToast }
