export const WALLPAPER_BACKGROUNDS = [
  {
    id: 'cosmic-nebula',
    name: 'Cosmic Nebula 3D',
    category: 'Cinematic Space',
    bg: 'radial-gradient(ellipse at 80% 20%, rgba(120, 50, 255, 0.35) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(249, 115, 22, 0.22) 0%, transparent 60%), radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 70%), #040408',
    accent: '#f97316',
    preview: 'linear-gradient(135deg, #2e0854 0%, #040408 50%, #f97316 100%)'
  },
  {
    id: 'cyber-dusk',
    name: 'Cyberpunk Tokyo',
    category: 'Neon Atmosphere',
    bg: 'radial-gradient(circle at 50% 10%, rgba(244, 63, 94, 0.3) 0%, transparent 50%), radial-gradient(circle at 100% 90%, rgba(245, 158, 11, 0.25) 0%, transparent 60%), linear-gradient(180deg, #09060b 0%, #150918 60%, #060309 100%)',
    accent: '#f43f5e',
    preview: 'linear-gradient(135deg, #4c0519 0%, #09060b 50%, #f59e0b 100%)'
  },
  {
    id: 'architectural-monolith',
    name: 'Architectural Monolith',
    category: '3D Geometry',
    bg: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 40%), linear-gradient(225deg, rgba(255,255,255,0.05) 0%, transparent 50%), linear-gradient(180deg, #111116 0%, #050507 100%)',
    accent: '#38bdf8',
    preview: 'linear-gradient(135deg, #27272a 0%, #111116 50%, #38bdf8 100%)'
  },
  {
    id: 'alpine-twilight',
    name: 'Alpine Glacier',
    category: 'Atmospheric Mountain',
    bg: 'radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.25) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(99, 102, 241, 0.2) 0%, transparent 60%), #030712',
    accent: '#38bdf8',
    preview: 'linear-gradient(135deg, #0c4a6e 0%, #030712 50%, #818cf8 100%)'
  },
  {
    id: 'solar-dunes',
    name: 'Golden Hour Dunes',
    category: 'Warm Horizon',
    bg: 'radial-gradient(ellipse at 50% 100%, rgba(245, 158, 11, 0.3) 0%, transparent 70%), radial-gradient(circle at 90% 10%, rgba(239, 68, 68, 0.15) 0%, transparent 50%), #090604',
    accent: '#f59e0b',
    preview: 'linear-gradient(135deg, #78350f 0%, #090604 50%, #f59e0b 100%)'
  },
  {
    id: 'titanium-dark',
    name: 'Pure Obsidian OLED',
    category: 'Minimalist Black',
    bg: '#000000',
    accent: '#ffffff',
    preview: 'linear-gradient(135deg, #18181b 0%, #000000 100%)'
  }
];

export const PRESET_THEMES = {
  titanium: {
    id: 'titanium',
    name: 'Obsidian Titanium',
    category: 'Minimalist Dark',
    accent: '#f97316',
    bg: '#050507',
    wallpaperBg: WALLPAPER_BACKGROUNDS[0].bg,
    textPrimary: '#ffffff'
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber Tokyo',
    category: 'Neon Atmosphere',
    accent: '#f43f5e',
    bg: '#09060b',
    wallpaperBg: WALLPAPER_BACKGROUNDS[1].bg,
    textPrimary: '#ffffff'
  },
  swiss: {
    id: 'swiss',
    name: 'Swiss Monolith',
    category: '3D Geometry',
    accent: '#38bdf8',
    bg: '#050507',
    wallpaperBg: WALLPAPER_BACKGROUNDS[2].bg,
    textPrimary: '#ffffff'
  },
  nordic: {
    id: 'nordic',
    name: 'Alpine Glacier',
    category: 'Cool Calm',
    accent: '#38bdf8',
    bg: '#030712',
    wallpaperBg: WALLPAPER_BACKGROUNDS[3].bg,
    textPrimary: '#f0f9ff'
  },
  solar: {
    id: 'solar',
    name: 'Golden Dunes',
    category: 'Warm Focus',
    accent: '#f59e0b',
    bg: '#090604',
    wallpaperBg: WALLPAPER_BACKGROUNDS[4].bg,
    textPrimary: '#fffbeb'
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
      { id: 1, tLabel: 'T-14', title: 'Audit official contest rules', date: 'Nov 18', done: true, note: 'Mapped four evaluation rubrics' },
      { id: 2, tLabel: 'T-7', title: 'Build working prototype core', date: 'Nov 20', done: true, note: 'Safe-zone unblocked headroom' },
      { id: 3, tLabel: 'T-3', title: 'Safe zone device testing', date: 'Nov 22', done: true, note: 'Tested iPhone 16 Pro & Pixel 9 Pro' },
      { id: 4, tLabel: 'T-1', title: 'Package deliverables & patch', date: 'Nov 23', done: false, note: 'Title, cover image, link & writeup' },
      { id: 5, tLabel: 'T-0', title: 'Official contest submission', date: 'Nov 23', done: false, note: 'Submit before 11:59 PM PT' }
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
      { id: 1, tLabel: 'T-14', title: 'Summarize all lecture notes', date: 'Dec 01', done: true, note: 'Distill core formula sheets' },
      { id: 2, tLabel: 'T-7', title: 'Master midterm problem sets', date: 'Dec 06', done: false, note: 'Re-derive all missed questions' },
      { id: 3, tLabel: 'T-3', title: 'Full timed mock exam', date: 'Dec 10', done: false, note: 'Simulate exact exam constraints' },
      { id: 4, tLabel: 'T-1', title: 'High yield formula review', date: 'Dec 13', done: false, note: 'Rest early and hydrate' },
      { id: 5, tLabel: 'T-0', title: 'Final exam execution', date: 'Dec 15', done: false, note: 'Deliver peak performance' }
    ]
  },
  {
    id: 'thanksgiving-dinner',
    title: 'Thanksgiving Dinner Gathering',
    category: 'Holiday Milestone',
    targetDate: '2026-11-26T17:00:00',
    tagline: 'Family & Friends • Autumn Celebration',
    theme: 'solar',
    dailyAnchor: 'Preparation creates presence. Host with calm joy.',
    milestones: [
      { id: 1, tLabel: 'T-14', title: 'Finalize guest headcount', date: 'Nov 12', done: true, note: 'Confirm dietary preferences' },
      { id: 2, tLabel: 'T-7', title: 'Order centerpiece & turkey', date: 'Nov 19', done: true, note: 'Verify recipe equipment' },
      { id: 3, tLabel: 'T-3', title: 'Complete dry grocery haul', date: 'Nov 23', done: false, note: 'Deep clean dinner tables' },
      { id: 4, tLabel: 'T-1', title: 'Prep marinades & sides', date: 'Nov 25', done: false, note: 'Bake pies and chill wines' },
      { id: 5, tLabel: 'T-0', title: 'Host dinner gathering', date: 'Nov 26', done: false, note: 'Carve turkey and celebrate' }
    ]
  },
  {
    id: 'startup-launch',
    title: 'Version 1.0 Public Release',
    category: 'Product Launch',
    targetDate: '2026-12-01T08:00:00',
    tagline: 'Production Deploy • Global Distribution',
    theme: 'swiss',
    dailyAnchor: 'Remove friction from the core loop. Ship what works.',
    milestones: [
      { id: 1, tLabel: 'T-14', title: 'Feature freeze & migration', date: 'Nov 24', done: true, note: 'All end-to-end user flows verified' },
      { id: 2, tLabel: 'T-7', title: 'Staging auth & billing audit', date: 'Nov 26', done: false, note: 'Simulated 500 checkout sessions' },
      { id: 3, tLabel: 'T-3', title: 'Demo walkthrough & asset lock', date: 'Nov 28', done: false, note: '45-second product video' },
      { id: 4, tLabel: 'T-1', title: 'Release candidate deployment', date: 'Nov 30', done: false, note: 'Canary cluster primed on edge' },
      { id: 5, tLabel: 'T-0', title: 'Production DNS switch', date: 'Dec 01', done: false, note: 'Live customer onboarding' }
    ]
  }
];

export const DEVICE_PROFILES = {
  iphone16pro: {
    id: 'iphone16pro',
    name: 'iPhone 16 Pro',
    aspect: 'aspect-[9/19.5]',
    width: 390,
    height: 844
  },
  pixel9pro: {
    id: 'pixel9pro',
    name: 'Pixel 9 Pro',
    aspect: 'aspect-[9/20]',
    width: 392,
    height: 852
  },
  desktop4k: {
    id: 'desktop4k',
    name: 'MacBook Pro 16"',
    aspect: 'aspect-[16/10]',
    width: 780,
    height: 488
  }
};
