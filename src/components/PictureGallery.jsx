"use client";

import { motion } from "framer-motion";

export default function PictureGallery({ pictures, category }) {
  const filteredPictures = category
    ? pictures.filter((picture) => picture.category === category)
    : pictures;

  return (
    <div className="w-full max-w-4xl relative z-10">
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
          {category
            ? `Menampilkan dokumentasi khusus kegiatan: ${category.toUpperCase()}`
            : "Dokumentasi gambar, visualisasi pengerjaan proyek SBO, dan dokumentasi kelompok."}
        </motion.p>

        {category && (
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

      {filteredPictures.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPictures.map((picture, index) => (
            <motion.div
              key={picture.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden aspect-video shadow-xl ${picture.size}`}
            >
              <img
                src={picture.url}
                alt={picture.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-left">
                <p className="text-xs font-mono text-teal-400 mb-1">IMAGE {picture.id.toString().padStart(2, "0")}</p>
                <h3 className="text-sm font-semibold text-slate-100">{picture.title}</h3>
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
