import { personalInfo, navLinks } from '../data/content';
import { Linkedin, Github, Instagram, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (href: string) => void;
  playClick: () => void;
}

export default function Footer({ onNavigate, playClick }: FooterProps) {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8">
      <div className="container-premium">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold shadow-lg shadow-blue-500/20">
                A
              </div>
              <span className="text-sm font-semibold tracking-wide text-white/90">AMAN WEB CRAFT</span>
            </div>
            <p className="text-xs text-gray-500 tracking-wider font-medium">{personalInfo.tagline}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin size={12} className="text-blue-400" />
              <span>{personalInfo.location}</span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              <Mail size={14} className="text-blue-400 flex-shrink-0" /> {personalInfo.email}
            </a>
            <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              <Phone size={14} className="text-blue-400 flex-shrink-0" /> {personalInfo.phone}
            </a>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.slice(0, 8).map((link) => (
                <button
                  key={link.href}
                  onClick={() => { playClick(); onNavigate(link.href); }}
                  className="text-left text-sm text-gray-400 hover:text-cyan-400 transition-colors py-0.5"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social & CTA */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white">Connect</h4>
            <div className="flex gap-2.5">
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href={personalInfo.instagram} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => { playClick(); onNavigate('#contact'); }}
                className="btn-primary text-xs py-3"
              >
                LET'S GROW TOGETHER <ArrowRight size={12} />
              </button>
              <a
                href="/resume.pdf"
                download="Aman-Web-Craft-Resume.pdf"
                className="btn-secondary text-xs py-3"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-6 text-center">
          <p className="text-xs text-gray-600">
            © 2026 Aman Web Craft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
