"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";

export default function ProfileSection({ profile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex flex-col items-center mb-16"
    >
      <div className="flex flex-col items-center bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-teal-500/50 hover:bg-slate-800/50 transition-all duration-300 group w-full max-w-sm shadow-xl shadow-teal-900/10">
        <div className="w-32 h-32 mb-6 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-teal-400 flex items-center justify-center overflow-hidden transition-colors">
          {profile.photo ? (
            <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
          ) : (
            <User size={50} className="text-slate-600 group-hover:text-teal-500 transition-colors" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-slate-100 text-center tracking-wide">{profile.name}</h1>
        <p className="text-teal-400 text-sm font-medium mt-2 text-center px-4">{profile.role}</p>

        <div className="mt-6 pt-4 border-t border-slate-800 w-full text-center">
          <p className="text-slate-400 font-mono text-sm">{profile.nim}</p>
        </div>
      </div>
    </motion.div>
  );
}
