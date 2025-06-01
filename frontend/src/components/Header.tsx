import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import ThemeToggleButton from './ui/ThemeToggleButton'; // Import ThemeToggleButton
import { useAdminStore } from '../store/adminStore';

interface HeaderProps {
  onROICalculatorClick?: () => void;
  onUseCasesClick?: () => void;
  onBlogClick?: () => void;
  onLoginClick?: () => void; // Added onLoginClick prop
}

const Header: React.FC<HeaderProps> = ({ onROICalculatorClick, onUseCasesClick, onBlogClick, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isAdminMode } = useAdminStore(); // Removed incrementLogoClick
  
  const navigation = [
    { name: 'Features', href: 'features' },
    { name: 'Use Cases', href: 'use-cases', isPage: true },
    { name: 'ROI Calculator', href: 'roi-calculator', isPage: true },
    { name: 'Blog', href: 'blog', isPage: true },
    { name: 'Testimonials', href: 'testimonials' },
    { name: 'Pricing', href: 'pricing' },
    { name: 'FAQ', href: 'faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavigationClick = (item: typeof navigation[0]) => {
    if (item.isPage && item.href === 'roi-calculator' && onROICalculatorClick) {
      onROICalculatorClick();
    } else if (item.isPage && item.href === 'use-cases' && onUseCasesClick) {
      onUseCasesClick();
    } else if (item.isPage && item.href === 'blog' && onBlogClick) {
      onBlogClick();
    }
  };

  const isScrolled = scrollPosition > 10;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white dark:bg-gray-900 shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            {/* Removed onClick from logo button */}
            <button className="flex items-center focus:outline-none">
              <Sparkles className="h-8 w-8 text-primary-600 dark:text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">InfinitiFlow</span>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 items-center"> {/* Added items-center */}
            {navigation.map((item) => (
              item.isPage ? (
                <button
                  key={item.name}
                  onClick={() => handleNavigationClick(item)}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer font-medium text-sm"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer font-medium text-sm"
                >
                  {item.name}
                </Link>
              )
            ))}
            {!isAdminMode && onLoginClick && (
              <button
                onClick={onLoginClick}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer font-medium text-sm"
              >
                Admin Login
              </button>
            )}
            {isAdminMode && (
              <Link
                to="/admin" // This should ideally navigate within the React app, not a full page load
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 transition-colors cursor-pointer font-medium text-sm"
              >
                Admin Panel
              </Link>
            )}
          </nav>
          
          {/* Right section including CTA and Theme Toggle */}
          <div className="hidden md:flex items-center"> {/* New wrapper div */}
            <ThemeToggleButton /> {/* Add this */}
            <Button size="md" variant="primary" className="ml-4">
              Try for Free
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
             <ThemeToggleButton /> {/* Added ThemeToggleButton for mobile view beside hamburger */}
            <button
              className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 p-2 ml-2" // Added ml-2
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? <X size={24} className="dark:text-gray-300" /> : <Menu size={24} className="dark:text-gray-300" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-800" // Added dark mode bg
          >
            <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
              {navigation.map((item) => (
                item.isPage ? (
                  <button
                    key={item.name}
                    onClick={() => {
                      handleNavigationClick(item);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-3"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    spy={true}
                    smooth={true}
                    offset={-80}
                    duration={500}
                    className="block py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              {!isAdminMode && onLoginClick && (
                <button
                  onClick={() => {
                    if (onLoginClick) onLoginClick();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-3"
                >
                  Admin Login
                </button>
              )}
              {isAdminMode && (
                <Link
                  to="/admin" // This should ideally navigate within the React app
                  className="block py-3 text-base font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md px-3"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              {/* Theme toggle for mobile menu - moved from original plan to be inside the main list for better flow */}
              {/* The original plan had it in a separate div below, but this is cleaner */}
              <div className="flex justify-start py-2 px-3"> 
                  {/* <ThemeToggleButton />  // This was the planned location, but decided to put it near hamburger menu */}
              </div>
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700 mt-2"> {/* Adjusted padding and added border */}
                <Button
                  size="md"
                  variant="primary"
                  className="w-full"
                >
                  Try for Free
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;