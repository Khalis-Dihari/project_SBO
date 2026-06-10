'use client';

import { motion } from 'framer-motion';
import { Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-36 px-6 pb-12 flex items-center justify-center relative overflow-hidden">
      {/* Background Tech Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-3xl w-full text-center z-10">
        
        {/* Hero Section Name with Modern Background Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative p-8 md:p-12 rounded-3xl bg-linear-to-br from-slate-900/80 to-slate-950/40 border border-slate-800/60 backdrop-blur-md shadow-2xl shadow-teal-950/20 overflow-hidden group mb-8"
        >
          {/* Efek garis dekorasi di dalam card */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-teal-500/40 to-transparent"></div>

          <p className="text-xs md:text-sm font-mono tracking-widest text-teal-400 uppercase mb-3">
            Lead Software Engineer & Network Architect
          </p>
          
          {/* Nama JASON Mencolok */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-4">
            HI, I'M <span className="bg-linear-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">JASON</span>
          </h1>

          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Selamat datang di ruang pameran digital saya. Berfokus pada pemodelan sistem perangkat lunak terintegrasi, analisis protokol, dan optimalisasi topologi jaringan.
          </p>
        </motion.div>

        {/* CTA ke halaman Projects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Link href="/projects">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-teal-500/30 text-sm font-medium transition-all hover:scale-105 active:scale-95 group cursor-pointer shadow-lg">
              <Cpu size={16} className="text-slate-500 group-hover:text-teal-400 transition-colors" />
              <span>Lihat Showcases Kelompok</span>
              <ArrowRight size={14} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}