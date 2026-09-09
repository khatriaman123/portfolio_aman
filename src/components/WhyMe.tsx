import { useEffect, useRef } from 'react';
import { whyMePoints } from '../data/content';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface WhyMeProps {
  onNavigate: (href: string) => void;
  playClick: () => void;
}

export default function WhyMe({ onNavigate, playClick }: WhyMeProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-me" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="text-xs tracking-widest text-cyan-400 uppercase">Why Choose Me</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Why Work <span className="gradient-text">With Me</span>
          </h2>
        </div>

        <div className="reveal max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-4">
            {whyMePoints.map((point, i) => (
              <div
                key={i}
                className="group flex items-start gap-3 glass-light rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-500/20 transition-colors">
                  <CheckCircle2 size={14} className="text-blue-400" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{point}</span>
              </div>
            ))}
          </div>

          <div className="reveal text-center mt-12">
            <button
              onClick={() => { playClick(); onNavigate('#contact'); }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-sm tracking-wide hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <Sparkles size={16} />
              LET'S GROW TOGETHER
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
