import React from 'react';
import { Mail, Phone, Download, Printer, ArrowUp } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { CV_DATA } from '../data/cvData';

interface FooterHUDProps {
  onSwitchToAcademic: () => void;
}

export const FooterHUD: React.FC<FooterHUDProps> = ({ onSwitchToAcademic }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-hud no-print">
      <div className="footer-grid">
        <div className="footer-col-main">
          <div className="footer-brand">
            <span className="footer-brand-title">{CV_DATA.personal.name}</span>
            <span className="badge badge-cyan">{CV_DATA.education.institution}</span>
          </div>
          <p className="footer-bio">
            Undergraduate Computer Science Researcher (GPA 4.00/4.00) focused on Embodied AI, Vision-Language Navigation, and Firmware Reverse Engineering.
          </p>
          <div className="footer-coords mono-sub">
            <span>&bull; Lat/Long: 31.3271° N, 89.2903° W</span>
            <span>&bull; Status: Candidate for Ph.D. / Research Lab Visits</span>
          </div>
        </div>

        <div className="footer-col-actions">
          <div className="box-tag">RESOURCES & EXPORTS</div>
          <div className="footer-action-list">
            <a
              href="./cv.tex"
              download="hammad_ahmed_academic_cv.tex"
              className="footer-action-link"
            >
              <Download size={14} className="text-cyan" />
              <span>Download cv.tex (Raw LaTeX)</span>
            </a>
            <button
              onClick={onSwitchToAcademic}
              className="footer-action-link"
            >
              <Printer size={14} className="text-emerald" />
              <span>Switch to Academic Print CV</span>
            </button>
            <a
              href={CV_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-action-link"
            >
              <GithubIcon size={14} className="text-amber" />
              <span>GitHub / {CV_DATA.personal.githubHandle}</span>
            </a>
          </div>
        </div>

        <div className="footer-col-contact">
          <div className="box-tag">DIRECT INQUIRIES</div>
          <div className="footer-contact-links">
            <a href={`mailto:${CV_DATA.personal.email}`} className="footer-contact-item">
              <Mail size={13} className="text-cyan" /> {CV_DATA.personal.email}
            </a>
            <a href="tel:6012109855" className="footer-contact-item">
              <Phone size={13} className="text-emerald" /> {CV_DATA.personal.phone}
            </a>
          </div>

          <button onClick={scrollToTop} className="btn-scroll-top" title="Return to Top">
            <ArrowUp size={14} /> Back to top
          </button>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="mono-sub text-muted">
          &copy; {new Date().getFullYear()} Hammad Ahmed &bull; Engineered with React 19, TypeScript & Custom Vanilla CSS &bull; Built for GitHub Pages (.github.io)
        </div>
      </div>
    </footer>
  );
};
