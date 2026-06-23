'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, LogOut, X, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function DashboardHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State untuk form ganti password
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMsg(''); // Reset error saat mengetik
  };

  const handleSubmit = (e) => {
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
    
    // Simulasi request ke backend (Ganti dengan API sungguhan nanti)
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Password berhasil diperbarui!');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // Tutup modal otomatis setelah 2 detik
      setTimeout(() => {
        setSuccessMsg('');
        setIsModalOpen(false);
      }, 2000);
    }, 1500);
  };

  return (
    <>
      {/* HEADER BAR */}
      <header className="w-full h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="text-xl font-bold text-teal-400 font-mono">
          DASHBOARD
        </div>

        {/* Profile Menu (Kanan Atas) */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 p-2 rounded-full hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-800"
          >
            <div className="flex flex-col items-end hidden md:flex">
              <span className="text-sm font-medium text-slate-200">Admin Jason</span>
              <span className="text-xs text-slate-500">Administrator</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
              <User size={18} className="text-teal-400" />
            </div>
          </button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50"
              >
                <button 
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-teal-400 transition-colors"
                >
                  <Lock size={16} />
                  Ganti Password
                </button>
                <div className="h-[1px] w-full bg-slate-800 my-1"></div>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut size={16} />
                  Keluar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* MODAL GANTI PASSWORD */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Overlay gelap */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Kotak Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-800">
                <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                  <Lock size={18} className="text-teal-500" />
                  Ganti Password
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {errorMsg}
                      </div>
                    )}

                    {/* Input Password Lama */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">Password Saat Ini</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-hidden focus:border-teal-500 transition-colors"
                          placeholder="Masukkan password saat ini"
                        />
                      </div>
                    </div>

                    {/* Input Password Baru */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">Password Baru</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-hidden focus:border-teal-500 transition-colors"
                          placeholder="Minimal 6 karakter"
                        />
                      </div>
                    </div>

                    {/* Input Konfirmasi Password Baru */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-slate-400">Konfirmasi Password Baru</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 pr-10 text-sm text-slate-200 focus:outline-hidden focus:border-teal-500 transition-colors"
                          placeholder="Ketik ulang password baru"
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
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