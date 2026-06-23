'use client';

import { motion } from 'framer-motion';
import { Cpu, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AboutSection from '@/components/AboutSection';
import ActivitySection from '@/components/ActivitySection';
import ConcentrationSection from '@/components/ConcentrationSection';
import HomeContentEditor from '@/components/HomeContentEditor';
import LocationSection from '@/components/LocationSection';
import ProfileSection from '@/components/ProfileSection';
import useEditableContent from '@/lib/useEditableContent';

export default function Home() {
  const { content, setContent, isAdmin, saving, saveSection } = useEditableContent();

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

  if (!content) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-400 pt-32 px-6 pb-24 flex flex-col items-center">
        Memuat konten...
      </main>
    );
  }

  const home = content.home;
  const updateHome = (homeValue) => {
    setContent({ ...content, home: homeValue });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 px-6 pb-24 flex flex-col items-center">
      <div className="max-w-4xl w-full z-10">
        
        <ProfileSection profile={home.profile} />
        {isAdmin && (
          <HomeContentEditor
            home={home}
            onChange={updateHome}
            onSave={() => saveSection('home', home)}
            saving={saving}
          />
        )}

        {/* ==========================================================
            2. ABOUT ME SECTION
           ========================================================== */}
        <AboutSection about={home.about} />

        {/* ==========================================================
            3. LOCATION SECTION
           ========================================================== */}
        <LocationSection location={home.location} />

        {/* ==========================================================
            4. CONCENTRATION SECTION
           ========================================================== */}
        <ConcentrationSection concentrations={concentrations} />

        {/* ==========================================================
            5. NEW: OUR ACTIVITIES SECTION
           ========================================================== */}
        <ActivitySection activities={home.activities} />

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
