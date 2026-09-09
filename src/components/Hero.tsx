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
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden hero-gradient">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950 z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-transparent z-[1] pointer-events-none" />

      {/* Content - Two column on desktop */}
      <div className="relative z-10 container-premium w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen py-24 lg:py-0">
          {/* Left - Text content */}
          <div className="space-y-6 lg:space-y-8 max-w-2xl">
            {/* Brand badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-light text-xs tracking-widest text-cyan-400 font-medium">
              <Code2 size={14} className="text-cyan-400" />
              <span>{personalInfo.brand}</span>
            </div>

            {/* Headline */}
            <h1 className="display-xl text-white">
              <span className="block">Turning Ideas</span>
              <span className="block">Into Powerful</span>
              <span className="block gradient-text">Digital Experiences.</span>
            </h1>

            {/* Subtext */}
            <p className="body-lg max-w-lg">
              {heroContent.subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 pt-2">
              <MagneticButton
                onClick={() => { playClick(); onNavigate('#contact'); }}
                className="btn-primary group"
              >
                {heroContent.primaryCTA}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton
                onClick={() => { playClick(); onNavigate('#projects'); }}
                className="btn-secondary"
              >
                {heroContent.secondaryCTA}
              </MagneticButton>
            </div>
          </div>

          {/* Right - 3D scene is already positioned absolutely behind */}
          <div className="hidden lg:block relative h-[500px] xl:h-[600px]">
            {/* Spacer for 3D scene positioning */}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 rounded-full bg-blue-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
