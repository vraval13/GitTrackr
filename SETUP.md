# GitTrackr - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** and npm/yarn
- **Python 3.8+** and pip
- **Git**
- A **GitHub account** (for API token - optional but recommended)

---

## 🎨 Frontend Setup (Next.js)

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Create Environment File

Create a `.env.local` file in the **root directory**:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
```

✅ The frontend will be available at **`http://localhost:3000`**

---

## ⚙️ Backend Setup (Flask)

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate it
# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

**Required packages include:**
- Flask
- Flask-CORS
- PyPDF2
- python-docx
- requests
- Werkzeug
- reportlab

### 4. Create Environment File (Recommended)

Create a `.env` file in the **backend directory**:

```env
GITHUB_API_TOKEN=your_github_personal_access_token_here
```

#### 🔑 How to Get a GitHub Token:

1. Go to [GitHub Token Settings](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a descriptive name (e.g., "Resume Analyzer")
4. Select the following scopes:
   - ✅ `public_repo` (Access public repositories)
   - ✅ `read:user` (Read user profile data)
5. Click **"Generate token"**
6. Copy the token immediately (you won't see it again!)
7. Paste it in your `.env` file

**Benefits of using a token:**
- Without token: 60 requests/hour
- With token: 5,000 requests/hour
- Access to contribution data and detailed language stats

### 5. Run Flask Server

```bash
python app.py
```

✅ The backend API will be available at **`http://localhost:5000`**

---

## 🚀 Features

### Core Functionality
- 📄 **Upload resume** as PDF, DOCX, or TXT
- 📝 **Paste resume text** directly
- 🔍 **Automatic GitHub profile extraction** from resume
- 👤 **GitHub user statistics** (followers, repos, following)
- 📊 **Repository showcase** with sorting and filtering
- 🔥 **Contribution activity** (total contributions, current streak, longest streak)
- 💻 **Language distribution** across all repositories
- 📥 **PDF Export** - Download comprehensive profile summary
- 🎨 **Modern UI** with gradient effects and smooth animations
- 📱 **Fully responsive** design
- ⚡ **Real-time search** and filtering

### Advanced Features
- Search repositories by name/description
- Filter by programming language
- Sort by stars, name, or recent activity
- Visual contribution statistics
- Language usage percentages
- Professional PDF report generation

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/upload` | Upload resume file (PDF/DOCX/TXT) |
| `POST` | `/api/analyze` | Analyze resume text |
| `GET` | `/api/github/<username>` | Fetch GitHub profile, repos, contributions, languages |
| `GET` | `/api/github/<username>/export` | Export comprehensive PDF summary |

## 📦 Project Structure

```
GitTrackr/
├── app/                          # Next.js app directory
│   ├── page.tsx                  # Main landing page
│   └── layout.tsx                # Root layout
├── components/                   # React components
│   ├── github-dashboard.tsx      # Main dashboard component
│   ├── repository-card.tsx       # Repository display card
│   ├── user-stats.tsx           # User statistics component
│   └── upload-section.tsx       # Resume upload interface
├── backend/                      # Flask backend
│   ├── app.py                   # Main Flask application
│   ├── requirements.txt         # Python dependencies
│   ├── uploads/                 # Temporary file storage
│   └── .env                     # Backend environment variables
├── public/                       # Static assets
├── .env.local                   # Frontend environment variables
├── package.json                 # Node.js dependencies
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── SETUP.md                    # This file
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **CORS Errors**
```
Access to fetch at 'http://localhost:5000' has been blocked by CORS policy
```
**Solution:**
- Ensure Flask is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify `CORS(app, resources={r"/api/*": {"origins": "*"}})` in `app.py`

#### 2. **GitHub API Rate Limits**
```
API rate limit exceeded
```
**Solution:**
- Add a GitHub API token to backend `.env`
- Without token: 60 requests/hour
- With token: 5,000 requests/hour

#### 3. **File Upload Issues**
```
File too large or invalid format
```
**Solution:**
- Ensure file size is under 10MB
- Supported formats: PDF, DOCX, TXT
- Check file is not corrupted

#### 4. **Module Not Found Errors**
```
ModuleNotFoundError: No module named 'flask'
```
**Solution:**
- Activate virtual environment: `source venv/bin/activate`
- Reinstall dependencies: `pip install -r requirements.txt`

#### 5. **Port Already in Use**
```
Address already in use
```
**Solution:**
- Kill process on port 5000: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)
- Or change port in `app.py`: `app.run(port=5001)`

#### 6. **PDF Generation Fails**
```
Failed to generate PDF summary
```
**Solution:**
- Ensure `reportlab` is installed: `pip install reportlab`
- Check internet connection (for fetching avatars)
- Verify GitHub username exists
---

## 📊 Performance Tips

1. **Backend Caching**: Consider adding Redis for caching GitHub API responses
2. **Frontend Optimization**: Use Next.js Image component for avatars
3. **Lazy Loading**: Implement pagination for repositories (100+ repos)
4. **CDN**: Use Vercel's CDN for static assets
5. **Database**: Consider adding PostgreSQL for analytics

---

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🆘 Support

If you encounter any issues:

1. Check this SETUP.md file
2. Review the Troubleshooting section
3. Check GitHub Issues
4. Open a new issue with:
   - Error message
   - Steps to reproduce
   - Environment details (OS, Node version, Python version)

---

## 🎉 Success!

If everything is set up correctly, you should see:

✅ Frontend running on `http://localhost:3000`  
✅ Backend running on `http://localhost:5000`  
✅ Health check at `http://localhost:5000/api/health` returns `{"status": "ok"}`

**Happy coding! 🚀**
