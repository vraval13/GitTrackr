"use client"

import { useEffect } from "react"

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("[v0] Error caught:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg">
          <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
          <p className="text-red-300/80 text-sm mb-4">{error.message}</p>
          <button
            onClick={reset}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}
