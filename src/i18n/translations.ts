import { Language, SubjectId, Difficulty, Grade } from '../types/quiz';

export interface TranslationDict {
  appName: string;
  appSlogan: string;
  selectClass: string;
  selectSubject: string;
  selectDifficulty: string;
  startTest: string;
  pleaseSelectAll: string;
  question: string;
  of: string;
  prev: string;
  next: string;
  finishTest: string;
  confirmFinishTitle: string;
  confirmFinishDesc: string;
  answeredCount: string;
  unansweredCount: string;
  confirmYes: string;
  confirmCancel: string;
  timeRemaining: string;
  timeElapsed: string;
  currentScore: string;
  questionPalette: string;
  testCompleted: string;
  score: string;
  percentage: string;
  correctAnswers: string;
  wrongAnswers: string;
  timeTaken: string;
  categoryAlo: string;
  categoryJudaYaxshi: string;
  categoryYaxshi: string;
  categoryOrtacha: string;
  categoryMashq: string;
  viewMistakes: string;
  retakeTest: string;
  newTest: string;
  allQuestions: string;
  onlyMistakes: string;
  yourAnswer: string;
  correctAnswerText: string;
  explanation: string;
  searchPlaceholder: string;
  searchTitle: string;
  searchDesc: string;
  noQuestionsFound: string;
  filterGrade: string;
  filterSubject: string;
  allGrades: string;
  allSubjects: string;
  myResults: string;
  statistics: string;
  completedTests: string;
  totalQuestionsAnswered: string;
  averagePercentage: string;
  bestScore: string;
  recentTests: string;
  noTestsYet: string;
  achievements: string;
  unlocked: string;
  locked: string;
  soundOn: string;
  soundOff: string;
  themeLight: string;
  themeDark: string;
  testsNav: string;
  searchNav: string;
  statsNav: string;
  achievementsNav: string;
  gradeLabel: (g: Grade) => string;
  flagQuestion: string;
  unflagQuestion: string;
  revealAnswer: string;
  hideAnswer: string;
}

export const translations: Record<Language, TranslationDict> = {
  uz: {
    appName: 'AQL TEST',
    appSlogan: 'Bilimingizni sinab ko‘ring!',
    selectClass: '1. SINFNI TANLANG',
    selectSubject: '2. FANNI TANLANG',
    selectDifficulty: '3. QIYINLIK DARAJASINI TANLANG',
    startTest: 'TESTNI BOSHLASH (50 TA SAVOL)',
    pleaseSelectAll: 'Iltimos, testni boshlash uchun sinf, fan va qiyinlik darajasini tanlang',
    question: 'Savol',
    of: '/',
    prev: 'Oldingi',
    next: 'Keyingi',
    finishTest: 'TESTNI YAKUNLASH',
    confirmFinishTitle: 'Testni yakunlashni xohlaysizmi?',
    confirmFinishDesc: 'Javob berilgan savollar tekshirilib, yakuniy natijangiz hisoblanadi.',
    answeredCount: 'Belgilangan savollar',
    unansweredCount: 'Belgilanmagan savollar',
    confirmYes: 'Ha, yakunlash',
    confirmCancel: 'Davom etish',
    timeRemaining: 'Qolgan vaqt',
    timeElapsed: 'Vaqt',
    currentScore: 'Belgilandi',
    questionPalette: 'Barcha savollar ro‘yxati (1-50)',
    testCompleted: 'TEST YAKUNLANDI!',
    score: 'Natija',
    percentage: 'Ko‘rsatkich',
    correctAnswers: 'To‘g‘ri javoblar',
    wrongAnswers: 'Noto‘g‘ri javoblar',
    timeTaken: 'Sarflangan vaqt',
    categoryAlo: 'A’lo',
    categoryJudaYaxshi: 'Juda yaxshi',
    categoryYaxshi: 'Yaxshi',
    categoryOrtacha: 'O‘rtacha',
    categoryMashq: 'Ko‘proq mashq qilish kerak',
    viewMistakes: 'Xatolarimni ko‘rish',
    retakeTest: 'Qayta topshirish',
    newTest: 'Yangi test tanlash',
    allQuestions: 'Barcha savollar',
    onlyMistakes: 'Faqat xatolar',
    yourAnswer: 'Sizning javobingiz',
    correctAnswerText: 'To‘g‘ri javob',
    explanation: 'Tushuntirish',
    searchPlaceholder: 'Savol yoki mavzuni qidiring...',
    searchTitle: 'Darslik savollari va mavzular qidiruvi',
    searchDesc: 'O‘zbekiston maktab darsliklaridagi har qanday mavzu yoki savolni toping va o‘rganing',
    noQuestionsFound: 'Hech qanday savol yoki mavzu topilmadi',
    filterGrade: 'Sinf bo‘yicha',
    filterSubject: 'Fan bo‘yicha',
    allGrades: 'Barcha sinflar',
    allSubjects: 'Barcha fanlar',
    myResults: 'Mening natijalarim',
    statistics: 'Statistika va tahlil',
    completedTests: 'Topshirilgan testlar',
    totalQuestionsAnswered: 'Yechilgan savollar',
    averagePercentage: 'O‘rtacha natija',
    bestScore: 'Eng yuqori ball',
    recentTests: 'Oxirgi testlar tarixi',
    noTestsYet: 'Hali testlar topshirilmagan. Birinchi testingizni boshlang!',
    achievements: 'Yutuqlar va nishonlar',
    unlocked: 'Ochildi',
    locked: 'Qulflangan',
    soundOn: 'Ovoz yoqilgan',
    soundOff: 'Ovoz o‘chirilgan',
    themeLight: 'Kunduzgi rejim',
    themeDark: 'Tungi rejim',
    testsNav: 'Testlar',
    searchNav: 'Qidiruv',
    statsNav: 'Natijalarim',
    achievementsNav: 'Yutuqlar',
    gradeLabel: (g: Grade) => `${g}-sinf`,
    flagQuestion: 'Belgilab qo‘yish',
    unflagQuestion: 'Belgini olib tashlash',
    revealAnswer: 'To‘g‘ri javobni ko‘rish',
    hideAnswer: 'Javobni yashirish',
  },
  ru: {
    appName: 'AQL TEST',
    appSlogan: 'Проверьте свои знания!',
    selectClass: '1. ВЫБЕРИТЕ КЛАСС',
    selectSubject: '2. ВЫБЕРИТЕ ПРЕДМЕТ',
    selectDifficulty: '3. ВЫБЕРИТЕ СЛОЖНОСТЬ',
    startTest: 'НАЧАТЬ ТЕСТ (50 ВОПРОСОВ)',
    pleaseSelectAll: 'Пожалуйста, выберите класс, предмет и сложность для начала теста',
    question: 'Вопрос',
    of: 'из',
    prev: 'Назад',
    next: 'Вперед',
    finishTest: 'ЗАВЕРШИТЬ ТЕСТ',
    confirmFinishTitle: 'Вы уверены, что хотите завершить тест?',
    confirmFinishDesc: 'Ваши ответы будут проверены и сформирован итоговый результат.',
    answeredCount: 'Отвечено вопросов',
    unansweredCount: 'Не отвечено',
    confirmYes: 'Да, завершить',
    confirmCancel: 'Продолжить',
    timeRemaining: 'Осталось времени',
    timeElapsed: 'Время',
    currentScore: 'Отвечено',
    questionPalette: 'Список всех вопросов (1-50)',
    testCompleted: 'ТЕСТ ЗАВЕРШЕН!',
    score: 'Результат',
    percentage: 'Процент',
    correctAnswers: 'Правильных ответов',
    wrongAnswers: 'Неправильных ответов',
    timeTaken: 'Затраченное время',
    categoryAlo: 'Отлично',
    categoryJudaYaxshi: 'Очень хорошо',
    categoryYaxshi: 'Хорошо',
    categoryOrtacha: 'Удовлетворительно',
    categoryMashq: 'Нужно больше практики',
    viewMistakes: 'Посмотреть ошибки',
    retakeTest: 'Пройти заново',
    newTest: 'Выбрать новый тест',
    allQuestions: 'Все вопросы',
    onlyMistakes: 'Только ошибки',
    yourAnswer: 'Ваш ответ',
    correctAnswerText: 'Правильный ответ',
    explanation: 'Объяснение',
    searchPlaceholder: 'Ищите вопрос или тему...',
    searchTitle: 'Поиск вопросов и тем школьной программы',
    searchDesc: 'Найдите любые вопросы, термины и формулы из школьных учебников Узбекистана',
    noQuestionsFound: 'Вопросы по заданным критериям не найдены',
    filterGrade: 'По классу',
    filterSubject: 'По предмету',
    allGrades: 'Все классы',
    allSubjects: 'Все предметы',
    myResults: 'Мои результаты',
    statistics: 'Статистика и аналитика',
    completedTests: 'Завершено тестов',
    totalQuestionsAnswered: 'Решено вопросов',
    averagePercentage: 'Средний результат',
    bestScore: 'Лучший балл',
    recentTests: 'История последних тестов',
    noTestsYet: 'Вы еще не проходили тесты. Начните свой первый тест прямо сейчас!',
    achievements: 'Достижения и награды',
    unlocked: 'Открыто',
    locked: 'Заблокировано',
    soundOn: 'Звук включен',
    soundOff: 'Звук выключен',
    themeLight: 'Светлая тема',
    themeDark: 'Темная тема',
    testsNav: 'Тесты',
    searchNav: 'Поиск',
    statsNav: 'Результаты',
    achievementsNav: 'Достижения',
    gradeLabel: (g: Grade) => `${g} класс`,
    flagQuestion: 'Отметить вопрос',
    unflagQuestion: 'Снять отметку',
    revealAnswer: 'Показать ответ',
    hideAnswer: 'Скрыть ответ',
  },
  en: {
    appName: 'AQL TEST',
    appSlogan: 'Test your knowledge!',
    selectClass: '1. SELECT GRADE',
    selectSubject: '2. SELECT SUBJECT',
    selectDifficulty: '3. SELECT DIFFICULTY',
    startTest: 'START TEST (50 QUESTIONS)',
    pleaseSelectAll: 'Please select grade, subject, and difficulty before starting',
    question: 'Question',
    of: 'of',
    prev: 'Previous',
    next: 'Next',
    finishTest: 'FINISH TEST',
    confirmFinishTitle: 'Are you sure you want to finish the test?',
    confirmFinishDesc: 'Your responses will be graded and your final score will be computed.',
    answeredCount: 'Questions answered',
    unansweredCount: 'Questions unanswered',
    confirmYes: 'Yes, finish',
    confirmCancel: 'Continue quiz',
    timeRemaining: 'Time remaining',
    timeElapsed: 'Time',
    currentScore: 'Answered',
    questionPalette: 'Question Directory (1-50)',
    testCompleted: 'TEST COMPLETED!',
    score: 'Score',
    percentage: 'Percentage',
    correctAnswers: 'Correct answers',
    wrongAnswers: 'Wrong answers',
    timeTaken: 'Time taken',
    categoryAlo: 'Excellent',
    categoryJudaYaxshi: 'Very Good',
    categoryYaxshi: 'Good',
    categoryOrtacha: 'Average',
    categoryMashq: 'Needs More Practice',
    viewMistakes: 'Review Mistakes',
    retakeTest: 'Retake Test',
    newTest: 'Select New Test',
    allQuestions: 'All questions',
    onlyMistakes: 'Only mistakes',
    yourAnswer: 'Your answer',
    correctAnswerText: 'Correct answer',
    explanation: 'Explanation',
    searchPlaceholder: 'Search question or topic...',
    searchTitle: 'Curriculum Question & Topic Search',
    searchDesc: 'Explore questions, formulas, and concepts from the school curriculum',
    noQuestionsFound: 'No questions found matching your search',
    filterGrade: 'By Grade',
    filterSubject: 'By Subject',
    allGrades: 'All Grades',
    allSubjects: 'All Subjects',
    myResults: 'My Results',
    statistics: 'Statistics & Analytics',
    completedTests: 'Completed tests',
    totalQuestionsAnswered: 'Questions answered',
    averagePercentage: 'Average percentage',
    bestScore: 'Best score',
    recentTests: 'Recent test history',
    noTestsYet: 'No tests completed yet. Start your first test now!',
    achievements: 'Achievements & Badges',
    unlocked: 'Unlocked',
    locked: 'Locked',
    soundOn: 'Sound enabled',
    soundOff: 'Sound disabled',
    themeLight: 'Light mode',
    themeDark: 'Dark mode',
    testsNav: 'Quizzes',
    searchNav: 'Search',
    statsNav: 'Results',
    achievementsNav: 'Achievements',
    gradeLabel: (g: Grade) => `Grade ${g}`,
    flagQuestion: 'Flag question',
    unflagQuestion: 'Remove flag',
    revealAnswer: 'Show correct answer',
    hideAnswer: 'Hide answer',
  },
};

export const difficultyMeta: Record<Difficulty, { label: Record<Language, string>; sub: Record<Language, string>; color: string; badge: string; icon: string }> = {
  oson: {
    label: { uz: 'OSON', ru: 'ЛЕГКИЙ', en: 'EASY' },
    sub: {
      uz: 'Asosiy tushunchalar va sodda hisob-kitoblar',
      ru: 'Базовые знания и простые расчеты',
      en: 'Foundational concepts and simple calculations',
    },
    color: 'emerald',
    badge: '🟢',
    icon: 'Sparkles',
  },
  orta: {
    label: { uz: 'O‘RTA', ru: 'СРЕДНИЙ', en: 'MEDIUM' },
    sub: {
      uz: 'Chuqurroq tushunish va ko‘p bosqichli mantiq',
      ru: 'Понимание и многоэтапное рассуждение',
      en: 'Multi-step reasoning and applied concepts',
    },
    color: 'amber',
    badge: '🟡',
    icon: 'Zap',
  },
  qiyin: {
    label: { uz: 'QIYIN', ru: 'СЛОЖНЫЙ', en: 'HARD' },
    sub: {
      uz: 'Chuqur tahlil, mantiqiy fikrlash va murakkab masalalar',
      ru: 'Глубокий анализ, логика и олимпиадный уровень',
      en: 'Deeper analytical thinking and complex challenges',
    },
    color: 'rose',
    badge: '🔴',
    icon: 'Flame',
  },
};

export const subjectsData: { id: SubjectId; name: Record<Language, string>; icon: string; minGrade: Grade; color: string; desc: Record<Language, string> }[] = [
  {
    id: 'matematika',
    name: { uz: 'Matematika', ru: 'Математика', en: 'Mathematics' },
    icon: 'Calculator',
    minGrade: 1,
    color: 'sky',
    desc: {
      uz: 'Arifmetika, algebra, geometriya va trigonometriya',
      ru: 'Арифметика, алгебра, геометрия и тригонометрия',
      en: 'Arithmetic, algebra, geometry, and trigonometry',
    },
  },
  {
    id: 'ona_tili',
    name: { uz: 'Ona tili', ru: 'Родной язык', en: 'Native Language' },
    icon: 'BookOpen',
    minGrade: 1,
    color: 'teal',
    desc: {
      uz: 'Grammatika, imlo qoidalari, so‘z turkumlari va sintaksis',
      ru: 'Грамматика, орфография, части речи и синтаксис',
      en: 'Grammar, orthography, parts of speech, and syntax',
    },
  },
  {
    id: 'adabiyot',
    name: { uz: 'Adabiyot', ru: 'Литература', en: 'Literature' },
    icon: 'Feather',
    minGrade: 1,
    color: 'amber',
    desc: {
      uz: 'Klassik va zamonaviy o‘zbek va jahon adabiyoti durdonalari',
      ru: 'Шедевры узбекской и мировой литературы',
      en: 'Classics of Uzbek and world literature and poetry',
    },
  },
  {
    id: 'ingliz_tili',
    name: { uz: 'Ingliz tili', ru: 'Английский язык', en: 'English' },
    icon: 'Globe2',
    minGrade: 1,
    color: 'indigo',
    desc: {
      uz: 'Lug‘at boyligi, grammatika, zamonlar va so‘zlashuv qoidalari',
      ru: 'Словарный запас, грамматика и правила речи',
      en: 'Vocabulary, grammar, tenses, and communication rules',
    },
  },
  {
    id: 'tarix',
    name: { uz: 'Tarix', ru: 'История', en: 'History' },
    icon: 'Hourglass',
    minGrade: 1, // simplified stories for 1-4, full history 5-11
    color: 'orange',
    desc: {
      uz: 'O‘zbekiston va jahon tarixi, buyuk allomalar va sanalar',
      ru: 'История Узбекистана и мира, великие личности и даты',
      en: 'History of Uzbekistan and the world, great thinkers and dates',
    },
  },
  {
    id: 'biologiya',
    name: { uz: 'Biologiya', ru: 'Биология', en: 'Biology' },
    icon: 'Dna',
    minGrade: 1, // Tabiatshunoslik 1-4, Biologiya 5-11
    color: 'emerald',
    desc: {
      uz: 'Tabiat, o‘simliklar, hayvonot olami, inson anatomiyasi va genetika',
      ru: 'Природа, ботаника, зоология, анатомия человека и генетика',
      en: 'Nature, botany, zoology, human anatomy, and genetics',
    },
  },
  {
    id: 'fizika',
    name: { uz: 'Fizika', ru: 'Физика', en: 'Physics' },
    icon: 'Atom',
    minGrade: 1, // Physics concepts / science
    color: 'cyan',
    desc: {
      uz: 'Mexanika, termodinamika, elektr, optika va atom fizikasi',
      ru: 'Механика, термодинамика, электричество, оптика и атом',
      en: 'Mechanics, thermodynamics, electricity, optics, and atom',
    },
  },
  {
    id: 'kimyo',
    name: { uz: 'Kimyo', ru: 'Химия', en: 'Chemistry' },
    icon: 'FlaskConical',
    minGrade: 1, // Chemical elements / science
    color: 'purple',
    desc: {
      uz: 'Mendeleyev jadvali, moddalar tuzilishi, reaksiyalar va formulalar',
      ru: 'Таблица Менделеева, реакции, кислоты и формулы',
      en: 'Periodic table, substances, chemical reactions, and formulas',
    },
  },
  {
    id: 'informatika',
    name: { uz: 'Informatika', ru: 'Информатика', en: 'Informatics' },
    icon: 'Cpu',
    minGrade: 1,
    color: 'blue',
    desc: {
      uz: 'Axborot texnologiyalari, algoritmlar, dasturlash va xavfsizlik',
      ru: 'Компьютерные системы, алгоритмы, программирование и сети',
      en: 'Information technology, algorithms, programming, and cybersecurity',
    },
  },
  {
    id: 'geografiya',
    name: { uz: 'Geografiya', ru: 'География', en: 'Geography' },
    icon: 'Compass',
    minGrade: 1,
    color: 'lime',
    desc: {
      uz: 'O‘zbekiston va jahon xaritasi, iqlim, okeanlar va poytaxtlar',
      ru: 'Карта Узбекистана и мира, климат, океаны и столицы',
      en: 'Map of Uzbekistan and the world, climate, oceans, and capitals',
    },
  },
];
