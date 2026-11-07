import React, { useState } from 'react';
import { 
  Target, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  FileCheck, 
  Sparkles, 
  Info,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  ArrowRight
} from 'lucide-react';

export const TujuanPembelajaran: React.FC<{ onStartQuiz?: () => void }> = ({ onStartQuiz }) => {
  const [activeAccordion, setActiveAccordion] = useState<string | null>('3.1');

  const learningObjectives = [
    {
      code: '3.1',
      title: 'Memodelkan Masalah ke dalam Persamaan Linear Satu Variabel (PLSV)',
      description: 'Peserta didik mampu menerjemahkan situasi nyata sehari-hari, data tabel, atau infografis ke dalam kalimat matematika terbuka berupa persamaan linear satu variabel.',
      subCompetencies: [
        'Mengidentifikasi kuantitas yang bernilai tetap (konstanta) dan kuantitas yang nilainya berubah/belum diketahui (variabel).',
        'Menyusun model matematika ax + b = c dari permasalahan kontekstual.',
        'Menganalisis hubungan antarbesaran aljabar pada studi kasus kehidupan nyata (seperti biaya angkut kelotok, panen sawit, timbangan neraca).'
      ],
      cognitiveProcess: 'Aplikasi (Memodelkan) & Pemahaman (Mengidentifikasi)',
      questionsMapped: [1, 3, 20],
      exampleFormula: 'Contoh Model: 4x + 15 = 135 (x = berat jeruk per kotak)'
    },
    {
      code: '3.2',
      title: 'Menyelesaikan PLSV dengan Menggunakan Sifat-Sifat Kesetaraan',
      description: 'Peserta didik mampu menentukan nilai variabel yang memenuhi persamaan linear satu variabel dengan menerapkan operasi penjumlahan, pengurangan, perkalian, atau pembagian pada kedua ruas secara setara.',
      subCompetencies: [
        'Menerapkan sifat penjumlahan dan pengurangan kesetaraan: a = b ↔ a ± c = b ± c.',
        'Menerapkan sifat perkalian dan pembagian kesetaraan: a = b ↔ a × c = b × c (dengan c ≠ 0).',
        'Menyelesaikan PLSV bentuk koefisien pecahan dengan memanfaatkan KPK penyebut.',
        'Menganalisis dan mengevaluasi titik impas (break-even point) atau kebenaran langkah penyelesaian aljabar.'
      ],
      cognitiveProcess: 'Aplikasi (Mengaplikasikan) & Penalaran (Menganalisis / Memecahkan Masalah)',
      questionsMapped: [4, 8, 9, 11, 13, 15, 17],
      exampleFormula: '2(3x - 4) = 4x + 10 → 6x - 8 = 4x + 10 → 2x = 18 → x = 9'
    },
    {
      code: '3.3',
      title: 'Memodelkan Masalah ke dalam Pertidaksamaan Linear Satu Variabel (PtLSV)',
      description: 'Peserta didik mampu memodelkan batasan maksimal, minimal, atau kapasitas batas toleransi suatu kondisi nyata ke dalam bentuk pertidaksamaan linear satu variabel.',
      subCompetencies: [
        'Memahami makna frasa kontekstual batasan: "tidak lebih dari" (≤), "paling sedikit/minimal" (≥), "kurang dari" (<), dan "lebih dari" (>).',
        'Menyusun model pertidaksamaan ax + b ≤ c atau ax + b ≥ c dari narasi studi kasus.',
        'Menghubungkan syarat kriteria kelayakan (seperti batas beban jembatan, anggaran kas OSIS, atau kriteria beasiswa) ke dalam bentuk aljabar.'
      ],
      cognitiveProcess: 'Aplikasi (Memodelkan & Menginterpretasikan)',
      questionsMapped: [5, 16],
      exampleFormula: 'Contoh Model: 35.000t + 50.000 ≤ 260.000 (t = jam sewa kelotok)'
    },
    {
      code: '3.4',
      title: 'Menyelesaikan PtLSV dengan Memperhatikan Sifat-Sifat Ketidaksamaan',
      description: 'Peserta didik mampu mencari himpunan penyelesaian pertidaksamaan linear satu variabel dengan cermat, khususnya memahami aturan pembalikan tanda ketidaksamaan saat dikali atau dibagi bilangan negatif.',
      subCompetencies: [
        'Menerapkan sifat ketidaksamaan pada kedua ruas dengan operasi aljabar.',
        'Memahami dan menerapkan aturan kritis pembalikan tanda relasi ( < berubah menjadi >, dan sebaliknya) jika dikalikan atau dibagi bilangan negatif.',
        'Menyelesaikan PtLSV bentuk pecahan dan PtLSV bertanda kurung.',
        'Menyelesaikan pertidaksamaan linear satu variabel majemuk a ≤ bx + c < d.'
      ],
      cognitiveProcess: 'Pemahaman (Knowing), Aplikasi (Applying), dan Penalaran (Reasoning)',
      questionsMapped: [2, 6, 10, 12, 14, 18],
      exampleFormula: '-3x < 18 → x > 18 / (-3) → x > -6 (tanda dibalik!)'
    },
    {
      code: '3.5',
      title: 'Menyajikan Himpunan Penyelesaian PtLSV pada Garis Bilangan',
      description: 'Peserta didik mampu merepresentasikan daerah penyelesaian suatu pertidaksamaan linear satu variabel pada garis bilangan berarah dengan tepat menggunakan konvensi bulatan terbuka/tertutup.',
      subCompetencies: [
        'Menentukan batas titik koordinat penyelesaian pada garis bilangan horizontal.',
        'Membedakan penggunaan bulatan kosong/terbuka (○ untuk tanda < dan >) dan bulatan penuh/pejal (● untuk tanda ≤ dan ≥).',
        'Mengarsir atau mengarahkan anak panah ke kanan (untuk nilai lebih besar) atau ke kiri (untuk nilai lebih kecil).',
        'Mengidentifikasi anggota himpunan bilangan cacah, bulat, atau real yang terletak pada daerah grafik.'
      ],
      cognitiveProcess: 'Aplikasi (Representasi Matematis) & Penalaran (Mengevaluasi Grafik)',
      questionsMapped: [7, 19],
      exampleFormula: 'x > 3 (Bulatan terbuka di angka 3, panah mengarah ke kanan)'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
              <Target className="w-3.5 h-3.5" />
              <span>Elemen Aljabar • Fase D (Kelas 8 SMP)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Tujuan Pembelajaran (TP) & Kerangka Asesmen
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
              Disusun mengacu pada <strong>Salinan Peraturan Kepala BSKAP Kemendikdasmen No. 047/H/AN/2025</strong> tentang Kerangka Asesmen Tes Kemampuan Akademik (TKA) jenjang SMP/MTs, menekankan integrasi stimulus kontekstual, format penulisan indikator CAB (Condition-Audience-Behavior), serta tiga jenjang kognitif (Pemahaman, Aplikasi, dan Penalaran).
            </p>
          </div>

          {onStartQuiz && (
            <button
              onClick={onStartQuiz}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs hover:bg-blue-700 transition"
            >
              <span>Uji Kompetensi Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Kaidah Kerangka TKA Card */}
        <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
              C
            </div>
            <div>
              <p className="font-bold text-slate-800">Condition (Stimulus)</p>
              <p className="text-slate-600 mt-0.5">Wacana ~100 kata, tabel, diagram, atau studi kasus aktual Kalimantan Selatan.</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
              A
            </div>
            <div>
              <p className="font-bold text-slate-800">Audience (Peserta Didik)</p>
              <p className="text-slate-600 mt-0.5">Murid kelas 8 SMP Negeri 1 Wanaraya (Fase D Kurikulum Merdeka).</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
              B
            </div>
            <div>
              <p className="font-bold text-slate-800">Behavior (Proses Kognitif)</p>
              <p className="text-slate-600 mt-0.5">Kemampuan memodelkan, menerapkan sifat kesetaraan, dan bernalar tingkat tinggi (HOTS).</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian 5 Tujuan Pembelajaran */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" />
          <span>Daftar Rinci Tujuan Pembelajaran 3.1 s.d. 3.5</span>
        </h3>

        <div className="space-y-3">
          {learningObjectives.map((obj) => {
            const isOpen = activeAccordion === obj.code;
            return (
              <div 
                key={obj.code}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
              >
                <button
                  onClick={() => setActiveAccordion(isOpen ? null : obj.code)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/80 transition"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shadow-xs shrink-0">
                      {obj.code}
                    </span>
                    <div>
                      <h4 className="text-base font-bold text-slate-800">
                        {obj.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {obj.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 hidden sm:inline">
                      {obj.questionsMapped.length} Soal Ujian
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 text-xs sm:text-sm">
                    <p className="text-slate-700 leading-relaxed">
                      {obj.description}
                    </p>

                    <div>
                      <h5 className="font-bold text-slate-800 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span>Indikator Subkompetensi yang Diukur:</span>
                      </h5>
                      <ul className="space-y-1.5 pl-2">
                        {obj.subCompetencies.map((sub, i) => (
                          <li key={i} className="flex items-start gap-2 text-slate-600 text-xs sm:text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100">
                        <span className="text-[11px] font-bold text-blue-800 uppercase block">Level Kognitif TKA:</span>
                        <span className="text-xs font-semibold text-blue-900">{obj.cognitiveProcess}</span>
                      </div>
                      <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-100">
                        <span className="text-[11px] font-bold text-amber-800 uppercase block">Sebaran Nomor Soal:</span>
                        <span className="text-xs font-semibold text-amber-900">
                          Nomor: {obj.questionsMapped.join(', ')} (Total {obj.questionsMapped.length} Soal)
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 text-white rounded-xl font-mono text-xs">
                      <span className="text-yellow-400 font-bold block mb-1">Visualisasi Contoh Aljabar:</span>
                      <code>{obj.exampleFormula}</code>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
