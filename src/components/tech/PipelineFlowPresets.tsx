import React from 'react';
import {
  Layers,
  Code2,
  Smartphone,
  Server,
  Wrench,
  Shield
} from 'lucide-react';

export type FlowDomainId =
  | 'all'
  | 'web'
  | 'mobile'
  | 'backend'
  | 'devops'
  | 'cybersecurity';

interface PipelineFlowPresetsProps {
  activeDomain: FlowDomainId;
  onSelectDomain: (domain: FlowDomainId) => void;
}

export const PipelineFlowPresets: React.FC<PipelineFlowPresetsProps> = ({
  activeDomain,
  onSelectDomain
}) => {
  const domains: {
    id: FlowDomainId;
    label: string;
    icon: React.FC<{ className?: string }>;
    tag: string;
  }[] = [
    {
      id: 'all',
      label: 'Semua Kompetensi',
      icon: Layers,
      tag: 'Semua'
    },
    {
      id: 'web',
      label: 'Web Development',
      icon: Code2,
      tag: 'Frontend'
    },
    {
      id: 'mobile',
      label: 'Mobile & Digital System',
      icon: Smartphone,
      tag: 'Mobile'
    },
    {
      id: 'backend',
      label: 'Backend & Database',
      icon: Server,
      tag: 'Backend'
    },
    {
      id: 'devops',
      label: 'Tools & Workflow',
      icon: Wrench,
      tag: 'Tools'
    },
    {
      id: 'cybersecurity',
      label: 'Cyber Security',
      icon: Shield,
      tag: 'Soon'
    }
  ];

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0369a1]">
          Kategori
        </span>

        <span className="text-[11px] font-mono text-[#64748b]">
          Pilih kategori stack
        </span>
      </div>

      {/* domain filter buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {domains.map((domain) => {
          const Icon = domain.icon;
          const isActive = activeDomain === domain.id;

          return (
            <button
              key={domain.id}
              type="button"
              onClick={() => onSelectDomain(domain.id)}
              className={`p-3 rounded-2xl border-2 border-[#1c1917] text-left transition-all duration-200 cursor-pointer select-none flex flex-col justify-between ${
                isActive
                  ? 'bg-[#fde047] shadow-[4px_4px_0px_#1c1917] translate-x-0.5 translate-y-0.5'
                  : 'bg-[#fffdf5] shadow-[2px_2px_0px_#1c1917] hover:bg-[#fff9d4] hover:shadow-[4px_4px_0px_#1c1917]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`w-7 h-7 rounded-lg border border-[#1c1917] flex items-center justify-center ${
                    isActive
                      ? 'bg-[#1c1917] text-[#fde047]'
                      : 'bg-[#faeed1] text-[#1c1917]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded border bg-[#faeed1] text-[#1c1917] border-[#1c1917]/30">
                  {domain.tag}
                </span>
              </div>

              <div className="mt-2 text-xs font-black text-[#1c1917] tracking-tight leading-tight">
                {domain.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};