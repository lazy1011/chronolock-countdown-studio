import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Maximize2, 
  Calendar, 
  Award, 
  Eye, 
  EyeOff, 
  Layers
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
    <div className="min-h-screen bg-[#09090b] text-neutral-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-neutral-800/80 bg-[#09090b]/80 backdrop-blur-xl sticky top-0 z-40 px-5 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-white text-xs">
            CL
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-white leading-none">
              ChronoLock
            </h1>
            <span className="text-[11px] text-neutral-400 font-normal">
              Countdown Lock Screen Studio
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSubmissionKitOpen(true)}
            className="px-3 py-1.5 rounded-xl border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <Award className="w-3.5 h-3.5 text-neutral-400" />
            <span>Submission Kit</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-neutral-900" />
            <span>Export Wallpaper</span>
          </button>
        </div>
      </header>

      {/* Main Studio Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: Phone Lock Screen Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
          {/* Quick Mockup Options Bar */}
          <div className="flex items-center justify-between w-full max-w-sm px-1 text-xs text-neutral-400">
            <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
              <button
                type="button"
                onClick={() => setDeviceProfileId('iphone16pro')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceProfileId === 'iphone16pro' ? 'bg-neutral-800 text-white' : 'hover:text-neutral-200'
                }`}
              >
                iPhone 16 Pro
              </button>
              <button
                type="button"
                onClick={() => setDeviceProfileId('pixel9pro')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceProfileId === 'pixel9pro' ? 'bg-neutral-800 text-white' : 'hover:text-neutral-200'
                }`}
              >
                Pixel 9 Pro
              </button>
              <button
                type="button"
                onClick={() => setDeviceProfileId('desktop4k')}
                className={`px-2.5 py-1 rounded-lg font-medium transition ${
                  deviceProfileId === 'desktop4k' ? 'bg-neutral-800 text-white' : 'hover:text-neutral-200'
                }`}
              >
                Desktop
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowOsOverlay(!showOsOverlay)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-medium flex items-center gap-1 transition ${
                  showOsOverlay 
                    ? 'bg-neutral-800 text-white border-neutral-700' 
                    : 'bg-transparent text-neutral-400 border-neutral-800 hover:text-white'
                }`}
                title="Toggle simulated lock screen clock"
              >
                {showOsOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>OS Clock</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSafeZones(!showSafeZones)}
                className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-medium flex items-center gap-1 transition ${
                  showSafeZones 
                    ? 'bg-rose-950/60 text-rose-300 border-rose-500/50' 
                    : 'bg-transparent text-neutral-400 border-neutral-800 hover:text-white'
                }`}
                title="Show safe zone guides"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Safe Zones</span>
              </button>
            </div>
          </div>

          {/* Realistic Device Screen Canvas */}
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

          <p className="text-xs text-neutral-500 text-center max-w-sm">
            Top 35% safe zone unblocked for native system clock and notification widgets.
          </p>
        </div>

        {/* RIGHT: Inspector Panel */}
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

      {/* Clean Footer */}
      <footer className="border-t border-neutral-800/80 py-4 px-6 text-center text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full">
        <span>Handshake AI Skills Studio × Google "Your Deadline, Your Design" Challenge</span>
        <div className="flex items-center gap-4 text-neutral-400">
          <button 
            type="button"
            onClick={() => setIsSubmissionKitOpen(true)} 
            className="hover:text-white transition underline underline-offset-4"
          >
            Submission Kit
          </button>
          <span>•</span>
          <button 
            type="button"
            onClick={() => setIsExportOpen(true)} 
            className="hover:text-white transition"
          >
            Export Wallpaper
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
