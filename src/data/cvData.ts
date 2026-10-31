export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  doi?: string;
  doiUrl?: string;
  status: 'published' | 'accepted' | 'under-review';
  statusLabel: string;
  highlightMetrics?: string[];
  summary: string;
  bibtex: string;
}

export interface Project {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  period: string;
  stars?: number;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  bulletPoints: string[];
  metrics: { label: string; value: string }[];
  category: 'systems' | 'ai' | 'fullstack';
}

export interface ResearchExperience {
  id: string;
  role: string;
  organization: string;
  location: string;
  advisor?: string;
  period: string;
  topics: {
    title: string;
    bulletPoints: string[];
  }[];
}

export interface HonorAward {
  id: string;
  title: string;
  organization: string;
  year: string;
  link?: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const CV_DATA = {
  personal: {
    name: "Hammad Ahmed",
    title: "Undergraduate CS Researcher & Systems Engineer",
    institution: "University of Southern Mississippi",
    location: "Hattiesburg, MS",
    degree: "B.S. in Computer Science | Minor in Economic Data Analysis",
    expectedGraduation: "Expected May 2027",
    gpa: "4.00 / 4.00",
    honors: "President's List (2024–2026), Full Tuition Academic Excellence Scholar",
    email: "hammad.ahmed@usm.edu",
    phone: "(601) 210-9855",
    github: "https://github.com/hammadzaigham",
    githubHandle: "hammadzaigham",
    summary: "Computer Science researcher and systems programmer focused on Embodied AI (Vision-Language Navigation), Firmware Reverse Engineering (ACPI/EC/WMI), and Cyber-Physical Roadway Infrastructure. First author / co-author of peer-reviewed papers in Information (MDPI) and Springer LNNS.",
  },

  researchInterests: [
    {
      area: "AI & Machine Learning",
      topics: ["Computer Vision", "Vision–Language Navigation (VLN)", "Embodied AI", "Relational Graph Reasoning"]
    },
    {
      area: "Cybersecurity & Systems",
      topics: ["Applied Cryptography", "Authentication Protocols", "Firmware Reverse Engineering", "Cyber–Physical Systems"]
    },
    {
      area: "Intelligent Infrastructure",
      topics: ["EV Charging Security", "Smart Grids", "Intelligent Transportation Systems (ITS)"]
    }
  ],

  stats: [
    { label: "Cumulative GPA", value: "4.00", sub: "Out of 4.00" },
    { label: "R2R VLN Success Rate", value: "80.28%", sub: "+2.46% over GOAT" },
    { label: "R2R SPL Navigation Metric", value: "76.41%", sub: "+8.28% over GOAT" },
    { label: "PreySense GitHub Stars", value: "70+", sub: "Open-source C#/.NET 10" },
    { label: "Road Detections Evaluated", value: "19,784", sub: "Dashcam Frames (AWS EC2)" },
  ],

  publications: [
    {
      id: "dygrav-2026",
      title: "DyGRAV: Dynamic Grounding and Relational Reasoning for Vision–Language Navigation",
      authors: [
        "Zain Chaudhary",
        "Zohaib Chaudhary",
        "Hammad Ahmed",
        "Prabin Bajgai",
        "Rabab Abdelfattah",
        "Ahmed Sherif"
      ],
      venue: "Information, 17(10), 1030, 2026",
      year: 2026,
      doi: "10.3390/info17101030",
      doiUrl: "https://doi.org/10.3390/info17101030",
      status: "published",
      statusLabel: "Peer-Reviewed Journal · MDPI",
      highlightMetrics: ["80.28% Success Rate (R2R unseen)", "76.41% SPL (+8.28% over baseline)", "97.33% Compute Budget Compliance"],
      summary: "Introduced dynamic grounding and relational reasoning over topological navigation graphs to resolve ambiguous language instructions during indoor embodied navigation. Outperformed published baselines on Room-to-Room val_unseen while guaranteeing strict episode compute constraints.",
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
      id: "ev-charging-2026",
      title: "Novel Classification of Authentication Schemes in Electric Vehicle Charging",
      authors: [
        "Zohaib Chaudhary",
        "Hammad Ahmed",
        "Munteeq Manzoor",
        "Malik Hasaan Ahmad",
        "Ahmed Sherif",
        "Mohamed Elsersy",
        "Rabab Abdelfattah"
      ],
      venue: "International Conference on Intelligent Systems, Blockchain, and Communication Technologies (ISBCom 2026)",
      year: 2026,
      status: "accepted",
      statusLabel: "Accepted · Springer LNNS",
      highlightMetrics: ["4×4 Taxonomy Matrix", "53 EV Charging Studies Surveyed", "Post-Quantum Readiness Analysis"],
      summary: "Developed a comprehensive taxonomy classifying 53 state-of-the-art authentication protocols across communication interfaces and cryptographic primitives. Identified systemic vulnerabilities in relay mitigation, credential revocation, and quantum resistance.",
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

  projects: [
    {
      id: "roadwatch",
      name: "RoadWatch",
      subtitle: "Mississippi AI Innovation Hub · Roadway Inspection Pipeline & Triage",
      role: "Backend & UI Lead",
      period: "Sep 2026 – Present",
      liveUrl: "https://3-141-198-95.sslip.io/",
      tags: ["YOLOv8s", "SegFormer-B0 ONNX", "FastAPI", "React/TypeScript", "Leaflet", "AWS EC2", "Nginx"],
      metrics: [
        { label: "Dataset Scale", value: "5,700+ images / 9,600+ annots" },
        { label: "Frames Evaluated", value: "19,784 Dashcam Frames" },
        { label: "Off-Road Filtered", value: "162 False Detections Filtered" },
        { label: "Verified Hazards", value: "18 High-Severity Flagged" },
      ],
      bulletPoints: [
        "Engineered an automated AI roadway-inspection pipeline using fine-tuned YOLOv8s pothole/crack detection and INT8 SegFormer-B0 (ONNX) road segmentation.",
        "Architected a three-way accept/review/reject gating engine using road-mask IoU overlap and camera perspective geometry, safely routing edge-case detections to human inspection.",
        "Built 3-second temporal deduplication and confidence-weighted keyframe scoring, filtering 162 off-road false alarms across 19,784 evaluated dashcam frames.",
        "Designed and deployed a full-stack GPS-linked human triage dashboard (FastAPI, SQLite, React/TypeScript, Leaflet) hosted on AWS EC2 with reverse proxy and HTTPS."
      ],
      category: "ai"
    },
    {
      id: "preysense",
      name: "PreySense",
      subtitle: "Acer Gaming Laptop Firmware Reverse Engineering & Control Suite",
      role: "Creator & Lead Developer",
      period: "2026 – Present",
      stars: 70,
      githubUrl: "https://github.com/hammadzaigham/PreySense",
      tags: ["C#", "WPF", ".NET 10", "ACPI / SSDT", "WMI", "Embedded Controllers", "NVAPI/NVML", "OpenCore"],
      metrics: [
        { label: "Community", value: "70+ GitHub Stars" },
        { label: "Stack", value: "C# / .NET 10 / WPF" },
        { label: "Hardware Interop", value: "Direct EC / WMI / NVAPI" },
        { label: "Platform", value: "Windows 11 / ACPI" },
      ],
      bulletPoints: [
        "Reverse-engineered proprietary, undocumented Acer firmware controls through DSDT/SSDT ACPI disassembly, WMI dispatch tracing, embedded-controller (EC) interfaces, and AcerService packet inspection.",
        "Created OpenCore ACPI hotpatches and C# bindings to adjust per-profile CPU PL1/PL2 power thresholds and NVIDIA Dynamic Boost TGP states.",
        "Implemented direct WMI/EC and HID hardware drivers for custom fan curves, RGB matrix animations, GPU MUX switching, and sub-millisecond telemetry graphing.",
        "Engineered a polished Windows utility featuring automatic game-triggered power profiles, battery charging thresholds, and in-game CPU/GPU telemetry overlays."
      ],
      category: "systems"
    }
  ] as Project[],

  researchExperience: [
    {
      id: "spen-lab",
      role: "Undergraduate Research Assistant",
      organization: "SPEN Lab, University of Southern Mississippi",
      location: "Hattiesburg, MS",
      advisor: "Dr. Ahmed Sherif",
      period: "Oct 2024 – Present",
      topics: [
        {
          title: "DyGRAV: Dynamic Grounding and Relational Reasoning for Vision–Language Navigation",
          bulletPoints: [
            "Adapted and debugged VLN training/evaluation code; executed Room-to-Room (R2R) training cycles, topological graph reasoning, ablation studies, and hyperparameter tuning.",
            "Compiled and benchmarked published VLN baselines, analyzed experimental logs, and generated camera-ready manuscript figures, trajectory plots, and comparative ablation tables.",
            "Co-authored peer-reviewed publication achieving 80.28% success rate and 76.41% SPL on R2R val_unseen (+2.46 / +8.28 percentage points over GOAT), with 97.33% episode compute-budget compliance."
          ]
        },
        {
          title: "Electric Vehicle Charging Authentication and Security",
          bulletPoints: [
            "Co-designing an RSU-assisted authentication protocol for dynamic wireless EV charging, leveraging pre-authorization and short-lived pad keys for ultra-low latency verification under compromised-pad threats.",
            "Co-developed a two-step 4×4 taxonomy classifying 53 state-of-the-art EV charging studies across communication media and cryptographic schemes; synthesized comparative security matrices."
          ]
        }
      ]
    },
    {
      id: "ur2phd",
      role: "Research Fellow",
      organization: "CRA Undergraduate Research to PhD (UR2PhD) Program",
      location: "National / Remote",
      period: "Summer 2026",
      topics: [
        {
          title: "Rigorous Research Methods & Proposal Defense",
          bulletPoints: [
            "Completed selective research-methods fellowship guided by senior computing faculty.",
            "Co-developed and defended a research proposal on low-latency authentication protocols for dynamic in-motion wireless electric vehicle charging."
          ]
        }
      ]
    }
  ] as ResearchExperience[],

  honors: [
    {
      id: "innovation-bowl",
      title: "Radiance Technologies Innovation Bowl — Joint Runner-Up",
      organization: "Radiance Technologies / Independence Bowl",
      year: "2025–26",
      link: "https://www.radiancetechnologiesindependencebowl.com/radiance-technologies-announces-winner-of-2025-26-innovation-bowl/",
      description: "Represented Team USM. Co-developed 'Neuro-Symbolic Validation of LLM Output via Multi-Agent Planning'. Built automated citation-verification logic within a three-validator PDDL-planned pipeline; team evaluation correctly flagged 11 hallucinations across 97 complex claims."
    },
    {
      id: "idcc",
      title: "Innovative Design for Computing Competition (IDCC) — 2nd Place",
      organization: "NASA – Mississippi Space Grant Consortium",
      year: "2026",
      description: "Co-authored an award-winning study analyzing artificial intelligence capabilities, autonomous agent behavior, and global security implications."
    },
    {
      id: "scholarship",
      title: "USM Academic Excellence Scholarship (Full Tuition)",
      organization: "University of Southern Mississippi",
      year: "2024 – Present",
      description: "Four-year full-tuition merit scholarship awarded for academic achievement, 4.00 GPA maintenance, and research leadership."
    }
  ] as HonorAward[],

  workExperience: [
    {
      id: "bitstorm",
      role: "Full Stack Developer",
      company: "BitStorm Solutions",
      location: "Gujranwala, Pakistan",
      period: "May 2023 – Dec 2023",
      bulletPoints: [
        "Developed cross-platform mobile applications using React Native and MongoDB-backed microservices.",
        "Engineered RESTful APIs, optimized query indexing, and enhanced UI responsiveness."
      ]
    }
  ],

  leadership: [
    {
      role: "Student Advisor",
      organization: "International Student Advisory Board, USM",
      period: "Aug 2025 – Present",
      description: "Advise university leadership on academic policies, visa guidance, and international student integration."
    },
    {
      role: "International Student Mentor",
      organization: "University of Southern Mississippi",
      period: "Winter 2024; Summer 2025",
      description: "Mentored incoming international computing students through academic transitions, course scheduling, and research lab onboarding."
    }
  ],

  education: {
    institution: "University of Southern Mississippi",
    location: "Hattiesburg, MS",
    degree: "B.S. in Computer Science",
    minor: "Minor in Economic Data Analysis",
    period: "Expected May 2027",
    gpa: "4.00 / 4.00",
    presidentsList: "2024–2026 (All Semesters)",
    coursework: [
      "Artificial Intelligence",
      "Algorithms",
      "Linear Algebra",
      "Probability & Statistics",
      "Operating Systems",
      "Computer Networks",
      "Secure Software Development"
    ]
  },

  skills: [
    {
      category: "Programming Languages",
      skills: ["Python", "C", "C++", "C# (.NET 10)", "Java", "JavaScript / TypeScript", "SQL", "LaTeX"]
    },
    {
      category: "AI & Machine Learning",
      skills: ["PyTorch", "CUDA", "Vision-Language Navigation (VLN)", "CLIP", "Hugging Face", "YOLOv8s", "SegFormer (ONNX)", "OpenCV", "Model Ablation & Evaluation"]
    },
    {
      category: "Systems & Security",
      skills: ["ACPI / SSDT Hotpatching", "WMI Dispatch", "Embedded Controllers (EC)", "HID Protocol", "NVAPI / NVML Telemetry", "Authentication Protocols", "Threat Modeling", "Reverse Engineering"]
    },
    {
      category: "Engineering & Cloud",
      skills: ["FastAPI", "React 19", "WPF / XAML", "SQLite", "Leaflet Maps", "AWS EC2", "Docker", "Git", "Nginx", "Linux / Bash"]
    }
  ] as SkillCategory[]
};
