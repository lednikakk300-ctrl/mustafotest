import React, { useState } from 'react';
import {
  Grade,
  SubjectId,
  Difficulty,
  Language,
} from '../types/quiz';
import { translations, subjectsData, difficultyMeta } from '../i18n/translations';
import { sound } from '../utils/sound';
import {
  Calculator,
  Hourglass,
  Dna,
  Atom,
  FlaskConical,
  BookOpen,
  Feather,
  Globe2,
  Cpu,
  Compass,
  Sparkles,
  Zap,
  Flame,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Award,
} from 'lucide-react';

interface WelcomeScreenProps {
  lang: Language;
  onStartQuiz: (grade: Grade, subject: SubjectId, difficulty: Difficulty) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  lang,
  onStartQuiz,
}) => {
  const t = translations[lang];

  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const grades: Grade[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Calculator':
        return <Calculator className="h-6 w-6" />;
      case 'Hourglass':
        return <Hourglass className="h-6 w-6" />;
      case 'Dna':
        return <Dna className="h-6 w-6" />;
      case 'Atom':
        return <Atom className="h-6 w-6" />;
      case 'FlaskConical':
        return <FlaskConical className="h-6 w-6" />;
      case 'BookOpen':
        return <BookOpen className="h-6 w-6" />;
      case 'Feather':
        return <Feather className="h-6 w-6" />;
      case 'Globe2':
        return <Globe2 className="h-6 w-6" />;
      case 'Cpu':
        return <Cpu className="h-6 w-6" />;
      case 'Compass':
        return <Compass className="h-6 w-6" />;
      default:
        return <BookOpen className="h-6 w-6" />;
    }
  };

  const handleGradeSelect = (g: Grade) => {
    sound.playSelect();
    setSelectedGrade(g);
    setValidationError(null);
  };

  const handleSubjectSelect = (s: SubjectId) => {
    sound.playSelect();
    setSelectedSubject(s);
    setValidationError(null);
  };

  const handleDifficultySelect = (d: Difficulty) => {
    sound.playSelect();
    setSelectedDifficulty(d);
    setValidationError(null);
  };

  const handleStart = () => {
    if (!selectedGrade || !selectedSubject || !selectedDifficulty) {
      sound.playClick();
      setValidationError(t.pleaseSelectAll);
      return;
    }
    sound.playFanfare();
    onStartQuiz(selectedGrade, selectedSubject, selectedDifficulty);
  };

  const isReady = Boolean(selectedGrade && selectedSubject && selectedDifficulty);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* 1. Welcoming Hero Banner */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-8 sm:p-12 text-white shadow-xl shadow-emerald-900/10">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Maktab Bilimlar Viktorinasi</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight drop-shadow-sm">
            {t.appName}
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-medium text-emerald-50 max-w-xl">
            "{t.appSlogan}"
          </p>

          <p className="mt-2 text-sm text-emerald-100/90 leading-relaxed">
            {lang === 'uz'
              ? "1-sinfdan 11-sinfgacha bo'lgan maktab o'quvchilari uchun maxsus tayyorlangan 50 talik sifatli test sinovi."
              : lang === 'ru'
              ? "Специально разработанные тесты из 50 вопросов для учащихся с 1 по 11 класс."
              : "Quality comprehensive 50-question tests designed for students from Grade 1 to Grade 11."}
          </p>

          {/* Quick info metrics */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-100">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
              <span>50 ta saralangan savol</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-emerald-300" />
              <span>Haqiqiy vaqt hisoblagichi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-emerald-300" />
              <span>Xatolarni batafsil tahlil qilish</span>
            </div>
          </div>
        </div>

        {/* Decorative background visual elements */}
        <div className="pointer-events-none absolute -bottom-16 -right-12 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute top-0 right-1/4 h-48 w-48 rounded-full bg-cyan-400/20 blur-2xl" />
      </div>

      {/* Validation Message if triggered */}
      {validationError && (
        <div className="mb-8 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-600 dark:text-rose-400" />
          <span className="font-medium">{validationError}</span>
        </div>
      )}

      {/* STEP 1: CLASS SELECTION */}
      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-xs font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              1
            </span>
            <span>{t.selectClass}</span>
          </h2>
          {selectedGrade && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ {t.gradeLabel(selectedGrade)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
          {grades.map((g) => {
            const isSelected = selectedGrade === g;
            return (
              <button
                key={g}
                onClick={() => handleGradeSelect(g)}
                className={`relative flex flex-col items-center justify-center rounded-xl p-3 text-center transition-all ${
                  isSelected
                    ? 'border-2 border-emerald-600 bg-emerald-50 text-emerald-950 shadow-md shadow-emerald-500/10 dark:border-emerald-500 dark:bg-emerald-950/40 dark:text-white scale-105'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700/60'
                }`}
              >
                <span className="text-lg font-black">{g}</span>
                <span className="text-[11px] font-medium opacity-80">
                  {lang === 'uz' ? 'sinf' : lang === 'ru' ? 'кл' : 'gr'}
                </span>
                {isSelected && (
                  <div className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 2: SUBJECT SELECTION */}
      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-xs font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              2
            </span>
            <span>{t.selectSubject}</span>
          </h2>
          {selectedSubject && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ {subjectsData.find((s) => s.id === selectedSubject)?.name[lang]}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {subjectsData.map((subj) => {
            const isSelected = selectedSubject === subj.id;
            return (
              <button
                key={subj.id}
                onClick={() => handleSubjectSelect(subj.id)}
                className={`group relative flex flex-col items-start rounded-2xl p-4 text-left transition-all ${
                  isSelected
                    ? 'border-2 border-emerald-600 bg-emerald-50/70 shadow-md shadow-emerald-500/10 dark:border-emerald-500 dark:bg-emerald-950/30'
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/80 dark:hover:bg-slate-700/50'
                }`}
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                    isSelected
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-700 dark:bg-slate-700 dark:text-slate-300 dark:group-hover:bg-slate-600'
                  }`}
                >
                  {getSubjectIcon(subj.icon)}
                </div>

                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {subj.name[lang]}
                </span>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {subj.desc[lang]}
                </p>

                {isSelected && (
                  <div className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* STEP 3: DIFFICULTY SELECTION */}
      <section className="mb-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-xs font-black text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              3
            </span>
            <span>{t.selectDifficulty}</span>
          </h2>
          {selectedDifficulty && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ {difficultyMeta[selectedDifficulty].label[lang]}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(['oson', 'orta', 'qiyin'] as Difficulty[]).map((diff) => {
            const meta = difficultyMeta[diff];
            const isSelected = selectedDifficulty === diff;

            return (
              <button
                key={diff}
                onClick={() => handleDifficultySelect(diff)}
                className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 text-left transition-all ${
                  isSelected
                    ? diff === 'oson'
                      ? 'border-2 border-emerald-500 bg-emerald-50/80 shadow-lg shadow-emerald-500/15 dark:border-emerald-400 dark:bg-emerald-950/40 scale-[1.02]'
                      : diff === 'orta'
                      ? 'border-2 border-amber-500 bg-amber-50/80 shadow-lg shadow-amber-500/15 dark:border-amber-400 dark:bg-amber-950/40 scale-[1.02]'
                      : 'border-2 border-rose-500 bg-rose-50/80 shadow-lg shadow-rose-500/15 dark:border-rose-400 dark:bg-rose-950/40 scale-[1.02]'
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60 dark:border-slate-800 dark:bg-slate-800/80 dark:hover:bg-slate-700/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{meta.badge}</span>
                    {diff === 'oson' && <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                    {diff === 'orta' && <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
                    {diff === 'qiyin' && <Flame className="h-5 w-5 text-rose-600 dark:text-rose-400" />}
                  </div>

                  <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                    {meta.label[lang]}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                    {meta.sub[lang]}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-slate-500 dark:border-slate-700/60 dark:text-slate-400">
                  <span>50 ta savol</span>
                  {isSelected && (
                    <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                      Tanlandi <CheckCircle2 className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* START TEST CTA CONTAINER */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Tanlov xulosasi
            </span>
            <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <span>{selectedGrade ? t.gradeLabel(selectedGrade) : '---'}</span>
              <span className="text-slate-300 dark:text-slate-600">→</span>
              <span>
                {selectedSubject
                  ? subjectsData.find((s) => s.id === selectedSubject)?.name[lang]
                  : '---'}
              </span>
              <span className="text-slate-300 dark:text-slate-600">→</span>
              <span>
                {selectedDifficulty
                  ? `${difficultyMeta[selectedDifficulty].badge} ${difficultyMeta[selectedDifficulty].label[lang]}`
                  : '---'}
              </span>
              <span className="text-slate-300 dark:text-slate-600">→</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">50 ta savol</span>
            </div>
          </div>

          <button
            onClick={handleStart}
            disabled={!isReady}
            className={`flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all ${
              isReady
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg shadow-emerald-600/25 hover:from-emerald-500 hover:to-teal-500 active:scale-95 cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600'
            }`}
          >
            <span>{t.startTest}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
