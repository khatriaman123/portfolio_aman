import { useState, useCallback, useEffect, lazy, Suspense } from 'react';
import { useSound } from './hooks/useSound';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import WhyMe from './components/WhyMe';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleField from './components/ParticleField';
import ResumeModal from './components/ResumeModal';
import { Volume2, VolumeX } from 'lucide-react';

// Sound toggle component
function SoundToggle({ enabled, toggle }: { enabled: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-[999] w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-all"
      aria-label={enabled ? 'Mute sounds' : 'Enable sounds'}
    >
      {enabled ? <Volume2 size={16} className="text-blue-400" /> : <VolumeX size={16} className="text-gray-500" />}
    </button>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const { enabled, toggle, playClick, playHover, playSuccess } = useSound();

  const handleLoadingComplete = useCallback(() => {
    setLoading(false);
  }, []);

  const handleNavigate = useCallback((href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (loading) return;

    let lenisInstance: any = null;

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
        });

        const raf = (time: number) => {
          lenisInstance?.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch (e) {
        // Lenis not available, use native scroll
      }
    };

    initLenis();

    return () => {
      lenisInstance?.destroy();
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-navy-950 grid-bg">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Sound Toggle */}
      <SoundToggle enabled={enabled} toggle={toggle} />

      {/* Back to Top */}
      <BackToTop playClick={playClick} />

      {/* Navbar */}
      <Navbar onNavigate={handleNavigate} playClick={playClick} />

      {/* Main Content */}
      <main>
        <Hero onNavigate={handleNavigate} playClick={playClick} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <WhyMe onNavigate={handleNavigate} playClick={playClick} />
        <Testimonials />
        <Contact playSuccess={playSuccess} playClick={playClick} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} playClick={playClick} />

      {/* Resume Modal (global) */}
      <ResumeModal playClick={playClick} />

      {/* Background ambient effects */}
      <ParticleField />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
