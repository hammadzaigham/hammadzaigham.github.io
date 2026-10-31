import React, { useState } from 'react';
import { ExternalLink, FileText, Check } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface PublicationsSectionProps {
  onOpenBibtex: (id: string) => void;
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({ onOpenBibtex }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="section-container" id="publications-section">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-tag mono-font">SCHOLARLY OUTPUT</span>
          <h2 className="section-heading">Peer-Reviewed Publications</h2>
        </div>
        <p className="section-subtext">
          Primary research contributions spanning Embodied AI relational reasoning and cyber-physical vehicular authentication.
        </p>
      </div>

      <div className="publications-list">
        {CV_DATA.publications.map((pub, idx) => (
          <div key={pub.id} className="pub-card" id={`pub-${pub.id}`}>
            <div className="pub-card-index mono-font">0{idx + 1}</div>

            <div className="pub-content">
              <div className="pub-meta-row">
                <span className={`badge ${pub.status === 'published' ? 'badge-cyan' : 'badge-amber'}`}>
                  {pub.statusLabel}
                </span>
                <span className="mono-sub text-muted">{pub.year}</span>
                {pub.doi && (
                  <span className="mono-sub text-blue">DOI: {pub.doi}</span>
                )}
              </div>

              <h3 className="pub-title">{pub.title}</h3>

              {/* Formatted Authors */}
              <div className="pub-authors">
                {pub.authors.map((author, aIdx) => (
                  <React.Fragment key={aIdx}>
                    {author === 'Hammad Ahmed' ? (
                      <span className="author-highlight">{author}</span>
                    ) : (
                      <span className="author-name">{author}</span>
                    )}
                    {aIdx < pub.authors.length - 1 && <span className="author-sep">, </span>}
                  </React.Fragment>
                ))}
              </div>

              <div className="pub-venue mono-font">
                {pub.venue}
              </div>

              <p className="pub-abstract">{pub.summary}</p>

              {/* Metric Callouts */}
              {pub.highlightMetrics && (
                <div className="pub-highlights-row">
                  {pub.highlightMetrics.map((hm, hIdx) => (
                    <span key={hIdx} className="pub-metric-chip mono-font">
                      {hm}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pub-actions-row">
                {pub.doiUrl && (
                  <a
                    href={pub.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    <ExternalLink size={14} /> View Article on MDPI
                  </a>
                )}
                <button
                  onClick={() => onOpenBibtex(pub.id)}
                  className="btn btn-secondary btn-sm"
                >
                  <FileText size={14} /> Full BibTeX
                </button>
                <button
                  onClick={() => handleCopyBibtex(pub.id, pub.bibtex)}
                  className="btn btn-outline btn-sm"
                >
                  {copiedId === pub.id ? <Check size={14} className="text-emerald" /> : null}
                  {copiedId === pub.id ? 'Copied BibTeX!' : 'Quick Copy Citation'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
