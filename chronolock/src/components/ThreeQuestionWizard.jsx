import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, Calendar, Clock, Target } from 'lucide-react';
import { generateTMinusMilestones } from '../utils/aiScheduler';

export default function ThreeQuestionWizard({
  isOpen,
  onClose,
  onApplyPlan
}) {
  const [step, setStep] = useState(1);
  const [goalName, setGoalName] = useState('Final Examinations');
  const [targetDate, setTargetDate] = useState('2026-12-15T09:00');
  const [hoursPerWeek, setHoursPerWeek] = useState('15 hours / week (2-3 hrs daily)');
  const [bottleneck, setBottleneck] = useState('Formula memorization & problem sets');

  if (!isOpen) return null;

  const handleFinish = () => {
    const milestones = generateTMinusMilestones(goalName, targetDate, {
      hoursPerWeek,
      bottleneck
    });

    onApplyPlan({
      title: goalName,
      targetDate: targetDate,
      category: 'T-Minus Schedule',
      tagline: `${hoursPerWeek} • Tackling ${bottleneck.slice(0, 30)}`,
      milestones
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="bg-[#111114] border border-neutral-800 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 flex items-center justify-center transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Wizard Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              Step {step} of 3 • T-Minus Backward Planner
            </span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Plan Backward from Your Deadline</h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Answer 3 quick schedule questions to build your T-14, T-7, T-3, T-1 flightdeck.
          </p>
        </div>

        {/* Question 1: Goal & Target Date */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-200">
                1. What is your goal or deadline?
              </label>
              <input
                type="text"
                placeholder="e.g. Final Exams, Thanksgiving Dinner, SaaS Launch"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-200">
                Target Date & Time
              </label>
              <input
                type="datetime-local"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white font-mono focus:outline-none focus:border-neutral-600"
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full h-11 mt-2 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <span>Next: Schedule Availability</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Question 2: Schedule & Availability */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-200">
                2. How much focused time can you commit?
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Light Pace (1-2 hrs / day)',
                  'Steady Pace (3-4 hrs / day)',
                  'Intensive Sprint (Weekend Block / Full-Time)'
                ].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setHoursPerWeek(opt)}
                    className={`p-3 rounded-xl text-left text-xs font-medium border transition ${
                      hoursPerWeek === opt
                        ? 'bg-neutral-800 text-white border-neutral-600'
                        : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-11 px-4 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 text-xs font-medium hover:bg-neutral-800 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 h-11 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <span>Next: Critical Bottleneck</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question 3: Key Bottleneck / Blocker */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-200">
                3. What is the single biggest bottleneck or risk?
              </label>
              <input
                type="text"
                placeholder="e.g. Memorizing formulas, turkey cooking time, API rate limits"
                value={bottleneck}
                onChange={(e) => setBottleneck(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
              <p className="text-[11px] text-neutral-500">
                We'll position your T-7 and T-3 milestones to eliminate this exact obstacle first.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="h-11 px-4 rounded-xl border border-neutral-800 bg-neutral-900 text-neutral-300 text-xs font-medium hover:bg-neutral-800 transition"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="flex-1 h-11 rounded-xl bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Sparkles className="w-4 h-4 text-neutral-900" />
                <span>Generate T-Minus Lock Screen</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
