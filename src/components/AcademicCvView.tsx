import React from 'react';
import { Printer, Sparkles } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface AcademicCvViewProps {
  onSwitchToInteractive: () => void;
}

export const AcademicCvView: React.FC<AcademicCvViewProps> = ({ onSwitchToInteractive }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="academic-view-wrapper">
      {/* Top action bar (hidden during print) */}
      <div className="academic-toolbar no-print">
        <div className="toolbar-info">
          <span className="badge badge-academic">LaTeX Exact Format</span>
          <span className="toolbar-desc">Print-ready academic curriculum vitæ formatted for university PIs, admissions, and fellowship committees.</span>
        </div>
        <div className="toolbar-actions">
          <button onClick={handlePrint} className="btn btn-primary btn-sm">
            <Printer size={15} /> Print / Save as PDF
          </button>
          <button onClick={onSwitchToInteractive} className="btn btn-outline btn-sm">
            <Sparkles size={15} /> Switch to Interactive Showcase
          </button>
        </div>
      </div>

      {/* The LaTeX-Fidelity Paper Document Container */}
      <div className="paper-document">
        {/* Name & Contact */}
        <header className="paper-header">
          <h1 className="paper-name">{CV_DATA.personal.name}</h1>
          <div className="paper-contact-line">
            <a href={`mailto:${CV_DATA.personal.email}`}>{CV_DATA.personal.email}</a>
            <span className="sep">|</span>
            <span>{CV_DATA.personal.phone}</span>
            <span className="sep">|</span>
            <a href={CV_DATA.personal.github} target="_blank" rel="noopener noreferrer">
              {CV_DATA.personal.github.replace('https://', '')}
            </a>
          </div>
        </header>

        {/* Education */}
        <section className="paper-section">
          <h2 className="paper-sec-title">Education</h2>
          <div className="paper-entry-heading">
            <span className="bold">{CV_DATA.education.institution}</span>
            <span className="right-align">{CV_DATA.education.location}</span>
          </div>
          <div className="paper-entry-sub">
            <span className="italic">{CV_DATA.education.degree} | {CV_DATA.education.minor}</span>
            <span className="right-align">{CV_DATA.education.period}</span>
          </div>
          <div className="paper-kv-row">
            <span className="bold">GPA:</span> {CV_DATA.education.gpa}
            <span className="spacer-right"></span>
            <span className="bold">President's List:</span> {CV_DATA.education.presidentsList}
          </div>
          <div className="paper-coursework">
            <span className="bold">Relevant Coursework:</span> {CV_DATA.education.coursework.join(', ')}
          </div>
        </section>

        {/* Research Interests */}
        <section className="paper-section">
          <h2 className="paper-sec-title">Research Interests</h2>
          {CV_DATA.researchInterests.map((ri, idx) => (
            <div key={idx} className="paper-interest-line">
              <span className="bold">{ri.area}:</span> {ri.topics.join(', ')}
            </div>
          ))}
        </section>

        {/* Publications */}
        <section className="paper-section">
          <h2 className="paper-sec-title">Publications</h2>
          <ol className="paper-publications-list">
            {CV_DATA.publications.map((pub) => (
              <li key={pub.id} className="paper-pub-item">
                <span>
                  {pub.authors.map((author, aIdx) => (
                    <React.Fragment key={aIdx}>
                      {author === "Hammad Ahmed" ? (
                        <strong className="bold">{author}</strong>
                      ) : (
                        author
                      )}
                      {aIdx < pub.authors.length - 1 ? ", " : ". "}
                    </React.Fragment>
                  ))}
                  &ldquo;{pub.title}.&rdquo; <em>{pub.venue.split('.')[0]}</em>
                  {pub.venue.split('.').slice(1).join('.')}
                  {pub.doi && (
                    <>
                      {" "}
                      <a href={pub.doiUrl} target="_blank" rel="noopener noreferrer" className="paper-link">
                        doi:{pub.doi}
                      </a>.
                    </>
                  )}
                  {pub.status === 'accepted' && " Accepted; proceedings forthcoming in Springer "}
                  {pub.status === 'accepted' && <em>Lecture Notes in Networks and Systems</em>}
                  {pub.status === 'accepted' && "."}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Research Experience */}
        <section className="paper-section">
          <h2 className="paper-sec-title">Research Experience</h2>
          {CV_DATA.researchExperience.map((exp) => (
            <div key={exp.id} className="paper-sub-block">
              <div className="paper-entry-heading">
                <span className="bold">{exp.organization}</span>
                <span className="right-align">{exp.location}</span>
              </div>
              <div className="paper-entry-sub">
                <span className="italic">
                  {exp.role} {exp.advisor ? `| Advisor: ${exp.advisor}` : ''}
                </span>
                <span className="right-align">{exp.period}</span>
              </div>

              {exp.topics.map((topic, tIdx) => (
                <div key={tIdx} className="paper-topic-block">
                  <div className="paper-topic-title italic">{topic.title}</div>
                  <ul className="paper-bullet-list">
                    {topic.bulletPoints.map((bp, bIdx) => {
                      // Highlight key metrics in bold as in LaTeX
                      return (
                        <li key={bIdx} className="paper-bullet">
                          <span dangerouslySetInnerHTML={{
                            __html: bp
                              .replace('80.28% success rate and 76.41% SPL', '<strong>80.28% success rate and 76.41% SPL</strong>')
                              .replace('97.33%', '<strong>97.33%</strong>')
                              .replace('4×4 taxonomy', '<strong>4×4 taxonomy</strong>')
                              .replace('53 EV charging studies', '<strong>53 EV charging studies</strong>')
                          }} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Technical Projects */}
        <section className="paper-section">
          <h2 className="paper-sec-title">Technical Projects</h2>

          {/* RoadWatch */}
          <div className="paper-sub-block">
            <div className="paper-entry-heading">
              <span className="bold">
                <a href="https://3-141-198-95.sslip.io/" target="_blank" rel="noopener noreferrer" className="paper-link">
                  RoadWatch
                </a>
                {" "}– Mississippi AI Innovation Hub
              </span>
              <span className="right-align">Sep 2026 – Present</span>
            </div>
            <div className="paper-entry-sub">
              <span className="italic">Backend and UI Lead</span>
            </div>
            <ul className="paper-bullet-list">
              <li className="paper-bullet">
                Built an AI roadway-inspection pipeline using fine-tuned <strong>YOLOv8s</strong> pothole/crack detection (<strong>5,700+ training images; 9,600+ annotations</strong>) and <strong>INT8 SegFormer-B0 (ONNX)</strong> road segmentation.
              </li>
              <li className="paper-bullet">
                Designed three-way <strong>accept/review/reject</strong> gating using road-mask overlap and perspective geometry, routing uncertain detections for human review rather than discarding them.
              </li>
              <li className="paper-bullet">
                Implemented <strong>3-second temporal deduplication</strong> and confidence-weighted keyframes; evaluated <strong>19,784 dashcam frames</strong>, filtering <strong>162 off-road detections</strong> and identifying <strong>18 verified hazards</strong>.
              </li>
              <li className="paper-bullet">
                Built a GPS-linked human-review dashboard (<strong>FastAPI, SQLite, React/TypeScript, Leaflet</strong>) with severity triage and visual overlays; deployed on <strong>AWS EC2</strong> using Nginx and HTTPS.
              </li>
            </ul>
          </div>

          {/* PreySense */}
          <div className="paper-sub-block">
            <div className="paper-entry-heading">
              <span className="bold">
                <a href="https://github.com/hammadzaigham/PreySense" target="_blank" rel="noopener noreferrer" className="paper-link">
                  PreySense
                </a>
                {" "}– Acer Firmware Reverse Engineering
              </span>
              <span className="right-align">2026 – Present</span>
            </div>
            <div className="paper-entry-sub">
              <span className="italic">Creator and Lead Developer | Open-source C#/WPF (.NET 10); 70+ GitHub stars</span>
            </div>
            <ul className="paper-bullet-list">
              <li className="paper-bullet">
                Reverse-engineered undocumented Acer firmware controls through DSDT/SSDT ACPI analysis, WMI dispatch paths, embedded-controller interfaces, and proprietary AcerService packet protocols.
              </li>
              <li className="paper-bullet">
                Engineered OpenCore ACPI hotpatches and C# integration for per-profile CPU/GPU power and thermal limits; analyzed NVIDIA VBIOS, Dynamic Boost, and driver power-state behavior.
              </li>
              <li className="paper-bullet">
                Implemented direct WMI/EC and HID hardware communication, custom fan control and RGB effects, graphics switching, and GPU telemetry via NVAPI/NVML.
              </li>
              <li className="paper-bullet">
                Developed a modular Windows utility with game-triggered power profiles, battery/display controls, live CPU/GPU and FPS overlay, and an integrated OpenCore installer.
              </li>
            </ul>
          </div>
        </section>

        {/* Honors and Awards */}
        <section className="paper-section">
          <h2 className="paper-sec-title">Honors and Awards</h2>
          {CV_DATA.honors.map((honor) => (
            <div key={honor.id} className="paper-award-item">
              <div className="paper-entry-heading">
                <span className="bold">
                  {honor.link ? (
                    <a href={honor.link} target="_blank" rel="noopener noreferrer" className="paper-link">
                      {honor.title}
                    </a>
                  ) : (
                    honor.title
                  )}
                </span>
                <span className="right-align">{honor.year}</span>
              </div>
              <p className="paper-award-desc">{honor.description}</p>
            </div>
          ))}
        </section>

        {/* Professional Experience */}
        <section className="paper-section">
          <h2 className="paper-sec-title">Professional Experience</h2>
          {CV_DATA.workExperience.map((exp) => (
            <div key={exp.id} className="paper-sub-block">
              <div className="paper-entry-heading">
                <span className="bold">{exp.company}</span>
                <span className="right-align">{exp.location}</span>
              </div>
              <div className="paper-entry-sub">
                <span className="italic">{exp.role}</span>
                <span className="right-align">{exp.period}</span>
              </div>
              <ul className="paper-bullet-list">
                {exp.bulletPoints.map((bp, idx) => (
                  <li key={idx} className="paper-bullet">{bp}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Leadership and Service */}
        <section className="paper-section">
          <h2 className="paper-sec-title">Leadership and Service</h2>
          {CV_DATA.leadership.map((item, idx) => (
            <div key={idx} className="paper-leadership-line">
              <span className="bold">{item.role}, {item.organization}</span>
              <span className="right-align">{item.period}</span>
            </div>
          ))}
        </section>

        {/* Technical Skills */}
        <section className="paper-section">
          <h2 className="paper-sec-title">Technical Skills</h2>
          <div className="paper-skill-line">
            <span className="bold">Languages:</span> Python, C, C++, C#, Java, JavaScript/TypeScript, SQL
          </div>
          <div className="paper-skill-line">
            <span className="bold">AI/Research:</span> PyTorch, CUDA, Hugging Face, CLIP, OpenCV, model evaluation
          </div>
          <div className="paper-skill-line">
            <span className="bold">Systems/Security:</span> ACPI/SSDT, WMI, embedded controllers, HID, NVAPI/NVML, authentication protocols, threat modeling
          </div>
          <div className="paper-skill-line">
            <span className="bold">Development:</span> FastAPI, React, WPF, SQLite, Docker, Git, Linux, LaTeX
          </div>
        </section>
      </div>
    </div>
  );
};
