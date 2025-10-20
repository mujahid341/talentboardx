import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RootRedirect from './components/RootRedirect';
import MainLayout from './components/layout/MainLayout';

// Public Pages
import Home from './pages/Home';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Job Seeker Pages
import JobFeed from './pages/jobseeker/JobFeed';
import JobDetail from './pages/jobseeker/JobDetail';
import JobSeekerApplications from './pages/jobseeker/Applications';
import JobSeekerApplicationDetail from './pages/jobseeker/ApplicationDetail';

// Employer Pages
import EmployerDashboard from './pages/employer/Dashboard';
import PostJob from './pages/employer/PostJob';
import EmployerApplications from './pages/employer/Applications';
import ApplicationDetail from './pages/employer/ApplicationDetail';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes with Layout */}
          <Route element={<MainLayout />}>
            {/* Job Seeker Routes */}
            <Route
              path="/jobs"
              element={
                <ProtectedRoute allowedRoles={['jobseeker']}>
                  <JobFeed />
                </ProtectedRoute>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute allowedRoles={['jobseeker']}>
                  <JobDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications"
              element={
                <ProtectedRoute allowedRoles={['jobseeker']}>
                  <JobSeekerApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications/:id"
              element={
                <ProtectedRoute allowedRoles={['jobseeker']}>
                  <JobSeekerApplicationDetail />
                </ProtectedRoute>
              }
            />

            {/* Employer Routes */}
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/post-job"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/jobs/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <PostJob />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/jobs/:id/applications"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerApplications />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employer/jobs/:id/applications/:applicationId"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <ApplicationDetail />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Default Redirect - Smart redirect based on auth status */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
