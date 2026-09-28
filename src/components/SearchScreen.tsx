import React, { useState, useMemo } from 'react';
import { Language, Grade, SubjectId } from '../types/quiz';
import { translations, subjectsData } from '../i18n/translations';
import { CURRICULUM_BANK } from '../data/curriculumBank';
import { sound } from '../utils/sound';
import {
  Search as SearchIcon,
  BookOpen,
  Eye,
  EyeOff,
  Filter,
  CheckCircle2,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface SearchScreenProps {
  lang: Language;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({ lang }) => {
  const t = translations[lang];

  const [query, setQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<Grade | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | 'all'>('all');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const popularQueries = [
    'Amir Temur',
    'Fotosintez',
    'Om qonuni',
    'Mendeleyev jadvali',
    'O‘tkan kunlar',
    'Python',
    'Arximed kuchi',
    'Ekvator',
    'DNK',
  ];

  const toggleReveal = (idx: number) => {
    sound.playClick();
    setRevealedAnswers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CURRICULUM_BANK.filter((item) => {
      // Grade filter
      if (selectedGrade !== 'all') {
        if (selectedGrade < item.minGrade || selectedGrade > item.maxGrade) {
          return false;
        }
      }

      // Subject filter
      if (selectedSubject !== 'all') {
        if (item.subject !== selectedSubject) {
          return false;
        }
      }

      // Text query match across uz, ru, en question, topic, and explanation
      if (!q) return true;

      const inQuestion =
        item.questionUz.toLowerCase().includes(q) ||
        item.questionRu.toLowerCase().includes(q) ||
        item.questionEn.toLowerCase().includes(q);

      const inTopic =
        item.topicUz.toLowerCase().includes(q) ||
        item.topicRu.toLowerCase().includes(q) ||
        item.topicEn.toLowerCase().includes(q);

      const inExplanation =
        item.explanationUz.toLowerCase().includes(q) ||
        item.explanationRu.toLowerCase().includes(q);

      const inOptions = item.optionsUz.some((opt) => opt.toLowerCase().includes(q));

      return inQuestion || inTopic || inExplanation || inOptions;
    });
  }, [query, selectedGrade, selectedSubject]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          {t.searchTitle}
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {t.searchDesc}
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="relative mb-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
          <SearchIcon className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm font-medium text-slate-900 shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            Tozalash
          </button>
        )}
      </div>

      {/* Trending Search Suggestions */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-slate-400 flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Ommabop:
        </span>
        {popularQueries.map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              sound.playClick();
              setQuery(item);
            }}
            className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 cursor-pointer"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Filter Controls Bar */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Grade Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5">
            {t.filterGrade}
          </label>
          <select
            value={selectedGrade}
            onChange={(e) =>
              setSelectedGrade(
                e.target.value === 'all' ? 'all' : (Number(e.target.value) as Grade)
              )
            }
            className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">{t.allGrades}</option>
            {Array.from({ length: 11 }, (_, i) => i + 1).map((g) => (
              <option key={g} value={g}>
                {t.gradeLabel(g as Grade)}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-500 mb-1.5">
            {t.filterSubject}
          </label>
          <select
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(e.target.value as SubjectId | 'all')
            }
            className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="all">{t.allSubjects}</option>
            {subjectsData.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name[lang]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Results List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Topilgan natijalar: {filteredItems.length}</span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center dark:border-slate-800">
            <BookOpen className="mx-auto h-10 w-10 text-slate-400 mb-3" />
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {t.noQuestionsFound}
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedGrade('all');
                setSelectedSubject('all');
              }}
              className="mt-4 inline-block text-xs font-bold text-emerald-600 hover:underline dark:text-emerald-400 cursor-pointer"
            >
              Filtrlarni tozalash
            </button>
          </div>
        ) : (
          filteredItems.map((item, idx) => {
            const isRevealed = revealedAnswers[idx];
            const subjectObj = subjectsData.find((s) => s.id === item.subject);
            const questionText =
              lang === 'ru'
                ? item.questionRu
                : lang === 'en'
                ? item.questionEn
                : item.questionUz;
            const options =
              lang === 'ru'
                ? item.optionsRu
                : lang === 'en'
                ? item.optionsEn
                : item.optionsUz;
            const explanation =
              lang === 'ru'
                ? item.explanationRu
                : lang === 'en'
                ? item.explanationEn
                : item.explanationUz;
            const topic =
              lang === 'ru'
                ? item.topicRu
                : lang === 'en'
                ? item.topicEn
                : item.topicUz;

            const correctOption = options[item.correctIndex];

            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                {/* Header metadata */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">
                      {subjectObj?.name[lang]}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {item.minGrade}-{item.maxGrade}-sinflar
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {topic}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleReveal(idx)}
                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" />
                        <span>{t.hideAnswer}</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" />
                        <span>{t.revealAnswer}</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {questionText}
                </h3>

                {/* Answer Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {options.map((opt, optIdx) => {
                    const isCorrect = isRevealed && optIdx === item.correctIndex;
                    return (
                      <div
                        key={optIdx}
                        className={`rounded-xl border p-3 text-xs font-medium transition-colors ${
                          isCorrect
                            ? 'border-emerald-500 bg-emerald-50 font-bold text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-300'
                            : 'border-slate-100 bg-slate-50/60 text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300'
                        }`}
                      >
                        <span className="mr-2 font-bold text-slate-400">
                          {['A', 'B', 'C', 'D'][optIdx]})
                        </span>
                        <span>{opt}</span>
                        {isCorrect && (
                          <span className="ml-2 inline-flex items-center text-emerald-600">
                            ✓ To'g'ri javob
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation reveal */}
                {isRevealed && (
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-xs dark:border-emerald-900/50 dark:bg-emerald-950/30 animate-in fade-in duration-150">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-1">
                      <HelpCircle className="h-3.5 w-3.5 text-emerald-600" />
                      {t.explanation}:
                    </span>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
