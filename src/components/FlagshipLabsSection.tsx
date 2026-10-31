import React, { useState } from 'react';
import { Eye, Terminal, MapPin } from 'lucide-react';
import { DyGravVisualizer } from './DyGravVisualizer';
import { PreySenseStudio } from './PreySenseStudio';
import { RoadWatchInspector } from './RoadWatchInspector';

interface FlagshipLabsSectionProps {
  onOpenBibtex: (id: string) => void;
}

export const FlagshipLabsSection: React.FC<FlagshipLabsSectionProps> = ({ onOpenBibtex }) => {
  const [activeLabTab, setActiveLabTab] = useState<'dygrav' | 'preysense' | 'roadwatch'>('dygrav');

  return (
    <section className="section-container" id="flagship-labs">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-tag mono-font">FLAGSHIP RESEARCH & SYSTEMS</span>
          <h2 className="section-heading">Interactive Research Labs</h2>
        </div>
        <p className="section-subtext">
          Interactive environments simulating core algorithms, hardware register control, and computer vision pipelines developed in my research.
        </p>

        {/* Tab Selector */}
        <div className="labs-nav-pills">
          <button
            onClick={() => setActiveLabTab('dygrav')}
            className={`lab-nav-pill ${activeLabTab === 'dygrav' ? 'active' : ''}`}
          >
            <Eye size={15} />
            <span>DyGRAV · VLN Reasoner</span>
          </button>
          <button
            onClick={() => setActiveLabTab('preysense')}
            className={`lab-nav-pill ${activeLabTab === 'preysense' ? 'active' : ''}`}
          >
            <Terminal size={15} />
            <span>PreySense · ACPI & EC Studio</span>
          </button>
          <button
            onClick={() => setActiveLabTab('roadwatch')}
            className={`lab-nav-pill ${activeLabTab === 'roadwatch' ? 'active' : ''}`}
          >
            <MapPin size={15} />
            <span>RoadWatch · AI Triage Gating</span>
          </button>
        </div>
      </div>

      {/* Render active simulation */}
      <div className="lab-display-wrapper">
        {activeLabTab === 'dygrav' && <DyGravVisualizer onOpenBibtex={onOpenBibtex} />}
        {activeLabTab === 'preysense' && <PreySenseStudio />}
        {activeLabTab === 'roadwatch' && <RoadWatchInspector />}
      </div>
    </section>
  );
};
