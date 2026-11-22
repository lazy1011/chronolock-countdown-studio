import React, { useState } from 'react';
import { 
  Sparkles, 
  Palette, 
  Smartphone, 
  Monitor, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Check, 
  CheckCircle2, 
  Circle, 
  Wand2, 
  Eye, 
  Download, 
  Maximize2, 
  FileText, 
  Sliders,
  Layers,
  HelpCircle,
  Share2
} from 'lucide-react';
import { PRESET_DEADLINES, PRESET_THEMES, DEVICE_PROFILES } from '../constants/presets';
import { generateSmartMilestones, generateGeminiMilestones } from '../utils/aiScheduler';
import { exportToICS } from '../utils/calendarExport';

export default function ControlsPanel({
  deadline,
  setDeadline,
  milestones,
  setMilestones,
  themeId,
  setThemeId,
  deviceProfileId,
  setDeviceProfileId,
  showOsOverlay,
  setShowOsOverlay,
  showSafeZones,
  setShowSafeZones,
  onOpenAOD,
  onOpenExport,
  onOpenSubmissionKit
}) {
  const [activeTab, setActiveTab] = useState('milestones'); // 'milestones' | 'style' | 'deadline'
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  const handleSelectPreset = (preset) => {
    setDeadline({
      id: preset.id,
      title: preset.title,
      category: preset.category,
      targetDate: preset.targetDate,
      tagline: preset.tagline,
      dailyAnchor: preset.dailyAnchor
    });
    setMilestones(preset.milestones);
    setThemeId(preset.theme);
  };

  const handleToggleMilestone = (id) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, done: !m.done } : m));
  };

  const handleDeleteMilestone = (id) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
  };

  const handleAddMilestone = () => {
    const nextId = milestones.length > 0 ? Math.max(...milestones.map(m => m.id)) + 1 : 1;
    setMilestones([
      ...milestones,
      {
        id: nextId,
        title: 'New Milestone Checkpoint',
        date: 'Scheduled',
        done: false,
        note: 'High-leverage focus task'
      }
    ]);
  };

  const handleAiDecompose = async () => {
    setIsAiGenerating(true);
    try {
      const generated = await generateGeminiMilestones(
        deadline.title,
        deadline.category,
        deadline.targetDate,
        geminiApiKey
      );
      if (generated && generated.length > 0) {
        setMilestones(generated);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-2xl">
      {/* Top Header & Presets */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Studio Configuration</h2>
              <p className="text-xs text-slate-400">Your Deadline, Your Design</p>
            </div>
          </div>
          <button
            onClick={onOpenSubmissionKit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Submission Kit</span>
          </button>
        </div>

        {/* Quick Presets Pills */}
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Presets</label>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {PRESET_DEADLINES.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition border ${
                  deadline.title === p.title
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700'
                }`}
              >
                {p.title.split(' ')[0]} {p.category === 'Competition / Hackathon' ? '🏆' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 mb-4">
        <button
          onClick={() => setActiveTab('milestones')}
          className={`flex-1 py-2 text-xs font-semibold border-b-2 flex items-center justify-center gap-1.5 transition ${
            activeTab === 'milestones'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Milestones ({milestones.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-2 text-xs font-semibold border-b-2 flex items-center justify-center gap-1.5 transition ${
            activeTab === 'style'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Theme & Device</span>
        </button>
        <button
          onClick={() => setActiveTab('deadline')}
          className={`flex-1 py-2 text-xs font-semibold border-b-2 flex items-center justify-center gap-1.5 transition ${
            activeTab === 'deadline'
              ? 'border-indigo-500 text-indigo-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Deadline Info</span>
        </button>
      </div>

      {/* Tab Body: Scrollable */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        {/* TAB 1: MILESTONES */}
        {activeTab === 'milestones' && (
          <div className="space-y-3">
            {/* AI Generator Banner */}
            <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 flex flex-col gap-2 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs font-bold text-white">AI Backward Milestone Planner</span>
                </div>
                <button
                  onClick={handleAiDecompose}
                  disabled={isAiGenerating}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-[11px] font-semibold transition flex items-center gap-1 shadow-sm"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {isAiGenerating ? 'Generating...' : 'Auto-Decompose'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400">
                Uses Google Gemini backward-planning algorithm to reverse-engineer key checkpoints before your deadline.
              </p>
              
              <div className="pt-1">
                <button
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                  className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <span>{showApiKeyInput ? 'Hide Gemini API Key' : '+ Use custom Google Gemini API Key'}</span>
                </button>
                {showApiKeyInput && (
                  <input
                    type="password"
                    placeholder="Enter Google Gemini API key (optional)"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    className="w-full mt-1.5 px-2.5 py-1 text-[11px] rounded-lg bg-black/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                )}
              </div>
            </div>

            {/* Milestone List */}
            <div className="space-y-2">
              {milestones.map((m, idx) => (
                <div 
                  key={m.id || idx}
                  className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-2 group hover:border-slate-600 transition"
                >
                  <button
                    onClick={() => handleToggleMilestone(m.id)}
                    className="mt-1 flex-shrink-0 text-slate-400 hover:text-emerald-400 transition"
                  >
                    {m.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-500" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={m.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMilestones(prev => prev.map(item => item.id === m.id ? { ...item, title: val } : item));
                        }}
                        className={`w-full text-xs font-semibold bg-transparent border-b border-transparent hover:border-slate-600 focus:border-indigo-500 focus:outline-none ${m.done ? 'line-through text-slate-400' : 'text-slate-100'}`}
                      />
                      <input
                        type="text"
                        value={m.date}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMilestones(prev => prev.map(item => item.id === m.id ? { ...item, date: val } : item));
                        }}
                        className="w-24 text-[10px] font-mono text-right text-slate-400 bg-transparent border-b border-transparent hover:border-slate-600 focus:border-indigo-500 focus:outline-none flex-shrink-0"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="High-leverage action note"
                      value={m.note || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMilestones(prev => prev.map(item => item.id === m.id ? { ...item, note: val } : item));
                      }}
                      className="w-full text-[10px] text-slate-400 bg-transparent border-b border-transparent hover:border-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    onClick={() => handleDeleteMilestone(m.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 p-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleAddMilestone}
              className="w-full py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 text-slate-300 text-xs font-semibold border border-dashed border-slate-700 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Milestone Checkpoint</span>
            </button>
          </div>
        )}

        {/* TAB 2: STYLE & THEMES */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {/* Device Profiles */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Target Device Mockup
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(DEVICE_PROFILES).map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDeviceProfileId(d.id)}
                    className={`p-2 rounded-xl text-left border transition ${
                      deviceProfileId === d.id
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {d.id === 'desktop4k' ? <Monitor className="w-3.5 h-3.5 text-cyan-400" /> : <Smartphone className="w-3.5 h-3.5 text-indigo-400" />}
                      <span className="text-xs font-bold leading-none">{d.id === 'iphone16pro' ? 'iPhone' : d.id === 'pixel9pro' ? 'Pixel 9' : 'Desktop'}</span>
                    </div>
                    <span className="text-[9px] text-slate-400 block">{d.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Display Toggles */}
            <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Lock Screen Controls
              </label>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-200 block">Show Native OS Clock</span>
                  <span className="text-[10px] text-slate-400">Simulate native iOS/Android lock screen clock</span>
                </div>
                <input
                  type="checkbox"
                  checked={showOsOverlay}
                  onChange={(e) => setShowOsOverlay(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                <div>
                  <span className="text-xs font-medium text-slate-200 block">Safe Zone Overlays</span>
                  <span className="text-[10px] text-slate-400">Highlight zones reserved for clock & icons</span>
                </div>
                <input
                  type="checkbox"
                  checked={showSafeZones}
                  onChange={(e) => setShowSafeZones(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                />
              </div>
            </div>

            {/* Themes */}
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Aesthetic Color Theme
              </label>
              <div className="space-y-2">
                {Object.values(PRESET_THEMES).map(t => (
                  <button
                    key={t.id}
                    onClick={() => setThemeId(t.id)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition ${
                      themeId === t.id
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-950'
                        : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-6 h-6 rounded-full border border-white/20 shadow-inner"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">{t.name}</span>
                        <span className="text-[10px] text-slate-400">{t.description}</span>
                      </div>
                    </div>
                    {themeId === t.id && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEADLINE DETAILS */}
        {activeTab === 'deadline' && (
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Project / Deadline Name
              </label>
              <input
                type="text"
                value={deadline.title}
                onChange={(e) => setDeadline({ ...deadline, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Target Date & Time (ISO)
              </label>
              <input
                type="datetime-local"
                value={deadline.targetDate.slice(0, 16)}
                onChange={(e) => setDeadline({ ...deadline, targetDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Category
              </label>
              <input
                type="text"
                value={deadline.category}
                onChange={(e) => setDeadline({ ...deadline, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Tagline / Subtext
              </label>
              <input
                type="text"
                value={deadline.tagline}
                onChange={(e) => setDeadline({ ...deadline, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Motivational Daily Anchor
              </label>
              <textarea
                rows={2}
                value={deadline.dailyAnchor || ''}
                onChange={(e) => setDeadline({ ...deadline, dailyAnchor: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Buttons */}
      <div className="pt-4 mt-2 border-t border-slate-800 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onOpenAOD}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Always-On Mode</span>
          </button>

          <button
            onClick={() => exportToICS(deadline, milestones)}
            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sync to Calendar</span>
          </button>
        </div>

        <button
          onClick={onOpenExport}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition active:scale-[0.99]"
        >
          <Download className="w-4 h-4" />
          <span>Export Lock Screen Wallpaper (HD)</span>
        </button>
      </div>
    </div>
  );
}
