import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ExternalLink, FileText, Cpu } from 'lucide-react';

interface StepData {
  stepIndex: number;
  locationName: string;
  agentPos: { x: number; y: number };
  subInstruction: string;
  groundedObjects: { label: string; confidence: number }[];
  budgetUsedPercent: number;
}

const EPISODE_STEPS: StepData[] = [
  {
    stepIndex: 1,
    locationName: "Node A: Master Bedroom Exit",
    agentPos: { x: 70, y: 190 },
    subInstruction: "Leave the bedroom through the open doorway.",
    groundedObjects: [
      { label: "Doorway", confidence: 0.94 },
      { label: "Bed Frame", confidence: 0.42 },
      { label: "Nightstand", confidence: 0.28 },
    ],
    budgetUsedPercent: 18,
  },
  {
    stepIndex: 2,
    locationName: "Node B: Dining Area Corridor",
    agentPos: { x: 190, y: 150 },
    subInstruction: "Proceed past the wooden dining table towards the main corridor.",
    groundedObjects: [
      { label: "Dining Table", confidence: 0.96 },
      { label: "Chair Cluster", confidence: 0.81 },
      { label: "Ceiling Chandelier", confidence: 0.35 },
    ],
    budgetUsedPercent: 39,
  },
  {
    stepIndex: 3,
    locationName: "Node C: Hallway Junction",
    agentPos: { x: 310, y: 110 },
    subInstruction: "Follow the corridor forward to the junction with the gallery wall.",
    groundedObjects: [
      { label: "Hallway Arch", confidence: 0.91 },
      { label: "Wall Sconce", confidence: 0.63 },
      { label: "Baseboard", confidence: 0.22 },
    ],
    budgetUsedPercent: 58,
  },
  {
    stepIndex: 4,
    locationName: "Node D: Gallery Corner Turn",
    agentPos: { x: 420, y: 160 },
    subInstruction: "Turn left sharply by the framed oil painting into the kitchen arch.",
    groundedObjects: [
      { label: "Framed Painting", confidence: 0.98 },
      { label: "Archway Post", confidence: 0.74 },
      { label: "Tile Transition", confidence: 0.52 },
    ],
    budgetUsedPercent: 77,
  },
  {
    stepIndex: 5,
    locationName: "Node E: Kitchen Target (Goal Reached)",
    agentPos: { x: 500, y: 220 },
    subInstruction: "Stop directly in front of the stainless steel refrigerator.",
    groundedObjects: [
      { label: "Refrigerator", confidence: 0.99 },
      { label: "Countertop", confidence: 0.83 },
      { label: "Dishwasher", confidence: 0.45 },
    ],
    budgetUsedPercent: 91,
  },
];

interface DyGravVisualizerProps {
  onOpenBibtex: (id: string) => void;
}

export const DyGravVisualizer: React.FC<DyGravVisualizerProps> = ({ onOpenBibtex }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const activeStep = EPISODE_STEPS[currentStep];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= EPISODE_STEPS.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="lab-card dygrav-card" id="dygrav-lab">
      {/* Header bar */}
      <div className="lab-header">
        <div className="lab-title-group">
          <div className="lab-badge-row">
            <span className="badge badge-cyan">Embodied AI Research</span>
            <span className="badge badge-blue">MDPI Information 2026</span>
            <span className="badge badge-emerald">
              <Cpu size={12} className="inline-icon" /> 97.33% Budget Compliance
            </span>
          </div>
          <h3 className="lab-title">DyGRAV: Dynamic Grounding & Relational Reasoning</h3>
          <p className="lab-subtitle">
            Vision–Language Navigation interactive trajectory & dynamic object attention over topological graph representations.
          </p>
        </div>

        <div className="lab-actions">
          <a
            href="https://doi.org/10.3390/info17101030"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            title="Read published paper on MDPI"
          >
            <ExternalLink size={14} /> DOI: 10.3390/info17101030
          </a>
          <button
            onClick={() => onOpenBibtex('dygrav-2026')}
            className="btn btn-secondary btn-sm"
            title="View and copy BibTeX citation"
          >
            <FileText size={14} /> BibTeX
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="dygrav-grid">
        {/* Left Column: Visual Navigation Map */}
        <div className="dygrav-map-panel">
          <div className="map-toolbar">
            <span className="mono-label">EPISODE: R2R_VAL_UNSEEN #1042</span>
            <div className="step-counter">
              STEP {currentStep + 1} OF {EPISODE_STEPS.length}
            </div>
          </div>

          <div className="map-canvas-container">
            <svg
              className="topological-svg"
              viewBox="0 0 580 280"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Topological Room Zones */}
              <rect x="30" y="140" width="100" height="110" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <text x="80" y="240" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">BEDROOM</text>

              <rect x="140" y="90" width="120" height="130" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <text x="200" y="210" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">DINING</text>

              <rect x="270" y="60" width="110" height="120" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <text x="325" y="170" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">CORRIDOR</text>

              <rect x="390" y="110" width="160" height="150" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
              <text x="470" y="250" fill="#64748B" fontSize="10" textAnchor="middle" fontFamily="JetBrains Mono">KITCHEN (GOAL)</text>

              {/* Complete Planned Path (dashed faint) */}
              <polyline
                points="70,190 190,150 310,110 420,160 500,220"
                fill="none"
                stroke="rgba(0, 240, 255, 0.22)"
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* Traversed Path (solid glow) */}
              {currentStep > 0 && (
                <polyline
                  points={EPISODE_STEPS.slice(0, currentStep + 1)
                    .map((s) => `${s.agentPos.x},${s.agentPos.y}`)
                    .join(' ')}
                  fill="none"
                  stroke="#00F0FF"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="drop-shadow(0 0 8px rgba(0,240,255,0.6))"
                />
              )}

              {/* Waypoint Nodes */}
              {EPISODE_STEPS.map((s, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <g key={idx} transform={`translate(${s.agentPos.x}, ${s.agentPos.y})`}>
                    {/* Ring for active node */}
                    {isCurrent && (
                      <circle r="16" fill="none" stroke="#00F0FF" strokeWidth="1.5" opacity="0.6">
                        <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      r={isCurrent ? 9 : 6}
                      fill={isCurrent ? '#00F0FF' : isPassed ? '#38BDF8' : '#1E293B'}
                      stroke={isCurrent ? '#FFFFFF' : '#475569'}
                      strokeWidth={isCurrent ? 2 : 1}
                    />
                    <text
                      y={-14}
                      fill={isCurrent ? '#00F0FF' : isPassed ? '#94A3B8' : '#64748B'}
                      fontSize="10"
                      fontFamily="JetBrains Mono"
                      fontWeight={isCurrent ? 'bold' : 'normal'}
                      textAnchor="middle"
                    >
                      {idx === 0 ? 'START' : idx === EPISODE_STEPS.length - 1 ? 'GOAL' : `N${idx}`}
                    </text>
                  </g>
                );
              })}

              {/* Dynamic Grounding Attention Rays */}
              {activeStep.groundedObjects.map((obj, i) => {
                const targetY = activeStep.agentPos.y + (i === 0 ? -35 : i === 1 ? 30 : -20);
                const targetX = activeStep.agentPos.x + (i === 0 ? 45 : i === 1 ? -40 : 35);
                return (
                  <g key={i}>
                    <line
                      x1={activeStep.agentPos.x}
                      y1={activeStep.agentPos.y}
                      x2={targetX}
                      y2={targetY}
                      stroke="#F59E0B"
                      strokeWidth={obj.confidence * 2.2}
                      strokeDasharray="2 2"
                      opacity={obj.confidence * 0.8}
                    />
                    <rect
                      x={targetX - 28}
                      y={targetY - 10}
                      width="56"
                      height="16"
                      rx="3"
                      fill="#0B132B"
                      stroke="#F59E0B"
                      strokeWidth="0.8"
                    />
                    <text
                      x={targetX}
                      y={targetY + 2}
                      fill="#F59E0B"
                      fontSize="8"
                      fontFamily="JetBrains Mono"
                      textAnchor="middle"
                    >
                      {obj.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Stepper Controls */}
          <div className="map-controls">
            <div className="btn-group">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                {isPlaying ? 'Pause Episode' : 'Play Simulation'}
              </button>
              <button
                className="btn btn-sm btn-icon"
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                title="Previous Step"
              >
                ←
              </button>
              <button
                className="btn btn-sm btn-icon"
                onClick={() => setCurrentStep((prev) => Math.min(EPISODE_STEPS.length - 1, prev + 1))}
                disabled={currentStep === EPISODE_STEPS.length - 1}
                title="Next Step"
              >
                →
              </button>
              <button
                className="btn btn-sm btn-icon"
                onClick={() => {
                  setCurrentStep(0);
                  setIsPlaying(false);
                }}
                title="Reset Simulation"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            <div className="progress-slider-wrapper">
              <input
                type="range"
                min="0"
                max={EPISODE_STEPS.length - 1}
                value={currentStep}
                onChange={(e) => {
                  setCurrentStep(parseInt(e.target.value, 10));
                  setIsPlaying(false);
                }}
                className="step-slider"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Reasoning & Dynamic Grounding Attention */}
        <div className="dygrav-reasoning-panel">
          <div className="panel-box instruction-box">
            <div className="box-tag">FULL LANGUAGE INSTRUCTION</div>
            <p className="instruction-text">
              &ldquo;Leave the bedroom, head past the dining table towards the hallway, turn left by the painting, and stop in front of the refrigerator.&rdquo;
            </p>
          </div>

          <div className="panel-box active-action-box">
            <div className="box-tag">SUB-GOAL GROUNDED AT STEP {currentStep + 1}</div>
            <div className="location-heading">{activeStep.locationName}</div>
            <p className="sub-instruction-text">&rarr; {activeStep.subInstruction}</p>
          </div>

          {/* Dynamic Grounding Attention Vector */}
          <div className="panel-box attention-box">
            <div className="box-tag">DYNAMIC GROUNDING ATTENTION WEIGHTS (DYGRAV)</div>
            <div className="attention-bars">
              {activeStep.groundedObjects.map((item, idx) => (
                <div key={idx} className="attention-item">
                  <div className="item-labels">
                    <span className="obj-name">{item.label}</span>
                    <span className="obj-conf mono-font">{(item.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="meter-track">
                    <div
                      className="meter-fill"
                      style={{
                        width: `${item.confidence * 100}%`,
                        backgroundColor: idx === 0 ? '#00F0FF' : idx === 1 ? '#38BDF8' : '#F59E0B',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Published Results Badge Grid */}
          <div className="benchmark-callout-grid">
            <div className="bench-card">
              <div className="bench-metric mono-font">80.28%</div>
              <div className="bench-title">Success Rate (SR)</div>
              <div className="bench-delta text-emerald">+2.46% vs GOAT baseline</div>
            </div>
            <div className="bench-card">
              <div className="bench-metric mono-font">76.41%</div>
              <div className="bench-title">SPL Metric</div>
              <div className="bench-delta text-emerald">+8.28% vs GOAT baseline</div>
            </div>
            <div className="bench-card">
              <div className="bench-metric mono-font">97.33%</div>
              <div className="bench-title">Budget Compliance</div>
              <div className="bench-delta text-cyan">Episode compute constraint</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
