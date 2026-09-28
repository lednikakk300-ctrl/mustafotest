import React, { useState, useEffect } from 'react';
import {
  TestResult,
  Language,
  UserAnswerRecord,
} from '../types/quiz';
import { translations, subjectsData, difficultyMeta } from '../i18n/translations';
import { launchConfetti } from '../utils/confetti';
import { sound } from '../utils/sound';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Filter,
  Check,
  X,
  HelpCircle,
} from 'lucide-react';

interface ResultScreenProps {
  result: TestResult;
  lang: Language;
  onRetake: () => void;
  onNewTest: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  lang,
  onRetake,
  onNewTest,
}) => {
  const t = translations[lang];
  const [showMistakes, setShowMistakes] = useState<boolean>(false);
  const [filterMode, setFilterMode] = useState<'mistakes' | 'all'>('mistakes');

  const { percentage, correctAnswers, wrongAnswers, timeSeconds, totalQuestions } = result;

  // Format time mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Determine category and styling
  const getCategory = (p: number) => {
    if (p >= 90) {
      return {
        label: t.categoryAlo,
        color: 'emerald',
        badge: '🌟',
        msg: lang === 'uz' ? 'Ajoyib natija! Siz fan bo‘yicha yuqori bilimga egasiz.' : 'Отличный результат!',
      };
    }
    if (p >= 75) {
      return {
        label: t.categoryJudaYaxshi,
        color: 'sky',
        badge: '👏',
        msg: lang === 'uz' ? 'Juda yaxshi natija! Bilimlaringiz mustahkam.' : 'Очень хороший результат!',
      };
    }
    if (p >= 60) {
      return {
        label: t.categoryYaxshi,
        color: 'amber',
        badge: '👍',
        msg: lang === 'uz' ? 'Yaxshi natija! Bir oz ko‘proq takrorlasangiz, a’lo bo‘ladi.' : 'Хороший результат!',
      };
    }
    if (p >= 40) {
      return {
        label: t.categoryOrtacha,
        color: 'orange',
        badge: '📖',
        msg: lang === 'uz' ? 'O‘rtacha natija. Mavzularni qayta ko‘rib chiqish tavsiya etiladi.' : 'Удовлетворительно.',
      };
    }
    return {
      label: t.categoryMashq,
      color: 'rose',
      badge: '💪',
      msg: lang === 'uz' ? 'Ko‘proq mashq qilish kerak. Xatolarni o‘rganib, qayta topshirib ko‘ring!' : 'Нужно больше тренироваться!',
    };
  };

  const category = getCategory(percentage);

  // Trigger celebration on high performance
  useEffect(() => {
    if (percentage >= 70) {
      launchConfetti();
      sound.playFanfare();
    }
  }, [percentage]);

  const mistakesList = result.answers.filter((a) => !a.isCorrect);
  const displayedAnswers = filterMode === 'mistakes' ? mistakesList : result.answers;

  // Circular progress calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const subjectMeta = subjectsData.find((s) => s.id === result.subject);
  const diffMeta = difficultyMeta[result.difficulty];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* 1. Master Result Card */}
      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-lg dark:border-slate-800 dark:bg-slate-900 text-center">
        {/* Category Header */}
        <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          <span>{t.gradeLabel(result.grade)}</span>
          <span>·</span>
          <span>{subjectMeta?.name[lang]}</span>
          <span>·</span>
          <span>{diffMeta.label[lang]}</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          {t.testCompleted}
        </h1>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
          {category.msg}
        </p>

        {/* Circular Percentage Chart */}
        <div className="my-8 flex justify-center">
          <div className="relative flex items-center justify-center">
            <svg className="h-48 w-48 -rotate-90 transform">
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="14"
                className="text-slate-100 dark:text-slate-800"
                fill="transparent"
              />
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="14"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-emerald-500 transition-all duration-1000 ease-out"
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="font-display text-4xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono-numbers">
                {percentage}%
              </span>
              <span className="mt-0.5 inline-block text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {category.label}
              </span>
            </div>
          </div>
        </div>

        {/* Grid of Key Numerical Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-8">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center dark:border-slate-800 dark:bg-slate-800/50">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.score}
            </div>
            <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white font-mono-numbers">
              {correctAnswers} / {totalQuestions}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-center dark:border-emerald-950 dark:bg-emerald-950/30">
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {t.correctAnswers}
            </div>
            <div className="mt-1 text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono-numbers">
              {correctAnswers}
            </div>
          </div>

          <div className="rounded-2xl border border-rose-100 bg-rose-50/60 p-4 text-center dark:border-rose-950 dark:bg-rose-950/30">
            <div className="text-xs font-semibold text-rose-700 dark:text-rose-400">
              {t.wrongAnswers}
            </div>
            <div className="mt-1 text-2xl font-black text-rose-700 dark:text-rose-400 font-mono-numbers">
              {wrongAnswers}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-center dark:border-slate-800 dark:bg-slate-800/50">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {t.timeTaken}
            </div>
            <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white font-mono-numbers">
              {formatTime(timeSeconds)}
            </div>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {wrongAnswers > 0 && (
            <button
              onClick={() => {
                sound.playClick();
                setShowMistakes(!showMistakes);
              }}
              className="flex items-center gap-2 rounded-2xl border-2 border-rose-500 bg-rose-50 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-rose-700 hover:bg-rose-100 transition-all dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-300 cursor-pointer shadow-sm"
            >
              <XCircle className="h-4 w-4" />
              <span>{showMistakes ? 'Xatolarni yashirish' : t.viewMistakes}</span>
              <span className="rounded-md bg-rose-200 px-1.5 py-0.5 text-[10px] font-black text-rose-900 dark:bg-rose-800 dark:text-white">
                {wrongAnswers}
              </span>
            </button>
          )}

          <button
            onClick={() => {
              sound.playClick();
              onRetake();
            }}
            className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-50 transition-all dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>{t.retakeTest}</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNewTest();
            }}
            className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <BookOpen className="h-4 w-4" />
            <span>{t.newTest}</span>
          </button>
        </div>
      </div>

      {/* 2. Review Mistakes Panel ("Xatolarimni ko‘rish") */}
      {showMistakes && (
        <section className="mt-10 animate-in fade-in duration-200">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                {t.viewMistakes} ({mistakesList.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Xatolardan saboq oling va mavzuni to‘liq o‘zlashtiring
              </p>
            </div>

            {/* Segmented Filter (Functional Button Tab) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl dark:bg-slate-800">
              <button
                onClick={() => setFilterMode('mistakes')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterMode === 'mistakes'
                    ? 'bg-white text-rose-700 shadow-sm dark:bg-slate-700 dark:text-rose-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {t.onlyMistakes} ({mistakesList.length})
              </button>
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  filterMode === 'all'
                    ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {t.allQuestions} ({totalQuestions})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {displayedAnswers.map((item, idx) => {
              const isWrong = !item.isCorrect;

              return (
                <div
                  key={idx}
                  className={`rounded-3xl border p-6 transition-all ${
                    isWrong
                      ? 'border-rose-200/90 bg-rose-50/40 dark:border-rose-950 dark:bg-rose-950/20'
                      : 'border-emerald-200/90 bg-emerald-50/40 dark:border-emerald-950 dark:bg-emerald-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                          isWrong
                            ? 'bg-rose-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {isWrong ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                      </span>
                      <span className="text-xs font-bold text-slate-500">
                        {t.question} #{idx + 1}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                        {item.question.topic}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
                    {item.question.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-4">
                    {/* User Answer */}
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                      <span className="font-semibold text-slate-400 block mb-1">
                        {t.yourAnswer}:
                      </span>
                      <span
                        className={`font-bold ${
                          isWrong
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {item.selectedOption ? item.selectedOption : '(Javob berilmadi)'}
                      </span>
                    </div>

                    {/* Correct Answer */}
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 dark:border-emerald-900/60 dark:bg-emerald-950/40">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-300 block mb-1">
                        {t.correctAnswerText}:
                      </span>
                      <span className="font-bold text-emerald-800 dark:text-emerald-200">
                        {item.question.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                    <span className="font-bold text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                      <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
                      {t.explanation}:
                    </span>
                    <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
