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
    <section id="experience" ref={sectionRef} className="section-padding">
      <div className="container-premium">
        <div className="reveal text-center mb-16 lg:mb-20">
          <span className="label block mb-4">Experience</span>
          <h2 className="display-lg text-white">
            Professional <span className="gradient-text">Journey</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="reveal max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/40 via-cyan-500/20 to-transparent" />

            {personalInfo.experience.map((exp, i) => (
              <div key={i} className="relative flex items-start mb-10 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-6 sm:left-8 -translate-x-1/2 z-10">
                  <div className="w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50">
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30" />
                  </div>
                </div>

                {/* Content */}
                <div className="ml-14 sm:ml-16 flex-1">
                  <div className="glass-glow rounded-xl p-6 group cursor-default">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500/15 to-cyan-500/10 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/5">
                        <Briefcase size={20} className="text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="heading-md text-white mb-1">{exp.title}</h3>
                        <p className="text-sm font-medium text-cyan-400 mb-2">{exp.company}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <MapPin size={14} />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
