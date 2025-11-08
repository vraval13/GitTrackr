# GitHub Resume Analyzer - Setup Guide

## Prerequisites
- Node.js 18+ and npm/yarn
- Python 3.8+ and pip
- Git

## Frontend Setup (Next.js)

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Create `.env.local` file in the root directory:
   \`\`\`
   NEXT_PUBLIC_API_URL=http://localhost:5000
   \`\`\`

3. Run development server:
   \`\`\`bash
   npm run dev
   \`\`\`

   The frontend will be available at `http://localhost:3000`

## Backend Setup (Flask)

1. Navigate to backend directory:
   \`\`\`bash
   cd backend
   \`\`\`

2. Create a virtual environment:
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

4. Create `.env` file in the backend directory (optional, for higher GitHub API limits):
   \`\`\`
   GITHUB_API_TOKEN=your_github_token_here
   \`\`\`

   To get a GitHub token:
   - Go to https://github.com/settings/tokens
   - Click "Generate new token"
   - Select `public_repo` scope
   - Copy the token and paste it in `.env`

5. Run Flask server:
   \`\`\`bash
   python app.py
   \`\`\`

   The backend API will be available at `http://localhost:5000`

## Features

- Upload resume as PDF or DOCX
- Paste resume as plain text
- Automatic GitHub profile extraction
- Display GitHub user stats (followers, repos, etc.)
- Show top repositories sorted by stars
- Responsive design with dark mode
- Error handling and validation

## API Endpoints

- `POST /api/upload` - Upload resume file
- `POST /api/analyze` - Analyze resume text
- `GET /api/github/<username>` - Fetch GitHub profile and repositories
- `GET /api/health` - Health check

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Go to vercel.com and import the repository
3. Set `NEXT_PUBLIC_API_URL` environment variable
4. Deploy

### Backend (Render)
1. Create a Render account
2. Create a new Web Service
3. Connect your GitHub repository
4. Set environment variables (GITHUB_API_TOKEN)
5. Deploy

## Troubleshooting

- **CORS errors**: Ensure Flask is running on port 5000 and `NEXT_PUBLIC_API_URL` is set correctly
- **GitHub API rate limits**: Add a GitHub API token to `.env` for higher limits (60 requests/hour → 5000/hour)
- **File upload issues**: Ensure file size is under 10MB and format is PDF or DOCX
