import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Medal, Award, LucideIcon } from 'lucide-react';

interface AchievementItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
}

const achievementsData: AchievementItem[] = [
  {
    title: "450+ LeetCode Problems Solved",
    description: "Solved over 450 problems on LeetCode, strengthening expertise in data structures, algorithms, and competitive problem-solving across varying difficulty levels.",
    icon: Trophy,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    border: "border-yellow-400/20"
  },
  {
    title: "Academic Excellence — 9.28 CGPA",
    description: "Maintained an outstanding academic grade of 9.28 at SASTRA University, demonstrating consistent academic rigor and deep technical understanding.",
    icon: Star,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-400/20"
  },
  {
    title: "Udemy ML Certification",
    description: "Obtained an industry-recognized Machine Learning certification from Udemy, validating proficiency in supervised and unsupervised learning techniques, model evaluation, and real-world ML applications.",
    icon: Award,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20"
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-slate-950/20">
      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Key <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {achievementsData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-card p-8 rounded-3xl border ${item.border} hover:border-white/20 bg-slate-900/30 group relative overflow-hidden`}
              >
                {/* Visual hover background spotlight */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className={item.color} />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all duration-300">
                  {item.title}
                </h3>
                <p className="text-slate-400 leading-relaxed font-semibold text-sm">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
