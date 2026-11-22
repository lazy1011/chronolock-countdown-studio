import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  FileText
} from 'lucide-react';

export default function SubmissionKitModal({
  isOpen,
  onClose,
  deadline
}) {
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen) return null;

  const projectTitle = `T-MINUS COUNTDOWN: ${deadline.title.toUpperCase()}`;
  
  const markdownCopyText = `## T-MINUS COUNTDOWN: ${deadline.title.toUpperCase()}
Handshake AI Skills Studio × Google Challenge Submission

### Overview
When academic finals, critical project deadlines, or holiday gatherings collide, traditional to-do lists fail because they stay buried inside closed apps. 

T-Minus Countdown turns every phone unlock into glanceable accountability. Working backward from the target deadline, it reverse-engineers a sequence of clear T-minus milestones (T-14, T-7, T-3, T-1) with concise under-5-word descriptions and clean checkbox states.

### Key Features
1. Backward T-Minus Scheduling: Deconstructs goals into high-impact checkpoints (T-14, T-7, T-3, T-1) with under-5-word actions.
2. Safe-Zone Architecture: Dedicated negative space at the top preserves unblocked headroom for native iOS/Android clocks.
3. Multi-Format Wallpaper Engine: Exports crisp 9:16 vertical phone lock screens (1179×2556) and 16:9 laptop wallpapers (2560×1600).
4. Image Palette Inspiration: Extracts harmonious color palettes directly from uploaded reference imagery.
5. Daily Schedule Alarms: Automated daily check at chosen time alerting for milestones due today or tomorrow.

### Official Contest Evaluation Alignment
- Execution (25%): Exceeds project requirements; ready to set as lock screen today with clear backward milestones.
- Creativity (25%): Transforms passive wallpaper into an active T-minus flightdeck.
- Usefulness (25%): Replaces distraction with glanceable progress 90+ times a day.
- Polish (25%): Meticulous typography, unblocked clock headroom, and OLED contrast.`;

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleDownloadCoverImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Clean dark background
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, 1200, 630);

    // Subtle edge border
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 1140, 570);

    // Header Tag
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '600 16px Inter, -apple-system, sans-serif';
    ctx.fillText('HANDSHAKE AI SKILLS STUDIO × GOOGLE', 80, 120);

    // Main Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px Inter, -apple-system, sans-serif';
    ctx.fillText('T-MINUS COUNTDOWN: ' + deadline.title.toUpperCase(), 80, 190);

    // Subtitle
    ctx.fillStyle = '#71717a';
    ctx.font = '22px Inter, -apple-system, sans-serif';
    ctx.fillText('Glanceable Backward Milestone Countdown Lock Screen', 80, 240);

    // Mockup Card
    ctx.fillStyle = '#18181b';
    ctx.strokeStyle = '#3f3f46';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(80, 290, 1040, 260, 20);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 36px monospace';
    ctx.fillText('02d : 14h : 38m : 19s REMAINING', 120, 360);

    ctx.fillStyle = '#e4e4e7';
    ctx.font = '500 18px Inter, -apple-system, sans-serif';
    ctx.fillText('[✓] T-14: Scope core requirements', 120, 420);
    ctx.fillText('[✓] T-7: Build working prototype core', 120, 455);
    ctx.fillText('[ ] T-3: Safe zone device testing', 120, 490);
    ctx.fillText('[ ] T-1: Package deliverables & patch', 120, 525);

    const link = document.createElement('a');
    link.download = 'T-Minus-Countdown-Cover-Image.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#111114] border border-neutral-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Official Submission Package</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Handshake × Google Challenge</h3>
          <p className="text-xs text-neutral-400 mt-0.5">Four deliverables formatted to submit directly into Handshake</p>
        </div>

        {/* 4 Required Submission Items */}
        <div className="space-y-4">
          {/* 1. Title */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-300">1. Project Title (Required)</span>
              <button
                type="button"
                onClick={() => copyToClipboard(projectTitle, 'title')}
                className="h-7 px-2.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 flex items-center gap-1 transition"
              >
                {copiedField === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'title' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-xs font-mono text-white bg-black/50 p-2.5 rounded-xl border border-neutral-800">
              {projectTitle}
            </p>
          </div>

          {/* 2. Cover Image */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-300">2. Project Cover Image (Required)</span>
              <button
                type="button"
                onClick={handleDownloadCoverImage}
                className="h-8 px-3 rounded-lg bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold flex items-center gap-1.5 transition active:scale-95"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official Banner (1200×630)</span>
              </button>
            </div>
            <p className="text-xs text-neutral-400">
              High-resolution cover image generated at 1200×630 px.
            </p>
          </div>

          {/* 3. Description (Rendered as Real Formatted HTML, no raw asterisks) */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-300">3. Project Description (Required)</span>
              <button
                type="button"
                onClick={() => copyToClipboard(markdownCopyText, 'desc')}
                className="h-7 px-2.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 flex items-center gap-1 transition"
              >
                {copiedField === 'desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'desc' ? 'Copied Markdown' : 'Copy Text'}</span>
              </button>
            </div>
            
            {/* Visual Clean Formatted Preview */}
            <div className="max-h-52 overflow-y-auto p-3.5 rounded-xl bg-black/50 border border-neutral-800 text-xs text-neutral-300 space-y-3 leading-relaxed">
              <div>
                <h4 className="font-bold text-white text-sm mb-1">{projectTitle}</h4>
                <p className="text-neutral-400 text-[11px]">Handshake AI Skills Studio × Google Challenge Submission</p>
              </div>

              <div>
                <h5 className="font-semibold text-neutral-200 mb-0.5">Overview</h5>
                <p className="text-neutral-400 text-[11px]">
                  When academic finals, critical project deadlines, or holiday gatherings collide, traditional to-do lists fail because they stay buried inside closed apps. 
                  T-Minus Countdown turns every phone unlock into glanceable accountability with backward T-minus milestones (T-14, T-7, T-3, T-1) with under-5-word actions and checkboxes.
                </p>
              </div>

              <div>
                <h5 className="font-semibold text-neutral-200 mb-1">Key Features</h5>
                <ul className="list-disc list-inside space-y-0.5 text-neutral-400 text-[11px]">
                  <li><strong className="text-neutral-200 font-medium">Backward T-Minus Scheduling:</strong> High-impact checkpoints under 5 words.</li>
                  <li><strong className="text-neutral-200 font-medium">Safe-Zone Architecture:</strong> Clean space at top for native system clocks.</li>
                  <li><strong className="text-neutral-200 font-medium">Multi-Format Wallpaper:</strong> 9:16 phone and 16:9 laptop formats.</li>
                  <li><strong className="text-neutral-200 font-medium">Image Palette Inspiration:</strong> Extract color vibes from reference images.</li>
                  <li><strong className="text-neutral-200 font-medium">Daily Alarms:</strong> Automated daily checks for upcoming milestones.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Link */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-300">4. Project Link / URL (Required)</span>
              <button
                type="button"
                onClick={() => copyToClipboard('https://github.com/pratikmohanty/chronolock-ai-studio', 'url')}
                className="h-7 px-2.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 flex items-center gap-1 transition"
              >
                {copiedField === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedField === 'url' ? 'Copied' : 'Copy URL'}</span>
              </button>
            </div>
            <p className="text-xs font-mono text-neutral-300 bg-black/50 p-2.5 rounded-xl border border-neutral-800">
              https://github.com/pratikmohanty/chronolock-ai-studio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
