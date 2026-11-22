export const PRESET_THEMES = {
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Stellar',
    description: 'Deep cosmos gradient with Google DeepMind cyan & electric violet glows',
    bgClass: 'from-slate-950 via-indigo-950/60 to-slate-950',
    primaryColor: '#6366f1',
    secondaryColor: '#06b6d4',
    accentColor: '#a855f7',
    textColor: 'text-white',
    subtextColor: 'text-slate-400',
    cardBg: 'bg-slate-900/60 border-slate-800/80 backdrop-blur-xl',
    activeGlow: 'shadow-[0_0_25px_rgba(99,102,241,0.35)]',
    badgeStyle: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    ringColor: '#6366f1',
    meshBg: 'radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.25) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.2) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(168, 85, 247, 0.15) 0px, transparent 60%)'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Terminal Matrix',
    description: 'Cyber hacker console with glowing emerald phosphor & scanlines',
    bgClass: 'from-black via-zinc-950 to-black',
    primaryColor: '#10b981',
    secondaryColor: '#06b6d4',
    accentColor: '#eab308',
    textColor: 'text-emerald-400',
    subtextColor: 'text-zinc-500',
    cardBg: 'bg-zinc-950/80 border-emerald-500/30 backdrop-blur-xl',
    activeGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.35)]',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono',
    ringColor: '#10b981',
    meshBg: 'radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.2) 0px, transparent 50%), radial-gradient(at 100% 50%, rgba(6, 182, 212, 0.15) 0px, transparent 50%)'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Momentum',
    description: 'Warm dusk twilight with tangerine, peach and magenta hues',
    bgClass: 'from-slate-950 via-rose-950/40 to-slate-950',
    primaryColor: '#f43f5e',
    secondaryColor: '#f97316',
    accentColor: '#fbbf24',
    textColor: 'text-white',
    subtextColor: 'text-rose-200/60',
    cardBg: 'bg-slate-950/60 border-rose-900/30 backdrop-blur-xl',
    activeGlow: 'shadow-[0_0_25px_rgba(244,63,94,0.35)]',
    badgeStyle: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    ringColor: '#f43f5e',
    meshBg: 'radial-gradient(at 10% 20%, rgba(244, 63, 94, 0.25) 0px, transparent 50%), radial-gradient(at 90% 80%, rgba(249, 115, 22, 0.2) 0px, transparent 50%)'
  },
  nordic: {
    id: 'nordic',
    name: 'Nordic Minimalist',
    description: 'Clean architectural frosted slate with crisp monochrome contrast',
    bgClass: 'from-zinc-900 via-neutral-900 to-zinc-950',
    primaryColor: '#f8fafc',
    secondaryColor: '#94a3b8',
    accentColor: '#38bdf8',
    textColor: 'text-zinc-100',
    subtextColor: 'text-zinc-400',
    cardBg: 'bg-zinc-900/60 border-zinc-700/40 backdrop-blur-xl',
    activeGlow: 'shadow-[0_0_20px_rgba(255,255,255,0.2)]',
    badgeStyle: 'bg-white/10 text-zinc-200 border-white/20',
    ringColor: '#f8fafc',
    meshBg: 'radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.1) 0px, transparent 60%), radial-gradient(at 50% 100%, rgba(148, 163, 184, 0.08) 0px, transparent 60%)'
  },
  emerald: {
    id: 'emerald',
    name: 'Focus Forest',
    description: 'Calming botanical pine and mint to reduce stress and boost clarity',
    bgClass: 'from-slate-950 via-emerald-950/40 to-slate-950',
    primaryColor: '#059669',
    secondaryColor: '#34d399',
    accentColor: '#10b981',
    textColor: 'text-white',
    subtextColor: 'text-emerald-200/60',
    cardBg: 'bg-slate-900/60 border-emerald-900/40 backdrop-blur-xl',
    activeGlow: 'shadow-[0_0_25px_rgba(5,150,105,0.35)]',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    ringColor: '#34d399',
    meshBg: 'radial-gradient(at 20% 10%, rgba(5, 150, 105, 0.25) 0px, transparent 50%), radial-gradient(at 80% 90%, rgba(52, 211, 153, 0.18) 0px, transparent 50%)'
  }
};

export const PRESET_DEADLINES = [
  {
    id: 'google-handshake',
    title: 'Google AI Challenge Sprint',
    category: 'Competition / Hackathon',
    targetDate: '2026-11-23T23:59:00',
    tagline: 'Your Deadline, Your Design • Countdown Lock Screen',
    theme: 'obsidian',
    dailyAnchor: '“Turn every glance into momentum. Ship what matters.”',
    milestones: [
      { id: 1, title: 'Ideation & Deep Rule Audit', date: 'Nov 18, 2026', done: true, note: 'Mapped all 4 scoring rubrics and constraints' },
      { id: 2, title: 'Core Dynamic Countdown Engine', date: 'Nov 20, 2026', done: true, note: 'Ticking sub-second physics & safe zones' },
      { id: 3, title: 'Backward Milestone Flightdeck', date: 'Nov 22, 2026', done: true, note: 'Interactive checkpoints leading up to submission' },
      { id: 4, title: 'Wallpaper Engine & Device Tests', date: 'Nov 23, 12:00 PM', done: false, note: 'iPhone 16 Pro, Pixel 9 & 4K desktop tests' },
      { id: 5, title: 'Handshake Mission Submission', date: 'Nov 23, 11:59 PM', done: false, note: 'Title, cover image, link & writeup upload' }
    ]
  },
  {
    id: 'academic-finals',
    title: 'Fall Semester Final Exams',
    category: 'Academic Sprint',
    targetDate: '2026-12-15T09:00:00',
    tagline: '4.0 GPA Flight Plan • Finish Strong',
    theme: 'emerald',
    dailyAnchor: '“Discipline today creates freedom tomorrow. Master one topic each block.”',
    milestones: [
      { id: 1, title: 'Syllabus & Lecture Note Synthesis', date: 'Dec 01, 2026', done: true, note: 'Condense 14 weeks into core formula cheat-sheets' },
      { id: 2, title: 'Problem Set Mastery Drill', date: 'Dec 05, 2026', done: false, note: 'Solve all past midterm homework variations' },
      { id: 3, title: 'Full-Length Timed Mock Exam', date: 'Dec 09, 2026', done: false, note: 'Simulate exact 3-hour exam environment' },
      { id: 4, title: 'Targeted Weak Spot Triage', date: 'Dec 12, 2026', done: false, note: 'High-yield office hours & peer quiz session' },
      { id: 5, title: 'Exam Day 1: Final Showdown', date: 'Dec 15, 09:00 AM', done: false, note: 'Rest, hydrate, and execute with precision' }
    ]
  },
  {
    id: 'thesis-defense',
    title: 'Master’s Thesis Defense',
    category: 'Graduate Research',
    targetDate: '2027-01-20T14:00:00',
    tagline: 'Department of Computer Science • Final Committee Review',
    theme: 'nordic',
    dailyAnchor: '“You are the foremost expert in this room. Own your methodology.”',
    milestones: [
      { id: 1, title: 'Complete Manuscript Draft v1', date: 'Dec 10, 2026', done: true, note: 'All chapters compiled with citations in LaTeX' },
      { id: 2, title: 'Advisor Sign-off & Revisions', date: 'Dec 28, 2026', done: false, note: 'Incorporate primary PI feedback on benchmarks' },
      { id: 3, title: 'Official Committee Submission', date: 'Jan 05, 2027', done: false, note: 'Formal distribution 2 weeks prior to defense' },
      { id: 4, title: 'Slide Deck & Live Demo Dry Run', date: 'Jan 14, 2027', done: false, note: '35-min presentation practice with Q&A drill' },
      { id: 5, title: 'Oral Defense Day', date: 'Jan 20, 02:00 PM', done: false, note: 'Presentation to committee & celebratory toast' }
    ]
  },
  {
    id: 'product-launch',
    title: 'SaaS Beta Product Launch',
    category: 'Startup / Engineering',
    targetDate: '2026-12-01T08:00:00',
    tagline: 'Product Hunt & Hacker News Show Day',
    theme: 'cyberpunk',
    dailyAnchor: '“Real artists ship. Polish the core loop, eliminate friction.”',
    milestones: [
      { id: 1, title: 'Feature Freeze & End-to-End Tests', date: 'Nov 24, 2026', done: true, note: 'All critical paths covered in Playwright' },
      { id: 2, title: 'Stripe Billing & Auth Hardening', date: 'Nov 26, 2026', done: false, note: 'Webhooks verified in staging environment' },
      { id: 3, title: 'Demo Video & Interactive Landing Page', date: 'Nov 28, 2026', done: false, note: '60s crisp product demo and social assets' },
      { id: 4, title: 'Product Hunt Maker Schedule', date: 'Nov 30, 06:00 PM', done: false, note: 'First comment ready, hunter assets locked' },
      { id: 5, title: 'Official Launch Hour (12:01 AM PT)', date: 'Dec 01, 08:00 AM', done: false, note: 'Live customer onboarding and monitoring' }
    ]
  },
  {
    id: 'marathon-race',
    title: 'City Marathon 42.195 KM',
    category: 'Athletics & Peak Fitness',
    targetDate: '2027-02-14T06:30:00',
    tagline: 'Sub-3:30 Goal Pace • 26.2 Miles of Grit',
    theme: 'sunset',
    dailyAnchor: '“The race is just the victory lap for the months of quiet miles.”',
    milestones: [
      { id: 1, title: 'Peak 34km Long Run Completion', date: 'Jan 15, 2027', done: true, note: 'Tested race day gels and hydration strategy' },
      { id: 2, title: 'Begin 3-Week Mileage Taper', date: 'Jan 24, 2027', done: false, note: 'Reduce volume by 25%, maintain tempo pace' },
      { id: 3, title: 'Race Kit & Shoes Lock-In', date: 'Feb 05, 2027', done: false, note: 'No new gear on race day; carb loading plan' },
      { id: 4, title: 'Expo Bib Pickup & Course Recon', date: 'Feb 12, 2027', done: false, note: 'Pick up bib #4218, survey mile 20 hills' },
      { id: 5, title: 'Race Morning Gun Time', date: 'Feb 14, 06:30 AM', done: false, note: 'Line up in Wave 1 corral. Let the training run' }
    ]
  }
];

export const DEVICE_PROFILES = {
  iphone16pro: {
    id: 'iphone16pro',
    name: 'iPhone 16 Pro',
    aspect: 'aspect-[9/19.5]',
    width: 390,
    height: 844,
    wallpaperWidth: 1179,
    wallpaperHeight: 2556,
    notchType: 'dynamic-island',
    safeTop: 120,
    safeBottom: 80,
    clockPos: 'top'
  },
  pixel9pro: {
    id: 'pixel9pro',
    name: 'Google Pixel 9 Pro',
    aspect: 'aspect-[9/20]',
    width: 392,
    height: 852,
    wallpaperWidth: 1280,
    wallpaperHeight: 2856,
    notchType: 'punch-hole',
    safeTop: 110,
    safeBottom: 70,
    clockPos: 'top'
  },
  desktop4k: {
    id: 'desktop4k',
    name: 'MacBook Pro / Desktop',
    aspect: 'aspect-[16/10]',
    width: 780,
    height: 488,
    wallpaperWidth: 2560,
    wallpaperHeight: 1600,
    notchType: 'mac-notch',
    safeTop: 60,
    safeBottom: 40,
    clockPos: 'center'
  }
};
