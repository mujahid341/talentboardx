import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const PublicNavbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Jobs', href: '/register?role=jobseeker' },
    { label: 'AI Tools', href: '/register' },
    { label: 'Employers', href: '/register?role=employer' },
    { label: 'Contact', href: '/contact' }
  ];

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'employer') return '/employer/dashboard';
    return '/jobs';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5B21B6] to-[#06B6D4] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#5B21B6] to-[#06B6D4] bg-clip-text text-transparent">
              TalentBoardX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Button
                onClick={() => navigate(getDashboardLink())}
                variant="primary"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-purple-600 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <hr className="my-2" />
            
            {user ? (
              <Button
                onClick={() => {
                  navigate(getDashboardLink());
                  setMobileMenuOpen(false);
                }}
                variant="primary"
                className="w-full"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Link to="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link to="/register" className="block" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;
