import React from 'react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { Language } from '../types/quiz';
import { translations } from '../i18n/translations';

interface ConfirmModalProps {
  isOpen: boolean;
  lang: Language;
  answeredCount: number;
  totalQuestions: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  lang,
  answeredCount,
  totalQuestions,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl transition-all dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.confirmFinishTitle}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {t.confirmFinishDesc}
            </p>
          </div>
        </div>

        {/* Stats tally */}
        <div className="my-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-3.5 text-center dark:border-emerald-900/40 dark:bg-emerald-950/30">
            <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono-numbers">
              {answeredCount}
            </span>
            <div className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300">
              {t.answeredCount}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200/80 bg-amber-50/70 p-3.5 text-center dark:border-amber-900/40 dark:bg-amber-950/30">
            <span className="text-2xl font-black text-amber-700 dark:text-amber-400 font-mono-numbers">
              {unansweredCount}
            </span>
            <div className="text-xs font-semibold text-amber-800/80 dark:text-amber-300">
              {t.unansweredCount}
            </div>
          </div>
        </div>

        {unansweredCount > 0 && (
          <p className="mb-6 text-xs text-amber-700 dark:text-amber-400 font-medium text-center">
            ⚠️ {lang === 'uz'
              ? `Sizda hali ${unansweredCount} ta javob berilmagan savol bor!`
              : lang === 'ru'
              ? `У вас осталось ${unansweredCount} вопросов без ответа!`
              : `You still have ${unansweredCount} unanswered questions!`}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
          >
            {t.confirmCancel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-500 shadow-md shadow-emerald-600/20 transition-colors cursor-pointer"
          >
            {t.confirmYes}
          </button>
        </div>
      </div>
    </div>
  );
};
