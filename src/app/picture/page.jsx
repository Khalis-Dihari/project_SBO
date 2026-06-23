"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

// Komponen utama dipisahkan menggunakan Suspense karena useSearchParams butuh Client-Side Rendering di Next.js App Router
function GalleryContent() {
  const searchParams = useSearchParams();
  // Mengambil nilai '?kegiatan=...' dari URL
  const kategoriUrl = searchParams.get("kegiatan");

  // Data master foto kamu. Tambahkan properti 'category' yang sesuai dengan slug dari page.js
  const pictures = [
    { 
      id: 1, 
      title: "Team Working Session (Makrab)", 
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600", 
      size: "col-span-1",
      category: "makrab" 
    },
    { 
      id: 2, 
      title: "SCRUM Sprint Planning (Workshop)", 
      url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600", 
      size: "col-span-1",
      category: "workshop" 
    },
    { 
      id: 3, 
      title: "Project Overview Showcase (Pengabdian)", 
      url: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600", 
      size: "md:col-span-2",
      category: "pengabdian" 
    },
    { 
      id: 4, 
      title: "Rapat Kerja Tahunan HIMATIF", 
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600", 
      size: "md:col-span-2",
      category: "rapat" 
    },
  ];

  // Jika URL memiliki parameter ?kegiatan=..., saring datanya. Jika tidak, tampilkan semua foto.
  const filteredPictures = kategoriUrl
    ? pictures.filter((pic) => pic.category === kategoriUrl)
    : pictures;

  return (
    <div className="w-full max-w-4xl relative z-10">
      {/* Header Halaman */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-black bg-linear-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3 uppercase tracking-tight"
        >
          Our Gallery
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm max-w-md mx-auto"
        >
          {kategoriUrl 
            ? `Menampilkan dokumentasi khusus kegiatan: ${kategoriUrl.toUpperCase()}`
            : "Dokumentasi gambar, visualisasi pengerjaan proyek SBO, dan dokumentasi kelompok."
          }
        </motion.p>
        
        {/* Tombol Reset Filter jika diakses via klik aktivitas */}
        {kategoriUrl && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
            <a 
              href="/picture" 
              className="text-xs bg-slate-900 border border-slate-800 hover:border-teal-500/50 px-4 py-2 rounded-full text-teal-400 transition-all inline-block"
            >
              Lihat Semua Foto
            </a>
          </motion.div>
        )}
      </div>

      {/* Grid Gambar Showcase */}
      {filteredPictures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPictures.map((pic, index) => (
            <motion.div
              key={pic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden aspect-video shadow-xl ${pic.size}`}
            >
              <img 
                src={pic.url} 
                alt={pic.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gelap transparan pas di-hover */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              {/* Info Text di Dalam Gambar */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-xs font-mono text-teal-400 mb-1">IMAGE {pic.id.toString().padStart(2, '0')}</p>
                <h3 className="text-sm font-semibold text-slate-100">{pic.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-slate-500 font-mono text-sm">
          Belum ada foto dokumentasi untuk kegiatan ini.
        </div>
      )}
    </div>
  );
}

// Wrapper utama menggunakan Suspense untuk mencegah error deopt build Next.js akibat useSearchParams
export default function PicturePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-16 px-6 flex flex-col items-center">
      {/* Efek Cahaya Latar Belakang (Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-linear-to-b from-teal-500/10 to-transparent blur-3xl pointer-events-none" />
      
      <Suspense fallback={<div className="text-slate-400 font-mono text-sm pt-12">Loading Gallery...</div>}>
        <GalleryContent />
      </Suspense>
    </main>
  );
}