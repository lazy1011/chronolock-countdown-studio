export const PRESET_THEMES = {
  titanium: {
    id: 'titanium',
    name: 'Obsidian Titanium',
    category: 'Minimalist Dark',
    accent: '#f97316', // Precision Safety Orange
    accentSecondary: '#38bdf8',
    bg: '#050507',
    wallpaperBg: 'linear-gradient(180deg, #050507 0%, #0c0d12 50%, #050507 100%)',
    overlayMesh: 'radial-gradient(circle at 50% 15%, rgba(249, 115, 22, 0.08) 0%, transparent 60%)',
    surface: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#ffffff',
    textSecondary: '#8e8e93',
    monoFont: true
  },
  swiss: {
    id: 'swiss',
    name: 'Swiss Monochrome',
    category: 'High Contrast',
    accent: '#ffffff',
    accentSecondary: '#a1a1aa',
    bg: '#000000',
    wallpaperBg: '#000000',
    overlayMesh: 'radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.06) 0%, transparent 50%)',
    surface: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.14)',
    textPrimary: '#ffffff',
    textSecondary: '#a1a1aa',
    monoFont: false
  },
  solar: {
    id: 'solar',
    name: 'Solar Amber',
    category: 'Warm Focus',
    accent: '#f59e0b',
    accentSecondary: '#ef4444',
    bg: '#070503',
    wallpaperBg: 'linear-gradient(180deg, #090604 0%, #150f09 60%, #070503 100%)',
    overlayMesh: 'radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.12) 0%, transparent 60%)',
    surface: 'rgba(245, 158, 11, 0.05)',
    border: 'rgba(245, 158, 11, 0.15)',
    textPrimary: '#fffbeb',
    textSecondary: '#a8a29e',
    monoFont: true
  },
  nordic: {
    id: 'nordic',
    name: 'Alpine Slate',
    category: 'Cool Calm',
    accent: '#38bdf8',
    accentSecondary: '#818cf8',
    bg: '#04070c',
    wallpaperBg: 'linear-gradient(180deg, #04070c 0%, #0b111a 60%, #04070c 100%)',
    overlayMesh: 'radial-gradient(circle at 50% 15%, rgba(56, 189, 248, 0.1) 0%, transparent 55%)',
    surface: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(56, 189, 248, 0.15)',
    textPrimary: '#f0f9ff',
    textSecondary: '#94a3b8',
    monoFont: false
  },
  cyber: {
    id: 'cyber',
    name: 'Terminal HUD',
    category: 'Engineering',
    accent: '#10b981',
    accentSecondary: '#06b6d4',
    bg: '#020503',
    wallpaperBg: 'linear-gradient(180deg, #020503 0%, #050e09 50%, #020503 100%)',
    overlayMesh: 'radial-gradient(circle at 50% 10%, rgba(16, 185, 129, 0.1) 0%, transparent 60%)',
    surface: 'rgba(16, 185, 129, 0.04)',
    border: 'rgba(16, 185, 129, 0.2)',
    textPrimary: '#ecfdf5',
    textSecondary: '#6ee7b7',
    monoFont: true
  }
};

export const PRESET_DEADLINES = [
  {
    id: 'google-handshake',
    title: 'Google AI Skills Studio Challenge',
    category: 'Official Contest',
    targetDate: '2026-11-23T23:59:00',
    tagline: 'Your Deadline, Your Design • Countdown Lock Screen',
    theme: 'titanium',
    dailyAnchor: 'Focus precedes momentum. Deliver with precision.',
    milestones: [
      { id: 1, title: 'Requirements & Rubric Audit', date: 'Nov 18', done: true, note: 'Mapped the 4 evaluation criteria' },
      { id: 2, title: 'Safe-Zone Hardware Grid', date: 'Nov 20', done: true, note: 'Unblocked iOS clock & widget headroom' },
      { id: 3, title: 'Backward Milestone Sequence', date: 'Nov 22', done: true, note: 'Reverse-engineered sprint checkpoints' },
      { id: 4, title: 'High-Res Wallpaper Calibration', date: 'Nov 23, 12:00', done: false, note: 'Tested iPhone 16 Pro & Pixel 9 Pro' },
      { id: 5, title: 'Handshake Mission Upload', date: 'Nov 23, 23:59', done: false, note: 'Title, cover image, link & writeup' }
    ]
  },
  {
    id: 'academic-finals',
    title: 'University Final Examinations',
    category: 'Academic Milestone',
    targetDate: '2026-12-15T09:00:00',
    tagline: 'Term Capstone • 4.0 GPA Flightplan',
    theme: 'solar',
    dailyAnchor: 'One subject per block. Master fundamental principles.',
    milestones: [
      { id: 1, title: 'Course Synthesis & Core Formulas', date: 'Dec 01', done: true, note: 'Distill lecture slides to 1-page summaries' },
      { id: 2, title: 'Midterm Homework Retrospective', date: 'Dec 06', done: false, note: 'Re-derive all missed problem sets' },
      { id: 3, title: '3-Hour Timed Mock Session', date: 'Dec 10', done: false, note: 'Simulate exact exam hall constraints' },
      { id: 4, title: 'High-Yield Formula Drill', date: 'Dec 13', done: false, note: 'Memory palace for edge-case equations' },
      { id: 5, title: 'Exam Morning Execution', date: 'Dec 15, 09:00', done: false, note: 'Rest, hydrate, and execute with clarity' }
    ]
  },
  {
    id: 'thesis-defense',
    title: 'Graduate Thesis Defense',
    category: 'Research Milestone',
    targetDate: '2027-01-20T14:00:00',
    tagline: 'Department Review Committee • Final Examination',
    theme: 'swiss',
    dailyAnchor: 'You know your data better than anyone. Defend the rigor.',
    milestones: [
      { id: 1, title: 'Manuscript Final Proofing', date: 'Dec 12', done: true, note: 'Compiled in LaTeX with complete citations' },
      { id: 2, title: 'Principal Investigator Review', date: 'Dec 28', done: false, note: 'Address committee chair feedback' },
      { id: 3, title: 'Formal Distribution to Readers', date: 'Jan 05', done: false, note: 'Dispatched 2 weeks prior to defense' },
      { id: 4, title: 'Slide Presentation Dry Run', date: 'Jan 15', done: false, note: '30-minute pacing with mock adversarial Q&A' },
      { id: 5, title: 'Committee Defense Day', date: 'Jan 20, 14:00', done: false, note: 'Present findings and celebrate completion' }
    ]
  },
  {
    id: 'startup-launch',
    title: 'Version 1.0 Public Release',
    category: 'Product Launch',
    targetDate: '2026-12-01T08:00:00',
    tagline: 'Production Deploy • Global Distribution',
    theme: 'nordic',
    dailyAnchor: 'Remove friction from the core loop. Ship what works.',
    milestones: [
      { id: 1, title: 'Feature Freeze & DB Migration', date: 'Nov 24', done: true, note: 'All end-to-end user flows verified' },
      { id: 2, title: 'Staging Auth & Billing Audit', date: 'Nov 26', done: false, note: 'Simulated 500 concurrent checkout sessions' },
      { id: 3, title: 'Demo Walkthrough & Asset Lock', date: 'Nov 28', done: false, note: '45-second high-speed product video' },
      { id: 4, title: 'Release Candidate Deployment', date: 'Nov 30', done: false, note: 'Canary cluster primed on edge CDN' },
      { id: 5, title: 'Production DNS Switch', date: 'Dec 01, 08:00', done: false, note: 'Live customer onboarding and telemetry' }
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
    notchType: 'dynamic-island'
  },
  pixel9pro: {
    id: 'pixel9pro',
    name: 'Pixel 9 Pro',
    aspect: 'aspect-[9/20]',
    width: 392,
    height: 852,
    wallpaperWidth: 1280,
    wallpaperHeight: 2856,
    notchType: 'punch-hole'
  },
  desktop4k: {
    id: 'desktop4k',
    name: 'MacBook Pro 16"',
    aspect: 'aspect-[16/10]',
    width: 780,
    height: 488,
    wallpaperWidth: 2560,
    wallpaperHeight: 1600,
    notchType: 'mac-notch'
  }
};
