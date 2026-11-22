import React, { useState } from 'react';
import { 
  Smartphone, 
  Monitor, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  Check, 
  CheckSquare, 
  Square, 
  Sparkles, 
  Download, 
  Maximize2, 
  FileText, 
  Layers,
  Bell,
  HelpCircle
} from 'lucide-react';

import { PRESET_DEADLINES, PRESET_THEMES, DEVICE_PROFILES } from '../constants/presets';
import { exportToICS } from '../utils/calendarExport';
import ImageInspiration from './ImageInspiration';

export default function ControlsPanel({
  deadline,
  setDeadline,
  milestones,
  setMilestones,
  themeId,
  setThemeId,
  customPalette,
  setCustomPalette,
  deviceProfileId,
  setDeviceProfileId,
  showOsOverlay,
  setShowOsOverlay,
  showSafeZones,
  setShowSafeZones,
  onOpenAOD,
  onOpenExport,
  onOpenSubmissionKit,
  onOpenWizard
}) {
  const [activeTab, setActiveTab] = useState('milestones'); // 'milestones' | 'style' | 'schedule'
  const [notifyTime, setNotifyTime] = useState('09:00');
  const [notifyEnabled, setNotifyEnabled] = useState(false);

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
    setCustomPalette(null);
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
        tLabel: 'T-Custom',
        title: 'New key checkpoint', // strictly under 5 words
        date: 'Scheduled',
        done: false,
        note: 'High impact task'
      }
    ]);
  };

  const handleToggleNotifications = async () => {
    if (!notifyEnabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setNotifyEnabled(true);
          new Notification('ChronoLock Daily Check Scheduled', {
            body: `Every day at ${notifyTime}, we'll check milestones for ${deadline.title}.`
          });
        } else {
          alert('Please allow browser notifications to receive daily milestone alerts.');
        }
      }
    } else {
      setNotifyEnabled(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#111114] border border-neutral-800 rounded-3xl p-5 shadow-2xl">
      {/* Inspector Top Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight">Studio Configuration</h2>
            <p className="text-xs text-neutral-400">Lock screen layout & T-minus milestones</p>
          </div>
          <button
            type="button"
            onClick={onOpenSubmissionKit}
            className="h-8 px-3 rounded-xl border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-400" />
            <span>Submission Kit</span>
          </button>
        </div>

        {/* 3-Question Planner Callout Button */}
        <button
          type="button"
          onClick={onOpenWizard}
          className="w-full mb-3 p-3 rounded-2xl bg-gradient-to-r from-neutral-800 to-neutral-900 border border-neutral-700 hover:border-neutral-500 text-left flex items-center justify-between transition group"
        >
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-white">3-Question Backward Plan</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Answer 3 schedule questions to generate T-14, T-7, T-3, T-1 milestones
            </p>
          </div>
          <span className="h-7 px-2.5 rounded-lg bg-white text-neutral-950 text-xs font-semibold flex items-center justify-center">
            Start
          </span>
        </button>

        {/* Presets List */}
        <div className="space-y-1">
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
          Style & Vibe
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('schedule')}
          className={`py-1.5 rounded-lg transition ${
            activeTab === 'schedule'
              ? 'bg-neutral-800 text-white font-semibold'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Daily Alarms
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto pr-1">
        {/* TAB 1: MILESTONES WITH CHECKBOXES */}
        {activeTab === 'milestones' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-1 border-b border-neutral-800">
              <span className="text-xs text-neutral-400">T-Minus Checkpoints (under 5 words)</span>
              <button
                type="button"
                onClick={onOpenWizard}
                className="text-xs text-neutral-300 hover:text-white transition flex items-center gap-1 font-medium"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Re-run 3 questions</span>
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
                    className="mt-0.5 flex-shrink-0 text-neutral-500 hover:text-emerald-400 transition"
                  >
                    {m.done ? (
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-neutral-500 hover:text-neutral-300" />
                    )}
                  </button>

                  <div className="flex-1 space-y-1">
                    <div className="flex gap-2">
                      <span className="text-xs font-mono font-bold text-neutral-400 flex-shrink-0">
                        {m.tLabel || `T-${Math.max(0, 14 - idx * 4)}`}:
                      </span>
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
                        className="w-16 text-[10px] font-mono text-right text-neutral-400 bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-neutral-500 focus:outline-none flex-shrink-0"
                      />
                    </div>
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
              className="w-full h-10 rounded-xl border border-dashed border-neutral-700 hover:border-neutral-600 text-xs font-medium text-neutral-300 flex items-center justify-center gap-1.5 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add T-Minus checkpoint</span>
            </button>
          </div>
        )}

        {/* TAB 2: STYLE & IMAGE PALETTE INSPIRATION */}
        {activeTab === 'style' && (
          <div className="space-y-4">
            {/* Image Inspiration Engine */}
            <ImageInspiration
              onApplyPalette={(pal) => setCustomPalette(pal)}
            />

            {/* Device Profiles */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-medium text-neutral-400 block">Device Layout</label>
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
                  <span className="text-[10px] text-neutral-500">Highlight top clock headroom</span>
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
              <label className="text-[11px] font-medium text-neutral-400 block">Aesthetic Themes</label>
              <div className="space-y-1.5">
                {Object.values(PRESET_THEMES).map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setThemeId(t.id);
                      setCustomPalette(null);
                    }}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition ${
                      themeId === t.id && !customPalette
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
                    {themeId === t.id && !customPalette && <Check className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DAILY NOTIFICATION ALARMS */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-semibold text-white">Daily Milestone Accountability Check</h4>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                "Every day at [time] until [deadline], check the countdown in this chat, and send a push notification with any milestone scheduled for today or tomorrow."
              </p>

              <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <label className="text-[11px] font-medium text-neutral-300 block">Notification Check Time</label>
                  <input
                    type="time"
                    value={notifyTime}
                    onChange={(e) => setNotifyTime(e.target.value)}
                    className="mt-1 px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white font-mono"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleToggleNotifications}
                  className={`h-9 px-4 rounded-xl text-xs font-semibold transition ${
                    notifyEnabled
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-neutral-950 hover:bg-neutral-200'
                  }`}
                >
                  {notifyEnabled ? '✓ Active Daily' : 'Enable Daily Push'}
                </button>
              </div>
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
          </div>
        )}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="pt-3.5 mt-2 border-t border-neutral-800 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onOpenAOD}
            className="h-10 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-800 flex items-center justify-center gap-1.5 transition"
          >
            <Maximize2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>Always-On Mode</span>
          </button>

          <button
            type="button"
            onClick={() => exportToICS(deadline, milestones)}
            className="h-10 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 text-xs font-medium border border-neutral-800 flex items-center justify-center gap-1.5 transition"
          >
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>Sync Calendar</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onOpenExport}
          className="w-full h-11 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-sm"
        >
          <Download className="w-4 h-4 text-neutral-900" />
          <span>Download Lock Screen Wallpaper</span>
        </button>
      </div>
    </div>
  );
}
