import React from 'react';
import { 
  Target, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Award, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  GraduationCap, 
  FileText,
  School,
  Database
} from 'lucide-react';
import { AppSettings } from '../types';

interface HomeSectionProps {
  onNavigate: (tab: 'home' | 'tujuan' | 'materi' | 'kuis' | 'admin') => void;
  settings: AppSettings;
  connectionStatus: 'connected' | 'checking' | 'disconnected' | 'idle';
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, settings, connectionStatus }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Cerah dengan Salam Pembuka */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 via-sky-50 to-blue-50 border border-blue-100 shadow-sm p-6 sm:p-10">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-gradient-to-bl from-blue-200/40 via-yellow-200/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-gradient-to-tr from-sky-200/50 to-transparent rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>SMP Negeri 1 Wanaraya • TP 2026/2027</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            “Salam Belajar dan <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
              Terus Belajar Sepanjang Hayat
            </span>”
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Selamat datang di Portal LMS dan Ruang Ujian Online CBT ANBK Berbasis Standar TKA Kemendikdasmen (Perkaban No. 047/H/AN/2025). Asah kemampuan literasi dan numerasi aljabar dengan konteks nyata bumi Barito Kuala!
          </p>

          {/* Quick Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('kuis')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition transform active:scale-95"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Mulai Ujian Formatif (Kuis)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('materi')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white text-slate-700 font-bold text-sm border border-slate-200 hover:bg-slate-50 hover:text-blue-600 transition shadow-xs"
            >
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Pelajari Materi Aljabar</span>
            </button>
          </div>

          {/* Quick Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 border-t border-slate-200/60 max-w-xl mx-auto">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-500" /> 20 Soal Terstandar TKA
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-4 h-4 text-blue-500" /> Durasi 80 Menit
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <GraduationCap className="w-4 h-4 text-purple-500" /> Kelas 8A & 8B Fase D
            </span>
          </div>
        </div>
      </section>

      {/* 3 Menu Utama Kartu Akses */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Menu Pembelajaran Utama</h2>
            <p className="text-xs sm:text-sm text-slate-500">Pilih modul pembelajaran atau mulai asesmen formatif</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100">
            Fase D Matematika
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Menu 1: Tujuan Pembelajaran */}
          <div 
            onClick={() => onNavigate('tujuan')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Modul 1</span>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition">
                  1. Tujuan Pembelajaran
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Memuat capaian pembelajaran 3.1 sampai 3.5, indikator ketercapaian (CAB), serta pemetaan kompetensi PLSV dan PtLSV sesuai kerangka asesmen TKA 2025.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition">
              <span>Buka Tujuan Pembelajaran</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Menu 2: Materi */}
          <div 
            onClick={() => onNavigate('materi')}
            className="group cursor-pointer bg-white rounded-2xl p-6 border border-slate-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg group-hover:bg-amber-600 group-hover:text-white transition">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Modul 2</span>
                <h3 className="text-lg font-bold text-slate-800 group-hover:text-amber-600 transition">
                  2. Pendalaman Materi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Eksplorasi konsep PLSV & PtLSV, sifat kesetaraan, grafik garis bilangan interaktif, dan koneksi Bangun Ruang Sisi Lengkung (Infografis referensi).
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition">
              <span>Buka Materi & Visualisasi</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Menu 3: Kuis CBT ANBK */}
          <div 
            onClick={() => onNavigate('kuis')}
            className="group cursor-pointer bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 text-yellow-300 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider">Modul 3 • Asesmen Formatif</span>
                <h3 className="text-lg font-bold text-white">
                  3. Kuis (CBT ANBK Online)
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-1.5 leading-relaxed">
                  20 Soal formatif (10 PG, 4 PGK MCMA, 6 PGK Benar/Salah) dengan timer 80 menit, navigasi ragu-ragu, dan sinkronisasi otomatis ke Google Spreadsheet!
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-yellow-300 group-hover:translate-x-1 transition">
              <span>Masuk Ruang Ujian CBT</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* Identitas Sekolah & Kerangka TKA Info */}
      <section className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
              <School className="w-3.5 h-3.5 text-blue-600" />
              Profil Pelaksanaan Asesmen
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              SMP Negeri 1 Wanaraya, Kabupaten Barito Kuala
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Asesmen formatif ini dirancang berdasarkan dokumen resmi Salinan Peraturan Kepala BSKAP Nomor 047/H/AN/2025 tentang Kerangka Asesmen Tes Kemampuan Akademik (TKA) jenjang SMP/MTs. Butir soal berakar pada stimulus kehidupan nyata Kalimantan Selatan, merangsang nalar kritis (HOTS), literasi membaca data, dan pemodelan matematis.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">Kelas 8A & 8B</span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">KKTP: 75</span>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md font-medium">Elemen: Aljabar</span>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Distribusi Level Kognitif Soal (20 Butir)
            </h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>1. Pemahaman (Knowing & Understanding)</span>
                  <span>10% (2 Soal)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '10%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>2. Aplikasi (Applying)</span>
                  <span>50% (10 Soal)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full" style={{ width: '50%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>3. Penalaran HOTS (Reasoning)</span>
                  <span>40% (8 Soal)</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-600 h-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-200">
              <span>Status Koneksi Spreadsheet:</span>
              <span className={`font-semibold ${connectionStatus === 'connected' ? 'text-emerald-600' : 'text-blue-600'}`}>
                {connectionStatus === 'connected' ? '● Aktif (Sheet UserLogin & JawabanUjian)' : '○ Standby Penyimpanan Lokal'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
