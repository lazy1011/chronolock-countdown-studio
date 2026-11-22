import React, { forwardRef } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Compass, 
  Sparkles, 
  Flame, 
  Flashlight, 
  Camera, 
  Wifi, 
  BatteryMedium, 
  Signal, 
  Clock, 
  Target,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { PRESET_THEMES, DEVICE_PROFILES } from '../constants/presets';

const LockScreenPreview = forwardRef(({
  deadline,
  milestones,
  themeId,
  deviceProfileId,
  showOsOverlay,
  showSafeZones,
  timeRemaining,
  isLiveMode = false
}, ref) => {
  const theme = PRESET_THEMES[themeId] || PRESET_THEMES.obsidian;
  const device = DEVICE_PROFILES[deviceProfileId] || DEVICE_PROFILES.iphone16pro;

  const completedCount = milestones.filter(m => m.done).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;
  
  // Find current active milestone (first non-completed milestone)
  const activeMilestoneIndex = milestones.findIndex(m => !m.done);
  const activeMilestone = activeMilestoneIndex !== -1 ? milestones[activeMilestoneIndex] : null;

  const isDesktop = deviceProfileId === 'desktop4k';

  // Format real current time for lock screen OS overlay
  const now = new Date();
  const osTimeFormatted = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
  const osDateFormatted = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="relative flex justify-center items-center w-full select-none">
      {/* Device Chassis Outer Frame */}
      <div 
        className={`relative transition-all duration-300 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-[48px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-[3px] border-slate-700/80 ${
          isDesktop ? 'w-full max-w-4xl aspect-[16/10] rounded-2xl p-2.5' : 'w-full max-w-[380px] aspect-[9/19.5]'
        }`}
      >
        {/* Device Screen Bezel */}
        <div 
          ref={ref}
          id="lockscreen-canvas-target"
          className={`relative w-full h-full overflow-hidden bg-slate-950 flex flex-col justify-between ${
            isDesktop ? 'rounded-xl' : 'rounded-[40px]'
          }`}
          style={{
            backgroundImage: theme.meshBg,
            backgroundColor: '#030712'
          }}
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent pointer-events-none" />
          
          {/* Safe Zone Visualizer Overlay (Helps user see where OS widgets sit) */}
          {showSafeZones && (
            <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-between border-2 border-dashed border-rose-500/40">
              <div className="h-32 bg-rose-500/10 border-b border-rose-500/30 flex items-center justify-center">
                <span className="text-[10px] font-mono text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">
                  SAFE ZONE: OS Clock & Dynamic Island
                </span>
              </div>
              <div className="flex-1 flex items-center justify-center border-y border-dashed border-emerald-500/30 bg-emerald-500/5">
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                  PRIMARY CONTENT CANVAS (Safe for Milestones & Countdown)
                </span>
              </div>
              <div className="h-24 bg-rose-500/10 border-t border-rose-500/30 flex items-center justify-center">
                <span className="text-[10px] font-mono text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/40">
                  SAFE ZONE: Flashlight, Camera & Swipe Bar
                </span>
              </div>
            </div>
          )}

          {/* TOP SECTION: Phone Hardware Notch / Status Bar & OS Clock */}
          <div className="relative z-20 pt-2 px-6 flex flex-col items-center">
            {/* Dynamic Island or Camera Punch */}
            {!isDesktop && (
              <div className="w-full flex justify-between items-center pt-1.5 px-2 text-white/90 text-xs font-semibold">
                <span>{osTimeFormatted}</span>
                {deviceProfileId === 'iphone16pro' ? (
                  <div className="h-6 w-28 bg-black rounded-full flex items-center justify-between px-2.5 shadow-inner border border-slate-800/60">
                    <div className="h-2.5 w-2.5 rounded-full bg-slate-900 flex items-center justify-center">
                      <div className="h-1 w-1 rounded-full bg-blue-900" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] text-emerald-400 font-mono tracking-tighter">AI</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-3.5 w-3.5 rounded-full bg-black border border-slate-700/60" />
                )}
                <div className="flex items-center gap-1.5 text-white/80">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <div className="flex items-center">
                    <span className="text-[10px] font-mono mr-0.5">88%</span>
                    <BatteryMedium className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Mac Notch / Top Menu Bar */}
            {isDesktop && (
              <div className="w-full flex justify-between items-center py-1 px-4 text-slate-300 text-xs border-b border-white/5 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  </div>
                  <span className="font-semibold text-white tracking-wide">ChronoLock</span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span>{osDateFormatted}</span>
                  <span className="font-bold text-white">{osTimeFormatted}</span>
                </div>
              </div>
            )}

            {/* Realistic OS Clock Overlay (Cleanly separated in designated top space) */}
            {showOsOverlay && !isDesktop && (
              <div className="mt-3 text-center transition-all animate-fadeIn">
                <p className="text-xs font-medium tracking-wide uppercase text-slate-300/80 drop-shadow-md">
                  {osDateFormatted}
                </p>
                <h1 className="text-6xl font-light tracking-tight text-white/95 font-sans drop-shadow-lg -mt-0.5">
                  {osTimeFormatted}
                </h1>
                {/* Minimal iOS-style lock screen widget pill */}
                <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] text-white/90 shadow-sm">
                  <Target className="w-3 h-3 text-cyan-400" />
                  <span className="font-medium truncate max-w-[200px]">{deadline.title}</span>
                  <span className="font-mono font-bold text-emerald-400">T-{timeRemaining.days}d</span>
                </div>
              </div>
            )}
          </div>

          {/* MIDDLE SECTION: MAIN COUNTDOWN & MILESTONE FLIGHTDECK */}
          <div className="relative z-20 flex-1 flex flex-col justify-center px-5 py-2 overflow-y-auto">
            {/* Header Tagline & Deadline Title */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-1.5">
                <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-300">
                  {deadline.category || 'High Stakes Deadline'}
                </span>
              </div>
              <h2 className="text-lg font-extrabold tracking-tight text-white leading-tight drop-shadow-md">
                {deadline.title}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium tracking-normal mt-0.5">
                {deadline.tagline}
              </p>
            </div>

            {/* The Big Countdown Digits Grid */}
            <div className="mb-3.5 p-3 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-xl shadow-xl">
              <div className="grid grid-cols-4 gap-1.5 text-center">
                <div className="flex flex-col items-center bg-black/40 rounded-xl py-2 px-1 border border-white/5">
                  <span className="text-2xl font-black text-white font-mono tracking-tight leading-none">
                    {String(timeRemaining.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Days</span>
                </div>
                <div className="flex flex-col items-center bg-black/40 rounded-xl py-2 px-1 border border-white/5">
                  <span className="text-2xl font-black text-white font-mono tracking-tight leading-none">
                    {String(timeRemaining.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Hours</span>
                </div>
                <div className="flex flex-col items-center bg-black/40 rounded-xl py-2 px-1 border border-white/5">
                  <span className="text-2xl font-black text-white font-mono tracking-tight leading-none">
                    {String(timeRemaining.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Mins</span>
                </div>
                <div className="flex flex-col items-center bg-black/40 rounded-xl py-2 px-1 border border-white/5 relative overflow-hidden">
                  <span className="text-2xl font-black text-amber-400 font-mono tracking-tight leading-none">
                    {String(timeRemaining.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mt-1">Secs</span>
                  {/* Subtle ticking pulse */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                </div>
              </div>

              {/* Progress Bar & Milestone Status */}
              <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Roadmap: <strong className="text-white">{completedCount}/{milestones.length} Done</strong></span>
                </div>
                <span className="font-mono font-bold text-cyan-400">{progressPercent}% Locked</span>
              </div>
              <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-1.5 overflow-hidden p-0.5">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* BACKWARD MILESTONE CHECKPOINTS (Vertical Flightdeck) */}
            <div className="space-y-1.5 mb-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-indigo-400" /> Checkpoint Sequence
                </span>
                <span className="text-[9px] font-mono text-slate-500">Target: {new Date(deadline.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>

              <div className="space-y-1 relative before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-[1.5px] before:bg-white/10">
                {milestones.slice(0, 4).map((m, idx) => {
                  const isCurrentActive = !m.done && (idx === activeMilestoneIndex);

                  return (
                    <div 
                      key={m.id || idx}
                      className={`relative flex items-start gap-2.5 p-2 rounded-xl border transition-all ${
                        m.done 
                          ? 'bg-slate-900/40 border-emerald-500/20 text-slate-400' 
                          : isCurrentActive
                            ? 'bg-indigo-950/60 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.25)] text-white'
                            : 'bg-slate-950/30 border-white/5 text-slate-500'
                      }`}
                    >
                      {/* Status Icon */}
                      <div className="relative z-10 flex-shrink-0 mt-0.5">
                        {m.done ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        ) : isCurrentActive ? (
                          <div className="w-5 h-5 rounded-full bg-indigo-500 border border-white flex items-center justify-center text-white animate-pulse">
                            <Flame className="w-3 h-3 text-amber-300" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-600">
                            <Circle className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-xs font-semibold truncate ${isCurrentActive ? 'text-indigo-200 font-bold' : m.done ? 'text-slate-300 line-through' : 'text-slate-400'}`}>
                            {m.title}
                          </h4>
                          <span className="text-[9px] font-mono text-slate-400 ml-1 flex-shrink-0">
                            {m.date}
                          </span>
                        </div>
                        {isCurrentActive && m.note && (
                          <p className="text-[10px] text-indigo-300/90 font-medium tracking-tight mt-0.5 flex items-center gap-1">
                            <ArrowRight className="w-2.5 h-2.5 text-cyan-400 flex-shrink-0" />
                            <span className="truncate">{m.note}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MOTIVATIONAL FOCUS ANCHOR (Glanceable Cognitive Trigger) */}
            {deadline.dailyAnchor && (
              <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-950/40 border border-indigo-500/20 text-center">
                <p className="text-[10px] italic text-indigo-200/90 font-serif">
                  {deadline.dailyAnchor}
                </p>
              </div>
            )}
          </div>

          {/* BOTTOM SECTION: Lock Screen OS Hardware Controls */}
          {!isDesktop && (
            <div className="relative z-20 pb-4 pt-1 px-8 flex flex-col items-center">
              <div className="w-full flex justify-between items-center text-white/80">
                <button 
                  type="button" 
                  aria-label="Flashlight"
                  className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition active:scale-95"
                >
                  <Flashlight className="w-5 h-5" />
                </button>

                <div className="text-center">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-white/40">
                    Handshake × Google AI
                  </span>
                </div>

                <button 
                  type="button" 
                  aria-label="Camera"
                  className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/20 transition active:scale-95"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>

              {/* iOS Home Indicator Bar */}
              <div className="w-32 h-1 bg-white/70 rounded-full mt-3 shadow-sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

LockScreenPreview.displayName = 'LockScreenPreview';

export default LockScreenPreview;
