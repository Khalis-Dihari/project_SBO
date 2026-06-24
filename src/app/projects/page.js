'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Image as ImageIcon, ChevronDown, Loader2 } from 'lucide-react';

function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);
  const [descText, setDescText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !descText && project.descFile) {
      setIsLoading(true);
      fetch(project.descFile)
        .then((response) => {
          if (!response.ok) throw new Error("Gagal mengambil file");
          return response.text();
        })
        .then((text) => {
          setDescText(text);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setDescText("Deskripsi belum tersedia atau file txt tidak ditemukan.");
          setIsLoading(false);
        });
    }
  }, [isOpen, descText, project.descFile]);

  return (
    <motion.div 
      layout
      className="group flex flex-col bg-slate-900/40 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-teal-900/20"
    >
      {/* Gambar */}
      <div className="w-full h-56 bg-slate-950 border-b border-slate-800 relative overflow-hidden flex items-center justify-center">
        {project.image ? (
          <img 
            src={project.image} 
            alt="" 
            className="w-full h-full object-cover text-transparent group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-700">
            <ImageIcon className="mb-2 opacity-30 group-hover:text-teal-500/50 transition-colors" size={40} />
            <span className="text-xs font-mono opacity-50">No Image (600x400)</span>
          </div>
        )}
        
        <div className="absolute top-4 left-4">
          <span className="text-xs font-mono text-teal-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-teal-500/30 shadow-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* Header (Accordion Trigger) */}
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center cursor-pointer bg-slate-900/20 hover:bg-slate-800/40 transition-colors text-left"
      >
        <h3 className="text-xl font-bold text-slate-200 group-hover:text-teal-400 transition-colors">
          {project.title}
        </h3>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }} 
          transition={{ duration: 0.3 }}
          className="p-1.5 bg-slate-800/50 rounded-full shrink-0"
        >
          <ChevronDown className="text-slate-400 group-hover:text-teal-300 transition-colors" size={20} />
        </motion.div>
      </button>
      
      {/* Konten */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-slate-800/50">
              <div className="flex justify-between items-start gap-4">
                <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                  {isLoading ? (
                    <div className="flex items-center gap-2 text-teal-500/70">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Memuat deskripsi...</span>
                    </div>
                  ) : (
                    descText
                  )}
                </p>
                <button type="button" className="p-1.5 bg-slate-800/50 rounded-md hover:bg-teal-500/20 transition-colors shrink-0">
                  <ExternalLink className="text-slate-400 hover:text-teal-300 transition-colors" size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const projects = [
    { 
      id: 1, 
      title: "Ospek Jurusan", 
      descFile: "/ospek-jurusan.txt", 
      category: "Himatif", 
      image: "/ospek.jpg" 
    },
    { 
      id: 2, 
      title: "KKN/Pengabdian", 
      descFile: "/kkn.txt", 
      category: "Himatif", 
      image: "/pengabdian.jpg" 
    },
    { 
      id: 3, 
      title: "Mentoring", 
      descFile: "/mentoring.txt", 
      category: "Himatif", 
      image: "/mentoring.jpg" 
    },
    { 
      id: 4, 
      title: "Rapat Divisi", 
      descFile: "/rapat.txt", 
      category: "Himatif", 
      image: "/rapat.jpg" 
    },
    { 
      id: 5, 
      title: "Company Visit", 
      descFile: "/company-visit.txt", 
      category: "Himatif", 
      image: "/company-visit.jpg" 
    },
    { 
      id: 6, 
      title: "Program Kerja", 
      descFile: "/prokeran.txt", 
      category: "Himatif", 
      image: "/prokeran.jpg" 
  }
  ];
  
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 px-6 pb-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}