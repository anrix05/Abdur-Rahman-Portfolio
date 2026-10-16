export interface Project {
  title: string;
  description: string;
  tags: string[];
  type: 'software' | 'hardware';
  link?: string;
  github?: string;
  demo?: string;
  categoryLabel: string;
  featured?: boolean;
  image?: string;
}

export const projects: Project[] = [
  {
    title: 'NexaLink',
    categoryLabel: 'ALUMNI PLATFORM • WEB',
    description: 'Centralized alumni data management and engagement platform for Vidyalankar Institute of Technology, built for the Smart India Hackathon (SIH25017). Features verified mentorship matching, job and event workflows, real-time messaging, and a Row Level Security backend.',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'Supabase'],
    type: 'software',
    demo: 'https://nexalink.anrix.me',
    github: 'https://github.com/anrix05/NexaLink',
    featured: true,
  },
  {
    title: 'The Graveyard',
    categoryLabel: 'DEVELOPER MARKETPLACE • WEB',
    description: 'A marketplace where developers sell, hand over, or find co-founders for abandoned side projects, each listed with tombstone-style data like cause of death and last commit. Includes a publish wizard that inspects zipped code, GitHub-verified activity, and Razorpay checkout.',
    tags: ['Next.js', 'Supabase', 'Razorpay', 'Framer Motion'],
    type: 'software',
    demo: 'https://graveyard.anrix.me',
    github: 'https://github.com/anrix05/The-Graveyard',
    featured: true,
  },
  {
    title: 'V Notice',
    categoryLabel: 'DIGITAL SIGNAGE • WEB',
    description: 'Offline-first smart notice board that replaces paper bulletin boards with department-wise kiosk displays. Faculty publish from their phones in seconds, with urgent takeover mode, QR links, and resilient browser caching.',
    tags: ['Python', 'Flask', 'Service Workers', 'Raspberry Pi'],
    type: 'software',
    demo: 'https://v-notice.onrender.com/display',
    github: 'https://github.com/anrix05/V-Notice',
    featured: true,
  },
  {
    title: 'AttendAI',
    categoryLabel: 'COMPUTER VISION • AI',
    description: 'Turns photos of handwritten attendance registers into a cumulative Excel master sheet using Gemini vision models. Resolves signatures, AB marks, and range arrows, with a human review step before committing.',
    tags: ['Python', 'FastAPI', 'Streamlit', 'Gemini'],
    type: 'software',
    github: 'https://github.com/anrix05/AttendaAi',
    featured: true,
  },
  {
    title: 'Love Connect',
    categoryLabel: 'MOBILE APP • IOS / ANDROID',
    description: 'Full-stack relationship management suite focused on privacy and real-time syncing. Features biometric security and a hybrid Firebase + SQLite offline fallback architecture.',
    tags: ['React Native', 'Firebase', 'SQLite', 'Biometrics'],
    type: 'software',
    github: 'https://github.com/anrix05/Love-Connect',
    demo: 'https://expo.dev/accounts/anrix/projects/relationship-app/builds/c5be3738-1ba4-4664-b8b2-a21a09038aaf',
    featured: false,
  },
  {
    title: 'ZeroBlur',
    categoryLabel: 'MARKETPLACE • WEB',
    description: 'A premium digital assets marketplace built for UI Kits, Code Snippets, and design templates with high contrast interactions and tactical asset previews.',
    tags: ['React 18', 'Framer Motion', 'Lucide React', 'Vanilla CSS'],
    type: 'software',
    demo: 'https://zeroblur.anrix.me/',
    github: 'https://github.com/anrix05/ZeroBlur',
    featured: false,
  },
  {
    title: 'Auto Shed (Smart Roof)',
    categoryLabel: 'HARDWARE & EMBEDDED',
    description: 'An IoT automated roofing mechanism equipped with rain sensors to automatically cover open areas during sudden weather changes.',
    tags: ['IoT', 'Arduino', 'Sensors', 'Automation'],
    type: 'hardware',
    link: 'https://www.linkedin.com/in/abdur-rahman-vit/',
    featured: false,
  },
  {
    title: 'Digital Keypad Lock',
    categoryLabel: 'HARDWARE & SECURITY',
    description: 'Hardware security lock featuring matrix keypad authorization and real-time status monitoring for smart access control.',
    tags: ['Embedded Systems', 'C++', 'Security', 'Hardware'],
    type: 'hardware',
    link: 'https://www.linkedin.com/in/abdur-rahman-vit/',
    featured: false,
  },
];

// Helper calculations derived directly from projects data
export const FEATURED_PROJECTS_COUNT = projects.filter((p) => p.featured).length;

// Count of projects with a real hosted demo URL
export const LIVE_DEPLOYMENTS_COUNT = projects.filter((p) => Boolean(p.demo)).length;
