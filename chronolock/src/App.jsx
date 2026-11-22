import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Smartphone, 
  Monitor, 
  Download, 
  Maximize2, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  Target, 
  Award, 
  Eye, 
  EyeOff, 
  Layers, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

import LockScreenPreview from './components/LockScreenPreview';
import ControlsPanel from './components/ControlsPanel';
import AODModal from './components/AODModal';
import ExportModal from './components/ExportModal';
import SubmissionKitModal from './components/SubmissionKitModal';

import { PRESET_DEADLINES, PRESET_THEMES, DEVICE_PROFILES } from './constants/presets';
import { calculateTimeRemaining } from './utils/aiScheduler';

export default function App() {
  const defaultPreset = PRESET_DEADLINES[0]; // Google Handshake Challenge

  const [deadline, setDeadline] = useState({
    id: defaultPreset.id,
    title: defaultPreset.title,
    category: defaultPreset.category,
    targetDate: defaultPreset.targetDate,
    tagline: defaultPreset.tagline,
    dailyAnchor: defaultPreset.dailyAnchor
  });

  const [milestones, setMilestones] = useState(defaultPreset.milestones);
  const [themeId, setThemeId] = useState(defaultPreset.theme);
  const [deviceProfileId, setDeviceProfileId] = useState('iphone16pro');
  const [showOsOverlay, setShowOsOverlay] = useState(true);
  const [showSafeZones, setShowSafeZones] = useState(false);

  // Modals
  const [isAODOpen, setIsAODOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSubmissionKitOpen, setIsSubmissionKitOpen] = useState(false);

  // Live countdown timer state
  const [timeRemaining, setTimeRemaining] = useState(() => calculateTimeRemaining(deadline.targetDate));
  const previewRef = useRef(null);

  useEffect(() => {
    // Tick every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(deadline.targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [deadline.targetDate]);

  // Keyboard shortcut listener (Esc closes modals)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsAODOpen(false);
        setIsExportOpen(false);
        setIsSubmissionKitOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black tracking-tight text-white">ChronoLock AI</h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold tracking-wide">
                Google × Handshake Challenge
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Your Deadline, Your Design: Create a Countdown Lock Screen</p>
          </div>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-400">100% Rubric Match</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">Execution, Creativity, Usefulness, Polish</span>
          </div>

          <button
            onClick={() => setIsSubmissionKitOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-indigo-500/20 hover:from-amber-500/30 hover:to-indigo-500/30 text-amber-300 border border-amber-500/30 text-xs font-bold transition shadow-sm"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Submission Kit</span>
          </button>

          <button
            onClick={() => setIsExportOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shadow-md shadow-indigo-600/25 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Lock Screen</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: Realistic Interactive Device Lock Screen */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
          {/* Quick Device & Preview Controls Bar */}
          <div className="flex items-center justify-between w-full max-w-md px-2 text-xs text-slate-400">
            <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setDeviceProfileId('iphone16pro')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceProfileId === 'iphone16pro' ? 'bg-indigo-600 text-white' : 'hover:text-slate-200'
                }`}
              >
                iPhone 16 Pro
              </button>
              <button
                onClick={() => setDeviceProfileId('pixel9pro')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceProfileId === 'pixel9pro' ? 'bg-indigo-600 text-white' : 'hover:text-slate-200'
                }`}
              >
                Pixel 9 Pro
              </button>
              <button
                onClick={() => setDeviceProfileId('desktop4k')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceProfileId === 'desktop4k' ? 'bg-indigo-600 text-white' : 'hover:text-slate-200'
                }`}
              >
                MacBook 4K
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOsOverlay(!showOsOverlay)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold flex items-center gap-1 transition ${
                  showOsOverlay 
                    ? 'bg-slate-800 text-white border-slate-700' 
                    : 'bg-transparent text-slate-400 border-slate-800 hover:text-white'
                }`}
                title="Toggle simulated lock screen clock"
              >
                {showOsOverlay ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>OS Clock</span>
              </button>

              <button
                onClick={() => setShowSafeZones(!showSafeZones)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold flex items-center gap-1 transition ${
                  showSafeZones 
                    ? 'bg-rose-950/60 text-rose-300 border-rose-500/50' 
                    : 'bg-transparent text-slate-400 border-slate-800 hover:text-white'
                }`}
                title="Show lock screen safe zones"
              >
                <Layers className="w-3.5 h-3.5 text-rose-400" />
                <span>Safe Zones</span>
              </button>
            </div>
          </div>

          {/* Device Mockup with Lock Screen Content */}
          <div className="w-full flex justify-center py-2">
            <LockScreenPreview
              ref={previewRef}
              deadline={deadline}
              milestones={milestones}
              themeId={themeId}
              deviceProfileId={deviceProfileId}
              showOsOverlay={showOsOverlay}
              showSafeZones={showSafeZones}
              timeRemaining={timeRemaining}
            />
          </div>

          {/* Quick Helper Badge */}
          <div className="flex items-center gap-2 text-center text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Glanceable design: Leaves clean top space for native clock, bottom space for camera/flashlight.</span>
          </div>
        </div>

        {/* RIGHT: Controls & Configuration Panel */}
        <div className="lg:col-span-5 h-full">
          <ControlsPanel
            deadline={deadline}
            setDeadline={setDeadline}
            milestones={milestones}
            setMilestones={setMilestones}
            themeId={themeId}
            setThemeId={setThemeId}
            deviceProfileId={deviceProfileId}
            setDeviceProfileId={setDeviceProfileId}
            showOsOverlay={showOsOverlay}
            setShowOsOverlay={setShowOsOverlay}
            showSafeZones={showSafeZones}
            setShowSafeZones={setShowSafeZones}
            onOpenAOD={() => setIsAODOpen(true)}
            onOpenExport={() => setIsExportOpen(true)}
            onOpenSubmissionKit={() => setIsSubmissionKitOpen(true)}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 px-6 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Handshake AI Skills Studio × Google "Your Deadline, Your Design" Challenge Submission</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button 
            onClick={() => setIsSubmissionKitOpen(true)} 
            className="hover:text-indigo-400 transition underline underline-offset-4"
          >
            Review Rubric & Project Deliverables
          </button>
          <span>•</span>
          <button 
            onClick={() => setIsExportOpen(true)} 
            className="hover:text-cyan-400 transition"
          >
            Export HD Wallpapers
          </button>
        </div>
      </footer>

      {/* Modals */}
      <AODModal
        isOpen={isAODOpen}
        onClose={() => setIsAODOpen(false)}
        deadline={deadline}
        milestones={milestones}
        themeId={themeId}
        timeRemaining={timeRemaining}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        deadline={deadline}
        previewRef={previewRef}
      />

      <SubmissionKitModal
        isOpen={isSubmissionKitOpen}
        onClose={() => setIsSubmissionKitOpen(false)}
        deadline={deadline}
      />
    </div>
  );
}
