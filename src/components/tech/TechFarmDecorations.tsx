import React from 'react';
import { motion } from 'framer-motion';

export const TechFarmDecorations: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Digital Gradient Landscape */}
      <div className="absolute inset-0 w-full h-full">
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M-50,0 C320,110 580,30 920,120 C1240,210 1380,80 1500,140 L1500,900 L-50,900 Z"
            fill="#e0f2fe"
            opacity="0.85"
          />

          <path
            d="M-50,220 C280,350 640,190 980,320 C1260,420 1420,280 1500,340 L1500,900 L-50,900 Z"
            fill="#bae6fd"
            opacity="0.7"
          />

          <path
            d="M-50,480 C360,390 740,560 1080,440 C1320,360 1440,500 1500,470 L1500,900 L-50,900 Z"
            fill="#dbeafe"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Digital Grid / Architecture Lines */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-45"
      >
        <path
          d="M0,100 C320,160 600,80 900,170 C1180,250 1340,140 1440,190"
          stroke="#0284c7"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />

        <path
          d="M0,300 C320,400 650,240 980,350 C1250,440 1380,330 1440,390"
          stroke="#0369a1"
          strokeWidth="1.5"
          strokeDasharray="8 10"
        />

        <path
          d="M0,550 C360,450 720,620 1080,500 C1300,430 1400,540 1440,510"
          stroke="#0f172a"
          strokeWidth="1.5"
        />

        <path
          d="M120,0 L120,900"
          stroke="#0284c7"
          strokeWidth="1"
          strokeDasharray="4 12"
          opacity="0.25"
        />

        <path
          d="M1320,0 L1320,900"
          stroke="#0284c7"
          strokeWidth="1"
          strokeDasharray="4 12"
          opacity="0.25"
        />
      </svg>

      {/* Floating Developer Terminal - Top Right */}
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotate: [0, 1.5, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut'
        }}
        className="absolute top-16 right-10 sm:right-28 opacity-90"
      >
        <div className="relative w-[76px] h-[58px] rounded-xl bg-[#0f172a] border-2 border-[#0f172a] shadow-[4px_4px_0px_#0284c7] overflow-hidden">
          <div className="h-4 bg-[#1e293b] border-b border-[#475569] flex items-center gap-1 px-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f87171]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#fde047]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
          </div>

          <div className="px-2 pt-2 space-y-1">
            <div className="text-[7px] font-mono text-[#38bdf8]">
              {'> npm run dev'}
            </div>

            <div className="text-[6px] font-mono text-[#4ade80]">
              {'✓ ready'}
            </div>

            <div className="text-[6px] font-mono text-[#94a3b8]">
              localhost:5173
            </div>
          </div>
        </div>
      </motion.div>

      {/* Code Brackets - Top Left */}
      <motion.div
        animate={{
          rotate: [-2, 2, -2],
          y: [0, -2, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: 'easeInOut'
        }}
        className="absolute top-14 left-6 sm:left-16 opacity-85"
      >
        <svg
          width="68"
          height="60"
          viewBox="0 0 68 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <rect
            x="3"
            y="3"
            width="62"
            height="54"
            rx="12"
            fill="#fffdf5"
            stroke="#0f172a"
            strokeWidth="2"
          />

          <path
            d="M27 17 L17 30 L27 43"
            stroke="#0284c7"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M41 17 L51 30 L41 43"
            stroke="#15803d"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M37 14 L31 46"
            stroke="#fde047"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Floating System Node - Middle Left */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          x: [0, 2, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 5.5,
          ease: 'easeInOut'
        }}
        className="absolute top-1/2 left-6 sm:left-14 opacity-80"
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm"
        >
          <circle
            cx="26"
            cy="26"
            r="20"
            fill="#eff6ff"
            stroke="#0f172a"
            strokeWidth="2"
          />

          <circle
            cx="26"
            cy="26"
            r="7"
            fill="#0284c7"
            stroke="#0f172a"
            strokeWidth="2"
          />

          <circle
            cx="11"
            cy="15"
            r="4"
            fill="#fde047"
            stroke="#0f172a"
            strokeWidth="1.5"
          />

          <circle
            cx="41"
            cy="15"
            r="4"
            fill="#4ade80"
            stroke="#0f172a"
            strokeWidth="1.5"
          />

          <circle
            cx="11"
            cy="39"
            r="4"
            fill="#f87171"
            stroke="#0f172a"
            strokeWidth="1.5"
          />

          <circle
            cx="41"
            cy="39"
            r="4"
            fill="#38bdf8"
            stroke="#0f172a"
            strokeWidth="1.5"
          />

          <path
            d="M15 17 L21 22"
            stroke="#0f172a"
            strokeWidth="1.5"
          />

          <path
            d="M37 17 L31 22"
            stroke="#0f172a"
            strokeWidth="1.5"
          />

          <path
            d="M15 37 L21 31"
            stroke="#0f172a"
            strokeWidth="1.5"
          />

          <path
            d="M37 37 L31 31"
            stroke="#0f172a"
            strokeWidth="1.5"
          />
        </svg>
      </motion.div>

      {/* Database Stack - Bottom Right */}
      <motion.div
        animate={{
          y: [0, -3, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 4.5,
          ease: 'easeInOut'
        }}
        className="absolute bottom-12 right-6 sm:right-20 opacity-85 pointer-events-none"
      >
        <svg
          width="76"
          height="64"
          viewBox="0 0 76 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <ellipse
            cx="38"
            cy="55"
            rx="28"
            ry="6"
            fill="#0284c7"
            opacity="0.15"
          />

          <ellipse
            cx="38"
            cy="14"
            rx="22"
            ry="8"
            fill="#dbeafe"
            stroke="#0f172a"
            strokeWidth="2"
          />

          <path
            d="M16 14 V28 C16 32 26 36 38 36 C50 36 60 32 60 28 V14"
            fill="#bae6fd"
            stroke="#0f172a"
            strokeWidth="2"
          />

          <path
            d="M16 27 V41 C16 45 26 49 38 49 C50 49 60 45 60 41 V27"
            fill="#93c5fd"
            stroke="#0f172a"
            strokeWidth="2"
          />

          <ellipse
            cx="38"
            cy="14"
            rx="22"
            ry="8"
            fill="#38bdf8"
            opacity="0.5"
          />

          <circle
            cx="29"
            cy="14"
            r="2"
            fill="#0f172a"
          />

          <circle
            cx="38"
            cy="14"
            r="2"
            fill="#0f172a"
          />

          <circle
            cx="47"
            cy="14"
            r="2"
            fill="#0f172a"
          />
        </svg>
      </motion.div>
    </div>
  );
};