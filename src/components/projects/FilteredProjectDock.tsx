import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Lock,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

import type {
  Project,
  ProjectCategory
} from '../../types/portfolio';

import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import { AnimatedOceanSlideBackground } from './AnimatedOceanSlideBackground';

interface FilteredProjectDockProps {
  projects: Project[];
  selectedCategory: ProjectCategory;
  onSelectCategory: (category: ProjectCategory) => void;
  onSelectProject: (project: Project) => void;
}

export const FilteredProjectDock: React.FC<FilteredProjectDockProps> = ({
  projects,
  selectedCategory,
  onSelectCategory,
  onSelectProject
}) => {
  const [activeProjectId, setActiveProjectId] = useState<string>(
    projects[0]?.id || 'project'
  );

  const categories: {
    id: ProjectCategory;
    label: string;
  }[] = [
    {
      id: 'all',
      label: 'Semua Proyek'
    },
    {
      id: 'fullstack',
      label: 'Web Development'
    },
    {
      id: 'mobile',
      label: 'Mobile / Digital System'
    }
  ];

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter(
          (project) => project.category === selectedCategory
        );

  const activeProject =
    filteredProjects.find(
      (project) => project.id === activeProjectId
    ) || filteredProjects[0];

  const handleCategoryChange = (
    category: ProjectCategory
  ) => {
    onSelectCategory(category);

    const nextProjects =
      category === 'all'
        ? projects
        : projects.filter(
            (project) => project.category === category
          );

    setActiveProjectId(nextProjects[0]?.id || 'project');
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#14532d]">
      <AnimatedOceanSlideBackground depthLevel={4} />

      <div className="absolute inset-0 bg-gradient-to-br from-[#14532d]/95 via-[#166534]/90 to-[#052e16]/95" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-24 sm:py-28">
        {/* header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#fde047] text-[#1c1917] text-xs font-mono font-black border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]">
              <BookOpen className="w-4 h-4" />
              <span>04 // PROJECT INDEX</span>
            </div>

            <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.05]">
              Eksplorasi Proyek &amp; Hasil Pengembangan
            </h2>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-green-50/85 font-medium leading-relaxed">
              Kumpulan project website, aplikasi, dan sistem digital
              yang dikembangkan untuk kebutuhan bisnis, layanan,
              administrasi, dan digitalisasi proses kerja.
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-2xl bg-[#fffdf5] border-2 border-[#1c1917] shadow-[4px_4px_0px_#1c1917] shrink-0">
            <span className="text-xs font-mono font-black text-[#1c1917]">
              {filteredProjects.length} PROJECT
              {filteredProjects.length !== 1 ? 'S' : ''}
            </span>
          </div>
        </div>

        {/* category selector */}
        <div className="flex flex-wrap gap-2.5 mt-8">
          {categories.map((category) => {
            const isActive =
              selectedCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  handleCategoryChange(category.id)
                }
                className={`px-4 py-2.5 rounded-xl border-2 border-[#1c1917] text-xs sm:text-sm font-black transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#fde047] text-[#1c1917] shadow-[4px_4px_0px_#1c1917] translate-x-0.5 translate-y-0.5'
                    : 'bg-[#fffdf5] text-[#1c1917] shadow-[2px_2px_0px_#1c1917] hover:bg-[#fef9c3] hover:shadow-[4px_4px_0px_#1c1917]'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        {/* project index */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[0.34fr_0.66fr] gap-5 lg:gap-7">
          {/* project list */}
          <div className="rounded-[26px] bg-[#fffdf5] border-2 border-[#1c1917] shadow-[6px_6px_0px_#1c1917] p-3 sm:p-4">
            <div className="px-2 pb-3 text-[10px] font-mono font-black uppercase tracking-wider text-[#57534e]">
              Project List
            </div>

            <div className="space-y-2">
              {filteredProjects.map((project, index) => {
                const isActive =
                  project.id === activeProject?.id;

                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() =>
                      setActiveProjectId(project.id)
                    }
                    className={`w-full text-left rounded-xl border-2 border-[#1c1917] p-3 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#dcfce7] shadow-[3px_3px_0px_#1c1917]'
                        : 'bg-[#fffdf5] hover:bg-[#f0fdf4] shadow-[1px_1px_0px_#1c1917]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-2.5 min-w-0">
                        <span className="text-[10px] font-mono font-black text-[#15803d] shrink-0">
                          0{index + 1}
                        </span>

                        <div className="min-w-0">
                          <div className="text-sm font-black text-[#1c1917] truncate">
                            {project.title}
                          </div>

                          <div className="mt-0.5 text-[10px] font-mono font-bold text-[#78716c]">
                            {project.category === 'mobile'
                              ? 'Mobile & Digital System'
                              : 'Web Development'}
                          </div>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive
                            ? 'text-[#15803d] translate-x-0.5'
                            : 'text-[#78716c]'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}

              {filteredProjects.length === 0 && (
                <div className="p-5 text-center text-xs font-mono font-bold text-[#78716c]">
                  Belum ada project pada kategori ini.
                </div>
              )}
            </div>
          </div>

          {/* active project */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.id}
                  initial={{
                    opacity: 0,
                    y: 12
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: -12
                  }}
                  transition={{
                    duration: 0.25
                  }}
                  className="grid grid-cols-1 xl:grid-cols-[0.95fr_1.05fr] gap-5 items-stretch"
                >
                  <div className="rounded-[26px] bg-[#fffdf5] border-2 border-[#1c1917] shadow-[6px_6px_0px_#1c1917] p-5 sm:p-6">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#dcfce7] border border-[#1c1917]/40 text-[10px] font-mono font-black text-[#166534]">
                      {activeProject.category === 'mobile'
                        ? 'Mobile & Digital System'
                        : 'Web Development'}
                    </div>

                    <h3 className="mt-4 text-2xl sm:text-3xl font-black text-[#1c1917] leading-tight">
                      {activeProject.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm font-mono font-bold text-[#15803d]">
                      {activeProject.subtitle}
                    </p>

                    <p className="mt-4 text-sm text-[#44403c] font-medium leading-relaxed">
                      {activeProject.description ||
                        activeProject.summary}
                    </p>

                    {activeProject.highlights?.length > 0 && (
                      <div className="mt-5 space-y-2">
                        {activeProject.highlights
                          .slice(0, 4)
                          .map((highlight) => (
                            <div
                              key={highlight}
                              className="flex items-start gap-2"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#15803d] shrink-0" />

                              <span className="text-xs sm:text-sm text-[#44403c] font-medium leading-relaxed">
                                {highlight}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mt-6">
                      <button
                        type="button"
                        onClick={() =>
                          onSelectProject(activeProject)
                        }
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1c1917] text-white border-2 border-[#1c1917] shadow-[3px_3px_0px_#fde047] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="text-xs font-black">
                          Studi Kasus
                        </span>
                      </button>

                      {activeProject.demoUrl && (
                        <a
                          href={activeProject.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#dcfce7] text-[#166534] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-xs font-black">
                            Live Demo
                          </span>
                        </a>
                      )}

                      {activeProject.isPrivateRepo ? (
                        <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f5f5f4] text-[#57534e] border-2 border-[#1c1917]/40">
                          <Lock className="w-4 h-4" />
                          <span className="text-xs font-black">
                            Repository Private
                          </span>
                        </span>
                      ) : activeProject.githubUrl ? (
                        <a
                          href={activeProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fffdf5] text-[#1c1917] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="text-xs font-black">
                            GitHub
                          </span>
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="min-h-[300px] sm:min-h-[390px]">
                    <ProjectPreviewPlaceholder
                      project={activeProject}
                      className="h-full min-h-[300px] sm:min-h-[390px]"
                      isMobileFrame={activeProject.isMobileApp}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilteredProjectDock;