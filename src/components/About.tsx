import { useEffect, useRef } from 'react';
import { aboutContent, personalInfo } from '../data/content';
import { GraduationCap, MapPin, Briefcase, Globe, Cpu, Sparkles } from 'lucide-react';

export default function About() {
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

  const icons = [GraduationCap, GraduationCap, Briefcase, MapPin, Globe, Cpu, Sparkles];

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <div className="container-premium">
        {/* Section header */}
        <div className="reveal text-center mb-16 lg:mb-20">
          <span className="label block mb-4">About Me</span>
          <h2 className="display-lg text-white">
            Know <span className="gradient-text">Who I Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left - Text */}
          <div className="reveal space-y-5">
            <p className="body-lg">
              {aboutContent.intro}
            </p>
            <p className="body-md">
              Based in {personalInfo.location}, I bring together academic knowledge and practical experience to deliver solutions that make a real impact.
            </p>
          </div>

          {/* Right - Highlights */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3">
            {aboutContent.highlights.map((item, i) => {
              const Icon = icons[i] || Sparkles;
              return (
                <div
                  key={i}
                  className="glass-glow rounded-xl p-4 flex items-center gap-3.5 group cursor-default"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/15 to-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:from-blue-500/25 group-hover:to-cyan-500/15 transition-all shadow-lg shadow-blue-500/5">
                    <Icon size={18} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
