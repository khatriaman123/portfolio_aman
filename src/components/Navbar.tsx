import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks, personalInfo } from '../data/content';

interface NavbarProps {
  onNavigate: (href: string) => void;
  playClick: () => void;
}

export default function Navbar({ onNavigate, playClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    playClick();
    setMobileOpen(false);
    onNavigate(href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
      scrolled ? 'glass shadow-lg shadow-blue-500/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button 
            onClick={() => handleClick('#home')}
            className="flex items-center gap-2 group"
            aria-label="Go to home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
              A
            </div>
            <span className="hidden sm:block text-sm font-semibold tracking-wider text-white/90">
              AMAN WEB CRAFT
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`relative px-3 py-2 text-xs font-medium tracking-wide rounded-lg transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-btn-secondary"
              onClick={playClick}
            >
              Resume
            </a>
            <button
              onClick={() => handleClick('#contact')}
              className="nav-btn-primary"
            >
              Let's Grow Together
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => { setMobileOpen(!mobileOpen); playClick(); }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
        mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="glass border-t border-blue-500/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`block w-full text-left px-4 py-3 text-sm rounded-lg transition-all ${
                activeSection === link.href.replace('#', '')
                  ? 'text-cyan-400 bg-cyan-400/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-800 flex gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-3 text-xs font-medium text-gray-300 border border-gray-700 rounded-lg"
            >
              Resume
            </a>
            <button
              onClick={() => handleClick('#contact')}
              className="flex-1 px-4 py-3 text-xs font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"
            >
              Let's Grow Together
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
