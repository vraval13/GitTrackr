"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { getGitHubData } from "@/lib/api"
import { GitHubDashboard } from "@/components/github-dashboard"
import { LoadingSpinner } from "@/components/loading-spinner"

function DashboardContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const username = searchParams.get("username")
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) {
      router.push("/")
      return
    }

    const fetchData = async () => {
      try {
        const response = await getGitHubData(username)
        setData(response)
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch GitHub data")
        setLoading(false)
      }
    }

    fetchData()
  }, [username, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <LoadingSpinner size="lg" />
          <p className="text-gray-500">Loading GitHub data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button
            onClick={() => router.push("/")}
            className="mb-6 text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
            <p className="font-medium">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return <GitHubDashboard data={data} onBack={() => router.push("/")} />
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
