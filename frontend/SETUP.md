# TalentBoardX Frontend - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Environment Setup**
```bash
# Copy the example environment file
cp .env.example .env

# Update the API URL if needed
# VITE_API_URL=http://localhost:5000/api
```

3. **Run Development Server**
```bash
npm run dev
```

The application will open at `http://localhost:3000`

4. **Build for Production**
```bash
npm run build
```

5. **Preview Production Build**
```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   └── ui/           # UI components (Button, Card, etc.)
│   ├── context/          # React Context (Auth)
│   ├── pages/            # Page components
│   │   ├── auth/         # Login, Register
│   │   ├── jobseeker/    # Job Feed, Job Detail, Applications
│   │   ├── employer/     # Dashboard, Post Job, Applications
│   │   └── admin/        # Admin Dashboard
│   ├── services/         # API services
│   ├── utils/            # Helper functions
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # Documentation
```

## 🎨 Design System

### Colors
- **Primary:** `#4F46E5` (Indigo)
- **Secondary:** `#06B6D4` (Cyan)
- **Background:** `#F9FAFB`
- **Success:** `#16A34A`
- **Danger:** `#DC2626`

### Typography
- **Font Family:** Inter, Poppins

### Components
All UI components are located in `src/components/ui/`:
- Button
- Input
- Card
- Badge
- Modal
- Select
- Textarea
- Loading

## 🔐 Authentication

### Demo Credentials

**Job Seeker:**
- Email: `jobseeker@demo.com`
- Password: `password123`

**Employer:**
- Email: `employer@demo.com`
- Password: `password123`

**Admin:**
- Email: `admin@demo.com`
- Password: `password123`

## 🛣️ Routes

### Public Routes
- `/login` - Login page
- `/register` - Registration page

### Job Seeker Routes
- `/jobs` - Job feed
- `/jobs/:id` - Job detail & apply
- `/applications` - My applications

### Employer Routes
- `/employer/dashboard` - Employer dashboard
- `/employer/post-job` - Post new job
- `/employer/jobs/:id/edit` - Edit job
- `/employer/jobs/:id/applications` - View applications
- `/employer/jobs/:id/applications/:applicationId` - Application detail

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/users` - Manage users

## 🎯 Features Implemented

### ✅ Authentication
- Login with role-based redirect
- Registration with role selection (Job Seeker/Employer)
- Protected routes
- Persistent authentication

### ✅ Job Seeker Features
- Browse jobs with search and filters
- View job details with AI match score
- Apply to jobs with resume upload
- AI resume analysis with strengths/weaknesses
- Track application status

### ✅ Employer Features
- Dashboard with statistics and charts
- Post and manage jobs
- View and filter applications
- AI-powered candidate matching
- Review applications with detailed analysis

### ✅ Admin Features
- Platform statistics
- User management (suspend/activate/promote)
- Flagged jobs moderation
- System overview

### ✅ UI/UX Features
- Fully responsive design
- Mobile-first approach
- Dark mode ready
- Smooth animations
- Loading states
- Error handling
- Toast notifications

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS for styling
- Keep components small and reusable
- Use proper TypeScript types (if migrating to TS)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔗 API Integration

The frontend expects a backend API at the URL specified in `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

### API Endpoints Expected

**Auth:**
- `POST /auth/login`
- `POST /auth/register`
- `GET /auth/me`

**Jobs:**
- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get job by ID
- `POST /jobs` - Create job (employer)
- `PUT /jobs/:id` - Update job (employer)
- `DELETE /jobs/:id` - Delete job (employer)
- `POST /jobs/:id/apply` - Apply to job

**Applications:**
- `GET /applications/my` - Get user's applications
- `GET /jobs/:id/applications` - Get job applications (employer)
- `PATCH /applications/:id/status` - Update application status

**Resume:**
- `POST /resume/upload` - Upload resume
- `POST /resume/analyze` - Analyze resume with AI

## 📱 Mobile Responsiveness

The application is fully responsive with breakpoints:
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

Features:
- Hamburger menu on mobile
- Card-based layouts on small screens
- Touch-friendly buttons
- Swipeable components

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#YOUR_COLOR',
        // ... other shades
      }
    }
  }
}
```

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation in `src/components/layout/Navbar.jsx`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js
server: {
  port: 3001
}
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues
- Check `.env` file exists and has correct API URL
- Verify backend is running
- Check CORS settings on backend

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
