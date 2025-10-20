import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail, Briefcase } from 'lucide-react';

const HomeFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    about: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' }
    ],
    aiTools: [
      { label: 'Resume Analyzer', href: '/register' },
      { label: 'JD Matcher', href: '/register' },
      { label: 'HR Report', href: '/register' }
    ],
    resources: [
      { label: 'Blog', href: '/blog' },
      { label: 'Help Center', href: '/help' },
      { label: 'Newsletter', href: '/newsletter' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Use', href: '/terms' }
    ]
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-purple-600 hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">AI Tools</h4>
            <ul className="space-y-2">
              {footerLinks.aiTools.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-purple-600 hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-purple-600 hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.href}
                    className="text-gray-600 hover:text-purple-600 hover:underline transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Logo and CIN */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">TalentBoardX</span>
              </Link>
              <p className="text-xs text-gray-500">CIN: U62011PN2025PTC244154</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-gray-600 group-hover:text-white" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors group"
              >
                <Github className="w-5 h-5 text-gray-600 group-hover:text-white" />
              </a>
              <a 
                href="mailto:contact@talentboardx.com"
                className="w-10 h-10 bg-gray-200 hover:bg-purple-600 rounded-full flex items-center justify-center transition-colors group"
              >
                <Mail className="w-5 h-5 text-gray-600 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              © {currentYear} TalentBoardX by JASIQ Labs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
