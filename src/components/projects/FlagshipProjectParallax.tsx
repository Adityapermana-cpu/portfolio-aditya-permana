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
        absolute
        inset-0
        w-full
        h-screen
        overflow-hidden
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
          h-full
          flex
          items-center
          px-3
          sm:px-8
          lg:px-12
          xl:px-16
          py-14
          sm:py-28
        "
      >
        <div className="w-full max-w-7xl mx-auto min-w-0">

          {/* ==================================
              TOP INFORMATION
          =================================== */}

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-2
              sm:gap-3
              mb-4
              sm:mb-6
            "
          >
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-1.5
                sm:gap-2
                min-w-0
                max-w-[75%]
              "
            >
              <div
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  sm:gap-2
                  px-2
                  sm:px-3
                  py-1.5
                  sm:py-1.5
                  rounded-lg
                  sm:rounded-xl
                  bg-[#fde047]
                  text-[#1c1917]
                  border-2
                  border-[#1c1917]
                  shadow-[2px_2px_0px_#1c1917]
                  sm:shadow-[3px_3px_0px_#1c1917]
                  min-w-0
                "
              >
                <span
                  className="
                    text-[8px]
                    sm:text-xs
                    font-mono
                    font-black
                    tracking-wide
                    leading-tight
                  "
                >
                  0{index + 1} // {categoryLabel}
                </span>
              </div>

              {project.role && (
                <div
                  className="
                    px-2
                    sm:px-3
                    py-1.5
                    sm:py-1.5
                    rounded-lg
                    sm:rounded-xl
                    bg-[#fffdf5]
                    text-[#1c1917]
                    border-2
                    border-[#1c1917]
                    shadow-[2px_2px_0px_#1c1917]
                    sm:shadow-[3px_3px_0px_#1c1917]
                    min-w-0
                  "
                >
                  <span
                    className="
                      text-[8px]
                      sm:text-xs
                      font-mono
                      font-bold
                      leading-tight
                    "
                  >
                    {project.role}
                  </span>
                </div>
              )}
            </div>

            <div
              className="
                px-2
                sm:px-3
                py-1.5
                sm:py-1.5
                rounded-lg
                sm:rounded-xl
                bg-[#15803d]
                text-white
                border-2
                border-[#1c1917]
                shadow-[2px_2px_0px_#1c1917]
                sm:shadow-[3px_3px_0px_#1c1917]
                shrink-0
              "
            >
              <span
                className="
                  text-[8px]
                  sm:text-xs
                  font-mono
                  font-black
                  tracking-wide
                  whitespace-nowrap
                "
              >
                PROJECT UNGGULAN {index + 1} / 4
              </span>
            </div>
          </div>

          {/* ==================================
              MAIN LAYOUT
              MOBILE = 2 CARD SEIMBANG
          =================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-2.5
              sm:gap-5
              lg:grid-cols-[0.95fr_1.05fr]
              lg:gap-8
              items-stretch
              w-full
              min-w-0
            "
          >

            {/* ==================================
                INFORMATION CARD
            =================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: -24
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.1
              }}
              className="
                relative
                min-w-0
                w-full
                h-[295px]
                sm:h-auto
                sm:min-h-[340px]
                lg:min-h-[430px]
                rounded-[18px]
                sm:rounded-[32px]
                bg-[#fffdf5]
                border-2
                border-[#1c1917]
                shadow-[4px_4px_0px_#1c1917]
                sm:shadow-[6px_6px_0px_#1c1917]
                p-3
                sm:p-7
                lg:p-8
                flex
                flex-col
                overflow-hidden
              "
            >

              {/* decoration */}

              <div
                className="
                  absolute
                  -top-2
                  -right-2
                  sm:-top-3
                  sm:-right-3
                  w-7
                  h-7
                  sm:w-10
                  sm:h-10
                  rounded-lg
                  sm:rounded-xl
                  bg-[#fde047]
                  border-2
                  border-[#1c1917]
                  shadow-[2px_2px_0px_#1c1917]
                  sm:shadow-[3px_3px_0px_#1c1917]
                  flex
                  items-center
                  justify-center
                  z-20
                "
              >
                <Layers
                  className="
                    w-3.5
                    h-3.5
                    sm:w-5
                    sm:h-5
                    text-[#1c1917]
                  "
                />
              </div>

              {/* subtitle */}

              <div
                className="
                  text-[7px]
                  sm:text-xs
                  font-mono
                  font-black
                  text-[#15803d]
                  uppercase
                  tracking-wide
                  sm:tracking-widest
                  mb-1.5
                  sm:mb-2
                  leading-tight
                  pr-4
                "
              >
                {project.subtitle}
              </div>

              {/* title */}

              <h2
                className="
                  text-[20px]
                  sm:text-4xl
                  lg:text-5xl
                  font-black
                  text-[#1c1917]
                  tracking-tight
                  leading-[0.95]
                  break-words
                "
              >
                {project.title}
              </h2>

              {/* summary */}

              <p
                className="
                  mt-2
                  sm:mt-4
                  text-[8px]
                  sm:text-base
                  text-[#44403c]
                  font-medium
                  leading-[1.35]
                  sm:leading-relaxed
                  line-clamp-4
                  sm:line-clamp-none
                "
              >
                {project.summary}
              </p>

              {/* metrics */}

              {project.metrics?.length > 0 && (
                <div
                  className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    gap-1.5
                    sm:gap-2.5
                    mt-3
                    sm:mt-5
                  "
                >
                  {project.metrics
                    .slice(0, 3)
                    .map((metric) => (
                      <div
                        key={`${metric.label}-${metric.value}`}
                        className="
                          rounded-lg
                          sm:rounded-xl
                          bg-[#f0fdf4]
                          border-2
                          border-[#1c1917]
                          p-1.5
                          sm:p-2.5
                          min-w-0
                        "
                      >
                        <div
                          className="
                            text-[9px]
                            sm:text-base
                            font-black
                            text-[#15803d]
                            leading-tight
                          "
                        >
                          {metric.value}
                        </div>

                        <div
                          className="
                            mt-0.5
                            text-[6px]
                            sm:text-[10px]
                            font-mono
                            font-bold
                            text-[#57534e]
                            uppercase
                            leading-tight
                          "
                        >
                          {metric.label}
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* stack */}

              {project.stack?.length > 0 && (
                <div
                  className="
                    flex
                    flex-wrap
                    gap-1
                    sm:gap-1.5
                    mt-3
                    sm:mt-5
                    max-h-[38px]
                    sm:max-h-none
                    overflow-hidden
                  "
                >
                  {project.stack
                    .slice(0, 8)
                    .map((item) => (
                      <span
                        key={item}
                        className="
                          px-1.5
                          sm:px-2.5
                          py-0.5
                          sm:py-1
                          rounded-md
                          sm:rounded-lg
                          bg-[#f5f5f4]
                          border
                          border-[#1c1917]/30
                          text-[6px]
                          sm:text-[11px]
                          font-mono
                          font-bold
                          text-[#292524]
                          leading-tight
                        "
                      >
                        {item}
                      </span>
                    ))}
                </div>
              )}

              {/* actions */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-1.5
                  sm:gap-2.5
                  mt-auto
                  pt-3
                  sm:pt-6
                "
              >

                {/* Studi Kasus */}

                <button
                  type="button"
                  onClick={() =>
                    onSelectProject(project)
                  }
                  className="
                    inline-flex
                    items-center
                    gap-1
                    sm:gap-2
                    px-2
                    sm:px-4
                    py-1.5
                    sm:py-2.5
                    rounded-lg
                    sm:rounded-xl
                    bg-[#1c1917]
                    text-white
                    border-2
                    border-[#1c1917]
                    shadow-[2px_2px_0px_#15803d]
                    sm:shadow-[3px_3px_0px_#15803d]
                    hover:-translate-y-0.5
                    hover:shadow-[4px_4px_0px_#15803d]
                    transition-all
                    duration-200
                    cursor-pointer
                    min-w-0
                  "
                >
                  <span
                    className="
                      text-[7px]
                      sm:text-sm
                      font-black
                      whitespace-nowrap
                    "
                  >
                    Studi Kasus
                  </span>

                  <ArrowUpRight
                    className="
                      w-3
                      h-3
                      sm:w-4
                      sm:h-4
                      shrink-0
                    "
                  />
                </button>

                {/* Mobile Native */}

                {project.isMobileApp && (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      sm:gap-2
                      px-2
                      sm:px-4
                      py-1.5
                      sm:py-2.5
                      rounded-lg
                      sm:rounded-xl
                      bg-[#e0f2fe]
                      text-[#075985]
                      border-2
                      border-[#1c1917]
                      shadow-[2px_2px_0px_#1c1917]
                      sm:shadow-[3px_3px_0px_#1c1917]
                    "
                  >
                    <Smartphone
                      className="
                        w-3
                        h-3
                        sm:w-4
                        sm:h-4
                      "
                    />

                    <span
                      className="
                        text-[7px]
                        sm:text-sm
                        font-black
                        whitespace-nowrap
                      "
                    >
                      Mobile Native
                    </span>
                  </span>
                )}

                {/* Live Demo */}

                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-1
                      sm:gap-2
                      px-2
                      sm:px-4
                      py-1.5
                      sm:py-2.5
                      rounded-lg
                      sm:rounded-xl
                      bg-[#dcfce7]
                      text-[#166534]
                      border-2
                      border-[#1c1917]
                      shadow-[2px_2px_0px_#1c1917]
                      sm:shadow-[3px_3px_0px_#1c1917]
                      hover:-translate-y-0.5
                      transition-all
                      duration-200
                    "
                  >
                    <ExternalLink
                      className="
                        w-3
                        h-3
                        sm:w-4
                        sm:h-4
                      "
                    />

                    <span
                      className="
                        text-[7px]
                        sm:text-sm
                        font-black
                        whitespace-nowrap
                      "
                    >
                      Live Demo
                    </span>
                  </a>
                )}

                {/* Private Repo / GitHub */}

                {project.isPrivateRepo ? (
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      sm:gap-2
                      px-2
                      sm:px-4
                      py-1.5
                      sm:py-2.5
                      rounded-lg
                      sm:rounded-xl
                      bg-[#f5f5f4]
                      text-[#44403c]
                      border-2
                      border-[#1c1917]/50
                    "
                  >
                    <Lock
                      className="
                        w-3
                        h-3
                        sm:w-4
                        sm:h-4
                      "
                    />

                    <span
                      className="
                        text-[7px]
                        sm:text-sm
                        font-black
                        whitespace-nowrap
                      "
                    >
                      Repo Private
                    </span>
                  </span>
                ) : project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      inline-flex
                      items-center
                      gap-1
                      sm:gap-2
                      px-2
                      sm:px-4
                      py-1.5
                      sm:py-2.5
                      rounded-lg
                      sm:rounded-xl
                      bg-[#fffdf5]
                      text-[#1c1917]
                      border-2
                      border-[#1c1917]
                      shadow-[2px_2px_0px_#1c1917]
                      sm:shadow-[3px_3px_0px_#1c1917]
                      hover:-translate-y-0.5
                      transition-all
                      duration-200
                    "
                  >
                    <ExternalLink
                      className="
                        w-3
                        h-3
                        sm:w-4
                        sm:h-4
                      "
                    />

                    <span
                      className="
                        text-[7px]
                        sm:text-sm
                        font-black
                        whitespace-nowrap
                      "
                    >
                      GitHub
                    </span>
                  </a>
                ) : null}
              </div>
            </motion.div>

            {/* ==================================
                PROJECT PREVIEW CARD
            =================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: 24,
                scale: 0.98
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1
              }}
              transition={{
                duration: 0.7,
                delay: 0.18
              }}
              className="
                relative
                min-w-0
                w-full
                h-[295px]
                sm:h-auto
                sm:min-h-[340px]
                lg:min-h-[430px]
                flex
                items-center
              "
            >
              <ProjectPreviewPlaceholder
                project={project}
                className="
                  h-[295px]
                  sm:h-[350px]
                  lg:h-[440px]
                  w-full
                  min-w-0
                "
                isMobileFrame={
                  project.isMobileApp
                }
              />

              {/* Architecture button */}

              <button
                type="button"
                onClick={() =>
                  onSelectProject(project)
                }
                className="
                  absolute
                  -bottom-2
                  left-2
                  sm:-bottom-3
                  sm:left-8
                  px-2
                  sm:px-3.5
                  py-1.5
                  sm:py-2
                  rounded-lg
                  sm:rounded-xl
                  bg-[#fde047]
                  text-[#1c1917]
                  border-2
                  border-[#1c1917]
                  shadow-[2px_2px_0px_#1c1917]
                  sm:shadow-[3px_3px_0px_#1c1917]
                  hover:-translate-y-0.5
                  transition-all
                  duration-200
                  cursor-pointer
                  max-w-[95%]
                "
              >
                <span
                  className="
                    text-[6px]
                    sm:text-xs
                    font-mono
                    font-black
                    whitespace-nowrap
                  "
                >
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
