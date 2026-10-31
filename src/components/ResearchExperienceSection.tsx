import React from 'react';
import { Microscope, Calendar, MapPin, User, Briefcase } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

export const ResearchExperienceSection: React.FC = () => {
  return (
    <section className="section-container" id="research-experience">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-tag mono-font">APPOINTMENTS & LABS</span>
          <h2 className="section-heading">Research & Professional Experience</h2>
        </div>
        <p className="section-subtext">
          Mentored research in Embodied AI and cyber-physical vehicular security, complemented by software engineering experience.
        </p>
      </div>

      <div className="experience-timeline">
        {/* Academic Research Appointments */}
        {CV_DATA.researchExperience.map((exp, idx) => (
          <div key={exp.id} className="timeline-card">
            <div className="timeline-indicator">
              <div className="indicator-node">
                <Microscope size={16} className="text-cyan" />
              </div>
              {idx < CV_DATA.researchExperience.length && <div className="indicator-line" />}
            </div>

            <div className="timeline-body">
              <div className="timeline-header-row">
                <div className="exp-org-wrap">
                  <h3 className="exp-org-title">{exp.organization}</h3>
                  <div className="exp-role-meta">
                    <span className="exp-role text-cyan">{exp.role}</span>
                    {exp.advisor && (
                      <span className="exp-advisor mono-sub">
                        <User size={12} className="inline-icon" /> Advisor: {exp.advisor}
                      </span>
                    )}
                  </div>
                </div>

                <div className="exp-time-loc mono-sub">
                  <span><Calendar size={12} className="inline-icon text-muted" /> {exp.period}</span>
                  <span><MapPin size={12} className="inline-icon text-muted" /> {exp.location}</span>
                </div>
              </div>

              {/* Research Topic Clusters */}
              <div className="research-topics-wrap">
                {exp.topics.map((topic, tIdx) => (
                  <div key={tIdx} className="topic-block">
                    <h4 className="topic-title mono-font">
                      <span className="text-cyan">&rsaquo;</span> {topic.title}
                    </h4>
                    <ul className="topic-bullets">
                      {topic.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx} className="topic-bullet-item">
                          <span dangerouslySetInnerHTML={{
                            __html: bp
                              .replace('80.28% success rate and 76.41% SPL', '<strong class="highlight-text">80.28% success rate and 76.41% SPL</strong>')
                              .replace('97.33%', '<strong class="highlight-text">97.33%</strong>')
                              .replace('4×4 taxonomy', '<strong class="highlight-text">4×4 taxonomy</strong>')
                              .replace('53 EV charging studies', '<strong class="highlight-text">53 EV charging studies</strong>')
                          }} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Industry / Full Stack Experience */}
        {CV_DATA.workExperience.map((work) => (
          <div key={work.id} className="timeline-card">
            <div className="timeline-indicator">
              <div className="indicator-node node-purple">
                <Briefcase size={16} className="text-blue" />
              </div>
            </div>

            <div className="timeline-body">
              <div className="timeline-header-row">
                <div className="exp-org-wrap">
                  <h3 className="exp-org-title">{work.company}</h3>
                  <div className="exp-role-meta">
                    <span className="exp-role text-blue">{work.role}</span>
                  </div>
                </div>

                <div className="exp-time-loc mono-sub">
                  <span><Calendar size={12} className="inline-icon text-muted" /> {work.period}</span>
                  <span><MapPin size={12} className="inline-icon text-muted" /> {work.location}</span>
                </div>
              </div>

              <ul className="topic-bullets work-bullets">
                {work.bulletPoints.map((bp, idx) => (
                  <li key={idx} className="topic-bullet-item">{bp}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
