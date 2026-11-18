// ─────────────────────────────────────────────────────────────
// All portfolio content lives here. Edit this file to update the site.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Saiteja Kondakindi',
  shortName: 'Saiteja',
  initials: 'SK',
  role: 'Full Stack Developer',
  location: 'Hyderabad, India',
  email: 'careers.saitejak@gmail.com',
  github: 'https://github.com/saitejak-dev26',
  linkedin: 'https://www.linkedin.com/in/saiteja-kondakindi-4475953ab/',
  resume: '/resume/Saiteja_Kondakindi_Resume.pdf',
  // Change this to your real domain once it is connected on Hostinger.
  url: 'https://saitejak.dev',
  description:
    'Full Stack Developer with 5+ years building SaaS and CRM platforms with Next.js, React, Vite, Node.js, NestJS and MySQL.',
  typedRoles: ['Full Stack Developer', 'Next.js & NestJS', 'SaaS & CRM Builder'],
  stats: [
    { value: '5+', label: 'Years exp' },
    { value: '8+', label: 'Projects' },
  ],
};

export type SkillItem = { name: string; icon?: string };
export type SkillGroup = { title: string; sub: string; icon: string; items: SkillItem[] };

// `icon` is a Simple Icons slug (https://simpleicons.org). Leave it out to show initials.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    sub: 'Fast, accessible interfaces',
    icon: 'M3 5h18v12H3zM8 21h8M12 17v4',
    items: [
      { name: 'Next.js', icon: 'nextdotjs' },
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Vite', icon: 'vite' },
      { name: 'Tailwind CSS', icon: 'tailwindcss' },
      { name: 'Redux Toolkit', icon: 'redux' },
      { name: 'React Query', icon: 'reactquery' },
      { name: 'shadcn/ui', icon: 'shadcnui' },
      { name: 'jQuery', icon: 'jquery' },
    ],
  },
  {
    title: 'Backend',
    sub: 'APIs and business logic',
    icon: 'M4 6h16v4H4zM4 14h16v4H4zM8 8h.01M8 16h.01',
    items: [
      { name: 'Node.js', icon: 'nodedotjs' },
      { name: 'NestJS', icon: 'nestjs' },
      { name: 'Express', icon: 'express' },
      { name: 'JWT Auth', icon: 'jsonwebtokens' },
      { name: 'REST APIs' },
      { name: 'Apps Script', icon: 'googleappsscript' },
    ],
  },
  {
    title: 'Database',
    sub: 'Reliable data storage',
    icon: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    items: [
      { name: 'MySQL', icon: 'mysql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Supabase', icon: 'supabase' },
      { name: 'Data migrations' },
    ],
  },
  {
    title: 'Integrations',
    sub: 'Payments and messaging',
    icon: 'M9 7H7a5 5 0 0 0 0 10h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8',
    items: [
      { name: 'Razorpay', icon: 'razorpay' },
      { name: 'MSG91' },
      { name: 'Google APIs', icon: 'google' },
      { name: 'Kaleyra' },
      { name: 'Postmark' },
      { name: 'Freshdesk' },
    ],
  },
  {
    title: 'DevOps & Tools',
    sub: 'Deploy, monitor, collaborate',
    icon: 'M4 5h16v6H4zM4 13h16v6H4zM8 8h.01M8 16h.01',
    items: [
      { name: 'Nginx', icon: 'nginx' },
      { name: 'PM2', icon: 'pm2' },
      { name: 'DigitalOcean', icon: 'digitalocean' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'Postman', icon: 'postman' },
    ],
  },
];

// Map tech-tag names to Simple Icons slugs (used for project + experience tags).
export const tagIcons: Record<string, string> = {
  'Next.js': 'nextdotjs',
  'Next.js 15': 'nextdotjs',
  React: 'react',
  JavaScript: 'javascript',
  TypeScript: 'typescript',
  jQuery: 'jquery',
  HTML: 'html5',
  MySQL: 'mysql',
  PM2: 'pm2',
  Nginx: 'nginx',
  'Google Sheets': 'googlesheets',
  'Node.js': 'nodedotjs',
  Razorpay: 'razorpay',
};

export type Project = {
  title: string;
  kind: string;
  category: 'SaaS & CRM' | 'Website';
  inDevelopment?: boolean;
  image: string;
  imageFit?: 'cover' | 'logo';
  imageAlt: string;
  bg: string;
  desc: string;
  stack: string[];
  live?: string; // add the live URL to show a "Live ↗" link
};

export const projects: Project[] = [
  {
    title: 'YumCrm',
    kind: 'SaaS · Subscriptions & billing',
    category: 'SaaS & CRM',
    inDevelopment: true,
    image: '/images/projects/impel-group-logo.png',
    imageFit: 'logo',
    imageAlt: 'Impel Group logo',
    bg: '#F4F0FA',
    desc: 'Academies subscribe to S11pro or Muzigal CRM, pay with Razorpay, renew manually or automatically, and lose access on expiry.',
    stack: ['Next.js', 'Razorpay'],
  },
  {
    title: 'Studio11 ProAcademy CRM',
    live: 'https://crm.studio11proacademy.com/',
    kind: 'SaaS · Operations & sales',
    category: 'SaaS & CRM',
    image: '/images/projects/s11.webp',
    imageAlt: 'Studio11 ProAcademy CRM dashboard',
    bg: '#ECEEF9',
    desc: 'Operational dashboards with data visualisations, plus a round-robin engine that automates sales-lead distribution.',
    stack: ['JavaScript', 'jQuery', 'MySQL'],
  },
  {
    title: 'Muzigal CRM',
    live: 'https://crm.academy.muzigal.com/',
    kind: 'SaaS · Music education',
    category: 'SaaS & CRM',
    image: '/images/projects/mzcrm.webp',
    imageAlt: 'Muzigal Academy CRM dashboard',
    bg: '#F8ECF0',
    desc: 'The core academy platform — CRM records, enrollment workflows and automated SMS/email for enrollments and fee reminders via Kaleyra and Postmark.',
    stack: ['JavaScript', 'jQuery', 'MySQL'],
  },
  {
    title: 'YumPos',
    live: 'https://studio11.yumpos.co/',
    kind: 'SaaS · Billing platform · Studio11',
    category: 'SaaS & CRM',
    image: '/images/projects/yumpos.webp',
    imageAlt: 'YumPos billing dashboard for Studio11',
    bg: '#F0ECF8',
    desc: 'Billing interfaces and REST APIs for transaction handling, with third-party payment gateways and asynchronous transaction states managed end to end.',
    stack: ['React', 'REST APIs', 'Payments'],
  },
  {
    title: 'Muzigal Website',
    live: 'https://muzigal.com/',
    kind: 'Website · Music education',
    category: 'Website',
    image: '/images/projects/muzweb.webp',
    imageAlt: 'Muzigal website homepage',
    bg: '#F8F0E6',
    desc: 'The corporate website, built with Next.js and React using SSR and SSG, deployed and kept reliable with PM2 and Nginx.',
    stack: ['Next.js', 'React', 'Nginx'],
  },
  {
    title: 'Muzigal Teachers',
    live: 'https://teachers.muzigal.com/',
    kind: 'Website · Music education',
    category: 'Website',
    image: '/images/projects/teachers.webp',
    imageAlt: 'Muzigal Teachers sign-up page',
    bg: '#EAF4EE',
    desc: 'The teacher platform, built with Next.js 15 using server-side rendering and static-site generation.',
    stack: ['Next.js 15', 'SSR', 'SSG'],
  },
  {
    title: 'Codesign Website',
    live: 'https://www.co-design.in/',
    kind: 'Website redesign',
    category: 'Website',
    image: '/images/projects/codesign.webp',
    imageAlt: 'Co-Design studio website homepage',
    bg: '#F0F0F0',
    desc: 'Led the end-to-end UI/UX refresh and frontend rebuild, modernising the site for cross-device compatibility.',
    stack: ['UI/UX', 'Frontend'],
  },
  {
    title: 'IOCL Website',
    live: 'https://www.impeloverseas.com/',
    kind: 'Website · Impel Overseas Consultancy Ltd',
    category: 'Website',
    image: '/images/projects/iocl.webp',
    imageAlt: 'Impel Overseas Education website homepage',
    bg: '#F9EDE6',
    desc: 'Website for Impel Overseas Consultancy Limited (IOCL).',
    stack: ['React'],
  },
];

export const experience = {
  role: 'Full Stack Developer',
  type: 'Full-time',
  company: 'Muzigal Edutech Private Limited',
  period: 'Apr 2021 — Present',
  location: 'Hyderabad, India',
  highlights: [
    { value: '99.9%', label: 'Uptime on SaaS/CRM systems' },
    { value: '80%', label: 'Less manual reporting time' },
    { value: '5+', label: 'Years at Muzigal' },
  ],
  responsibilities: [
    'Owned full-stack development and production support for the corporate website, teacher platform and internal SaaS/CRM products used by students and staff.',
    'Built the corporate website and teacher platform with Next.js 15, using server-side rendering (SSR) and static-site generation (SSG).',
    'Maintained **99.9% uptime** for business-critical SaaS/CRM systems through production debugging, PM2 log analysis and Nginx configuration tuning.',
    'Designed a capture-first lead-attribution model and automated MySQL-to-Google Sheets reporting pipelines, **reducing manual reporting time by 80%**.',
    'Optimised complex MySQL queries, including multi-table joins and window functions, for revenue and enrollment dashboards.',
    'Integrated Freshdesk and GoAudits APIs to automate department-metric tracking and academy-readiness scoring.',
  ],
  projects: [
    {
      title: 'Muzigal Academy CRM',
      sub: 'Core platform',
      points: [
        'Developed and maintained the Muzigal Academy CRM using JavaScript, jQuery, HTML and MySQL within an MVC architecture.',
        'Implemented CRM user-interface interactions and form workflows using JavaScript and jQuery, with HTML-based page structure.',
        'Worked with MySQL data structures and queries to support CRM records and enrollment-related workflows.',
        'Integrated Kaleyra and Postmark APIs for automated SMS and email notifications covering enrollments and fee reminders.',
      ],
    },
    {
      title: 'Muzigal.com',
      sub: 'Corporate website',
      points: [
        'Developed and maintained the corporate website using Next.js and React, with SSR and SSG where applicable.',
        'Supported production deployment and reliability using PM2 and Nginx.',
      ],
    },
    {
      title: 'YumPos',
      sub: 'SaaS billing platform · Studio11',
      points: [
        'Developed billing interfaces and REST APIs for transaction handling, with a focus on accuracy and reliability during peak usage.',
        'Integrated third-party payment gateways and managed asynchronous transaction states end to end.',
      ],
    },
    {
      title: 'Studio11 ProAcademy CRM',
      sub: 'Operations & sales',
      points: [
        'Built operational dashboards with data visualisations and developed a round-robin engine to automate sales-lead distribution.',
      ],
    },
    {
      title: 'Codesign',
      sub: 'Website redesign',
      points: [
        'Led the end-to-end UI/UX refresh and frontend rebuild, modernising the frontend for cross-device compatibility.',
      ],
    },
  ],
  tech: [
    'Next.js 15', 'React', 'JavaScript', 'jQuery', 'HTML', 'MySQL', 'REST APIs', 'PM2', 'Nginx',
    'Google Sheets', 'Kaleyra', 'Postmark', 'Freshdesk API', 'GoAudits API', 'Payment gateways',
  ],
};
