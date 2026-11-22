import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Check, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Download, 
  Maximize2, 
  FileText, 
  Layers,
  ArrowRight
} from 'lucide-react';

import { PRESET_DEADLINES, PRESET_THEMES, DEVICE_PROFILES } from '../constants/presets';
import { generateGeminiMilestones } from '../utils/aiScheduler';
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
  const [isGenerating, setIsGenerating] = useState(false);

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
        title: 'New checkpoint',
        date: 'Scheduled',
        done: false,
        note: 'Key execution task'
      }
    ]);
  };

  const handleScheduleGeneration = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateGeminiMilestones(
        deadline.title,
        deadline.category,
        deadline.targetDate
      );
      if (generated && generated.length > 0) {
        setMilestones(generated);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#111114] border border-neutral-800 rounded-3xl p-5 shadow-2xl">
      {/* Inspector Top Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight">Inspector</h2>
            <p className="text-xs text-neutral-400">Lock screen layout & countdown</p>
          </div>
          <button
            type="button"
            onClick={onOpenSubmissionKit}
            className="px-3 py-1.5 rounded-xl border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-400" />
            <span>Submission Kit</span>
          </button>
        </div>

        {/* Preset Selector */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-medium text-neutral-400 block">Presets</label>
          <div className="grid grid-cols-2 gap-1.5">
            {PRESET_DEADLINES.map(p => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-2 rounded-xl text-xs font-medium text-left truncate border transition ${
                  deadline.title === p.title
                    ? 'bg-neutral-800 text-white border-neutral-600'
                    : 'bg-neutral-900/60 hover:bg-neutral-800/80 text-neutral-400 border-neutral-800/80'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Segmented Control Tabs */}
      <div className="grid grid-cols-3 gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl mb-4 text-xs font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('milestones')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'milestones'
              ? 'bg-neutral-800 text-white font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Milestones ({milestones.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('style')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'style'
              ? 'bg-neutral-800 text-white font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Style & Device
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('deadline')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'deadline'
              ? 'bg-neutral-800 text-white font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Deadline
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto pr-1">
        {/* TAB 1: MILESTONES */}
        {activeTab === 'milestones' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
              <span className="text-xs text-neutral-400">Backward checkpoints</span>
              <button
                type="button"
                onClick={handleScheduleGeneration}
                disabled={isGenerating}
                className="text-xs text-neutral-300 hover:text-white transition flex items-center gap-1 font-medium disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{isGenerating ? 'Calculating...' : 'Recalculate schedule'}</span>
              </button>
            </div>

            <div className="space-y-2">
              {milestones.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className="p-2.5 rounded-xl bg-neutral-900/70 border border-neutral-800/80 flex items-start gap-2.5 group hover:border-neutral-700 transition"
                >
                  <button
                    type="button"
                    onClick={() => handleToggleMilestone(m.id)}
                    className="mt-1 flex-shrink-0 text-neutral-500 hover:text-emerald-400 transition"
                  >
                    {m.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-neutral-600 hover:text-neutral-400" />
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
                        className={`w-full text-xs font-medium bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-neutral-500 focus:outline-none transition ${m.done ? 'line-through text-neutral-500' : 'text-neutral-100'}`}
                      />
                      <input
                        type="text"
                        value={m.date}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMilestones(prev => prev.map(item => item.id === m.id ? { ...item, date: val } : item));
                        }}
                        className="w-20 text-[10px] font-mono text-right text-neutral-400 bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-neutral-500 focus:outline-none flex-shrink-0"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Action note"
                      value={m.note || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMilestones(prev => prev.map(item => item.id === m.id ? { ...item, note: val } : item));
                      }}
                      className="w-full text-[10px] text-neutral-400 bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-neutral-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteMilestone(m.id)}
                    className="opacity-0 group-hover:opacity-100 text-neutral-500 hover:text-rose-400 p-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddMilestone}
              className="w-full py-2.5 rounded-xl border border-dashed border-neutral-700 hover:border-neutral-600 text-xs font-medium text-neutral-300 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add checkpoint</span>
            </button>
          </div>
        )}

        {/* TAB 2: STYLE & DEVICE */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {/* Device Profiles */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-neutral-400 block">Device Mockup</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(DEVICE_PROFILES).map(d => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDeviceProfileId(d.id)}
                    className={`p-2.5 rounded-xl text-left border transition ${
                      deviceProfileId === d.id
                        ? 'bg-neutral-800 text-white border-neutral-600'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <div className="text-xs font-semibold">{d.name.split(' ')[0]}</div>
                    <span className="text-[10px] text-neutral-500 block truncate">{d.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Display Switches */}
            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-neutral-200 block">Simulate native lock screen clock</span>
                  <span className="text-[10px] text-neutral-500">Preview with system time & widgets</span>
                </div>
                <input
                  type="checkbox"
                  checked={showOsOverlay}
                  onChange={(e) => setShowOsOverlay(e.target.checked)}
                  className="w-4 h-4 rounded text-neutral-600 bg-neutral-950 border-neutral-700"
                />
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-neutral-800">
                <div>
                  <span className="text-xs font-medium text-neutral-200 block">Safe zone guides</span>
                  <span className="text-[10px] text-neutral-500">Highlight reserved hardware zones</span>
                </div>
                <input
                  type="checkbox"
                  checked={showSafeZones}
                  onChange={(e) => setShowSafeZones(e.target.checked)}
                  className="w-4 h-4 rounded text-neutral-600 bg-neutral-950 border-neutral-700"
                />
              </div>
            </div>

            {/* Theme Presets */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-neutral-400 block">Color Theme</label>
              <div className="space-y-1.5">
                {Object.values(PRESET_THEMES).map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setThemeId(t.id)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition ${
                      themeId === t.id
                        ? 'bg-neutral-800/80 border-neutral-600 text-white'
                        : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: t.accent }}
                      />
                      <div>
                        <span className="text-xs font-semibold block">{t.name}</span>
                        <span className="text-[10px] text-neutral-500">{t.category}</span>
                      </div>
                    </div>
                    {themeId === t.id && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEADLINE DETAILS */}
        {activeTab === 'deadline' && (
          <div className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-medium text-neutral-400 block">Project Title</label>
              <input
                type="text"
                value={deadline.title}
                onChange={(e) => setDeadline({ ...deadline, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-neutral-400 block">Target Date & Time</label>
              <input
                type="datetime-local"
                value={deadline.targetDate.slice(0, 16)}
                onChange={(e) => setDeadline({ ...deadline, targetDate: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white font-mono focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-neutral-400 block">Category</label>
              <input
                type="text"
                value={deadline.category}
                onChange={(e) => setDeadline({ ...deadline, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-neutral-400 block">Tagline</label>
              <input
                type="text"
                value={deadline.tagline}
                onChange={(e) => setDeadline({ ...deadline, tagline: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-medium text-neutral-400 block">Motivational Anchor</label>
              <textarea
                rows={2}
                value={deadline.dailyAnchor || ''}
                onChange={(e) => setDeadline({ ...deadline, dailyAnchor: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="pt-3.5 mt-2 border-t border-neutral-800 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onOpenAOD}
            className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-800 flex items-center justify-center gap-1.5 transition"
          >
            <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>Always-On Mode</span>
          </button>

          <button
            type="button"
            onClick={() => exportToICS(deadline, milestones)}
            className="py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-800 flex items-center justify-center gap-1.5 transition"
          >
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>Sync Calendar</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenExport}
          className="w-full py-3 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-md"
        >
          <Download className="w-4 h-4 text-neutral-900" />
          <span>Download Lock Screen Wallpaper</span>
        </button>
      </div>
    </div>
  );
}
