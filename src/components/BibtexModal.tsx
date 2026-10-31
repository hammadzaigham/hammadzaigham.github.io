import React, { useState, useEffect } from 'react';
import { X, Copy, Check, BookOpen } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface BibtexModalProps {
  publicationId: string | null;
  onClose: () => void;
}

export const BibtexModal: React.FC<BibtexModalProps> = ({ publicationId, onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!publicationId) return null;

  const pub = CV_DATA.publications.find((p) => p.id === publicationId);
  if (!pub) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(pub.bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <BookOpen size={18} className="text-cyan inline-icon" />
            <h4 className="modal-title">BibTeX Citation</h4>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-paper-title">{pub.title}</p>
          <div className="bibtex-code-block">
            <pre className="bibtex-pre mono-font">{pub.bibtex}</pre>
          </div>
        </div>

        <div className="modal-footer">
          <span className="mono-sub">Click below to copy citation to clipboard</span>
          <button
            className={`btn btn-primary ${copied ? 'btn-copied' : ''}`}
            onClick={handleCopy}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard!' : 'Copy BibTeX'}
          </button>
        </div>
      </div>
    </div>
  );
};
