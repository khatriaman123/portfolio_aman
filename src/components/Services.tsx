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
    <section id="services" ref={sectionRef} className="section-padding">
      <div className="container-premium">
        <div className="reveal text-center mb-16 lg:mb-20">
          <span className="label block mb-4">Services</span>
          <h2 className="display-lg text-white">
            What I <span className="gradient-text">Offer</span>
          </h2>
        </div>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <div
                key={i}
                className="group glass-glow rounded-xl p-6 transition-all duration-500 hover:scale-[1.02] cursor-default"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/15 to-cyan-500/10 flex items-center justify-center mb-4 group-hover:from-blue-500/25 group-hover:to-cyan-500/15 transition-all shadow-lg shadow-blue-500/5">
                  <Icon size={22} className="text-blue-400 group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="heading-md text-white mb-2.5 group-hover:text-cyan-400 transition-colors">
                  {service.title}
                </h3>
                <p className="body-sm">
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
