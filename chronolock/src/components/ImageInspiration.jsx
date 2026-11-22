import React, { useRef } from 'react';
import { Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

const SAMPLE_INSPIRATIONS = [
  {
    name: 'Cosmic Titanium',
    colors: { bg: '#050507', accent: '#f97316', secondary: '#38bdf8', text: '#ffffff' },
    preview: 'linear-gradient(135deg, #050507 0%, #18181b 50%, #f97316 100%)'
  },
  {
    name: 'Golden Hour Dusk',
    colors: { bg: '#0a0604', accent: '#f59e0b', secondary: '#ef4444', text: '#fffbeb' },
    preview: 'linear-gradient(135deg, #0a0604 0%, #29180d 50%, #f59e0b 100%)'
  },
  {
    name: 'Nordic Glacier',
    colors: { bg: '#04070c', accent: '#38bdf8', secondary: '#818cf8', text: '#f0f9ff' },
    preview: 'linear-gradient(135deg, #04070c 0%, #0d1b2a 50%, #38bdf8 100%)'
  },
  {
    name: 'Deep Evergreen',
    colors: { bg: '#030805', accent: '#10b981', secondary: '#059669', text: '#ecfdf5' },
    preview: 'linear-gradient(135deg, #030805 0%, #062413 50%, #10b981 100%)'
  }
];

export default function ImageInspiration({ onApplyPalette }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Sample colors from image via canvas
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, 100, 100);
        const imgData = ctx.getImageData(0, 0, 100, 100).data;

        // Sample dominant color
        let r = 0, g = 0, b = 0;
        const totalPixels = 100 * 100;
        for (let i = 0; i < imgData.length; i += 16) {
          r += imgData[i];
          g += imgData[i + 1];
          b += imgData[i + 2];
        }
        const count = totalPixels / 4;
        const avgR = Math.round(r / count);
        const avgG = Math.round(g / count);
        const avgB = Math.round(b / count);

        const hexAccent = `#${((1 << 24) + (avgR << 16) + (avgG << 8) + avgB).toString(16).slice(1)}`;

        onApplyPalette({
          name: 'Custom Image Extraction',
          bg: '#08080a',
          accent: hexAccent,
          secondary: '#a1a1aa',
          text: '#ffffff'
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3 p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-xs font-semibold text-white">Image Palette & Vibe</span>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="h-7 px-2.5 rounded-lg border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 flex items-center gap-1 transition"
        >
          <Upload className="w-3 h-3 text-neutral-400" />
          <span>Upload Image</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <p className="text-[11px] text-neutral-400 leading-relaxed">
        Extract a harmonious color palette, mood, and accent vibe directly from an inspiration image.
      </p>

      {/* Preset Swatches */}
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {SAMPLE_INSPIRATIONS.map((samp, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onApplyPalette(samp.colors)}
            className="p-2 rounded-xl bg-neutral-950/60 border border-neutral-800 hover:border-neutral-700 flex items-center gap-2 text-left transition"
          >
            <div 
              className="w-5 h-5 rounded-lg shadow-inner flex-shrink-0"
              style={{ background: samp.preview }}
            />
            <span className="text-[11px] font-medium text-neutral-300 truncate">{samp.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
