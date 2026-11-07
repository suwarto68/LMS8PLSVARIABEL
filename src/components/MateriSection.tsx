import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Check, 
  AlertTriangle, 
  Layers, 
  Compass, 
  Calculator, 
  Sparkles,
  ArrowRight,
  Eye,
  Boxes,
  Maximize2
} from 'lucide-react';

export const MateriSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plsv' | 'ptlsv' | 'garis_bilangan' | 'bangun_ruang'>('plsv');

  // Interactive Number Line State
  const [nlValue, setNlValue] = useState<number>(3);
  const [nlOperator, setNlOperator] = useState<'>' | '≥' | '<' | '≤'>('>');

  return (
    <div className="space-y-8 pb-12">
      {/* Title & Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Modul Pembelajaran Mandiri • Matematika SMP Kelas 8</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Pendalaman Materi Aljabar & Bangun Ruang Sisi Lengkung
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
              Materi terpadu Persamaan & Pertidaksamaan Linear Satu Variabel (PLSV & PtLSV) terintegrasi dengan pemodelan geometri Bangun Ruang Sisi Lengkung sesuai infografis referensi.
            </p>
          </div>

          <a
            href="https://freeimage.host/i/ntUV2Ns"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition shadow-xs"
          >
            <Eye className="w-4 h-4 text-yellow-400" />
            <span>Lihat Infografis Referensi</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('plsv')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'plsv'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            1. Konsep & Sifat PLSV
          </button>

          <button
            onClick={() => setActiveTab('ptlsv')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'ptlsv'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            2. Aturan Kritis PtLSV
          </button>

          <button
            onClick={() => setActiveTab('garis_bilangan')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'garis_bilangan'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            3. Interaktif Garis Bilangan
          </button>

          <button
            onClick={() => setActiveTab('bangun_ruang')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'bangun_ruang'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            4. Koneksi Bangun Ruang Sisi Lengkung
          </button>
        </div>
      </div>

      {/* Content Tab 1: PLSV */}
      {activeTab === 'plsv' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  A
                </span>
                <span>Definisi & Karakteristik PLSV</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>Persamaan Linear Satu Variabel (PLSV)</strong> adalah kalimat terbuka yang dihubungkan oleh tanda sama dengan (<code className="bg-slate-100 px-1 py-0.5 rounded text-blue-600 font-bold">=</code>) dan hanya mempunyai <strong>satu variabel</strong> yang berpangkat satu (derajat satu).
              </p>

              <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-1.5 text-xs sm:text-sm">
                <span className="font-bold text-blue-900 block">Bentuk Umum PLSV:</span>
                <p className="font-mono text-base font-extrabold text-blue-700">ax + b = c</p>
                <p className="text-slate-600 text-xs">
                  di mana <strong>a ≠ 0</strong> (a adalah koefisien variabel x), <strong>x</strong> adalah variabel, serta <strong>b</strong> dan <strong>c</strong> adalah konstanta bilangan real.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Identifikasi Cepat:</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><code className="font-bold">5p - 18 = 32</code> ➔ <strong>PLSV</strong> (1 variabel p berpangkat 1)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-100">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span><code className="font-bold">3x² - 5 = 22</code> ➔ <strong>Bukan PLSV</strong> (Derajat kuadrat / pangkat 2)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-100">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span><code className="font-bold">4x + 7y = 45</code> ➔ <strong>Bukan PLSV</strong> (Dua variabel x dan y)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  B
                </span>
                <span>Sifat-Sifat Kesetaraan PLSV</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dua persamaan dikatakan <strong>ekuivalen (setara)</strong> jika mempunyai himpunan penyelesaian yang sama persis, dilambangkan dengan tanda <code className="font-bold">↔</code>.
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">1. Sifat Penjumlahan & Pengurangan</p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Kedua ruas boleh ditambah atau dikurang dengan bilangan yang sama:
                  </p>
                  <code className="font-mono text-blue-700 block font-bold text-xs mt-1">
                    Jika a = b, maka a + c = b + c dan a - c = b - c
                  </code>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">2. Sifat Perkalian & Pembagian</p>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Kedua ruas boleh dikalikan atau dibagi bilangan tak nol yang sama:
                  </p>
                  <code className="font-mono text-blue-700 block font-bold text-xs mt-1">
                    Jika a = b, maka a × c = b × c dan a ÷ c = b ÷ c (c ≠ 0)
                  </code>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold block">💡 Tips PLSV Pecahan:</span>
                  Untuk persamaan seperti <code className="font-bold">1/3(2x - 1) = 1/4(x + 3)</code>, kalikan kedua ruas dengan <strong>KPK penyebut</strong> (KPK 3 dan 4 adalah 12) agar bilangan bulat dan mudah dihitung.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Tab 2: PtLSV */}
      {activeTab === 'ptlsv' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold">
                Fokus Penilaian TKA & ANBK
              </span>
              <h3 className="text-xl font-extrabold text-slate-800">
                Pertidaksamaan Linear Satu Variabel (PtLSV) & Aturan Kritis
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                PtLSV menggunakan tanda relasi ketidaksamaan: <code className="bg-slate-100 px-1 py-0.5 rounded font-bold">&lt;</code> (kurang dari), <code className="bg-slate-100 px-1 py-0.5 rounded font-bold">&gt;</code> (lebih dari), <code className="bg-slate-100 px-1 py-0.5 rounded font-bold">≤</code> (kurang dari atau sama dengan / tidak lebih dari), dan <code className="bg-slate-100 px-1 py-0.5 rounded font-bold">≥</code> (lebih dari atau sama dengan / minimal).
              </p>
            </div>

            {/* Warning Box Pembalikan Tanda */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-orange-500/10 border-2 border-rose-300 space-y-3">
              <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm sm:text-base">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>ATURAN KRITIS: Pembalikan Tanda Ketidaksamaan</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Jika kedua ruas suatu pertidaksamaan <strong>dikalikan atau dibagi dengan bilangan negatif</strong>, maka <strong>arah tanda ketidaksamaan WAJIB DIBALIK</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-white rounded-xl border border-rose-200">
                  <span className="text-rose-600 font-bold block mb-1">Contoh 1 (Pembagian Negatif):</span>
                  <p>-3x &lt; 18</p>
                  <p>x &gt; 18 / (-3) <span className="text-rose-600 font-bold">(Tanda &lt; berbalik ke &gt;)</span></p>
                  <p className="text-emerald-700 font-bold mt-1">Hasil: x &gt; -6</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-rose-200">
                  <span className="text-rose-600 font-bold block mb-1">Contoh 2 (Perkalian Negatif):</span>
                  <p>-1/2 y ≥ 7</p>
                  <p>y ≤ 7 × (-2) <span className="text-rose-600 font-bold">(Tanda ≥ berbalik ke ≤)</span></p>
                  <p className="text-emerald-700 font-bold mt-1">Hasil: y ≤ -14</p>
                </div>
              </div>
            </div>

            {/* Pemodelan Kontekstual Kata Kunci */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-800">
                Penerjemahan Bahasa Keseharian ke Simbol Matematika:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-mono text-base font-extrabold text-blue-600 block mb-1">≤</span>
                  <p className="font-bold text-slate-700">Maksimal / Tidak Lebih Dari</p>
                  <p className="text-slate-500 mt-1">Contoh: Beban jembatan tidak lebih dari 550 kg (Beban ≤ 550)</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-mono text-base font-extrabold text-emerald-600 block mb-1">≥</span>
                  <p className="font-bold text-slate-700">Minimal / Paling Sedikit</p>
                  <p className="text-slate-500 mt-1">Contoh: Nilai rata-rata tidak kurang dari 85 (Rata-rata ≥ 85)</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-mono text-base font-extrabold text-amber-600 block mb-1">&lt;</span>
                  <p className="font-bold text-slate-700">Kurang Dari / Di Bawah</p>
                  <p className="text-slate-500 mt-1">Contoh: Waktu tempuh di bawah 30 menit (t &lt; 30)</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-mono text-base font-extrabold text-purple-600 block mb-1">&gt;</span>
                  <p className="font-bold text-slate-700">Lebih Dari / Di Atas</p>
                  <p className="text-slate-500 mt-1">Contoh: Keuntungan lebih dari 5 juta (Laba &gt; 5.000.000)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Tab 3: Interaktif Garis Bilangan */}
      {activeTab === 'garis_bilangan' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulasi Interaktif Garis Bilangan (TP 3.5)</span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-800">
                Visualisasi Himpunan Penyelesaian PtLSV
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Ubah nilai titik dan jenis operator ketidaksamaan di bawah ini untuk melihat langsung bagaimana lingkaran kosong (terbuka), lingkaran pejal (tertutup), dan arah panah arsiran terbentuk!
              </p>
            </div>

            {/* Interactive Controls */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilih Operator Ketidaksamaan:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(['>', '≥', '<', '≤'] as const).map((op) => (
                    <button
                      key={op}
                      onClick={() => setNlOperator(op)}
                      className={`py-2 px-3 rounded-xl font-mono text-base font-bold transition ${
                        nlOperator === op
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  {nlOperator === '>' || nlOperator === '<'
                    ? '● Menggunakan Lingkaran Kosong / Terbuka (Nilai batas tidak termasuk)'
                    : '● Menggunakan Lingkaran Penuh / Pejal (Nilai batas termasuk penyelesaian)'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Geser Titik Batas (x = {nlValue}):
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={nlValue}
                  onChange={(e) => setNlValue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-2">
                  <span>-5</span>
                  <span>-3</span>
                  <span>0</span>
                  <span>+3</span>
                  <span>+5</span>
                </div>
              </div>
            </div>

            {/* Interactive Visual Canvas / SVG */}
            <div className="p-6 bg-slate-900 rounded-2xl text-white space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                  Hasil Pemodelan Grafik Garis Bilangan:
                </span>
                <span className="font-mono text-base font-extrabold text-yellow-300 bg-slate-800 px-3 py-1 rounded-lg">
                  x {nlOperator} {nlValue}
                </span>
              </div>

              {/* Dynamic SVG Number Line */}
              <div className="w-full overflow-x-auto py-6">
                <svg viewBox="0 0 700 120" className="w-full min-w-[550px] h-32">
                  {/* Base Axis Line */}
                  <line x1="50" y1="60" x2="650" y2="60" stroke="#94a3b8" strokeWidth="3" />
                  <polygon points="650,55 665,60 650,65" fill="#94a3b8" />
                  <polygon points="50,55 35,60 50,65" fill="#94a3b8" />

                  {/* Ticks from -5 to +5 */}
                  {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((val) => {
                    const cx = 350 + val * 55;
                    const isSelected = val === nlValue;
                    return (
                      <g key={val}>
                        <line x1={cx} y1="52" x2={cx} y2="68" stroke="#cbd5e1" strokeWidth="2" />
                        <text
                          x={cx}
                          y="92"
                          textAnchor="middle"
                          fill={isSelected ? '#facc15' : '#94a3b8'}
                          fontSize={isSelected ? '15' : '12'}
                          fontWeight={isSelected ? 'bold' : 'normal'}
                          fontFamily="monospace"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Shaded Arrow Region */}
                  {(() => {
                    const cx = 350 + nlValue * 55;
                    const isRight = nlOperator === '>' || nlOperator === '≥';
                    const isSolid = nlOperator === '≥' || nlOperator === '≤';

                    return (
                      <g>
                        {/* Ray Line with Arrow */}
                        {isRight ? (
                          <>
                            <line x1={cx} y1="60" x2="650" y2="60" stroke="#38bdf8" strokeWidth="6" />
                            <polygon points="650,52 668,60 650,68" fill="#38bdf8" />
                          </>
                        ) : (
                          <>
                            <line x1={cx} y1="60" x2="50" y2="60" stroke="#38bdf8" strokeWidth="6" />
                            <polygon points="50,52 32,60 50,68" fill="#38bdf8" />
                          </>
                        )}

                        {/* Node Circle */}
                        {isSolid ? (
                          <circle cx={cx} cy="60" r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
                        ) : (
                          <circle cx={cx} cy="60" r="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="3.5" />
                        )}

                        {/* Label tag */}
                        <text
                          x={cx}
                          y="32"
                          textAnchor="middle"
                          fill="#38bdf8"
                          fontSize="13"
                          fontWeight="bold"
                          fontFamily="sans-serif"
                        >
                          {isSolid ? `Titik Pejal [x=${nlValue}]` : `Titik Berlubang (x=${nlValue})`}
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              <div className="p-3 bg-slate-800/80 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                <span>Arah Panah: <strong>{nlOperator === '>' || nlOperator === '≥' ? 'Ke Kanan (Semakin Besar)' : 'Ke Kiri (Semakin Kecil)'}</strong></span>
                <span>Tipe Titik: <strong>{nlOperator === '≥' || nlOperator === '≤' ? 'Bulatan Penuh (Tertutup)' : 'Bulatan Kosong (Terbuka)'}</strong></span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Tab 4: Bangun Ruang Sisi Lengkung */}
      {activeTab === 'bangun_ruang' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                  Sesuai Lampiran Asesmen & Infografis
                </span>
                <h3 className="text-xl font-extrabold text-slate-800">
                  Koneksi Aljabar dengan Bangun Ruang Sisi Lengkung
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Infografis: <a href="https://freeimage.host/i/ntUV2Ns" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-semibold">https://freeimage.host/i/ntUV2Ns</a>
                </p>
              </div>

              <a
                href="https://freeimage.host/i/ntUV2Ns"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition"
              >
                <span>Buka Gambar Sumber</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Tabung */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-bold text-slate-800 text-base">Tabung (Silinder)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bangun ruang yang dibatasi oleh dua lingkaran kongruen sejajar dan selimut lengkung berbentuk persegi panjang yang digulung.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-xs font-mono">
                  <p className="text-blue-700 font-bold">Volume = π × r² × t</p>
                  <p className="text-slate-600">Luas Selimut = 2 × π × r × t</p>
                  <p className="text-slate-600">Luas Permukaan = 2πr(r + t)</p>
                </div>
                <div className="text-[11px] bg-blue-50 p-2.5 rounded-lg text-blue-800">
                  <strong>Penerapan Aljabar PLSV:</strong> Menghitung tinggi t jika volume V dan jari-jari r diketahui (misal Soal No. 20).
                </div>
              </div>

              {/* Kerucut */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-bold text-slate-800 text-base">Kerucut</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bangun ruang yang dibatasi oleh sebuah alas lingkaran dan sebuah selimut lengkung berbentuk juring lingkaran dengan satu titik puncak.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-xs font-mono">
                  <p className="text-amber-700 font-bold">Volume = 1/3 × π × r² × t</p>
                  <p className="text-slate-600">Garis Pelukis: s² = r² + t²</p>
                  <p className="text-slate-600">Luas Permukaan = πr(r + s)</p>
                </div>
                <div className="text-[11px] bg-amber-50 p-2.5 rounded-lg text-amber-800">
                  <strong>Penerapan Aljabar PLSV:</strong> Menentukan tinggi kerucut t dari persamaan volume sepertiga.
                </div>
              </div>

              {/* Bola */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-bold text-slate-800 text-base">Bola</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bangun ruang yang dibentuk oleh tak hingga lingkaran yang berjari-jari sama panjang dan berpusat pada satu titik yang sama.
                </p>
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-xs font-mono">
                  <p className="text-purple-700 font-bold">Volume = 4/3 × π × r³</p>
                  <p className="text-slate-600">Luas Permukaan = 4 × π × r²</p>
                </div>
                <div className="text-[11px] bg-purple-50 p-2.5 rounded-lg text-purple-800">
                  <strong>Penerapan Aljabar:</strong> Membandingkan rasio volume bola dan tabung yang memiliki diameter sama.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
