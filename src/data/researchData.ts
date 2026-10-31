export interface Publication {
  id: string;
  title: string;
  authors: { name: string; isCandidate: boolean }[];
  venue: string;
  year: number;
  doi?: string;
  doiUrl?: string;
  status: 'published' | 'accepted' | 'under-review';
  statusBadge: string;
  pillar: 'reasoning' | 'trustworthy' | 'perception';
  summary: string;
  keyContributions: string[];
  metrics: { label: string; value: string }[];
  bibtex: string;
  pdfUrl?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  pillar: 'perception' | 'reasoning' | 'trustworthy';
  pillarLabel: string;
  summary: string;
  verifiedMetrics: { label: string; value: string }[];
  technicalHighlights: string[];
  artifacts: { label: string; url?: string; type: 'code' | 'paper' | 'demo' | 'award' }[];
  githubUrl?: string;
  liveUrl?: string;
}

export const RESEARCH_DATA = {
  candidate: {
    name: "Hammad Ahmed",
    title: "Undergraduate Computer Science Researcher & Systems Engineer",
    institution: "University of Southern Mississippi (USM)",
    department: "School of Computing Sciences and Computer Engineering",
    location: "Hattiesburg, MS",
    degree: "B.S. in Computer Science | Minor in Economic Data Analysis",
    expectedGraduation: "Expected May 2027",
    gpa: "4.00 / 4.00",
    honors: "President's List (2024–2026), Full-Tuition Academic Excellence Scholarship",
    email: "hammad.ahmed@usm.edu",
    phone: "(601) 210-9855",
    github: "https://github.com/hammadzaigham",
    githubHandle: "hammadzaigham",
    researchInterests: [
      {
        area: "Perception & Vision",
        desc: "Edge-efficient roadway hazard detection (YOLOv8s), real-time drivable segmentation (SegFormer INT8), and perspective-gated spatial triage."
      },
      {
        area: "Embodied AI & Relational Reasoning",
        desc: "Vision-Language Navigation (VLN), dynamic grounding over topological navigation graphs, and compute-constrained agent policy search."
      },
      {
        area: "Trustworthy Systems & Low-Level Security",
        desc: "Low-latency vehicular authentication protocols for dynamic EV charging (4x4 taxonomy), ACPI/SSDT firmware reverse engineering (PreySense), and hardware bounds."
      }
    ],
    missionStatement: "Investigating how embodied and physical-world AI agents can perceive unstructured environments, reason dynamically over relational knowledge graphs, and execute reliably under strict latency, safety, and hardware limits."
  },

  publications: [
    {
      id: "dygrav-2026",
      title: "DyGRAV: Dynamic Grounding and Relational Reasoning for Vision–Language Navigation",
      authors: [
        { name: "Zain Chaudhary", isCandidate: false },
        { name: "Zohaib Chaudhary", isCandidate: false },
        { name: "Hammad Ahmed", isCandidate: true },
        { name: "Prabin Bajgai", isCandidate: false },
        { name: "Rabab Abdelfattah", isCandidate: false },
        { name: "Ahmed Sherif", isCandidate: false }
      ],
      venue: "Information, 17(10), 1030, 2026",
      year: 2026,
      doi: "10.3390/info17101030",
      doiUrl: "https://doi.org/10.3390/info17101030",
      status: "published",
      statusBadge: "Peer-Reviewed Journal · MDPI",
      pillar: "reasoning",
      summary: "Introduced dynamic grounding and relational reasoning over topological navigation graphs to resolve linguistic ambiguity during embodied navigation in unseen physical environments.",
      keyContributions: [
        "Adapted and benchmarked VLN training on Room-to-Room (R2R) dataset across unseen indoor environments.",
        "Synthesized comparative baseline ablations and generated camera-ready trajectory figures and performance plots.",
        "Demonstrated 80.28% success rate (SR) and 76.41% SPL on R2R val_unseen (+2.46 / +8.28 percentage points over GOAT baseline).",
        "Enforced strict 97.33% episode-level compute-budget compliance for real-time robotic deployment."
      ],
      metrics: [
        { label: "R2R Val_Unseen SR", value: "80.28%" },
        { label: "R2R SPL Metric", value: "76.41%" },
        { label: "Gain over GOAT", value: "+8.28% SPL" },
        { label: "Budget Compliance", value: "97.33%" }
      ],
      bibtex: `@article{chaudhary2026dygrav,
  title={DyGRAV: Dynamic Grounding and Relational Reasoning for Vision--Language Navigation},
  author={Chaudhary, Zain and Chaudhary, Zohaib and Ahmed, Hammad and Bajgai, Prabin and Abdelfattah, Rabab and Sherif, Ahmed},
  journal={Information},
  volume={17},
  number={10},
  pages={1030},
  year={2026},
  publisher={MDPI},
  doi={10.3390/info17101030}
}`
    },
    {
      id: "ev-auth-2026",
      title: "Novel Classification of Authentication Schemes in Electric Vehicle Charging",
      authors: [
        { name: "Zohaib Chaudhary", isCandidate: false },
        { name: "Hammad Ahmed", isCandidate: true },
        { name: "Munteeq Manzoor", isCandidate: false },
        { name: "Malik Hasaan Ahmad", isCandidate: false },
        { name: "Ahmed Sherif", isCandidate: false },
        { name: "Mohamed Elsersy", isCandidate: false },
        { name: "Rabab Abdelfattah", isCandidate: false }
      ],
      venue: "International Conference on Intelligent Systems, Blockchain, and Communication Technologies (ISBCom 2026)",
      year: 2026,
      status: "accepted",
      statusBadge: "Accepted Conference · Springer LNNS",
      pillar: "trustworthy",
      summary: "Developed a two-step 4×4 classification taxonomy surveying 53 EV charging security protocols, evaluating authentication latency, cryptographic primitives, and post-quantum readiness.",
      keyContributions: [
        "Synthesized 53 peer-reviewed EV charging authentication studies across physical, network, and application layers.",
        "Formulated a 4×4 taxonomy mapping communication interfaces against cryptographic techniques.",
        "Identified critical systemic vulnerabilities: lack of relay attack mitigation, absent credential revocation protocols, and lack of post-quantum cryptographic primitives.",
        "Serves as the foundation for our ongoing RSU-assisted dynamic wireless EV charging protocol (DWC-FastAuth)."
      ],
      metrics: [
        { label: "Taxonomy Matrix", value: "4×4 Dual-Step" },
        { label: "Studies Synthesized", value: "53 Protocols" },
        { label: "Key Focus", value: "Post-Quantum EV Security" }
      ],
      bibtex: `@inproceedings{chaudhary2026novel,
  title={Novel Classification of Authentication Schemes in Electric Vehicle Charging},
  author={Chaudhary, Zohaib and Ahmed, Hammad and Manzoor, Munteeq and Ahmad, Malik Hasaan and Sherif, Ahmed and Elsersy, Mohamed and Abdelfattah, Rabab},
  booktitle={International Conference on Intelligent Systems, Blockchain, and Communication Technologies (ISBCom 2026)},
  year={2026},
  publisher={Springer},
  series={Lecture Notes in Networks and Systems}
}`
    }
  ] as Publication[],

  caseStudies: [
    {
      id: "roadwatch",
      title: "RoadWatch: Real-Time AI Roadway Hazard Triage Pipeline",
      subtitle: "Mississippi AI Innovation Hub · Edge AI & Municipal Road Infrastructure",
      role: "Backend & UI Lead",
      period: "Sep 2026 – Present",
      pillar: "perception",
      pillarLabel: "Perception & Spatial Geometry",
      summary: "Engineered an end-to-end edge AI pipeline combining fine-tuned YOLOv8s pothole/crack detection with INT8 SegFormer-B0 road segmentation and camera perspective gating, deployed as a municipal triage platform on AWS EC2.",
      verifiedMetrics: [
        { label: "Dataset Scale", value: "5,700+ images / 9,600+ annots" },
        { label: "Frames Evaluated", value: "19,784 Dashcam Frames" },
        { label: "Off-Road Filtered", value: "162 False Detections" },
        { label: "Verified Hazards", value: "18 High-Severity Flagged" },
        { label: "Inference Latency", value: "32.4 FPS (INT8 ONNX)" }
      ],
      technicalHighlights: [
        "Fine-tuned YOLOv8s on 5,700+ roadway defect images with 9,600+ bounding-box annotations across potholes and longitudinal/transverse pavement cracks.",
        "Engineered three-way accept/review/reject gating: intersects detection bounding boxes with real-time SegFormer-B0 road segmentation masks to discard non-drivable objects (sidewalks, curbs, sky) and safely queue ambiguous boundary detections for human inspection.",
        "Built 3-second temporal deduplication and confidence-weighted keyframe scoring to prevent redundant road-defect notifications across consecutive dashcam frames.",
        "Deployed a production full-stack human-review dashboard (FastAPI, SQLite, React/TypeScript, Leaflet GIS overlays) hosted on AWS EC2 behind an Nginx reverse proxy with HTTPS."
      ],
      artifacts: [
        { label: "Live Deployment (AWS EC2)", url: "https://3-141-198-95.sslip.io/", type: "demo" }
      ],
      liveUrl: "https://3-141-198-95.sslip.io/"
    },
    {
      id: "dygrav",
      title: "DyGRAV: Dynamic Grounding for Vision–Language Navigation",
      subtitle: "SPEN Lab, USM · Published in MDPI Information (Vol 17, Iss 10)",
      role: "Co-Author & Research Assistant",
      period: "Oct 2024 – Present",
      pillar: "reasoning",
      pillarLabel: "Embodied AI & Relational Reasoning",
      summary: "Investigated dynamic linguistic grounding and relational attention over topological indoor navigation graphs, achieving state-of-the-art success rate and path efficiency under hard compute budget constraints.",
      verifiedMetrics: [
        { label: "Success Rate (SR)", value: "80.28% (R2R Unseen)" },
        { label: "SPL Efficiency", value: "76.41% (+8.28% over GOAT)" },
        { label: "Compute Compliance", value: "97.33% Episode-Level" },
        { label: "Journal Status", value: "Published (MDPI Information 2026)" }
      ],
      technicalHighlights: [
        "Adapted and debugged PyTorch VLN training code on the Room-to-Room (R2R) benchmark across unseen building topologies.",
        "Executed extensive hyperparameter ablation studies to quantify how dynamic object attention shifts across landmark tokens during multi-room trajectory progression.",
        "Demonstrated that relational grounding substantially reduces agent disorientation in ambiguous architectural layouts while bounding per-step forward passes within a 97.33% compute compliance limit.",
        "Co-authored camera-ready manuscript, authored experimental validation sections, and generated comparative baseline visual diagrams."
      ],
      artifacts: [
        { label: "Published Paper (DOI: 10.3390/info17101030)", url: "https://doi.org/10.3390/info17101030", type: "paper" }
      ]
    },
    {
      id: "preysense",
      title: "PreySense: Acer Laptop Firmware Reverse Engineering Suite",
      subtitle: "Independent Systems Research · Open-Source C# / .NET 10 / WPF (70+ Stars)",
      role: "Creator & Lead Developer",
      period: "2026 – Present",
      pillar: "trustworthy",
      pillarLabel: "Firmware Reverse Engineering & ACPI",
      summary: "Reverse-engineered proprietary, undocumented Acer firmware controls through DSDT/SSDT ACPI disassembly, WMI dispatch paths, and embedded controller (EC) direct register manipulation, creating a bloat-free system control utility with 70+ GitHub stars.",
      verifiedMetrics: [
        { label: "Community", value: "70+ GitHub Stars" },
        { label: "Runtime", value: "C# / WPF (.NET 10)" },
        { label: "Sub-ms Telemetry", value: "Direct NVAPI / NVML" },
        { label: "Firmware Hooks", value: "ACPI SSDT & EC Registers" }
      ],
      technicalHighlights: [
        "Disassembled undocumented Acer ACPI DSDT/SSDT tables using ACPICA tools; traced WMI dispatch methods (`\_SB.WMID`) and Embedded Controller (EC) memory-mapped registers (`0xB2`, `0xB3`).",
        "Engineered custom OpenCore ACPI hotpatches to override Intel RAPL PL1/PL2 power limits and trigger NVIDIA Dynamic Boost TGP state overrides at the firmware layer.",
        "Implemented direct C# WMI and HID driver interop for per-profile fan curves, RGB lighting animation matrix control, GPU MUX switching, and sub-millisecond hardware telemetry polling via NVAPI/NVML.",
        "Packaged into a modular, production-grade Windows 11 utility with zero manufacturer background services, game-triggered automated profile switching, and live HUD overlays."
      ],
      artifacts: [
        { label: "GitHub Repository (70+ Stars)", url: "https://github.com/hammadzaigham/PreySense", type: "code" }
      ],
      githubUrl: "https://github.com/hammadzaigham/PreySense"
    },
    {
      id: "dwc-fastauth",
      title: "DWC-FastAuth: Dynamic Wireless EV Charging Authentication",
      subtitle: "SPEN Lab & CRA UR2PhD Fellowship · Ongoing Research & Proposed Protocol",
      role: "Undergraduate Co-Investigator",
      period: "Summer 2026 – Present",
      pillar: "trustworthy",
      pillarLabel: "Applied Cryptography & ITS Security",
      summary: "Co-designing an RSU-assisted ultra-low-latency authentication protocol for in-motion dynamic wireless EV charging, using pre-authorization and short-lived pad keys to resist relay and compromised charging-pad threats.",
      verifiedMetrics: [
        { label: "Survey Scale", value: "53 Protocols Categorized" },
        { label: "Taxonomy", value: "4×4 Cross-Layer Matrix" },
        { label: "Target Constraint", value: "<15ms Handover Verification" }
      ],
      technicalHighlights: [
        "Synthesized the 53-paper authentication taxonomy published in ISBCom 2026 (Springer LNNS) identifying severe latency bottlenecks and lack of relay attack mitigation in existing EV charging standards.",
        "Co-developed the DWC-FastAuth architecture: an Roadside Unit (RSU)-assisted authentication scheme generating short-lived cryptographic pad tokens prior to vehicular alignment over magnetic charging pads.",
        "Addressed compromised-pad attack models: ensures a compromised physical coil pad cannot impersonate the grid operator or intercept billing credentials.",
        "Completed mentored research methodology defense through the competitive CRA Undergraduate Research to PhD (UR2PhD) fellowship in Summer 2026."
      ],
      artifacts: [
        { label: "Accepted Conference Paper (Springer LNNS)", type: "paper" }
      ]
    }
  ] as CaseStudy[],

  researchExperience: [
    {
      organization: "SPEN Lab, University of Southern Mississippi",
      location: "Hattiesburg, MS",
      role: "Undergraduate Research Assistant",
      advisor: "Dr. Ahmed Sherif",
      period: "Oct 2024 – Present",
      topics: [
        {
          title: "DyGRAV: Dynamic Grounding and Relational Reasoning for Vision–Language Navigation",
          bullets: [
            "Adapted and debugged VLN training/evaluation code; conducted Room-to-Room (R2R) training cycles, topological reasoning, ablation studies, and hyperparameter tuning.",
            "Compiled and benchmarked published baselines, analyzed experimental logs, and generated camera-ready manuscript figures, trajectory plots, and comparative ablation tables.",
            "Co-authored peer-reviewed paper in Information reporting 80.28% success rate and 76.41% SPL on R2R val_unseen (+2.46/+8.28 percentage points over GOAT baseline) with 97.33% compute-budget compliance."
          ]
        },
        {
          title: "Electric Vehicle Charging Authentication and Security (DWC-FastAuth)",
          bullets: [
            "Co-designing an RSU-assisted authentication protocol for dynamic wireless EV charging, leveraging pre-authorization and short-lived pad keys for ultra-low latency verification under compromised-pad threats.",
            "Co-developed a two-step 4×4 taxonomy classifying 53 state-of-the-art EV charging studies across communication media and cryptographic schemes; synthesized comparative security matrices."
          ]
        }
      ]
    },
    {
      organization: "CRA Undergraduate Research to PhD (UR2PhD) Program",
      location: "National / Remote",
      role: "Research Fellow",
      period: "Summer 2026",
      topics: [
        {
          title: "Rigorous Research Methods & Proposal Defense",
          bullets: [
            "Completed competitive, mentored research-methods fellowship guided by senior computing faculty.",
            "Co-developed and defended a research proposal on low-latency authentication for dynamic wireless electric vehicle charging."
          ]
        }
      ]
    },
    {
      organization: "BitStorm Solutions",
      location: "Gujranwala, Pakistan",
      role: "Full Stack Developer",
      period: "May 2023 – Dec 2023",
      topics: [
        {
          title: "Cross-Platform Application & API Engineering",
          bullets: [
            "Developed React Native mobile applications and MongoDB-backed microservices.",
            "Implemented RESTful endpoints, optimized query execution plans, and improved UI responsiveness."
          ]
        }
      ]
    }
  ],

  honors: [
    {
      title: "Radiance Technologies Innovation Bowl — Joint Runner-Up",
      issuer: "Radiance Technologies / Independence Bowl",
      year: "2025–26",
      link: "https://www.radiancetechnologiesindependencebowl.com/radiance-technologies-announces-winner-of-2025-26-innovation-bowl/",
      description: "Represented Team USM. Co-developed 'Neuro-Symbolic Validation of LLM Output via Multi-Agent Planning'. Built citation-verification logic within a three-validator, PDDL-planned pipeline; team evaluation correctly flagged 11 hallucinations across 97 complex claims."
    },
    {
      title: "Innovative Design for Computing Competition (IDCC) — 2nd Place",
      issuer: "NASA – Mississippi Space Grant Consortium",
      year: "2026",
      description: "Co-authored an award-winning study analyzing artificial intelligence capabilities, autonomous agent behavior, and global security implications."
    },
    {
      title: "USM Academic Excellence Scholarship (Full Tuition)",
      issuer: "University of Southern Mississippi",
      year: "2024 – Present",
      description: "Awarded four-year full-tuition academic merit scholarship; maintained 4.00/4.00 cumulative GPA and continuous President's List recognition."
    }
  ],

  leadership: [
    {
      role: "Student Advisor",
      organization: "International Student Advisory Board, USM",
      period: "Aug 2025 – Present",
      desc: "Advising university leadership on international scholar integration, academic policies, and immigration support."
    },
    {
      role: "International Student Mentor",
      organization: "University of Southern Mississippi",
      period: "Winter 2024; Summer 2025",
      desc: "Mentored incoming international computing students through academic transitions, course selection, and undergraduate research onboarding."
    }
  ],

  skillsTaxonomy: [
    {
      domain: "Languages & Core",
      skills: ["Python", "C", "C++", "C# (.NET 10)", "Java", "JavaScript / TypeScript", "SQL", "LaTeX"]
    },
    {
      domain: "AI & Machine Learning",
      skills: ["PyTorch", "CUDA", "Vision-Language Navigation (VLN)", "CLIP", "Hugging Face", "YOLOv8s", "SegFormer (INT8 ONNX)", "OpenCV", "Model Ablation & Evaluation"]
    },
    {
      domain: "Systems & Security",
      skills: ["ACPI / SSDT Hotpatching", "WMI Dispatch Paths", "Embedded Controllers (EC)", "HID Driver Interop", "NVAPI / NVML Telemetry", "Authentication Protocols", "Threat Modeling", "Firmware Disassembly"]
    },
    {
      domain: "Full-Stack & Cloud",
      skills: ["FastAPI", "React", "WPF / XAML", "SQLite", "Leaflet GIS", "AWS EC2", "Docker", "Git", "Nginx", "Linux / Bash"]
    }
  ]
};
