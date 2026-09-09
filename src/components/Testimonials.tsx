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
    <section id="testimonials" ref={sectionRef} className="section-padding">
      <div className="container-premium">
        <div className="reveal text-center mb-16 lg:mb-20">
          <span className="label block mb-4">Testimonials</span>
          <h2 className="display-lg text-white">
            Client <span className="gradient-text">Feedback</span>
          </h2>
        </div>

        <div className="reveal max-w-2xl mx-auto">
          <div className="glass-premium rounded-2xl p-8 sm:p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/10 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <MessageSquare size={28} className="text-blue-400" />
            </div>
            <h3 className="heading-lg text-white mb-3">
              Testimonials Coming Soon
            </h3>
            <p className="body-md max-w-md mx-auto mb-6">
              Real client testimonials will be featured here. Every project delivers results that speak for themselves.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-gray-600">
              <Clock size={14} />
              <span>Updated regularly as new projects are completed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
