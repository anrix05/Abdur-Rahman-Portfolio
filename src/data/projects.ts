export interface ProjectAssets {
  hero?: string;
  screens: string[];
  thumb?: string;
  video?: string;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  result: string;
}

export interface Project {
  slug: string;
  title: string;
  categoryLabel: string;
  kind: 'web' | 'mobile' | 'kiosk' | 'hardware';
  type: 'software' | 'hardware';
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  demo?: string;
  accentColor: string;
  featured: boolean;
  image?: string;
  assets: ProjectAssets;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: 'nexalink',
    title: 'NexaLink',
    categoryLabel: 'ALUMNI PLATFORM • WEB',
    kind: 'web',
    type: 'software',
    description: 'Centralized alumni data management and engagement platform for Vidyalankar Institute of Technology, built for Smart India Hackathon (SIH25017). Features verified mentorship matching, job and event workflows, real-time messaging, and Row Level Security.',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion'],
    demo: 'https://nexalink.anrix.me',
    github: 'https://github.com/anrix05/NexaLink',
    accentColor: '#10b981',
    featured: true,
    image: '/projects/nexalink/hero.webp',
    assets: {
      hero: '/projects/nexalink/hero.webp',
      screens: [
        '/projects/nexalink/screen-1.webp',
        '/projects/nexalink/screen-2.webp',
        '/projects/nexalink/screen-3.webp',
        '/projects/nexalink/screen-4.webp',
      ],
      thumb: '/projects/nexalink/thumb.webp',
      video: '/projects/nexalink/demo.mp4',
    },
    caseStudy: {
      problem: 'Alumni engagement was fragmented across unstructured WhatsApp channels and unverified spreadsheets, leaving students without accessible career mentorship.',
      solution: 'Engineered a centralized institutional portal with Supabase Row Level Security, verified student-alumni directories, automated mentorship scheduling, and real-time messaging.',
      result: 'Selected for Smart India Hackathon (SIH25017) with sub-100ms real-time messaging and robust data isolation for thousands of student and alumni records.',
    },
  },
  {
    slug: 'v-notice',
    title: 'V Notice',
    categoryLabel: 'DIGITAL SIGNAGE • KIOSK',
    kind: 'kiosk',
    type: 'software',
    description: 'Offline-first smart campus notice board that replaces paper bulletin boards with department-wise kiosk displays and an administrative control panel. Faculty publish updates in seconds with takeover mode and QR integration.',
    tags: ['Python', 'Flask', 'SQLite', 'Raspberry Pi', 'Service Workers'],
    demo: 'https://v-notice.onrender.com/display',
    github: 'https://github.com/anrix05/V-Notice',
    accentColor: '#d97706',
    featured: true,
    image: '/projects/v-notice/hero.webp',
    assets: {
      hero: '/projects/v-notice/hero.webp',
      screens: [
        '/projects/v-notice/screen-1.webp',
        '/projects/v-notice/screen-2.webp',
        '/projects/v-notice/screen-3.webp',
        '/projects/v-notice/screen-4.webp',
      ],
      thumb: '/projects/v-notice/thumb.webp',
      video: '/projects/v-notice/demo.mp4',
    },
    caseStudy: {
      problem: 'Physical college bulletin boards caused critical circular delays, missed academic deadlines, and required printed reams of paper for every daily announcement.',
      solution: 'Architected a dual-server system pairing a native 800x480 kiosk display with a desktop admin console, service worker client caching, and instant priority takeover mode.',
      result: 'Zero-downtime offline display fallback on Raspberry Pi hardware with multi-screen fleet management and immediate circular broadcasts.',
    },
  },
  {
    slug: 'attendai',
    title: 'AttendAI',
    categoryLabel: 'COMPUTER VISION • AI',
    kind: 'web',
    type: 'software',
    description: 'Institutional paper register computer vision digitization platform. Converts smartphone photos of handwritten student attendance sheets into cumulative Excel master records using Gemini multimodal vision models.',
    tags: ['Python', 'FastAPI', 'Streamlit', 'OpenCV', 'Gemini AI', 'OpenPyXL'],
    github: 'https://github.com/anrix05/AttendaAi',
    accentColor: '#3b4cd3',
    featured: true,
    image: '/projects/attendai/hero.webp',
    assets: {
      hero: '/projects/attendai/hero.webp',
      screens: [
        '/projects/attendai/screen-1.webp',
        '/projects/attendai/screen-2.webp',
        '/projects/attendai/screen-3.webp',
        '/projects/attendai/screen-4.webp',
      ],
      thumb: '/projects/attendai/thumb.webp',
      video: undefined,
    },
    caseStudy: {
      problem: 'Manual entry of hundreds of handwritten daily attendance registers into institutional spreadsheets consumed hours of faculty time and created transcription errors.',
      solution: 'Built a FastAPI vision pipeline leveraging Gemini multimodal vision to extract roll numbers, present/absent markings, and date headers, with an interactive Streamlit human verification review.',
      result: 'Automated direct export into styled cumulative master Excel workbooks with attendance percentage calculations and audit histories.',
    },
  },
  {
    slug: 'zeroblur',
    title: 'ZeroBlur',
    categoryLabel: 'DIGITAL MARKETPLACE • WEB',
    kind: 'web',
    type: 'software',
    description: 'High-contrast Neo-Brutalist digital assets marketplace with interactive live component previews, animated cart drawer, and high-visibility typography.',
    tags: ['React 19', 'Vite', 'Framer Motion', 'Lucide React', 'CSS3'],
    demo: 'https://zeroblur.anrix.me/',
    github: 'https://github.com/anrix05/ZeroBlur',
    accentColor: '#ffe17c',
    featured: false,
    image: '/projects/zeroblur/hero.webp',
    assets: {
      hero: '/projects/zeroblur/hero.webp',
      screens: [
        '/projects/zeroblur/screen-1.webp',
        '/projects/zeroblur/screen-2.webp',
        '/projects/zeroblur/screen-3.webp',
        '/projects/zeroblur/screen-4.webp',
      ],
      thumb: '/projects/zeroblur/thumb.webp',
      video: undefined,
    },
    caseStudy: {
      problem: 'Most developer asset marketplaces hide component fidelity behind static mockups, leading to buyer hesitation and code integration surprises.',
      solution: 'Constructed tactile interactive previews with Framer Motion spring physics, dark/light theme switching, and instant client-side cart state.',
      result: 'Rapid engagement brutalist shopping experience with instantaneous preview rendering and zero layout shift.',
    },
  },
  {
    slug: 'the-graveyard',
    title: 'The Graveyard',
    categoryLabel: 'DEVELOPER MARKETPLACE • WEB',
    kind: 'web',
    type: 'software',
    description: 'Editorial marketplace and codebase vault where developers buy, sell, or adopt abandoned side projects, featuring tombstone post-mortems and commit histories.',
    tags: ['Next.js 16', 'React 19', 'TypeScript', 'Supabase', 'Razorpay', 'Framer Motion'],
    demo: 'https://graveyard.anrix.me',
    github: 'https://github.com/anrix05/The-Graveyard',
    accentColor: '#6c1717',
    featured: true,
    image: '/projects/the-graveyard/hero.webp',
    assets: {
      hero: '/projects/the-graveyard/hero.webp',
      screens: [
        '/projects/the-graveyard/screen-1.webp',
        '/projects/the-graveyard/screen-2.webp',
        '/projects/the-graveyard/screen-3.webp',
        '/projects/the-graveyard/screen-4.webp',
      ],
      thumb: '/projects/the-graveyard/thumb.webp',
      video: '/projects/the-graveyard/demo.mp4',
    },
    caseStudy: {
      problem: 'Millions of engineering hours are trapped in abandoned GitHub repositories and unfinished MVPs that never reach potential users.',
      solution: 'Created an editorial marketplace featuring automated repository code inspection, cause-of-death breakdowns, ownership escrow, and Razorpay checkout.',
      result: 'Full-stack codebase marketplace with tombstone card interactions and seamless developer project handoffs.',
    },
  },
  {
    slug: 'loveconnect',
    title: 'LoveConnect',
    categoryLabel: 'RELATIONSHIP SUITE • MOBILE',
    kind: 'mobile',
    type: 'software',
    description: 'Private couple connectivity companion mobile app featuring shared memories timeline, real-time messaging, biometric security, and a hybrid Firebase + SQLite offline sync engine.',
    tags: ['React Native', 'Expo SDK 52', 'Firebase', 'SQLite', 'Biometrics'],
    demo: 'https://expo.dev/accounts/anrix/projects/relationship-app/builds/c5be3738-1ba4-4664-b8b2-a21a09038aaf',
    github: 'https://github.com/anrix05/Love-Connect',
    accentColor: '#ff6b9d',
    featured: false,
    image: '/projects/loveconnect/hero.webp',
    assets: {
      hero: '/projects/loveconnect/hero.webp',
      screens: [],
      thumb: '/projects/loveconnect/thumb.webp',
    },
    caseStudy: {
      problem: 'Couples needing a private, non-commercial space for memories and milestone tracking struggle with connectivity drops and privacy concerns on public social networks.',
      solution: 'Engineered an end-to-end encrypted mobile app with biometric app locking, offline SQLite database, and automatic background Firebase synchronization.',
      result: 'Fluid 60 FPS mobile user experience with instant offline cache and push notification milestone reminders.',
    },
  },
  {
    slug: 'campus-mind',
    title: 'CampusMind',
    categoryLabel: 'TIMETABLE ENGINE • WEB',
    kind: 'web',
    type: 'software',
    description: 'Production-grade automated college timetable generation, constraint verification, and interactive algorithm analysis platform with live conflict graphs.',
    tags: ['React 19', 'FastAPI', 'Python 3.12', 'TypeScript', 'Tailwind CSS', 'SQLite'],
    accentColor: '#edbd7f',
    featured: true,
    image: '/projects/campus-mind/hero.webp',
    assets: {
      hero: '/projects/campus-mind/hero.webp',
      screens: [
        '/projects/campus-mind/screen-1.webp',
        '/projects/campus-mind/screen-2.webp',
        '/projects/campus-mind/screen-3.webp',
        '/projects/campus-mind/screen-4.webp',
      ],
      thumb: '/projects/campus-mind/thumb.webp',
      video: '/projects/campus-mind/demo.mp4',
    },
    caseStudy: {
      problem: 'Collegiate scheduling faces severe combinatorial constraints across classroom capacities, faculty availability, and student batches, making manual scheduling impractical.',
      solution: 'Developed a pure Python constraint satisfaction engine with interactive step-by-step trace replay, SVG conflict graph visualization, and independent 8-constraint verification.',
      result: '100% conflict-free schedule generation with real-time empirical benchmark scaling and 105 automated unit and integration tests.',
    },
  },
  {
    slug: 'auto-shed',
    title: 'Auto Shed (Smart Roof)',
    categoryLabel: 'HARDWARE & EMBEDDED',
    kind: 'hardware',
    type: 'hardware',
    description: 'IoT automated roofing mechanism equipped with optical rain sensors and servo actuators to automatically deploy protective covers during sudden weather changes.',
    tags: ['IoT', 'Arduino', 'Sensors', 'Servo Actuators', 'Embedded C'],
    link: 'https://www.linkedin.com/in/abdur-rahman-vit/',
    accentColor: '#0284c7',
    featured: false,
    assets: {
      screens: [],
    },
    caseStudy: {
      problem: 'Open-air spaces, balconies, and storage yards suffer damage from sudden unexpected rainfall when residents or staff are away.',
      solution: 'Designed a microcontroller-driven sliding canopy system triggered by analog rain sensor thresholds with manual override and safety stop switches.',
      result: 'Functional IoT scale model with sub-second rain detection and automated mechanical closure.',
    },
  },
  {
    slug: 'digital-keypad-lock',
    title: 'Digital Keypad Lock',
    categoryLabel: 'HARDWARE & SECURITY',
    kind: 'hardware',
    type: 'hardware',
    description: 'Embedded physical access control system featuring a 4x4 matrix keypad, master code reprogrammability, tamper lockouts, and status LED telemetry.',
    tags: ['Embedded Systems', 'C++', 'Microcontroller', 'Security Hardware'],
    link: 'https://www.linkedin.com/in/abdur-rahman-vit/',
    accentColor: '#10b981',
    featured: false,
    assets: {
      screens: [],
    },
    caseStudy: {
      problem: 'Traditional mechanical keys are prone to physical loss, unauthorized duplication, and lack audit locks or instant revocation.',
      solution: 'Created a solid-state matrix keypad security lock with EEPROM credential persistence, debounced input scanning, and timed lockout upon consecutive invalid attempts.',
      result: 'Robust access control prototype operating on battery power with instant relay triggering upon passcode verification.',
    },
  },
];

// Helper calculations derived directly from projects data
export const FEATURED_PROJECTS_COUNT = projects.filter((p) => p.featured).length;

// Count of projects with a real hosted demo URL
export const LIVE_DEPLOYMENTS_COUNT = projects.filter((p) => Boolean(p.demo)).length;
