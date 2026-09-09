import { useEffect, useRef } from 'react';
import { MessageSquare, Clock } from 'lucide-react';

export default function Testimonials() {
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
    <section id="testimonials" ref={sectionRef} className="relative py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal text-center mb-16">
          <span className="text-xs tracking-widest text-cyan-400 uppercase">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Client <span className="gradient-text">Feedback</span>
          </h2>
        </div>

        <div className="reveal">
          <div className="glass-light rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-blue-500/10 flex items-center justify-center">
              <MessageSquare size={28} className="text-blue-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3">
              Testimonials Coming Soon
            </h3>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              Real client testimonials will be featured here. Every project delivers results that speak for themselves.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-gray-500">
              <Clock size={14} />
              <span>Updated regularly as new projects are completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
