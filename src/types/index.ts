export type CognitiveLevel = 'Pemahaman' | 'Aplikasi' | 'Penalaran';

export type QuestionType = 'pg' | 'pgk_mcma' | 'pgk_kategori';

export interface MultipleChoiceOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface McmaOption {
  id: string;
  statement: string;
  isCorrect: boolean;
}

export interface CategoryStatement {
  id: string;
  statement: string;
  correctAnswer: 'Benar' | 'Salah';
}

export interface Question {
  id: number;
  tpCode: '3.1' | '3.2' | '3.3' | '3.4' | '3.5';
  cognitiveLevel: CognitiveLevel;
  type: QuestionType;
  indicatorCAB: {
    condition: string; // Stimulus
    audience: string;  // Murid
    behavior: string;  // Proses kognitif yang diukur
  };
  contextRegion?: string; // e.g. "Kalimantan Selatan / Barito Kuala"
  stimulus: {
    title: string;
    text: string;
    tableData?: {
      headers: string[];
      rows: (string | number)[][];
    };
    diagramType?: 'bar' | 'table' | 'infographic' | 'equation' | 'numberline';
    diagramMeta?: Record<string, unknown>;
    imagePlaceholderNotice?: string;
  };
  prompt: string;
  // For PG (Single Answer)
  pgOptions?: MultipleChoiceOption[];
  pgCorrectAnswer?: 'A' | 'B' | 'C' | 'D';

  // For PGK MCMA (Multiple Choice Multiple Answers)
  mcmaOptions?: McmaOption[];

  // For PGK Kategori (Benar/Salah)
  categoryStatements?: CategoryStatement[];

  explanation: string;
}

export interface Student {
  id: string;
  username: string;
  name: string;
  kelas: '8A' | '8B';
  password: string;
  token?: string;
}

export interface StudentAnswer {
  questionId: number;
  type: QuestionType;
  pgSelected?: string; // 'A' | 'B' | 'C' | 'D'
  mcmaSelected?: string[]; // array of id
  categorySelected?: Record<string, 'Benar' | 'Salah'>; // statementId -> 'Benar' | 'Salah'
  isDoubtful?: boolean; // Ragu-ragu
}

export interface ExamSubmission {
  id: string;
  studentId: string;
  studentName: string;
  kelas: '8A' | '8B';
  tokenUsed: string;
  startTime: string;
  finishTime: string;
  durationMinutes: number;
  totalQuestions: number;
  correctCount: number;
  finalScore: number; // 0 - 100
  answers: Record<number, StudentAnswer>;
  syncedToSheets: boolean;
  syncedAt?: string;
  rawResponsePayload?: string;
}

export interface AppSettings {
  schoolName: string;
  academicYear: string;
  examTitle: string;
  examDurationMinutes: number; // e.g. 80
  activeToken: string; // e.g. "WANARAYA26"
  googleAppsScriptUrl: string; // URL web app
  sheetUserLoginName: string; // "UserLogin"
  sheetJawabanName: string; // "JawabanUjian"
  discussionPassword: string; // default "GURUWANARAYA2026"
  shuffleQuestions: boolean;
}
