import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight, 
  CheckSquare, 
  Square, 
  Grid, 
  LogOut, 
  Maximize2, 
  Minimize2, 
  AlertTriangle, 
  CheckCircle2, 
  X,
  Type,
  Send,
  Sparkles,
  Info
} from 'lucide-react';
import { Question, Student, StudentAnswer, ExamSubmission } from '../../types';
import { QuestionInfographic } from './QuestionInfographic';

interface ExamRoomProps {
  questions: Question[];
  student: Student;
  durationMinutes: number;
  onFinishExam: (submission: ExamSubmission) => void;
  onLogout: () => void;
}

export const ExamRoom: React.FC<ExamRoomProps> = ({
  questions,
  student,
  durationMinutes,
  onFinishExam,
  onLogout
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, StudentAnswer>>({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(durationMinutes * 60);
  const [isQuestionDrawerOpen, setIsQuestionDrawerOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [startTime] = useState(new Date().toISOString());

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format Timer mm:ss or hh:mm:ss
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

    if (hours > 0) {
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const currentQuestion = questions[currentIndex];
  const currentAnswer = answers[currentQuestion.id] || {
    questionId: currentQuestion.id,
    type: currentQuestion.type,
    isDoubtful: false
  };

  // Helper cek apakah suatu soal sudah dijawab
  const isQuestionAnswered = (qId: number) => {
    const ans = answers[qId];
    if (!ans) return false;
    if (ans.type === 'pg') {
      return !!ans.pgSelected;
    }
    if (ans.type === 'pgk_mcma') {
      return Array.isArray(ans.mcmaSelected) && ans.mcmaSelected.length > 0;
    }
    if (ans.type === 'pgk_kategori') {
      if (!ans.categorySelected) return false;
      const q = questions.find((item) => item.id === qId);
      if (!q || !q.categoryStatements) return false;
      // Harus semua pernyataan dijawab
      return q.categoryStatements.every((st) => ans.categorySelected?.[st.id] !== undefined);
    }
    return false;
  };

  // Handler jawaban Pilihan Ganda (Single Choice)
  const handleSelectPg = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        pgSelected: optionKey
      }
    }));
  };

  // Handler jawaban PGK MCMA (Multiple Answer Checkbox)
  const handleToggleMcma = (optionId: string) => {
    const selected = currentAnswer.mcmaSelected || [];
    const isAlreadySelected = selected.includes(optionId);
    let nextSelected: string[];

    if (isAlreadySelected) {
      nextSelected = selected.filter((id) => id !== optionId);
    } else {
      nextSelected = [...selected, optionId];
    }

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        mcmaSelected: nextSelected
      }
    }));
  };

  // Handler jawaban PGK Kategori (Benar / Salah)
  const handleSelectCategory = (statementId: string, value: 'Benar' | 'Salah') => {
    const currentCats = currentAnswer.categorySelected || {};
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        categorySelected: {
          ...currentCats,
          [statementId]: value
        }
      }
    }));
  };

  // Handler Tombol Ragu-ragu (Kuning ANBK)
  const handleToggleDoubtful = () => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...currentAnswer,
        isDoubtful: !currentAnswer.isDoubtful
      }
    }));
  };

  // Hitung jumlah terjawab dan ragu-ragu
  const answeredCount = questions.filter((q) => isQuestionAnswered(q.id)).length;
  const doubtfulCount = questions.filter((q) => answers[q.id]?.isDoubtful).length;
  const unansweredCount = questions.length - answeredCount;
  const progressPercent = Math.round((answeredCount / questions.length) * 100);

  // Evaluasi Skor Akhir
  const calculateFinalResults = (): ExamSubmission => {
    let totalScore = 0;
    let correctCount = 0;

    questions.forEach((q) => {
      const ans = answers[q.id];
      if (!ans) return;

      if (q.type === 'pg') {
        if (ans.pgSelected === q.pgCorrectAnswer) {
          totalScore += 5; // 10 soal x 5 = 50 poin
          correctCount++;
        }
      } else if (q.type === 'pgk_mcma') {
        // Harus memilih tepat semua opsi yang benar
        const correctIds = q.mcmaOptions?.filter((o) => o.isCorrect).map((o) => o.id) || [];
        const studentIds = ans.mcmaSelected || [];
        const isMatch =
          correctIds.length === studentIds.length &&
          correctIds.every((id) => studentIds.includes(id));
        if (isMatch) {
          totalScore += 5; // 4 soal x 5 = 20 poin
          correctCount++;
        }
      } else if (q.type === 'pgk_kategori') {
        // 3 pernyataan Benar/Salah, per soal bernilai 5 poin jika semua 3 pernyataan benar
        const statements = q.categoryStatements || [];
        const allCorrect = statements.every(
          (st) => ans.categorySelected?.[st.id] === st.correctAnswer
        );
        if (allCorrect) {
          totalScore += 5; // 6 soal x 5 = 30 poin
          correctCount++;
        }
      }
    });

    const finishTime = new Date().toISOString();
    const elapsedMinutes = Math.max(1, Math.round((durationMinutes * 60 - timeLeftSeconds) / 60));

    return {
      id: `SUB-${Date.now()}`,
      studentId: student.username || student.id,
      studentName: student.name,
      kelas: student.kelas,
      tokenUsed: student.token || 'WANARAYA26',
      startTime,
      finishTime,
      durationMinutes: elapsedMinutes,
      totalQuestions: questions.length,
      correctCount,
      finalScore: totalScore, // Skala 0 - 100
      answers,
      syncedToSheets: false
    };
  };

  const handleFinishExam = () => {
    const submission = calculateFinalResults();
    onFinishExam(submission);
  };

  const handleAutoSubmit = () => {
    const submission = calculateFinalResults();
    onFinishExam(submission);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const fontSizeClasses = {
    normal: 'text-sm sm:text-base leading-relaxed',
    large: 'text-base sm:text-lg leading-relaxed',
    xlarge: 'text-lg sm:text-xl leading-relaxed'
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Top ANBK Control Strip */}
      <div className="bg-slate-800 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>SOAL NOMOR: <strong className="text-yellow-300 text-sm">{currentIndex + 1}</strong> dari {questions.length}</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden md:inline">
            Tipe: {currentQuestion.type === 'pg' ? 'Pilihan Ganda' : currentQuestion.type === 'pgk_mcma' ? 'Pilihan Ganda Kompleks (MCMA)' : 'Pilihan Ganda Kategorik (Benar/Salah)'}
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="px-2 py-0.5 rounded bg-blue-900/80 text-blue-200 font-medium hidden lg:inline">
            Level: {currentQuestion.cognitiveLevel}
          </span>
        </div>

        {/* Right Tools: Font Size, Fullscreen, Timer, Daftar Soal */}
        <div className="flex items-center gap-3">
          {/* Font Resizer */}
          <div className="flex items-center gap-1 bg-slate-700 px-2 py-0.5 rounded-lg">
            <Type className="w-3.5 h-3.5 text-slate-300 mr-1" />
            <button
              onClick={() => setFontSize('normal')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${fontSize === 'normal' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
              title="Ukuran Font Normal"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${fontSize === 'large' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
              title="Ukuran Font Sedang"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${fontSize === 'xlarge' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
              title="Ukuran Font Besar"
            >
              A++
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white hover:bg-slate-600 transition hidden sm:flex items-center"
            title="Layar Penuh"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Sisa Waktu Timer ANBK */}
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono font-bold text-xs sm:text-sm ${
            timeLeftSeconds < 600 ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-900 text-yellow-300 border border-slate-700'
          }`}>
            <Clock className="w-4 h-4 text-yellow-400" />
            <span>Sisa Waktu: {formatTime(timeLeftSeconds)}</span>
          </div>

          {/* Tombol Daftar Soal */}
          <button
            onClick={() => setIsQuestionDrawerOpen(!isQuestionDrawerOpen)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Daftar Soal</span>
          </button>

          {/* Tombol Logout Siswa */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="p-1.5 rounded-lg bg-rose-600/80 hover:bg-rose-600 text-white transition"
            title="Keluar / Ganti Akun"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar Pengerjaan */}
      <div className="w-full bg-slate-200 h-1.5">
        <div
          className="bg-blue-600 h-full transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Main Exam View (2-Column CBT ANBK Layout: Kiri Stimulus, Kanan Pilihan Jawaban) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Kolom Kiri: Wacana Stimulus, Konteks, Data Tabel/Infografis (7 Kolom) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-4 cbt-scroll max-h-[calc(100vh-230px)] overflow-y-auto">
          {/* Header Stimulus */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
              Stimulus Kontekstual ({currentQuestion.contextRegion || 'Kalimantan Selatan'})
            </span>
            <span className="text-[11px] text-slate-400 font-medium">
              TP {currentQuestion.tpCode}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
            {currentQuestion.stimulus.title}
          </h3>

          <div className={`text-slate-700 leading-relaxed text-justify ${fontSizeClasses[fontSize]}`}>
            {currentQuestion.stimulus.text}
          </div>

          {/* Infografis Kontekstual Wanaraya & Keseharian (Tanpa Petunjuk Jawaban) */}
          <QuestionInfographic question={currentQuestion} />

          {/* Tabel Data Pendukung jika ada */}
          {currentQuestion.stimulus.tableData && (
            <div className="overflow-x-auto rounded-xl border border-slate-200 my-3">
              <table className="w-full text-xs sm:text-sm text-left">
                <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                  <tr>
                    {currentQuestion.stimulus.tableData.headers.map((h, i) => (
                      <th key={i} className="px-3 py-2.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentQuestion.stimulus.tableData.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/50">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-2 text-slate-700">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Indikator Penulisan Soal (Condition, Audience, Behavior) */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center gap-1 font-bold text-slate-700">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              <span>Indikator Soal (TKA BSKAP 2025):</span>
            </div>
            <p><strong>C:</strong> {currentQuestion.indicatorCAB.condition}</p>
            <p><strong>A:</strong> {currentQuestion.indicatorCAB.audience}</p>
            <p><strong>B:</strong> {currentQuestion.indicatorCAB.behavior}</p>
          </div>
        </div>

        {/* Kolom Kanan: Pokok Pertanyaan & Pilihan Respon Jawaban (5 Kolom) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-5 cbt-scroll max-h-[calc(100vh-230px)] overflow-y-auto">
          {/* Pokok Pertanyaan */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-blue-600">Pertanyaan Soal #{currentIndex + 1}:</span>
              {currentAnswer.isDoubtful && (
                <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 font-bold text-[10px] animate-pulse">
                  STATUS: RAGU-RAGU
                </span>
              )}
            </div>
            <p className={`font-semibold text-slate-900 leading-snug ${fontSizeClasses[fontSize]}`}>
              {currentQuestion.prompt}
            </p>
          </div>

          {/* 1. Tipe Pilihan Ganda Biasa (1 Jawaban Benar) */}
          {currentQuestion.type === 'pg' && currentQuestion.pgOptions && (
            <div className="space-y-2.5 pt-2">
              <p className="text-[11px] text-slate-500 font-medium italic">
                * Pilihlah salah satu jawaban yang paling tepat (A, B, C, atau D).
              </p>
              {currentQuestion.pgOptions.map((opt) => {
                const isSelected = currentAnswer.pgSelected === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectPg(opt.key)}
                    className={`w-full p-3.5 rounded-xl border-2 text-left flex items-start gap-3 transition ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className={`text-xs sm:text-sm mt-0.5 ${fontSizeClasses[fontSize]}`}>
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. Tipe Pilihan Ganda Kompleks (MCMA - Lebih dari 1 Jawaban Benar) */}
          {currentQuestion.type === 'pgk_mcma' && currentQuestion.mcmaOptions && (
            <div className="space-y-2.5 pt-2">
              <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-900 font-medium">
                <strong>Instruksi ANBK:</strong> Pilihlah pernyataan berikut jawaban lebih dari 1 jawaban yang benar (maksimal 3 benar).
              </div>
              {currentQuestion.mcmaOptions.map((opt) => {
                const isChecked = currentAnswer.mcmaSelected?.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleToggleMcma(opt.id)}
                    className={`w-full p-3.5 rounded-xl border-2 text-left flex items-start gap-3 transition ${
                      isChecked
                        ? 'border-blue-600 bg-blue-50 text-blue-950 font-semibold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm ${fontSizeClasses[fontSize]}`}>
                      {opt.statement}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* 3. Tipe Pilihan Ganda Kategorik (Benar / Salah) */}
          {currentQuestion.type === 'pgk_kategori' && currentQuestion.categoryStatements && (
            <div className="space-y-3 pt-2">
              <div className="p-2.5 bg-blue-50/80 rounded-xl border border-blue-200 text-xs text-blue-900 font-medium">
                <strong>Instruksi ANBK:</strong> Tentukan <strong>BENAR</strong> atau <strong>SALAH</strong> untuk setiap pernyataan di bawah ini.
              </div>

              <div className="space-y-3">
                {currentQuestion.categoryStatements.map((st, sIdx) => {
                  const currentVal = currentAnswer.categorySelected?.[st.id];
                  return (
                    <div key={st.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                      <p className={`text-xs sm:text-sm text-slate-800 ${fontSizeClasses[fontSize]}`}>
                        <span className="font-bold text-blue-600 mr-1.5">{sIdx + 1}.</span>
                        {st.statement}
                      </p>
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => handleSelectCategory(st.id, 'Benar')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            currentVal === 'Benar'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>BENAR</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectCategory(st.id, 'Salah')}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                            currentVal === 'Salah'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <span>SALAH</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom ANBK Navigation Bar (Warna Tombol Sesuai Spesifikasi: Merah, Kuning, Biru) */}
      <footer className="bg-white border-t border-slate-300 px-4 py-3 sticky bottom-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Tombol Merah: Soal Sebelumnya */}
          <button
            type="button"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
              currentIndex === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-md active:scale-95'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>SOAL SEBELUMNYA</span>
          </button>

          {/* Tombol Kuning: Ragu-ragu (CBT ANBK) */}
          <button
            type="button"
            onClick={handleToggleDoubtful}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition border ${
              currentAnswer.isDoubtful
                ? 'bg-yellow-400 text-amber-950 border-yellow-500 shadow-md ring-2 ring-yellow-400'
                : 'bg-yellow-100 hover:bg-yellow-200 text-yellow-900 border-yellow-300'
            }`}
          >
            <input
              type="checkbox"
              checked={!!currentAnswer.isDoubtful}
              onChange={() => {}}
              className="w-4 h-4 rounded text-yellow-600 focus:ring-yellow-500 accent-amber-600"
            />
            <span>RAGU - RAGU</span>
          </button>

          {/* Tombol Biru: Soal Berikutnya / Selesai Ujian */}
          {currentIndex < questions.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 transition active:scale-95"
            >
              <span>SOAL BERIKUTNYA</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md flex items-center gap-2 transition active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>SELESAI & KUMPULKAN</span>
            </button>
          )}
        </div>
      </footer>

      {/* Drawer / Modal Kisi-kisi Daftar Soal (Nomor 1-20) */}
      {isQuestionDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-slideInRight overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-blue-600" />
                  <h3 className="font-extrabold text-slate-800 text-base">Daftar Nomor Soal (20 Soal)</h3>
                </div>
                <button
                  onClick={() => setIsQuestionDrawerOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Legend ANBK */}
              <div className="grid grid-cols-3 gap-2 text-[11px] p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-blue-600 inline-block"></span>
                  <span className="text-slate-700">Sudah: {answeredCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-yellow-400 border border-yellow-600 inline-block"></span>
                  <span className="text-slate-700">Ragu: {doubtfulCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded bg-white border border-slate-300 inline-block"></span>
                  <span className="text-slate-700">Belum: {unansweredCount}</span>
                </div>
              </div>

              {/* Grid 20 Soal */}
              <div className="grid grid-cols-5 gap-2.5 pt-2">
                {questions.map((q, idx) => {
                  const answered = isQuestionAnswered(q.id);
                  const doubtful = answers[q.id]?.isDoubtful;
                  const isCurrent = currentIndex === idx;

                  let bgClass = 'bg-white border-2 border-slate-300 text-slate-700 hover:border-blue-400';
                  if (doubtful) {
                    bgClass = 'bg-yellow-400 border-2 border-yellow-600 text-amber-950 font-bold';
                  } else if (answered) {
                    bgClass = 'bg-blue-600 border-2 border-blue-700 text-white font-bold';
                  }

                  if (isCurrent) {
                    bgClass += ' ring-3 ring-blue-400 ring-offset-2';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsQuestionDrawerOpen(false);
                      }}
                      className={`h-12 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center relative shadow-xs ${bgClass}`}
                    >
                      <span>{idx + 1}</span>
                      {doubtful && (
                        <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-amber-900"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 space-y-2">
              <button
                onClick={() => {
                  setIsQuestionDrawerOpen(false);
                  setShowConfirmModal(true);
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:from-emerald-700 hover:to-teal-700 transition"
              >
                Selesaikan Ujian Sekarang
              </button>
              <button
                onClick={() => setIsQuestionDrawerOpen(false)}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50 transition"
              >
                Kembali ke Soal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Selesai Ujian */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-black text-slate-800">
                Konfirmasi Selesai Ujian
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Apakah Anda yakin ingin mengakhiri sesi ujian formatif ini?
              </p>
            </div>

            {/* Rekap Status Soal */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Soal Sudah Dijawab:</span>
                <span className="font-bold text-emerald-600">{answeredCount} dari {questions.length}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Soal Masih Ragu-ragu:</span>
                <span className="font-bold text-amber-600">{doubtfulCount} soal</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Soal Belum Dijawab:</span>
                <span className="font-bold text-rose-600">{unansweredCount} soal</span>
              </div>
            </div>

            {unansweredCount > 0 && (
              <p className="text-xs text-rose-600 font-semibold text-center bg-rose-50 p-2.5 rounded-xl border border-rose-100">
                ⚠️ Masih ada {unansweredCount} soal yang belum dijawab! Periksa kembali sebelum mengumpulkan.
              </p>
            )}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-100 transition"
              >
                Cek Soal Lagi
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmModal(false);
                  handleFinishExam();
                }}
                className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
              >
                Ya, Kumpulkan Jawaban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Logout Siswa */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800">Keluar dari Ujian?</h4>
              <p className="text-xs text-slate-600 mt-1">
                Apakah Anda ingin keluar dari akun siswa ini? Jawaban Anda yang belum disubmit akan hilang.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Lanjutkan Ujian
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  onLogout();
                }}
                className="py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
