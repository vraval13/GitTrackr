"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { uploadResume } from "@/lib/api"
import { LoadingSpinner } from "./loading-spinner"

interface FileUploadProps {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export function FileUpload({ isLoading, setIsLoading }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleFile = async (file: File) => {
    if (!file.name.match(/\.(pdf|docx)$/i)) {
      setError("Please upload a PDF or DOCX file")
      return
    }

    setError(null)
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await uploadResume(formData)
      if (response.github_username) {
        router.push(`/dashboard?username=${response.github_username}`)
      } else {
        setError("No GitHub profile found in the resume")
        setIsLoading(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process resume")
      setIsLoading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  return (
    <div className="space-y-4">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all ${
          dragActive ? "border-blue-500 bg-blue-500/5" : "border-slate-600 hover:border-slate-500 bg-slate-800/30"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="hidden"
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner />
            <p className="text-slate-300">Processing your resume...</p>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-3 cursor-pointer"
          >
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <div>
              <p className="text-white font-medium">Drag and drop your resume here</p>
              <p className="text-slate-400 text-sm">or click to browse (PDF, DOCX)</p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>
      )}
    </div>
  )
}
