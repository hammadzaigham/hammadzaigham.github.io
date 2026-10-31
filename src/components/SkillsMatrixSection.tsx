import React, { useState } from 'react';
import { Code2, BrainCircuit, Cpu, Wrench, Search } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

export const SkillsMatrixSection: React.FC = () => {
  const [filterText, setFilterText] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...CV_DATA.skills.map((c) => c.category)];

  const getCategoryIcon = (name: string) => {
    if (name.includes('Languages')) return <Code2 size={16} className="text-cyan" />;
    if (name.includes('AI')) return <BrainCircuit size={16} className="text-emerald" />;
    if (name.includes('Systems')) return <Cpu size={16} className="text-amber" />;
    return <Wrench size={16} className="text-blue" />;
  };

  const filteredCategories = CV_DATA.skills
    .filter((cat) => activeCategory === 'All' || cat.category === activeCategory)
    .map((cat) => {
      const matchingSkills = cat.skills.filter((skill) =>
        skill.toLowerCase().includes(filterText.toLowerCase())
      );
      return {
        ...cat,
        skills: matchingSkills,
      };
    })
    .filter((cat) => cat.skills.length > 0);

  return (
    <section className="section-container" id="skills-matrix">
      <div className="section-header">
        <div className="section-title-wrap">
          <span className="section-tag mono-font">SYSTEMS & AI TOOLBOX</span>
          <h2 className="section-heading">Technical Competencies</h2>
        </div>
        <p className="section-subtext">
          Comprehensive stack spanning low-level ACPI/EC reverse engineering, modern deep learning research, and cloud microservice deployment.
        </p>

        {/* Filter controls */}
        <div className="skills-filter-bar">
          <div className="category-pill-row">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="skill-search-wrap">
            <Search size={14} className="search-icon text-muted" />
            <input
              type="text"
              placeholder="Search tools, models, frameworks..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="skill-search-input mono-font"
            />
          </div>
        </div>
      </div>

      <div className="skills-category-grid">
        {filteredCategories.map((cat) => (
          <div key={cat.category} className="skill-card">
            <div className="skill-card-header">
              {getCategoryIcon(cat.category)}
              <h3 className="skill-category-title">{cat.category}</h3>
            </div>

            <div className="skill-badge-cloud">
              {cat.skills.map((skill, sIdx) => {
                const isHighlight =
                  filterText && skill.toLowerCase().includes(filterText.toLowerCase());
                return (
                  <span
                    key={sIdx}
                    className={`skill-pill ${isHighlight ? 'skill-highlight' : ''}`}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
