"use client"; // Wajib pakai ini karena kita menggunakan hooks (usePathname) dan Framer Motion

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Code2, LogIn, Home, Briefcase } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  // Daftar menu navigasi (bisa ditambah nanti)
  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Projects", path: "/#projects", icon: <Briefcase size={16} /> },
  ];

  return (
    // Wrapper untuk memposisikan navbar mengambang (floating) di tengah
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
      
      {/* Animasi saat halaman pertama kali diload */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between px-4 py-3 md:px-6 rounded-full bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-teal-900/20"
      >
        
        {/* Logo / Brand Group */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-teal-500/10 p-2 rounded-full group-hover:bg-teal-500/20 transition-colors">
            <Code2 size={20} className="text-teal-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-bold text-lg tracking-wide text-slate-100 group-hover:text-white transition-colors">
            SBO<span className="text-teal-500">.</span>
          </span>
        </Link>

        {/* Center Links (Pill di dalam Pill) - Sembunyi di HP, muncul di layar menengah ke atas */}
        <div className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1 rounded-full border border-slate-700/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? "bg-slate-700 text-teal-300 shadow-sm" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Login Button CTA (Call to Action) */}
        <Link href="/login">
          <button className="flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full bg-linear-to-r from-teal-500 to-emerald-500 text-slate-950 hover:from-teal-400 hover:to-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-teal-500/25 cursor-pointer">
            <LogIn size={16} />
            <span className="hidden sm:inline">Login</span>
          </button>
        </Link>
        
      </motion.nav>
    </div>
  );
}