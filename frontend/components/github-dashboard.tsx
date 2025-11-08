"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { RepositoryCard } from "./repository-card";
import { UserStats } from "./user-stats";
import Image from "next/image";
import {
  GithubIcon as GitHubIcon,
  ExternalLink,
  RotateCw,
  Download,
  TrendingUp,
  BarChart3,
  Search,
  Filter,
} from "lucide-react";

// -------------------------------
// 🧩 Interfaces
// -------------------------------
interface FilterState {
  search: string;
  language: string;
}

interface Repository {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
}

interface LanguageStat {
  language: string;
  percentage: number;
}

interface ContributionActivity {
  total: number;
  current_streak: number;
  longest_streak: number;
}

interface GitHubData {
  user: {
    login: string;
    name: string;
    bio: string;
    followers: number;
    following: number;
    public_repos: number;
    avatar_url: string;
  };
  repositories: Repository[];
  contribution_activity?: ContributionActivity;
  language_distribution?: LanguageStat[];
}

interface GitHubDashboardProps {
  data: GitHubData;
  onBack: () => void;
}

const ALL_LANGUAGES = "All Languages";

// -------------------------------
// 📄 Helper: Download GitHub Summary as PDF
// -------------------------------
async function downloadGithubSummary(username: string) {
  try {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const exportUrl = `${apiBaseUrl}/api/github/${encodeURIComponent(
      username
    )}/export`;

    const resp = await fetch(exportUrl, {
      method: "GET",
      headers: { Accept: "application/pdf" },
    });
    if (!resp.ok) {
      let errorMsg = "Failed to download PDF";
      try {
        const errData = await resp.clone().json();
        errorMsg = errData.error || resp.statusText;
      } catch {
        errorMsg = resp.statusText || "Unknown error";
      }
      alert(`Failed to download PDF: ${errorMsg}`);
      return;
    }

    const blob = await resp.blob();
    if (blob.size === 0) {
      alert("Received empty PDF file");
      return;
    }

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${username}_github_profile.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    alert(
      `Error downloading PDF summary: ${
        e instanceof Error ? e.message : "Unknown error"
      }`
    );
  }
}

// -------------------------------
// 🧩 Main Component
// -------------------------------
export function GitHubDashboard({ data, onBack }: GitHubDashboardProps) {
  const router = useRouter();
  const [sortBy, setSortBy] = useState<"stars" | "name" | "recent">("stars");
  const [isDownloading, setIsDownloading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    language: ALL_LANGUAGES,
  });

  // Unique Languages
  const uniqueLanguages = useMemo(() => {
    const languages = data.repositories
      .map((repo) => repo.language)
      .filter((lang): lang is string => Boolean(lang));
    return [ALL_LANGUAGES, ...Array.from(new Set(languages))];
  }, [data.repositories]);

  // Filtered Repositories
  const filteredRepos = useMemo(() => {
    return data.repositories.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        (repo.description
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ??
          false);
      const matchesLanguage =
        filters.language === ALL_LANGUAGES ||
        repo.language === filters.language;
      return matchesSearch && matchesLanguage;
    });
  }, [data.repositories, filters]);

  // Sorted Repositories
  const sortedRepos = useMemo(() => {
    return [...filteredRepos].sort((a, b) => {
      if (sortBy === "stars") return b.stars - a.stars;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
  }, [filteredRepos, sortBy]);

  // PDF Download
  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadGithubSummary(data.user.login);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 transition-colors duration-300">
      {/* Navigation */}
      <header className="border-b border-blue-200 backdrop-blur-sm bg-white/80 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GitHubIcon className="w-8 h-8 text-indigo-500" />
            <a href="/">
              <h1 className="text-xl font-bold text-slate-800">
                GitTrackr
              </h1>
            </a>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 text-white bg-indigo-500 hover:bg-indigo-600 border border-indigo-500 rounded-lg transition-all text-sm font-medium shadow-md hover:shadow-lg"
          >
            New Analysis
          </button>
        </div>
      </header>

      {/* User Profile Section */}
      <section className="border-b border-blue-200 bg-gradient-to-br from-white to-blue-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center bg-white/80 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex-shrink-0">
              <Image
                alt={
                  data.user?.name
                    ? `${data.user.name}'s GitHub Avatar`
                    : "GitHub User Avatar"
                }
                src={data.user.avatar_url || "/placeholder.svg"}
                width={120}
                height={120}
                className="rounded-full border-2 border-indigo-400 shadow-md"
              />
            </div>

            <div className="flex-1">
              <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-1">
                    {data.user.name}
                  </h2>
                  <a
                    href={`https://github.com/${data.user.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm"
                  >
                    @{data.user.login}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Download GitHub profile summary as PDF"
                >
                  <Download
                    className={`w-4 h-4 ${
                      isDownloading ? "animate-bounce" : ""
                    }`}
                  />
                  {isDownloading
                    ? "Generating PDF..."
                    : "Download Summary (PDF)"}
                </button>
              </div>

              {data.user.bio && (
                <p className="text-gray-700 mb-6 max-w-2xl leading-relaxed">
                  {data.user.bio}
                </p>
              )}

              <div className="grid grid-cols-3 gap-4 mb-6">
                <UserStats
                  label="Public Repos"
                  value={data.user.public_repos}
                  icon="📦"
                />
                <UserStats
                  label="Followers"
                  value={data.user.followers}
                  icon="👥"
                />
                <UserStats
                  label="Following"
                  value={data.user.following}
                  icon="🔗"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🟦 Contribution Activity */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <TrendingUp className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Contribution Activity
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 items-center">
          <div>
            <p className="text-3xl font-bold text-indigo-600">
              {data.contribution_activity?.total ?? 0}
            </p>
            <p className="text-sm text-gray-500">Total</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-green-600">
              {data.contribution_activity?.current_streak ?? 0}
            </p>
            <p className="text-sm text-gray-500">Day Streak</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-600">
              {data.contribution_activity?.longest_streak ?? 0}
            </p>
            <p className="text-sm text-gray-500">Longest</p>
          </div>
        </div>
      </section>

      {/* 🟨 Language Distribution */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <BarChart3 className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            Language Distribution
          </h3>
        </div>

        <div className="mt-4 space-y-4">
          {data.language_distribution &&
          data.language_distribution.length > 0 ? (
            data.language_distribution.map((lang) => (
              <div key={lang.language}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700 font-medium">
                    {lang.language}
                  </span>
                  <span className="text-sm text-gray-500">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded overflow-hidden">
                  <div
                    className="h-full rounded bg-gradient-to-r from-indigo-400 to-blue-500"
                    style={{ width: `${lang.percentage}%` }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No language data available.</p>
          )}
        </div>
      </section>

      {/* 🧩 Repositories Section (with filters) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h3 className="text-2xl font-bold text-slate-800">
                Repositories ({sortedRepos.length})
              </h3>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "stars" | "name" | "recent")
                  }
                  className="px-4 py-2 bg-white border border-blue-300 rounded-lg text-slate-700 text-sm focus:outline-none focus:border-indigo-500 shadow-sm"
                >
                  <option value="stars">Sort by Stars</option>
                  <option value="name">Sort by Name</option>
                  <option value="recent">Sort by Recent</option>
                </select>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white border border-indigo-600 rounded-lg flex items-center gap-2 text-sm transition-all shadow-md hover:shadow-lg"
                >
                  <RotateCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>

            {/* 🔍 Search and Filter Inputs */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="relative">
                <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search repositories..."
                      value={filters.search}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, search: e.target.value }))
                      }
                      className="w-full pl-10 pr-4 py-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative p-[1px] rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={filters.language}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, language: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white"
                >
                  {uniqueLanguages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Repository Grid */}
        {sortedRepos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedRepos.map((repo) => (
              <div
                key={repo.name}
                className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <RepositoryCard repository={repo} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {filters.search || filters.language !== ALL_LANGUAGES
                ? "No repositories found matching your filters"
                : "No repositories found"}
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-200 mt-12 bg-white/80 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500">
          <p>Built with Next.js • React • GitHub API</p>
        </div>
      </footer>
    </main>
  );
}
