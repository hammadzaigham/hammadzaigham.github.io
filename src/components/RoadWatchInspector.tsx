import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, AlertTriangle, XCircle, MapPin, Layers, Server } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  description: string;
  detectionType: string;
  yoloConf: number;
  roadMaskIoU: number;
  verdict: 'accept' | 'review' | 'reject';
  verdictLabel: string;
  verdictReason: string;
  gpsCoords: string;
  bbox: { x: number; y: number; w: number; h: number };
}

const SCENARIOS: Scenario[] = [
  {
    id: "severe-pothole",
    name: "Scenario A: Highway Mid-Lane Pothole",
    description: "Deep surface cavity situated directly in the primary travel lane of US-49.",
    detectionType: "Pothole (Class 0)",
    yoloConf: 0.93,
    roadMaskIoU: 0.95,
    verdict: "accept",
    verdictLabel: "ACCEPTED (Direct Log)",
    verdictReason: "High detection confidence (>0.90) with 95% intersection on SegFormer drivable road mask.",
    gpsCoords: "31.3271° N, 89.2903° W (Hattiesburg, MS)",
    bbox: { x: 210, y: 140, w: 90, h: 45 },
  },
  {
    id: "shoulder-crack",
    name: "Scenario B: Roadway Shoulder Transverse Crack",
    description: "Lateral fissure near pavement transition boundary with partial occlusion.",
    detectionType: "Transverse Crack (Class 1)",
    yoloConf: 0.82,
    roadMaskIoU: 0.52,
    verdict: "review",
    verdictLabel: "FLAGGED FOR HUMAN REVIEW",
    verdictReason: "Moderate road-mask intersection (52%) near road boundary; routed to FastAPI triage queue instead of discarding.",
    gpsCoords: "31.3325° N, 89.3012° W (Hardy St)",
    bbox: { x: 330, y: 125, w: 75, h: 60 },
  },
  {
    id: "offroad-curb",
    name: "Scenario C: Sidewalk Curb Discoloration",
    description: "Visual concrete defect situated on pedestrian walkway outside drivable lane.",
    detectionType: "Surface Defect (False Alarm)",
    yoloConf: 0.71,
    roadMaskIoU: 0.08,
    verdict: "reject",
    verdictLabel: "REJECTED (Off-Road Filtered)",
    verdictReason: "Perspective geometry & SegFormer mask confirm object is off-road (<10% overlap). Filtered 162 such instances.",
    gpsCoords: "31.3190° N, 89.3140° W (Commercial District)",
    bbox: { x: 40, y: 110, w: 65, h: 40 },
  },
];

export const RoadWatchInspector: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('severe-pothole');
  const [showMask, setShowMask] = useState<boolean>(true);

  const scenario = SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  return (
    <div className="lab-card roadwatch-card" id="roadwatch-lab">
      {/* Header */}
      <div className="lab-header">
        <div className="lab-title-group">
          <div className="lab-badge-row">
            <span className="badge badge-emerald">Mississippi AI Innovation Hub</span>
            <span className="badge badge-cyan">YOLOv8s + SegFormer-B0 ONNX</span>
            <span className="badge badge-blue">Deployed on AWS EC2</span>
          </div>
          <h3 className="lab-title">RoadWatch: AI Roadway Inspection & Severity Triage</h3>
          <p className="lab-subtitle">
            Three-way perspective gating (Accept / Review / Reject) combining fine-tuned object detection with real-time drivable road segmentation.
          </p>
        </div>

        <div className="lab-actions">
          <a
            href="https://3-141-198-95.sslip.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm pulse-btn"
          >
            <ExternalLink size={14} /> Live AWS Deployment
          </a>
        </div>
      </div>

      {/* Scenario Picker Toolbar */}
      <div className="roadwatch-toolbar">
        <div className="scenario-pills">
          {SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              className={`scenario-btn ${sc.id === scenario.id ? 'active' : ''}`}
            >
              {sc.name}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowMask(!showMask)}
          className={`btn btn-sm ${showMask ? 'btn-secondary' : 'btn-outline'}`}
        >
          <Layers size={13} /> {showMask ? 'SegFormer Mask: ON' : 'SegFormer Mask: OFF'}
        </button>
      </div>

      {/* Main Grid: Visual Frame Simulation vs Pipeline Logic */}
      <div className="roadwatch-grid">
        {/* Left: Frame Viewport */}
        <div className="viewport-container">
          <div className="viewport-overlay-bar">
            <span className="mono-stat"><MapPin size={12} className="inline-icon text-cyan" /> {scenario.gpsCoords}</span>
            <span className="mono-stat">FPS: 32.4 · INT8 ONNX</span>
          </div>

          <div className="dashcam-canvas-box">
            <svg
              className="dashcam-svg"
              viewBox="0 0 460 230"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0B132B" />
                  <stop offset="100%" stopColor="#1C2541" />
                </linearGradient>
                <linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>
              </defs>

              {/* Sky Background */}
              <rect x="0" y="0" width="460" height="90" fill="url(#skyGrad)" />
              {/* Horizon line & roadside trees */}
              <line x1="0" y1="90" x2="460" y2="90" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

              {/* Road Geometry Polygon (perspective) */}
              <polygon
                points="180,90 280,90 440,230 20,230"
                fill="url(#roadGrad)"
                stroke="#334155"
                strokeWidth="1.5"
              />

              {/* Lane Center Dashes */}
              <line x1="230" y1="90" x2="230" y2="230" stroke="#F8FAFC" strokeWidth="2.5" strokeDasharray="12 10" opacity="0.4" />

              {/* SegFormer Drivable Road Mask Overlay */}
              {showMask && (
                <polygon
                  points="180,90 280,90 440,230 20,230"
                  fill="rgba(0, 240, 255, 0.16)"
                  stroke="#00F0FF"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              )}

              {/* Pedestrian Sidewalk on Left */}
              <polygon points="0,90 180,90 20,230 0,230" fill="rgba(30, 41, 59, 0.5)" />

              {/* Detected Bounding Box */}
              <g transform={`translate(${scenario.bbox.x}, ${scenario.bbox.y})`}>
                <rect
                  x="0"
                  y="0"
                  width={scenario.bbox.w}
                  height={scenario.bbox.h}
                  fill={
                    scenario.verdict === 'accept'
                      ? 'rgba(16, 185, 129, 0.25)'
                      : scenario.verdict === 'review'
                      ? 'rgba(245, 158, 11, 0.25)'
                      : 'rgba(239, 68, 68, 0.25)'
                  }
                  stroke={
                    scenario.verdict === 'accept'
                      ? '#10B981'
                      : scenario.verdict === 'review'
                      ? '#F59E0B'
                      : '#EF4444'
                  }
                  strokeWidth="2"
                  strokeDasharray={scenario.verdict === 'review' ? '4 2' : 'none'}
                />

                {/* Box Label Tag */}
                <rect
                  x="0"
                  y="-16"
                  width={scenario.bbox.w + 10}
                  height="16"
                  fill={
                    scenario.verdict === 'accept'
                      ? '#10B981'
                      : scenario.verdict === 'review'
                      ? '#F59E0B'
                      : '#EF4444'
                  }
                  rx="2"
                />
                <text
                  x="4"
                  y="-4"
                  fill="#090D14"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  fontWeight="bold"
                >
                  {scenario.detectionType} ({(scenario.yoloConf * 100).toFixed(0)}%)
                </text>
              </g>
            </svg>
          </div>

          <div className="viewport-footer">
            <span className="mono-sub">3-Second Temporal Deduplication & Keyframe Scorer Active</span>
          </div>
        </div>

        {/* Right: Three-Way Gating Decision Engine */}
        <div className="decision-engine-panel">
          {/* Verdict Card */}
          <div className={`verdict-banner verdict-${scenario.verdict}`}>
            <div className="verdict-icon">
              {scenario.verdict === 'accept' && <CheckCircle2 size={24} className="text-emerald" />}
              {scenario.verdict === 'review' && <AlertTriangle size={24} className="text-amber" />}
              {scenario.verdict === 'reject' && <XCircle size={24} className="text-red" />}
            </div>
            <div className="verdict-text">
              <div className="verdict-status-title mono-font">{scenario.verdictLabel}</div>
              <p className="verdict-explanation">{scenario.verdictReason}</p>
            </div>
          </div>

          {/* Gating Metrics Breakdown */}
          <div className="gating-breakdown-card">
            <div className="box-tag">GATING PARAMETERS & OVERLAP METRICS</div>
            <div className="gating-stat-row">
              <span className="gating-label">YOLOv8s Confidence:</span>
              <span className="mono-font text-white">{(scenario.yoloConf * 100).toFixed(1)}%</span>
            </div>
            <div className="gating-stat-row">
              <span className="gating-label">SegFormer Road Mask Overlap (IoU):</span>
              <span className="mono-font text-cyan">{(scenario.roadMaskIoU * 100).toFixed(1)}%</span>
            </div>
            <div className="gating-stat-row">
              <span className="gating-label">Triage Destination:</span>
              <span className="mono-font text-amber">
                {scenario.verdict === 'accept'
                  ? 'SQLite Municipal Hazard Table'
                  : scenario.verdict === 'review'
                  ? 'Leaflet Human Review Queue'
                  : 'Discarded (False Detection)'}
              </span>
            </div>
          </div>

          {/* Pipeline Scale Highlights */}
          <div className="pipeline-stats-grid">
            <div className="pipe-stat">
              <div className="stat-val mono-font">19,784</div>
              <div className="stat-lbl">Dashcam Frames Evaluated</div>
            </div>
            <div className="pipe-stat">
              <div className="stat-val mono-font text-amber">162</div>
              <div className="stat-lbl">Off-Road Falses Filtered</div>
            </div>
            <div className="pipe-stat">
              <div className="stat-val mono-font text-emerald">18</div>
              <div className="stat-lbl">Verified Critical Hazards</div>
            </div>
          </div>

          {/* Direct link card */}
          <div className="cloud-deploy-info">
            <Server size={14} className="text-cyan inline-icon" />
            <span>Deployed on AWS EC2 with FastAPI, SQLite, React, Leaflet & Nginx</span>
          </div>
        </div>
      </div>
    </div>
  );
};
