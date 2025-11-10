# GitTrackr

> Extract GitHub profiles from resumes and generate interactive dashboards with repo, contribution, and language stats — includes PDF export.

[![Demo](https://img.shields.io/badge/demo-live-success)](https://gittrackr-sand.vercel.app/)

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Frontend Notes](#frontend-notes)
- [Backend Implementation](#backend-implementation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting & FAQ](#troubleshooting--faq)
- [Contributing](#contributing)
- [Roadmap](#roadmap)

---

## Features

- 📄 **Resume Upload**: Support for PDF, DOCX, and TXT formats with automatic link extraction
- 🔗 **Smart Username Detection**: Extracts GitHub usernames from link annotations and DOCX relationships
- 👤 **Complete Profile Fetching**: User data, repositories, contribution calendar (GraphQL), and per-repo language statistics
- 📊 **Language Distribution**: Aggregated language usage across all repositories with percentage breakdown
- 📥 **PDF Export**: Generate professionally styled PDF summaries matching the dashboard design
- 🎨 **Interactive Dashboard**: Profile cards, statistics, contribution activity, language charts, and filterable repository grid
- 🔍 **Advanced Filtering**: Search repositories by name/description and filter by programming language
- 📱 **Responsive Design**: Mobile-first UI with smooth animations and gradient effects
- ⚡ **Rate Limit Handling**: Intelligent fallbacks and error handling for GitHub API limits
- 🔒 **Secure**: Environment-based configuration with no hardcoded tokens

---

## Screenshots

### Homepage / Upload UI
<img width="2920" height="1676" alt="image" src="https://github.com/user-attachments/assets/a074dbe8-2b88-4fe8-881f-812b6c2fc2b9" />
*Landing page with resume upload options: drag & drop, file upload, or paste text directly*

### Upload & Analysis Flow
#### PDF Upload :
<img width="1454" height="1468" alt="image" src="https://github.com/user-attachments/assets/5bd40de2-6332-48b9-aae4-a4ee4b6e7df0" />

#### Text Input : 
<img width="1454" height="1552" alt="image" src="https://github.com/user-attachments/assets/0157628f-5c4f-4760-8084-6649ea9ada60" />

#### Real - time Loading GitHub Data :
<img width="1454" height="1552" alt="image" src="https://github.com/user-attachments/assets/cf320f48-9155-4325-919d-1a8d3df68a28" />

*Real-time progress indicator while extracting GitHub username from resume*

### Dashboard - Profile & Stats
<img width="2924" height="1674" alt="image" src="https://github.com/user-attachments/assets/8f4405cc-399d-4b49-b787-56f5a67625b1" />
*User profile section with avatar, bio, and key statistics (repos, followers, following)*

### Dashboard - Repositories Grid
<img width="2924" height="1674" alt="image" src="https://github.com/user-attachments/assets/04ba4f54-2cae-4f25-a7e2-542a8c528ed0" />
*Equal-height repository cards with search, language filter, and sort options*

### Dashboard - Metrics & Contributions
<img width="2924" height="1498" alt="image" src="https://github.com/user-attachments/assets/5563ae0d-d0cb-4156-b546-192417421a9e" />
*Contribution activity heatmap with current streak, longest streak, and language distribution chart*

### Exported PDF Summary
<img width="2924" height="956" alt="image" src="https://github.com/user-attachments/assets/1f2f86d9-a604-4b05-b0d4-d539fae730a9" />

<img width="1368" height="1724" alt="image" src="https://github.com/user-attachments/assets/aa287d50-4385-4996-a964-7aef97dc90c4" />

<img width="2728" height="1724" alt="image" src="https://github.com/user-attachments/assets/adf5fbd8-d648-4227-8ccb-ac48689792b9" />

<img width="2728" height="1724" alt="image" src="https://github.com/user-attachments/assets/49d8db66-5ea8-4d17-b71c-5d83e7111fdf" />

*Professional PDF report with profile, statistics, contributions, languages, and detailed repository information*

---

## Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **Python 3.8+** with pip
- **virtualenv** (recommended)

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
EOF

# Start development server
npm run dev
```

Frontend will be available at **http://localhost:3000**

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file (DO NOT COMMIT)
cat > .env << EOF
GITHUB_API_TOKEN=your_github_token_here
EOF

# Start Flask server
python app.py
```

Backend API will be available at **http://localhost:5000**

---

## Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

- **NEXT_PUBLIC_API_URL**: Base URL for the Flask backend API

### Backend (`.env`)

```env
GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## Usage

### 1. Upload Resume

Visit http://localhost:3000 and either:
- **Drag & drop** a resume file (PDF, DOCX, or TXT)
- **Click to upload** a file
- **Paste resume text** directly into the text area

### 2. Automatic Extraction

The application automatically:
- Extracts GitHub username from URLs (e.g., `github.com/username`)
- Parses link annotations in PDFs
- Reads hyperlinks from DOCX relationships
- Detects @ mentions and labeled references

### 3. View Dashboard

Once extracted, the dashboard displays:
- **User Profile**: Avatar, name, bio, profile link
- **Statistics**: Public repos, followers, following
- **Contribution Activity**: Total contributions, current streak, longest streak
- **Language Distribution**: Percentage breakdown of languages used
- **Repositories**: Filterable grid with search, language filter, and sorting

### 4. Export PDF Summary

Click **"Download Summary (PDF)"** to generate and download a comprehensive PDF report including all dashboard data.

---

## API Reference

### POST `/api/upload`

Upload a resume file and extract GitHub username.

**Request**:
```bash
curl -X POST http://localhost:5000/api/upload \
  -F "file=@resume.pdf"
```

**Success Response** (200):
```json
{
  "github_username": "octocat"
}
```

**Error Responses**:
- `400`: No file provided, invalid file type
- `404`: No GitHub profile found in resume
- `413`: File too large (max 10MB)

---

### POST `/api/analyze`

Analyze pasted resume text and extract GitHub username.

**Request**:
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"text": "Check out my GitHub: github.com/octocat"}'
```

**Success Response** (200):
```json
{
  "github_username": "octocat"
}
```

**Error Responses**:
- `400`: No text provided or empty text
- `404`: No GitHub profile found in text

---

### GET `/api/github/<username>`

Fetch complete GitHub profile data including repositories, contributions, and language distribution.

**Request**:
```bash
curl http://localhost:5000/api/github/octocat
```

**Success Response** (200):
```json
{
  "user": {
    "login": "octocat",
    "name": "The Octocat",
    "bio": "GitHub's mascot",
    "followers": 5000,
    "following": 100,
    "public_repos": 50,
    "avatar_url": "https://avatars.githubusercontent.com/u/583231"
  },
  "repositories": [
    {
      "name": "Hello-World",
      "description": "My first repository",
      "url": "https://github.com/octocat/Hello-World",
      "stars": 1500,
      "forks": 500,
      "language": "JavaScript"
    }
  ],
  "contribution_activity": {
    "total": 2500,
    "current_streak": 15,
    "longest_streak": 120,
    "days": []
  },
  "language_distribution": [
    {
      "language": "JavaScript",
      "percentage": 45.2
    },
    {
      "language": "Python",
      "percentage": 30.1
    },
    {
      "language": "TypeScript",
      "percentage": 24.7
    }
  ]
}
```

**Error Responses**:
- `400`: Invalid username format
- `500`: Failed to fetch GitHub profile

---

### GET `/api/github/<username>/export`

Generate and download a comprehensive PDF summary of the GitHub profile.

**Request**:
```bash
curl http://localhost:5000/api/github/octocat/export \
  --output octocat_profile.pdf
```

**Response**: Binary PDF file (application/pdf)

**Error Responses**:
- `400`: Invalid username format
- `404`: GitHub user not found
- `500`: Failed to generate PDF

---

### Rate Limits & Fallbacks

- **Username Validation**: Uses REST API `/users/<username>` endpoint; falls back to HEAD request if rate-limited
- **Contributions**: Requires GitHub API token with GraphQL access; returns zeros if token missing
- **Language Stats**: Fetches per-repo language bytes via `/repos/<owner>/<repo>/languages`; falls back to primary language if rate-limited

---

## Frontend Notes

### UI/UX Components

#### File Upload (`file-upload.tsx`)
- Drag & drop interface with visual feedback
- Supports PDF, DOCX, TXT formats
- File size validation (10MB limit)
- Progress indicators

#### Resume Input (`resume-input.tsx`)
- Textarea for pasting resume text
- Character count display
- Real-time validation

#### GitHub Dashboard (`github-dashboard.tsx`)
- Responsive grid layout
- Profile section with avatar and bio
- Statistics cards (repos, followers, following)
- Contribution activity metrics
- Language distribution chart
- Repository grid with filters

#### Repository Card (`repository-card.tsx`)
- Equal-height cards with gradient borders
- Repository name, description, URL
- Stars, forks, language badges
- Hover effects and animations

#### User Stats (`user-stats.tsx`)
- Icon + label + value display
- Color-coded statistics
- Responsive layout

---

## Backend Implementation

### PDF Generation

The `generate_pdf_summary()` function uses **ReportLab** to create professionally styled PDFs:

- **Profile Section**: Avatar image (fetched via HTTP), name, username, bio
- **Statistics Table**: Public repos, followers, following counts
- **Contribution Cards**: Total contributions, current streak, longest streak
- **Language Distribution**: Top 10 languages with percentage bars
- **Repository List**: Detailed info for each repo (name, description, URL, stats, language)

**Key Features**:
- Rounded corners and gradient backgrounds
- Color-coded metrics matching dashboard
- Automatic page breaks every 6 repositories
- Embedded hyperlinks for URLs
- Professional typography and spacing

### Contribution Extraction

Uses **GitHub GraphQL API** to fetch contribution calendar:

```python
def fetch_github_contributions(username: str) -> Dict:
    query = """
    query($login:String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
    """
```

**Calculates**:
- Total contributions in the last year
- Current streak (consecutive days with contributions)
- Longest streak (best consecutive day count)

**Requires**: `GITHUB_API_TOKEN` with `read:user` scope
---

## Project Structure

```
gittrackr/
├── frontend/
│   ├── app/                              # Next.js app directory
│   │   ├── page.tsx                      # Landing page with upload interface
│   │   └── layout.tsx                    # Root layout with metadata
│   ├── components/
│   │   ├── file-upload.tsx               # File upload with drag & drop
│   │   ├── resume-input.tsx              # Paste resume text component
│   │   ├── github-dashboard.tsx          # Main dashboard layout
│   │   ├── repository-card.tsx           # Repository display cards
│   │   └── user-stats.tsx                # Profile statistics component
│   ├── public/
│   │   └── screenshots/                  # Screenshot images for README
│   ├── styles/                           # Global CSS styles
│   ├── package.json                      # Node dependencies
│   ├── tsconfig.json                     # TypeScript configuration
│   ├── next.config.mjs                   # Next.js configuration
│   └── postcss.config.mjs                # PostCSS configuration
├── backend/
│   ├── app.py                            # Flask API with all endpoints
│   ├── requirements.txt                  # Python dependencies
│   ├── .env                              # Environment variables (GITHUB_API_TOKEN)
│   └── uploads/                          # Temporary file storage directory
├── SETUP.md                              # Detailed setup instructions
└── README.md                             # This file
```

### File Descriptions

- **`frontend/app/page.tsx`**: Landing page with resume upload/paste interface
- **`frontend/components/github-dashboard.tsx`**: Main dashboard displaying user profile, stats, contributions, languages, and repositories
- **`backend/app.py`**: Flask server with endpoints for upload, analysis, profile fetching, and PDF export
- **`backend/requirements.txt`**: Python packages (Flask, PyPDF2, python-docx, reportlab, requests)
- **`backend/uploads/`**: Temporary directory for uploaded resume files (auto-deleted after processing)

---

---

## Deployment

### Frontend Deployment (Vercel)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Import to Vercel**:
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project" → Import from GitHub
   - Select repository

3. **Configure**:
   - Framework: **Next.js**
   - Root Directory: `frontend`
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
     ```

4. **Deploy**: Click "Deploy" and wait for build to complete

### Backend Deployment (Render)

1. **Create Web Service**:
   - Visit [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect GitHub repository

2. **Configure**:
   - **Name**: `gittrackr-api`
   - **Environment**: Python 3
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`

3. **Environment Variables**:
   ```
   GITHUB_API_TOKEN=ghp_your_token_here
   PYTHON_VERSION=3.11.0
   ```

4. **Deploy**: Click "Create Web Service"

---

## Contributing

I welcome you for your contributions! Here's how to get involved:

### How to Contribute

1. **Fork the Repository**:
   ```bash
   git clone https://github.com/yourusername/gittrackr.git
   cd gittrackr
   ```

2. **Create a Branch**:
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**:
   - Add features or fix bugs
   - Update tests if applicable
   - Follow existing code style

4. **Commit Changes**:
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

5. **Push to GitHub**:
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**:
   - Go to GitHub repository
   - Click "New Pull Request"
   - Describe your changes clearly
   - Link related issues

### Code Style

- **Frontend**: Use Prettier and ESLint
  ```bash
  npm run lint
  npm run format
  ```

- **Backend**: Follow PEP 8
  ```bash
  pip install black flake8
  black backend/
  flake8 backend/
  ```

### Updating Documentation

- Update `README.md` for user-facing changes
- Update `SETUP.md` for setup/deployment changes
- Add JSDoc comments for new functions
- Include API examples for new endpoints

---


## Contact

- **GitHub**: [@vraval13](https://github.com/vraval13)
- **Email**: ravalvyom17@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/vyom-raval/

---

<div align="center">

**Made with ❤️ by Vyom**

</div>
