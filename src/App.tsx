import React, { useState, useEffect } from 'react';
import {
  Grade,
  SubjectId,
  Difficulty,
  Question,
  UserAnswerRecord,
  TestResult,
  Achievement,
  Language,
} from './types/quiz';
import { get50Questions } from './data/questionEngine';
import {
  getSavedResults,
  saveTestResult,
  getAchievements,
  getStoredTheme,
  setStoredTheme,
  getStoredLang,
  setStoredLang,
} from './utils/storage';
import { sound } from './utils/sound';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { SearchScreen } from './components/SearchScreen';
import { StatisticsScreen } from './components/StatisticsScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { Award, Sparkles, X } from 'lucide-react';

export default function App() {
  // Global App States
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [lang, setLang] = useState<Language>('uz');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<'tests' | 'search' | 'stats' | 'achievements'>('tests');

  // Quiz execution states
  const [quizState, setQuizState] = useState<'welcome' | 'in_progress' | 'result'>('welcome');
  const [activeGrade, setActiveGrade] = useState<Grade | null>(null);
  const [activeSubject, setActiveSubject] = useState<SubjectId | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [latestResult, setLatestResult] = useState<TestResult | null>(null);

  // Storage data states
  const [resultsHistory, setResultsHistory] = useState<TestResult[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [unlockedToast, setUnlockedToast] = useState<Achievement | null>(null);

  // Initial load
  useEffect(() => {
    const savedTheme = getStoredTheme();
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    setLang(getStoredLang());
    setSoundEnabled(sound.isEnabled());
    setResultsHistory(getSavedResults());
    setAchievements(getAchievements());
  }, []);

  // Theme toggle
  const handleThemeToggle = () => {
    sound.playClick();
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setStoredTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Sound toggle
  const handleSoundToggle = () => {
    const enabled = sound.toggle();
    setSoundEnabled(enabled);
  };

  // Language switch
  const handleLangChange = (newLang: Language) => {
    sound.playClick();
    setLang(newLang);
    setStoredLang(newLang);
  };

  // Start 50-Question Quiz
  const handleStartQuiz = (grade: Grade, subject: SubjectId, difficulty: Difficulty) => {
    setActiveGrade(grade);
    setActiveSubject(subject);
    setActiveDifficulty(difficulty);

    const questions50 = get50Questions(grade, subject, difficulty, lang);
    setQuizQuestions(questions50);
    setQuizState('in_progress');
  };

  // Finish Quiz
  const handleFinishQuiz = (answers: UserAnswerRecord[], elapsedSeconds: number) => {
    if (!activeGrade || !activeSubject || !activeDifficulty) return;

    const totalQuestions = answers.length;
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const wrongCount = totalQuestions - correctCount;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    const newResult: TestResult = {
      id: `result_${Date.now()}`,
      date: new Date().toISOString(),
      grade: activeGrade,
      subject: activeSubject,
      difficulty: activeDifficulty,
      totalQuestions,
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      percentage,
      timeSeconds: elapsedSeconds,
      answers,
    };

    // Save result and check for newly unlocked achievements
    const newlyUnlocked = saveTestResult(newResult);
    setResultsHistory(getSavedResults());
    setAchievements(getAchievements());
    setLatestResult(newResult);
    setQuizState('result');

    if (newlyUnlocked.length > 0) {
      setUnlockedToast(newlyUnlocked[0]);
      setTimeout(() => {
        setUnlockedToast(null);
      }, 5000);
    }
  };

  // Retake same test
  const handleRetake = () => {
    if (activeGrade && activeSubject && activeDifficulty) {
      handleStartQuiz(activeGrade, activeSubject, activeDifficulty);
    }
  };

  // New test selection
  const handleNewTest = () => {
    setQuizState('welcome');
    setActiveGrade(null);
    setActiveSubject(null);
    setActiveDifficulty(null);
    setQuizQuestions([]);
    setLatestResult(null);
  };

  // Clear all statistics history
  const handleClearHistory = () => {
    localStorage.removeItem('aql_test_results_v1');
    setResultsHistory([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          if (quizState === 'in_progress') {
            setQuizState('welcome');
          }
        }}
        lang={lang}
        onLangChange={handleLangChange}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        soundEnabled={soundEnabled}
        onSoundToggle={handleSoundToggle}
        isQuizActive={quizState === 'in_progress'}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentTab === 'tests' && (
          <>
            {quizState === 'welcome' && (
              <WelcomeScreen lang={lang} onStartQuiz={handleStartQuiz} />
            )}

            {quizState === 'in_progress' && (
              <QuizScreen
                questions={quizQuestions}
                grade={activeGrade!}
                subject={activeSubject!}
                difficulty={activeDifficulty!}
                lang={lang}
                onFinishQuiz={handleFinishQuiz}
                onCancelQuiz={handleNewTest}
              />
            )}

            {quizState === 'result' && latestResult && (
              <ResultScreen
                result={latestResult}
                lang={lang}
                onRetake={handleRetake}
                onNewTest={handleNewTest}
              />
            )}
          </>
        )}

        {currentTab === 'search' && <SearchScreen lang={lang} />}

        {currentTab === 'stats' && (
          <StatisticsScreen
            results={resultsHistory}
            lang={lang}
            onClearResults={handleClearHistory}
            onStartQuizTab={() => {
              setCurrentTab('tests');
              setQuizState('welcome');
            }}
          />
        )}

        {currentTab === 'achievements' && (
          <AchievementsScreen achievements={achievements} lang={lang} />
        )}
      </main>

      {/* Achievement Unlocked Toast Notification */}
      {unlockedToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 rounded-2xl border border-emerald-300 bg-white p-4 shadow-xl dark:border-emerald-700 dark:bg-slate-900 animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl dark:bg-emerald-950">
            {unlockedToast.icon}
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Yangi yutuq ochildi!</span>
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {unlockedToast.title[lang]}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {unlockedToast.description[lang]}
            </div>
          </div>
          <button
            onClick={() => setUnlockedToast(null)}
            className="ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Clean Educational Platform Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-slate-900 dark:text-white">
              AQL TEST
            </span>
            <span>·</span>
            <span>1–11 sinf maktab o‘quvchilari uchun ta’limiy test platformasi</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Davlat ta’lim standartlari asosida yaratilgan
          </div>
        </div>
      </footer>
    </div>
  );
}
