import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import { useAdminStore } from '../store/adminStore';

interface HeaderProps {
  onROICalculatorClick?: () => void;
  onUseCasesClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onROICalculatorClick, onUseCasesClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { incrementLogoClick, isAdminMode } = useAdminStore();
  
  const navigation = [
    { name: 'Features', href: 'features' },
    { name: 'Use Cases', href: 'use-cases', isPage: true },
    { name: 'ROI Calculator', href: 'roi-calculator', isPage: true },
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
    }
  };

  const isScrolled = scrollPosition > 10;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => incrementLogoClick()}
              className="flex items-center focus:outline-none"
            >
              <Sparkles className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">InfinitiFlow</span>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              item.isPage ? (
                <button
                  key={item.name}
                  onClick={() => handleNavigationClick(item)}
                  className="text-gray-600 hover:text-primary-600 transition-colors cursor-pointer font-medium text-sm"
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
                  className="text-gray-600 hover:text-primary-600 transition-colors cursor-pointer font-medium text-sm"
                >
                  {item.name}
                </Link>
              )
            ))}
            {isAdminMode && (
              <Link
                to="/admin"
                className="text-primary-600 hover:text-primary-700 transition-colors cursor-pointer font-medium text-sm"
              >
                Admin Panel
              </Link>
            )}
          </nav>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              size="md"
              variant="primary"
              className="ml-4"
            >
              Try for Free
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden bg-white"
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
                    className="block w-full text-left py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md px-3"
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
                    className="block py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md px-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              {isAdminMode && (
                <Link
                  to="/admin"
                  className="block py-3 text-base font-medium text-primary-600 hover:text-primary-700 hover:bg-gray-50 rounded-md px-3"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <div className="pt-4">
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