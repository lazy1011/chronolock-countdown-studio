import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Maximize2, 
  Calendar, 
  Award, 
  Eye, 
  EyeOff, 
  Layers,
  Sun,
  Moon,
  Sparkles,
  Clock
} from 'lucide-react';

import LockScreenPreview from './components/LockScreenPreview';
import ControlsPanel from './components/ControlsPanel';
import AODModal from './components/AODModal';
import ExportModal from './components/ExportModal';
import SubmissionKitModal from './components/SubmissionKitModal';
import ThreeQuestionWizard from './components/ThreeQuestionWizard';

import { PRESET_DEADLINES, WALLPAPER_BACKGROUNDS, DEVICE_PROFILES } from './constants/presets';
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
  const [selectedBgId, setSelectedBgId] = useState('its-locked-cat');
  const [customPalette, setCustomPalette] = useState(null);
  const [deviceProfileId, setDeviceProfileId] = useState('android');
  const [clockStyle, setClockStyle] = useState('stacked'); // 'stacked' | 'classic'
  const [showOsOverlay, setShowOsOverlay] = useState(true);
  const [showSafeZones, setShowSafeZones] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  // Modals
  const [isAODOpen, setIsAODOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSubmissionKitOpen, setIsSubmissionKitOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Live countdown timer state
  const [timeRemaining, setTimeRemaining] = useState(() => calculateTimeRemaining(deadline.targetDate));
  const previewRef = useRef(null);

  useEffect(() => {
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
        setIsWizardOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleApplyWizardPlan = (plan) => {
    setDeadline({
      ...deadline,
      title: plan.title,
      targetDate: plan.targetDate,
      category: plan.category,
      tagline: plan.tagline
    });
    setMilestones(plan.milestones);
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 flex flex-col font-sans ${
      isLightMode ? 'bg-[#f4f4f5] text-neutral-900' : 'bg-[#09090b] text-neutral-100'
    }`}>
      {/* Top Header */}
      <header className={`border-b sticky top-0 z-40 px-5 lg:px-8 py-3 flex items-center justify-between backdrop-blur-xl transition-colors ${
        isLightMode 
          ? 'border-neutral-200 bg-white/85 text-neutral-900' 
          : 'border-neutral-800/80 bg-[#09090b]/85 text-neutral-100'
      }`}>
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <img 
            src="/favicon.svg" 
            alt="ChronoLock Logo" 
            className="w-8 h-8 rounded-xl shadow-sm border border-neutral-700/60" 
          />
          <div>
            <h1 className="text-sm font-semibold tracking-tight leading-none">
              ChronoLock
            </h1>
            <span className="text-[11px] text-neutral-500 font-normal">
              Countdown Lock Screen Studio
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Light/Dark Mode Switcher */}
          <button
            type="button"
            onClick={() => setIsLightMode(!isLightMode)}
            className={`h-9 px-3 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
              isLightMode 
                ? 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-700' 
                : 'border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-300'
            }`}
            title="Toggle Light/Dark Theme"
          >
            {isLightMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
            <span className="hidden sm:inline">{isLightMode ? 'Dark' : 'Light'}</span>
          </button>

          {/* 3-Question Planner Button */}
          <button
            type="button"
            onClick={() => setIsWizardOpen(true)}
            className={`h-9 px-3.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
              isLightMode 
                ? 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-800' 
                : 'border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">3-Question Plan</span>
          </button>

          {/* Submission Kit Button */}
          <button
            type="button"
            onClick={() => setIsSubmissionKitOpen(true)}
            className={`h-9 px-3.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition ${
              isLightMode 
                ? 'border-neutral-300 bg-neutral-100 hover:bg-neutral-200 text-neutral-800' 
                : 'border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-neutral-400" />
            <span className="hidden sm:inline">Submission Kit</span>
          </button>

          {/* Export Wallpaper Button */}
          <button
            type="button"
            onClick={() => setIsExportOpen(true)}
            className="h-9 px-4 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Wallpaper</span>
          </button>
        </div>
      </header>

      {/* Main Studio Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT / CENTER: Phone Lock Screen Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center space-y-4">
          {/* Quick Mockup Options Bar (Pixel-Perfect Aligned Heights & Padding) */}
          <div className="flex flex-wrap items-center justify-between w-full max-w-md px-1 text-xs text-neutral-400 gap-2">
            {/* Device Switcher (Height: h-8) */}
            <div className={`h-8 flex items-center gap-1 p-0.5 rounded-xl border ${
              isLightMode ? 'bg-white border-neutral-300' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <button
                type="button"
                onClick={() => setDeviceProfileId('android')}
                className={`h-7 px-2.5 rounded-lg text-xs font-medium transition ${
                  deviceProfileId === 'android' 
                    ? isLightMode ? 'bg-neutral-900 text-white' : 'bg-neutral-800 text-white' 
                    : isLightMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Android
              </button>
              <button
                type="button"
                onClick={() => setDeviceProfileId('iphone16pro')}
                className={`h-7 px-2.5 rounded-lg text-xs font-medium transition ${
                  deviceProfileId === 'iphone16pro' 
                    ? isLightMode ? 'bg-neutral-900 text-white' : 'bg-neutral-800 text-white' 
                    : isLightMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                iPhone 16 Pro
              </button>
              <button
                type="button"
                onClick={() => setDeviceProfileId('desktop4k')}
                className={`h-7 px-2.5 rounded-lg text-xs font-medium transition ${
                  deviceProfileId === 'desktop4k' 
                    ? isLightMode ? 'bg-neutral-900 text-white' : 'bg-neutral-800 text-white' 
                    : isLightMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Desktop
              </button>
            </div>

            {/* Hardware Controls (Height: h-8, perfectly matching side buttons) */}
            <div className="flex items-center gap-1.5">
              {/* Clock Style Switcher */}
              <button
                type="button"
                onClick={() => setClockStyle(clockStyle === 'stacked' ? 'classic' : 'stacked')}
                className={`h-8 px-2.5 rounded-xl border text-xs font-medium flex items-center gap-1 transition ${
                  clockStyle === 'stacked'
                    ? isLightMode ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-neutral-800 text-white border-neutral-700'
                    : isLightMode ? 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
                title="Switch Clock Style: 2-Line Stacked vs 1-Line Classic"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{clockStyle === 'stacked' ? '2-Line' : '1-Line'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowOsOverlay(!showOsOverlay)}
                className={`h-8 px-2.5 rounded-xl border text-xs font-medium flex items-center gap-1 transition ${
                  showOsOverlay 
                    ? isLightMode ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-neutral-800 text-white border-neutral-700' 
                    : isLightMode ? 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
                title="Toggle simulated lock screen clock"
              >
                {showOsOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>OS Clock</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSafeZones(!showSafeZones)}
                className={`h-8 px-2.5 rounded-xl border text-xs font-medium flex items-center gap-1 transition ${
                  showSafeZones 
                    ? 'bg-rose-950/60 text-rose-300 border-rose-500/50' 
                    : isLightMode ? 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-100' : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
                title="Show safe zone guides"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Safe Zones</span>
              </button>
            </div>
          </div>

          {/* Device Screen Canvas */}
          <div className="w-full flex justify-center py-2">
            <LockScreenPreview
              ref={previewRef}
              deadline={deadline}
              milestones={milestones}
              selectedBgId={selectedBgId}
              customPalette={customPalette}
              deviceProfileId={deviceProfileId}
              clockStyle={clockStyle}
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
            selectedBgId={selectedBgId}
            setSelectedBgId={setSelectedBgId}
            customPalette={customPalette}
            setCustomPalette={setCustomPalette}
            deviceProfileId={deviceProfileId}
            setDeviceProfileId={setDeviceProfileId}
            clockStyle={clockStyle}
            setClockStyle={setClockStyle}
            showOsOverlay={showOsOverlay}
            setShowOsOverlay={setShowOsOverlay}
            showSafeZones={showSafeZones}
            setShowSafeZones={setShowSafeZones}
            onOpenAOD={() => setIsAODOpen(true)}
            onOpenExport={() => setIsExportOpen(true)}
            onOpenSubmissionKit={() => setIsSubmissionKitOpen(true)}
            onOpenWizard={() => setIsWizardOpen(true)}
          />
        </div>
      </main>

      {/* Clean Footer */}
      <footer className={`border-t py-4 px-6 text-center text-xs flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto w-full transition-colors ${
        isLightMode ? 'border-neutral-200 text-neutral-500' : 'border-neutral-800/80 text-neutral-500'
      }`}>
        <span>Handshake AI Skills Studio × Google "Your Deadline, Your Design" Challenge</span>
        <div className="flex items-center gap-4 text-neutral-400">
          <button 
            type="button"
            onClick={() => setIsSubmissionKitOpen(true)} 
            className="hover:underline transition underline-offset-4"
          >
            Submission Kit
          </button>
          <span>•</span>
          <button 
            type="button"
            onClick={() => setIsExportOpen(true)} 
            className="hover:underline transition"
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

      <ThreeQuestionWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        onApplyPlan={handleApplyWizardPlan}
      />
    </div>
  );
}
