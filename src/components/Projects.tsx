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
    <section id="projects" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="text-xs tracking-widest text-cyan-400 uppercase">Projects</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Featured <span className="gradient-text">Work</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
    setTilt({ x: y * -10, y: x * 10 });
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
      {/* Project number */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-gray-500">0{project.id}</span>
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-cyan-500/20 transition-all shadow-lg shadow-blue-500/5">
          <Code2 size={18} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-5">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech) => (
          <span key={tech} className="px-2.5 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 backdrop-blur-sm shadow-sm shadow-blue-500/5">
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3">
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
          <span className="text-xs text-gray-500 italic flex items-center">Links coming soon</span>
        )}
      </div>
    </div>
  );
}
