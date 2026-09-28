import { TestResult, Achievement, Language } from '../types/quiz';

const RESULTS_KEY = 'aql_test_results_v1';
const ACHIEVEMENTS_KEY = 'aql_test_achievements_v1';
const THEME_KEY = 'aql_test_theme';
const LANG_KEY = 'aql_test_lang';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_test',
    title: {
      uz: 'Birinchi test',
      ru: 'Первый тест',
      en: 'First Quiz',
    },
    description: {
      uz: 'Ilk bor 50 talik testni muvaffaqiyatli yakunlang',
      ru: 'Успешно завершите свой первый тест из 50 вопросов',
      en: 'Successfully complete your first 50-question quiz',
    },
    icon: '🏅',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
  },
  {
    id: 'five_tests',
    title: {
      uz: '5 ta test',
      ru: '5 тестов',
      en: '5 Quizzes',
    },
    description: {
      uz: 'Jami 5 ta to‘liq testni yakunlang',
      ru: 'Завершите 5 полноценных тестов',
      en: 'Complete 5 full quizzes',
    },
    icon: '🔥',
    progress: 0,
    maxProgress: 5,
    unlocked: false,
  },
  {
    id: 'perfect_score',
    title: {
      uz: '100% natija',
      ru: '100% результат',
      en: '100% Perfect Score',
    },
    description: {
      uz: 'Testdagi barcha 50 ta savolga xatosiz javob bering',
      ru: 'Ответьте правильно на все 50 вопросов теста',
      en: 'Answer all 50 questions in a test correctly',
    },
    icon: '💯',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
  },
  {
    id: 'hundred_questions',
    title: {
      uz: '100 ta savol',
      ru: '100 вопросов',
      en: '100 Questions',
    },
    description: {
      uz: 'Jami 100 ta savolga javob bering',
      ru: 'Ответьте суммарно на 100 вопросов',
      en: 'Answer a total of 100 questions',
    },
    icon: '🧠',
    progress: 0,
    maxProgress: 100,
    unlocked: false,
  },
  {
    id: 'high_score',
    title: {
      uz: 'Eng yuqori natija',
      ru: 'Высший балл',
      en: 'High Achiever',
    },
    description: {
      uz: 'Kamida bitta testda 90% yoki undan yuqori natija ko‘rsating',
      ru: 'Наберите 90% или выше хотя бы в одном тесте',
      en: 'Achieve 90% or higher score on any test',
    },
    icon: '🏆',
    progress: 0,
    maxProgress: 1,
    unlocked: false,
  },
  {
    id: 'five_subjects',
    title: {
      uz: '5 ta fan',
      ru: '5 предметов',
      en: '5 Subjects',
    },
    description: {
      uz: 'Kamida 5 ta turli xil fandan test topshiring',
      ru: 'Пройдите тесты минимум по 5 разным предметам',
      en: 'Complete quizzes in at least 5 distinct subjects',
    },
    icon: '📚',
    progress: 0,
    maxProgress: 5,
    unlocked: false,
  },
  {
    id: 'five_hundred_questions',
    title: {
      uz: '500 ta savol',
      ru: '500 вопросов',
      en: '500 Questions',
    },
    description: {
      uz: 'Platformada jami 500 ta savolni hal qiling',
      ru: 'Решите суммарно 500 вопросов на платформе',
      en: 'Solve a grand total of 500 questions across platform',
    },
    icon: '🎯',
    progress: 0,
    maxProgress: 500,
    unlocked: false,
  },
];

export function getSavedResults(): TestResult[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTestResult(result: TestResult): Achievement[] {
  const existing = getSavedResults();
  const updated = [result, ...existing];
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Storage quota exceeded', e);
  }

  return updateAchievements(updated);
}

export function getAchievements(): Achievement[] {
  try {
    const raw = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (!raw) return INITIAL_ACHIEVEMENTS;
    const stored: Achievement[] = JSON.parse(raw);
    // Merge in case we added new achievements
    return INITIAL_ACHIEVEMENTS.map((init) => {
      const match = stored.find((s) => s.id === init.id);
      return match || init;
    });
  } catch {
    return INITIAL_ACHIEVEMENTS;
  }
}

function updateAchievements(results: TestResult[]): Achievement[] {
  const current = getAchievements();
  const newlyUnlocked: Achievement[] = [];

  const totalTests = results.length;
  const totalQuestions = results.reduce((acc, r) => acc + r.totalQuestions, 0);
  const subjectsSet = new Set(results.map((r) => r.subject));
  const hasPerfect = results.some((r) => r.correctAnswers === r.totalQuestions && r.totalQuestions >= 50);
  const hasHighScore = results.some((r) => r.percentage >= 90);

  const updated = current.map((ach) => {
    let p = ach.progress;
    let unlocked = ach.unlocked;

    if (ach.id === 'first_test') {
      p = Math.min(totalTests, 1);
    } else if (ach.id === 'five_tests') {
      p = Math.min(totalTests, 5);
    } else if (ach.id === 'perfect_score') {
      p = hasPerfect ? 1 : 0;
    } else if (ach.id === 'hundred_questions') {
      p = Math.min(totalQuestions, 100);
    } else if (ach.id === 'high_score') {
      p = hasHighScore ? 1 : 0;
    } else if (ach.id === 'five_subjects') {
      p = Math.min(subjectsSet.size, 5);
    } else if (ach.id === 'five_hundred_questions') {
      p = Math.min(totalQuestions, 500);
    }

    if (!unlocked && p >= ach.maxProgress) {
      unlocked = true;
      const unObj = { ...ach, progress: p, unlocked: true, unlockedAt: new Date().toISOString() };
      newlyUnlocked.push(unObj);
      return unObj;
    }

    return { ...ach, progress: p, unlocked };
  });

  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save achievements', e);
  }

  return newlyUnlocked;
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const val = localStorage.getItem(THEME_KEY);
    if (val === 'dark' || val === 'light') return val;
    // Default to light or check system preference
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch {}
  return 'light';
}

export function setStoredTheme(theme: 'light' | 'dark') {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

export function getStoredLang(): Language {
  try {
    const val = localStorage.getItem(LANG_KEY);
    if (val === 'uz' || val === 'ru' || val === 'en') return val;
  } catch {}
  return 'uz';
}

export function setStoredLang(lang: Language) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {}
}
