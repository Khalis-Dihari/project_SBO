"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Home, Briefcase, LogOut, ChevronDown, 
  Lock, X, Eye, EyeOff, Loader2, Image as ImageIcon
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State untuk form ganti password
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Jika di halaman login, jangan tampilkan navbar sama sekali
  if (pathname === '/login') return null;

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsDropdownOpen(false);
    router.push('/login');
    router.refresh();
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg('');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMsg('Password baru dan konfirmasi tidak cocok!');
      return;
    }

    if (formData.newPassword.length < 6) {
      setErrorMsg('Password baru minimal 6 karakter!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Password berhasil diperbarui!');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });

      setTimeout(() => {
        setSuccessMsg('');
        setIsModalOpen(false);
      }, 2000);
    }, 1500);
  };

  // BAGIAN KAMU (SCRUM-42): Menambahkan objek "Picture" ke dalam satu kemasan array navigasi tengah
  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Projects", path: "/projects", icon: <Briefcase size={16} /> }, 
    { name: "Picture", path: "/picture", icon: <ImageIcon size={16} /> }, // Menu baru satu paket
  ];
  
  return (
    <>
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

            {/* Isi Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <>
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
                    
                    {/* Tombol Edit Password */}
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-slate-300 hover:bg-slate-800 hover:text-teal-400 rounded-xl transition-colors mb-1 text-left font-medium cursor-pointer"
                    >
                      <Lock size={16} />
                      <span>Edit Password</span>
                    </button>
                    
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

      {/* MODAL EDIT PASSWORD */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-800">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Lock size={18} className="text-teal-500" />
                  Edit Password
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {successMsg ? (
                  <div className="py-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center mb-4">
                      <Lock size={32} className="text-teal-400" />
                    </div>
                    <h3 className="text-xl font-bold text-teal-400 mb-2">Sukses!</h3>
                    <p className="text-slate-400">{successMsg}</p>
                  </div>
                ) : (
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {errorMsg}
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">Password Saat Ini</label>
                      <input 
                        type={showPassword ? "text" : "password"}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
                        placeholder="Masukkan password saat ini"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">Password Baru</label>
                      <input 
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
                        placeholder="Minimal 6 karakter"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">Konfirmasi Password Baru</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
                          placeholder="Ketik ulang password baru"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button 
                        type="button"
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Batal
                      </button>
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-teal-500 hover:bg-teal-600 text-slate-950 text-sm font-bold transition-all disabled:opacity-70 cursor-pointer"
                      >
                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : 'Simpan Password'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
