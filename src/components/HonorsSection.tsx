import React from 'react';
import { Trophy, Users, ExternalLink } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

export const HonorsSection: React.FC = () => {
  return (
    <section className="section-container" id="honors-awards">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-tag mono-font">RECOGNITION & IMPACT</span>
          <h2 className="section-heading">Honors, Awards & Leadership</h2>
        </div>
        <p className="section-subtext">
          National and institutional competition awards in AI multi-agent planning, space grant research, and campus leadership.
        </p>
      </div>

      <div className="honors-grid">
        {/* Awards Cards */}
        {CV_DATA.honors.map((honor) => (
          <div key={honor.id} className="honor-card">
            <div className="honor-icon-wrapper">
              <Trophy size={20} className="text-amber" />
            </div>

            <div className="honor-content">
              <div className="honor-meta-row">
                <span className="mono-sub text-amber">{honor.organization}</span>
                <span className="badge badge-outline-amber mono-font">{honor.year}</span>
              </div>

              <h3 className="honor-title">
                {honor.link ? (
                  <a
                    href={honor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="honor-link"
                  >
                    {honor.title} <ExternalLink size={14} className="inline-icon" />
                  </a>
                ) : (
                  honor.title
                )}
              </h3>

              <p className="honor-description">{honor.description}</p>
            </div>
          </div>
        ))}

        {/* Leadership & Advisory Card */}
        <div className="honor-card leadership-card">
          <div className="honor-icon-wrapper icon-emerald">
            <Users size={20} className="text-emerald" />
          </div>

          <div className="honor-content">
            <div className="honor-meta-row">
              <span className="mono-sub text-emerald">Student Governance & Mentorship</span>
              <span className="badge badge-outline-emerald mono-font">2024 – Present</span>
            </div>

            <h3 className="honor-title">International Student Advisory & Mentorship</h3>

            <div className="leadership-entries">
              {CV_DATA.leadership.map((item, idx) => (
                <div key={idx} className="lead-sub-item">
                  <div className="lead-sub-title">
                    <strong className="text-white">{item.role}</strong>
                    <span className="mono-sub text-muted"> &bull; {item.period}</span>
                  </div>
                  <p className="lead-sub-desc">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
