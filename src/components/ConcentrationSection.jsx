"use client";

import { motion } from "framer-motion";
import { Layers } from "lucide-react";

export default function ConcentrationSection({ concentrations }) {
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
            Our Concentrations
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
          Program Studi Teknik Informatika Universitas Widyatama menyediakan beberapa bidang konsentrasi yang dapat dipilih oleh mahasiswa guna mendalami kompetensi tertentu sesuai dengan minat dan tuntutan kebutuhan industri teknologi masa kini.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {concentrations.map((item, index) => (
            <div
              key={item.title}
              className="p-6 bg-slate-900/30 border border-slate-800 rounded-2xl hover:border-teal-500/30 transition-all duration-300 text-left flex flex-col h-full shadow-md"
            >
              <Layers
                size={18}
                className={index % 2 === 0 ? "text-teal-400 mb-3" : "text-cyan-400 mb-3"}
              />
              <h3 className="font-bold text-slate-100 text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">{item.desc}</p>

              <div className="pt-3 border-t border-slate-800/60 space-y-2 text-xs">
                <p className="text-slate-400">
                  <strong className="text-slate-300">Skill:</strong> {item.skills}
                </p>
                <p className="text-slate-400">
                  <strong className="text-slate-300">Next Step:</strong> {item.nextSteps}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
