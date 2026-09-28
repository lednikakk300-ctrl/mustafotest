import React, { useState } from 'react';
import { TestResult, Language } from '../types/quiz';
import { translations, subjectsData, difficultyMeta } from '../i18n/translations';
import { sound } from '../utils/sound';
import {
  BarChart3,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Trash2,
  BookOpen,
  TrendingUp,
} from 'lucide-react';

interface StatisticsScreenProps {
  results: TestResult[];
  lang: Language;
  onClearResults: () => void;
  onStartQuizTab: () => void;
}

export const StatisticsScreen: React.FC<StatisticsScreenProps> = ({
  results,
  lang,
  onClearResults,
  onStartQuizTab,
}) => {
  const t = translations[lang];

  // Aggregated calculations
  const totalTests = results.length;
  const totalQuestions = results.reduce((acc, r) => acc + r.totalQuestions, 0);
  const totalCorrect = results.reduce((acc, r) => acc + r.correctAnswers, 0);
  const totalWrong = results.reduce((acc, r) => acc + r.wrongAnswers, 0);
  const avgPercentage =
    totalTests > 0
      ? Math.round(results.reduce((acc, r) => acc + r.percentage, 0) / totalTests)
      : 0;
  const bestScore =
    totalTests > 0 ? Math.max(...results.map((r) => r.percentage)) : 0;

  // Breakdown by subject
  const subjectStats: Record<string, { total: number; correct: number; count: number }> = {};
  results.forEach((r) => {
    if (!subjectStats[r.subject]) {
      subjectStats[r.subject] = { total: 0, correct: 0, count: 0 };
    }
    subjectStats[r.subject].total += r.totalQuestions;
    subjectStats[r.subject].correct += r.correctAnswers;
    subjectStats[r.subject].count += 1;
  });

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleClear = () => {
    sound.playClick();
    const confirmed = window.confirm(
      lang === 'uz'
        ? 'Haqiqatan ham barcha test natijalarini tozalashni xohlaysizmi?'
        : 'Вы уверены, что хотите удалить историю тестов?'
    );
    if (confirmed) {
      onClearResults();
    }
  };

  if (totalTests === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
          <BarChart3 className="h-8 w-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
          {t.myResults}
        </h2>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          {t.noTestsYet}
        </p>
        <button
          onClick={() => {
            sound.playClick();
            onStartQuizTab();
          }}
          className="mt-6 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
        >
          {t.startTest}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {t.myResults}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {t.statistics}
          </p>
        </div>

        <button
          onClick={handleClear}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:border-slate-800 dark:hover:bg-rose-950/30 cursor-pointer"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Tarixni tozalash</span>
        </button>
      </div>

      {/* Numerical Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{t.completedTests}</span>
            <BookOpen className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900 dark:text-white font-mono-numbers">
            {totalTests}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Jami 50 talik testlar
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{t.totalQuestionsAnswered}</span>
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900 dark:text-white font-mono-numbers">
            {totalQuestions}
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold">
            {totalCorrect} to‘g‘ri · {totalWrong} noto‘g‘ri
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{t.averagePercentage}</span>
            <TrendingUp className="h-4 w-4 text-sky-500" />
          </div>
          <div className="mt-3 text-3xl font-black text-slate-900 dark:text-white font-mono-numbers">
            {avgPercentage}%
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Barcha fanlar bo‘yicha
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>{t.bestScore}</span>
            <Trophy className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-3 text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono-numbers">
            {bestScore}%
          </div>
          <div className="mt-1 text-xs text-slate-400">
            Eng yaxshi natijangiz
          </div>
        </div>
      </div>

      {/* Visual Charts: Subject Performance Breakdown */}
      <section className="mb-10 rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          Fanlar bo‘yicha o‘zlashtirish ko‘rsatkichi
        </h2>

        <div className="space-y-4">
          {Object.entries(subjectStats).map(([subjId, stat]) => {
            const subjMeta = subjectsData.find((s) => s.id === subjId);
            const rate = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;

            return (
              <div key={subjId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">
                    {subjMeta?.name[lang] || subjId} ({stat.count} ta test)
                  </span>
                  <span className="font-mono-numbers text-emerald-600 dark:text-emerald-400">
                    {rate}% ({stat.correct}/{stat.total})
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recent Tests Table / Cards */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-4">
          {t.recentTests}
        </h2>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {results.map((r) => {
            const subjObj = subjectsData.find((s) => s.id === r.subject);
            const dMeta = difficultyMeta[r.difficulty];
            const dateStr = new Date(r.date).toLocaleDateString(
              lang === 'uz' ? 'uz-UZ' : lang === 'ru' ? 'ru-RU' : 'en-US',
              { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }
            );

            return (
              <div
                key={r.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                    {r.grade}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">
                      {subjObj?.name[lang]} · {t.gradeLabel(r.grade)}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>{dMeta.badge} {dMeta.label[lang]}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatTime(r.timeSeconds)}
                      </span>
                      <span>·</span>
                      <span>{dateStr}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-left sm:text-right">
                    <span className="text-lg font-black text-slate-900 dark:text-white font-mono-numbers">
                      {r.percentage}%
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {r.correctAnswers} / {r.totalQuestions} to‘g‘ri
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
