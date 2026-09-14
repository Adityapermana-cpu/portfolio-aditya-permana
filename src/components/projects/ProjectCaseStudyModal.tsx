import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Code2,
  Smartphone
} from 'lucide-react';

import type { Project } from '../../types/portfolio';
import { ProjectPreviewPlaceholder } from './ProjectPreviewPlaceholder';
import {
  stopLenisScroll,
  startLenisScroll
} from '../../lib/lenis';

interface ProjectCaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectCaseStudyModal: React.FC<
  ProjectCaseStudyModalProps
> = ({
  project,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    stopLenisScroll();

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow =
        previousOverflow;

      startLenisScroll();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  const categoryLabel =
    project?.category === 'mobile'
      ? 'MOBILE & DIGITAL SYSTEM'
      : 'WEB DEVELOPMENT';

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* overlay */}
          <motion.button
            type="button"
            aria-label="Tutup modal"
            onClick={onClose}
            className="absolute inset-0 bg-[#052e16]/85 backdrop-blur-sm cursor-default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Case study ${project.title}`}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.97
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.98
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut'
            }}
            className="relative z-10 w-full max-w-6xl max-h-[94vh] overflow-y-auto rounded-[28px] sm:rounded-[34px] bg-[#fffdf5] border-2 border-[#1c1917] shadow-[8px_8px_0px_#1c1917]"
          >
            {/* header */}
            <div className="sticky top-0 z-30 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-[#fffdf5]/95 backdrop-blur border-b-2 border-[#1c1917]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="px-2.5 py-1 rounded-lg bg-[#fde047] border border-[#1c1917] text-[9px] sm:text-[10px] font-mono font-black text-[#1c1917] shrink-0">
                  CASE STUDY
                </div>

                <span className="text-xs sm:text-sm font-black text-[#44403c] truncate">
                  {project.title}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup case study"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#1c1917] text-white border-2 border-[#1c1917] flex items-center justify-center hover:bg-[#292524] transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              {/* project heading */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-6 lg:gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#dcfce7] text-[#166534] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917]">
                    {project.isMobileApp ? (
                      <Smartphone className="w-4 h-4" />
                    ) : (
                      <Code2 className="w-4 h-4" />
                    )}

                    <span className="text-[10px] sm:text-xs font-mono font-black">
                      {categoryLabel}
                    </span>
                  </div>

                  <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c1917] tracking-tight leading-[0.98]">
                    {project.title}
                  </h2>

                  <p className="mt-2 text-sm font-mono font-bold text-[#15803d]">
                    {project.subtitle}
                  </p>

                  <p className="mt-5 text-sm sm:text-base text-[#44403c] font-medium leading-relaxed">
                    {project.description}
                  </p>

                  {/* metrics */}
                  {project.metrics?.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-6">
                      {project.metrics.map((metric) => (
                        <div
                          key={`${metric.label}-${metric.value}`}
                          className="rounded-xl bg-[#f0fdf4] border-2 border-[#1c1917] p-3"
                        >
                          <div className="text-lg font-black text-[#15803d]">
                            {metric.value}
                          </div>

                          <div className="mt-1 text-[9px] font-mono font-bold uppercase text-[#57534e] leading-tight">
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* preview */}
                <div className="min-h-[280px] sm:min-h-[360px]">
                  <ProjectPreviewPlaceholder
                    project={project}
                    className="h-full min-h-[280px] sm:min-h-[360px]"
                    isMobileFrame={project.isMobileApp}
                  />
                </div>
              </div>

              {/* main case study */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8">
                {/* about */}
                <div className="rounded-[22px] bg-[#f0fdf4] border-2 border-[#1c1917] p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#15803d] text-white border-2 border-[#1c1917] flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#1c1917]">
                      Tentang Proyek
                    </h3>
                  </div>

                  <p className="mt-4 text-sm text-[#44403c] font-medium leading-relaxed">
                    {project.summary}
                  </p>

                  {project.role && (
                    <div className="mt-5 p-3 rounded-xl bg-[#fffdf5] border-2 border-[#1c1917]/30">
                      <div className="text-[10px] font-mono font-black uppercase text-[#78716c]">
                        Peran
                      </div>

                      <div className="mt-1 text-sm font-black text-[#1c1917]">
                        {project.role}
                      </div>
                    </div>
                  )}
                </div>

                {/* challenge */}
                <div className="rounded-[22px] bg-[#fff7ed] border-2 border-[#1c1917] p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#f97316] text-white border-2 border-[#1c1917] flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-[#1c1917]">
                      Tantangan &amp; Solusi
                    </h3>
                  </div>

                  <p className="mt-4 text-sm text-[#44403c] font-medium leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              </div>

              {/* architecture */}
              {project.architecture?.length > 0 && (
                <div className="mt-5 rounded-[22px] bg-[#eff6ff] border-2 border-[#1c1917] p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-black text-[#1c1917]">
                    Arsitektur Sistem
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 mt-4">
                    {project.architecture.map(
                      (item, index) => (
                        <div
                          key={`${item}-${index}`}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-[#fffdf5] border-2 border-[#1c1917]/30"
                        >
                          <span className="w-6 h-6 rounded-lg bg-[#dbeafe] border border-[#1c1917]/40 flex items-center justify-center text-[10px] font-mono font-black text-[#075985] shrink-0">
                            {String(index + 1).padStart(
                              2,
                              '0'
                            )}
                          </span>

                          <span className="text-xs sm:text-sm font-bold text-[#44403c] leading-relaxed">
                            {item}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* highlights */}
              {project.highlights?.length > 0 && (
                <div className="mt-5 rounded-[22px] bg-[#fffdf5] border-2 border-[#1c1917] p-5 sm:p-6 shadow-[4px_4px_0px_#1c1917]">
                  <h3 className="text-lg sm:text-xl font-black text-[#1c1917]">
                    Fitur &amp; Hasil Pengembangan
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {project.highlights.map(
                      (highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" />

                          <span className="text-sm text-[#44403c] font-medium leading-relaxed">
                            {highlight}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* tech stack */}
              {project.stack?.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-lg sm:text-xl font-black text-[#1c1917]">
                    Teknologi yang Digunakan
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 rounded-xl bg-[#f5f5f4] border-2 border-[#1c1917]/30 text-xs font-mono font-bold text-[#292524]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* actions */}
              <div className="flex flex-wrap gap-2.5 mt-8 pt-6 border-t-2 border-[#1c1917]/15">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15803d] text-white border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />

                    <span className="text-xs sm:text-sm font-black">
                      Live Demo
                    </span>
                  </a>
                )}

                {project.isPrivateRepo ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f5f5f4] text-[#57534e] border-2 border-[#1c1917]/40">
                    <Lock className="w-4 h-4" />

                    <span className="text-xs sm:text-sm font-black">
                      Repository Private
                    </span>
                  </div>
                ) : project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#fffdf5] text-[#1c1917] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />

                    <span className="text-xs sm:text-sm font-black">
                      GitHub
                    </span>
                  </a>
                ) : null}

                {project.isPrivateRepo && (
                  <p className="basis-full text-[11px] sm:text-xs font-mono font-bold text-[#78716c]">
                    {project.privateRepoReason ||
                      'Repository tidak dipublikasikan karena data atau ketentuan proyek.'}
                  </p>
                )}

                {project.isMobileApp && (
                  <div className="basis-full flex items-center gap-2 text-[11px] sm:text-xs font-mono font-bold text-[#075985]">
                    <Smartphone className="w-4 h-4" />
                    Dokumentasi Mobile tersedia on request.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectCaseStudyModal;