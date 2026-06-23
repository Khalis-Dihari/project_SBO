"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Home, Briefcase, Image, LogOut, ChevronDown } from "lucide-react"; // Menambahkan import ikon Image

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Jika di halaman login, jangan tampilkan navbar sama sekali
  if (pathname === '/login') return null;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsDropdownOpen(false);
    router.push('/login');
    router.refresh();
  };

  // BAGIAN KAMU (SCRUM-42): Menambahkan objek "Picture" ke dalam satu kemasan array navigasi tengah
  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Projects", path: "/projects", icon: <Briefcase size={16} /> }, 
    { name: "Picture", path: "/picture", icon: <Image size={16} /> }, // Menu baru satu paket
  ];
  
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 z-50">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between px-4 py-3 md:px-6 rounded-full bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl shadow-2xl shadow-teal-900/20"
      >
        {/* Logo Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-teal-500/10 p-2 rounded-full group-hover:bg-teal-500/20 transition-colors">
            <Code2 size={20} className="text-teal-400 group-hover:scale-110 transition-transform" />
          </div>
          <span className="font-bold text-lg tracking-wide text-slate-100">
            SBO<span className="text-teal-500">.</span>
          </span>
        </Link>

        {/* Menu Navigasi Tengah (Sekarang otomatis merender 3 menu: Home, Projects, Picture) */}
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

        {/* Profile Avatar + Dropdown Menu */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-800/80 border border-slate-700 hover:border-teal-500/40 transition-all cursor-pointer select-none"
          >
            {/* Avatar Bulat Gradient */}
            <div className="w-8 h-8 rounded-full bg-linear-to-r from-teal-400 to-blue-500 flex items-center justify-center text-slate-950 font-bold text-xs shadow-md">
              AD
            </div>
            <span className="text-xs font-semibold text-slate-300 hidden sm:inline">Admin</span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Isi Dropdown Menu (Muncul dengan Animasi Smooth) */}
          <AnimatePresence>
            {isDropdownOpen && (
              <>
                {/* Backdrop transparan untuk menutup dropdown jika klik di luar */}
                <div className="fixed inset-0 z-0" onClick={() => setIsDropdownOpen(false)} />
                
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900 border border-slate-800 p-1.5 shadow-2xl z-10"
                >
                  <div className="px-3 py-2 border-b border-slate-800/60 mb-1">
                    <p className="text-xs text-slate-500">Logged in as</p>
                    <p className="text-sm font-medium text-slate-300 truncate">Kelompok SBO</p>
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer text-left font-medium"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        
      </motion.nav>
    </div>
  );
}