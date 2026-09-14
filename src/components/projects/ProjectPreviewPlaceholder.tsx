import React, { useState } from 'react';

import {
  Globe,
  Smartphone,
  Image as ImageIcon
} from 'lucide-react';

import type { Project } from '../../types/portfolio';

interface ProjectPreviewPlaceholderProps {
  project: Project;
  className?: string;
  isMobileFrame?: boolean;
}

export const ProjectPreviewPlaceholder: React.FC<
  ProjectPreviewPlaceholderProps
> = ({
  project,
  className = '',
  isMobileFrame = false
}) => {
  const [imageError, setImageError] =
    useState(false);

  const isMobile =
    isMobileFrame ||
    project.category === 'mobile';

  return (
    <div
      className={`
        relative
        w-full
        min-w-0
        flex
        flex-col
        overflow-hidden
        rounded-[24px]
        bg-[#fffdf5]
        border-2
        border-[#0f172a]
        shadow-[6px_6px_0px_#0f172a]
        group/preview

        /* Responsive height protection */
        min-h-[280px]
        sm:min-h-[350px]
        lg:min-h-[440px]

        ${className}
      `}
    >
      {/* ==================================
          PREVIEW HEADER
      =================================== */}

      <div
        className="
          relative
          z-20
          w-full
          min-w-0
          shrink-0
          flex
          items-center
          justify-between
          gap-2
          px-3
          py-2.5
          sm:px-4
          sm:py-2
          bg-[#faeed1]
          border-b-2
          border-[#0f172a]
        "
      >
        <div
          className="
            flex
            items-center
            gap-1.5
            sm:gap-2
            min-w-0
            flex-1
            overflow-hidden
          "
        >
          <span
            className="
              w-2.5
              h-2.5
              sm:w-3
              sm:h-3
              shrink-0
              rounded-full
              bg-[#f87171]
              border
              border-[#0f172a]
            "
          />

          <span
            className="
              w-2.5
              h-2.5
              sm:w-3
              sm:h-3
              shrink-0
              rounded-full
              bg-[#fde047]
              border
              border-[#0f172a]
            "
          />

          <span
            className="
              w-2.5
              h-2.5
              sm:w-3
              sm:h-3
              shrink-0
              rounded-full
              bg-[#4ade80]
              border
              border-[#0f172a]
            "
          />

          <div
            className="
              ml-1
              sm:ml-2
              min-w-0
              max-w-[110px]
              sm:max-w-[240px]
              px-2
              sm:px-3
              py-0.5
              rounded-md
              bg-[#fffdf5]
              border
              border-[#0f172a]/50
              text-[9px]
              sm:text-[11px]
              font-mono
              font-bold
              text-[#0f172a]
              truncate
              overflow-hidden
            "
          >
            {isMobile
              ? `mobile://app.${project.id}`
              : `web://project.${project.id}`}
          </div>
        </div>

        {/* ==================================
            APPLICATION TYPE
        =================================== */}

        <div
          className="
            relative
            z-30
            shrink-0
            min-w-0
            max-w-[145px]
            sm:max-w-none
            flex
            items-center
            justify-center
            gap-1
            sm:gap-1.5
            text-[8px]
            sm:text-[10px]
            font-mono
            font-black
            px-1.5
            sm:px-2.5
            py-1
            sm:py-0.5
            rounded-md
            bg-[#fde047]
            text-[#0f172a]
            border
            border-[#0f172a]
            whitespace-nowrap
            overflow-hidden
          "
        >
          {isMobile ? (
            <Smartphone
              className="
                w-3
                h-3
                shrink-0
              "
            />
          ) : (
            <Globe
              className="
                w-3
                h-3
                shrink-0
              "
            />
          )}

          <span
            className="
              block
              min-w-0
              overflow-hidden
              text-ellipsis
              whitespace-nowrap
            "
          >
            {isMobile
              ? 'MOBILE APP'
              : 'WEB APPLICATION'}
          </span>
        </div>
      </div>

      {/* ==================================
          IMAGE PREVIEW
      =================================== */}

      <div
        className="
          relative
          z-10
          w-full
          min-w-0
          flex-1
          min-h-[220px]
          sm:min-h-0
          bg-[#f8fafc]
          flex
          items-center
          justify-center
          overflow-hidden
        "
      >
        {!imageError &&
        project.imageUrl ? (
          <img
            src={
              project.imageUrl
            }
            alt={`${project.title} preview`}
            onError={() =>
              setImageError(true)
            }
            className={`
              block
              w-full
              h-full
              min-w-0
              min-h-0
              ${
                project.imageFit ===
                  'contain' ||
                isMobile
                  ? 'object-contain object-center p-3 sm:p-4'
                  : 'object-cover object-top'
              }
              transition-transform
              duration-500
              group-hover/preview:scale-[1.02]
            `}
          />
        ) : (
          <div
            className="
              w-full
              min-w-0
              flex
              flex-col
              items-center
              justify-center
              p-6
              text-center
              space-y-3
              overflow-hidden
            "
          >
            <div
              className="
                p-4
                rounded-2xl
                bg-[#e0f2fe]
                border-2
                border-[#0f172a]
                text-[#0284c7]
                shadow-[3px_3px_0px_#0f172a]
                group-hover/preview:scale-110
                transition-transform
                shrink-0
              "
            >
              <ImageIcon
                className="w-8 h-8"
              />
            </div>

            <div
              className="
                min-w-0
                max-w-full
                overflow-hidden
              "
            >
              <div
                className="
                  text-base
                  font-black
                  text-[#0f172a]
                  tracking-tight
                  break-words
                  [overflow-wrap:anywhere]
                "
              >
                {project.title}
              </div>

              <p
                className="
                  text-xs
                  font-mono
                  font-bold
                  text-[#0284c7]
                  mt-0.5
                  break-words
                  [overflow-wrap:anywhere]
                "
              >
                Preview Screenshot Proyek
              </p>
            </div>

            <div
              className="
                max-w-full
                min-w-0
                text-[11px]
                font-mono
                text-[#64748b]
                bg-[#fffdf5]
                px-3
                py-1
                rounded-lg
                border
                border-[#0f172a]/30
                break-words
                [overflow-wrap:anywhere]
              "
            >
              {project.stack
                .slice(0, 3)
                .join(' • ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPreviewPlaceholder;
