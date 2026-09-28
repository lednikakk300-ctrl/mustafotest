import React from 'react';
import { Volume2, VolumeX, Moon, Sun, BookOpen, Search, BarChart3, Award } from 'lucide-react';
import { Language } from '../types/quiz';
import { translations } from '../i18n/translations';
import { sound } from '../utils/sound';

interface NavbarProps {
  currentTab: 'tests' | 'search' | 'stats' | 'achievements';
  onTabChange: (tab: 'tests' | 'search' | 'stats' | 'achievements') => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  isQuizActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  lang,
  onLangChange,
  theme,
  onThemeToggle,
  soundEnabled,
  onSoundToggle,
  isQuizActive,
}) => {
  const t = translations[lang];

  const handleNavClick = (tab: 'tests' | 'search' | 'stats' | 'achievements') => {
    sound.playClick();
    if (isQuizActive) {
      const confirmLeave = window.confirm(
        lang === 'uz'
          ? 'Hozir test davom etmoqda. Boshqa sahifaga o‘tsangiz, test jarayoni to‘xtatiladi. Davom ettirasizmi?'
          : lang === 'ru'
          ? 'Тест продолжается. При переходе на другую страницу текущий прогресс теста будет сброшен. Продолжить?'
          : 'Quiz is in progress. Leaving this page will cancel the current quiz. Continue?'
      );
      if (!confirmLeave) return;
    }
    onTabChange(tab);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-colors dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('tests')}
          className="group flex items-center gap-2.5 text-left text-xl font-bold tracking-tight text-slate-900 transition-transform active:scale-95 dark:text-white"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-sm shadow-emerald-500/20">
            <span className="font-display text-lg font-bold">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-black tracking-wider text-slate-900 dark:text-white">
              AQL TEST
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-1 rounded-xl p-1 bg-slate-100/80 dark:bg-slate-800/80">
          <button
            onClick={() => handleNavClick('tests')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
              currentTab === 'tests'
                ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>{t.testsNav}</span>
          </button>

          <button
            onClick={() => handleNavClick('search')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
              currentTab === 'search'
                ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <Search className="h-4 w-4" />
            <span>{t.searchNav}</span>
          </button>

          <button
            onClick={() => handleNavClick('stats')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
              currentTab === 'stats'
                ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>{t.statsNav}</span>
          </button>

          <button
            onClick={() => handleNavClick('achievements')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
              currentTab === 'achievements'
                ? 'bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-400'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
            }`}
          >
            <Award className="h-4 w-4" />
            <span>{t.achievementsNav}</span>
          </button>
        </nav>

        {/* Zone 3: Actions (Sound, Theme, Language) */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onSoundToggle}
            title={soundEnabled ? t.soundOn : t.soundOff}
            aria-label="Toggle Sound"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onThemeToggle}
            title={theme === 'dark' ? t.themeLight : t.themeDark}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>

          {/* Language Selector */}
          <div className="relative">
            <select
              value={lang}
              onChange={(e) => onLangChange(e.target.value as Language)}
              aria-label="Language"
              className="h-9 appearance-none rounded-lg border border-slate-200 bg-white pl-2.5 pr-7 text-xs font-semibold text-slate-700 transition-colors focus:border-emerald-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="uz">🇺🇿 O‘zbek</option>
              <option value="ru">🇷🇺 Русский</option>
              <option value="en">🇬🇧 English</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
              <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-200/80 bg-white px-3 py-1.5 dark:border-slate-800 dark:bg-slate-900 justify-around">
        <button
          onClick={() => handleNavClick('tests')}
          className={`flex flex-col items-center py-1 px-2 text-[11px] font-medium transition-colors ${
            currentTab === 'tests' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span className="mt-0.5">{t.testsNav}</span>
        </button>
        <button
          onClick={() => handleNavClick('search')}
          className={`flex flex-col items-center py-1 px-2 text-[11px] font-medium transition-colors ${
            currentTab === 'search' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Search className="h-4 w-4" />
          <span className="mt-0.5">{t.searchNav}</span>
        </button>
        <button
          onClick={() => handleNavClick('stats')}
          className={`flex flex-col items-center py-1 px-2 text-[11px] font-medium transition-colors ${
            currentTab === 'stats' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span className="mt-0.5">{t.statsNav}</span>
        </button>
        <button
          onClick={() => handleNavClick('achievements')}
          className={`flex flex-col items-center py-1 px-2 text-[11px] font-medium transition-colors ${
            currentTab === 'achievements' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <Award className="h-4 w-4" />
          <span className="mt-0.5">{t.achievementsNav}</span>
        </button>
      </div>
    </header>
  );
};
