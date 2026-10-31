import React, { useState } from 'react';
import { Star, ExternalLink, Cpu, Activity, Flame, ShieldAlert, Sliders } from 'lucide-react';

interface FanPoint {
  temp: number;
  speed: number;
}

const PRESET_PROFILES: Record<string, { label: string; desc: string; points: FanPoint[]; pl1: number; pl2: number; tgp: number; rpm: number }> = {
  quiet: {
    label: "Eco / Stealth",
    desc: "Conservative acoustic threshold; CPU capped at 35W, fan max 45%",
    points: [{ temp: 40, speed: 20 }, { temp: 60, speed: 35 }, { temp: 75, speed: 50 }, { temp: 90, speed: 70 }],
    pl1: 35,
    pl2: 65,
    tgp: 95,
    rpm: 2400,
  },
  balanced: {
    label: "Balanced Daily",
    desc: "Dynamic ACPI scaling; fan ramps aggressively beyond 70°C",
    points: [{ temp: 40, speed: 25 }, { temp: 60, speed: 45 }, { temp: 75, speed: 75 }, { temp: 90, speed: 90 }],
    pl1: 55,
    pl2: 95,
    tgp: 120,
    rpm: 3850,
  },
  performance: {
    label: "Extreme Performance",
    desc: "OpenCore ACPI hotpatch active; PL2 sustained at 115W, NVIDIA Dynamic Boost enabled",
    points: [{ temp: 40, speed: 35 }, { temp: 60, speed: 65 }, { temp: 75, speed: 88 }, { temp: 90, speed: 100 }],
    pl1: 85,
    pl2: 125,
    tgp: 140,
    rpm: 5400,
  },
};

export const PreySenseStudio: React.FC = () => {
  const [activeProfileKey, setActiveProfileKey] = useState<string>('performance');
  const [points, setPoints] = useState<FanPoint[]>(PRESET_PROFILES.performance.points);
  const [activeTab, setActiveTab] = useState<'curve' | 'acpi'>('curve');

  const profile = PRESET_PROFILES[activeProfileKey];

  const handleProfileSelect = (key: string) => {
    setActiveProfileKey(key);
    setPoints(PRESET_PROFILES[key].points);
  };

  const handleCurveClick = (e: React.MouseEvent<SVGSVGElement>) => {
    // Allows user to adjust nearest point
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * 400;
    const svgY = ((e.clientY - rect.top) / rect.height) * 200;

    // Convert to temp (30 - 100°C) and speed (0 - 100%)
    const clickedTemp = Math.round(30 + (svgX / 400) * 70);
    const clickedSpeed = Math.round(100 - (svgY / 200) * 100);

    // Find closest point by temp
    let closestIdx = 0;
    let minDist = 999;
    points.forEach((p, idx) => {
      const dist = Math.abs(p.temp - clickedTemp);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = idx;
      }
    });

    const newPoints = [...points];
    newPoints[closestIdx] = {
      ...newPoints[closestIdx],
      speed: Math.max(10, Math.min(100, clickedSpeed)),
    };
    setPoints(newPoints);
  };

  return (
    <div className="lab-card preysense-card" id="preysense-lab">
      {/* Header */}
      <div className="lab-header">
        <div className="lab-title-group">
          <div className="lab-badge-row">
            <span className="badge badge-amber">Firmware Reverse Engineering</span>
            <span className="badge badge-blue">C# · .NET 10 · WPF</span>
            <a
              href="https://github.com/hammadzaigham/PreySense"
              target="_blank"
              rel="noopener noreferrer"
              className="badge badge-emerald star-badge"
            >
              <Star size={12} className="inline-icon fill-gold text-gold" /> 70+ GitHub Stars
            </a>
          </div>
          <h3 className="lab-title">PreySense: Hardware Telemetry & ACPI Hotpatch Studio</h3>
          <p className="lab-subtitle">
            Reverse-engineered Acer embedded controller (EC), WMI dispatch paths, and DSDT/SSDT tables for per-profile thermal management and hardware telemetry.
          </p>
        </div>

        <div className="lab-actions">
          <a
            href="https://github.com/hammadzaigham/PreySense"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            <ExternalLink size={14} /> View on GitHub
          </a>
        </div>
      </div>

      {/* Profile Selector Buttons */}
      <div className="preysense-toolbar">
        <div className="preset-selector">
          <span className="mono-label">ACTIVE POWER PROFILE:</span>
          <div className="btn-group">
            {Object.keys(PRESET_PROFILES).map((key) => (
              <button
                key={key}
                onClick={() => handleProfileSelect(key)}
                className={`btn btn-sm ${activeProfileKey === key ? 'btn-amber-active' : 'btn-outline'}`}
              >
                {PRESET_PROFILES[key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="tab-switcher">
          <button
            onClick={() => setActiveTab('curve')}
            className={`tab-btn ${activeTab === 'curve' ? 'active' : ''}`}
          >
            <Sliders size={13} /> Fan Curve Editor
          </button>
          <button
            onClick={() => setActiveTab('acpi')}
            className={`tab-btn ${activeTab === 'acpi' ? 'active' : ''}`}
          >
            <Activity size={13} /> EC / ACPI Registers
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Curve vs Live Hardware Gauges */}
      <div className="preysense-grid">
        {/* Left Side: Interactive Fan Curve or ACPI Register Inspector */}
        <div className="preysense-interactive-panel">
          {activeTab === 'curve' ? (
            <div className="curve-editor-container">
              <div className="curve-meta">
                <span className="mono-label">PWM RESPONSE CURVE (Click anywhere on chart to adjust setpoint)</span>
                <span className="mono-stat text-amber">{points.map(p => `${p.temp}°C:${p.speed}%`).join(' | ')}</span>
              </div>

              <div className="curve-canvas-wrap">
                <svg
                  className="fan-curve-svg"
                  viewBox="0 0 400 200"
                  onClick={handleCurveClick}
                >
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.35" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[25, 50, 75, 100].map((pct) => (
                    <line
                      key={pct}
                      x1="0"
                      y1={200 - (pct * 2)}
                      x2="400"
                      y2={200 - (pct * 2)}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="2 4"
                    />
                  ))}
                  {[40, 60, 80, 100].map((t) => (
                    <line
                      key={t}
                      x1={((t - 30) / 70) * 400}
                      y1="0"
                      x2={((t - 30) / 70) * 400}
                      y2="200"
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray="2 4"
                    />
                  ))}

                  {/* Curve Fill Area */}
                  <polygon
                    points={`0,200 ${points.map((p) => `${((p.temp - 30) / 70) * 400},${200 - (p.speed * 2)}`).join(' ')} 400,200`}
                    fill="url(#curveGradient)"
                  />

                  {/* Fan Curve Line */}
                  <polyline
                    points={points.map((p) => `${((p.temp - 30) / 70) * 400},${200 - (p.speed * 2)}`).join(' ')}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="drop-shadow(0 0 6px rgba(245,158,11,0.5))"
                  />

                  {/* Draggable/Clickable Control Points */}
                  {points.map((p, idx) => {
                    const cx = ((p.temp - 30) / 70) * 400;
                    const cy = 200 - (p.speed * 2);
                    return (
                      <g key={idx}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r="7"
                          fill="#F59E0B"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          className="curve-handle"
                        />
                        <text
                          x={cx}
                          y={cy - 12}
                          fill="#F8FAFC"
                          fontSize="9"
                          fontFamily="JetBrains Mono"
                          textAnchor="middle"
                        >
                          {p.speed}%
                        </text>
                        <text
                          x={cx}
                          y={196}
                          fill="#94A3B8"
                          fontSize="8"
                          fontFamily="JetBrains Mono"
                          textAnchor="middle"
                        >
                          {p.temp}°C
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <div className="curve-hint">
                <span>Tip: Click on any segment to dynamically calibrate the PWM fan duty cycle.</span>
              </div>
            </div>
          ) : (
            <div className="acpi-register-panel">
              <div className="box-tag">ACPI SSDT & EMBEDDED CONTROLLER (EC) DISPATCH LOG</div>
              <div className="code-terminal mono-font">
                <div className="term-line"><span className="term-cyan">[ACPI::SSDT]</span> Hooked _SB.PCI0.LPCB.EC0._Q80 (Acer Thermal Notification)</div>
                <div className="term-line"><span className="term-emerald">[WMI::DISPATCH]</span> Method \_SB.WMID.SETF called with FanIndex=0, Duty={points[2]?.speed}%</div>
                <div className="term-line"><span className="term-cyan">[EC::REGISTER]</span> 0xB2 (FAN1_PWM_REG) &larr; 0x{Math.round(points[2]?.speed * 2.55).toString(16).toUpperCase()}</div>
                <div className="term-line"><span className="term-cyan">[EC::REGISTER]</span> 0xB3 (FAN2_PWM_REG) &larr; 0x{Math.round(points[3]?.speed * 2.55).toString(16).toUpperCase()}</div>
                <div className="term-line"><span className="term-amber">[NVAPI::BOOST]</span> NVIDIA Dynamic Boost v2: Target TGP = {profile.tgp}W [ENGAGED]</div>
                <div className="term-line"><span className="term-emerald">[CPU::LIMIT]</span> Intel RAPL MSR 0x610 (PL1={profile.pl1}W, PL2={profile.pl2}W, Tau=28s)</div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Telemetry HUD Gauges */}
        <div className="preysense-hud-panel">
          <div className="hud-metric-row">
            <div className="hud-metric-card">
              <div className="metric-header">
                <Flame size={14} className="text-amber" />
                <span className="metric-title">FAN TACHOMETER</span>
              </div>
              <div className="metric-val-large mono-font text-amber">
                {profile.rpm} <span className="metric-unit">RPM</span>
              </div>
              <div className="metric-sub mono-font">Left: {profile.rpm} · Right: {profile.rpm + 250}</div>
            </div>

            <div className="hud-metric-card">
              <div className="metric-header">
                <Cpu size={14} className="text-cyan" />
                <span className="metric-title">CPU PACKAGE POWER</span>
              </div>
              <div className="metric-val-large mono-font text-cyan">
                {profile.pl1} / {profile.pl2} <span className="metric-unit">W</span>
              </div>
              <div className="metric-sub mono-font">PL1 Sustained · PL2 Peak</div>
            </div>
          </div>

          <div className="hud-metric-row">
            <div className="hud-metric-card">
              <div className="metric-header">
                <Activity size={14} className="text-emerald" />
                <span className="metric-title">GPU TGP LIMIT</span>
              </div>
              <div className="metric-val-large mono-font text-emerald">
                {profile.tgp} <span className="metric-unit">W</span>
              </div>
              <div className="metric-sub mono-font">NVAPI Dynamic Boost</div>
            </div>

            <div className="hud-metric-card">
              <div className="metric-header">
                <ShieldAlert size={14} className="text-blue" />
                <span className="metric-title">HOTPATCH STATUS</span>
              </div>
              <div className="metric-val-large mono-font text-blue">
                ACTIVE
              </div>
              <div className="metric-sub mono-font">OpenCore DSDT Override</div>
            </div>
          </div>

          {/* Key Engineering Accomplishments */}
          <div className="reverse-eng-features">
            <div className="box-tag">REVERSE ENGINEERING HIGHLIGHTS</div>
            <ul className="mini-bullet-list">
              <li>Disassembled proprietary AcerService packets via Wireshark and memory dumps.</li>
              <li>Engineered custom C# WMI client eliminating heavy Acer bloatware services.</li>
              <li>Achieved sub-millisecond hardware telemetry polling via direct NVAPI/NVML calls.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
