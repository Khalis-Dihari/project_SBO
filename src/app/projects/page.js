'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Briefcase } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 px-6 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto">
        <div className="border-b border-slate-900/60 pb-8 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-mono mb-3">
            <Briefcase size={12} /> Repository & Showcases
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Group <span className="bg-linear-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">Project Showcases</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">Daftar implementasi teknis dan sistem analisis yang telah diselesaikan.</p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-slate-900/30 border border-slate-900 hover:border-slate-800/80 p-6 rounded-2xl backdrop-blur-xs transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-mono text-teal-400 bg-teal-500/5 px-2.5 py-1 rounded-md border border-teal-500/10">
                  {project.category}
                </span>
                <ExternalLink size={16} className="text-slate-600 group-hover:text-teal-400 transition-colors" />
              </div>
              
              <h3 className="text-lg font-bold text-slate-200 mb-2 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4">{project.desc}</p>
              
              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-900">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="text-xs text-slate-500 font-medium bg-slate-950 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}