export interface Publication {
  id: string;
  title: string;
  authors: { name: string; isCandidate: boolean }[];
  venue: string;
  year: number;
  doiUrl?: string;
  status: 'published' | 'accepted';
  pillar: 'reasoning' | 'trustworthy';
  summary: string;
  bibtex: string;
}
export interface CaseStudy {
  id: string;
  title: string;
  role: string;
  period: string;
  pillar: 'perception' | 'reasoning' | 'trustworthy';
  summary: string;
  verifiedMetrics: { label: string; value: string }[];
  technicalHighlights: string[];
  artifacts: { label: string; url?: string; type: 'code' | 'paper' | 'demo' }[];
  githubUrl?: string;
  liveUrl?: string;
}
const authors = (names: string[]) => names.map(name => ({ name, isCandidate: name === 'Hammad Ahmed' }));

/** Academic facts follow CV.tex. Ongoing protocols are distinct from accepted papers. */
export const RESEARCH_DATA = {
  candidate: {
    name: 'Hammad Ahmed',
    institution: 'University of Southern Mississippi',
    location: 'Hattiesburg, MS',
    degree: 'B.S. in Computer Science | Minor in Economic Data Analysis',
    expectedGraduation: 'Expected May 2027',
    gpa: '4.00 / 4.00',
    email: 'hammad.a.zaigham@gmail.com',
    phone: '(601) 210-9855',
    github: 'https://github.com/hammadzaigham',
  },
  publications: [
    {
      id: 'dygrav-2026',
      title: 'DyGRAV: Dynamic Grounding and Relational Reasoning for Vision–Language Navigation',
      authors: authors(['Zain Chaudhary', 'Zohaib Chaudhary', 'Hammad Ahmed', 'Prabin Bajgai', 'Rabab Abdelfattah', 'Ahmed Sherif']),
      venue: 'Information, 17(10), 1030',
      year: 2026,
      doiUrl: 'https://doi.org/10.3390/info17101030',
      status: 'published',
      pillar: 'reasoning',
      summary: 'Dynamic grounding and relational reasoning for vision–language navigation. My contributions include adapting and debugging training and evaluation code, running R2R experiments and ablations, and preparing comparative results and manuscript figures.',
      bibtex: `@article{chaudhary2026dygrav,
  title = {DyGRAV: Dynamic Grounding and Relational Reasoning for Vision--Language Navigation},
  author = {Chaudhary, Zain and Chaudhary, Zohaib and Ahmed, Hammad and Bajgai, Prabin and Abdelfattah, Rabab and Sherif, Ahmed},
  journal = {Information},
  volume = {17},
  number = {10},
  pages = {1030},
  year = {2026},
  doi = {10.3390/info17101030}
}`
    },
    {
      id: 'ev-auth-2026',
      title: 'Novel Classification of Authentication Schemes in Electric Vehicle Charging',
      authors: authors(['Zohaib Chaudhary', 'Hammad Ahmed', 'Munteeq Manzoor', 'Malik Hasaan Ahmad', 'Ahmed Sherif', 'Mohamed Elsersy', 'Rabab Abdelfattah']),
      venue: 'International Conference on Intelligent Systems, Blockchain, and Communication Technologies (ISBCom)',
      year: 2026,
      status: 'accepted',
      pillar: 'trustworthy',
      summary: 'A classification of EV charging authentication by communication interface and cryptographic technique. I co-developed the taxonomy, synthesized comparative tables, and examined gaps in relay protection, credential revocation, and post-quantum readiness.',
      bibtex: `@inproceedings{chaudhary2026novel,
  title = {Novel Classification of Authentication Schemes in Electric Vehicle Charging},
  author = {Chaudhary, Zohaib and Ahmed, Hammad and Manzoor, Munteeq and Ahmad, Malik Hasaan and Sherif, Ahmed and Elsersy, Mohamed and Abdelfattah, Rabab},
  booktitle = {International Conference on Intelligent Systems, Blockchain, and Communication Technologies (ISBCom 2026)},
  year = {2026},
  note = {Accepted; proceedings forthcoming in Springer Lecture Notes in Networks and Systems}
}`
    }
  ] satisfies Publication[],
  caseStudies: [
    {
      id: 'roadwatch',
      title: 'RoadWatch: roadway hazard triage',
      role: 'Backend & UI Lead',
      period: 'Sep 2026 – Present',
      pillar: 'perception',
      summary: 'An AI roadway-inspection pipeline that combines pothole and crack detection with road segmentation. Uncertain detections go to human review; perspective geometry and temporal deduplication reduce off-road and repeated reports.',
      verifiedMetrics: [
        { label: 'Frames evaluated', value: '19,784' },
        { label: 'Off-road detections filtered', value: '162' },
        { label: 'Verified hazards', value: '18' }
      ],
      technicalHighlights: [
        'Fine-tuned YOLOv8s on 5,700+ training images with 9,600+ bounding-box annotations; combined detection with INT8 SegFormer-B0 road segmentation in ONNX.',
        'Designed accept/review/reject gating using road-mask overlap and perspective geometry, preserving uncertain detections for human review.',
        'Implemented 3-second temporal deduplication and confidence-weighted keyframes.',
        'Built a GPS-linked review dashboard with FastAPI, SQLite, React/TypeScript, and Leaflet; deployed on AWS EC2 with Nginx and HTTPS.'
      ],
      artifacts: [],
      liveUrl: 'https://3-141-198-95.sslip.io/'
    },
    {
      id: 'dygrav',
      title: 'DyGRAV: language-grounded navigation',
      role: 'Co-author & Research Assistant',
      period: 'Oct 2024 – Present',
      pillar: 'reasoning',
      summary: 'Research on connecting language instructions to visual landmarks and topological navigation graphs. I worked on training and evaluation, ablation studies, baseline comparisons, and the figures and tables used to communicate results.',
      verifiedMetrics: [
        { label: 'R2R val_unseen success', value: '80.28%' },
        { label: 'R2R val_unseen SPL', value: '76.41%' },
        { label: 'SPL gain over GOAT', value: '+8.28 pp' }
      ],
      technicalHighlights: [
        'Adapted and debugged vision–language navigation training and evaluation code; conducted R2R training, ablation studies, and hyperparameter tuning.',
        'Compiled published VLN baselines, analyzed experimental results, and developed manuscript figures and comparative tables.',
        'The co-authored paper reports 80.28% success rate and 76.41% SPL on R2R val_unseen: improvements of 2.46 and 8.28 percentage points over GOAT.',
        'Reported episode-level compute-budget compliance is 97.33%.'
      ],
      artifacts: [{ label: 'DyGRAV paper', url: 'https://doi.org/10.3390/info17101030', type: 'paper' }]
    },
    {
      id: 'preysense',
      title: 'PreySense: Acer hardware controls',
      role: 'Creator & Lead Developer',
      period: '2026 – Present',
      pillar: 'trustworthy',
      summary: 'An open-source Windows utility built by reverse-engineering undocumented Acer firmware interfaces. It brings performance profiles, fan control, lighting, graphics switching, and hardware telemetry into one modular application.',
      verifiedMetrics: [
        { label: 'Application', value: 'C# / WPF' },
        { label: 'Runtime', value: '.NET 10' },
        { label: 'Interfaces', value: 'ACPI / EC' }
      ],
      technicalHighlights: [
        'Analyzed DSDT/SSDT ACPI tables, WMI dispatch paths, embedded-controller interfaces, and AcerService packet protocols.',
        'Engineered OpenCore ACPI hotpatches and C# integration for per-profile CPU/GPU power and thermal limits.',
        'Implemented WMI/EC and HID communication, custom fan control and RGB effects, graphics switching, and NVAPI/NVML telemetry.',
        'Built game-triggered power profiles, battery and display controls, a live CPU/GPU and FPS overlay, and an integrated OpenCore installer.'
      ],
      artifacts: [],
      githubUrl: 'https://github.com/hammadzaigham/PreySense'
    },
    {
      id: 'dwc-fastauth',
      title: 'DWC-FastAuth: charging authentication',
      role: 'Undergraduate Co-investigator',
      period: 'Summer 2026 – Present',
      pillar: 'trustworthy',
      summary: 'Ongoing work on RSU-assisted authentication for dynamic wireless EV charging. The proposed design uses pre-authorization and short-lived pad keys to address authentication latency and compromised-pad threats.',
      verifiedMetrics: [
        { label: 'Research stage', value: 'Protocol design' },
        { label: 'Approach', value: 'RSU-assisted' },
        { label: 'Focus', value: 'Low latency' }
      ],
      technicalHighlights: [
        'Co-designing an authentication protocol for dynamic wireless charging, using roadside-unit assistance, pre-authorization, and short-lived pad keys.',
        'Investigating authentication latency and compromised-pad threats; this protocol remains ongoing research.',
        'Related survey work classifies 53 EV charging studies using a two-step 4 × 4 taxonomy. That survey is accepted at ISBCom 2026; proceedings are forthcoming in Springer LNNS.',
        'Co-developed and presented a proposal on low-latency charging authentication through CRA UR2PhD research-methods training.'
      ],
      artifacts: []
    }
  ] satisfies CaseStudy[],
  researchExperience: [
    {
      organization: 'SPEN Lab, University of Southern Mississippi',
      location: 'Hattiesburg, MS',
      role: 'Undergraduate Research Assistant',
      advisor: 'Dr. Ahmed Sherif',
      period: 'Oct 2024 – Present',
      topics: [
        { title: 'Vision–language navigation', bullets: ['Adapted training and evaluation code, ran R2R experiments and ablations, and compared published baselines for DyGRAV.', 'Analyzed results and developed manuscript figures, performance plots, and comparative tables.'] },
        { title: 'EV charging authentication & security', bullets: ['Co-designing an RSU-assisted protocol for dynamic wireless charging.', 'Co-developed a 4 × 4 taxonomy of 53 studies and examined security gaps in existing authentication approaches.'] }
      ]
    },
    {
      organization: 'CRA Undergraduate Research to PhD (UR2PhD)',
      location: 'Research-methods program',
      role: 'Program participant',
      period: 'Summer 2026',
      topics: [{ title: 'Research methods & proposal development', bullets: ['Completed mentored research-methods training; co-developed and presented a research proposal on low-latency authentication for dynamic wireless EV charging.'] }]
    },
    {
      organization: 'BitStorm Solutions',
      location: 'Gujranwala, Pakistan',
      role: 'Full Stack Developer',
      period: 'May 2023 – Dec 2023',
      topics: [{ title: 'Application & API development', bullets: ['Developed React Native applications and MongoDB-backed services; implemented APIs and optimized database queries.'] }]
    }
  ],
  honors: [
    {
      title: 'Radiance Technologies Innovation Bowl — Joint Runner-Up',
      issuer: 'Team USM · Radiance Technologies / Independence Bowl',
      year: '2025–26',
      link: 'https://www.radiancetechnologiesindependencebowl.com/radiance-technologies-announces-winner-of-2025-26-innovation-bowl/',
      description: 'Co-developed Neuro-Symbolic Validation of LLM Output via Multi-Agent Planning. Implemented citation verification in a three-validator, PDDL-planned pipeline; team evaluation flagged 11 potential hallucinations across 97 claims.'
    },
    {
      title: 'Innovative Design for Computing Competition — 2nd Place',
      issuer: 'NASA–Mississippi Space Grant Consortium',
      year: '2026',
      description: 'Co-authored a study on AI capabilities and global security implications.'
    },
    {
      title: 'Academic Excellence Scholarship — Full Tuition',
      issuer: 'University of Southern Mississippi',
      year: '2024 – Present',
      description: 'Full-tuition academic scholarship. Cumulative GPA: 4.00/4.00; President’s List, 2024–2026.'
    }
  ],
  leadership: [
    { role: 'Student Advisor', organization: 'International Student Advisory Board, USM', period: 'Aug 2025 – Present' },
    { role: 'International Student Mentor', organization: 'University of Southern Mississippi', period: 'Winter 2024; Summer 2025' }
  ],
  skillsTaxonomy: [
    { domain: 'Languages', skills: ['Python', 'C', 'C++', 'C#', 'Java', 'JavaScript/TypeScript', 'SQL'] },
    { domain: 'AI & research', skills: ['PyTorch', 'CUDA', 'Hugging Face', 'CLIP', 'OpenCV', 'Model evaluation'] },
    { domain: 'Systems & security', skills: ['ACPI/SSDT', 'WMI', 'Embedded controllers', 'HID', 'NVAPI/NVML', 'Authentication protocols', 'Threat modeling'] },
    { domain: 'Development', skills: ['FastAPI', 'React', 'WPF', 'SQLite', 'Docker', 'Git', 'Linux', 'LaTeX'] }
  ]
};
