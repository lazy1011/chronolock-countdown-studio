import React, { useEffect, useState } from 'react';
import { X, Flame, ShieldCheck, Sparkles, Volume2, VolumeX, Maximize, Clock } from 'lucide-react';
import { PRESET_THEMES } from '../constants/presets';

export default function AODModal({
  isOpen,
  onClose,
  deadline,
  milestones,
  themeId,
  timeRemaining
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const theme = PRESET_THEMES[themeId] || PRESET_THEMES.obsidian;

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const completedCount = milestones.filter(m => m.done).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;
  const activeMilestone = milestones.find(m => !m.done) || milestones[milestones.length - 1];

  return (
    <div className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-between p-6 sm:p-12 select-none overflow-hidden animate-fadeIn">
      {/* Background ambient radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{ backgroundImage: theme.meshBg }}
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
            ALWAYS-ON STANDBY DISPLAY • {deadline.category}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition active:scale-95"
          title="Exit Always-On Display (Esc)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center Giant Countdown & Active Target */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-md">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-medium text-slate-300">
            Current Time: {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight drop-shadow-2xl mb-2">
          {deadline.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-xl font-medium mb-8">
          {deadline.tagline}
        </p>

        {/* Big Digits Grid */}
        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl w-full mb-8">
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl flex flex-col items-center">
            <span className="text-4xl sm:text-7xl font-black font-mono tracking-tight text-white leading-none">
              {String(timeRemaining.days).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-3">Days</span>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl flex flex-col items-center">
            <span className="text-4xl sm:text-7xl font-black font-mono tracking-tight text-white leading-none">
              {String(timeRemaining.hours).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-3">Hours</span>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl flex flex-col items-center">
            <span className="text-4xl sm:text-7xl font-black font-mono tracking-tight text-white leading-none">
              {String(timeRemaining.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-3">Minutes</span>
          </div>
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-4 sm:p-6 backdrop-blur-xl flex flex-col items-center relative overflow-hidden">
            <span className="text-4xl sm:text-7xl font-black font-mono tracking-tight text-amber-400 leading-none">
              {String(timeRemaining.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest mt-3">Seconds</span>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>
        </div>

        {/* Current Active Milestone Highlight */}
        {activeMilestone && (
          <div className="max-w-lg w-full p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 backdrop-blur-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300">
                <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                  ACTIVE FOCUS CHECKPOINT
                </span>
                <h4 className="text-sm font-bold text-white">{activeMilestone.title}</h4>
                <p className="text-xs text-slate-300">{activeMilestone.note}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-300 block">{activeMilestone.date}</span>
              <span className="text-[10px] text-emerald-400 font-semibold">{progressPercent}% Overall</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer Quote */}
      <div className="relative z-10 text-center text-xs text-slate-500 font-serif italic">
        {deadline.dailyAnchor || '“The best way to predict the future is to create it.”'}
      </div>
    </div>
  );
}
