import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import type { Project, TechItem, TechLayer } from '../../types/portfolio';
import { techStackData, projectsData } from '../../data/portfolioData';
import { PipelineFlowPresets, type FlowDomainId } from './PipelineFlowPresets';
import { PipelineNodeLayer } from './PipelineNodeLayer';
import { PipelineInspector } from './PipelineInspector';
import { TechFarmDecorations } from './TechFarmDecorations';

interface TechGridProps {
  onOpenProject?: (project: Project) => void;
}

export const TechGrid: React.FC<TechGridProps> = ({ onOpenProject }) => {
  const [activeDomain, setActiveDomain] = useState<FlowDomainId>('all');
  const [selectedLayer, setSelectedLayer] = useState<TechLayer>('client');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  // partition technologies by architectural layer
  const clientTech = techStackData.filter((t) => t.layer === 'client');
  const backendTech = techStackData.filter((t) => t.layer === 'backend');
  const databaseTech = techStackData.filter((t) => t.layer === 'database');
  const devopsTech = techStackData.filter((t) => t.layer === 'devops');

  const handleSelectDomain = (domain: FlowDomainId) => {
    setActiveDomain(domain);
    setSelectedTech(null);

    // automatically shift inspection layer to the primary active layer for that domain
    if (domain === 'web' || domain === 'mobile') {
      setSelectedLayer('client');
    } else if (domain === 'backend') {
      setSelectedLayer('backend');
    } else if (domain === 'devops') {
      setSelectedLayer('devops');
    }
  };

  const handleSelectTech = (tech: TechItem) => {
    setSelectedTech(tech);
    setSelectedLayer(tech.layer);
  };

  const handleSelectLayer = (layer: TechLayer) => {
    setSelectedLayer(layer);
    setSelectedTech(null);
  };

  const handleSelectProject = (projectId: string) => {
    const targetProject = projectsData.find((p) => p.id === projectId);
    if (targetProject && onOpenProject) {
      onOpenProject(targetProject);
    }
  };

  return (
    <section id="stack" className="relative z-20 -mt-1 w-full bg-[#fefae0] select-none">
      {/* background decorations */}
      <TechFarmDecorations />

      {/* content wrapper */}
      <div className="relative z-10 pt-28 pb-24 max-w-7xl mx-auto px-6 sm:px-12">
        {/* header */}
        <div className="space-y-4 pb-8 border-b-2 border-[#1c1917]/15">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#fde047] text-[#1c1917] text-xs font-mono font-black border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917] w-fit">
            <span>03 // SISTEM &amp; TECH STACK</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1c1917] tracking-tight leading-[1.08]">
               Technical Skills & Tools
              </h2>
              <p className="text-sm sm:text-base font-medium text-[#44403c] mt-2 max-w-2xl leading-relaxed">
                Teknologi, framework, tools, dan workflow yang saya gunakan dalam pengembangan website dan sistem digital.
              </p>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#fffdf5] border-2 border-[#1c1917] shadow-[3px_3px_0px_#1c1917] shrink-0 self-start lg:self-auto">
              <Layers className="w-4 h-4 text-[#15803d]" />
              <span className="text-xs font-mono font-bold text-[#1c1917]">
                {techStackData.length} Tools &amp; Kompetensi
              </span>
            </div>
          </div>
        </div>

        {/* category filter selector */}
        <div className="mt-8">
          <PipelineFlowPresets
            activeDomain={activeDomain}
            onSelectDomain={handleSelectDomain}
          />
        </div>

        {/* architecture layer cards */}
        <div className="mt-8 sm:mt-10 space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] sm:text-xs font-mono font-bold text-[#78350f] uppercase tracking-wider pb-1 sm:pb-0">
            <span>Daftar Kategori &amp; Layer Fiskal</span>
            <span className="text-[10px] sm:text-xs text-[#78350f]">
              <span className="sm:hidden">Tap kartu atau icon untuk detail</span>
              <span className="hidden sm:inline">Klik kartu atau icon untuk melihat detail</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* client layer: Tax Portal & Regulations */}
            <PipelineNodeLayer
              layerId="client"
              stepNumber="01"
              title="Portal DJP & Regulasi Pajak"
              subtitle="Tax Portal & Certification"
              roleDescription="Pengelolaan e-Faktur 4.0, e-Bupot Unifikasi, e-Filing DJP, serta penerapan sertifikasi Brevet A & B."
              techItems={clientTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'client'}
            />

            {/* backend layer: Accounting Software & ERP */}
            <PipelineNodeLayer
              layerId="backend"
              stepNumber="02"
              title="Software Akuntansi & ERP"
              subtitle="Accounting & Enterprise"
              roleDescription="Pembukuan jurnal, buku besar, modul persediaan, serta laporan keuangan otomatis via Accurate Online, SAP FICO, dan Zahir."
              techItems={backendTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'backend'}
            />

            {/* database layer: Audit Workpapers & Analytics */}
            <PipelineNodeLayer
              layerId="database"
              stepNumber="03"
              title="Kertas Kerja Audit & Analitik"
              subtitle="Audit Workpaper & Analytics"
              roleDescription="Rekonsiliasi fiskal ribuan baris data via Excel Power Query/VBA, dashboard visual Power BI, dan uji statistik SPSS."
              techItems={databaseTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'database'}
            />

            {/* devops layer: Standards & Fiscal Compliance */}
            <PipelineNodeLayer
              layerId="devops"
              stepNumber="04"
              title="Standar PSAK & Tax Compliance"
              subtitle="PSAK & Fiscal Strategy"
              roleDescription="Rekonsiliasi koreksi fiskal positif/negatif, perlakuan pajak tangguhan PSAK 46, serta perencanaan pajak (tax planning) legal."
              techItems={devopsTech}
              activeDomain={activeDomain}
              selectedTech={selectedTech}
              onSelectTech={handleSelectTech}
              onSelectLayer={handleSelectLayer}
              isLayerSelected={selectedLayer === 'devops'}
            />
          </div>
        </div>


        {/* inspector deep dive panel */}
        <div className="mt-10">
          <PipelineInspector
            selectedTech={selectedTech}
            selectedLayer={selectedLayer}
            activeDomain={activeDomain}
            onClearTechSelection={() => setSelectedTech(null)}
            onSelectProject={handleSelectProject}
          />
        </div>
      </div>
    </section>
  );
};
