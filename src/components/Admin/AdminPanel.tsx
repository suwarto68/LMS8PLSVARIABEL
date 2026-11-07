import React, { useState } from 'react';
import { 
  Users, 
  FileSpreadsheet, 
  Settings, 
  Lock, 
  Key, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Copy, 
  Eye, 
  EyeOff, 
  Code, 
  ExternalLink,
  Plus,
  Trash2,
  Search,
  Sparkles,
  Printer,
  HelpCircle,
  Database,
  ArrowRight,
  Info
} from 'lucide-react';
import { Student, ExamSubmission, AppSettings, Question } from '../../types';
import { 
  GOOGLE_APPS_SCRIPT_CODE, 
  testGoogleAppsScriptConnection, 
  pullStudentsFromSheets 
} from '../../utils/googleAppsScript';
import { QuestionInfographic } from '../CbtExam/QuestionInfographic';

interface AdminPanelProps {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  submissions: ExamSubmission[];
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  questions: Question[];
  connectionStatus: 'connected' | 'checking' | 'disconnected' | 'idle';
  setConnectionStatus: (status: 'connected' | 'checking' | 'disconnected' | 'idle') => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  students,
  setStudents,
  submissions,
  settings,
  setSettings,
  questions,
  connectionStatus,
  setConnectionStatus
}) => {
  const [adminTab, setAdminTab] = useState<'data_pengguna' | 'hasil_ujian' | 'pengaturan' | 'pembahasan' | 'appscript'>('data_pengguna');

  // State Pembahasan Terkunci Password
  const [discussionPasswordInput, setDiscussionPasswordInput] = useState('');
  const [isDiscussionUnlocked, setIsDiscussionUnlocked] = useState(false);
  const [discussionError, setDiscussionError] = useState<string | null>(null);

  // State Test Connection
  const [isTestingConn, setIsTestingConn] = useState(false);
  const [testConnResult, setTestConnResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);

  // State Pull from Spreadsheet
  const [isPulling, setIsPulling] = useState(false);
  const [pullMessage, setPullMessage] = useState<string | null>(null);

  // State Copy Code
  const [copiedCode, setCopiedCode] = useState(false);

  // Filter & Search Siswa
  const [searchQuery, setSearchQuery] = useState('');
  const [filterKelas, setFilterKelas] = useState<'all' | '8A' | '8B'>('all');

  // Modal Tambah Siswa Baru
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    username: '',
    name: '',
    kelas: '8A',
    password: '123',
    token: settings.activeToken || 'WANARAYA26'
  });

  // Handler Buka Pembahasan dengan Password
  const handleUnlockDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (discussionPasswordInput === settings.discussionPassword) {
      setIsDiscussionUnlocked(true);
      setDiscussionError(null);
    } else {
      setDiscussionError('Password akses pembahasan salah! Silakan coba lagi atau cek di Pengaturan.');
    }
  };

  // Handler Tes Koneksi Apps Script
  const handleTestConnection = async () => {
    if (!settings.googleAppsScriptUrl) {
      setTestConnResult({
        success: false,
        message: 'Masukkan URL Google Apps Script terlebih dahulu!'
      });
      return;
    }

    setIsTestingConn(true);
    setConnectionStatus('checking');
    const res = await testGoogleAppsScriptConnection(settings.googleAppsScriptUrl);
    setIsTestingConn(false);
    setTestConnResult(res);

    if (res.success) {
      setConnectionStatus('connected');
    } else {
      setConnectionStatus('disconnected');
    }
  };

  // Handler Tarik Data dari Spreadsheet
  const handlePullFromSheets = async () => {
    if (!settings.googleAppsScriptUrl) {
      alert('URL Google Apps Script belum diisi di menu Pengaturan!');
      return;
    }

    setIsPulling(true);
    setPullMessage(null);
    const res = await pullStudentsFromSheets(settings.googleAppsScriptUrl);
    setIsPulling(false);

    if (res.success && res.students && res.students.length > 0) {
      setStudents(res.students);
      setPullMessage(`Berhasil menarik ${res.students.length} siswa dari Google Spreadsheet sheet UserLogin!`);
    } else {
      setPullMessage(`Gagal: ${res.message}`);
    }
  };

  // Handler Copy Google Apps Script
  const handleCopyAppsScript = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // Handler Tambah Siswa
  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.username || !newStudent.name) return;

    const stu: Student = {
      id: newStudent.username,
      username: newStudent.username,
      name: newStudent.name,
      kelas: (newStudent.kelas as '8A' | '8B') || '8A',
      password: newStudent.password || '123',
      token: newStudent.token || settings.activeToken
    };

    setStudents((prev) => [...prev, stu]);
    setShowAddModal(false);
    setNewStudent({
      username: '',
      name: '',
      kelas: '8A',
      password: '123',
      token: settings.activeToken
    });
  };

  // Handler Hapus Siswa
  const handleDeleteStudent = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
      setStudents((prev) => prev.filter((s) => s.id !== id && s.username !== id));
    }
  };

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const matchesClass = filterKelas === 'all' || s.kelas === filterKelas;
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesQuery;
  });

  // Export Hasil Ujian ke CSV
  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('Belum ada data hasil ujian untuk diexport!');
      return;
    }

    let csvContent = 'Waktu Selesai,Nama Siswa,Kelas,Username,Token,Skor Akhir,Jumlah Benar,Durasi (Menit)\n';
    submissions.forEach((sub) => {
      csvContent += `"${sub.finishTime}","${sub.studentName}","${sub.kelas}","${sub.studentId}","${sub.tokenUsed}",${sub.finalScore},${sub.correctCount},${sub.durationMinutes}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Hasil_Ujian_SMPN1Wanaraya_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Admin Title Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Settings className="w-3.5 h-3.5" />
              <span>Portal Pengawas & Guru Matematika SMPN 1 Wanaraya</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Panel Administrasi CBT & Sinkronisasi Spreadsheet
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Kelola data peserta didik kelas 8A & 8B, rekap hasil ujian, atur token, dan integrasikan dengan Google Spreadsheet via Apps Script.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Status Database:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
              connectionStatus === 'connected'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-100 text-slate-700 border border-slate-300'
            }`}>
              <span className={`w-2 h-2 rounded-full ${connectionStatus === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
              {connectionStatus === 'connected' ? 'Sheets Terhubung' : 'Standby / Lokal'}
            </span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setAdminTab('data_pengguna')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              adminTab === 'data_pengguna'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Data Pengguna (Siswa)</span>
          </button>

          <button
            onClick={() => setAdminTab('hasil_ujian')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              adminTab === 'hasil_ujian'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Hasil Ujian ({submissions.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('pengaturan')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              adminTab === 'pengaturan'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan CBT</span>
          </button>

          <button
            onClick={() => setAdminTab('pembahasan')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              adminTab === 'pembahasan'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200'
            }`}
          >
            <Lock className="w-4 h-4 text-purple-600" />
            <span>Akses Pembahasan (Berpassword)</span>
          </button>

          <button
            onClick={() => setAdminTab('appscript')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
              adminTab === 'appscript'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Skrip Google Apps Script</span>
          </button>
        </div>
      </div>

      {/* TAB 1: DATA PENGGUNA (SISWA) */}
      {adminTab === 'data_pengguna' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Data Peserta Didik (Kelas 8A & 8B)
              </h3>
              <p className="text-xs text-slate-500">
                Total terdaftar: <strong>{students.length}</strong> peserta didik
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Menu 'Tarik dari Spreadsheet' Sesuai Spesifikasi */}
              <button
                type="button"
                onClick={handlePullFromSheets}
                disabled={isPulling}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs"
              >
                <Download className={`w-4 h-4 ${isPulling ? 'animate-bounce' : ''}`} />
                <span>{isPulling ? 'Menarik Data...' : 'Tarik dari Spreadsheet'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Siswa</span>
              </button>
            </div>
          </div>

          {pullMessage && (
            <div className={`p-4 rounded-xl text-xs flex items-center gap-2 ${
              pullMessage.startsWith('Berhasil')
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              <Info className="w-4 h-4 shrink-0" />
              <span>{pullMessage}</span>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau username siswa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <select
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value as 'all' | '8A' | '8B')}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">Semua Kelas (8A & 8B)</option>
                <option value="8A">Kelas 8A</option>
                <option value="8B">Kelas 8B</option>
              </select>
            </div>
          </div>

          {/* Tabel Siswa */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">No.</th>
                  <th className="px-4 py-3">Kode / Username</th>
                  <th className="px-4 py-3">Nama Lengkap Peserta</th>
                  <th className="px-4 py-3">Kelas</th>
                  <th className="px-4 py-3">Password</th>
                  <th className="px-4 py-3">Token Ujian</th>
                  <th className="px-4 py-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((s, idx) => (
                    <tr key={s.id || idx} className="hover:bg-slate-50/70">
                      <td className="px-4 py-2.5 text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-2.5 font-mono font-bold text-blue-700">{s.username}</td>
                      <td className="px-4 py-2.5 font-semibold text-slate-800">{s.name}</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          s.kelas === '8A' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {s.kelas}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-slate-600">{s.password}</td>
                      <td className="px-4 py-2.5 font-mono font-bold text-amber-700">{s.token || settings.activeToken}</td>
                      <td className="px-4 py-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteStudent(s.id)}
                          className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                          title="Hapus Siswa"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      Tidak ada data siswa yang cocok dengan filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: HASIL UJIAN */}
      {adminTab === 'hasil_ujian' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                Rekapitulasi Hasil Ujian Formatif (Sheet JawabanUjian)
              </h3>
              <p className="text-xs text-slate-500">
                Total lembar jawaban tersimpan: <strong>{submissions.length}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleExportCSV}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-xs"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export Rekap CSV / Excel</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs transition shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Rekap Nilai</span>
              </button>
            </div>
          </div>

          {/* Tabel Hasil Ujian */}
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">No.</th>
                  <th className="px-4 py-3">Waktu Selesai</th>
                  <th className="px-4 py-3">Nama Siswa</th>
                  <th className="px-4 py-3">Kelas</th>
                  <th className="px-4 py-3 text-center">Skor Akhir (0-100)</th>
                  <th className="px-4 py-3 text-center">Benar</th>
                  <th className="px-4 py-3 text-center">Durasi</th>
                  <th className="px-4 py-3">Status Google Sheets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {submissions.length > 0 ? (
                  submissions.map((sub, idx) => (
                    <tr key={sub.id || idx} className="hover:bg-slate-50/70">
                      <td className="px-4 py-2.5 text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-2.5 text-slate-600 font-mono text-xs">
                        {new Date(sub.finishTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WITA
                      </td>
                      <td className="px-4 py-2.5 font-bold text-slate-800">{sub.studentName}</td>
                      <td className="px-4 py-2.5">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          sub.kelas === '8A' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {sub.kelas}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center font-extrabold text-base">
                        <span className={sub.finalScore >= 75 ? 'text-blue-600' : 'text-amber-600'}>
                          {sub.finalScore}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-center font-semibold text-emerald-600">
                        {sub.correctCount} / 20
                      </td>
                      <td className="px-4 py-2.5 text-center text-slate-600">
                        {sub.durationMinutes} mnt
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Tersimpan (JawabanUjian)
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                      Belum ada siswa yang menyelesaikan ujian formatif. Nilai akan otomatis masuk di sini begitu siswa mengumpulkan jawaban!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PENGATURAN CBT & KONEKSI APPS SCRIPT */}
      {adminTab === 'pengaturan' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-800">
              Pengaturan Sistem CBT & Webhook Spreadsheet
            </h3>
            <p className="text-xs text-slate-500">
              Konfigurasi parameter ujian, token ruang ANBK, dan URL integrasi Google Apps Script
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box Koneksi Spreadsheet */}
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-950 text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  <span>Koneksi Google Apps Script Web App</span>
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  connectionStatus === 'connected'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {connectionStatus === 'connected' ? '● Aktif' : '○ Standby'}
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  URL Web App Google Apps Script (akhiran /exec):
                </label>
                <input
                  type="text"
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                  value={settings.googleAppsScriptUrl}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, googleAppsScriptUrl: e.target.value.trim() }))
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Dapatkan URL ini dari menu Deployment baru di editor Google Apps Script spreadsheet Anda.
                </p>
              </div>

              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTestingConn}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isTestingConn ? 'animate-spin' : ''}`} />
                <span>{isTestingConn ? 'Menguji Koneksi...' : 'Uji Koneksi Database Spreadsheet'}</span>
              </button>

              {testConnResult && (
                <div className={`p-3 rounded-xl text-xs ${
                  testConnResult.success
                    ? 'bg-emerald-100/80 border border-emerald-300 text-emerald-900'
                    : 'bg-rose-100/80 border border-rose-300 text-rose-900'
                }`}>
                  <p className="font-bold">{testConnResult.success ? '✅ Koneksi Sukses!' : '❌ Koneksi Gagal'}</p>
                  <p className="mt-0.5">{testConnResult.message}</p>
                  {testConnResult.latencyMs !== undefined && (
                    <p className="text-[10px] opacity-80 mt-1">Kecepatan respon: {testConnResult.latencyMs} ms</p>
                  )}
                </div>
              )}
            </div>

            {/* Box Parameter Ujian */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Token Ujian Aktif:
                </label>
                <input
                  type="text"
                  value={settings.activeToken}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, activeToken: e.target.value.toUpperCase() }))
                  }
                  className="w-full px-3.5 py-2.5 bg-yellow-50 border border-yellow-300 rounded-xl text-sm font-mono font-bold tracking-wider uppercase focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Siswa wajib memasukkan token ini saat login CBT.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Durasi Waktu Ujian (Menit):
                </label>
                <input
                  type="number"
                  min="10"
                  max="180"
                  value={settings.examDurationMinutes}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, examDurationMinutes: Number(e.target.value) || 80 }))
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Password Akses Pembahasan Guru:
                </label>
                <input
                  type="text"
                  value={settings.discussionPassword}
                  onChange={(e) =>
                    setSettings((prev) => ({ ...prev, discussionPassword: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Password ini digunakan untuk membuka pembahasan 20 soal agar tidak bocor ke siswa.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AKSES PEMBAHASAN (BERPASSWORD SESUAI SPESIFIKASI) */}
      {adminTab === 'pembahasan' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          {!isDiscussionUnlocked ? (
            <div className="max-w-md mx-auto py-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-inner">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-800">
                  Akses Pembahasan Guru Terkunci
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Sesuai ketentuan, pembahasan soal dan kunci jawaban dilindungi password agar tidak dapat diakses langsung oleh peserta didik.
                </p>
              </div>

              {discussionError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{discussionError}</span>
                </div>
              )}

              <form onSubmit={handleUnlockDiscussion} className="space-y-3">
                <div className="relative">
                  <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    placeholder="Masukkan Password Pembahasan Guru..."
                    value={discussionPasswordInput}
                    onChange={(e) => setDiscussionPasswordInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Buka Kunci Pembahasan</span>
                </button>
              </form>

              <p className="text-[11px] text-slate-400">
                Default password: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-mono">GURUWANARAYA2026</code>
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Akses Pembahasan Terbuka</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-800">
                    Kunci Jawaban & Pembahasan Lengkap (20 Butir Soal)
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsDiscussionUnlocked(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-300 text-slate-600 text-xs font-semibold hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Kunci Kembali</span>
                </button>
              </div>

              {/* Rincian 20 Soal Pembahasan */}
              <div className="space-y-6">
                {questions.map((q, idx) => (
                  <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-extrabold text-blue-700 text-sm">
                        Soal Nomor {idx + 1} • TP {q.tpCode} ({q.cognitiveLevel})
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-medium">
                        Tipe: {q.type === 'pg' ? 'Pilihan Ganda' : q.type === 'pgk_mcma' ? 'PG Kompleks (MCMA)' : 'PG Kategorik (Benar/Salah)'}
                      </span>
                    </div>

                    {/* Infografis Stimulus Soal */}
                    <QuestionInfographic question={q} />

                    <p className="text-xs font-semibold text-slate-800 bg-white p-3 rounded-xl border border-slate-200">
                      {q.prompt}
                    </p>

                    {/* Kunci Jawaban Resmi */}
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
                      <span className="font-bold uppercase tracking-wider text-[11px] block">
                        Kunci Jawaban Resmi:
                      </span>
                      {q.type === 'pg' && (
                        <p className="font-bold text-sm">Pilihan: {q.pgCorrectAnswer}</p>
                      )}
                      {q.type === 'pgk_mcma' && (
                        <p className="font-bold">
                          Opsi Benar:{' '}
                          {q.mcmaOptions
                            ?.filter((o) => o.isCorrect)
                            .map((o) => `[${o.statement}]`)
                            .join(' & ')}
                        </p>
                      )}
                      {q.type === 'pgk_kategori' && (
                        <div className="space-y-0.5 pt-1">
                          {q.categoryStatements?.map((st, sI) => (
                            <p key={st.id}>
                              {sI + 1}. {st.statement} ➔ <strong>{st.correctAnswer.toUpperCase()}</strong>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Pembahasan Matematis */}
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block text-blue-700">
                        Pembahasan & Analisis Konsep:
                      </span>
                      <p className="whitespace-pre-line leading-relaxed">{q.explanation}</p>
                    </div>

                    {/* Indikator Soal CAB */}
                    <div className="text-[11px] text-slate-500 pt-1">
                      <strong>Indikator CAB:</strong> C: {q.indicatorCAB.condition} | A: {q.indicatorCAB.audience} | B: {q.indicatorCAB.behavior}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: SKRIP GOOGLE APPS SCRIPT LENGKAP & PETUNJUK */}
      {adminTab === 'appscript' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                <Code className="w-3.5 h-3.5" />
                <span>Source Code Google Apps Script Terpadu</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">
                Kode Apps Script Penghubung Google Spreadsheet
              </h3>
              <p className="text-xs text-slate-500">
                Menjawab 3 pertanyaan integrasi: koneksi database, simpan jawaban & skor, serta kelola data siswa (Kode, Nama, Token).
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyAppsScript}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-md"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedCode ? 'Tersalin ke Clipboard!' : 'Salin Kode Apps Script'}</span>
            </button>
          </div>

          {/* 3 Jawaban Pertanyaan User */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1.5">
              <span className="font-bold text-blue-900 block text-xs">
                1. Indikator Koneksi Database
              </span>
              <p className="text-slate-600 leading-relaxed">
                Aplikasi mengirim request <code className="bg-blue-100 px-1 py-0.5 rounded text-blue-800">action=ping</code> ke Web App. Indikator di pojok kanan atas akan menyala <strong>Hijau (Live)</strong> jika respon sukses.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
              <span className="font-bold text-amber-900 block text-xs">
                2. Simpan Jawaban & Skor (Sheet JawabanUjian)
              </span>
              <p className="text-slate-600 leading-relaxed">
                Data Nama, Kelas, Waktu pengerjaan, Jawaban nomor 1 s.d 20, dan Skor Akhir dikirim otomatis via metode <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-800">doPost</code> dan di-append ke baris baru.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200 space-y-1.5">
              <span className="font-bold text-purple-900 block text-xs">
                3. Sambungan Data Siswa (Sheet UserLogin)
              </span>
              <p className="text-slate-600 leading-relaxed">
                Terdapat kolom [Kode/Username, Nama Peserta, Kelas, Password, Token]. Guru cukup klik tombol <strong>"Tarik dari Spreadsheet"</strong> di menu Data Pengguna untuk menyinkronkannya!
              </p>
            </div>
          </div>

          {/* Editor Code Viewer */}
          <div className="relative rounded-2xl bg-slate-900 p-5 text-slate-100 font-mono text-xs overflow-x-auto max-h-[500px]">
            <pre>{GOOGLE_APPS_SCRIPT_CODE}</pre>
          </div>
        </div>
      )}

      {/* Modal Tambah Siswa */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h4 className="text-base font-bold text-slate-800">Tambah Peserta Didik Baru</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Kode / Username:</label>
                <input
                  type="text"
                  placeholder="Contoh: 8A11"
                  value={newStudent.username}
                  onChange={(e) => setNewStudent({ ...newStudent, username: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Nama Lengkap Peserta:</label>
                <input
                  type="text"
                  placeholder="Nama murid..."
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Kelas:</label>
                <select
                  value={newStudent.kelas}
                  onChange={(e) => setNewStudent({ ...newStudent, kelas: e.target.value as '8A' | '8B' })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                >
                  <option value="8A">Kelas 8A</option>
                  <option value="8B">Kelas 8B</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Password:</label>
                <input
                  type="text"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Token Ujian:</label>
                <input
                  type="text"
                  value={newStudent.token}
                  onChange={(e) => setNewStudent({ ...newStudent, token: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl uppercase font-mono font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700"
                >
                  Simpan Siswa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
