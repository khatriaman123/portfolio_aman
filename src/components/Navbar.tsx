import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../data/content';

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (href: string) => {
    playClick();
    setMobileOpen(false);
    onNavigate(href);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
      scrolled ? 'glass shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="container-premium">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button 
            onClick={() => handleClick('#home')}
            className="flex items-center gap-2.5 group flex-shrink-0"
            aria-label="Go to home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold group-hover:scale-105 transition-transform shadow-lg shadow-blue-500/20">
              A
            </div>
            <span className="hidden sm:block text-sm font-semibold tracking-wide text-white/90">
              AMAN WEB CRAFT
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`relative px-3.5 py-2 text-[0.8rem] font-medium tracking-wide rounded-lg transition-all duration-300 ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Right side - Desktop */}
          <div className="hidden lg:flex items-center gap-2.5">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-btn-secondary"
              onClick={playClick}
            >
              View Resume
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
            className="lg:hidden btn-icon"
            onClick={() => { setMobileOpen(!mobileOpen); playClick(); }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-16 z-[999] transition-all duration-500 ${
        mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-navy-950/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div className={`relative glass border-t border-white/5 mx-4 mt-2 rounded-2xl overflow-hidden transition-all duration-500 ${
          mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="p-4 space-y-1 max-h-[calc(80vh-2rem)] overflow-y-auto">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-cyan-400 bg-cyan-400/5'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 mt-3 border-t border-white/5 flex flex-col gap-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full justify-center"
                onClick={() => setMobileOpen(false)}
              >
                View Resume
              </a>
              <button
                onClick={() => handleClick('#contact')}
                className="btn-primary w-full justify-center"
              >
                Let's Grow Together
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
