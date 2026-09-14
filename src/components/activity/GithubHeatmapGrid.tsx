import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContributionDay } from '../../hooks/useGithubContributions';

interface GithubHeatmapGridProps {
  contributions: ContributionDay[];
  loading: boolean;
}

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

const formatIndonesianDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const getFarmCropLevelColor = (level: number): string => {
  switch (level) {
    case 1:
      return 'bg-[#bbf7d0] border-[#86efac] hover:bg-[#86efac]'; // 🌱 Sprout
    case 2:
      return 'bg-[#4ade80] border-[#22c55e] hover:bg-[#22c55e]'; // 🌿 Green leaf
    case 3:
      return 'bg-[#facc15] border-[#eab308] hover:bg-[#eab308]'; // 🌽 Golden crop
    case 4:
      return 'bg-[#ea580c] border-[#c2410c] hover:bg-[#c2410c]'; // 🎃 Giant pumpkin / bountiful harvest
    case 0:
    default:
      return 'bg-[#fefae0] border-[#e2d3b3] hover:border-[#15803d]'; // Fertile soil
  }
};

const getCropStageEmoji = (level: number): string => {
  switch (level) {
    case 1: return '🌱';
    case 2: return '🌿';
    case 3: return '🌽';
    case 4: return '🎃';
    default: return '🌾';
  }
};

export const GithubHeatmapGrid: React.FC<GithubHeatmapGridProps> = ({ contributions, loading }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    count: number;
    level: number;
    posX: number;
    posY: number;
  } | null>(null);

  // auto scroll to latest contribution weeks on mobile screen
  useEffect(() => {
    if (containerRef.current) {
      const scrollEl = containerRef.current.querySelector('.heatmap-scroll-wrapper');
      if (scrollEl && window.innerWidth < 640) {
        scrollEl.scrollLeft = scrollEl.scrollWidth;
      }
    }
  }, [contributions, loading]);

  if (loading) {
    return (
      <div className="w-full overflow-x-auto py-8">
        <div className="min-w-[750px] flex flex-col gap-2.5 animate-pulse">
          <div className="h-4 w-40 bg-[#dcfce7]/60 rounded-md mb-2" />
          <div className="grid grid-flow-col grid-rows-7 gap-1.5">
            {Array.from({ length: 364 }).map((_, idx) => (
              <div key={idx} className="w-3.5 h-3.5 rounded-[3px] bg-[#fefae0] border border-[#e2d3b3]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // group contributions into calendar weeks
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributions.forEach((day, index) => {
    currentWeek.push(day);
    const dayOfWeek = new Date(day.date).getDay();
    if (dayOfWeek === 6 || index === contributions.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // calculate column positions for month labels
  const monthLabels: { month: string; colIndex: number }[] = [];
  let previousMonth = -1;
  let lastColIdx = -10;

  weeks.forEach((week, colIdx) => {
    const firstDayOfWeek = week[0];
    if (firstDayOfWeek) {
      const monthIndex = new Date(firstDayOfWeek.date).getMonth();
      if (monthIndex !== previousMonth && colIdx - lastColIdx >= 3) {
        monthLabels.push({
          month: MONTH_NAMES[monthIndex],
          colIndex: colIdx
        });
        previousMonth = monthIndex;
        lastColIdx = colIdx;
      }
    }
  });

  const handleCellMouseEnter = (day: ContributionDay, event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cellRect = event.currentTarget.getBoundingClientRect();

    setHoveredCell({
      date: day.date,
      count: day.count,
      level: day.level,
      posX: cellRect.left - containerRect.left + cellRect.width / 2,
      posY: cellRect.top - containerRect.top
    });
  };

  return (
    <div ref={containerRef} className="relative w-full rounded-2xl bg-[#dcfce7]/50 border-2 border-[#1c1917] p-3.5 sm:p-6 shadow-[3px_3px_0px_#1c1917]">
      <AnimatePresence>
        {hoveredCell && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.12 }}
            style={{
              left: `${hoveredCell.posX}px`,
              top: `${hoveredCell.posY - 44}px`,
              transform: 'translateX(-50%)'
            }}
            className="pointer-events-none absolute z-50 px-3 py-1.5 rounded-xl bg-[#1c1917] text-white text-[11px] font-mono shadow-2xl border border-[#86efac]/40 whitespace-nowrap flex items-center gap-1.5"
          >
            <span>{getCropStageEmoji(hoveredCell.level)}</span>
            <span className="font-bold text-[#86efac]">
              {hoveredCell.count === 0 ? 'Belum ada panen' : `${hoveredCell.count} panen commit`}
            </span>
            <span className="text-[#a8a29e] mx-1">•</span>
            <span className="text-[#f5f5f4]">{formatIndonesianDate(hoveredCell.date)}</span>
            {/* tooltip caret */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-[6px] border-t-[#1c1917]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="heatmap-scroll-wrapper overflow-x-auto pb-2 select-none no-scrollbar sm:scrollbar-thin">
        <div className="min-w-[760px] flex flex-col">
          {/* month headers */}
          <div className="flex text-[11px] font-mono font-bold text-[#15803d] mb-2.5 pl-8">
            {weeks.map((_, colIdx) => {
              const matchedMonth = monthLabels.find((m) => m.colIndex === colIdx);
              return (
                <div key={colIdx} className="w-3.5 shrink-0 mr-1 text-center">
                  {matchedMonth ? matchedMonth.month : ''}
                </div>
              );
            })}
          </div>

          {/* grid body with day labels */}
          <div className="flex items-start">
            {/* day of week indicators */}
            <div className="flex flex-col justify-between h-[116px] pr-3 text-[10px] font-mono font-bold text-[#78350f]">
              <span>Sen</span>
              <span>Rab</span>
              <span>Jum</span>
            </div>

            {/* calendar */}
            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-1 shrink-0">
                  {week.map((day) => {
                    const isHovered = hoveredCell?.date === day.date;
                    return (
                      <div
                        key={day.date}
                        className={`w-3.5 h-3.5 rounded-[3px] border cursor-pointer transition-transform duration-100 ${getFarmCropLevelColor(
                          day.level
                        )} ${isHovered ? 'scale-125 ring-2 ring-[#1c1917] z-20' : 'z-10'}`}
                        onMouseEnter={(e) => handleCellMouseEnter(day, e)}
                        onMouseLeave={() => setHoveredCell(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <div className="mt-3.5 sm:mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#44403c] font-mono pt-3 border-t border-[#86efac]/50">
        <span className="text-[10px] sm:text-[11px] text-[#15803d] font-bold">
          🌾 Petak panen sinkron otomatis dengan riwayat commit GitHub
        </span>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          <span className="text-[10px] sm:text-[11px] mr-1 text-[#78350f]">Benih</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-[3px] border ${getFarmCropLevelColor(level)}`}
            />
          ))}
          <span className="text-[10px] sm:text-[11px] ml-1 text-[#78350f]">Panen Raya</span>
        </div>
      </div>
    </div>
  );
};
