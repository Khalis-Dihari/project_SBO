'use client';

import { motion } from 'framer-motion';
import { Cpu, ArrowRight, User, MapPin, Layers, Calendar } from 'lucide-react';
import Link from 'next/link';
import AccordionText from '@/components/AccordionText';
import PhotoCarousel from '@/components/PhotoCarousel';

export default function Home() {
  const profileData = { 
    name: "Jason", 
    role: "Lead Software Engineer / Network Architect", 
    nim: "NIM: 23061100",
    photo: "/jason.jpg" 
  };

  // Data 5 Konsentrasi asli berdasarkan infografis HIMATIF
  const concentrations = [
    {
      title: "Applied Networking",
      desc: "Mempelajari cara merancangkan, membangun, dan mengelola Jaringan Komputer, mulai dari LAN, WAN, hingga konfigurasi perangkat seperti Router, Switch, dan Firewall. Konsentrasi ini juga membahas keamanan Jaringan, Virtualisasi, serta Cloud Networking.",
      skills: "Network setup & configuration, network security, cloud & virtual networks.",
      nextSteps: "Network Engineer, System Administrator, Security Analyst, IT Support."
    },
    {
      title: "Interfacing System",
      desc: "Fokus pada integrasi antara perangkat keras dan lunak, seperti Sistem otomatisasi dan IoT. Mahasiswa akan belajar mikrokontroler (Arduino, Raspberry Pi), komunikasi data, sensor, hingga pengembangan Sistem Embedded yang terhubung ke aplikasi.",
      skills: "Embedded system, hardware programming, sensor & automation, IoT development.",
      nextSteps: "Embedded System Engineer, IoT Developer, Automation Engineer."
    },
    {
      title: "Applied Database",
      desc: "Mengajarkan pengelolaan dan pengembangan sistem database relasional dan non-relasional, termasuk analisis data dan penerapannya dalam Cloud Computing dan big data. Cocok untuk kamu yang tertarik dengan Data dan Logika Sistem Informasi.",
      skills: "SQL/NoSQL, data analysis, big data management, cloud database.",
      nextSteps: "Database Administrator, Data Analyst, Data Engineer, BI Developer, Data Scientist."
    },
    {
      title: "Game & Multimedia",
      desc: "Konsentrasi ini berfokus pada pembuatan Game dan Konten Visual Interaktif. Mahasiswa akan belajar Desain dan Pengembangan Game menggunakan Game Engine, Animasi 2D/3D, Efek Visual, hingga pembuatan karakter dan lingkungan digital yang menarik.",
      skills: "Game development, 3D modeling & animation, visual effects, UX game design.",
      nextSteps: "Game Developer, 3D Artist, Animator, Multimedia Specialist."
    },
    {
      title: "Information Technology",
      desc: "Mempelajari penerapan Teknologi Informasi untuk kebutuhan organisasi dan bisnis, mulai dari Software Engineering, Sistem Informasi, hingga manajemen proyek dan keamanan informasi. Fokusnya Aplikatif dan Strategis.",
      skills: "Software development, system analysis, IT project management, decision support.",
      nextSteps: "IT Consultant, System Analyst, Software Developer, IT Project Manager."
    }
  ];

  // Data Foto Kegiatan HIMATIF (Silakan ganti src dengan path foto kamu nanti)
  const activities = [
    {
      title: "Malam Keakraban (Makrab)",
      date: "September 2025",
      image: "/kegiatan1.jpg" // Ganti dengan file foto kamu di folder public
    },
    {
      title: "Workshop & Tech Talk",
      date: "November 2025",
      image: "/kegiatan2.jpg"
    },
    {
      title: "Pengabdian Kepada Masyarakat",
      date: "Februari 2026",
      image: "/kegiatan3.jpg"
    },
    {
      title: "Rapat Kerja Tahunan",
      date: "Mei 2026",
      image: "/kegiatan4.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 px-6 pb-24 flex flex-col items-center">
      <div className="max-w-4xl w-full z-10">
        
        {/* ==========================================================
            1. PROFILE SECTION
           ========================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full flex flex-col items-center mb-16"
        >
          <div className="flex flex-col items-center bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-teal-500/50 hover:bg-slate-800/50 transition-all duration-300 group w-full max-sm shadow-xl shadow-teal-900/10">
            <div className="w-32 h-32 mb-6 rounded-full bg-slate-950 border-2 border-slate-700 group-hover:border-teal-400 flex items-center justify-center overflow-hidden transition-colors">
              {profileData.photo ? (
                <img src={profileData.photo} alt={profileData.name} className="w-full h-full object-cover" />
              ) : (
                <User size={50} className="text-slate-600 group-hover:text-teal-500 transition-colors" />
              )}
            </div>
            
            <h1 className="text-2xl font-bold text-slate-100 text-center tracking-wide">{profileData.name}</h1>
            <p className="text-teal-400 text-sm font-medium mt-2 text-center px-4">{profileData.role}</p>
            
            <div className="mt-6 pt-4 border-t border-slate-800 w-full text-center">
              <p className="text-slate-400 font-mono text-sm">{profileData.nim}</p>
            </div>
          </div>
        </motion.div>

        {/* ==========================================================
            2. ABOUT ME SECTION
           ========================================================== */}
        <div className="w-full"> 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6" 
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white text-left">
              <span className="bg-linear-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
                About Me
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
              Himpunan Mahasiswa Teknik Informatika (HIMATIF) Universitas Widyatama merupakan organisasi kemahasiswaan intra-kampus yang berfungsi sebagai wadah utama untuk menampung aspirasi, mengasah kreativitas, serta mengembangkan potensi akademis dan non-akademis seluruh mahasiswa program studi Teknik Informatika di Universitas Widyatama.
            </p>
            <p>
              Didirikan dengan semangat kolaborasi dan inovasi di bidang teknologi, HIMATIF berkomitmen untuk menciptakan ekosistem mahasiswa yang unggul, adaptif terhadap perkembangan industri global, serta mampu memberikan kontribusi nyata melalui penerapan Tri Dharma Perguruan Tinggi.
            </p>
          </motion.div>
        </div>

        {/* ==========================================================
            3. LOCATION SECTION
           ========================================================== */}
        <div className="w-full pt-32"> 
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white text-left">
              <span className="bg-linear-to-r from-teal-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-sm">
                Our Location
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
              Sekretariat HIMATIF Universitas Widyatama berlokasi secara strategis di dalam area kampus utama guna mempermudah akses koordinasi bagi seluruh pengurus dan mahasiswa Teknik Informatika. Tempat ini menjadi titik pusat dari perancangan seluruh program kerja serta wadah diskusi harian.
            </p>
            <div className="flex gap-4 p-6 bg-slate-900/30 border border-slate-800 rounded-2xl items-start max-w-2xl shadow-md mt-4">
              <MapPin className="text-teal-400 shrink-0 mt-1" size={20} />
              <div className="text-left space-y-1">
                <p className="font-bold text-slate-100">Gedung Pusat Kegiatan Mahasiswa (PKM) Lt. 2</p>
                <p className="text-sm text-slate-400 leading-relaxed">Jl. Cikutra No. 204A, Sukapada, Kec. Cibeunying Kidul, Kota Bandung, Jawa Barat 40124</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==========================================================
            4. CONCENTRATION SECTION
           ========================================================== */}
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
                  key={index} 
                  className="p-6 bg-slate-900/30 border border-slate-800 rounded-2xl hover:border-teal-500/30 transition-all duration-300 text-left flex flex-col h-full shadow-md"
                >
                  <Layers size={18} className={index % 2 === 0 ? "text-teal-400 mb-3" : "text-cyan-400 mb-3"} />
                  <h3 className="font-bold text-slate-100 text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">{item.desc}</p>
                  
                  <div className="pt-3 border-t border-slate-800/60 space-y-2 text-xs">
                    <p className="text-slate-400"><strong className="text-slate-300">Skill:</strong> {item.skills}</p>
                    <p className="text-slate-400"><strong className="text-slate-300">Next Step:</strong> {item.nextSteps}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ==========================================================
            5. NEW: OUR ACTIVITIES SECTION
           ========================================================== */}
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

            {/* Grid Galeri Foto Kegiatan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {activities.map((act, index) => {
                // Logika pembuat slug otomatis berdasarkan judul kegiatan
                const slug = act.title.toLowerCase().includes("makrab") ? "makrab" 
                           : act.title.toLowerCase().includes("workshop") ? "workshop" 
                           : act.title.toLowerCase().includes("pengabdian") ? "pengabdian" 
                           : "rapat";

                return (
                  <Link 
                    key={index}
                    href={`/picture?kegiatan=${slug}`} // Mengarahkan ke halaman picture dengan filter query
                    className="group relative overflow-hidden bg-slate-900/40 border border-slate-800/80 rounded-2xl shadow-lg transition-all duration-300 hover:border-teal-500/30 flex flex-col cursor-pointer"
                  >
                    {/* Container Foto */}
                    <div className="w-full aspect-video bg-slate-950 overflow-hidden relative">
                      {/* Fallback box jika foto belum ada */}
                      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-slate-600 font-mono text-xs group-hover:scale-105 transition-transform duration-500">
                        [ Tempat Foto: {act.title} ]
                      </div>
                      {/* Jika file foto sudah siap di folder public/, hapus div fallback di atas dan gunakan tag img di bawah ini: */}
                      {/* <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> */}
                    </div>

                    {/* Keterangan Foto */}
                    <div className="p-4 bg-slate-900/20 border-t border-slate-800/50 text-left">
                      <h3 className="font-bold text-slate-100 text-base tracking-wide group-hover:text-teal-400 transition-colors">
                        {act.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                        <Calendar size={12} className="text-slate-500" />
                        <span>{act.date}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ==========================================================
            6. CTA BUTTON SECTION
           ========================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center pt-24"
        >
          <Link href="/projects">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-500/30 text-sm font-medium transition-all hover:scale-105 active:scale-95 group cursor-pointer shadow-lg">
              <Cpu size={16} className="text-slate-500 group-hover:text-teal-400 transition-colors" />
              <span>Lihat Showcases Proyek</span>
              <ArrowRight size={14} className="text-slate-500 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
