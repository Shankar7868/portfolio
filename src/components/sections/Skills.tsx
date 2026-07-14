import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Layout, Server, Brain, Workflow, Cloud, Database, Wrench, LucideIcon } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategoryType {
  category: string;
  icon: LucideIcon;
  skills: Skill[];
  tag: 'coding' | 'frontend' | 'backend' | 'ai' | 'automation' | 'cloud' | 'database' | 'tools';
}

const skillsData: SkillCategoryType[] = [
  {
    category: "Programming",
    icon: Terminal,
    tag: "coding",
    skills: [
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 80 }
    ]
  },
  {
    category: "Frontend",
    icon: Layout,
    tag: "frontend",
    skills: [
      { name: "React", level: 85 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 }
    ]
  },
  {
    category: "Backend",
    icon: Server,
    tag: "backend",
    skills: [
      { name: "Django", level: 75 }
    ]
  },
  {
    category: "Artificial Intelligence",
    icon: Brain,
    tag: "ai",
    skills: [
      { name: "Machine Learning", level: 85 },
      { name: "Deep Learning", level: 80 },
      { name: "TensorFlow", level: 85 },
      { name: "Keras", level: 80 },
      { name: "Scikit-learn", level: 85 }
    ]
  },
  {
    category: "Workflow Automation",
    icon: Workflow,
    tag: "automation",
    skills: [
      { name: "n8n", level: 90 },
      { name: "AI Agents", level: 85 },
      { name: "Gemini API", level: 90 }
    ]
  },
  {
    category: "Cloud & Deployment",
    icon: Cloud,
    tag: "cloud",
    skills: [
      { name: "AWS EC2", level: 75 },
      { name: "Docker", level: 75 },
      { name: "Vercel", level: 80 }
    ]
  },
  {
    category: "Database",
    icon: Database,
    tag: "database",
    skills: [
      { name: "MySQL", level: 80 }
    ]
  },
  {
    category: "Tools & Platforms",
    icon: Wrench,
    tag: "tools",
    skills: [
      { name: "Git", level: 85 },
      { name: "GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "antigravity", level: 80 },
      { name: "google flow", level: 80 }
    ]
  }
];

const tabs = [
  { id: 'all', label: 'All Skills' },
  { id: 'coding', label: 'Programming' },
  { id: 'ai', label: 'AI & ML' },
  { id: 'automation', label: 'Automation' },
  { id: 'frontend', label: 'Frontend' }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredSkills = skillsData.filter(category => {
    if (activeTab === 'all') return true;
    return category.tag === activeTab;
  });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-900/10">
      {/* Decorative Glow */}
      <div className="absolute bottom-1/4 right-[-100px] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Technical <span className="text-gradient text-glow">Skills</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto font-medium">
            A comprehensive mapping of my engineering tools, programming competencies, and artificial intelligence stack.
          </p>
        </motion.div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-2xl mx-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all border select-none ${
                  isActive 
                    ? 'border-purple-500/30 text-white shadow-lg shadow-purple-500/10' 
                    : 'border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-skill-tab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.category}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                  className="glass-card p-6 rounded-3xl border border-white/5 bg-slate-900/30 hover:border-purple-500/40 relative overflow-hidden group flex flex-col justify-between"
                >
                  <div>
                    {/* Header Category */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 bg-white/5 rounded-xl text-cyan-400 group-hover:text-pink-400 group-hover:bg-white/10 transition-all duration-300">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-lg font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-400 transition-all duration-300">
                        {cat.category}
                      </h3>
                    </div>

                    {/* Skill items */}
                    <div className="space-y-4">
                      {cat.skills.map((skill, i) => (
                        <div key={i} className="group/item">
                          <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-1.5">
                            <span className="group-hover/item:text-white transition-colors">{skill.name}</span>
                            <span className="text-cyan-400 font-mono">{skill.level}%</span>
                          </div>
                          {/* Custom visual progress bar */}
                          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
