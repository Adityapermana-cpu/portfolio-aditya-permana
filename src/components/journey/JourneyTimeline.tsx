import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring
} from 'framer-motion';

import {
  GraduationCap,
  Layers,
  Rocket,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Compass
} from 'lucide-react';

import {
  experienceData
} from '../../data/portfolioData';

import type {
  ExperienceItem
} from '../../types/portfolio';

import { JourneyFarmCanvas } from './JourneyFarmCanvas';

const categoryConfig: Record<
  NonNullable<ExperienceItem['category']>,
  {
    label: string;
    icon: React.FC<{
      className?: string;
    }>;
    color: string;
    bg: string;
  }
> = {
  education: {
    label: 'Pendidikan',
    icon: GraduationCap,
    color: '#0369a1',
    bg: '#e0f2fe'
  },
  bootcamp: {
    label: 'Pembelajaran',
    icon: Layers,
    color: '#7c3aed',
    bg: '#ede9fe'
  },
  project: {
    label: 'Project',
    icon: Rocket,
    color: '#15803d',
    bg: '#dcfce7'
  },
  security: {
    label: 'Experience',
    icon: ShieldCheck,
    color: '#c2410c',
    bg: '#ffedd5'
  }
};

export const JourneyTimeline: React.FC = () => {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } =
    useScroll({
      target: containerRef,
      offset: [
        'start 75%',
        'end 80%'
      ]
    });

  const progress =
    useSpring(
      scrollYProgress,
      {
        stiffness: 90,
        damping: 24,
        mass: 0.45
      }
    );

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative z-20 -mt-1 w-full py-28 overflow-hidden bg-[#fefae0] text-[#1c1917]"
    >
      {/* animated background */}
      <JourneyFarmCanvas />

      {/* soft overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#fefae0]/70 via-[#fefae0]/35 to-[#fefae0]/85 z-[1]" />

      {/* digital decorative node */}
      <motion.div
        className="absolute top-24 right-4 sm:right-10 lg:right-16 z-[2] pointer-events-none"
        animate={{
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#e0f2fe] border-2 border-[#1c1917] shadow-[4px_4px_0px_#1c1917] flex items-center justify-center">
          <Compass className="w-7 h-7 text-[#0369a1]" />

          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#22c55e] border border-[#1c1917]" />
        </div>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* header */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#fde047] text-[#1c1917] text-xs font-mono font-black border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]">
            <span>
              06 // EXPERIENCE &amp; DEVELOPMENT JOURNEY
            </span>
          </div>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.05]">
            Pendidikan, Pengalaman &amp; Perjalanan
          </h2>

          <p className="mt-4 max-w-3xl text-sm sm:text-base text-[#44403c] font-medium leading-relaxed">
            Perjalanan saya dari pendidikan Rekayasa Perangkat
            Lunak hingga pengalaman dalam pengembangan sistem
            digital, administrasi data, pelayanan, dan pekerjaan
            operasional. Setiap pengalaman menjadi bagian dari
            proses membangun kemampuan teknis dan profesional.
          </p>
        </div>

        {/* timeline */}
        <div className="relative mt-14">
          {/* timeline track */}
          <div className="absolute left-[18px] sm:left-[28px] top-0 bottom-0 w-[3px] rounded-full bg-[#d6d3d1] overflow-hidden">
            <motion.div
              className="w-full origin-top bg-gradient-to-b from-[#2563eb] via-[#15803d] to-[#f97316]"
              style={{
                height: '100%',
                scaleY: progress
              }}
            />
          </div>

          <div className="space-y-8 sm:space-y-10">
            {experienceData.map(
              (
                item,
                index
              ) => {
                const category =
                  item.category &&
                  categoryConfig[item.category]
                    ? categoryConfig[item.category]
                    : categoryConfig.project;

                const Icon =
                  category.icon;

                return (
                  <motion.article
                    key={item.id}
                    initial={{
                      opacity: 0,
                      y: 24
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    viewport={{
                      once: true,
                      amount: 0.15
                    }}
                    transition={{
                      duration: 0.55,
                      delay:
                        Math.min(
                          index * 0.04,
                          0.25
                        )
                    }}
                    className="relative pl-12 sm:pl-20"
                  >
                    {/* node */}
                    <div
                      className="absolute left-0 top-1 w-9 h-9 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917] flex items-center justify-center"
                      style={{
                        backgroundColor:
                          category.bg,
                        color:
                          category.color
                      }}
                    >
                      <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>

                    {/* card */}
                    <div className="rounded-[24px] sm:rounded-[28px] bg-[#fffdf5] border-2 border-[#1c1917] shadow-[5px_5px_0px_#1c1917] p-4 sm:p-6">
                      {/* top row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-[#1c1917]/40 text-[10px] sm:text-xs font-mono font-black"
                          style={{
                            backgroundColor:
                              category.bg,
                            color:
                              category.color
                          }}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {category.label}
                        </span>

                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#f5f5f4] border border-[#1c1917]/30 text-[10px] sm:text-xs font-mono font-bold text-[#57534e]">
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>

                        {item.badge && (
                          <span className="px-2.5 py-1 rounded-lg bg-[#fde047] border border-[#1c1917]/40 text-[10px] sm:text-xs font-mono font-black text-[#1c1917]">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* title */}
                      <h3 className="mt-4 text-xl sm:text-2xl font-black text-[#1c1917] leading-tight">
                        {item.role}
                      </h3>

                      <div className="mt-1 text-sm sm:text-base font-bold text-[#15803d]">
                        {item.organization}
                      </div>

                      {/* description */}
                      <p className="mt-4 text-sm text-[#44403c] font-medium leading-relaxed">
                        {item.description}
                      </p>

                      {/* highlights */}
                      {item.highlights &&
                        item.highlights.length >
                          0 && (
                          <div className="mt-5">
                            <div className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider text-[#57534e]">
                              Poin Kunci &amp; Spesialisasi
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2.5">
                              {item.highlights.map(
                                (
                                  highlight
                                ) => (
                                  <div
                                    key={
                                      highlight
                                    }
                                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#f8fafc] border border-[#1c1917]/15"
                                  >
                                    <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />

                                    <span className="text-xs sm:text-sm text-[#44403c] font-medium leading-relaxed">
                                      {
                                        highlight
                                      }
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                      {/* technology tags */}
                      {item.tech &&
                        item.tech.length >
                          0 && (
                          <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-[#1c1917]/10">
                            {item.tech.map(
                              (tech) => (
                                <span
                                  key={
                                    tech
                                  }
                                  className="px-2.5 py-1 rounded-lg bg-[#f5f5f4] border border-[#1c1917]/25 text-[10px] sm:text-[11px] font-mono font-bold text-[#44403c]"
                                >
                                  {
                                    tech
                                  }
                                </span>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </motion.article>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyTimeline;