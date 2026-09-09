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
    <section id="skills" ref={sectionRef} className="section-padding">
      <div className="container-premium">
        <div className="reveal text-center mb-16 lg:mb-20">
          <span className="label block mb-4">Skills</span>
          <h2 className="display-lg text-white">
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
        </div>

        <div className="reveal grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              className="group relative glass-glow rounded-xl p-4 sm:p-5 text-center transition-all duration-500 hover:scale-[1.03] cursor-default"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`w-11 h-11 mx-auto mb-3 rounded-lg bg-gradient-to-br ${categoryColors[skill.category] || 'from-blue-500 to-cyan-500'} flex items-center justify-center text-white font-bold text-sm opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                {skill.name.charAt(0)}
              </div>
              <h3 className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                {skill.name}
              </h3>
              <p className="text-[10px] text-gray-500 mt-1.5 uppercase tracking-wider font-medium">
                {skill.category}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
