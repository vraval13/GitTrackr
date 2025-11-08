# GitHub Resume Analyzer

A full-stack web application that analyzes your resume and creates an interactive GitHub profile analytics dashboard.

## Features

- **Resume Upload/Paste**: Support for PDF, DOCX, or plain text resumes
- **Automatic GitHub Detection**: Regex-based extraction of GitHub profile links
- **GitHub Profile Analytics**: Display user stats, followers, public repositories
- **Repository Showcase**: Beautiful card layout showing all repositories with:
  - Star count and fork count
  - Programming language tags
  - Repository description
  - Direct links to GitHub
- **Sorting & Filtering**: Sort repositories by stars, name, or recency
- **Dark Mode UI**: Modern, dark-themed interface optimized for developer experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Error Handling**: Graceful error messages and validation

## Tech Stack

### Frontend
- **Framework**: Next.js 16+ (App Router)
- **UI Library**: React 19+
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **HTTP Client**: Fetch API

### Backend
- **Framework**: Flask
- **Document Processing**: PyPDF2, python-docx
- **API Integration**: GitHub REST API
- **CORS**: Flask-CORS

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: None (stateless API)

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.8+
- Git

### Local Development

**Frontend Setup**:
\`\`\`bash
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
npm run dev
\`\`\`
Frontend available at `http://localhost:3000`

**Backend Setup**:
\`\`\`bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
\`\`\`
Backend API available at `http://localhost:5000`

### File Structure

\`\`\`
project-root/
├── app/
│   ├── page.tsx              # Home page
│   ├── dashboard/
│   │   └── page.tsx          # Dashboard page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   └── error.tsx             # Error boundary
├── components/
│   ├── file-upload.tsx       # File upload component
│   ├── resume-input.tsx      # Text input component
│   ├── github-dashboard.tsx  # Dashboard component
│   ├── repository-card.tsx   # Repo card component
│   ├── user-stats.tsx        # Stats component
│   ├── loading-spinner.tsx   # Loading spinner
│   └── error-boundary.tsx    # Error boundary
├── lib/
│   └── api.ts               # API client functions
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
├── .env.local              # Local environment variables
├── SETUP.md               # Setup guide
├── DEPLOYMENT.md          # Deployment guide
└── README.md              # This file
\`\`\`

## API Endpoints

### Resume Processing
- `POST /api/upload` - Upload resume file (PDF/DOCX)
- `POST /api/analyze` - Analyze resume text

### GitHub Integration
- `GET /api/github/<username>` - Fetch GitHub profile and repositories

### Health Check
- `GET /api/health` - API health status

## Usage

1. **Upload or Paste Resume**
   - Choose to upload a PDF/DOCX or paste plain text
   - Application automatically extracts GitHub profile link

2. **View GitHub Analytics**
   - See profile stats: followers, following, public repos
   - Browse all repositories with stars and fork counts
   - Filter by programming language

3. **Manage Analysis**
   - Click "New Analysis" to start over
   - Refresh data anytime

## Environment Variables

### Frontend
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000
\`\`\`

### Backend
\`\`\`
GITHUB_API_TOKEN=your_github_token  # Optional, for higher rate limits
\`\`\`

## Rate Limiting

Without GitHub API token: 60 requests/hour
With GitHub API token: 5000 requests/hour

To get a token:
1. Visit https://github.com/settings/tokens
2. Click "Generate new token"
3. Select `public_repo` scope
4. Copy and set as `GITHUB_API_TOKEN`

## Error Handling

The application handles:
- Invalid file formats
- Missing GitHub links in resume
- Invalid GitHub usernames
- API rate limiting
- Network errors
- File size limits (10MB max)

## Performance Optimization

- Lazy loading of repository images
- Responsive image optimization
- Efficient data fetching from GitHub API
- Client-side sorting (no additional API calls)

## Security

- Input validation and sanitization
- No storage of uploaded files (deleted after processing)
- CORS properly configured
- Environment variables for sensitive data
- No client-side storage of API tokens

## Troubleshooting

### CORS Errors
Ensure backend is running and `NEXT_PUBLIC_API_URL` is set correctly.

### No GitHub Link Found
Verify the resume contains a valid GitHub profile URL (e.g., `github.com/username`)

### API Rate Limit Hit
Add a GitHub API token to your backend `.env` file for higher limits.

## Future Enhancements

- GitHub contribution graph visualization
- Resume parsing improvements
- User authentication and saved profiles
- Profile comparison feature
- Export dashboard as PDF
- GitHub trending repositories
- Advanced filtering options

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Review the [SETUP.md](./SETUP.md) guide
- Check the [DEPLOYMENT.md](./DEPLOYMENT.md) guide
\`\`\`
