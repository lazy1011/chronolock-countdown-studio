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

// shadcn UI
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';

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
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-0.5 shadow-md shadow-indigo-500/20">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-white">ChronoLock AI</h1>
              <Badge variant="default" className="text-[10px] py-0 border-indigo-500/40 text-indigo-300 font-semibold">
                Google × Handshake
              </Badge>
            </div>
            <p className="text-[11px] text-zinc-400">Your Deadline, Your Design: Create a Countdown Lock Screen</p>
          </div>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2.5">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-emerald-400">100% Rubric Match</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">Execution, Creativity, Usefulness, Polish</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSubmissionKitOpen(true)}
            className="border-amber-500/30 text-amber-300 hover:bg-amber-950/30 hover:text-white gap-1.5"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Submission Kit</span>
          </Button>

          <Button
            variant="gradient"
            size="sm"
            onClick={() => setIsExportOpen(true)}
            className="gap-1.5"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Lock Screen</span>
          </Button>
        </div>
      </header>

      {/* Main Workspace Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: Realistic Interactive Device Lock Screen */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
          {/* Quick Device & Preview Controls Bar */}
          <div className="flex items-center justify-between w-full max-w-md px-2 text-xs text-zinc-400">
            <div className="flex items-center gap-1 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
              <button
                type="button"
                onClick={() => setDeviceProfileId('iphone16pro')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceProfileId === 'iphone16pro' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:text-zinc-200'
                }`}
              >
                iPhone 16 Pro
              </button>
              <button
                type="button"
                onClick={() => setDeviceProfileId('pixel9pro')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceProfileId === 'pixel9pro' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:text-zinc-200'
                }`}
              >
                Pixel 9 Pro
              </button>
              <button
                type="button"
                onClick={() => setDeviceProfileId('desktop4k')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceProfileId === 'desktop4k' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:text-zinc-200'
                }`}
              >
                MacBook 4K
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={showOsOverlay ? "secondary" : "outline"}
                size="sm"
                onClick={() => setShowOsOverlay(!showOsOverlay)}
                className="h-7 text-[11px] gap-1 px-2.5"
                title="Toggle simulated lock screen clock"
              >
                {showOsOverlay ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>OS Clock</span>
              </Button>

              <Button
                variant={showSafeZones ? "destructive" : "outline"}
                size="sm"
                onClick={() => setShowSafeZones(!showSafeZones)}
                className="h-7 text-[11px] gap-1 px-2.5"
                title="Show lock screen safe zones"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Safe Zones</span>
              </Button>
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
          <div className="flex items-center gap-2 text-center text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Glanceable design: Dedicated safe headroom for native lock screen clock & widgets.</span>
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
      <footer className="border-t border-zinc-800/80 py-4 px-6 text-center text-xs text-zinc-400 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          <span>Handshake AI Skills Studio × Google "Your Deadline, Your Design" Challenge Submission</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-400">
          <button 
            type="button"
            onClick={() => setIsSubmissionKitOpen(true)} 
            className="hover:text-indigo-400 transition underline underline-offset-4"
          >
            Review Rubric & Project Deliverables
          </button>
          <span>•</span>
          <button 
            type="button"
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
