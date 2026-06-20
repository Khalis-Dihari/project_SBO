'use client';

import { motion } from 'framer-motion';
import { Cpu, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import AccordionText from '@/components/AccordionText';
import PhotoCarousel from '@/components/PhotoCarousel';

export default function Home() {
  // Data profil pribadi
  const profileData = { 
    name: "Jason", 
    role: "Lead Software Engineer / Network Architect", 
    nim: "NIM: 23061100",
    photo: "/jason.jpg" // Pastikan file jason.jpg sudah ada di folder public
  };

  const aboutItems = [
    {
      title: "Profil Singkat",
      contentFile: "/profil-singkat.txt",
    },
    {
      title: "Bidang yang Dipelajari",
      content:
        "Selama menempuh pendidikan, saya telah mempelajari berbagai konsep dan teknologi seperti pemrograman, basis data, pengembangan web, jaringan komputer, serta keamanan sistem informasi. Saya percaya bahwa teknologi dapat menjadi solusi untuk berbagai permasalahan sehingga mendorong saya untuk terus berinovasi dan meningkatkan kompetensi di bidang informatika.",
    },
    {
      title: "Tujuan Portfolio",
      content:
        "Melalui portfolio ini, saya menampilkan berbagai proyek, pengalaman, dan keterampilan yang telah saya kembangkan sebagai bentuk komitmen saya dalam membangun karier profesional di dunia teknologi informasi.",
    },
  ];

  const profilePhotos = [
    {
      src: "/jason.jpg",
      alt: "Foto profil Jason",
      title: "Dokumentasi Portfolio",
      description: "Foto utama yang digunakan pada halaman profil.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 px-6 pb-12 flex flex-col items-center">
      <div className="max-w-4xl w-full z-10">
        
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 w-full flex flex-col items-center"
        >
          <div className="flex flex-col items-center bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-teal-500/50 hover:bg-slate-800/50 transition-all duration-300 group w-full max-w-sm shadow-xl shadow-teal-900/10">
            <div className="w-32 h-32 mb-6 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-teal-400 flex items-center justify-center overflow-hidden transition-colors">
              {profileData.photo ? (
                <img src={profileData.photo} alt={profileData.name} className="w-full h-full object-cover" />
              ) : (
                <User size={50} className="text-slate-600 group-hover:text-teal-500 transition-colors" />
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-slate-100 text-center tracking-wide">{profileData.name}</h1>
            <p className="text-teal-400 text-sm font-medium mt-2 text-center px-4">{profileData.role}</p>
            
            <div className="mt-6 pt-4 border-t border-slate-800 w-full text-center">
              <p className="text-slate-400 font-mono text-sm">{profileData.nim}</p>
            </div>
          </div>
        </motion.div>

        {/* Header Section: About Me */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
            <span className="bg-linear-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
              About Me
            </span>
          </h2>
          <p className="text-lg md:text-xl font-mono text-teal-400 italic mb-8">
            &quot;Learning, Creating, and Innovating Through Technology.&quot;
          </p>
        </motion.div>

        {/* Deskripsi Pribadi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto max-w-3xl"
        >
          <AccordionText items={aboutItems} />
        </motion.div>

        {/* Carousel Foto */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-12 max-w-3xl"
        >
          <PhotoCarousel photos={profilePhotos} />
        </motion.section>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/projects">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/30 text-sm font-medium transition-all hover:scale-105 active:scale-95 group cursor-pointer shadow-lg">
              <Cpu size={16} className="text-slate-500 group-hover:text-teal-400 transition-colors" />
              <span>Lihat Showcases Proyek</span>
              <ArrowRight size={14} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
