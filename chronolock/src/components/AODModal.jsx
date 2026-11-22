import React, { useEffect, useState } from 'react';
import { X, Clock, Battery, Signal, Wifi, CheckSquare, Sparkles } from 'lucide-react';

export default function AODModal({
  isOpen,
  onClose,
  deadline,
  milestones,
  timeRemaining
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const currentHours = String(currentTime.getHours()).padStart(2, '0');
  const currentMinutes = String(currentTime.getMinutes()).padStart(2, '0');
  const currentSeconds = String(currentTime.getSeconds()).padStart(2, '0');

  const dayName = currentTime.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNum = currentTime.getDate();
  const monthName = currentTime.toLocaleDateString('en-US', { month: 'long' });
  const aodDateFormatted = `${dayName}, ${dayNum} ${monthName}`;

  const completedCount = milestones.filter(m => m.done).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;
  const nextMilestone = milestones.find(m => !m.done) || milestones[milestones.length - 1];

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-6 sm:p-10 select-none cursor-pointer overflow-hidden animate-fadeIn"
      title="Click anywhere to wake screen"
    >
      {/* Top Low-Power OLED Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-neutral-500 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="tracking-widest uppercase text-[11px] text-neutral-400">
            AOD STANDBY • 1Hz LOW-POWER OLED
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <div className="h-4 px-1 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[10px] font-bold text-neutral-300">
              99%
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition"
            title="Exit Always-On Display"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Center Clock & Minimalist T-Minus Anchor */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto max-w-xl mx-auto w-full">
        {/* Large OLED Clock (OriginOS / HyperOS Clean Stack) */}
        <div className="flex flex-col items-center leading-[0.80] tracking-tight text-neutral-100 font-sans select-none mb-3">
          <span className="text-8xl sm:text-9xl font-extralight tracking-tighter opacity-95">
            {currentHours}
          </span>
          <span className="text-8xl sm:text-9xl font-extralight tracking-tighter opacity-95 mt-1">
            {currentMinutes}
          </span>
        </div>

        {/* Date and Live Pulsing Colon Seconds */}
        <div className="flex items-center gap-2 text-sm text-neutral-400 font-normal mb-8">
          <span>{aodDateFormatted}</span>
          <span className="text-neutral-600">•</span>
          <span className="font-mono text-xs text-neutral-400 font-light">
            :{currentSeconds}
          </span>
        </div>

        {/* Minimalist OLED Countdown Card */}
        <div className="w-full max-w-md p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 backdrop-blur-xl">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
            T-MINUS COUNTDOWN: {deadline.title.toUpperCase()}
          </span>

          <div className="grid grid-cols-4 gap-2 my-2.5 text-center font-mono">
            <div className="py-2 px-1 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
              <span className="text-2xl font-bold text-white block leading-none tabular-nums">
                {String(timeRemaining.days).padStart(2, '0')}
              </span>
              <span className="text-[8px] text-neutral-400 uppercase tracking-widest mt-1 block">Days</span>
            </div>
            <div className="py-2 px-1 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
              <span className="text-2xl font-bold text-white block leading-none tabular-nums">
                {String(timeRemaining.hours).padStart(2, '0')}
              </span>
              <span className="text-[8px] text-neutral-400 uppercase tracking-widest mt-1 block">Hours</span>
            </div>
            <div className="py-2 px-1 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
              <span className="text-2xl font-bold text-white block leading-none tabular-nums">
                {String(timeRemaining.minutes).padStart(2, '0')}
              </span>
              <span className="text-[8px] text-neutral-400 uppercase tracking-widest mt-1 block">Mins</span>
            </div>
            <div className="py-2 px-1 rounded-xl bg-neutral-900/60 border border-neutral-800/60">
              <span className="text-2xl font-bold text-amber-400 block leading-none tabular-nums">
                {String(timeRemaining.seconds).padStart(2, '0')}
              </span>
              <span className="text-[8px] text-neutral-400 uppercase tracking-widest mt-1 block">Secs</span>
            </div>
          </div>

          {/* Next Active Milestone Highlight */}
          {nextMilestone && (
            <div className="mt-3 pt-2.5 border-t border-neutral-850 flex items-center justify-between text-xs text-left">
              <div className="flex items-center gap-2 min-w-0">
                <CheckSquare className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="text-neutral-300 font-medium truncate">
                  <strong className="text-amber-400 font-mono text-[11px] mr-1">
                    {nextMilestone.tLabel || 'T-Next'}:
                  </strong>
                  {nextMilestone.title}
                </span>
              </div>
              <span className="font-mono text-[10px] text-neutral-500 flex-shrink-0 ml-2">
                {nextMilestone.date}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Dismiss / Wake Hint */}
      <div className="relative z-10 text-center text-[11px] text-neutral-600 font-mono tracking-wide">
        Tap anywhere or press Esc to wake screen
      </div>
    </div>
  );
}
