"use client";

import { FileUpload } from "@/components/file-upload";
import { ResumeInput } from "@/components/resume-input";
import { useState, useEffect } from "react";
import {Analytics} from '@vercel/analytics/react';
import {
  GithubIcon,
  Sparkles,
  Zap,
  Shield,
  Code,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

function ParticleBackground() {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-indigo-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s infinite ease-in-out ${particle.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [inputMethod, setInputMethod] = useState<"upload" | "paste" | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Intelligent extraction of GitHub profiles from resumes",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Get insights in seconds with optimized processing",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data is processed securely and never stored",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Tech Stack Insights",
      description: "Discover programming languages and frameworks used",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Contribution Metrics",
      description: "Visualize GitHub activity and project statistics",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 transition-colors duration-300 relative">
      <ParticleBackground />

      {/* Header */}
      <header className="border-b border-blue-200 backdrop-blur-md bg-white/80 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <GithubIcon className="w-8 h-8 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-full blur group-hover:bg-indigo-500/30 transition-all" />
              </div>
              <a href="/"><h1 className="text-xl sm:text-2xl font-bold text-slate-700 tracking-tight">
                GitTrackr
              </h1></a>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#features"
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
              >
                How It Works
              </a>
              <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all">
                Get Started
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-indigo-600"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-200">
              <nav className="flex flex-col gap-3">
                <a
                  href="#features"
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 py-2"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-sm font-medium text-gray-600 hover:text-indigo-600 py-2"
                >
                  How It Works
                </a>
                <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium">
                  Get Started
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6 animate-pulse">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">
              AI-Powered Analysis
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Analyze Your Resume &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Showcase Your GitHub
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload or paste your resume, and we'll automatically extract your
            GitHub profile to create a beautiful dashboard showcasing your
            projects, contributions, and tech stack.
          </p>
        </div>

        {/* Input Method */}
        {!inputMethod ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto mb-20">
            {[
              {
                id: "upload",
                title: "Upload File",
                subtitle: "PDF or DOCX format",
                iconColor: "text-indigo-500",
                gradient: "from-blue-500 to-indigo-600",
              },
              {
                id: "paste",
                title: "Paste Text",
                subtitle: "Plain text resume",
                iconColor: "text-purple-500",
                gradient: "from-purple-500 to-pink-600",
              },
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setInputMethod(method.id as "upload" | "paste")}
                onMouseEnter={() => setHoveredCard(method.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative p-8 bg-white rounded-2xl transition-all duration-300 overflow-hidden"
                style={{
                  transform:
                    hoveredCard === method.id
                      ? "translateY(-8px) scale(1.02)"
                      : "translateY(0)",
                  boxShadow:
                    hoveredCard === method.id
                      ? "0 20px 40px rgba(99, 102, 241, 0.2)"
                      : "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${method.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className={`w-8 h-8 ${method.iconColor}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {method.id === "upload" ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      )}
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-sm text-gray-500">{method.subtitle}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setInputMethod(null)}
              className="mb-6 text-sm text-gray-600 hover:text-indigo-600 flex items-center gap-2 font-medium transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to options
            </button>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
              {inputMethod === "upload" ? (
                <FileUpload isLoading={isLoading} setIsLoading={setIsLoading} />
              ) : (
                <ResumeInput
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              )}
            </div>
          </div>
        )}

        {/* Features */}
        <section id="features" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose GitTrackr?
            </h3>
            <p className="text-gray-600">
              Everything you need to showcase your GitHub profile professionally
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-indigo-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mb-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h3>
            <p className="text-gray-600">Get started in three simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Upload Resume",
                desc: "Share your resume via upload or paste",
              },
              {
                step: "2",
                title: "AI Analysis",
                desc: "We extract your GitHub profile automatically",
              },
              {
                step: "3",
                title: "View Dashboard",
                desc: "Explore your beautiful GitHub showcase",
              },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600" />
                )}
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-200 mt-20 bg-white/70 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500">
          <p>Built with Next.js, React, and GitHub API • © 2025</p>
        </div>
      </footer>
    </main>
  );
}
