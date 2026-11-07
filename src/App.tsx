import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { TujuanPembelajaran } from './components/TujuanPembelajaran';
import { MateriSection } from './components/MateriSection';
import { StudentLogin } from './components/CbtExam/StudentLogin';
import { ExamRoom } from './components/CbtExam/ExamRoom';
import { ExamResult } from './components/CbtExam/ExamResult';
import { AdminPanel } from './components/Admin/AdminPanel';
import { QUESTIONS_DATA } from './data/questionsData';
import { INITIAL_STUDENTS, INITIAL_SETTINGS } from './data/initialStudents';
import { Student, ExamSubmission, AppSettings } from './types';
import { 
  testGoogleAppsScriptConnection, 
  sendExamResultToSheets 
} from './utils/googleAppsScript';
import { Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'tujuan' | 'materi' | 'kuis' | 'admin'>('home');

  // Load / Store Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('smpn1_cbt_settings');
      if (saved) return { ...INITIAL_SETTINGS, ...JSON.parse(saved) };
    } catch {
      // ignore
    }
    return INITIAL_SETTINGS;
  });

  // Load / Store Students
  const [students, setStudents] = useState<Student[]>(() => {
    try {
      const saved = localStorage.getItem('smpn1_cbt_students');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_STUDENTS;
  });

  // Load / Store Submissions
  const [submissions, setSubmissions] = useState<ExamSubmission[]>(() => {
    try {
      const saved = localStorage.getItem('smpn1_cbt_submissions');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Active Session State
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<ExamSubmission | null>(null);

  // Connection Indicator State
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'checking' | 'disconnected' | 'idle'>('idle');

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('smpn1_cbt_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('smpn1_cbt_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('smpn1_cbt_submissions', JSON.stringify(submissions));
  }, [submissions]);

  // Ping Google Apps Script on mount if URL configured
  useEffect(() => {
    if (settings.googleAppsScriptUrl) {
      setConnectionStatus('checking');
      testGoogleAppsScriptConnection(settings.googleAppsScriptUrl).then((res) => {
        setConnectionStatus(res.success ? 'connected' : 'disconnected');
      });
    } else {
      setConnectionStatus('idle');
    }
  }, [settings.googleAppsScriptUrl]);

  // Handler saat murid selesai mengerjakan ujian
  const handleFinishExam = async (submission: ExamSubmission) => {
    // 1. Coba kirim langsung ke Google Sheets jika URL ada
    if (settings.googleAppsScriptUrl) {
      sendExamResultToSheets(settings.googleAppsScriptUrl, submission).then((res) => {
        if (res.success) {
          submission.syncedToSheets = true;
          submission.syncedAt = new Date().toISOString();
        }
      });
    }

    // 2. Simpan ke local state & storage
    setCurrentSubmission(submission);
    setSubmissions((prev) => [submission, ...prev]);
  };

  const handleLogoutStudent = () => {
    setCurrentStudent(null);
    setCurrentSubmission(null);
  };

  const handleRetakeExam = () => {
    setCurrentSubmission(null);
    setCurrentStudent(null);
  };

  const isExamInProgress = activeTab === 'kuis' && !!currentStudent && !currentSubmission;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Header Aplikasi dengan Identitas SMPN 1 Wanaraya & Status Database */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        settings={settings}
        connectionStatus={connectionStatus}
        isExamInProgress={isExamInProgress}
        studentName={currentStudent?.name}
      />

      {/* Konten Halaman */}
      <div className={`flex-1 ${isExamInProgress ? 'p-0' : 'max-w-7xl w-full mx-auto px-4 py-6 sm:py-8'}`}>
        {/* 1. Menu Home */}
        {activeTab === 'home' && (
          <HomeSection
            onNavigate={(tab) => setActiveTab(tab)}
            settings={settings}
            connectionStatus={connectionStatus}
          />
        )}

        {/* 2. Menu Tujuan Pembelajaran (3.1 - 3.5) */}
        {activeTab === 'tujuan' && (
          <TujuanPembelajaran onStartQuiz={() => setActiveTab('kuis')} />
        )}

        {/* 3. Menu Pendalaman Materi & Bangun Ruang Sisi Lengkung */}
        {activeTab === 'materi' && <MateriSection />}

        {/* 4. Menu Kuis (CBT ANBK Ujian Online 20 Soal) */}
        {activeTab === 'kuis' && (
          <>
            {!currentStudent && (
              <StudentLogin
                students={students}
                settings={settings}
                onLoginSuccess={(stu) => setCurrentStudent(stu)}
                onSwitchToAdmin={() => setActiveTab('admin')}
              />
            )}

            {currentStudent && !currentSubmission && (
              <ExamRoom
                questions={QUESTIONS_DATA}
                student={currentStudent}
                durationMinutes={settings.examDurationMinutes}
                onFinishExam={handleFinishExam}
                onLogout={handleLogoutStudent}
              />
            )}

            {currentSubmission && (
              <ExamResult
                submission={currentSubmission}
                settings={settings}
                onRetake={handleRetakeExam}
                onGoHome={() => setActiveTab('home')}
              />
            )}
          </>
        )}

        {/* 5. Menu Admin Portal */}
        {activeTab === 'admin' && (
          <AdminPanel
            students={students}
            setStudents={setStudents}
            submissions={submissions}
            settings={settings}
            setSettings={setSettings}
            questions={QUESTIONS_DATA}
            connectionStatus={connectionStatus}
            setConnectionStatus={setConnectionStatus}
          />
        )}
      </div>

      {/* Footer Aplikasi (Kecuali saat ujian CBT sedang berjalan) */}
      {!isExamInProgress && (
        <footer className="bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800 mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-bold text-white text-sm">
                SMP Negeri 1 Wanaraya — Kabupaten Barito Kuala, Kalimantan Selatan
              </p>
              <p className="mt-1 text-slate-500">
                LMS & CBT Ujian Formatif “Persamaan dan Pertidaksamaan Linier Satu Variabel” • Tahun Ajaran 2026/2027
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Mengacu pada Salinan Peraturan BSKAP No. 047/H/AN/2025 Kerangka Asesmen TKA SMP/MTs
              </p>
            </div>

            <div className="flex flex-col sm:items-end gap-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 justify-center sm:justify-end">
                <span>Didedikasikan untuk Pendidikan Bermutu</span>
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              </span>
              <span className="text-slate-500">
                Terhubung dengan Google Spreadsheet (Sheet UserLogin & JawabanUjian)
              </span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
