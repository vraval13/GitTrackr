"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { analyzeResume } from "@/lib/api"
import { LoadingSpinner } from "./loading-spinner"

interface ResumeInputProps {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function ResumeInput({ isLoading, setIsLoading }: ResumeInputProps) {
  const [text, setText] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please paste your resume text")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const response = await analyzeResume(text)
      if (response.github_username) {
        router.push(`/dashboard?username=${response.github_username}`)
      } else {
        setError("No GitHub profile found in the resume text")
        setIsLoading(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to analyze resume")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your resume text here... We'll automatically extract your GitHub profile link."
        disabled={isLoading}
        className="w-full h-64 p-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none disabled:opacity-50"
      />

      <div className="flex gap-3 justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              Analyzing...
            </>
          ) : (
            "Analyze Resume"
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>
      )}
    </div>
  )
}
