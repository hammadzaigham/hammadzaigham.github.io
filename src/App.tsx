import { useState, useEffect } from 'react';
import { BackgroundMesh } from './components/BackgroundMesh';
import { HeaderHUD } from './components/HeaderHUD';
import { FlagshipLabsSection } from './components/FlagshipLabsSection';
import { PublicationsSection } from './components/PublicationsSection';
import { ResearchExperienceSection } from './components/ResearchExperienceSection';
import { HonorsSection } from './components/HonorsSection';
import { SkillsMatrixSection } from './components/SkillsMatrixSection';
import { FooterHUD } from './components/FooterHUD';
import { AcademicCvView } from './components/AcademicCvView';
import { BibtexModal } from './components/BibtexModal';
import { Sparkles, FileText } from 'lucide-react';

export function App() {
  const [viewMode, setViewMode] = useState<'interactive' | 'academic'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('mode') === 'academic' || window.location.hash === '#academic') {
        return 'academic';
      }
    }
    return 'interactive';
  });

  const [bibtexPubId, setBibtexPubId] = useState<string | null>(null);

  const handleToggleMode = (mode: 'interactive' | 'academic') => {
    setViewMode(mode);
    if (typeof window !== 'undefined') {
      if (mode === 'academic') {
        window.history.replaceState(null, '', '#academic');
      } else {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#academic') {
        setViewMode('academic');
      } else if (window.location.hash === '' || window.location.hash === '#interactive') {
        setViewMode('interactive');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className={`app-root theme-dark mode-${viewMode}`}>
      {viewMode === 'interactive' && <BackgroundMesh />}

      {/* Floating View Switcher pill */}
      <aside className="floating-mode-pill no-print" aria-label="Mode switcher">
        <button
          onClick={() => handleToggleMode(viewMode === 'interactive' ? 'academic' : 'interactive')}
          className="btn-floating-switch"
          title={`Switch to ${viewMode === 'interactive' ? 'Academic Print CV' : 'Interactive Terminal'}`}
        >
          {viewMode === 'interactive' ? (
            <>
              <FileText size={15} />
              <span>Academic Print Mode</span>
            </>
          ) : (
            <>
              <Sparkles size={15} />
              <span>Interactive Showcase</span>
            </>
          )}
        </button>
      </aside>

      {/* Main Viewport Container */}
      {viewMode === 'interactive' ? (
        <main className="interactive-layout-container">
          <HeaderHUD viewMode={viewMode} onToggleViewMode={handleToggleMode} />
          <FlagshipLabsSection onOpenBibtex={(id) => setBibtexPubId(id)} />
          <PublicationsSection onOpenBibtex={(id) => setBibtexPubId(id)} />
          <ResearchExperienceSection />
          <HonorsSection />
          <SkillsMatrixSection />
          <FooterHUD onSwitchToAcademic={() => handleToggleMode('academic')} />
        </main>
      ) : (
        <AcademicCvView onSwitchToInteractive={() => handleToggleMode('interactive')} />
      )}

      {/* Citation Drawer / Modal */}
      <BibtexModal publicationId={bibtexPubId} onClose={() => setBibtexPubId(null)} />
    </div>
  );
}

export default App;
