"use client";

import { motion } from "framer-motion";

export default function AboutSection({ about }) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-6"
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white text-left">
          <span className="bg-linear-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
            {about.title}
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-6 text-slate-300 leading-relaxed text-sm md:text-base text-justify"
      >
        {about.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </motion.div>
    </div>
  );
}
