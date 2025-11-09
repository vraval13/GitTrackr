# GitTrackr

> Extract GitHub profiles from resumes and generate interactive dashboards with repo, contribution, and language stats — includes PDF export.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/yourusername/gittrackr)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Issues](https://img.shields.io/github/issues/yourusername/gittrackr)](https://github.com/yourusername/gittrackr/issues)
[![Demo](https://img.shields.io/badge/demo-live-success)](https://gittrackr.vercel.app)

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
- [License & Acknowledgements](#license--acknowledgements)
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

- **GITHUB_API_TOKEN**: GitHub Personal Access Token (required for GraphQL contributions and higher rate limits)
  - **Without token**: 60 requests/hour
  - **With token**: 5,000 requests/hour
  - **Minimum scopes**: `public_repo`, `read:user`
  - **Generate token**: [GitHub Settings → Tokens](https://github.com/settings/tokens)

⚠️ **Security Warning**: Never commit `.env` or `.env.local` files to version control!

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

### Customization

**Colors**: Edit `github-dashboard.tsx` and Tailwind config:
```typescript
// Gradient backgrounds
className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"

// Statistics colors
<p className="text-indigo-600">...</p>  // Total contributions
<p className="text-green-600">...</p>   // Current streak
<p className="text-purple-600">...</p>  // Longest streak
```

**Card Layout**: Modify grid columns in `github-dashboard.tsx`:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**PDF Styling**: Edit `generate_pdf_summary()` in `backend/app.py`:
```python
# Custom colors
colors.HexColor('#4f46e5')  # Indigo
colors.HexColor('#10b981')  # Green
colors.HexColor('#8b5cf6')  # Purple
```

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

### Language Aggregation

Fetches language bytes for each repository via REST API:

```python
def aggregate_language_distribution(username: str, repositories: List[Dict]) -> List[Dict]:
    # For each repo: GET /repos/:owner/:repo/languages
    # Returns: {"JavaScript": 12345, "Python": 67890, ...}
    # Aggregates total bytes per language
    # Converts to percentages
```

**Fallback**: If rate-limited, uses repository's primary `language` field as single-language count.

### Error Handling

- **File Size Limit**: 10MB max (configurable via `MAX_CONTENT_LENGTH`)
- **File Type Validation**: Checks file extensions and MIME types
- **Username Validation**: Verifies GitHub user exists before fetching data
- **API Errors**: Graceful degradation with informative error messages
- **PDF Generation**: Try/catch blocks with detailed logging

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

## Testing

### Manual Testing

1. **Upload Test Files**:
   ```bash
   # Test PDF upload
   curl -X POST http://localhost:5000/api/upload \
     -F "file=@sample_resume.pdf"
   
   # Test text analysis
   curl -X POST http://localhost:5000/api/analyze \
     -H "Content-Type: application/json" \
     -d '{"text": "GitHub: github.com/octocat"}'
   ```

2. **Test Profile Fetching**:
   ```bash
   # Fetch profile data
   curl http://localhost:5000/api/github/octocat | jq
   
   # Download PDF
   curl http://localhost:5000/api/github/octocat/export \
     --output test_profile.pdf
   ```

3. **Test Rate Limit Fallback**:
   ```bash
   # Unset token to simulate rate limit
   unset GITHUB_API_TOKEN
   python app.py
   
   # Expected: Contribution stats return zeros, language distribution uses fallback
   ```

### Sample Resume Files

Place test resumes in `backend/uploads/` for manual testing:

- **PDF**: Resume with clickable GitHub links
- **DOCX**: Resume with hyperlinked text
- **TXT**: Plain text with `github.com/username` URL

### Health Check

```bash
curl http://localhost:5000/api/health
# Expected: {"status": "ok"}
```

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

### Security Considerations

- ✅ Use HTTPS in production
- ✅ Configure CORS with specific origins (not `*`)
- ✅ Never commit `.env` files
- ✅ Rotate GitHub tokens regularly
- ✅ Enable rate limiting middleware
- ✅ Use environment-specific configs

---

## Troubleshooting & FAQ

### Common Issues

#### 1. **Invalid GitHub Username After Restart**

**Problem**: API returns 404 or "GitHub user not found"

**Cause**: Missing or invalid `GITHUB_API_TOKEN`

**Solution**:
```bash
# Check token is set
echo $GITHUB_API_TOKEN

# Regenerate token at https://github.com/settings/tokens
# Ensure scopes: public_repo, read:user

# Update .env
GITHUB_API_TOKEN=ghp_new_token_here

# Restart server
python app.py
```

#### 2. **Contribution Stats Showing Zero**

**Problem**: `contribution_activity` returns `{total: 0, current_streak: 0, longest_streak: 0}`

**Cause**: GraphQL query requires authenticated token

**Solution**:
- Add `GITHUB_API_TOKEN` to backend `.env`
- Ensure token has `read:user` scope
- Verify token is active: `curl -H "Authorization: token $GITHUB_API_TOKEN" https://api.github.com/user`

#### 3. **Incomplete Language Distribution**

**Problem**: Only 1-2 languages shown instead of full breakdown

**Cause**: Rate limit on per-repo language API calls

**Solution**:
- Add GitHub token to increase rate limit (60 → 5000/hour)
- Backend falls back to primary language field when rate-limited
- Wait an hour for rate limit reset

#### 4. **CORS Errors in Browser**

**Problem**: `Access to fetch blocked by CORS policy`

**Solution**:
```python
# In backend/app.py, ensure:
CORS(app, resources={r"/api/*": {"origins": "*"}})

# For production, specify exact origin:
CORS(app, resources={r"/api/*": {"origins": "https://yourdomain.com"}})
```

#### 5. **PDF Generation Fails**

**Problem**: "Failed to generate PDF summary"

**Cause**: Missing ReportLab or network error fetching avatar

**Solution**:
```bash
# Reinstall ReportLab
pip install --upgrade reportlab

# Test avatar URL is accessible
curl -I https://avatars.githubusercontent.com/u/583231

# Check logs
tail -f backend/app.log
```

### Enable Debug Logging

```bash
# Set Flask debug mode
export FLASK_ENV=development
export FLASK_DEBUG=1
python app.py

# Or in app.py:
app.run(debug=True, host='0.0.0.0', port=5000)
```

### Log Locations

- **Backend**: Console output (use `logger.info()`, `logger.error()`)
- **Frontend**: Browser console (F12 → Console tab)
- **API Requests**: Network tab in browser DevTools

---

## Contributing

We welcome contributions! Here's how to get involved:

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

### Adding Screenshots

Replace placeholder images in `/public/screenshots/`:
1. Take high-quality screenshots (1920x1080 recommended)
2. Save as PNG with descriptive names
3. Update image paths in README.md
4. Commit and push changes

### Updating Documentation

- Update `README.md` for user-facing changes
- Update `SETUP.md` for setup/deployment changes
- Add JSDoc comments for new functions
- Include API examples for new endpoints

---


### Acknowledgements

This project is built with amazing open-source technologies:

- **[Next.js](https://nextjs.org/)** - React framework for production
- **[React](https://reactjs.org/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript
- **[Flask](https://flask.palletsprojects.com/)** - Lightweight Python web framework
- **[ReportLab](https://www.reportlab.com/)** - PDF generation library
- **[PyPDF2](https://pypdf2.readthedocs.io/)** - PDF manipulation library
- **[python-docx](https://python-docx.readthedocs.io/)** - DOCX file handling
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[GitHub API](https://docs.github.com/en/rest)** - REST and GraphQL APIs

Special thanks to the open-source community for making this project possible!

---

## Support

If you found this project helpful, consider:

- ⭐ **Starring** the repository
- 🐛 **Reporting bugs** via [GitHub Issues](https://github.com/yourusername/gittrackr/issues)
- 💡 **Suggesting features** in discussions
- 🤝 **Contributing** code or documentation
- 📢 **Sharing** with your network

---

## Contact

- **GitHub**: [@yourusername](https://github.com/vraval13)
- **Email**: ravalvyom17@gmail.com

---

<div align="center">

**Made with ❤️ by Vyom**

</div>
