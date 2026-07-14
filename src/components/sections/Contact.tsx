import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Copy, ExternalLink, Check, LucideIcon } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface ContactCardProps {
  icon: LucideIcon | React.ComponentType<{ size: number; className?: string }>;
  title: string;
  value: string;
  link?: string;
  type: 'copy' | 'link';
  delay: number;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon: Icon, title, value, link, type, delay }) => {
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    if (type === 'copy') {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else if (link) {
      window.open(link, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card p-6 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-cyan-400/40 transition-all border border-white/5 bg-slate-900/30 cursor-pointer relative overflow-hidden"
      onClick={handleAction}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-white/10 group-hover:text-cyan-400 transition-all duration-300">
        <Icon size={24} className="text-slate-300 group-hover:text-cyan-400 transition-colors" />
      </div>
      
      <h3 className="text-lg font-black text-white mb-2 tracking-tight">{title}</h3>
      <p className="text-slate-400 font-bold text-sm mb-5 break-all max-w-[200px]">{value}</p>

      <div className="mt-auto pt-4 border-t border-white/5 w-full flex items-center justify-center gap-2 text-xs text-cyan-400 font-extrabold uppercase tracking-wider">
        {type === 'copy' ? (
          <>
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span className={copied ? "text-emerald-400" : ""}>{copied ? 'Copied' : 'Copy'}</span>
          </>
        ) : (
          <>
            <ExternalLink size={14} />
            <span>Open Link</span>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Dynamic glow decoration */}
      <div className="absolute bottom-[-100px] left-1/4 w-[400px] h-[300px] bg-pink-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto font-medium">
            I'm always open to discussing workflow automation, deep learning pipelines, AI applications, or new collaboration opportunities.
          </p>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <ContactCard 
            icon={Phone} 
            title="Phone" 
            value="+91 9849087868" 
            type="copy" 
            delay={0.1} 
          />
          <ContactCard 
            icon={Mail} 
            title="Email" 
            value="karurgourisankarreddy@gmail.com" 
            type="link" 
            link="mailto:karurgourisankarreddy@gmail.com"
            delay={0.2} 
          />
          <ContactCard 
            icon={FaGithub} 
            title="GitHub" 
            value="Shankar7868" 
            type="link" 
            link="https://github.com/Shankar7868"
            delay={0.3} 
          />
          <ContactCard 
            icon={FaLinkedin} 
            title="LinkedIn" 
            value="Karur Gouri Sankar Reddy" 
            type="link" 
            link="https://linkedin.com/in/karurgourisankarreddy"
            delay={0.4} 
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center text-slate-500 font-bold flex items-center justify-center gap-2 select-none"
        >
          <MapPin size={18} className="text-cyan-400 animate-bounce" />
          <span className="text-xs uppercase tracking-widest font-mono">Based in India</span>
        </motion.div>

      </div>
    </section>
  );
}
