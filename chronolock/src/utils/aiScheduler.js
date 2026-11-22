/**
 * AI Scheduler for T-Minus Backward Milestone Planning
 * Generates exact T-14, T-7, T-3, T-1 milestones with under-5-word descriptions.
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

export function generateTMinusMilestones(goalTitle, targetDateStr, answers = {}) {
  const target = new Date(targetDateStr);
  const now = new Date();
  const diffDays = Math.max(1, Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  // If time horizon is > 14 days, use T-14, T-7, T-3, T-1
  // If time horizon is shorter, proportionally scale
  let tOffsets = [14, 7, 3, 1, 0];
  if (diffDays <= 7) {
    tOffsets = [7, 5, 3, 1, 0];
  } else if (diffDays <= 3) {
    tOffsets = [3, 2, 1, 0];
  }

  // Pre-crafted high-impact under-5-word milestones tailored to goal types
  const lowerGoal = goalTitle.toLowerCase();
  let actionTemplates = [
    { t: 'T-14', title: 'Scope core requirements', note: 'Lock specifications & architecture' },
    { t: 'T-7', title: 'Complete first working draft', note: 'Eliminate major blocking risks' },
    { t: 'T-3', title: 'Stress test & polish', note: 'Full review and edge cases' },
    { t: 'T-1', title: 'Final dry run rehearsal', note: 'Ready for deployment' },
    { t: 'T-0', title: 'Execution & final ship', note: 'Deliver artifact and celebrate' }
  ];

  if (lowerGoal.includes('exam') || lowerGoal.includes('study') || lowerGoal.includes('test')) {
    actionTemplates = [
      { t: 'T-14', title: 'Summarize all lecture notes', note: 'Distill core formula sheets' },
      { t: 'T-7', title: 'Master midterm problem sets', note: 'Re-derive all missed questions' },
      { t: 'T-3', title: 'Full timed mock exam', note: 'Test under hall constraints' },
      { t: 'T-1', title: 'High yield formula review', note: 'Rest early and hydrate' },
      { t: 'T-0', title: 'Final exam execution', note: 'Deliver peak performance' }
    ];
  } else if (lowerGoal.includes('thanksgiving') || lowerGoal.includes('gather') || lowerGoal.includes('dinner') || lowerGoal.includes('party')) {
    actionTemplates = [
      { t: 'T-14', title: 'Finalize guest headcount', note: 'Confirm dietary preferences' },
      { t: 'T-7', title: 'Order centerpiece & turkey', note: 'Verify recipe equipment' },
      { t: 'T-3', title: 'Complete dry grocery haul', note: 'Deep clean dinner tables' },
      { t: 'T-1', title: 'Prep marinades & sides', note: 'Bake pies and chill wines' },
      { t: 'T-0', title: 'Host dinner gathering', note: 'Carve turkey and celebrate' }
    ];
  } else if (lowerGoal.includes('challenge') || lowerGoal.includes('contest') || lowerGoal.includes('hackathon')) {
    actionTemplates = [
      { t: 'T-14', title: 'Audit official contest rules', note: 'Map all four evaluation rubrics' },
      { t: 'T-7', title: 'Build working prototype core', note: 'Verify key user flows' },
      { t: 'T-3', title: 'Safe zone device testing', note: 'Calibrate iOS & Pixel mockups' },
      { t: 'T-1', title: 'Package deliverables & patch', note: 'Title, cover, link & writeup' },
      { t: 'T-0', title: 'Official contest submission', note: 'Submit before 11:59 PM PT' }
    ];
  }

  return actionTemplates.map((item, idx) => {
    const daysOffset = tOffsets[idx] !== undefined ? tOffsets[idx] : Math.max(0, 5 - idx);
    const milestoneDate = new Date(target.getTime() - daysOffset * 24 * 60 * 60 * 1000);

    const isPassed = milestoneDate.getTime() < now.getTime() && daysOffset > 0;

    return {
      id: idx + 1,
      tLabel: item.t,
      title: item.title, // Strict rule: under five words!
      date: milestoneDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      done: isPassed,
      note: item.note
    };
  });
}

export async function generateGeminiMilestones(goalTitle, category, targetDateStr, apiKey) {
  return generateTMinusMilestones(goalTitle, targetDateStr);
}
