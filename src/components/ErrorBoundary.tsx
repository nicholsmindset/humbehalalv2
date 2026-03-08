import { Component, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    // Replace with your error reporting service (Sentry, etc.)
    console.error("[ErrorBoundary]", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 1L12.5 7.5L19 10L12.5 12.5L10 19L7.5 12.5L1 10L7.5 7.5L10 1Z" fill="#ef4444" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-neutral-900">Something went wrong</h1>
            <p className="mt-2 text-neutral-500">
              An unexpected error occurred. Please refresh the page to try again.
            </p>
            {this.state.error && (
              <p className="mt-3 rounded-lg bg-neutral-100 px-4 py-2 font-mono text-sm text-neutral-600">
                {this.state.error.message}
              </p>
            )}
          </div>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Refresh page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
