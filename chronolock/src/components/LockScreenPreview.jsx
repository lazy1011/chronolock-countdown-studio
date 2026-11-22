import React, { forwardRef } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Flashlight, 
  Camera, 
  Wifi, 
  Battery, 
  Signal, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { PRESET_THEMES, DEVICE_PROFILES } from '../constants/presets';

const LockScreenPreview = forwardRef(({
  deadline,
  milestones,
  themeId,
  deviceProfileId,
  showOsOverlay,
  showSafeZones,
  timeRemaining
}, ref) => {
  const theme = PRESET_THEMES[themeId] || PRESET_THEMES.titanium;
  const isDesktop = deviceProfileId === 'desktop4k';

  const completedCount = milestones.filter(m => m.done).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;
  
  // Active milestone is the first non-completed item
  const activeMilestoneIndex = milestones.findIndex(m => !m.done);

  // Formatted date and time for lockscreen OS overlay
  const now = new Date();
  const osTimeFormatted = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  const osDateFormatted = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="relative flex justify-center items-center w-full select-none">
      {/* Physical Device Chassis */}
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
            background: theme.wallpaperBg,
            color: theme.textPrimary
          }}
        >
          {/* Subtle Ambient Vignette */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-40" 
            style={{ backgroundImage: theme.overlayMesh }}
          />

          {/* Safe Zone Visualizer (When User Toggles It On) */}
          {showSafeZones && (
            <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-between border border-dashed border-rose-500/50">
              <div className="h-32 bg-rose-500/10 border-b border-dashed border-rose-500/30 flex items-center justify-center">
                <span className="text-[10px] font-mono text-rose-300 bg-black/80 px-2 py-0.5 rounded border border-rose-500/40">
                  Reserved Safe Zone: System Clock & Dynamic Island
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center bg-emerald-500/5">
                <span className="text-[10px] font-mono text-emerald-300 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  Primary Canvas: Countdown & Milestones
                </span>
              </div>
              <div className="h-20 bg-rose-500/10 border-t border-dashed border-rose-500/30 flex items-center justify-center">
                <span className="text-[10px] font-mono text-rose-300 bg-black/80 px-2 py-0.5 rounded border border-rose-500/40">
                  Reserved Safe Zone: Hardware Shortcuts & Home Bar
                </span>
              </div>
            </div>
          )}

          {/* TOP SECTION: Hardware Notch & iOS Clock */}
          <div className="relative z-20 pt-2 px-6 flex flex-col items-center">
            {/* Status Bar */}
            {!isDesktop && (
              <div className="w-full flex justify-between items-center pt-1.5 px-2 text-white text-xs font-semibold tracking-tight">
                <span>{osTimeFormatted}</span>
                {deviceProfileId === 'iphone16pro' ? (
                  <div className="h-6 w-28 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-neutral-800">
                    <div className="h-2.5 w-2.5 rounded-full bg-neutral-900 flex items-center justify-center">
                      <div className="h-1 w-1 rounded-full bg-blue-950" />
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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

            {/* Simulated Native iOS 18 Clock */}
            {showOsOverlay && !isDesktop && (
              <div className="mt-4 text-center">
                <p className="text-xs font-medium text-neutral-300 tracking-wide">
                  {osDateFormatted}
                </p>
                <h1 className="text-6xl font-light tracking-tight text-white font-sans -mt-0.5">
                  {osTimeFormatted}
                </h1>
              </div>
            )}
          </div>

          {/* MIDDLE SECTION: COUNTDOWN & BACKWARD MILESTONES */}
          <div className="relative z-20 flex-1 flex flex-col justify-center px-5 py-2">
            {/* Project Title & Category */}
            <div className="text-center mb-3">
              <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block mb-0.5">
                {deadline.category || 'Target Deadline'}
              </span>
              <h2 className="text-base font-bold text-white tracking-tight leading-tight">
                {deadline.title}
              </h2>
            </div>

            {/* Countdown Grid (Tabular Precision) */}
            <div className="mb-4 p-3 rounded-2xl bg-neutral-900/60 border border-white/5">
              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div className="py-2 px-1 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl font-bold font-mono tracking-tight text-white block leading-none tabular-nums">
                    {String(timeRemaining.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider mt-1 block">Days</span>
                </div>
                <div className="py-2 px-1 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl font-bold font-mono tracking-tight text-white block leading-none tabular-nums">
                    {String(timeRemaining.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider mt-1 block">Hours</span>
                </div>
                <div className="py-2 px-1 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-2xl font-bold font-mono tracking-tight text-white block leading-none tabular-nums">
                    {String(timeRemaining.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider mt-1 block">Mins</span>
                </div>
                <div className="py-2 px-1 rounded-xl bg-black/40 border border-white/5 relative">
                  <span 
                    className="text-2xl font-bold font-mono tracking-tight block leading-none tabular-nums"
                    style={{ color: theme.accent }}
                  >
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wider mt-1 block">Secs</span>
                </div>
              </div>

              {/* Minimal Roadmap Progress */}
              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Roadmap: <strong className="text-white">{completedCount}/{milestones.length} Completed</strong></span>
                </div>
                <span className="font-mono text-neutral-200">{progressPercent}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%`, backgroundColor: theme.accent }}
                />
              </div>
            </div>

            {/* Backward Milestones Timeline */}
            <div className="space-y-1 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-neutral-800">
              {milestones.slice(0, 4).map((m, idx) => {
                const isCurrentActive = !m.done && idx === activeMilestoneIndex;

                return (
                  <div 
                    key={m.id || idx}
                    className={`relative flex items-start gap-2.5 p-2 rounded-xl transition ${
                      isCurrentActive 
                        ? 'bg-white/5 border border-white/10' 
                        : 'border border-transparent'
                    }`}
                  >
                    {/* Status Beacon */}
                    <div className="relative z-10 flex-shrink-0 mt-0.5">
                      {m.done ? (
                        <div className="w-4 h-4 rounded-full bg-neutral-800 border border-neutral-600 flex items-center justify-center text-white">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        </div>
                      ) : isCurrentActive ? (
                        <div 
                          className="w-4 h-4 rounded-full border-2 flex items-center justify-center bg-black"
                          style={{ borderColor: theme.accent }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                          <Circle className="w-1.5 h-1.5 text-neutral-700" />
                        </div>
                      )}
                    </div>

                    {/* Milestone Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-medium truncate ${isCurrentActive ? 'text-white font-semibold' : m.done ? 'text-neutral-500 line-through' : 'text-neutral-400'}`}>
                          {m.title}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-500 ml-1 flex-shrink-0">
                          {m.date}
                        </span>
                      </div>
                      {isCurrentActive && m.note && (
                        <p className="text-[10px] text-neutral-300 mt-0.5 truncate flex items-center gap-1">
                          <ArrowUpRight className="w-2.5 h-2.5 text-neutral-400" />
                          <span>{m.note}</span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Daily Motivational Focus Anchor */}
            {deadline.dailyAnchor && (
              <div className="mt-3 text-center">
                <p className="text-[11px] text-neutral-400 font-serif italic">
                  "{deadline.dailyAnchor}"
                </p>
              </div>
            )}
          </div>

          {/* BOTTOM SECTION: Hardware Flashlight, Camera & Home Swipe Bar */}
          {!isDesktop && (
            <div className="relative z-20 pb-4 pt-1 px-8 flex flex-col items-center">
              <div className="w-full flex justify-between items-center text-white/90">
                <button 
                  type="button" 
                  aria-label="Flashlight"
                  className="w-11 h-11 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center hover:bg-neutral-800 transition active:scale-95"
                >
                  <Flashlight className="w-4 h-4" />
                </button>

                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500">
                  Lock Screen
                </span>

                <button 
                  type="button" 
                  aria-label="Camera"
                  className="w-11 h-11 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center hover:bg-neutral-800 transition active:scale-95"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-32 h-1 bg-white/60 rounded-full mt-3" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

LockScreenPreview.displayName = 'LockScreenPreview';

export default LockScreenPreview;
