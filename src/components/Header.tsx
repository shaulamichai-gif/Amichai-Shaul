import { useState, useEffect } from 'react';
import { Menu, X, Calendar, ChevronDown, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminVisible: boolean;
}

export default function Header({ onAdminToggle, isAdminVisible }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Konzept', href: '#konzept' },
    { name: 'Speisekarte', href: '#speisekarte' },
    { name: 'Öffnungszeiten', href: '#oeffnungszeiten' },
    { name: 'Reservieren', href: '#reservierung' }
  ];

  return (
    <header 
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-schlei-900/90 backdrop-blur-md border-b border-gold-500/10 shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Subtitle */}
          <a href="#" className="group flex flex-col justify-center select-none" id="header-logo">
            <span className="font-serif text-lg sm:text-2xl font-bold tracking-widest text-white transition group-hover:text-gold-400 whitespace-nowrap">
              AM SCHLEIECK
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-widest text-gold-500 uppercase font-light -mt-1 block whitespace-nowrap">
              Kitchen Maasholm Fusion
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-slate-300 hover:text-gold-400 text-sm font-medium tracking-wide transition-colors relative group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action buttons - Removed as requested */}
          <div className="hidden md:block"></div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              id="mobileMenuBtn"
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 hover:text-gold-400 p-2 focus:outline-none"
              aria-label="Navigation umschalten"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobileMenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-schlei-800 border-b border-gold-500/10 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 text-center flex flex-col items-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-2.5 text-slate-200 hover:text-gold-400 font-medium text-base transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
