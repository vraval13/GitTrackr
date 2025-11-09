"use client";

import { useState, useEffect } from "react";
import {
  GithubIcon,
  Sparkles,
  Zap,
  Shield,
  Code,
  TrendingUp,
  Menu,
  X,
  FileText,
  BarChart3,
  FolderGit2,
  Activity,
} from "lucide-react";
import { FileUpload } from "@/components/file-upload";
import { ResumeInput } from "@/components/resume-input";

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
        @keyframes floatUpDown {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes floatUpDown2 {
          0%,
          100% {
            transform: translateY(-10px);
          }
          50% {
            transform: translateY(10px);
          }
        }
        @keyframes floatUpDown3 {
          0%,
          100% {
            transform: translateY(5px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes floatUpDown4 {
          0%,
          100% {
            transform: translateY(-5px);
          }
          50% {
            transform: translateY(15px);
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
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 transition-colors duration-300 relative overflow-x-hidden">
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
              <a href="/">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-700 tracking-tight">
                  GitTrackr
                </h1>
              </a>
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
                <button  onClick={() => {
                const section = document.getElementById("get-started");
                section?.scrollIntoView({ behavior: "smooth" });
              }} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium">
                  Get Started
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center mb-12 relative">
          {/* Left Side - Text Content */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-4 animate-pulse">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-700">
                AI-Powered Analysis
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Analyze Your Resume &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Showcase Your GitHub
              </span>
            </h2>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              Upload or paste your resume, and we'll automatically extract your GitHub profile to create a beautiful dashboard showcasing your projects, contributions, and tech stack.
            </p>
            <button
              onClick={() => {
                const section = document.getElementById("get-started");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              Get Started
            </button>
          </div>

          {/* Right Side - Four Dashboard Cards in Staggered Layout */}
          <div className="relative lg:pl-12">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>

            <div className="relative grid grid-cols-1 gap-3">
              {/* GitHub Profile Card - Top, aligned left */}
              <div
                className="bg-white rounded-xl shadow-xl p-4 border border-indigo-100 transform hover:scale-105 transition-transform w-64 ml-0"
                style={{
                  animation: "floatUpDown 3s ease-in-out infinite",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-semibold text-sm text-gray-800">
                    GitHub Profile
                  </h3>
                </div>
                <div className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mb-3">
                  auto-detected
                </div>
                <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:shadow-lg transition-all">
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
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Upload
                </button>
              </div>

              {/* Analytics Card - Second, slightly right and down */}
              <div
                className="bg-white rounded-xl shadow-xl p-4 border border-purple-100 transform hover:scale-105 transition-transform w-64 ml-8"
                style={{
                  animation: "floatUpDown2 3.5s ease-in-out infinite",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800">
                      Analytics
                    </h3>
                    <p className="text-xs text-gray-500">Real-time insights</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <span className="text-xs text-gray-700">JavaScript</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">
                      15%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                      <span className="text-xs text-gray-700">TypeScript</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">
                      70%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <span className="text-xs text-gray-700">Python</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">
                      60%
                    </span>
                  </div>
                </div>
              </div>

              {/* Repositories Card - Third, back to left and up */}
              <div
                className="bg-white rounded-xl shadow-xl p-4 border border-green-100 transform hover:scale-105 transition-transform w-64 ml-2"
                style={{
                  animation: "floatUpDown3 4s ease-in-out infinite",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <FolderGit2 className="w-4 h-4 text-green-600" />
                  <h3 className="font-semibold text-sm text-gray-800">
                    Repositories
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Quick profile stats
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700">Total Repos</span>
                    <span className="font-semibold text-gray-800">20</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700">Followers</span>
                    <span className="font-semibold text-gray-800">6</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700">Following </span>
                    <span className="font-semibold text-gray-800">18</span>
                  </div>
                </div>
              </div>

              {/* Activity Monitor Card - Fourth, slightly right and down */}
              <div
                className="bg-white rounded-xl shadow-xl p-4 border border-blue-100 transform hover:scale-105 transition-transform w-64 ml-6"
                style={{
                  animation: "floatUpDown4 3.5s ease-in-out infinite",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <h3 className="font-semibold text-sm text-gray-800">
                    Activity Monitor
                  </h3>
                </div>
                <p className="text-xs text-gray-500 mb-3">
                  Contribution Activity (Overview)
                </p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700">Total Contributions</span>
                    <span className="font-semibold text-gray-800">126</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700">Current Streak</span>
                    <span className="font-semibold text-gray-800">4 days</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-700">Longest Streak</span>
                    <span className="font-semibold text-gray-800">2 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Method Section */}
        <div id="get-started" className="scroll-mt-20">
          {!inputMethod ? (
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
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
                  gradient: "from-indigo-500 to-purple-600",
                },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() =>
                    setInputMethod(method.id as "upload" | "paste")
                  }
                  onMouseEnter={() => setHoveredCard(method.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative p-6 bg-white rounded-2xl transition-all duration-300 overflow-hidden"
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
                  <div className="relative flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className={`w-7 h-7 ${method.iconColor}`}
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
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {method.title}
                    </h3>
                    <p className="text-xs text-gray-500">{method.subtitle}</p>
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
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    {inputMethod === "upload" ? (
                      <FileUpload
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    ) : (
                      <ResumeInput
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                      />
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Features */}
        <section id="features" className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Why Choose GitTrackr?
            </h3>
            <p className="text-sm text-gray-600">
              Everything you need to showcase your GitHub profile professionally
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group p-5 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-indigo-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h4 className="text-base font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mb-10">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              How It Works
            </h3>
            <p className="text-sm text-gray-600">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-3 shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="text-base font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-600">{item.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600" />
                )}
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="border-t border-blue-200 mt-16 bg-white/70 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-gray-500">
          <p>Built with Next.js, React, and GitHub API • © 2025</p>
          <p>Made with ❤️ by Vyom</p>

        </div>
      </footer>
    </main>
  );
}
