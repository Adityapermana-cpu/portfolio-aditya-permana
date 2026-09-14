import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw, Check } from 'lucide-react';

interface HarvestActionButtonProps {
  harvestState: 'pristine' | 'harvesting' | 'harvested' | 'caring';
  careProgress: number;
  onTriggerHarvest: () => void;
  onTriggerCare: () => void;
}

export const HarvestActionButton: React.FC<HarvestActionButtonProps> = ({
  harvestState,
  careProgress,
  onTriggerHarvest,
  onTriggerCare
}) => {
  if (harvestState === 'pristine') {
    return (
      <motion.button
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={onTriggerHarvest}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#fde047] hover:bg-[#facc15] text-[#1c1917] border-2 border-[#1c1917] font-mono font-black text-xs shadow-[3px_3px_0px_#1c1917] transition-all cursor-pointer select-none"
      >
        <span className="text-base">🌾</span>
        <span>Mulai Panen Raya!</span>
      </motion.button>
    );
  }

  if (harvestState === 'harvesting') {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#86efac] text-[#14532d] border-2 border-[#14532d] font-mono font-black text-xs shadow-[3px_3px_0px_#14532d] select-none animate-pulse">
        <Sparkles className="w-4 h-4 animate-spin" />
        <span>Sedang Memanen Hasil Bumi...</span>
      </div>
    );
  }

  if (harvestState === 'harvested') {
    return (
      <motion.button
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.96 }}
        onClick={onTriggerCare}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#4ade80] hover:bg-[#22c55e] text-[#14532d] hover:text-white border-2 border-[#14532d] font-mono font-black text-xs shadow-[3px_3px_0px_#14532d] transition-all cursor-pointer select-none animate-bounce"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Rawat &amp; Rapikan Kebun</span>
      </motion.button>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 p-2 px-3.5 rounded-2xl bg-[#fffdf5] border-2 border-[#15803d] shadow-[3px_3px_0px_#15803d] select-none min-w-[200px]">
      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#15803d]">
        <div className="flex items-center gap-1.5">
          {careProgress >= 100 ? (
            <Check className="w-3.5 h-3.5 text-[#16a34a]" />
          ) : (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          )}
          <span>{careProgress >= 100 ? 'Kebun Asri!' : 'Menyiram Kebun...'}</span>
        </div>
        <span>{careProgress}%</span>
      </div>
      <div className="w-full h-2 rounded-full bg-[#dcfce7] overflow-hidden border border-[#86efac]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#22c55e] to-[#15803d] rounded-full"
          style={{ width: `${careProgress}%` }}
        />
      </div>
    </div>
  );
};
