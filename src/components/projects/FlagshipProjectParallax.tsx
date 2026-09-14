import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ExternalLink,
  Lock,
  Layers,
  Smartphone
} from 'lucide-react';

import type { Project } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { AnimatedOceanSlideBackground } from './AnimatedOceanSlideBackground';

interface FlagshipSlideCardProps {
  project: Project;
  index: number;
  yMotion?: string | number;
  opacityMotion?: number;
  depthLevel?: 1 | 2 | 3 | 4;
  onSelectProject: (project: Project) => void;
}

export const FlagshipSlideCard: React.FC<FlagshipSlideCardProps> = ({
  project,
  index,
  yMotion = '0%',
  opacityMotion = 1,
  depthLevel = 1,
  onSelectProject
}) => {
  const zIndex = 10 + index * 10;

  const safeDepthLevel = Math.min(
    Math.max(depthLevel, 1),
    4
  ) as 1 | 2 | 3 | 4;

  const categoryLabel =
    project.category === 'mobile'
      ? 'MOBILE & DIGITAL SYSTEM'
      : 'WEB DEVELOPMENT';

  return (
    <motion.div
      className="
        relative
        sm:absolute
        sm:inset-0

        w-full
        min-w-0

        min-h-screen
        sm:h-screen

        overflow-visible
        sm:overflow-hidden

        bg-[#14532d]
      "
      style={{
        y: yMotion,
        opacity: opacityMotion,
        zIndex
      }}
    >
      <AnimatedOceanSlideBackground
        depthLevel={safeDepthLevel}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#14532d]/80 via-[#166534]/50 to-[#052e16]/90" />

      <div
        className="
          relative
          z-10
          w-full
          min-w-0

          min-h-screen
          sm:h-full

          flex
          items-start
          sm:items-center

          px-3
          sm:px-8
          lg:px-12
          xl:px-16

          pt-24
          pb-16
          sm:py-28
        "
      >
        <div className="w-full max-w-7xl mx-auto min-w-0">
          {/* top information */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-xl bg-[#fde047] text-[#1c1917] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]">
                <span className="text-[10px] sm:text-xs font-mono font-black tracking-wide break-words">
                  0{index + 1} // {categoryLabel}
                </span>
              </div>

              {project.role && (
                <div className="max-w-full px-3 py-1.5 rounded-xl bg-[#fffdf5] text-[#1c1917] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]">
                  <span className="text-[10px] sm:text-xs font-mono font-bold break-words">
                    {project.role}
                  </span>
                </div>
              )}
            </div>

            <div className="max-w-full px-3 py-1.5 rounded-xl bg-[#15803d] text-white border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]">
              <span className="text-[10px] sm:text-xs font-mono font-black tracking-wide break-words">
                PROJECT UNGGULAN {index + 1} / 4
              </span>
            </div>
          </div>

          {/* main layout */}
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[0.95fr_1.05fr]
              gap-5
              lg:gap-8
              items-start
              lg:items-center
              min-w-0
            "
          >
            {/* information card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.1
              }}
              className="
                relative
                min-w-0
                w-full

                rounded-[26px]
                sm:rounded-[32px]

                bg-[#fffdf5]
                border-2
                border-[#1c1917]
                shadow-[6px_6px_0px_#1c1917]

                p-5
                sm:p-7
                lg:p-8
              "
            >
              <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-[#fde047] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917] flex items-center justify-center z-20">
                <Layers className="w-5 h-5 text-[#1c1917]" />
              </div>

              <div className="text-[10px] sm:text-xs font-mono font-black text-[#15803d] uppercase tracking-widest mb-2 break-words [overflow-wrap:anywhere]">
                {project.subtitle}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c1917] tracking-tight leading-[0.98] break-words [overflow-wrap:anywhere]">
                {project.title}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-[#44403c] font-medium leading-relaxed break-words [overflow-wrap:anywhere]">
                {project.summary}
              </p>

              {/* metrics */}
              {project.metrics?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-5">
                  {project.metrics.slice(0, 3).map((metric) => (
                    <div
                      key={`${metric.label}-${metric.value}`}
                      className="
                        min-w-0
                        overflow-hidden
                        rounded-xl
                        bg-[#f0fdf4]
                        border-2
                        border-[#1c1917]
                        p-2.5
                      "
                    >
                      <div className="text-sm sm:text-base font-black text-[#15803d] break-words [overflow-wrap:anywhere]">
                        {metric.value}
                      </div>

                      <div className="mt-0.5 text-[9px] sm:text-[10px] font-mono font-bold text-[#57534e] uppercase leading-tight break-words [overflow-wrap:anywhere]">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* stack */}
              {project.stack?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-5 min-w-0">
                  {project.stack.slice(0, 8).map((item) => (
                    <span
                      key={item}
                      className="
                        max-w-full
                        px-2.5
                        py-1
                        rounded-lg
                        bg-[#f5f5f4]
                        border
                        border-[#1c1917]/30
                        text-[10px]
                        sm:text-[11px]
                        font-mono
                        font-bold
                        text-[#292524]
                        break-words
                        [overflow-wrap:anywhere]
                      "
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* actions */}
              <div className="flex flex-wrap gap-2.5 mt-6 min-w-0">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c1917] text-white border-2 border-[#1c1917] shadow-[3px_3px_0px_#15803d] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#15803d] transition-all duration-200 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-black">
                    Studi Kasus
                  </span>

                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </button>

                {project.isMobileApp && (
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#e0f2fe] text-[#075985] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]">
                    <Smartphone className="w-4 h-4 shrink-0" />

                    <span className="text-xs sm:text-sm font-black">
                      Mobile Native
                    </span>
                  </span>
                )}

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#dcfce7] text-[#166534] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />

                    <span className="text-xs sm:text-sm font-black">
                      Live Demo
                    </span>
                  </a>
                )}

                {project.isPrivateRepo ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f5f5f4] text-[#44403c] border-2 border-[#1c1917]/50">
                    <Lock className="w-4 h-4 shrink-0" />

                    <span className="text-xs sm:text-sm font-black">
                      Repo Private
                    </span>
                  </span>
                ) : project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fffdf5] text-[#1c1917] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />

                    <span className="text-xs sm:text-sm font-black">
                      GitHub
                    </span>
                  </a>
                ) : null}
              </div>
            </motion.div>

            {/* project preview */}
            <motion.div
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.18
              }}
              className="
                relative
                min-w-0
                w-full

                min-h-[340px]
                sm:min-h-[340px]
                lg:min-h-[430px]

                flex
                items-start
                lg:items-center

                overflow-visible
              "
            >
              <ProjectPreviewPlaceholder
                project={project}
                className="
                  w-full
                  h-[320px]
                  sm:h-[350px]
                  lg:h-[440px]
                "
                isMobileFrame={project.isMobileApp}
              />

              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="
                  absolute
                  -bottom-3
                  left-3
                  sm:left-8

                  max-w-[calc(100%-24px)]

                  px-3.5
                  py-2
                  rounded-xl
                  bg-[#fde047]
                  text-[#1c1917]
                  border-2
                  border-[#1c1917]
                  shadow-[3px_3px_0px_#1c1917]

                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                  cursor-pointer
                "
              >
                <span className="text-[10px] sm:text-xs font-mono font-black whitespace-nowrap">
                  Buka Arsitektur Sistem
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlagshipSlideCard;
