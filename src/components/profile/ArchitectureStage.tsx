
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileSpreadsheet, ShieldCheck, Scale } from 'lucide-react';

interface ArchitectureStageProps {
  isFlooded: boolean;
}

export const ArchitectureStage: React.FC<ArchitectureStageProps> = ({ isFlooded }) => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 'web',
      icon: <ShieldCheck className="w-5 h-5 text-[#15803d]" />,
      title: 'Web Development',
      subtitle: 'Modern & Responsive Website',
      desc: 'Membangun website dan aplikasi dengan pendekatan component-based, responsive design, serta struktur kode yang mudah dikembangkan.',
      tags: [
        'React',
        'TypeScript',
        'JavaScript',
        'Vite',
        'Tailwind CSS'
      ]
    },
    {
      id: 'frontend',
      icon: <FileSpreadsheet className="w-5 h-5 text-[#15803d]" />,
      title: 'Frontend Development',
      subtitle: 'Interactive User Interface',
      desc: 'Mengembangkan interface modern, responsive, dan interaktif untuk kebutuhan website bisnis maupun aplikasi digital.',
      tags: [
        'HTML',
        'CSS',
        'React',
        'TypeScript',
        'Tailwind CSS'
      ]
    },
    {
      id: 'system',
      icon: <Scale className="w-5 h-5 text-[#78350f]" />,
      title: 'Backend & System Development',
      subtitle: 'Database & Information System',
      desc: 'Mengembangkan sistem informasi dengan PHP, CodeIgniter, MySQL, autentikasi, pengelolaan data, dan integrasi database.',
      tags: [
        'PHP',
        'CodeIgniter',
        'MySQL',
        'Authentication',
        'Database'
      ]
    }
  ];

  const isMobile =
    typeof window !== 'undefined' ? window.innerWidth < 640 : false;

  return (
    <motion.div
      animate={
        isFlooded
          ? {
              rotate: isMobile ? 3 : 15,
              x: isMobile ? 0 : 28,
              y: isMobile ? 16 : 50,
              scale: 0.98,
              transition: {
                type: 'spring',
                stiffness: 150,
                damping: 16
              }
            }
          : {
              rotate: 0,
              x: 0,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 18
              }
            }
      }
      className="w-full flex flex-col gap-6"
    >
      {/* Selector Tabs */}
      <div className="grid grid-cols-3 gap-2.5 p-1.5 rounded-2xl bg-[#fffdf5] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]">
        {pillars.map((pillar, idx) => (
          <motion.button
            key={pillar.id}
            type="button"
            onClick={() => setActivePillar(idx)}
            animate={
              isFlooded
                ? {
                    rotate: idx === 0 ? -18 : idx === 1 ? 20 : -22,
                    y: idx === 0 ? 14 : idx === 1 ? -16 : 20,
                    x: idx === 0 ? -8 : idx === 1 ? 8 : 12
                  }
                : {
                    rotate: 0,
                    y: 0,
                    x: 0
                  }
            }
            className={`flex flex-col items-center justify-center p-3 rounded-xl text-center transition-all cursor-pointer ${
              activePillar === idx
                ? 'bg-[#15803d] text-white shadow-[2px_2px_0px_#1c1917] border border-[#14532d]'
                : 'hover:bg-[#fef08a] text-[#44403c] hover:text-[#1c1917]'
            }`}
          >
            <span
              className={`text-xs font-mono font-bold block ${
                activePillar === idx
                  ? 'text-[#fde047]'
                  : 'text-[#78350f]'
              }`}
            >
              0{idx + 1}
            </span>

            <span className="text-xs font-black leading-tight mt-0.5">
              {pillar.id.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>

      {/* Active Pillar Card */}
      <div className="relative min-h-[305px] sm:min-h-[315px] rounded-[32px] bg-[#fffdf5] border-2 border-[#1c1917] shadow-[5px_5px_0px_#1c1917] overflow-hidden">
        <motion.div
          key={activePillar}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.22,
            ease: 'easeOut'
          }}
          className="p-7 sm:p-9 h-full flex flex-col justify-between space-y-5"
        >
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-2xl bg-[#dcfce7] border-2 border-[#1c1917] shadow-[2px_2px_0px_#1c1917] shrink-0">
                  {pillars[activePillar].icon}
                </div>

                <div>
                  <span className="text-xs font-mono font-black text-[#15803d]">
                    0{activePillar + 1} // {pillars[activePillar].subtitle}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-black text-[#1c1917] mt-0.5">
                    {pillars[activePillar].title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm sm:text-base text-[#44403c] font-medium leading-relaxed">
              {pillars[activePillar].desc}
            </p>
          </div>

          <div className="pt-4 border-t-2 border-[#1c1917]/10">
            <span className="text-xs font-mono font-black text-[#78350f] block mb-2.5">
              TECH STACK:
            </span>

            <div className="flex flex-wrap gap-2">
              {pillars[activePillar].tags.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 rounded-xl bg-[#fef08a] text-xs font-mono font-bold text-[#1c1917] border border-[#1c1917] shadow-[1.5px_1.5px_0px_#1c1917]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <motion.div
          animate={
            isFlooded
              ? {
                  rotate: -24,
                  x: -38,
                  y: 70,
                  scale: 0.94
                }
              : {
                  rotate: 0,
                  x: 0,
                  y: 0,
                  scale: 1
                }
          }
          transition={{
            type: 'spring',
            stiffness: 160,
            damping: 15
          }}
          className="p-4 rounded-2xl bg-[#fffdf5] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]"
        >
          <span className="text-xs font-black text-[#1c1917] block">
            Clean Development
          </span>

          <p className="text-[11px] text-[#44403c] font-medium mt-1 leading-relaxed">
            Struktur kode dibuat terorganisir, mudah dipahami, dan siap dikembangkan untuk kebutuhan proyek.
          </p>
        </motion.div>

        <motion.div
          animate={
            isFlooded
              ? {
                  rotate: 32,
                  x: 18,
                  y: 80,
                  scale: 0.93
                }
              : {
                  rotate: 0,
                  x: 0,
                  y: 0,
                  scale: 1
                }
          }
          transition={{
            type: 'spring',
            stiffness: 160,
            damping: 15
          }}
          className="p-4 rounded-2xl bg-[#fffdf5] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]"
        >
          <span className="text-xs font-black text-[#1c1917] block">
            Responsive Design
          </span>

          <p className="text-[11px] text-[#44403c] font-medium mt-1 leading-relaxed">
            Interface dirancang agar tetap nyaman digunakan pada desktop, tablet, maupun perangkat mobile.
          </p>
        </motion.div>

        <motion.div
          animate={
            isFlooded
              ? {
                  rotate: -18,
                  x: 48,
                  y: -20,
                  scale: 0.95
                }
              : {
                  rotate: 0,
                  x: 0,
                  y: 0,
                  scale: 1
                }
          }
          transition={{
            type: 'spring',
            stiffness: 160,
            damping: 15
          }}
          className="p-4 rounded-2xl bg-[#fffdf5] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]"
        >
          <span className="text-xs font-black text-[#1c1917] block">
            System Ready
          </span>

          <p className="text-[11px] text-[#44403c] font-medium mt-1 leading-relaxed">
            Berpengalaman membuat sistem informasi, pengelolaan database, autentikasi, dan fitur berbasis kebutuhan pengguna.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};