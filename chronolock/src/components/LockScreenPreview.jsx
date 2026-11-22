import React, { forwardRef } from 'react';
import { 
  CheckSquare, 
  Square, 
  Flashlight, 
  Camera, 
  Wifi, 
  Battery, 
  Signal
} from 'lucide-react';
import { WALLPAPER_BACKGROUNDS, DEVICE_PROFILES } from '../constants/presets';

const LockScreenPreview = forwardRef(({
  deadline,
  milestones,
  selectedBgId = 'cosmic-nebula',
  customPalette,
  deviceProfileId,
  showOsOverlay,
  showSafeZones,
  timeRemaining
}, ref) => {
  const isDesktop = deviceProfileId === 'desktop4k';

  // Find active 3D wallpaper preset
  const activeBg = WALLPAPER_BACKGROUNDS.find(w => w.id === selectedBgId) || WALLPAPER_BACKGROUNDS[0];

  const wallpaperBackground = customPalette?.bg || activeBg.bg;
  const accentColor = customPalette?.accent || activeBg.accent;
  const textPrimaryColor = customPalette?.text || '#ffffff';

  const completedCount = milestones.filter(m => m.done).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  // Format real current time for simulated OS overlay
  const now = new Date();
  const osTimeFormatted = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  const osDateFormatted = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Official prompt title format
  const displayTitle = `T-MINUS COUNTDOWN: ${deadline.title.toUpperCase()}`;

  return (
    <div className="relative flex justify-center items-center w-full select-none">
      {/* Physical Device Frame */}
      <div 
        className={`relative transition-all duration-300 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.95)] p-3 bg-[#18181b] rounded-[52px] border border-neutral-700/80 ${
          isDesktop 
            ? 'w-full max-w-4xl aspect-[16/10] rounded-2xl p-2.5' 
            : 'w-full max-w-[375px] aspect-[9/19.5]'
        }`}
      >
        {/* Device Inner Screen Canvas */}
        <div 
          ref={ref}
          id="lockscreen-canvas-target"
          className={`relative w-full h-full overflow-hidden flex flex-col justify-between ${
            isDesktop ? 'rounded-xl' : 'rounded-[44px]'
          }`}
          style={{
            background: wallpaperBackground,
            color: textPrimaryColor
          }}
        >
          {/* Subtle 3D Depth Specular Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/40 pointer-events-none" />

          {/* Safe Zone Visualizer */}
          {showSafeZones && (
            <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-between border border-dashed border-rose-500/50">
              <div className="h-36 bg-rose-500/10 border-b border-dashed border-rose-500/30 flex items-center justify-center">
                <span className="text-[10px] font-mono text-rose-300 bg-black/80 px-2 py-0.5 rounded border border-rose-500/40">
                  Clean Space: Reserved for System Clock & Widgets
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center bg-emerald-500/5">
                <span className="text-[10px] font-mono text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  T-Minus Flightdeck & Checkpoints
                </span>
              </div>
              <div className="h-20 bg-rose-500/10 border-t border-dashed border-rose-500/30 flex items-center justify-center">
                <span className="text-[10px] font-mono text-rose-300 bg-black/80 px-2 py-0.5 rounded border border-rose-500/40">
                  Hardware Shortcuts & Home Swipe Bar
                </span>
              </div>
            </div>
          )}

          {/* TOP 35%: CLEAN SPACE FOR CLOCK & ICONS */}
          <div className="relative z-20 pt-2 px-6 flex flex-col items-center min-h-[140px]">
            {/* Native Status Bar */}
            {!isDesktop && (
              <div className="w-full flex justify-between items-center pt-1.5 px-2 text-white text-xs font-semibold tracking-tight">
                <span>{osTimeFormatted}</span>
                {deviceProfileId === 'iphone16pro' ? (
                  <div className="h-6 w-28 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-neutral-800">
                    <div className="h-2.5 w-2.5 rounded-full bg-neutral-900 flex items-center justify-center">
                      <div className="h-1 w-1 rounded-full bg-blue-950" />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  </div>
                ) : (
                  <div className="h-3 w-3 rounded-full bg-black border border-neutral-700" />
                )}
                <div className="flex items-center gap-1.5 text-white/90">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <Battery className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Desktop Top Bar */}
            {isDesktop && (
              <div className="w-full flex justify-between items-center py-1.5 px-4 text-neutral-400 text-xs border-b border-white/5 bg-black/40">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span className="font-semibold text-white">ChronoLock</span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span>{osDateFormatted}</span>
                  <span className="text-white font-bold">{osTimeFormatted}</span>
                </div>
              </div>
            )}

            {/* Simulated Native Clock (When enabled) */}
            {showOsOverlay && !isDesktop && (
              <div className="mt-4 text-center">
                <p className="text-xs font-medium text-neutral-300 tracking-wide drop-shadow-md">
                  {osDateFormatted}
                </p>
                <h1 className="text-6xl font-light tracking-tight text-white font-sans -mt-0.5 drop-shadow-lg">
                  {osTimeFormatted}
                </h1>
              </div>
            )}
          </div>

          {/* MIDDLE SECTION: T-MINUS TITLE, DIGITS & CHECKBOX MILESTONES */}
          <div className="relative z-20 flex-1 flex flex-col justify-center px-5 py-2">
            {/* Official T-Minus Title Header */}
            <div className="text-center mb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase block mb-1 text-neutral-300/80 drop-shadow">
                DEADLINE COUNTDOWN
              </span>
              <h2 className="text-sm font-bold tracking-tight text-white leading-tight uppercase font-mono drop-shadow">
                {displayTitle}
              </h2>
            </div>

            {/* Precision Digits Card (Frosted Glass Depth) */}
            <div className="mb-4 p-3 rounded-2xl bg-black/45 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div className="py-2 px-1 rounded-xl bg-black/50 border border-white/5">
                  <span className="text-2xl font-bold font-mono tracking-tight text-white block leading-none tabular-nums">
                    {String(timeRemaining.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider mt-1 block">Days</span>
                </div>
                <div className="py-2 px-1 rounded-xl bg-black/50 border border-white/5">
                  <span className="text-2xl font-bold font-mono tracking-tight text-white block leading-none tabular-nums">
                    {String(timeRemaining.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider mt-1 block">Hours</span>
                </div>
                <div className="py-2 px-1 rounded-xl bg-black/50 border border-white/5">
                  <span className="text-2xl font-bold font-mono tracking-tight text-white block leading-none tabular-nums">
                    {String(timeRemaining.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider mt-1 block">Mins</span>
                </div>
                <div className="py-2 px-1 rounded-xl bg-black/50 border border-white/5">
                  <span 
                    className="text-2xl font-bold font-mono tracking-tight block leading-none tabular-nums"
                    style={{ color: accentColor }}
                  >
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider mt-1 block">Secs</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-neutral-300">
                <span>Checkpoints: <strong className="text-white">{completedCount}/{milestones.length} Completed</strong></span>
                <span className="font-mono text-neutral-200">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%`, backgroundColor: accentColor }}
                />
              </div>
            </div>

            {/* The Biggest Milestones with Checkboxes (Under 5 words each) */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-300 block px-1 drop-shadow">
                KEY CHECKPOINTS
              </span>
              <div className="space-y-1 bg-black/50 p-2.5 rounded-2xl border border-white/10 backdrop-blur-xl shadow-lg">
                {milestones.slice(0, 5).map((m, idx) => (
                  <div 
                    key={m.id || idx}
                    className={`flex items-center justify-between p-1.5 rounded-xl transition ${
                      m.done ? 'text-neutral-400' : 'text-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {m.done ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                      )}
                      <span className={`text-xs font-medium truncate ${m.done ? 'line-through text-neutral-400' : 'text-white font-semibold'}`}>
                        <strong className="font-mono text-[11px] mr-1" style={{ color: m.done ? undefined : accentColor }}>
                          {m.tLabel || `T-${Math.max(0, 14 - idx * 4)}`}:
                        </strong>
                        {m.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 ml-2 flex-shrink-0">
                      {m.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION: Hardware Flashlight, Camera & Home Indicator */}
          {!isDesktop && (
            <div className="relative z-20 pb-4 pt-1 px-8 flex flex-col items-center">
              <div className="w-full flex justify-between items-center text-white">
                <button 
                  type="button" 
                  aria-label="Flashlight"
                  className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition active:scale-95 shadow-md"
                >
                  <Flashlight className="w-4 h-4" />
                </button>

                <span className="text-[9px] font-mono tracking-widest uppercase text-white/60 drop-shadow">
                  Lock Screen
                </span>

                <button 
                  type="button" 
                  aria-label="Camera"
                  className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition active:scale-95 shadow-md"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-32 h-1 bg-white/70 rounded-full mt-3 shadow-md" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

LockScreenPreview.displayName = 'LockScreenPreview';

export default LockScreenPreview;
