import { useEffect, useRef } from 'react';
import { services } from '../data/content';
import { Globe, User, Building2, ShoppingCart, Code2, Smartphone, Layers, Database, Atom, Brain, Wrench } from 'lucide-react';

const iconMap: Record<string, any> = {
  Globe, User, Building2, ShoppingCart, Code2, Smartphone, Layers, Database, Atom, Brain, Wrench,
};

export default function Services() {
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
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="text-xs tracking-widest text-cyan-400 uppercase">Services</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            What I <span className="gradient-text">Offer</span>
          </h2>
        </div>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <div
                key={i}
                className="group glass-glow rounded-xl p-6 transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1 cursor-default"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:from-blue-500/30 group-hover:to-cyan-500/20 transition-all shadow-lg shadow-blue-500/5 group-hover:shadow-blue-500/10">
                  <Icon size={22} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
