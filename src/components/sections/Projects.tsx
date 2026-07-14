import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Code2, Network, Cpu, Database, Server, Workflow, Sparkles, Layout, Brain, Cloud, FileCode } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface BadgeProps {
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ children }) => (
  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-cyan-400 flex items-center gap-1 select-none">
    {children}
  </span>
);

const AIBadge: React.FC<BadgeProps> = ({ children }) => (
  <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-bold text-purple-400 flex items-center gap-1 select-none">
    {children}
  </span>
);

interface LivePreviewProps {
  url: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({ url }) => {
  const [timestamp, setTimestamp] = useState(Date.now());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const srcUrl = `${url}${url.includes('?') ? '&' : '?'}t=${timestamp}`;

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950">
      <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50">
        <iframe
          src={srcUrl}
          title="Live Preview"
          className="w-full h-full border-0 pointer-events-none opacity-85"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

interface BrowserMockupProps {
  children: React.ReactNode;
  url?: string;
}

const BrowserMockup: React.FC<BrowserMockupProps> = ({ children, url = "https://example.com" }) => (
  <div className="w-full relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950 shadow-2xl group-hover:border-cyan-400/40 transition-colors duration-500">
    {/* Browser Bar */}
    <div className="h-10 bg-slate-900 border-b border-white/5 px-4 flex items-center gap-2 select-none">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
      </div>
      <div className="flex-1 max-w-sm mx-auto h-6 rounded-md bg-black/40 border border-white/5 flex items-center justify-center text-[10px] text-slate-500 font-mono overflow-hidden whitespace-nowrap px-3">
        {url}
      </div>
    </div>
    {/* Content Window */}
    <div className="relative aspect-video w-full overflow-hidden">
      {children}
    </div>
  </div>
);

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'apps' | 'pipelines'>('all');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-[-200px] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto font-medium">
            A showcasing of ML application architecture, NLP pipelines, and computer vision systems.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center justify-center gap-3 mb-16 select-none">
          <button 
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${
              filter === 'all' 
                ? 'border-cyan-400/30 bg-cyan-400/10 text-white shadow-lg' 
                : 'border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            All Projects
          </button>
          <button 
            onClick={() => setFilter('apps')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${
              filter === 'apps' 
                ? 'border-cyan-400/30 bg-cyan-400/10 text-white shadow-lg' 
                : 'border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            AI Applications
          </button>
          <button 
            onClick={() => setFilter('pipelines')}
            className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all ${
              filter === 'pipelines' 
                ? 'border-cyan-400/30 bg-cyan-400/10 text-white shadow-lg' 
                : 'border-white/5 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            ML/DL Pipelines
          </button>
        </div>

        {/* Project List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-20 max-w-6xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            
            {/* Project 1: EduGenie */}
            {(filter === 'all' || filter === 'apps') && (
              <motion.div 
                key="edugenie"
                layout
                variants={projectVariants}
                className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 bg-slate-900/30 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10 group-hover:bg-cyan-500/10 transition-colors"></div>
                
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="text-cyan-400" size={18} />
                      <span className="text-xs font-black uppercase tracking-widest text-cyan-400 font-mono">Live Application</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                      EduGenie
                    </h3>
                    <p className="text-purple-400 font-extrabold text-lg mb-6">AI-Powered Learning Platform</p>
                    
                    <p className="text-slate-300 leading-relaxed mb-6 font-medium">
                      EduGenie is a continuous AI study assistant that automatically generates customized educational content from user prompts. It dynamically creates Flashcards, Quizzes, Topic Comparisons, Q&A, Summaries, and Key Points to revolutionize personalized learning.
                    </p>

                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">AI Workflow Architecture</h4>
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-6 font-mono text-xs text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-thin">
                      User → React Frontend → n8n Workflow → Gemini API → AI Response → User
                    </div>

                    <div className="flex flex-col gap-4 mb-8">
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">Core Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge><Code2 size={13} /> React</Badge>
                          <Badge><FaGithub size={13} /> GitHub</Badge>
                          <Badge><Cloud size={13} /> Vercel</Badge>
                          <Badge><Server size={13} /> AWS EC2</Badge>
                          <Badge><Workflow size={13} /> n8n</Badge>
                          <Badge><Brain size={13} /> Gemini API</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-widest text-purple-400 mb-2">UI Integrations</h4>
                        <div className="flex flex-wrap gap-2">
                          <AIBadge><Layout size={13} /> Framer Motion</AIBadge>
                          <AIBadge><Layout size={13} /> Tailwind CSS</AIBadge>
                          <AIBadge><Code2 size={13} /> React Router</AIBadge>
                          <AIBadge><Layout size={13} /> shadcn</AIBadge>
                          <AIBadge><Layout size={13} /> Three.js</AIBadge>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.a 
                        href="https://edu-genie-eight.vercel.app/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-cyan-400 text-black font-extrabold rounded-full hover:bg-white transition-colors flex items-center gap-2 text-sm"
                      >
                        Live Demo <ExternalLink size={16} />
                      </motion.a>
                      <motion.a 
                        href="https://github.com/Shankar7868/EduGenie" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
                      >
                        GitHub <FaGithub size={16} />
                      </motion.a>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-1/2">
                    <BrowserMockup url="https://edu-genie-eight.vercel.app">
                      <LivePreview url="https://edu-genie-eight.vercel.app/" />
                    </BrowserMockup>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Project 2: LexiGuard */}
            {(filter === 'all' || filter === 'apps') && (
              <motion.div 
                key="lexiguard"
                layout
                variants={projectVariants}
                className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 bg-slate-900/30 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10 group-hover:bg-purple-500/10 transition-colors"></div>
                
                <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                  <div className="w-full lg:w-1/2">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="text-purple-400" size={18} />
                      <span className="text-xs font-black uppercase tracking-widest text-purple-400 font-mono">AI Legal Agent</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight group-hover:text-purple-400 transition-colors duration-300">
                      LexiGuard
                    </h3>
                    <p className="text-cyan-400 font-extrabold text-lg mb-6">AI Legal Assistant</p>
                    
                    <p className="text-slate-300 leading-relaxed mb-6 font-medium">
                      An AI-powered legal tech platform that automates complex legal document analysis. It utilizes optical character recognition (OCR) to process documents, routing them through intelligent Switch Nodes in n8n. The Gemini API acts as a legal agent, detecting hidden risks, answering user queries, and summarizing complex legal clauses.
                    </p>

                    <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-3">AI Agent Workflow</h4>
                    <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-6 font-mono text-xs text-slate-400 overflow-x-auto whitespace-nowrap scrollbar-thin">
                      User Upload → PDF → OCR → n8n → Switch Node → AI Agent → Response
                    </div>

                    <h4 className="text-sm font-extrabold uppercase tracking-widest text-slate-400 mb-3">Core Technologies</h4>
                    <div className="flex flex-wrap gap-2 mb-8">
                      <Badge><Code2 size={13} /> React</Badge>
                      <Badge><Database size={13} /> Docker</Badge>
                      <Badge><Workflow size={13} /> n8n</Badge>
                      <Badge><Brain size={13} /> Gemini API</Badge>
                      <Badge><FileCode size={13} /> JavaScript</Badge>
                      <Badge><Cloud size={13} /> Vercel</Badge>
                    </div>

                    <div className="flex gap-4">
                      <motion.a 
                        href="https://github.com/Shankar7868" 
                        target="_blank" 
                        rel="noreferrer" 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-purple-500 text-white font-extrabold rounded-full hover:bg-purple-400 transition-colors flex items-center gap-2 text-sm shadow-[0_4px_15px_rgba(139,92,246,0.3)]"
                      >
                        Live Demo <ExternalLink size={16} />
                      </motion.a>
                      <motion.a 
                        href="https://github.com/Shankar7868" 
                        target="_blank" 
                        rel="noreferrer" 
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-full hover:bg-white/10 transition-colors flex items-center gap-2 text-sm"
                      >
                        GitHub <FaGithub size={16} />
                      </motion.a>
                    </div>
                  </div>
                  
                  <div className="w-full lg:w-1/2">
                    <BrowserMockup url="https://lexiguard.vercel.app">
                      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                        <img 
                          src="/lexiguard.jpg" 
                          alt="LexiGuard Dashboard" 
                          className="w-full h-full object-cover opacity-35" 
                          onError={(e) => e.currentTarget.style.display = 'none'} 
                        />
                        <div className="absolute flex flex-col items-center gap-3 text-center px-6">
                          <Brain className="text-purple-400 animate-pulse" size={36} />
                          <span className="text-xs font-bold text-slate-300 font-mono tracking-widest">LEXIGUARD HUD DISPLAY</span>
                          <span className="text-[10px] text-slate-500 font-mono">Secure Sandboxed Legal Agent Environment</span>
                        </div>
                      </div>
                    </BrowserMockup>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Project 3: ASR for Telugu */}
            {(filter === 'all' || filter === 'pipelines') && (
              <motion.div 
                key="asr-telugu"
                layout
                variants={projectVariants}
                className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 bg-slate-900/30 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10 group-hover:bg-cyan-500/10 transition-colors"></div>
                
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-cyan-400 font-mono mb-3 block">NLP & Acoustic Pipeline</span>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                      Automatic Speech Recognition for Telugu
                    </h3>
                    <p className="text-purple-400 font-extrabold text-base mb-6">Deep Learning & Audio Processing Pipeline</p>
                    
                    <p className="text-slate-300 leading-relaxed mb-8 font-medium">
                      A comprehensive speech recognition framework built for the Telugu language leveraging the Kaldi toolkit. The system features acoustic feature extraction pipeline design, hidden Markov acoustic mapping, and robust language modeling to decode audio signals into readable scripts.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-4">
                    <div className="glass-card p-5 rounded-2xl bg-black/20 border border-white/5">
                      <h4 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
                        <Network size={16} className="text-purple-400" /> Core Concepts
                      </h4>
                      <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
                        <li className="flex items-center gap-2">• <span className="text-slate-300">MFCC Audio Feature Extraction</span></li>
                        <li className="flex items-center gap-2">• <span className="text-slate-300">Linear Discriminant Analysis (LDA)</span></li>
                        <li className="flex items-center gap-2">• <span className="text-slate-300">Maximum Likelihood Linear Transform</span></li>
                        <li className="flex items-center gap-2">• <span className="text-slate-300">fMLLR Feature Transformations</span></li>
                        <li className="flex items-center gap-2">• <span className="text-slate-300">DNN-HMM Hybrid Modeling</span></li>
                      </ul>
                    </div>

                    <div className="glass-card p-5 rounded-2xl bg-black/20 border border-white/5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
                          <Cpu size={16} className="text-cyan-400" /> Speech Pipeline Graph
                        </h4>
                        <div className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-xs text-slate-400 leading-relaxed scrollbar-thin overflow-x-auto">
                          Dataset → Preprocessing → Feature Extraction → Acoustic Model → Decoder → Text Output
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap mt-4">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400">Kaldi</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400">Python</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400">Shell Scripting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Project 4: CAD Detection */}
            {(filter === 'all' || filter === 'pipelines') && (
              <motion.div 
                key="cad-detection"
                layout
                variants={projectVariants}
                className="glass-card p-8 md:p-12 rounded-3xl border border-white/5 bg-slate-900/30 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10 group-hover:bg-purple-500/10 transition-colors"></div>
                
                <div className="flex flex-col gap-6">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-purple-400 font-mono mb-3 block">Computer Vision & MedTech</span>
                    <h3 className="text-3xl font-black text-white mb-2 tracking-tight group-hover:text-purple-400 transition-colors duration-300">
                      Cardiac MRI-Based CAD Detection
                    </h3>
                    <p className="text-cyan-400 font-extrabold text-base mb-6">Medical Imaging & Computer Vision</p>
                    
                    <p className="text-slate-300 leading-relaxed mb-8 font-medium">
                      A deep learning image diagnostic framework trained to detect Coronary Artery Disease (CAD) using Cardiac MRI scans. By applying Transfer Learning on the ResNet50 neural network architecture, the framework accurately isolates coronary artery boundaries and maps lesion probability density.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-4">
                    <div className="glass-card p-5 rounded-2xl bg-black/20 border border-white/5">
                      <h4 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
                        <Network size={16} className="text-cyan-400" /> Deep Learning Concepts
                      </h4>
                      <ul className="space-y-2.5 text-sm text-slate-400 font-medium">
                        <li className="flex items-center gap-2">• <span className="text-slate-300">Transfer Learning (ResNet50)</span></li>
                        <li className="flex items-center gap-2">• <span className="text-slate-300">Data Augmentation & Scaling</span></li>
                        <li className="flex items-center gap-2">• <span className="text-slate-300">MRI Structural Filtering</span></li>
                        <li className="flex items-center gap-2">• <span className="text-slate-300">Class Probability Activation Maps</span></li>
                        <li className="flex items-center gap-2">• <span className="text-slate-300">Confusion Matrices & ROC Curves</span></li>
                      </ul>
                    </div>

                    <div className="glass-card p-5 rounded-2xl bg-black/20 border border-white/5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
                          <Cpu size={16} className="text-purple-400" /> Pipeline Graph
                        </h4>
                        <div className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-xs text-slate-400 leading-relaxed scrollbar-thin overflow-x-auto">
                          MRI Scans → Normalization → Augmentation → ResNet50 Model → Binary Classification → CAD Alert
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-wrap mt-4">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400">TensorFlow</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400">Keras</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400">Computer Vision</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-400">Python</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
