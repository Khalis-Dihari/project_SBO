"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

function getActivitySlug(title) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("makrab")) return "makrab";
  if (lowerTitle.includes("workshop")) return "workshop";
  if (lowerTitle.includes("pengabdian")) return "pengabdian";

  return "rapat";
}

export default function ActivitySection({ activities, pictures = [] }) {
  return (
    <div className="w-full pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white text-left">
          <span className="bg-linear-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
            Our Activities
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base text-justify"
      >
        <p>
          Dokumentasi serangkaian kegiatan internal maupun eksternal yang diselenggarakan oleh HIMATIF Universitas Widyatama untuk mempererat solidaritas antar-anggota sekaligus meningkatkan wawasan teknologi global mahasiswa.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
          {activities.map((activity) => {
            const slug = activity.slug || getActivitySlug(activity.title);
            const relatedPictures = pictures.filter((picture) => picture.category === slug);
            const previewImage = relatedPictures[0]?.url || activity.image;

            return (
              <Link
                key={activity.title}
                href={`/picture?kegiatan=${slug}`}
                className="group relative overflow-hidden bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-lg transition-all duration-300 hover:border-teal-500/30 flex flex-col cursor-pointer"
              >
                <div className="w-full aspect-video bg-slate-950 overflow-hidden relative">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-slate-600 font-mono text-xs group-hover:scale-105 transition-transform duration-500">
                      [ Tempat Foto: {activity.title} ]
                    </div>
                  )}

                  {relatedPictures.length > 0 && (
                    <div className="absolute bottom-3 right-3 rounded-full border border-slate-700 bg-slate-950/80 px-2.5 py-1 text-[10px] font-mono text-teal-300 backdrop-blur">
                      {relatedPictures.length} foto
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-900/20 border-t border-slate-800/50 text-left">
                  <h3 className="font-bold text-slate-100 text-base tracking-wide group-hover:text-teal-400 transition-colors">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                    <Calendar size={12} className="text-slate-500" />
                    <span>{activity.date}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
