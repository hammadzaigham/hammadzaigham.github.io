import React from 'react';
import { Mail, Phone, Sparkles, FileText, MapPin } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { CV_DATA } from '../data/cvData';

interface HeaderHUDProps {
  viewMode: 'interactive' | 'academic';
  onToggleViewMode: (mode: 'interactive' | 'academic') => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({ viewMode, onToggleViewMode }) => {
  return (
    <header className="hud-header" id="header-hud">
      {/* Top Banner Status Bar */}
      <div className="hud-top-bar">
        <div className="status-pill">
          <span className="pulsing-dot" />
          <span className="mono-sub text-cyan">OPEN TO GRADUATE RESEARCH VISITS & RESEARCH FELLOWSHIPS</span>
        </div>

        {/* View Mode Toggle Pill */}
        <div className="mode-toggle-group" role="group" aria-label="CV View Mode">
          <button
            onClick={() => onToggleViewMode('interactive')}
            className={`mode-toggle-btn ${viewMode === 'interactive' ? 'active' : ''}`}
            id="btn-interactive-mode"
          >
            <Sparkles size={14} />
            <span>Interactive Terminal</span>
          </button>
          <button
            onClick={() => onToggleViewMode('academic')}
            className={`mode-toggle-btn ${viewMode === 'academic' ? 'active' : ''}`}
            id="btn-academic-mode"
          >
            <FileText size={14} />
            <span>Academic CV (Print)</span>
          </button>
        </div>
      </div>

      {/* Main Identity Box */}
      <div className="hud-identity-card">
        <div className="identity-left">
          <div className="affiliation-badge">
            <span className="badge badge-emerald">GPA: 4.00 / 4.00</span>
            <span className="badge badge-blue">President's List 2024–2026</span>
            <span className="badge badge-cyan">Full-Tuition Academic Scholar</span>
          </div>

          <h1 className="candidate-name">{CV_DATA.personal.name}</h1>
          <p className="candidate-tagline">
            Undergraduate Computer Science Researcher & Systems Programmer at{' '}
            <strong className="text-white">{CV_DATA.personal.institution}</strong>
          </p>

          <p className="candidate-bio">
            Bridging <strong>Embodied AI & Vision-Language Navigation</strong> (DyGRAV) with{' '}
            <strong>Low-Level Firmware Reverse Engineering</strong> (PreySense) and{' '}
            <strong>Real-Time Roadway Vision</strong> (RoadWatch).
          </p>

          {/* Contact and Links Matrix */}
          <div className="hud-contact-matrix">
            <a href={`mailto:${CV_DATA.personal.email}`} className="contact-pill" title="Send Email">
              <Mail size={14} className="text-cyan" />
              <span>{CV_DATA.personal.email}</span>
            </a>
            <a href="tel:6012109855" className="contact-pill" title="Phone">
              <Phone size={14} className="text-emerald" />
              <span>{CV_DATA.personal.phone}</span>
            </a>
            <a
              href={CV_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-pill"
              title="GitHub Profile"
            >
              <GithubIcon size={14} className="text-amber" />
              <span>github.com/{CV_DATA.personal.githubHandle}</span>
            </a>
            <div className="contact-pill no-hover">
              <MapPin size={14} className="text-blue" />
              <span>{CV_DATA.personal.location}</span>
            </div>
          </div>
        </div>

        {/* Right HUD: Quick Quickjump Navigation */}
        <div className="identity-right-nav">
          <div className="quickjump-card">
            <div className="box-tag">RESEARCH HUD NAV</div>
            <nav className="quickjump-links">
              <a href="#flagship-labs" className="q-link">
                <span className="q-num">01</span>
                <span>Flagship Interactive Labs</span>
              </a>
              <a href="#publications-section" className="q-link">
                <span className="q-num">02</span>
                <span>Peer-Reviewed Publications</span>
              </a>
              <a href="#research-experience" className="q-link">
                <span className="q-num">03</span>
                <span>SPEN Lab & UR2PhD</span>
              </a>
              <a href="#honors-awards" className="q-link">
                <span className="q-num">04</span>
                <span>Honors & Competitions</span>
              </a>
              <a href="#skills-matrix" className="q-link">
                <span className="q-num">05</span>
                <span>Systems & AI Stack</span>
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Primary Key Metric HUD Ticker */}
      <div className="hud-metrics-strip">
        {CV_DATA.stats.map((st, idx) => (
          <div key={idx} className="metric-strip-item">
            <div className="strip-val mono-font">{st.value}</div>
            <div className="strip-lbl">{st.label}</div>
            <div className="strip-sub mono-font">{st.sub}</div>
          </div>
        ))}
      </div>
    </header>
  );
};
