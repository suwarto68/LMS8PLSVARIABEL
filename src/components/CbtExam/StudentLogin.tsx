import React, { useState } from 'react';
import { 
  LogIn, 
  User, 
  KeyRound, 
  Layers, 
  Key, 
  AlertCircle, 
  CheckCircle, 
  Sparkles, 
  School,
  ArrowRight
} from 'lucide-react';
import { Student, AppSettings } from '../../types';

interface StudentLoginProps {
  students: Student[];
  settings: AppSettings;
  onLoginSuccess: (student: Student) => void;
  onSwitchToAdmin: () => void;
}

export const StudentLogin: React.FC<StudentLoginProps> = ({
  students,
  settings,
  onLoginSuccess,
  onSwitchToAdmin
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedClass, setSelectedClass] = useState<'8A' | '8B'>('8A');
  const [tokenInput, setTokenInput] = useState(settings.activeToken || 'WANARAYA26');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();
    const cleanToken = tokenInput.trim().toUpperCase();

    // Validasi input
    if (!cleanUsername || !cleanPassword) {
      setErrorMessage('Harap isi Username dan Password terlebih dahulu!');
      setIsSubmitting(false);
      return;
    }

    // Validasi token
    if (settings.activeToken && cleanToken !== settings.activeToken.toUpperCase()) {
      setErrorMessage(`Token ujian salah! Hubungi proktor/pengawas ruang atau gunakan token: ${settings.activeToken}`);
      setIsSubmitting(false);
      return;
    }

    // Cari siswa berdasarkan username/id dan kelas
    const foundStudent = students.find(
      (s) =>
        (s.username.toLowerCase() === cleanUsername || s.id.toLowerCase() === cleanUsername) &&
        s.kelas === selectedClass
    );

    if (!foundStudent) {
      setErrorMessage(
        `Siswa dengan username "${username}" di kelas ${selectedClass} tidak ditemukan. Pastikan Anda memilih kelas yang sesuai (8A / 8B)!`
      );
      setIsSubmitting(false);
      return;
    }

    // Validasi password
    if (foundStudent.password && foundStudent.password !== cleanPassword) {
      setErrorMessage('Password yang Anda masukkan salah! (Default: 123)');
      setIsSubmitting(false);
      return;
    }

    // Berhasil Login!
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(foundStudent);
    }, 400);
  };

  const handleQuickFill = (presetUsername: string, presetClass: '8A' | '8B') => {
    setUsername(presetUsername);
    setPassword('123');
    setSelectedClass(presetClass);
    setTokenInput(settings.activeToken || 'WANARAYA26');
    setErrorMessage(null);
  };

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      {/* Kotak Login Putih dengan Bayangan (Shadow) Sesuai Spesifikasi */}
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Top Header Biru Card */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-6 sm:p-7 text-white text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400 text-blue-950 text-xs font-black uppercase tracking-wider mb-2">
            ASESMEN CBT ANBK RESMI
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            Login Masuk Siswa
          </h2>
          <p className="text-xs sm:text-sm text-blue-200 mt-1">
            SMP Negeri 1 Wanaraya • Ujian Formatif Aljabar
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Gagal Masuk Ujian</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Pilihan Dropdown Kelas [8A dan 8B] */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Pilih Kelas Anda:</span>
              </label>
              <div className="relative">
                <select
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value as '8A' | '8B')}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                >
                  <option value="8A">Kelas 8A (SMPN 1 Wanaraya)</option>
                  <option value="8B">Kelas 8B (SMPN 1 Wanaraya)</option>
                </select>
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-600" />
                <span>Username / NISN Siswa:</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: 8A01 atau 8B01"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-blue-600" />
                <span>Password Siswa:</span>
              </label>
              <input
                type="password"
                placeholder="Masukkan kata sandi (Default: 123)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white text-sm"
                required
              />
            </div>

            {/* Token Ujian */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-yellow-600" />
                  <span>Token Ujian (Rilis Pengawas):</span>
                </span>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Token: {settings.activeToken}
                </span>
              </label>
              <input
                type="text"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="w-full px-4 py-3 bg-yellow-50/60 border border-yellow-300 rounded-xl text-slate-800 font-mono font-bold tracking-widest text-center uppercase focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                required
              />
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition transform active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
            >
              <LogIn className="w-5 h-5" />
              <span>{isSubmitting ? 'Memverifikasi...' : 'MASUK RUANG UJIAN'}</span>
            </button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Klik Akun Uji Coba Cepat (Demo):</span>
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickFill('8A01', '8A')}
                className="p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 font-semibold text-left transition"
              >
                <span className="block text-[10px] text-blue-600 uppercase font-bold">Kelas 8A (8A01)</span>
                <span>Ahmad Rifani</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('8B01', '8B')}
                className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-semibold text-left transition"
              >
                <span className="block text-[10px] text-emerald-600 uppercase font-bold">Kelas 8B (8B01)</span>
                <span>Budi Santoso</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 text-center">
              Password default untuk semua akun adalah <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700 font-bold">123</code>
            </p>
          </div>
        </div>

        {/* Footer Card */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Khusus Murid SMPN 1 Wanaraya</span>
          <button
            type="button"
            onClick={onSwitchToAdmin}
            className="text-blue-600 font-semibold hover:underline"
          >
            Portal Guru / Admin →
          </button>
        </div>
      </div>
    </div>
  );
};
