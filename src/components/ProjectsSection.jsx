"use client";

import { motion } from "framer-motion";
import { ExternalLink, Image as ImageIcon } from "lucide-react";

export default function ProjectsSection({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group flex flex-col bg-slate-900/40 border border-slate-800 hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-teal-900/20"
        >
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

            <div className="absolute top-4 left-4">
              <span className="text-xs font-mono text-teal-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-teal-500/30 shadow-sm">
                {project.category}
              </span>
            </div>
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold text-slate-200 group-hover:text-teal-400 transition-colors">
                {project.title}
              </h3>
              <a href="#" className="p-1.5 bg-slate-800/50 rounded-md hover:bg-teal-500/20 transition-colors">
                <ExternalLink className="text-slate-400 group-hover:text-teal-300 transition-colors" size={16} />
              </a>
            </div>

            <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">{project.desc}</p>

            <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-800/60 mt-auto">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs text-slate-400 font-medium bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
