import { Suspense, lazy } from 'react';
import { heroContent, personalInfo } from '../data/content';
import { ArrowRight, Code2 } from 'lucide-react';
import MagneticButton from './MagneticButton';

const HeroScene = lazy(() => import('./HeroScene'));

interface HeroProps {
  onNavigate: (href: string) => void;
  playClick: () => void;
}

export default function Hero({ onNavigate, playClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-transparent to-navy-950 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-transparent to-navy-950/80 z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="space-y-6">
          {/* Brand */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light text-xs tracking-widest text-cyan-400">
            <Code2 size={14} />
            <span>{personalInfo.brand}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-white">{heroContent.headline.split(' ').slice(0, 3).join(' ')} </span>
            <span className="gradient-text">{heroContent.headline.split(' ').slice(3).join(' ')}</span>
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg leading-relaxed">
            {heroContent.subtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <MagneticButton
              onClick={() => { playClick(); onNavigate('#contact'); }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-sm tracking-wide hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-2"
            >
              {heroContent.primaryCTA}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton
              onClick={() => { playClick(); onNavigate('#projects'); }}
              className="px-8 py-4 border border-gray-700 rounded-xl font-semibold text-sm tracking-wide text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300"
            >
              {heroContent.secondaryCTA}
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-blue-500 animate-pulse" />
        </div>
      </div>
    </section>
  );
}


