import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Linkedin, Instagram, Send, CheckCircle, Sparkles } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import NeumorphCard from '../components/NeumorphCard';
import SplitText from '../components/SplitText';
import RevealOnScroll from '../components/RevealOnScroll';
import MagneticElement from '../components/MagneticElement';
import Tooltip from '../components/Tooltip';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub', color: '#6366f1' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: '#8b5cf6' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: '#ec4899' },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-padding relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 50%)',
          filter: 'blur(120px)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <RevealOnScroll className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles size={16} className="text-[#6366f1]" />
            <span className="text-sm text-zinc-400">Let's Connect</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk']">
            <SplitText animation="slide">Get In Touch</SplitText>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
            Have a project in mind? I'd love to hear about it. Let's create something amazing together.
          </p>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left - Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <RevealOnScroll direction="left">
              <GlassCard className="p-6" intensity="medium">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366f1]/20 to-[#6366f1]/5 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Mail size={24} className="text-[#6366f1]" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:hello@viivek.in"
                      className="text-zinc-400 hover:text-[#6366f1] transition-colors"
                    >
                      hello@viivek.in
                    </a>
                  </div>
                </div>
              </GlassCard>
            </RevealOnScroll>

            <RevealOnScroll direction="left" delay={0.1}>
              <GlassCard className="p-6" intensity="medium">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/5 flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <MapPin size={24} className="text-[#8b5cf6]" />
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Location</h4>
                    <p className="text-zinc-400">Ranchi, India</p>
                    <p className="text-sm text-zinc-500">Available for remote work worldwide</p>
                  </div>
                </div>
              </GlassCard>
            </RevealOnScroll>

            {/* Social Links */}
            <RevealOnScroll direction="left" delay={0.2}>
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <Tooltip key={social.label} content={social.label}>
                        <motion.a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative w-14 h-14 rounded-xl glass flex items-center justify-center overflow-hidden group"
                          whileHover={{ scale: 1.1, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          data-cursor={social.label}
                        >
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ background: social.color }}
                          />
                          <Icon size={22} className="relative z-10 text-zinc-400 group-hover:text-white transition-colors" />
                        </motion.a>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </RevealOnScroll>

            {/* Availability Badge */}
            <RevealOnScroll direction="left" delay={0.3}>
              <NeumorphCard className="p-4 inline-flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-sm text-zinc-300">Available for new projects</span>
              </NeumorphCard>
            </RevealOnScroll>
          </div>

          {/* Right - Form */}
          <RevealOnScroll direction="right" className="lg:col-span-3">
            <GlassCard className="p-8" intensity="strong">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div className="relative">
                    <motion.label
                      htmlFor="name"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'name' || formData.name
                          ? '-top-2.5 text-xs text-[#6366f1] bg-[#12121a] px-2'
                          : 'top-4 text-zinc-500'
                      }`}
                    >
                      Your Name
                    </motion.label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="input-field pt-4"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'name' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative">
                    <motion.label
                      htmlFor="email"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'email' || formData.email
                          ? '-top-2.5 text-xs text-[#6366f1] bg-[#12121a] px-2'
                          : 'top-4 text-zinc-500'
                      }`}
                    >
                      Your Email
                    </motion.label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="input-field pt-4"
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                      initial={{ width: 0 }}
                      animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div className="relative">
                  <motion.label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      focusedField === 'message' || formData.message
                        ? '-top-2.5 text-xs text-[#6366f1] bg-[#12121a] px-2'
                        : 'top-4 text-zinc-500'
                    }`}
                  >
                    Your Message
                  </motion.label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="input-field pt-4 resize-none"
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                    initial={{ width: 0 }}
                    animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Submit Button */}
                <MagneticElement strength={0.2}>
                  <button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full btn-primary flex items-center justify-center gap-2 ${
                      isSubmitting || isSubmitted ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : isSubmitted ? (
                      <>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <CheckCircle size={20} />
                        </motion.div>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </MagneticElement>
              </form>
            </GlassCard>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
