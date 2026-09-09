import { useEffect, useRef } from 'react';
import { skills } from '../data/content';

export default function Skills() {
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

  const categoryColors: Record<string, string> = {
    Frontend: 'from-blue-500 to-blue-600',
    Backend: 'from-cyan-500 to-cyan-600',
    Database: 'from-purple-500 to-purple-600',
    Mobile: 'from-green-500 to-green-600',
    Language: 'from-orange-500 to-orange-600',
    Data: 'from-yellow-500 to-yellow-600',
    Tools: 'from-pink-500 to-pink-600',
    Deployment: 'from-emerald-500 to-emerald-600',
  };

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="text-xs tracking-widest text-cyan-400 uppercase">Skills</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
        </div>

        <div className="reveal grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="group relative glass-light rounded-xl p-4 sm:p-5 text-center hover:border-blue-500/30 transition-all duration-500 hover:scale-105 hover:-translate-y-1"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${categoryColors[skill.category] || 'from-blue-500 to-cyan-500'} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              <div className={`w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br ${categoryColors[skill.category] || 'from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold text-sm opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
                {skill.name.charAt(0)}
              </div>
              <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                {skill.name}
              </h3>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">
                {skill.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
