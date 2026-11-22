import React, { forwardRef } from 'react';
import { 
  CheckSquare, 
  Square, 
  Flashlight, 
  Camera, 
  Wifi, 
  Battery, 
  Signal,
  Lock,
  Phone
} from 'lucide-react';
import { WALLPAPER_BACKGROUNDS, DEVICE_PROFILES } from '../constants/presets';

const LockScreenPreview = forwardRef(({
  deadline,
  milestones,
  selectedBgId = 'doraemon-sunset',
  customPalette,
  deviceProfileId = 'android',
  clockStyle = 'stacked', // 'stacked' (two-line) | 'classic' (single-line)
  showOsOverlay,
  showSafeZones,
  timeRemaining
}, ref) => {
  const isDesktop = deviceProfileId === 'desktop4k';
  const isAndroid = deviceProfileId === 'android';
  const device = DEVICE_PROFILES[deviceProfileId] || DEVICE_PROFILES.android;

  // Find active 3D wallpaper preset (defaults to user's sunset anime wallpaper!)
  const activeBg = WALLPAPER_BACKGROUNDS.find(w => w.id === selectedBgId) || WALLPAPER_BACKGROUNDS[0];

  const wallpaperBackground = customPalette?.bg || activeBg.bg;
  const accentColor = customPalette?.accent || activeBg.accent;
  const textPrimaryColor = customPalette?.text || '#ffffff';

  const completedCount = milestones.filter(m => m.done).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  // Real current date and time
  const now = new Date();
  const currentHours = String(now.getHours()).padStart(2, '0');
  const currentMinutes = String(now.getMinutes()).padStart(2, '0');
  const osTimeFormatted = `${currentHours}:${currentMinutes}`;
  
  // Format matching user's phone: "Sun, 22 November"
  const dayName = now.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum = now.getDate();
  const monthName = now.toLocaleDateString('en-US', { month: 'long' });
  const osDateFormatted = `${dayName}, ${dayNum} ${monthName}`;

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
          className={`relative w-full h-full overflow-hidden flex flex-col ${
            isDesktop ? 'rounded-xl justify-between' : 'rounded-[44px]'
          }`}
          style={{
            background: wallpaperBackground,
            color: textPrimaryColor
          }}
        >
          {/* Subtle Contrast Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/60 pointer-events-none" />

          {/* Safe Zone Visualizer */}
          {showSafeZones && (
            <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-between border border-dashed border-rose-500/50">
              <div className="h-44 bg-rose-500/10 border-b border-dashed border-rose-500/30 flex items-center justify-center">
                <span className="text-[10px] font-mono text-rose-300 bg-black/80 px-2 py-0.5 rounded border border-rose-500/40">
                  Clean Safe Zone: System Clock & Notification Area
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center bg-emerald-500/5">
                <span className="text-[10px] font-mono text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  T-Minus Countdown & Checkpoints Canvas
                </span>
              </div>
              <div className="h-20 bg-rose-500/10 border-t border-dashed border-rose-500/30 flex items-center justify-center">
                <span className="text-[10px] font-mono text-rose-300 bg-black/80 px-2 py-0.5 rounded border border-rose-500/40">
                  Hardware Shortcuts & Home Swipe Bar
                </span>
              </div>
            </div>
          )}

          {/* TOP SECTION: HARDWARE STATUS BAR & CLOCK */}
          <div className="relative z-20 pt-2.5 px-5 flex flex-col items-center w-full">
            {/* Absolute Centered Hardware Notch / Dynamic Island / Camera Punch Hole */}
            {!isDesktop && (
              <>
                {deviceProfileId === 'iphone16pro' ? (
                  /* iPhone 16 Pro Dynamic Island (Centered mathematically at 50%) */
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 h-7 w-28 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md border border-neutral-800">
                    <div className="h-2.5 w-2.5 rounded-full bg-neutral-900 flex items-center justify-center">
                      <div className="h-1 w-1 rounded-full bg-blue-950" />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
                  </div>
                ) : (
                  /* Android Top Center Punch-Hole Camera (Centered mathematically at 50%) */
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 w-3 h-3 rounded-full bg-black/90 border border-neutral-700/60 shadow-sm flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-neutral-800" />
                  </div>
                )}
              </>
            )}

            {/* Status Bar */}
            {!isDesktop && (
              <div className="w-full flex justify-between items-center text-white text-xs font-semibold tracking-tight relative z-20 pt-0.5">
                {/* Left: Carrier signal matching user's phone */}
                <div className="flex items-center gap-1.5 text-[11px] font-normal text-white/95">
                  {isAndroid ? (
                    <>
                      <span className="tracking-tight font-medium">5G | Jio • BSNL</span>
                      <span className="text-[10px] opacity-75 font-bold">M</span>
                      <span className="text-[10px] opacity-75 font-bold">✓</span>
                    </>
                  ) : (
                    <span className="text-xs font-semibold pl-1">{osTimeFormatted}</span>
                  )}
                </div>

                {/* Right: Status Icons with Battery Capsule */}
                <div className="flex items-center gap-1.5 text-white/95">
                  {isAndroid ? (
                    <>
                      <div className="flex items-center text-[10px]">
                        <Wifi className="w-3.5 h-3.5" />
                        <span className="text-[8px] font-bold font-mono -ml-0.5 mb-1">6</span>
                      </div>
                      <Signal className="w-3.5 h-3.5" />
                      <div className="h-4 px-1 rounded-md bg-white/25 border border-white/40 flex items-center justify-center text-[10px] font-bold font-mono leading-none">
                        99
                      </div>
                    </>
                  ) : (
                    <>
                      <Signal className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold font-mono">5G</span>
                      <Battery className="w-4 h-4" />
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Desktop Top Menu Bar */}
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

            {/* Simulated Lock Screen Clock (Faithfully matching user's phone inspiration & OriginOS 7!) */}
            {showOsOverlay && !isDesktop && (
              <div className="w-full flex flex-col items-center justify-center transition-all duration-300 animate-fadeIn">
                {/* Centered Closed Padlock Icon (Directly above clock digits) */}
                <div className={`flex items-center justify-center ${deviceProfileId === 'iphone16pro' ? 'mt-4 mb-0.5' : 'mt-2 mb-0.5'}`}>
                  <Lock className="w-4 h-4 text-white drop-shadow-md transition-transform duration-300 hover:scale-110" />
                </div>

                {clockStyle === 'stacked' || (isAndroid && clockStyle !== 'classic') ? (
                  /* Two-Line Stacked Clock (OriginOS / HyperOS Fluid Style) */
                  <div className="flex flex-col items-center leading-[0.78] select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
                    <span className="text-[76px] font-light tracking-tight text-white font-sans tabular-nums drop-shadow-md">
                      {currentHours}
                    </span>
                    <span className="text-[76px] font-light tracking-tight text-white font-sans mt-0.5 tabular-nums drop-shadow-md">
                      {currentMinutes}
                    </span>
                    <span className="text-xs font-medium text-white/95 tracking-wide mt-1.5 drop-shadow">
                      {osDateFormatted}
                    </span>
                  </div>
                ) : (
                  /* Classic Single-Line iOS / Standard Clock with Live Pulsing Colon */
                  <div className="flex flex-col items-center select-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.65)] mt-0.5">
                    <p className="text-xs font-medium text-neutral-200 tracking-wide drop-shadow-md mb-0.5">
                      {osDateFormatted}
                    </p>
                    <h1 className="text-6xl font-light tracking-tight text-white font-sans drop-shadow-lg tabular-nums flex items-center">
                      <span>{currentHours}</span>
                      <span className="animate-pulse opacity-90 mx-0.5">:</span>
                      <span>{currentMinutes}</span>
                    </h1>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MIDDLE SECTION: T-MINUS TITLE, DIGITS & CHECKBOX MILESTONES (Tight OriginOS Gap!) */}
          <div className={`relative z-20 w-full px-4 flex flex-col items-center transition-all ${
            showOsOverlay ? 'mt-2 mb-2' : 'my-auto pt-16'
          }`}>
            {/* Official T-Minus Title Header */}
            <div className="text-center mb-1.5 w-full">
              <span className="text-[8px] font-mono tracking-widest uppercase block mb-0.5 text-white/80 drop-shadow">
                DEADLINE COUNTDOWN
              </span>
              <h2 className="text-[11px] font-bold tracking-tight text-white leading-tight uppercase font-mono drop-shadow truncate px-2">
                {displayTitle}
              </h2>
            </div>

            {/* Precision Digits Card (Frosted Glass Depth) */}
            <div className="w-full mb-1.5 p-2 rounded-2xl bg-black/45 border border-white/20 backdrop-blur-xl shadow-xl">
              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div className="py-1 px-1 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-lg font-bold font-mono tracking-tight text-white block leading-none tabular-nums">
                    {String(timeRemaining.days).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-semibold text-neutral-300 uppercase tracking-wider mt-1 block">Days</span>
                </div>
                <div className="py-1 px-1 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-lg font-bold font-mono tracking-tight text-white block leading-none tabular-nums">
                    {String(timeRemaining.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-semibold text-neutral-300 uppercase tracking-wider mt-1 block">Hours</span>
                </div>
                <div className="py-1 px-1 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-lg font-bold font-mono tracking-tight text-white block leading-none tabular-nums">
                    {String(timeRemaining.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-semibold text-neutral-300 uppercase tracking-wider mt-1 block">Mins</span>
                </div>
                <div className="py-1 px-1 rounded-xl bg-black/50 border border-white/10">
                  <span 
                    className="text-lg font-bold font-mono tracking-tight block leading-none tabular-nums animate-pulse"
                    style={{ color: accentColor }}
                  >
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-semibold text-neutral-300 uppercase tracking-wider mt-1 block">Secs</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-1.5 pt-1 border-t border-white/10 flex items-center justify-between text-[9px] text-neutral-300">
                <span>Checkpoints: <strong className="text-white">{completedCount}/{milestones.length}</strong></span>
                <span className="font-mono text-neutral-200">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white/15 h-1 rounded-full mt-0.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%`, backgroundColor: accentColor }}
                />
              </div>
            </div>

            {/* Checkbox Milestones (Under 5 words each, compact fluid OriginOS card) */}
            <div className="w-full space-y-1 bg-black/45 p-2 rounded-2xl border border-white/20 backdrop-blur-xl shadow-lg">
              {milestones.slice(0, 4).map((m, idx) => (
                <div 
                  key={m.id || idx}
                  className={`flex items-center justify-between px-1.5 py-0.5 rounded-xl transition ${
                    m.done ? 'text-neutral-400' : 'text-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    {m.done ? (
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                    )}
                    <span className={`text-[11px] font-medium truncate ${m.done ? 'line-through text-neutral-400' : 'text-white font-medium'}`}>
                      <strong className="font-mono text-[10px] mr-1" style={{ color: m.done ? undefined : accentColor }}>
                        {m.tLabel || `T-${Math.max(0, 14 - idx * 4)}`}:
                      </strong>
                      {m.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-neutral-400 ml-2 flex-shrink-0">
                    {m.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM SECTION: Phone Call & Camera Shortcuts (Matching User's Lock Screen!) */}
          {!isDesktop && showOsOverlay && (
            <div className="relative z-20 pb-3 pt-1 px-8 flex flex-col items-center mt-auto">
              <div className="w-full flex justify-between items-center text-white">
                {/* Left Bottom Shortcut */}
                {isAndroid ? (
                  <button 
                    type="button" 
                    aria-label="Phone"
                    className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition active:scale-95 shadow-lg"
                  >
                    <Phone className="w-5 h-5 text-white" />
                  </button>
                ) : (
                  <button 
                    type="button" 
                    aria-label="Flashlight"
                    className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition active:scale-95 shadow-lg"
                  >
                    <Flashlight className="w-5 h-5 text-white" />
                  </button>
                )}

                {/* Right Bottom Shortcut: Camera */}
                <button 
                  type="button" 
                  aria-label="Camera"
                  className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-black/60 transition active:scale-95 shadow-lg"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Home / Gesture navigation indicator bar */}
              <div className="w-28 h-1 bg-white/70 rounded-full mt-2 shadow-sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

LockScreenPreview.displayName = 'LockScreenPreview';

export default LockScreenPreview;
