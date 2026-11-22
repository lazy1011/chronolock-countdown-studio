import React, { useState } from 'react';
import { X, Download, Smartphone, Monitor, CheckCircle2 } from 'lucide-react';
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
  const [formatMode, setFormatMode] = useState('phone'); // 'phone' (9:16) | 'desktop' (16:9)

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
        pixelRatio: 2.5,
        cacheBust: true,
      });

      const filename = `T-MINUS-COUNTDOWN-${deadline.title.toUpperCase().replace(/[^A-Z0-9]/g, '-')}-${formatMode.toUpperCase()}.png`;
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      // Trigger celebratory confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to export wallpaper:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-[#111114] border border-neutral-800 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-5">
          <h3 className="text-base font-semibold text-white tracking-tight">Export Wallpaper</h3>
          <p className="text-xs text-neutral-400 mt-0.5">High-resolution lock screen formatted for your device</p>
        </div>

        {/* Aspect Ratio / Format Selector */}
        <div className="space-y-2 mb-5">
          <label className="text-[11px] font-medium text-neutral-400 block">Orientation & Resolution</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setFormatMode('phone')}
              className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                formatMode === 'phone'
                  ? 'bg-neutral-800 text-white border-neutral-600'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Smartphone className="w-4 h-4 text-neutral-300" />
                <span className="text-[10px] font-mono text-neutral-400">9:16</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Phone Lock Screen</div>
                <div className="text-[10px] font-mono text-neutral-500">1179 × 2556 px</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormatMode('desktop')}
              className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                formatMode === 'desktop'
                  ? 'bg-neutral-800 text-white border-neutral-600'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Monitor className="w-4 h-4 text-neutral-300" />
                <span className="text-[10px] font-mono text-neutral-400">16:9 / 16:10</span>
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Laptop Wallpaper</div>
                <div className="text-[10px] font-mono text-neutral-500">2560 × 1600 px</div>
              </div>
            </button>
          </div>
        </div>

        {/* Safe Zone Reminder */}
        <div className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 mb-6 text-xs text-neutral-300 space-y-1.5">
          <span className="text-[11px] font-semibold text-neutral-200 block">Clean Space Allocation</span>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            The top 35% of this wallpaper leaves generous negative space so your native iOS/Android clock and status icons sit cleanly without collisions.
          </p>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={isExporting}
          className="w-full h-11 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold flex items-center justify-center gap-2 transition active:scale-[0.99] shadow-sm disabled:opacity-50"
        >
          {isExporting ? (
            <span>Generating High-Resolution PNG...</span>
          ) : exportSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Wallpaper Saved to Downloads</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-neutral-950" />
              <span>Download T-Minus Wallpaper (PNG)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
