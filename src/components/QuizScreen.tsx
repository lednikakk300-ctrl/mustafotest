import React, { useState, useEffect } from 'react';
import {
  Question,
  Language,
  Grade,
  SubjectId,
  Difficulty,
  UserAnswerRecord,
} from '../types/quiz';
import { translations, subjectsData, difficultyMeta } from '../i18n/translations';
import { sound } from '../utils/sound';
import { ConfirmModal } from './ConfirmModal';
import {
  Clock,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  LayoutGrid,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface QuizScreenProps {
  questions: Question[];
  grade: Grade;
  subject: SubjectId;
  difficulty: Difficulty;
  lang: Language;
  onFinishQuiz: (answers: UserAnswerRecord[], elapsedSeconds: number) => void;
  onCancelQuiz: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  grade,
  subject,
  difficulty,
  lang,
  onFinishQuiz,
  onCancelQuiz,
}) => {
  const t = translations[lang];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [isGridOpen, setIsGridOpen] = useState<boolean>(false);

  // Timer: count up elapsed seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentQ = questions[currentIndex];
  const totalCount = questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (opt: string) => {
    sound.playSelect();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: opt,
    }));
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex < totalCount - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsConfirmOpen(true);
    }
  };

  const handlePrev = () => {
    sound.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const toggleBookmark = () => {
    sound.playClick();
    setBookmarked((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  const handleConfirmFinish = () => {
    setIsConfirmOpen(false);
    // Assemble final user answers
    const answersList: UserAnswerRecord[] = questions.map((q, idx) => {
      const chosen = selectedAnswers[idx] || null;
      return {
        questionId: q.id,
        question: q,
        selectedOption: chosen,
        isCorrect: chosen === q.correctAnswer,
      };
    });

    onFinishQuiz(answersList, elapsedSeconds);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isConfirmOpen) return;
      if (['1', 'a', 'A'].includes(e.key) && currentQ?.options[0]) {
        handleSelectOption(currentQ.options[0]);
      } else if (['2', 'b', 'B'].includes(e.key) && currentQ?.options[1]) {
        handleSelectOption(currentQ.options[1]);
      } else if (['3', 'c', 'C'].includes(e.key) && currentQ?.options[2]) {
        handleSelectOption(currentQ.options[2]);
      } else if (['4', 'd', 'D'].includes(e.key) && currentQ?.options[3]) {
        handleSelectOption(currentQ.options[3]);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isConfirmOpen, currentQ]);

  const subjectInfo = subjectsData.find((s) => s.id === subject);
  const diffInfo = difficultyMeta[difficulty];
  const progressPercent = Math.round(((currentIndex + 1) / totalCount) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* 1. Header with Metadata, Timer, and Progress */}
      <div className="mb-6 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
          {/* Metadata breadcrumb without pills */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="text-slate-900 dark:text-white font-bold">
              {t.gradeLabel(grade)}
            </span>
            <span>·</span>
            <span>{subjectInfo?.name[lang]}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <span>{diffInfo.badge}</span>
              <span>{diffInfo.label[lang]}</span>
            </span>
          </div>

          {/* Quick telemetry indicators */}
          <div className="flex items-center gap-4 text-xs font-bold">
            {/* Timer */}
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
              <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-mono-numbers text-sm">{formatTimer(elapsedSeconds)}</span>
            </div>

            {/* Answered counter */}
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span>
                {answeredCount} / {totalCount}
              </span>
            </div>

            {/* Question Directory Toggle */}
            <button
              onClick={() => setIsGridOpen(!isGridOpen)}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">1-50</span>
            </button>
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
            <span className="font-bold text-slate-900 dark:text-white">
              {t.question} {currentIndex + 1} {t.of} {totalCount}
            </span>
            <span className="font-mono-numbers">{progressPercent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Question Navigation Grid Dropdown */}
      {isGridOpen && (
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg dark:border-slate-800 dark:bg-slate-900 animate-in fade-in duration-150">
          <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>{t.questionPalette}</span>
            <div className="flex items-center gap-3 text-[11px] font-normal text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Belgilangan
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Belgilanmagan
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-purple-500" /> Belgilab qo'yilgan
              </span>
            </div>
          </div>
          <div className="grid grid-cols-10 gap-1.5 sm:gap-2">
            {questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = idx === currentIndex;
              const isMarked = bookmarked[idx];

              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    setCurrentIndex(idx);
                    setIsGridOpen(false);
                  }}
                  className={`flex h-8 w-full items-center justify-center rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'border-2 border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900 scale-105'
                      : isMarked
                      ? 'bg-purple-100 text-purple-800 border border-purple-300 dark:bg-purple-950 dark:text-purple-300'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Main Question Card */}
      <div className="relative rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Top metadata & bookmark toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              {currentQ.topic}
            </span>
            <span aria-hidden="true">·</span>
            <span>{currentQ.difficulty.toUpperCase()}</span>
          </div>

          <button
            onClick={toggleBookmark}
            title={bookmarked[currentIndex] ? t.unflagQuestion : t.flagQuestion}
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
              bookmarked[currentIndex]
                ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300'
                : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Bookmark
              className={`h-4 w-4 ${bookmarked[currentIndex] ? 'fill-current' : ''}`}
            />
            <span className="hidden sm:inline">
              {bookmarked[currentIndex] ? t.unflagQuestion : t.flagQuestion}
            </span>
          </button>
        </div>

        {/* Question Text */}
        <h2 className="text-xl sm:text-2xl font-bold leading-relaxed text-slate-900 dark:text-white mb-8">
          {currentQ.question}
        </h2>

        {/* 4 Choices */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const letter = ['A', 'B', 'C', 'D'][optIdx] || `${optIdx + 1}`;
            const isSelected = selectedAnswers[currentIndex] === option;

            return (
              <button
                key={optIdx}
                onClick={() => handleSelectOption(option)}
                className={`group relative flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-2 border-emerald-600 bg-emerald-50/80 shadow-md shadow-emerald-600/10 dark:border-emerald-500 dark:bg-emerald-950/30'
                    : 'border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/80 dark:hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-3.5 pr-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors ${
                      isSelected
                        ? 'bg-emerald-600 text-white dark:bg-emerald-500'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {letter}
                  </div>
                  <span className="text-sm sm:text-base font-medium text-slate-900 dark:text-white">
                    {option}
                  </span>
                </div>

                {isSelected && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Bottom Navigation Controls */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 rounded-2xl border px-5 py-3 text-xs font-bold tracking-wide transition-all ${
            currentIndex > 0
              ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 cursor-pointer'
              : 'border-transparent text-slate-300 cursor-not-allowed dark:text-slate-700'
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
          <span>{t.prev}</span>
        </button>

        <button
          onClick={() => setIsConfirmOpen(true)}
          className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-3 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/50 cursor-pointer"
        >
          {t.finishTest}
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-xs font-bold tracking-wide text-white hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-sm transition-all cursor-pointer"
        >
          <span>{currentIndex === totalCount - 1 ? t.finishTest : t.next}</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Confirmation Finish Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        lang={lang}
        answeredCount={answeredCount}
        totalQuestions={totalCount}
        onConfirm={handleConfirmFinish}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};
