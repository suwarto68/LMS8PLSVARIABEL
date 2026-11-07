import React, { useState } from 'react';
import { 
  BookOpen, 
  Target, 
  HelpCircle, 
  Home, 
  ShieldAlert, 
  Database, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { AppSettings } from '../types';

interface HeaderProps {
  activeTab: 'home' | 'tujuan' | 'materi' | 'kuis' | 'admin';
  setActiveTab: (tab: 'home' | 'tujuan' | 'materi' | 'kuis' | 'admin') => void;
  settings: AppSettings;
  connectionStatus: 'connected' | 'checking' | 'disconnected' | 'idle';
  isExamInProgress?: boolean;
  studentName?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  settings,
  connectionStatus,
  isExamInProgress = false,
  studentName
}) => {
  const [logoError, setLogoError] = useState(false);

  // Jika sedang ujian CBT aktif, header disederhanakan ala ANBK
  if (isExamInProgress) {
    return (
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-md border-b-4 border-yellow-400 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-white p-1 flex items-center justify-center shadow-md overflow-hidden">
              {!logoError ? (
                <img
                  src="https://ibb.co.com/S4095CCm"
                  alt="Logo SMPN 1 Wanaraya"
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full bg-blue-600 rounded flex flex-col items-center justify-center text-[9px] font-bold text-white text-center leading-tight">
                  <span>SMPN 1</span>
                  <span>WNY</span>
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-yellow-400 text-blue-950 text-xs font-black px-2 py-0.5 rounded tracking-wider uppercase">
                  CBT ANBK KEMDIKDASMEN
                </span>
                <span className="text-xs text-blue-200 hidden sm:inline">
                  Tahun Ajaran {settings.academicYear}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white line-clamp-1">
                {settings.schoolName} — Ujian Formatif PLSV & PtLSV Fase D
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-blue-200">Peserta Ujian:</p>
              <p className="text-sm font-bold text-yellow-300">{studentName || 'Peserta Didik'}</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-950/60 border border-blue-400/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-200 text-[11px] font-semibold">CBT Mode Aktif</span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg sticky top-0 z-40">
      {/* Top Bar Informasi Sekolah & Status Koneksi Database */}
      <div className="bg-blue-950/80 border-b border-blue-700/50 text-xs py-1.5 px-4 text-blue-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-yellow-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              LMS & Asesmen TKA BSKAP Kemendikdasmen No. 047/H/AN/2025
            </span>
            <span className="hidden md:inline text-blue-400">•</span>
            <span className="hidden md:inline">Kurikulum Merdeka — Matematika SMP Kelas 8</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Indikator Koneksi Database Google Spreadsheet */}
            <div className="flex items-center gap-1.5 bg-blue-900/80 px-2.5 py-0.5 rounded-full border border-blue-600/40">
              <Database className="w-3 h-3 text-blue-300" />
              <span className="text-[11px] text-blue-200">Database Sheets:</span>
              {connectionStatus === 'connected' ? (
                <span className="flex items-center gap-1 text-[11px] text-emerald-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Terkoneksi (Live)
                </span>
              ) : connectionStatus === 'checking' ? (
                <span className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                  Memeriksa...
                </span>
              ) : settings.googleAppsScriptUrl ? (
                <span className="flex items-center gap-1 text-[11px] text-rose-300 font-semibold">
                  <AlertCircle className="w-3 h-3 text-rose-400" />
                  Periksa URL
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-blue-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Mode Standby Lokal
                </span>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] text-blue-300">
              <Clock className="w-3 h-3" />
              <span>TA {settings.academicYear}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Brand & School Identity */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <div className="w-13 h-13 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md border-2 border-yellow-400 overflow-hidden transform transition group-hover:scale-105">
              {!logoError ? (
                <img
                  src="https://ibb.co.com/S4095CCm"
                  alt="Logo SMP Negeri 1 Wanaraya"
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-700 to-indigo-900 rounded-lg flex flex-col items-center justify-center text-white text-center p-0.5">
                  <span className="text-[10px] font-black tracking-tighter text-yellow-300">SMPN 1</span>
                  <span className="text-[8px] font-bold leading-none">WANARAYA</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-400 text-blue-950 text-[10px] font-black px-2 py-0.5 rounded tracking-wide uppercase">
                PORTAL LMS & CBT RESMI
              </span>
              <span className="text-xs text-blue-300 hidden sm:inline">Kabupaten Barito Kuala</span>
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              {settings.schoolName}
            </h1>
            <p className="text-xs text-blue-200">
              Ujian Formatif Aljabar: Persamaan & Pertidaksamaan Linier Satu Variabel (Kelas 8 Fase D)
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 bg-blue-950/60 p-1 rounded-xl border border-blue-700/60 shadow-inner">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'home'
                ? 'bg-yellow-400 text-blue-950 shadow-sm'
                : 'text-blue-100 hover:bg-blue-800/70'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>

          <button
            onClick={() => setActiveTab('tujuan')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'tujuan'
                ? 'bg-yellow-400 text-blue-950 shadow-sm'
                : 'text-blue-100 hover:bg-blue-800/70'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>1. Tujuan Pembelajaran</span>
          </button>

          <button
            onClick={() => setActiveTab('materi')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
              activeTab === 'materi'
                ? 'bg-yellow-400 text-blue-950 shadow-sm'
                : 'text-blue-100 hover:bg-blue-800/70'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. Materi</span>
          </button>

          <button
            onClick={() => setActiveTab('kuis')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition shadow-sm ${
              activeTab === 'kuis'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-900/30 ring-2 ring-emerald-300'
                : 'bg-emerald-600/80 text-white hover:bg-emerald-600'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>3. Kuis (CBT ANBK)</span>
          </button>

          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-medium transition ${
              activeTab === 'admin'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-blue-200 hover:bg-blue-800/50'
            }`}
            title="Portal Guru / Administrator"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-yellow-300" />
            <span className="hidden sm:inline">Admin</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
