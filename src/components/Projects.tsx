import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/content';
import { ExternalLink, Github, Code2 } from 'lucide-react';

export default function Projects() {
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
    <section id="projects" ref={sectionRef} className="section-padding">
      <div className="container-premium">
        <div className="reveal text-center mb-16 lg:mb-20">
          <span className="label block mb-4">Projects</span>
          <h2 className="display-lg text-white">
            Featured <span className="gradient-text">Work</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="reveal group glass-premium rounded-2xl p-6 sm:p-8 transition-all duration-500"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.3s ease, border-color 0.3s ease',
        animationDelay: `${index * 100}ms`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xs font-mono text-gray-600">0{project.id}</span>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/15 to-cyan-500/10 flex items-center justify-center group-hover:from-blue-500/25 group-hover:to-cyan-500/15 transition-all shadow-lg shadow-blue-500/5">
          <Code2 size={18} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
        </div>
      </div>

      {/* Title */}
      <h3 className="heading-md text-white mb-3 group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="body-sm mb-5">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-blue-500/8 text-blue-300 border border-blue-500/15">
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center gap-3">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="View on GitHub">
            <Github size={16} />
          </a>
        )}
        {project.liveDemo && (
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="View live demo">
            <ExternalLink size={16} />
          </a>
        )}
        {!project.github && !project.liveDemo && (
          <span className="text-xs text-gray-600 italic">Links coming soon</span>
        )}
      </div>
    </div>
  );
}
