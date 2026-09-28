export type Grade = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type SubjectId =
  | 'matematika'
  | 'tarix'
  | 'biologiya'
  | 'fizika'
  | 'kimyo'
  | 'ona_tili'
  | 'adabiyot'
  | 'ingliz_tili'
  | 'informatika'
  | 'geografiya';

export type Difficulty = 'oson' | 'orta' | 'qiyin';

export type Language = 'uz' | 'ru' | 'en';

export interface Question {
  id: string;
  grade: Grade;
  subject: SubjectId;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic: string;
}

export interface UserAnswerRecord {
  questionId: string;
  question: Question;
  selectedOption: string | null;
  isCorrect: boolean;
}

export interface TestResult {
  id: string;
  date: string;
  grade: Grade;
  subject: SubjectId;
  difficulty: Difficulty;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  timeSeconds: number;
  answers: UserAnswerRecord[];
}

export interface Achievement {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface SubjectMetadata {
  id: SubjectId;
  name: Record<Language, string>;
  icon: string;
  minGrade: Grade;
  description: Record<Language, string>;
  color: string;
}
