import React from 'react';
import { Achievement, Language } from '../types/quiz';
import { translations } from '../i18n/translations';
import { CheckCircle2, Lock } from 'lucide-react';

interface AchievementsScreenProps {
  achievements: Achievement[];
  lang: Language;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
  achievements,
  lang,
}) => {
  const t = translations[lang];
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {t.achievements}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {lang === 'uz'
              ? 'Testlarni topshirish orqali barcha nishonlarni oching'
              : 'Открывайте награды за прохождение тестов'}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-4 py-2 text-xs font-bold text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-300">
          <span>Ochilgan nishonlar:</span>
          <span className="font-mono-numbers text-sm font-black">
            {unlockedCount} / {achievements.length}
          </span>
        </div>
      </div>

      {/* Grid of badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((ach) => {
          const progressPercent = Math.min(
            100,
            Math.round((ach.progress / ach.maxProgress) * 100)
          );

          return (
            <div
              key={ach.id}
              className={`relative overflow-hidden rounded-3xl border p-6 transition-all ${
                ach.unlocked
                  ? 'border-emerald-200/90 bg-white shadow-sm hover:shadow-md dark:border-emerald-900/40 dark:bg-slate-900'
                  : 'border-slate-200/80 bg-slate-50/50 opacity-75 dark:border-slate-800 dark:bg-slate-900/40'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm ${
                    ach.unlocked
                      ? 'bg-gradient-to-tr from-emerald-50 to-teal-100 dark:from-emerald-950 dark:to-teal-900'
                      : 'bg-slate-200 text-slate-400 grayscale dark:bg-slate-800'
                  }`}
                >
                  <span>{ach.icon}</span>
                </div>

                {ach.unlocked ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>{t.unlocked}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400">
                    <Lock className="h-3.5 w-3.5" />
                    <span>{t.locked}</span>
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {ach.title[lang]}
              </h3>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 min-h-[2.5rem]">
                {ach.description[lang]}
              </p>

              {/* Progress Bar */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1.5 font-mono-numbers">
                  <span>Jarayon:</span>
                  <span>
                    {ach.progress} / {ach.maxProgress}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ach.unlocked ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {ach.unlockedAt && (
                <div className="mt-3 text-[10px] text-slate-400">
                  Ochilgan sana: {new Date(ach.unlockedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
