'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 px-6 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto">
        {/* Hero Section yang sudah bersih tanpa tombol logout lama */}
        <div className="border-b border-slate-900/60 pb-12 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono">
              <Terminal size={12} /> Status: Authenticated as Admin
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Project <span className="bg-linear-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">SBO Portfolio</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-sm md:text-base">
              Selamat datang di dashboard tugas besar kelompok kami. Di sini terlampir hasil kerja sistem modeling dan implementasi coding kami.
            </p>
          </motion.div>
        </div>

        {/* ... Sisa kode Grid Projects ke bawah tetap sama seperti kemarin ... */}

        {/* Project Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold tracking-wide text-slate-300">Group Showcases</h2>
          
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

      </div>
    </main>
  );
}