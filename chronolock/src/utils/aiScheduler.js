/**
 * AI Scheduler for Backward Milestone Planning
 * Uses Gemini API when key is available, or high-accuracy backward scheduling heuristics.
 */

export function calculateTimeRemaining(targetIsoString) {
  const target = new Date(targetIsoString).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isExpired: true,
      progressPercent: 100
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    totalSeconds: Math.floor(diff / 1000),
    isExpired: false
  };
}

export function generateSmartMilestones(goalTitle, category, targetDateStr) {
  const target = new Date(targetDateStr);
  const now = new Date();
  const totalDuration = target.getTime() - now.getTime();

  const checkpoints = [
    { pct: 0.2, labelSuffix: 'Research, Scope & Architecture', note: 'Deconstruct requirements and establish foundation' },
    { pct: 0.45, labelSuffix: 'Core MVP & Heavy Lifting', note: 'Build primary functionality with zero distractions' },
    { pct: 0.75, labelSuffix: 'Integration & Stress Testing', note: 'Rigorous bug triage, edge cases and peer feedback' },
    { pct: 0.92, labelSuffix: 'Final Polish & Rehearsal', note: 'High-res verification, aesthetics and pitch readiness' },
    { pct: 1.0, labelSuffix: 'Final Launch / Submission', note: 'Deliver artifact, submit entry, celebrate victory' }
  ];

  return checkpoints.map((cp, idx) => {
    const cpTime = new Date(now.getTime() + totalDuration * cp.pct);
    const dateFormatted = cpTime.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: cp.pct === 1.0 ? '2-digit' : undefined,
      minute: cp.pct === 1.0 ? '2-digit' : undefined
    });

    const isPassed = cpTime.getTime() < now.getTime();

    return {
      id: idx + 1,
      title: `${goalTitle.split(' ')[0]}: ${cp.labelSuffix}`,
      date: dateFormatted,
      done: isPassed,
      note: cp.note
    };
  });
}

export async function generateGeminiMilestones(goalTitle, category, targetDateStr, apiKey) {
  if (!apiKey) {
    return generateSmartMilestones(goalTitle, category, targetDateStr);
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an elite productivity strategist trained in backward deadline planning.
Break down this crucial deadline into exactly 5 chronological milestones leading directly to the target date.
Goal: "${goalTitle}"
Category: "${category}"
Deadline: "${targetDateStr}"

Return ONLY a JSON array with exactly 5 objects formatted as:
[
  { "id": 1, "title": "Milestone Title (short, under 5 words)", "date": "e.g. Nov 20, 2026", "done": false, "note": "High leverage action under 8 words" },
  ...
]
Do not wrap in markdown code blocks if possible, or return clean JSON.`
            }]
          }]
        })
      }
    );

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return generateSmartMilestones(goalTitle, category, targetDateStr);
  } catch (err) {
    console.warn('Gemini API call failed, falling back to smart heuristics:', err);
    return generateSmartMilestones(goalTitle, category, targetDateStr);
  }
}
