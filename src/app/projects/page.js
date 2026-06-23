'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Image as ImageIcon } from 'lucide-react';

export default function ProjectsPage() {
  // Data statis 6 kegiatan kelompok (Bisa diedit teksnya di sini)
  const projects = [
    {
      id: 1,
      title: "Sistem Manajemen Keuangan",
      desc: "Aplikasi berbasis web untuk mencatat dan menganalisis arus kas keuangan secara real-time dengan grafik interaktif.",
      category: "Web App",
      tech: ["Next.js", "Tailwind CSS", "Node.js"],
      image: null
    },
    {
      id: 2,
      title: "Analisis Data E-Commerce",
      desc: "Menganalisis tren penjualan dan perilaku pelanggan menggunakan dataset e-commerce untuk optimasi strategi marketing.",
      category: "Data Science",
      tech: ["Python", "Pandas", "Jupyter"],
      image: null
    },
    {
      id: 3,
      title: "Aplikasi Mobile E-Learning",
      desc: "Platform pembelajaran jarak jauh berbasis Android dengan fitur video streaming dan kuis interaktif.",
      category: "Mobile App",
      tech: ["React Native", "Firebase"],
      image: null
    },
    {
      id: 4,
      title: "Keamanan Jaringan & Pentest",
      desc: "Simulasi penetration testing pada jaringan institusi untuk menemukan dan menambal celah keamanan (vulnerability).",
      category: "Cyber Security",
      tech: ["Kali Linux", "Wireshark"],
      image: null
    },
    {
      id: 5,
      title: "UI/UX Redesign Aplikasi Bank",
      desc: "Merancang ulang antarmuka aplikasi mobile banking untuk meningkatkan user experience (UX) dan kemudahan navigasi.",
      category: "UI/UX Design",
      tech: ["Figma", "Prototyping"],
      image: null
    },
    {
      id: 6,
      title: "IoT Smart Home System",
      desc: "Sistem prototipe rumah pintar berbasis Internet of Things untuk mengontrol lampu dan suhu secara otomatis.",
      category: "IoT",
      tech: ["Arduino", "C++", "MQTT"],
      image: null
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 px-6 pb-12 relative overflow-hidden">
      {/* Efek Cahaya Latar Belakang */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto z-10 relative">
        
        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-slate-900/40 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-teal-900/20"
            >
              {/* Bagian Gambar / Image */}
              <div className="w-full h-56 bg-slate-950 border-b border-slate-800 relative overflow-hidden flex items-center justify-center">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-700">
                    <ImageIcon className="mb-2 opacity-30 group-hover:text-teal-500/50 transition-colors" size={40} />
                    <span className="text-xs font-mono opacity-50">No Image (600x400)</span>
                  </div>
                )}
                
                {/* Badge Kategori Mengambang di atas Gambar */}
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-mono text-teal-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-teal-500/30 shadow-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Bagian Konten Teks */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  <a href="#" className="p-1.5 bg-slate-800/50 rounded-md hover:bg-teal-500/20 transition-colors">
                    <ExternalLink className="text-slate-400 group-hover:text-teal-300 transition-colors" size={16} />
                  </a>
                </div>
                
                <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
                  {project.desc}
                </p>
                
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-800/60 mt-auto">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="text-xs text-slate-400 font-medium bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}