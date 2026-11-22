/**
 * Generate iCalendar (.ics) format file from deadline and milestones
 */
export function exportToICS(deadline, milestones) {
  const pad = (n) => String(n).padStart(2, '0');
  const formatICSDate = (d) => {
    const date = new Date(d);
    return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
  };

  const nowStr = formatICSDate(new Date());
  const targetStr = formatICSDate(deadline.targetDate);

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ChronoLock AI Studio//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    // Main Deadline Event
    'BEGIN:VEVENT',
    `UID:deadline-${deadline.id || Date.now()}@chronolock.app`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${targetStr}`,
    `DTEND:${targetStr}`,
    `SUMMARY:🎯 DEADLINE: ${deadline.title}`,
    `DESCRIPTION:${deadline.tagline}\\n\\nMilestones:\\n${milestones.map((m, i) => `${i + 1}. ${m.title} (${m.date}) - ${m.note}`).join('\\n')}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: 24 hours left for ${deadline.title}`,
    'END:VALARM',
    'END:VEVENT'
  ];

  // Add milestone reminders
  milestones.forEach((m, idx) => {
    icsContent.push('BEGIN:VEVENT');
    icsContent.push(`UID:milestone-${m.id || idx}-${Date.now()}@chronolock.app`);
    icsContent.push(`DTSTAMP:${nowStr}`);
    icsContent.push(`SUMMARY:📍 Checkpoint ${idx + 1}: ${m.title}`);
    icsContent.push(`DESCRIPTION:${m.note || 'Milestone checkpoint leading to ' + deadline.title}`);
    icsContent.push('END:VEVENT');
  });

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${deadline.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-countdown.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
