import React from 'react';
import { Question } from '../../types';
import { 
  Scale, 
  Ship, 
  Package, 
  Sprout, 
  Trees, 
  Droplet, 
  Compass, 
  MapPin, 
  Layers, 
  Thermometer, 
  Activity, 
  Fish, 
  Sparkles, 
  Info,
  Truck,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

interface QuestionInfographicProps {
  question: Question;
}

export const QuestionInfographic: React.FC<QuestionInfographicProps> = ({ question }) => {
  const qId = question.id;

  return (
    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 sm:p-5 shadow-xs my-4 space-y-3">
      {/* Header Infografis Kontekstual */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800">
              Infografis Kontekstual Soal #{qId}
            </h4>
            <p className="text-[10px] text-slate-500">
              Konteks: {question.contextRegion || 'Kecamatan Wanaraya, Barito Kuala'}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 uppercase">
          Stimulus TKA
        </span>
      </div>

      {/* Render Visual Infografis Spesifik Tiap Soal (Tanpa Memberi Kunci Jawaban) */}
      <div className="w-full flex items-center justify-center">
        {/* SOAL 1: Penimbangan Padi Siam Mayang di Wanaraya */}
        {qId === 1 && (
          <div className="w-full max-w-lg bg-amber-50/60 rounded-xl p-4 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900">
              <span>🌾 Penimbangan Gabah Padi Pasang Surut</span>
              <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded">Desa Kolam Kanan, Wanaraya</span>
            </div>
            {/* SVG Ilustrasi Neraca Timbangan Petani */}
            <svg viewBox="0 0 420 160" className="w-full h-36">
              {/* Meja Duduk Timbangan */}
              <rect x="30" y="130" width="360" height="15" rx="3" fill="#64748b" />
              {/* Tiang Tumpuan */}
              <polygon points="210,50 195,130 225,130" fill="#475569" />
              <circle cx="210" cy="50" r="7" fill="#0f172a" />
              {/* Lengan Timbangan Setimbang */}
              <line x1="80" y1="50" x2="340" y2="50" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
              {/* Tali Gantung Kiri */}
              <line x1="100" y1="50" x2="80" y2="85" stroke="#94a3b8" strokeWidth="2" />
              <line x1="100" y1="50" x2="120" y2="85" stroke="#94a3b8" strokeWidth="2" />
              <path d="M70,85 Q100,105 130,85" stroke="#475569" strokeWidth="3" fill="#cbd5e1" />
              {/* Karung Gabah di Piring Kiri */}
              <rect x="80" y="55" width="40" height="30" rx="4" fill="#d97706" />
              <text x="100" y="75" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Gabah</text>

              {/* Tali Gantung Kanan */}
              <line x1="320" y1="50" x2="300" y2="85" stroke="#94a3b8" strokeWidth="2" />
              <line x1="320" y1="50" x2="340" y2="85" stroke="#94a3b8" strokeWidth="2" />
              <path d="M290,85 Q320,105 350,85" stroke="#475569" strokeWidth="3" fill="#cbd5e1" />
              {/* Anak Timbangan Logam di Piring Kanan */}
              <rect x="305" y="65" width="30" height="20" rx="2" fill="#475569" />
              <circle cx="320" cy="62" r="3" fill="#475569" />
              <text x="320" y="79" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Beban</text>

              {/* Indikator Jarum Seimbang */}
              <line x1="210" y1="50" x2="210" y2="25" stroke="#dc2626" strokeWidth="2.5" />
              <circle cx="210" cy="25" r="3" fill="#dc2626" />
              <text x="210" y="18" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">Posisi Seimbang (=)</text>
            </svg>
            <p className="text-[11px] text-amber-900 text-center italic">
              * Hubungan neraca setimbang mencerminkan prinsip kalimat terbuka yang dihubungkan dengan relasi kesetaraan.
            </p>
          </div>
        )}

        {/* SOAL 2: Perahu Kelotok Penyeberangan Sungai Barito */}
        {qId === 2 && (
          <div className="w-full max-w-lg bg-sky-50/70 rounded-xl p-4 border border-sky-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-sky-950">
              <span className="flex items-center gap-1.5"><Ship className="w-4 h-4 text-sky-600" /> Dermaga Feri Kelotok Sungai Barito</span>
              <span className="text-[10px] bg-sky-200 text-sky-950 px-2 py-0.5 rounded font-bold">Standard Keselamatan DISHUB</span>
            </div>
            <svg viewBox="0 0 420 150" className="w-full h-34">
              {/* Gelombang Sungai Barito */}
              <path d="M0,110 C60,100 90,125 150,115 C210,105 240,125 300,115 C360,105 390,125 420,115 L420,150 L0,150 Z" fill="#bae6fd" />
              <path d="M0,120 C50,112 100,130 170,122 C240,114 300,130 370,122 L420,128 L420,150 L0,150 Z" fill="#7dd3fc" />
              {/* Badan Perahu Kelotok Kayu Ulin */}
              <path d="M70,95 L110,120 L310,120 L350,95 L330,85 L80,85 Z" fill="#92400e" stroke="#78350f" strokeWidth="2" />
              <rect x="140" y="65" width="140" height="22" rx="3" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              <text x="210" y="80" textAnchor="middle" fill="#854d0e" fontSize="10" fontWeight="bold">KELOTOK PENUMPANG</text>
              {/* Rambu Plang Batas Muatan */}
              <rect x="30" y="20" width="100" height="45" rx="5" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
              <text x="80" y="38" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">BATAS MUATAN</text>
              <text x="80" y="54" textAnchor="middle" fill="#1e293b" fontSize="9">Regulasi PtLSV</text>
              <line x1="80" y1="65" x2="80" y2="120" stroke="#64748b" strokeWidth="3" />
            </svg>
            <p className="text-[11px] text-sky-900 text-center">
              Penerapan batas regulasi kapasitas kapal sungai tidak boleh dilanggar demi keselamatan pelayaran.
            </p>
          </div>
        )}

        {/* SOAL 3: Distribusi Jeruk Siam Manis Wanaraya */}
        {qId === 3 && (
          <div className="w-full max-w-lg bg-orange-50/70 rounded-xl p-4 border border-orange-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-orange-950">
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-orange-600" /> Armada Angkut Jeruk Siam Wanaraya</span>
              <span className="text-[10px] bg-orange-200 text-orange-950 px-2 py-0.5 rounded">Pasar Sentra Antasari</span>
            </div>
            <svg viewBox="0 0 420 150" className="w-full h-34">
              {/* Bak Truk / Pick-up */}
              <rect x="40" y="50" width="230" height="70" rx="4" fill="#fed7aa" stroke="#f97316" strokeWidth="2" />
              {/* 4 Kotak Kayu Berisi Jeruk */}
              <rect x="55" y="70" width="45" height="42" rx="3" fill="#ea580c" />
              <text x="77" y="95" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Kotak 1</text>
              <rect x="105" y="70" width="45" height="42" rx="3" fill="#ea580c" />
              <text x="127" y="95" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Kotak 2</text>
              <rect x="155" y="70" width="45" height="42" rx="3" fill="#ea580c" />
              <text x="177" y="95" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Kotak 3</text>
              <rect x="205" y="70" width="45" height="42" rx="3" fill="#ea580c" />
              <text x="227" y="95" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Kotak 4</text>
              {/* Keranjang Kecil Sisa 15 kg */}
              <circle cx="310" cy="95" r="24" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
              <text x="310" y="94" textAnchor="middle" fill="#713f12" fontSize="9" fontWeight="bold">Keranjang</text>
              <text x="310" y="106" textAnchor="middle" fill="#b45309" fontSize="11" fontWeight="bold">15 kg</text>
              {/* Timbangan Total */}
              <rect x="350" y="45" width="60" height="65" rx="6" fill="#1e293b" />
              <text x="380" y="68" textAnchor="middle" fill="#94a3b8" fontSize="9">TOTAL</text>
              <text x="380" y="90" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">135 kg</text>
              <line x1="30" y1="130" x2="410" y2="130" stroke="#cbd5e1" strokeWidth="3" />
            </svg>
            <p className="text-[11px] text-orange-950 text-center font-medium">
              4 Kotak Jeruk identik (masing-masing seberat x kg) ditambah 1 keranjang berisi 15 kg menghasilkan berat total 135 kg.
            </p>
          </div>
        )}

        {/* SOAL 4: Koperasi Tani Sawit Wanaraya */}
        {qId === 4 && (
          <div className="w-full max-w-lg bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
              <span className="flex items-center gap-1.5"><Sprout className="w-4 h-4 text-emerald-600" /> Kebun Pembibitan Sawit Koperasi</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded font-bold">Varietas Bersertifikat</span>
            </div>
            <svg viewBox="0 0 420 130" className="w-full h-30">
              {/* Polybag Bibit Sawit */}
              {[60, 130, 200, 270, 340].map((cx, idx) => (
                <g key={idx}>
                  <rect x={cx - 20} y="80" width="40" height="35" rx="3" fill="#1e293b" />
                  <path d={`M${cx},80 Q${cx - 15},50 ${cx - 25},35 Q${cx - 10},45 ${cx},80`} fill="#16a34a" />
                  <path d={`M${cx},80 Q${cx + 15},50 ${cx + 25},35 Q${cx + 10},45 ${cx},80`} fill="#15803d" />
                  <path d={`M${cx},80 Q${cx},40 ${cx},25 Q${cx + 5},45 ${cx},80`} fill="#22c55e" />
                </g>
              ))}
              <line x1="20" y1="115" x2="400" y2="115" stroke="#94a3b8" strokeWidth="2" />
            </svg>
            <p className="text-[11px] text-emerald-900 text-center">
              Distribusi paket bibit sawit kelompok tani dikelola dengan sistem pencatatan aljabar kesetaraan operasional.
            </p>
          </div>
        )}

        {/* SOAL 5: Kunjungan Wisata Budaya Pasar Terapung Lok Baintan */}
        {qId === 5 && (
          <div className="w-full max-w-lg bg-teal-50/70 rounded-xl p-4 border border-teal-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-teal-950">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-teal-600" /> Rute Wisata Budaya Barito</span>
              <span className="text-[10px] bg-teal-200 text-teal-950 px-2 py-0.5 rounded font-bold">OSIS SMPN 1 Wanaraya</span>
            </div>
            <svg viewBox="0 0 420 120" className="w-full h-28">
              {/* Jalur Dermaga */}
              <circle cx="80" cy="60" r="16" fill="#0284c7" />
              <text x="80" y="64" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Dermaga</text>
              <line x1="96" y1="60" x2="310" y2="60" stroke="#0284c7" strokeWidth="3" strokeDasharray="5,5" />
              <polygon points="310,55 325,60 310,65" fill="#0284c7" />
              <circle cx="340" cy="60" r="16" fill="#0d9488" />
              <text x="340" y="64" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Terapung</text>
              <rect x="150" y="25" width="120" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" />
              <text x="210" y="41" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="bold">Sewa t Jam Kelotok</text>
            </svg>
            <p className="text-[11px] text-teal-950 text-center">
              Total anggaran OSIS dibatasi maksimal Rp260.000 untuk biaya sandar tetap dan sewa jam kelotok.
            </p>
          </div>
        )}

        {/* SOAL 6: Tangki Air Bersih Sekolah */}
        {qId === 6 && (
          <div className="w-full max-w-lg bg-blue-50/70 rounded-xl p-4 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-950">
              <span className="flex items-center gap-1.5"><Droplet className="w-4 h-4 text-blue-600" /> Instalasi Tandon Air SMPN 1 Wanaraya</span>
              <span className="text-[10px] bg-blue-200 text-blue-950 px-2 py-0.5 rounded font-bold">Katup Pompa Digital</span>
            </div>
            <svg viewBox="0 0 420 130" className="w-full h-30">
              <rect x="60" y="20" width="80" height="90" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
              <path d="M60,65 Q100,55 140,65 L140,110 L60,110 Z" fill="#38bdf8" />
              <text x="100" y="85" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Level Air</text>
              {/* Pipa & Katup Pompa */}
              <line x1="140" y1="80" x2="260" y2="80" stroke="#64748b" strokeWidth="8" />
              <circle cx="260" cy="80" r="14" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
              <text x="260" y="84" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Katup</text>
              {/* Indikator Level y */}
              <rect x="300" y="35" width="90" height="60" rx="6" fill="#1e293b" />
              <text x="345" y="58" textAnchor="middle" fill="#94a3b8" fontSize="9">BUKAAN KATUP</text>
              <text x="345" y="78" textAnchor="middle" fill="#38bdf8" fontSize="14" fontWeight="bold">Level y</text>
            </svg>
            <p className="text-[11px] text-blue-900 text-center">
              Debit aliran air diatur oleh rumus batas operasional pompa otomatis sekolah.
            </p>
          </div>
        )}

        {/* SOAL 7: Anatomi Garis Bilangan Konsep TKA */}
        {qId === 7 && (
          <div className="w-full max-w-lg bg-indigo-50/70 rounded-xl p-4 border border-indigo-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-950">
              <span className="flex items-center gap-1.5"><Compass className="w-4 h-4 text-indigo-600" /> Konvensi Standar Grafik Garis Bilangan TKA</span>
              <span className="text-[10px] bg-indigo-200 text-indigo-950 px-2 py-0.5 rounded font-bold">Fase D Aljabar</span>
            </div>
            <svg viewBox="0 0 420 120" className="w-full h-28">
              {/* Bulatan Kosong vs Bulatan Penuh */}
              <g transform="translate(60, 20)">
                <circle cx="30" cy="25" r="7" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
                <text x="45" y="29" fill="#1e293b" fontSize="11" fontWeight="bold">Bulatan Kosong: tanda &lt; atau &gt;</text>
              </g>
              <g transform="translate(60, 60)">
                <circle cx="30" cy="25" r="7" fill="#2563eb" stroke="#2563eb" strokeWidth="3" />
                <text x="45" y="29" fill="#1e293b" fontSize="11" fontWeight="bold">Bulatan Pejal: tanda ≤ atau ≥</text>
              </g>
            </svg>
            <p className="text-[11px] text-indigo-900 text-center italic">
              * Perhatikan jenis tanda ketidaksamaan untuk menentukan jenis bulatan dan arah arsiran himpunan penyelesaian.
            </p>
          </div>
        )}

        {/* SOAL 8: Denah Pemagaran Kebun Sawit Wanaraya */}
        {qId === 8 && (
          <div className="w-full max-w-lg bg-lime-50/70 rounded-xl p-4 border border-lime-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-lime-950">
              <span className="flex items-center gap-1.5"><Trees className="w-4 h-4 text-lime-700" /> Sketsa Denah Petak Kebun Sawit</span>
              <span className="text-[10px] bg-lime-200 text-lime-950 px-2 py-0.5 rounded font-bold">Total Keliling Pagar = 86 m</span>
            </div>
            <svg viewBox="0 0 420 140" className="w-full h-32">
              {/* Persegi Panjang Kebun */}
              <rect x="70" y="30" width="280" height="75" rx="4" fill="#d9f99d" stroke="#65a30d" strokeWidth="3" strokeDasharray="6,4" />
              {/* Label Panjang (Atas & Bawah) */}
              <text x="210" y="22" textAnchor="middle" fill="#3f6212" fontSize="12" fontWeight="bold">Panjang: (3x + 4) meter</text>
              <text x="210" y="122" textAnchor="middle" fill="#3f6212" fontSize="12" fontWeight="bold">Panjang: (3x + 4) meter</text>
              {/* Label Lebar (Kiri & Kanan) */}
              <text x="35" y="72" textAnchor="middle" fill="#3f6212" fontSize="11" fontWeight="bold" transform="rotate(-90 35,72)">Lebar: (2x - 1) m</text>
              <text x="385" y="72" textAnchor="middle" fill="#3f6212" fontSize="11" fontWeight="bold" transform="rotate(90 385,72)">Lebar: (2x - 1) m</text>
            </svg>
            <p className="text-[11px] text-lime-950 text-center">
              Seluruh batas keliling kebun akan dipasangi pagar kawat pelindung sepanjang total 86 meter.
            </p>
          </div>
        )}

        {/* SOAL 9: Kesetaraan Bentuk Pecahan */}
        {qId === 9 && (
          <div className="w-full max-w-lg bg-amber-50/70 rounded-xl p-4 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950">
              <span className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-amber-600" /> Prinsip KPK pada PLSV Koefisien Pecahan</span>
              <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-bold">Sifat Kesetaraan Aljabar</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200 text-center space-y-1">
              <p className="font-mono text-sm font-bold text-slate-800">
                1/3 (2x - 1) = 1/4 (x + 3)
              </p>
              <p className="text-[11px] text-slate-500">
                Langkah eliminasi penyebut: Mengalikan kedua ruas dengan KPK(3, 4) = 12
              </p>
            </div>
          </div>
        )}

        {/* SOAL 10: Batas Muatan Jembatan Ulin Wanaraya */}
        {qId === 10 && (
          <div className="w-full max-w-lg bg-stone-50 rounded-xl p-4 border border-stone-300 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-900">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-stone-700" /> Jembatan Kayu Ulin Wanaraya</span>
              <span className="text-[10px] bg-red-150 bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold border border-rose-300">Rambu Beban: Maks 550 kg</span>
            </div>
            <svg viewBox="0 0 420 130" className="w-full h-30">
              {/* Struktur Jembatan Ulin */}
              <rect x="40" y="85" width="340" height="14" fill="#78350f" />
              {[60, 140, 220, 300, 360].map((px, i) => (
                <rect key={i} x={px} y="99" width="12" height="30" fill="#451a03" />
              ))}
              {/* Motor Roda Tiga Petani */}
              <rect x="180" y="60" width="70" height="25" rx="3" fill="#2563eb" />
              <circle cx="195" cy="85" r="9" fill="#0f172a" />
              <circle cx="235" cy="85" r="9" fill="#0f172a" />
              <text x="215" y="76" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Motor: 220 kg</text>
              {/* Karung Pupuk */}
              <rect x="255" y="55" width="35" height="30" rx="3" fill="#d97706" />
              <text x="272" y="73" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">@25kg</text>
              {/* Plang Rambu */}
              <circle cx="90" cy="45" r="20" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
              <text x="90" y="49" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">≤550kg</text>
              <line x1="90" y1="65" x2="90" y2="85" stroke="#475569" strokeWidth="3" />
            </svg>
            <p className="text-[11px] text-stone-700 text-center">
              Pengemudi dan kendaraan berbobot 220 kg membawa karung pupuk 25 kg melintasi jembatan.
            </p>
          </div>
        )}

        {/* SOAL 11: Panen Semangka Lahan Gambut Sidomulyo Wanaraya */}
        {qId === 11 && (
          <div className="w-full max-w-lg bg-green-50/70 rounded-xl p-4 border border-green-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-green-950">
              <span>🍉 Panen Semangka Manis Lahan Gambut</span>
              <span className="text-[10px] bg-green-200 text-green-950 px-2 py-0.5 rounded font-bold">Desa Sidomulyo, Wanaraya</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-white border border-green-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Aris</span>
                <span className="font-mono text-sm font-bold text-green-700">x buah</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-green-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Bagas</span>
                <span className="font-mono text-sm font-bold text-green-700">(x + 15)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-green-200">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Candra</span>
                <span className="font-mono text-sm font-bold text-green-700">2x buah</span>
              </div>
            </div>
            <div className="p-2 bg-green-100/70 rounded-lg text-center text-xs font-bold text-green-950">
              Total Seluruh Hasil Panen Bersama = 175 Buah
            </div>
          </div>
        )}

        {/* SOAL 12: Pertidaksamaan Pecahan Linier */}
        {qId === 12 && (
          <div className="w-full max-w-lg bg-purple-50/70 rounded-xl p-4 border border-purple-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-purple-950">
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-purple-600" /> Analisis Operasi Aljabar Pecahan</span>
              <span className="text-[10px] bg-purple-200 text-purple-950 px-2 py-0.5 rounded font-bold">PtLSV Kelas 8</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-purple-200 text-center space-y-1">
              <p className="font-mono text-sm font-bold text-purple-900">
                1/2 (x - 4) &lt; 1/3 (x + 2)
              </p>
              <p className="text-[11px] text-slate-500">
                Himpunan semesta: Bilangan cacah kelipatan 5
              </p>
            </div>
          </div>
        )}

        {/* SOAL 13: UMKM Kain Sasirangan Kalsel */}
        {qId === 13 && (
          <div className="w-full max-w-lg bg-pink-50/70 rounded-xl p-4 border border-pink-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-pink-950">
              <span>🎨 Produksi Kain Sasirangan Khas Kalsel</span>
              <span className="text-[10px] bg-pink-200 text-pink-950 px-2 py-0.5 rounded font-bold">Analisis Titik Impas (BEP)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-pink-200">
                <span className="text-[10px] text-slate-500 block font-semibold">Biaya Tetap Sewa/Alat:</span>
                <span className="font-bold text-slate-800">Rp3.600.000 / bln</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-pink-200">
                <span className="text-[10px] text-slate-500 block font-semibold">Harga Jual per Lembar:</span>
                <span className="font-bold text-pink-700">Rp125.000 / lembar</span>
              </div>
            </div>
            <p className="text-[11px] text-pink-900 text-center">
              Biaya variabel bahan baku mori dan pewarna alami: Rp65.000 per lembar (x).
            </p>
          </div>
        )}

        {/* SOAL 14: Kualitas Air Kolam Ikan Patin Wanaraya */}
        {qId === 14 && (
          <div className="w-full max-w-lg bg-cyan-50/70 rounded-xl p-4 border border-cyan-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-950">
              <span className="flex items-center gap-1.5"><Fish className="w-4 h-4 text-cyan-600" /> Kolam Patin Pasang Surut Barito Kuala</span>
              <span className="text-[10px] bg-cyan-200 text-cyan-950 px-2 py-0.5 rounded font-bold">Monitor Derajat Keasaman (pH)</span>
            </div>
            <svg viewBox="0 0 420 120" className="w-full h-28">
              {/* Skala pH Air */}
              <line x1="40" y1="60" x2="380" y2="60" stroke="#cbd5e1" strokeWidth="6" strokeLinecap="round" />
              {/* Zona Aman Kolam */}
              <rect x="150" y="54" width="120" height="12" rx="3" fill="#22c55e" opacity="0.6" />
              {/* Titik Target 7.2 */}
              <circle cx="210" cy="60" r="7" fill="#0284c7" />
              <text x="210" y="42" textAnchor="middle" fill="#0369a1" fontSize="11" fontWeight="bold">Target pH: 7,2</text>
              <text x="210" y="88" textAnchor="middle" fill="#475569" fontSize="10">Toleransi: |p - 7,2| ≤ 0,8</text>
            </svg>
            <p className="text-[11px] text-cyan-900 text-center">
              Kondisi tanah rawa sulfat masam menuntut monitoring nilai pH air kolam secara ketat.
            </p>
          </div>
        )}

        {/* SOAL 15: Neraca Kesetaraan Laboratorium IPA SMPN 1 Wanaraya */}
        {qId === 15 && (
          <div className="w-full max-w-lg bg-slate-50 rounded-xl p-4 border border-slate-300 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span className="flex items-center gap-1.5"><Scale className="w-4 h-4 text-blue-600" /> Percobaan Neraca Dua Lengan Lab IPA</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Posisi Seimbang Mendatar</span>
            </div>
            <svg viewBox="0 0 420 140" className="w-full h-32">
              <polygon points="210,40 195,120 225,120" fill="#475569" />
              <line x1="60" y1="40" x2="360" y2="40" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
              {/* Piring Kiri (3 Balok m + 20g) */}
              <line x1="80" y1="40" x2="65" y2="75" stroke="#94a3b8" strokeWidth="2" />
              <line x1="80" y1="40" x2="95" y2="75" stroke="#94a3b8" strokeWidth="2" />
              <path d="M55,75 Q80,92 105,75" stroke="#334155" strokeWidth="3" fill="#cbd5e1" />
              <rect x="62" y="52" width="12" height="20" fill="#2563eb" rx="1" />
              <rect x="76" y="52" width="12" height="20" fill="#2563eb" rx="1" />
              <rect x="90" y="52" width="12" height="20" fill="#2563eb" rx="1" />
              <circle cx="80" cy="48" r="4" fill="#64748b" />
              <text x="80" y="105" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">3 Balok m + 20 g</text>

              {/* Piring Kanan (1 Balok m + 80g) */}
              <line x1="340" y1="40" x2="325" y2="75" stroke="#94a3b8" strokeWidth="2" />
              <line x1="340" y1="40" x2="355" y2="75" stroke="#94a3b8" strokeWidth="2" />
              <path d="M315,75 Q340,92 365,75" stroke="#334155" strokeWidth="3" fill="#cbd5e1" />
              <rect x="325" y="52" width="14" height="20" fill="#2563eb" rx="1" />
              <rect x="343" y="56" width="18" height="16" fill="#64748b" rx="1" />
              <text x="340" y="105" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">1 Balok m + 80 g</text>
            </svg>
            <p className="text-[11px] text-slate-600 text-center">
              Kedua lengan neraca berada dalam posisi kesetaraan mendatar (3m + 20 = m + 80).
            </p>
          </div>
        )}

        {/* SOAL 16: Seleksi Beasiswa Bakat Barito Kuala */}
        {qId === 16 && (
          <div className="w-full max-w-lg bg-emerald-50/70 rounded-xl p-4 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
              <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-emerald-600" /> Syarat Beasiswa Dinas Pendidikan Barito Kuala</span>
              <span className="text-[10px] bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded font-bold">Rata-rata 4 Mapel ≥ 85</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 bg-white rounded-lg border border-emerald-200">
                <span className="text-[10px] text-slate-500 block">Matematika</span>
                <span className="font-bold text-emerald-800">88</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-emerald-200">
                <span className="text-[10px] text-slate-500 block">IPA</span>
                <span className="font-bold text-emerald-800">82</span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-emerald-200">
                <span className="text-[10px] text-slate-500 block">B. Indonesia</span>
                <span className="font-bold text-emerald-800">86</span>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg border border-yellow-300">
                <span className="text-[10px] text-slate-600 block">B. Inggris</span>
                <span className="font-bold text-amber-900 font-mono">n (?)</span>
              </div>
            </div>
            <p className="text-[11px] text-emerald-900 text-center">
              Nilai ujian Bahasa Inggris dimisalkan variabel n untuk mencapai rata-rata minimal 85.
            </p>
          </div>
        )}

        {/* SOAL 17: Logistik Wanaraya - Banjarmasin */}
        {qId === 17 && (
          <div className="w-full max-w-lg bg-blue-50/70 rounded-xl p-4 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-950">
              <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-blue-600" /> Perbandingan Tarif Ekspedisi Jeruk Wanaraya</span>
              <span className="text-[10px] bg-blue-200 text-blue-950 px-2 py-0.5 rounded font-bold">Rute Wanaraya - Banjarmasin</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-blue-200">
                <span className="font-bold text-blue-800 block">Kurir Darat Kilat:</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Dasar: Rp20.000 + Rp6.000 / kg</p>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-blue-200">
                <span className="font-bold text-indigo-800 block">Kelotok Sungai Cepat:</span>
                <p className="text-slate-600 text-[11px] mt-0.5">Dasar: Rp35.000 + Rp3.500 / kg</p>
              </div>
            </div>
            <p className="text-[11px] text-blue-900 text-center font-medium">
              Analisis titik impas berat beban w (kg) untuk menentukan opsi yang paling ekonomis.
            </p>
          </div>
        )}

        {/* SOAL 18: Inkubator Sensor Suhu Gudang Benih Wanaraya */}
        {qId === 18 && (
          <div className="w-full max-w-lg bg-amber-50/70 rounded-xl p-4 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-amber-950">
              <span className="flex items-center gap-1.5"><Thermometer className="w-4 h-4 text-amber-600" /> Sensor Suhu Inkubator Gudang Benih</span>
              <span className="text-[10px] bg-amber-200 text-amber-950 px-2 py-0.5 rounded font-bold">Wanaraya Digital Farm</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl text-center text-white space-y-1">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest block">Formula Kendali Tegangan Inverter:</span>
              <span className="font-mono text-base font-extrabold text-yellow-300">-5 ≤ 2x + 3 &lt; 11</span>
            </div>
            <p className="text-[11px] text-amber-900 text-center">
              Pertidaksamaan majemuk menentukan ambang kalibrasi mikrokontroler sensor ruangan.
            </p>
          </div>
        )}

        {/* SOAL 19: Evaluasi Aturan Perkalian Negatif PtLSV */}
        {qId === 19 && (
          <div className="w-full max-w-lg bg-rose-50/70 rounded-xl p-4 border border-rose-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-rose-950">
              <span>⚠️ Telaah Kesalahan Konsep Operasi Pertidaksamaan</span>
              <span className="text-[10px] bg-rose-200 text-rose-950 px-2 py-0.5 rounded font-bold">Evaluasi Mandiri</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-rose-200 text-center space-y-1">
              <p className="font-mono text-sm font-bold text-rose-900">-4(x - 1) ≥ 16</p>
              <p className="text-[11px] text-slate-600">
                Perhatikan aturan khusus pembagian dengan bilangan negatif (-4).
              </p>
            </div>
          </div>
        )}

        {/* SOAL 20: Tangki Silinder Air Bersih (Koneksi Bangun Ruang Sisi Lengkung) */}
        {qId === 20 && (
          <div className="w-full max-w-lg bg-blue-50/70 rounded-xl p-4 border border-blue-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-blue-950">
              <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-blue-600" /> Tangki Air Silinder SMPN 1 Wanaraya</span>
              <span className="text-[10px] bg-blue-200 text-blue-950 px-2 py-0.5 rounded font-bold">Bangun Ruang Sisi Lengkung</span>
            </div>
            <svg viewBox="0 0 420 140" className="w-full h-32">
              {/* Tabung Silinder 3D */}
              <ellipse cx="210" cy="35" rx="70" ry="18" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
              <rect x="140" y="35" width="140" height="70" fill="#e0f2fe" />
              <line x1="140" y1="35" x2="140" y2="105" stroke="#0284c7" strokeWidth="2.5" />
              <line x1="280" y1="35" x2="280" y2="105" stroke="#0284c7" strokeWidth="2.5" />
              <ellipse cx="210" cy="105" rx="70" ry="18" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />

              {/* Jari-jari r */}
              <line x1="210" y1="35" x2="280" y2="35" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
              <text x="245" y="28" textAnchor="middle" fill="#b91c1c" fontSize="10" fontWeight="bold">r = 70 cm</text>

              {/* Tinggi t */}
              <line x1="120" y1="35" x2="120" y2="105" stroke="#2563eb" strokeWidth="2" />
              <polygon points="120,35 116,42 124,42" fill="#2563eb" />
              <polygon points="120,105 116,98 124,98" fill="#2563eb" />
              <text x="105" y="73" textAnchor="middle" fill="#1d4ed8" fontSize="11" fontWeight="bold">t (?)</text>

              {/* Label Kapasitas Target */}
              <rect x="300" y="50" width="100" height="42" rx="4" fill="#ffffff" stroke="#cbd5e1" />
              <text x="350" y="68" textAnchor="middle" fill="#64748b" fontSize="9">KAPASITAS TARGET</text>
              <text x="350" y="84" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="bold">308.000 cm³</text>
            </svg>
            <p className="text-[11px] text-blue-900 text-center font-medium">
              Dimensi tangki air berbentuk tabung dengan luas alas 15.400 cm² dan tinggi t sebagai variabel PLSV.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
