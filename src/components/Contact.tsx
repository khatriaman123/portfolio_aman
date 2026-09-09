import { useState, useEffect, useRef } from 'react';
import { personalInfo, projectTypes, budgetRanges } from '../data/content';
import { Send, MessageCircle, Mail, Phone, User, Building2, Calendar, FileText, Link2, Paperclip, CheckCircle } from 'lucide-react';

interface ContactProps {
  playSuccess: () => void;
  playClick: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  deadline: string;
  description: string;
  referenceWebsite: string;
  attachment: File | null;
  contactMethod: 'EMAIL' | 'WHATSAPP';
}

export default function Contact({ playSuccess, playClick }: ContactProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState<FormData>({
    name: '', email: '', phone: '', company: '', projectType: '',
    budget: '', deadline: '', description: '', referenceWebsite: '',
    attachment: null, contactMethod: 'EMAIL',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

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

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.projectType) newErrors.projectType = 'Please select a project type';
    if (!form.description.trim()) newErrors.description = 'Project description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    playSuccess();

    if (form.contactMethod === 'EMAIL') {
      const subject = encodeURIComponent('New Project Inquiry - Aman Web Craft');
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\nProject Type: ${form.projectType}\nBudget: ${form.budget}\nDeadline: ${form.deadline}\nDescription: ${form.description}\nReference Website: ${form.referenceWebsite}${form.attachment ? `\nAttachment: ${form.attachment.name} (please attach separately)` : ''}\nPreferred Contact: EMAIL`
      );
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    } else {
      const msg = `*New Project Inquiry - Aman Web Craft*\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\nProject Type: ${form.projectType}\nBudget: ${form.budget}\nDeadline: ${form.deadline}\nDescription: ${form.description}\nReference Website: ${form.referenceWebsite}${form.attachment ? `\nAttachment: ${form.attachment.name} (please attach separately in WhatsApp)` : ''}\nPreferred Contact: WHATSAPP`;
      const url = `https://wa.me/91${personalInfo.phone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }

    setSubmitted(true);
  };

  const updateField = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" ref={sectionRef} className="section-padding">
      <div className="container-premium">
        <div className="reveal text-center mb-16 lg:mb-20">
          <span className="label block mb-4">Contact</span>
          <h2 className="display-lg text-white">
            Let's Build <span className="gradient-text">Something Great</span>
          </h2>
          <p className="body-lg mt-4 max-w-lg mx-auto">
            Ready to start your project? Fill out the form below and I'll get back to you.
          </p>
        </div>

        {submitted ? (
          <div className="reveal glass-premium rounded-2xl p-8 sm:p-12 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500/15 to-emerald-500/10 flex items-center justify-center shadow-lg shadow-green-500/10">
              <CheckCircle size={28} className="text-green-400" />
            </div>
            <h3 className="heading-lg text-white mb-3">Inquiry Prepared!</h3>
            {form.contactMethod === 'EMAIL' ? (
              <p className="body-md">
                Your inquiry is ready. Your email application will open with the details.
              </p>
            ) : (
              <p className="body-md">
                WhatsApp has been opened with your prepared inquiry. {form.attachment && 'Please attach the file manually in WhatsApp as browsers cannot automatically attach files.'}
              </p>
            )}
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', projectType: '', budget: '', deadline: '', description: '', referenceWebsite: '', attachment: null, contactMethod: 'EMAIL' }); }}
              className="btn-secondary mt-6"
            >
              Send Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="reveal glass-premium rounded-2xl p-6 sm:p-8 lg:p-10 max-w-4xl mx-auto space-y-5">
            {/* Contact Method Toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6">
              <span className="text-sm text-gray-400 font-medium">Send via:</span>
              <div className="flex rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => { updateField('contactMethod', 'EMAIL'); playClick(); }}
                  className={`px-5 py-2.5 text-xs font-semibold transition-all flex items-center gap-2 ${form.contactMethod === 'EMAIL' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Mail size={14} /> EMAIL
                </button>
                <button
                  type="button"
                  onClick={() => { updateField('contactMethod', 'WHATSAPP'); playClick(); }}
                  className={`px-5 py-2.5 text-xs font-semibold transition-all flex items-center gap-2 ${form.contactMethod === 'WHATSAPP' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <MessageCircle size={14} /> WHATSAPP
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><User size={12} /> Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full px-4 py-3 input-glow ${errors.name ? 'border-red-500/50' : ''}`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><Mail size={12} /> Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className={`w-full px-4 py-3 input-glow ${errors.email ? 'border-red-500/50' : ''}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><Phone size={12} /> Phone / WhatsApp</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-3 input-glow"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><Building2 size={12} /> Company / Business</label>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => updateField('company', e.target.value)}
                  className="w-full px-4 py-3 input-glow"
                  placeholder="Your company name"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><FileText size={12} /> Project Type *</label>
                <select
                  value={form.projectType}
                  onChange={(e) => updateField('projectType', e.target.value)}
                  className={`w-full px-4 py-3 input-glow ${errors.projectType ? 'border-red-500/50' : ''}`}
                >
                  <option value="" className="bg-navy-900">Select project type</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t} className="bg-navy-900">{t}</option>
                  ))}
                </select>
                {errors.projectType && <p className="text-[11px] text-red-400">{errors.projectType}</p>}
              </div>

              {/* Budget */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 font-medium">Budget Range</label>
                <select
                  value={form.budget}
                  onChange={(e) => updateField('budget', e.target.value)}
                  className="w-full px-4 py-3 input-glow"
                >
                  <option value="" className="bg-navy-900">Select budget</option>
                  {budgetRanges.map((b) => (
                    <option key={b} value={b} className="bg-navy-900">{b}</option>
                  ))}
                </select>
              </div>

              {/* Deadline */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><Calendar size={12} /> Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) => updateField('deadline', e.target.value)}
                  className="w-full px-4 py-3 input-glow"
                />
              </div>

              {/* Reference Website */}
              <div className="space-y-1.5">
                <label className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><Link2 size={12} /> Reference Website</label>
                <input
                  type="url"
                  value={form.referenceWebsite}
                  onChange={(e) => updateField('referenceWebsite', e.target.value)}
                  className="w-full px-4 py-3 input-glow"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><FileText size={12} /> Project Description *</label>
              <textarea
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 input-glow resize-none ${errors.description ? 'border-red-500/50' : ''}`}
                placeholder="Describe your project requirements..."
              />
              {errors.description && <p className="text-[11px] text-red-400">{errors.description}</p>}
            </div>

            {/* Attachment */}
            <div className="space-y-1.5">
              <label className="text-xs text-gray-400 flex items-center gap-1.5 font-medium"><Paperclip size={12} /> Attachment</label>
              <input
                type="file"
                onChange={(e) => setForm(prev => ({ ...prev, attachment: e.target.files?.[0] || null }))}
                className="w-full px-4 py-3 input-glow file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-blue-500/15 file:text-blue-300 file:font-medium"
              />
              {form.attachment && form.contactMethod === 'WHATSAPP' && (
                <p className="text-[11px] text-yellow-400">
                  Note: Please attach "{form.attachment.name}" manually in WhatsApp.
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              onClick={playClick}
              className="btn-primary w-full sm:w-auto"
            >
              {form.contactMethod === 'EMAIL' ? <Send size={16} /> : <MessageCircle size={16} />}
              Send Inquiry via {form.contactMethod}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
