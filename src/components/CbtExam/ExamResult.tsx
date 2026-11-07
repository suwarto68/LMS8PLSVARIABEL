import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Award, 
  Clock, 
  Layers, 
  Database, 
  Printer, 
  RotateCcw, 
  Home, 
  Sparkles, 
  AlertCircle,
  RefreshCw,
  FileText
} from 'lucide-react';
import { ExamSubmission, AppSettings } from '../../types';
import { sendExamResultToSheets } from '../../utils/googleAppsScript';

interface ExamResultProps {
  submission: ExamSubmission;
  settings: AppSettings;
  onRetake: () => void;
  onGoHome: () => void;
}

export const ExamResult: React.FC<ExamResultProps> = ({
  submission,
  settings,
  onRetake,
  onGoHome
}) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<{
    synced: boolean;
    message: string;
  }>({
    synced: submission.syncedToSheets,
    message: submission.syncedToSheets
      ? 'Tersimpan di Google Spreadsheet'
      : settings.googleAppsScriptUrl
      ? 'Sedang mengirim ke Spreadsheet...'
      : 'Tersimpan aman di Database Lokal Browser'
  });

  const handleManualSync = async () => {
    if (!settings.googleAppsScriptUrl) {
      alert('URL Google Apps Script belum disetel oleh Guru di Menu Admin!');
      return;
    }
    setIsSyncing(true);
    const res = await sendExamResultToSheets(settings.googleAppsScriptUrl, submission);
    setIsSyncing(false);
    setSyncStatus({
      synced: res.success,
      message: res.message
    });
  };

  const isPassed = submission.finalScore >= 75; // KKM / KKTP = 75

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* Kartu Bukti Ujian Resmi SMP Negeri 1 Wanaraya */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden print:shadow-none print:border-none">
        {/* Header Bukti Hasil */}
        <div className={`p-6 sm:p-8 text-white text-center relative ${
          isPassed 
            ? 'bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800' 
            : 'bg-gradient-to-r from-slate-800 via-blue-950 to-slate-900'
        }`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400 text-blue-950 text-xs font-black uppercase tracking-wider mb-2">
            BUKTI RESMI ASESMEN FORMATIF
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Laporan Hasil Ujian Siswa
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            {settings.schoolName} • Tahun Ajaran {settings.academicYear}
          </p>
        </div>

        {/* Skor & Evaluasi Utama */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 border-2 border-slate-200 shadow-inner w-44 h-44 mx-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                SKOR AKHIR
              </span>
              <span className={`text-5xl font-black my-1 ${
                isPassed ? 'text-blue-600' : 'text-amber-600'
              }`}>
                {submission.finalScore}
              </span>
              <span className="text-[11px] font-semibold text-slate-400">
                Skala 100
              </span>
            </div>

            <div>
              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold ${
                isPassed 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                <CheckCircle2 className="w-4 h-4" />
                {isPassed 
                  ? 'Tuntas Kriteria Ketercapaian (KKTP ≥ 75)' 
                  : 'Perlu Penguatan Materi (Remedial Aljabar)'}
              </span>
            </div>
          </div>

          {/* Rincian Identitas Peserta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Nama Peserta:</span>
              <span className="font-bold text-slate-800 text-sm">{submission.studentName}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Kelas:</span>
              <span className="font-bold text-blue-600 text-sm">Kelas {submission.kelas}</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Soal Terjawab Benar:</span>
              <span className="font-bold text-emerald-600 text-sm">{submission.correctCount} / 20 Soal</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Waktu Pengerjaan:</span>
              <span className="font-bold text-slate-800 text-sm">{submission.durationMinutes} Menit</span>
            </div>
          </div>

          {/* Status Sinkronisasi Google Spreadsheet */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Database className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="font-bold text-blue-950">Status Google Spreadsheet (Sheet JawabanUjian):</p>
                <p className={`mt-0.5 ${syncStatus.synced ? 'text-emerald-700 font-semibold' : 'text-blue-700'}`}>
                  {syncStatus.message}
                </p>
              </div>
            </div>

            {settings.googleAppsScriptUrl && (
              <button
                type="button"
                onClick={handleManualSync}
                disabled={isSyncing}
                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Menyinkronkan...' : 'Kirim Ulang ke Sheet'}</span>
              </button>
            )}
          </div>

          {/* Action Buttons (Print, Home, Retake) */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 print:hidden">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition shadow-xs"
            >
              <Printer className="w-4 h-4 text-slate-500" />
              <span>Cetak Bukti Nilai</span>
            </button>

            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ganti Akun / Ujian Baru</span>
            </button>

            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-md"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </button>
          </div>
        </div>

        {/* Footer Card */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-400">
          SMP Negeri 1 Wanaraya • Elemen Aljabar Fase D • Dikembangkan sesuai Format TKA Kemendikdasmen 2025
        </div>
      </div>
    </div>
  );
};
