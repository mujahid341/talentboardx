import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, Menu, X, User, LogOut, Settings, 
  LayoutDashboard, FileText, Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
  const { user, logout, isJobSeeker, isEmployer, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const getDashboardLink = () => {
    if (isAdmin) return '/admin';
    if (isEmployer) return '/employer/dashboard';
    return '/jobs';
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={getDashboardLink()} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5B21B6] to-[#06B6D4] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#5B21B6] to-[#06B6D4] bg-clip-text text-transparent">TalentBoardX</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {isJobSeeker && (
              <>
                <Link
                  to="/jobs"
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Find Jobs
                </Link>
                <Link
                  to="/applications"
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  My Applications
                </Link>
              </>
            )}

            {isEmployer && (
              <>
                <Link
                  to="/employer/dashboard"
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/employer/post-job"
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Post Job
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="text-gray-700 hover:text-primary font-medium transition-colors"
                >
                  Users
                </Link>
              </>
            )}

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              </button>

              {profileMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileMenuOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Settings</span>
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {isJobSeeker && (
              <>
                <Link
                  to="/jobs"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Jobs
                </Link>
                <Link
                  to="/applications"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Applications
                </Link>
              </>
            )}

            {isEmployer && (
              <>
                <Link
                  to="/employer/dashboard"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/employer/post-job"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Post Job
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Users
                </Link>
              </>
            )}

            <hr />

            <Link
              to="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
