import { ExternalLink, Star, GitFork } from "lucide-react"

interface RepositoryCardProps {
  repository: {
    name: string
    description: string
    url: string
    stars: number
    forks: number
    language: string | null
  }
}

const languageColors: { [key: string]: string } = {
  TypeScript: "bg-blue-500/20 text-blue-300",
  JavaScript: "bg-yellow-500/20 text-yellow-300",
  Python: "bg-emerald-500/20 text-emerald-300",
  Java: "bg-orange-500/20 text-orange-300",
  Go: "bg-cyan-500/20 text-cyan-300",
  Rust: "bg-orange-500/20 text-orange-300",
  "C++": "bg-pink-500/20 text-pink-300",
  C: "bg-slate-500/20 text-slate-300",
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const languageColor = repository.language
    ? languageColors[repository.language] || "bg-slate-500/20 text-slate-300"
    : null

  return (
    <a
      href={repository.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group p-6 bg-slate-800/70 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between h-full w-full"
    >
      <div className="flex-grow">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h4 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors break-words whitespace-normal">
            {repository.name}
          </h4>
          <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400 flex-shrink-0" />
        </div>

        <p className="text-slate-300 text-sm mb-4 whitespace-normal break-words">
          {repository.description || "No description provided"}
        </p>
      </div>

      <div className="space-y-3 mt-4">
        {repository.language && (
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${languageColor}`}>{repository.language}</span>
          </div>
        )}

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-4 h-4" />
            <span>{repository.stars}</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <GitFork className="w-4 h-4" />
            <span>{repository.forks}</span>
          </div>
        </div>
      </div>
    </a>
  )
}