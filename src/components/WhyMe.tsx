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
    <section id="why-me" ref={sectionRef} className="section-padding">
      <div className="container-premium">
        <div className="reveal text-center mb-16 lg:mb-20">
          <span className="label block mb-4">Why Choose Me</span>
          <h2 className="display-lg text-white">
            Why Work <span className="gradient-text">With Me</span>
          </h2>
        </div>

        <div className="reveal max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-3">
            {whyMePoints.map((point, i) => (
              <div
                key={i}
                className="group flex items-start gap-3.5 glass-glow rounded-xl p-4 transition-all duration-300 hover:scale-[1.02] cursor-default"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:from-blue-500/25 group-hover:to-cyan-500/15 transition-all shadow-lg shadow-blue-500/5">
                  <CheckCircle2 size={14} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">{point}</span>
              </div>
            ))}
          </div>

          <div className="reveal text-center mt-12">
            <button
              onClick={() => { playClick(); onNavigate('#contact'); }}
              className="btn-primary group"
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
