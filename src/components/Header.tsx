import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useConfig } from '@/src/hooks/useConfig';

export default function Header() {
  const config = useConfig();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: '포트폴리오', path: '/' },
    { name: '서비스', path: '/services' },
    { name: '문의하기', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img 
                src="https://postfiles.pstatic.net/MjAyNjA0MDZfMjAz/MDAxNzc1NDY1MjEwNjQ2.etrHgz_EbFMS_vHHIcFreyrJO_sK0ITc02aOQvAt-78g.k0ft_SB_ed7S-Uge2Pb2OGLaavMtcP9MQ4-dQHY28nIg.PNG/logo.png?type=w966" 
                alt={config.brandName} 
                className="h-8 md:h-11 w-auto object-contain" 
                referrerPolicy="no-referrer"
              />
            </Link>
            <div className="flex items-center space-x-4 border-l border-gray-200 pl-4">
              <a href={config.kakaoUrl} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" title="카카오톡">
                <img 
                  src="https://postfiles.pstatic.net/MjAyNjA0MDZfMjgg/MDAxNzc1NDYyNjI5NzQz.5wfbJ13fBZpMJ1J12xEEbnoaH_IXQ7dGM6W4gFbwNywg.sWEW5GHuqawiZGW0WUeaasRh93zJoRL6KQjmPz3FJpUg.PNG/1.png" 
                  alt="카카오톡" 
                  className="w-6 h-6 object-contain" 
                  referrerPolicy="no-referrer"
                />
              </a>
              <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" title="인스타그램">
                <img 
                  src="https://postfiles.pstatic.net/MjAyNjA0MDZfMTA4/MDAxNzc1NDYyNjI5NzUw.xhhbCcHL7AEDXfnaA65sJoJPqzK3bcBkRYU_-iLNh5wg.kCC_epOq4jIpZwBjUsfQ-QT_TT09SL3feYYNh8SSCsYg.PNG/2.png" 
                  alt="인스타그램" 
                  className="w-6 h-6 object-contain" 
                  referrerPolicy="no-referrer"
                />
              </a>
              <a href={config.smartStoreUrl} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80" title="스마트스토어">
                <img 
                  src="https://postfiles.pstatic.net/MjAyNjA0MDZfNDIg/MDAxNzc1NDYyNjI5NzUw.x2N946E-UDTi4sZ7b9Bd9Iso1SPxThfqehsnAKvZue4g.FPTq-zFgVluofm_w7sgwDmiXaWTeBSbhnQwTg5jf0w8g.PNG/3.png" 
                  alt="스마트스토어" 
                  className="w-6 h-6 object-contain" 
                  referrerPolicy="no-referrer"
                />
              </a>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  location.pathname === item.path ? "text-blue-600" : "text-gray-600"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-sm font-medium text-gray-400 hover:text-gray-900 transition-colors"
            >
              관리자
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "block px-3 py-4 text-base font-medium rounded-md",
                    location.pathname === item.path
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-4 text-base font-medium text-gray-400 hover:bg-gray-50"
              >
                관리자 페이지
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
