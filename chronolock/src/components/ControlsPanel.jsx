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
  Download, 
  Maximize2, 
  FileText, 
  Layers,
  ArrowRight,
  Flame,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';

import { PRESET_DEADLINES, PRESET_THEMES, DEVICE_PROFILES } from '../constants/presets';
import { generateGeminiMilestones } from '../utils/aiScheduler';
import { exportToICS } from '../utils/calendarExport';

// shadcn/ui components
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

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
    <Card className="h-full flex flex-col border-zinc-800/80 bg-zinc-950/85 shadow-2xl backdrop-blur-2xl p-5">
      {/* Top Header & Submission Kit Trigger */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white tracking-tight">Studio Configuration</h2>
                <Badge variant="outline" className="text-[10px] py-0 text-cyan-400 border-cyan-500/30">
                  v1.2
                </Badge>
              </div>
              <p className="text-[11px] text-zinc-400">Your Deadline, Your Design</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenSubmissionKit}
            className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-950/40 hover:text-white gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Submission Kit</span>
          </Button>
        </div>

        {/* Quick Presets Pills */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Quick Presets</span>
            <span className="text-[10px] text-zinc-500">1-click presets</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {PRESET_DEADLINES.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  deadline.title === p.title
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30'
                    : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border-zinc-800'
                }`}
              >
                {p.title.split(' ')[0]} {p.category.includes('Competition') ? '🏆' : ''}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="milestones" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="grid grid-cols-3 w-full bg-zinc-900/90 border border-zinc-800/80 p-1 mb-3">
          <TabsTrigger value="milestones" className="gap-1.5 text-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Milestones ({milestones.length})</span>
          </TabsTrigger>
          <TabsTrigger value="style" className="gap-1.5 text-xs">
            <Palette className="w-3.5 h-3.5" />
            <span>Theme & Safe Zones</span>
          </TabsTrigger>
          <TabsTrigger value="deadline" className="gap-1.5 text-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>Deadline Details</span>
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-y-auto pr-1">
          {/* TAB 1: MILESTONES */}
          <TabsContent value="milestones" className="space-y-3 mt-0">
            {/* AI Backward Planner Card */}
            <Card className="border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-zinc-900/60 to-purple-950/30 p-3.5 shadow-inner">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <Wand2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs font-bold text-white">Gemini AI Backward Planner</span>
                </div>
                <Button
                  size="sm"
                  onClick={handleAiDecompose}
                  disabled={isAiGenerating}
                  className="h-7 text-[11px] gap-1 bg-indigo-600 hover:bg-indigo-500"
                >
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {isAiGenerating ? 'Synthesizing...' : 'Auto-Decompose'}
                </Button>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Reverse-engineers target date into 5 tactical checkpoints leading directly to the finish line.
              </p>

              <div className="mt-2 pt-1.5 border-t border-zinc-800/60">
                <button
                  type="button"
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
                >
                  <span>{showApiKeyInput ? 'Hide Custom Gemini Key' : '+ Add custom Google Gemini API key'}</span>
                </button>
                {showApiKeyInput && (
                  <Input
                    type="password"
                    placeholder="Enter Google Gemini API key (optional)"
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    className="mt-1.5 h-8 text-[11px] bg-black/60 border-zinc-800"
                  />
                )}
              </div>
            </Card>

            {/* Milestones Checkpoint List */}
            <div className="space-y-2">
              {milestones.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-start gap-2.5 group hover:border-zinc-700 transition"
                >
                  <button
                    type="button"
                    onClick={() => handleToggleMilestone(m.id)}
                    className="mt-1 flex-shrink-0 text-zinc-500 hover:text-emerald-400 transition"
                  >
                    {m.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Circle className="w-4 h-4 text-zinc-600 hover:text-zinc-400" />
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
                        className={`w-full text-xs font-semibold bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-indigo-500 focus:outline-none transition ${m.done ? 'line-through text-zinc-500' : 'text-zinc-100'}`}
                      />
                      <input
                        type="text"
                        value={m.date}
                        onChange={(e) => {
                          const val = e.target.value;
                          setMilestones(prev => prev.map(item => item.id === m.id ? { ...item, date: val } : item));
                        }}
                        className="w-24 text-[10px] font-mono text-right text-zinc-400 bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-indigo-500 focus:outline-none flex-shrink-0"
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
                      className="w-full text-[10px] text-zinc-400 bg-transparent border-b border-transparent hover:border-zinc-700 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteMilestone(m.id)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-rose-400 p-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleAddMilestone}
              className="w-full border-dashed border-zinc-700 hover:border-zinc-600 gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Milestone Checkpoint</span>
            </Button>
          </TabsContent>

          {/* TAB 2: STYLE & DEVICE */}
          <TabsContent value="style" className="space-y-4 mt-0">
            {/* Device Profiles */}
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Device Mockup Preview
              </span>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(DEVICE_PROFILES).map(d => (
                  <button
                    key={d.id}
                    onClick={() => setDeviceProfileId(d.id)}
                    className={`p-2.5 rounded-xl text-left border transition ${
                      deviceProfileId === d.id
                        ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-sm'
                        : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {d.id === 'desktop4k' ? <Monitor className="w-3.5 h-3.5 text-cyan-400" /> : <Smartphone className="w-3.5 h-3.5 text-indigo-400" />}
                      <span className="text-xs font-bold leading-none">{d.id === 'iphone16pro' ? 'iPhone' : d.id === 'pixel9pro' ? 'Pixel 9' : 'Desktop'}</span>
                    </div>
                    <span className="text-[9px] text-zinc-500 block">{d.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Radix Switches for Lock Screen Controls */}
            <Card className="p-3.5 space-y-3 bg-zinc-900/60 border-zinc-800">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block">
                Lock Screen Hardware Controls
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-zinc-200 block">Show Native OS Clock</span>
                  <span className="text-[10px] text-zinc-400">Simulate native lock screen clock & widgets</span>
                </div>
                <Switch
                  checked={showOsOverlay}
                  onCheckedChange={setShowOsOverlay}
                />
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-zinc-800/80">
                <div>
                  <span className="text-xs font-medium text-zinc-200 block">Safe Zone Overlays</span>
                  <span className="text-[10px] text-zinc-400">Inspect negative space reserved for clock/icons</span>
                </div>
                <Switch
                  checked={showSafeZones}
                  onCheckedChange={setShowSafeZones}
                />
              </div>
            </Card>

            {/* Theme Presets */}
            <div>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                Aesthetic Color Theme
              </span>
              <div className="space-y-2">
                {Object.values(PRESET_THEMES).map(t => (
                  <button
                    key={t.id}
                    onClick={() => setThemeId(t.id)}
                    className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition ${
                      themeId === t.id
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-sm'
                        : 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div 
                        className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                        style={{ backgroundColor: t.primaryColor }}
                      />
                      <div>
                        <span className="text-xs font-bold text-white block">{t.name}</span>
                        <span className="text-[10px] text-zinc-400">{t.description}</span>
                      </div>
                    </div>
                    {themeId === t.id && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: DEADLINE DETAILS */}
          <TabsContent value="deadline" className="space-y-3.5 mt-0">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Project / Deadline Name
              </label>
              <Input
                type="text"
                value={deadline.title}
                onChange={(e) => setDeadline({ ...deadline, title: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Target Date & Time (ISO)
              </label>
              <Input
                type="datetime-local"
                value={deadline.targetDate.slice(0, 16)}
                onChange={(e) => setDeadline({ ...deadline, targetDate: e.target.value })}
                className="font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Category
              </label>
              <Input
                type="text"
                value={deadline.category}
                onChange={(e) => setDeadline({ ...deadline, category: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Tagline / Subtext
              </label>
              <Input
                type="text"
                value={deadline.tagline}
                onChange={(e) => setDeadline({ ...deadline, tagline: e.target.value })}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Motivational Daily Anchor
              </label>
              <Textarea
                rows={2}
                value={deadline.dailyAnchor || ''}
                onChange={(e) => setDeadline({ ...deadline, dailyAnchor: e.target.value })}
              />
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Sticky Bottom Actions */}
      <div className="pt-3.5 mt-2 border-t border-zinc-800/80 flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            onClick={onOpenAOD}
            className="gap-1.5"
          >
            <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Always-On Mode</span>
          </Button>

          <Button
            variant="secondary"
            onClick={() => exportToICS(deadline, milestones)}
            className="gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sync Calendar</span>
          </Button>
        </div>

        <Button
          variant="gradient"
          size="lg"
          onClick={onOpenExport}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Lock Screen Wallpaper (HD)</span>
        </Button>
      </div>
    </Card>
  );
}
