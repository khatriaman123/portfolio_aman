import { useEffect, useRef } from 'react';
import { personalInfo } from '../data/content';
import { Briefcase, MapPin } from 'lucide-react';

export default function Experience() {
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
    <section id="experience" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="text-xs tracking-widest text-cyan-400 uppercase">Experience</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Professional <span className="gradient-text">Journey</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="reveal relative">
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-cyan-500/30 to-transparent" />

          {personalInfo.experience.map((exp, i) => (
            <div key={i} className={`relative flex items-center mb-12 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
              {/* Timeline dot */}
              <div className="absolute left-6 sm:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50 z-10">
                <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30" />
              </div>

              {/* Content */}
              <div className={`ml-14 sm:ml-0 sm:w-[45%] ${i % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                <div className="glass-glow rounded-xl p-6 transition-all duration-300 group hover:scale-[1.02] cursor-default">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center shadow-lg shadow-blue-500/5 group-hover:shadow-blue-500/10 transition-all">
                      <Briefcase size={18} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                      <p className="text-sm text-cyan-400">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin size={14} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
