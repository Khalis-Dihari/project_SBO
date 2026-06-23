"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function LocationSection({ location }) {
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
            {location.title}
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base text-justify"
      >
        <p>{location.description}</p>
        <div className="flex gap-4 p-6 bg-slate-900/30 border border-slate-800 rounded-2xl items-start max-w-2xl shadow-md mt-4">
          <MapPin className="text-teal-400 shrink-0 mt-1" size={20} />
          <div className="text-left space-y-1">
            <p className="font-bold text-slate-100">{location.place}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{location.address}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
