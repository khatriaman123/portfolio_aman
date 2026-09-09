import { useEffect, useRef } from 'react';
import { aboutContent, personalInfo } from '../data/content';
import { GraduationCap, MapPin, Briefcase, Globe, Cpu, Sparkles } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const icons = [GraduationCap, GraduationCap, Briefcase, MapPin, Globe, Cpu, Sparkles];

  return (
    <section id="about" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="reveal text-center mb-16">
          <span className="text-xs tracking-widest text-cyan-400 uppercase">About Me</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Know <span className="gradient-text">Who I Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="reveal space-y-6">
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {aboutContent.intro}
            </p>
            <p className="text-gray-400 leading-relaxed">
              Based in {personalInfo.location}, I bring together academic knowledge and practical experience to deliver solutions that make a real impact.
            </p>
          </div>

          {/* Right - Highlights */}
          <div className="reveal grid grid-cols-2 gap-3">
            {aboutContent.highlights.map((item, i) => {
              const Icon = icons[i] || Sparkles;
              return (
                <div
                  key={i}
                  className="glass-light rounded-xl p-4 flex items-center gap-3 hover:border-blue-500/30 transition-all duration-300 group hover:scale-[1.02]"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Icon size={16} className="text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-300 font-medium">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
