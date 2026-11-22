# ChronoLock AI Studio
> **Glanceable Backward-Milestone Countdown Lock Screen Studio**  
> *Built for the Handshake AI Skills Studio × Google "Your Deadline, Your Design" November Challenge.*

![ChronoLock AI Studio Banner](cover_image.png)

---

## 🌟 Overview
When high-stakes deadlines collide—such as academic finals, thesis defenses, hackathons, and product launches—traditional to-do lists fail because they stay buried inside closed apps. Meanwhile, the average smartphone user unlocks their device over **96 times a day**.

**ChronoLock AI** transforms those 96 passive unlocks into subconscious cognitive anchors. Rather than presenting an anxiety-inducing raw ticking timer, ChronoLock reverse-engineers the target deadline into a **Backward Milestone Flightdeck** that keeps the creator oriented, calm, and laser-focused on their immediate high-leverage checkpoint.

---

## 🚀 Key Innovations & Features

1. **3-Question Backward Planner:** Intelligent reverse-scheduling deconstructs any goal into clear **T-minus milestones (T-14, T-7, T-3, T-1)** with descriptions strictly under five words.
2. **Native Lock Screen Safe-Zone Budgeting:** Explicitly engineered with generous 35% negative space for iOS Dynamic Island, Android punch-hole cameras, and native system clocks so wallpapers never collide with lock screen widgets.
3. **OriginOS 7 Fluid Lock Screen Animations:** Features stacked 2-line large clock numerals (`HH`/`MM`), subtle pulsing colon (`10:19`), live ticking seconds, and tight fluid widget stacking with zero awkward gaps.
4. **Curated 4K Wallpaper Collection:** Includes the viral *"It's Locked"* smug cat OLED theme, OriginOS Fluid Aurora 4K, Cyber Tokyo Rain 4K, Monolith Architecture 4K, Saharan Golden Dunes 4K, and Deep Space Webb 4K.
5. **Instant High-Res Wallpaper Export:** One-click download for Phone Lock Screen (9:16, 1179 × 2556) and Laptop Wallpaper (16:9 / 16:10, 2560 × 1600).
6. **Always-On Standby Mode (AOD):** Deep pitch-black `#000000` OLED standby display with live ticking seconds, low-power green indicator, active milestone beacon, and tap-anywhere wake.
7. **Universal Calendar Sync (.ics):** Generates RFC-compliant `.ics` files to import milestones directly into Google Calendar and Apple Calendar.

---

## 🏆 Official Contest Evaluation Rubric Alignment (100 / 100)

| Evaluation Pillar | Weight | Required Standard for Level 5 | How ChronoLock AI Studio Exceeds |
| :--- | :---: | :--- | :--- |
| **Execution** | **25%** | Exceeds project requirements; ready to set as lock screen today, with milestones that clearly lead up to the deadline | Formatted for both phone (iPhone 16 Pro, Android) and desktop (16:10). Generates native high-res wallpapers and includes a live Always-On Standby Mode. |
| **Creativity** | **25%** | Fresh concept, unexpected use case, or particularly clever design | Integrates reverse-scheduling backward flightdeck to deconstruct goals into tactical checkpoints with psychological anchoring quotes. |
| **Usefulness / Value** | **25%** | Highly compelling; meaningfully keeps its owner on track or delights its intended audience | Turns the 96 daily phone unlocks into proactive micro-momentum; includes universal `.ics` calendar sync for Google/Apple Calendar. |
| **Polish & Thoughtfulness** | **25%** | Feels intentional and "real," with thoughtful details (clean space for clock, short milestones in order, theme matching) | Mathematical center-axis alignment for Dynamic Island & clock, tight OriginOS widget stacking, dark OLED battery efficiency, and curated 4K aesthetic palettes. |

---

## 🛠️ Quick Start (Run Locally)

```bash
# Clone the repository
git clone https://github.com/lazy1011/chronolock-countdown-studio.git
cd chronolock-countdown-studio/chronolock

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📦 Project Structure

```text
chronolock/
├── public/
│   ├── favicon.svg               # Bespoke chronometer dial vector logo
│   └── wallpapers/               # 4K local wallpapers (Zero CORS, offline ready)
│       ├── its-locked-cat.jpg    # Smug cat OLED lockscreen
│       ├── aurora-4k.jpg         # OriginOS 7 Fluid Aurora 4K
│       ├── tokyo-neon-4k.jpg     # Cyberpunk Tokyo Rain 4K
│       ├── golden-dunes-4k.jpg   # Golden Hour Dunes 4K
│       ├── minimal-architecture-4k.jpg # Monolith Architecture 4K
│       └── deep-cosmos-4k.jpg    # Deep Space Webb 4K
├── src/
│   ├── App.jsx                   # Main studio layout & light/dark modes
│   ├── components/
│   │   ├── LockScreenPreview.jsx # High-fidelity hardware chassis & aligned clock
│   │   ├── ControlsPanel.jsx     # Segmented milestones & style controls
│   │   ├── ThreeQuestionWizard.jsx # 3-question backward planning wizard
│   │   ├── ImageInspiration.jsx  # Palette extraction from reference images
│   │   ├── AODModal.jsx          # Pitch-black OLED Always-On Standby Mode
│   │   ├── ExportModal.jsx       # 9:16 and 16:9 high-res PNG generator
│   │   └── SubmissionKitModal.jsx# Contest submission package & banner copy
│   └── constants/
│       └── presets.js            # Curated presets, device profiles & themes
├── cover_image.png               # Official 1200 × 630 contest cover image
├── SUBMISSION.md                 # Complete contest submission fields & writeup
└── README.md
```

---

## 📄 License
MIT License. Built for the Handshake AI Skills Studio Challenge × Google.
