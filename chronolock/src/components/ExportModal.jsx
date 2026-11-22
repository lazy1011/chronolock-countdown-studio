import React, { useState } from 'react';
import { X, Download, Smartphone, Monitor, CheckCircle, Sparkles, Image as ImageIcon } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

export default function ExportModal({
  isOpen,
  onClose,
  deadline,
  previewRef
}) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [resolutionMode, setResolutionMode] = useState('iphone'); // 'iphone' | 'pixel' | 'desktop'

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      const node = document.getElementById('lockscreen-canvas-target');
      if (!node) {
        throw new Error('Canvas element not found');
      }

      // Generate PNG with html-to-image
      const dataUrl = await toPng(node, {
        quality: 0.98,
        pixelRatio: 2.5, // High resolution crisp export
        cacheBust: true,
      });

      // Create download trigger
      const link = document.createElement('a');
      link.download = `${deadline.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-lockscreen.png`;
      link.href = dataUrl;
      link.click();

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to export wallpaper:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Export Wallpaper</h3>
            <p className="text-xs text-slate-400">Ready to set as your lock screen today</p>
          </div>
        </div>

        {/* Resolution Selector */}
        <div className="space-y-2 mb-4">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Resolution</label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setResolutionMode('iphone')}
              className={`p-2.5 rounded-xl text-left border transition ${
                resolutionMode === 'iphone'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 mb-1 text-indigo-400" />
              <div className="text-xs font-bold">iPhone</div>
              <div className="text-[9px] text-slate-500">1179 × 2556</div>
            </button>

            <button
              onClick={() => setResolutionMode('pixel')}
              className={`p-2.5 rounded-xl text-left border transition ${
                resolutionMode === 'pixel'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 mb-1 text-cyan-400" />
              <div className="text-xs font-bold">Pixel / Android</div>
              <div className="text-[9px] text-slate-500">1280 × 2856</div>
            </button>

            <button
              onClick={() => setResolutionMode('desktop')}
              className={`p-2.5 rounded-xl text-left border transition ${
                resolutionMode === 'desktop'
                  ? 'bg-indigo-600/20 border-indigo-500 text-white'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-400'
              }`}
            >
              <Monitor className="w-3.5 h-3.5 mb-1 text-emerald-400" />
              <div className="text-xs font-bold">Desktop / 4K</div>
              <div className="text-[9px] text-slate-500">2560 × 1600</div>
            </button>
          </div>
        </div>

        {/* Instructions banner */}
        <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 mb-5 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-1.5 text-indigo-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How to apply on your phone:</span>
          </div>
          <ol className="list-decimal list-inside text-[11px] text-slate-400 space-y-1 pl-1">
            <li>Download the image to your device or AirDrop/save it.</li>
            <li>Go to <strong>Settings → Wallpaper → Set as Lock Screen</strong>.</li>
            <li>Position so the top safe zone aligns beneath your iOS/Android clock.</li>
          </ol>
        </div>

        {/* Download Action */}
        <button
          onClick={handleDownload}
          disabled={isExporting}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition active:scale-[0.99]"
        >
          {isExporting ? (
            <span>Rendering High-Res PNG...</span>
          ) : exportSuccess ? (
            <>
              <CheckCircle className="w-4 h-4 text-white" />
              <span>Wallpaper Saved Successfully!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Ultra HD Wallpaper (PNG)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
