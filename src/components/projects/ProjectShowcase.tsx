import React, { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform
} from 'framer-motion';

import type {
  Project,
  ProjectCategory
} from '../../types/portfolio';

import { projectsData } from '../../data/portfolioData';

import { FlagshipSlideCard } from './FlagshipProjectParallax';
import { FilteredProjectDock } from './FilteredProjectDock';
import { ProjectCaseStudyModal } from './ProjectCaseStudyModal';

interface ProjectShowcaseProps {
  onOpenProject?: (project: Project) => void;
}

export const ProjectShowcase: React.FC<
  ProjectShowcaseProps
> = ({
  onOpenProject
}) => {
  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('all');

  const [localActiveProject, setLocalActiveProject] =
    useState<Project | null>(null);

  /*
   * Parent modal handler.
   * Jika parent menyediakan onOpenProject,
   * gunakan handler tersebut.
   *
   * Jika tidak, modal lokal digunakan.
   */
  const handleSelect = onOpenProject
    ? onOpenProject
    : setLocalActiveProject;

  const activeProject = onOpenProject
    ? null
    : localActiveProject;

  /*
   * ==========================================
   * FEATURED PROJECTS
   * ==========================================
   *
   * PortfolioData kamu memiliki beberapa project
   * dengan featured=true, termasuk data QR Menu
   * yang muncul dua kali.
   *
   * Showcase utama memang dirancang untuk 4 project.
   *
   * Kita tidak menghapus data dari portfolioData.
   * Kita hanya mengambil 4 project pertama untuk
   * flagship showcase.
   */
  const flagshipProjects =
    projectsData
      .filter(
        (project) => project.featured
      )
      .slice(0, 4);

  /*
   * ==========================================
   * SCROLL PROGRESS
   * ==========================================
   */
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: [
      'start start',
      'end end'
    ]
  });

  /*
   * Progress indicator setiap project.
   */
  const progress1 = useTransform(
    scrollYProgress,
    [0, 0.25],
    [0, 1],
    {
      clamp: true
    }
  );

  const progress2 = useTransform(
    scrollYProgress,
    [0.25, 0.50],
    [0, 1],
    {
      clamp: true
    }
  );

  const progress3 = useTransform(
    scrollYProgress,
    [0.50, 0.75],
    [0, 1],
    {
      clamp: true
    }
  );

  const progress4 = useTransform(
    scrollYProgress,
    [0.75, 1],
    [0, 1],
    {
      clamp: true
    }
  );

  const progressTransforms = [
    progress1,
    progress2,
    progress3,
    progress4
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="
        relative
        w-full
        bg-[#fefae0]
        select-none
      "
    >
      {/* ======================================
          FEATURED PROJECTS
      ======================================= */}

      {flagshipProjects.map(
        (project, index) => {
          const depthLevel =
            Math.min(
              index + 1,
              4
            ) as 1 | 2 | 3 | 4;

          return (
            <div
              key={`${project.id}-${index}`}
              className="
                sticky
                top-0
                w-full
                h-screen
                min-h-[560px]
                overflow-hidden
              "
              style={{
                zIndex:
                  10 + index * 10
              }}
            >
              {/* ==================================
                  PROGRESS INDICATOR
              =================================== */}

              <div
                className="
                  absolute
                  top-[76px]
                  sm:top-24
                  right-4
                  sm:right-12
                  z-[100]
                  flex
                  items-center
                  gap-1.5
                  sm:gap-2
                  p-1.5
                  sm:p-2
                  rounded-xl
                  sm:rounded-2xl
                  bg-[#fffdf5]
                  border-2
                  border-[#1c1917]
                  shadow-[2.5px_2.5px_0px_#1c1917]
                  sm:shadow-[4px_4px_0px_#1c1917]
                "
              >
                {progressTransforms.map(
                  (
                    progressValue,
                    progressIndex
                  ) => (
                    <div
                      key={progressIndex}
                      className="
                        h-2
                        sm:h-2.5
                        rounded-full
                        bg-[#dcfce7]
                        border
                        border-[#1c1917]
                        overflow-hidden
                        w-5
                        sm:w-10
                      "
                    >
                      <motion.div
                        className="
                          h-full
                          bg-[#15803d]
                          origin-left
                        "
                        style={{
                          scaleX:
                            progressValue
                        }}
                      />
                    </div>
                  )
                )}
              </div>

              {/* ==================================
                  PROJECT CARD
              =================================== */}

              <FlagshipSlideCard
                project={project}
                index={index}
                yMotion="0%"
                opacityMotion={1}
                depthLevel={
                  depthLevel
                }
                onSelectProject={
                  handleSelect
                }
              />
            </div>
          );
        }
      )}

      {/* ======================================
          PROJECT INDEX
      ======================================= */}

      <div
        className="
          relative
          w-full
          min-h-screen
          bg-[#14532d]
        "
        style={{
          zIndex: 50
        }}
      >
        <FilteredProjectDock
          projects={projectsData}
          selectedCategory={
            selectedCategory
          }
          onSelectCategory={
            setSelectedCategory
          }
          onSelectProject={
            handleSelect
          }
        />
      </div>

      {/* ======================================
          LOCAL CASE STUDY MODAL
      ======================================= */}

      {!onOpenProject &&
        activeProject && (
          <ProjectCaseStudyModal
            project={
              activeProject
            }
            isOpen={
              !!activeProject
            }
            onClose={() =>
              setLocalActiveProject(
                null
              )
            }
          />
        )}
    </section>
  );
};

export default ProjectShowcase;