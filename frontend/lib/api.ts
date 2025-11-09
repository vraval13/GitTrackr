const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://gittrackrr.onrender.com"

export async function uploadResume(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/api/upload`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to upload resume")
  }

  return response.json()
}

export async function analyzeResume(text: string) {
  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to analyze resume")
  }

  return response.json()
}

export async function getGitHubData(username: string) {
  const response = await fetch(`${API_BASE_URL}/api/github/${username}`)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Failed to fetch GitHub data")
  }

  return response.json()
}
