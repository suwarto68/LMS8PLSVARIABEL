import { Question } from '../types';

export const QUESTIONS_DATA: Question[] = [
  // =================== SOAL 1 (PG - Pemahaman 10%) ===================
  {
    id: 1,
    tpCode: '3.1',
    cognitiveLevel: 'Pemahaman',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan deskripsi ciri-ciri bentuk aljabar dan contoh persamaan kontekstual seputar penimbangan hasil panen padi sawah di Wanaraya Barito Kuala',
      audience: 'Murid kelas 8',
      behavior: 'Dapat mengidentifikasi bentuk Persamaan Linear Satu Variabel (PLSV) dengan tepat'
    },
    contextRegion: 'Kecamatan Wanaraya, Kab. Barito Kuala (Lahan Pasang Surut)',
    stimulus: {
      title: 'Penimbangan Gabah Padi Pasang Surut di Desa Kolam Kanan, Wanaraya',
      text: 'Petani di Kecamatan Wanaraya, Kabupaten Barito Kuala memanfaatkan lahan pasang surut untuk membudidayakan padi varietas unggul Siam Mayang. Pak Danu menimbang beberapa karung gabah kering menggunakan timbangan duduk tradisional. Dalam matematika, hubungan berat karung dan anak timbangan yang seimbang dapat dinyatakan ke dalam berbagai bentuk kalimat matematika aljabar. Suatu kalimat terbuka yang dihubungkan dengan tanda sama dengan (=) dan hanya memiliki satu variabel berpangkat satu disebut Persamaan Linear Satu Variabel (PLSV).'
    },
    prompt: 'Berdasarkan konsep aljabar, manakah di antara bentuk kalimat matematika berikut yang merupakan Persamaan Linear Satu Variabel (PLSV)?',
    pgOptions: [
      { key: 'A', text: '3x² - 5 = 22' },
      { key: 'B', text: '4x + 7y = 45' },
      { key: 'C', text: '5p - 18 = 32' },
      { key: 'D', text: '2m + 9 < 35' }
    ],
    pgCorrectAnswer: 'C',
    explanation: 'Bentuk 5p - 18 = 32 merupakan Persamaan Linear Satu Variabel (PLSV) karena memiliki satu variabel (p), variabel tersebut berpangkat satu, dan menggunakan relasi sama dengan (=). Pilihan A merupakan persamaan kuadrat (derajat 2), pilihan B memiliki dua variabel (x dan y), dan pilihan D merupakan pertidaksamaan (<).'
  },

  // =================== SOAL 2 (PG - Pemahaman 10%) ===================
  {
    id: 2,
    tpCode: '3.4',
    cognitiveLevel: 'Pemahaman',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan narasi aturan batas muatan perahu kelotok di Sungai Barito dan sifat perkalian bilangan negatif pada pertidaksamaan',
      audience: 'Murid kelas 8',
      behavior: 'Dapat mengidentifikasi sifat ketidaksamaan ketika kedua ruas dikalikan atau dibagi bilangan negatif'
    },
    contextRegion: 'Aliran Sungai Barito, Kalimantan Selatan',
    stimulus: {
      title: 'Regulasi Muatan Perahu Kelotok Penyeberangan Sungai Barito',
      text: 'Perahu kelotok merupakan moda transportasi sungai yang sangat penting bagi warga Barito Kuala untuk menyeberang menuju Banjarmasin. Dinas Perhubungan menetapkan batas kapasitas angkut demi keselamatan pelayaran. Dalam aljabar, batas kapasitas dimodelkan dengan Pertidaksamaan Linear Satu Variabel (PtLSV). Ketika menyelesaikan PtLSV, sifat-sifat ketidaksamaan harus diperhatikan secara saksama, terutama ketika melakukan operasi perkalian atau pembagian dengan bilangan negatif.'
    },
    prompt: 'Jika kedua ruas dari suatu pertidaksamaan linear -3x < 18 dikalikan atau dibagi dengan bilangan negatif (-3), maka bentuk ekuivalen yang benar adalah ....',
    pgOptions: [
      { key: 'A', text: 'x < -6' },
      { key: 'B', text: 'x > -6' },
      { key: 'C', text: 'x ≤ -6' },
      { key: 'D', text: 'x > 6' }
    ],
    pgCorrectAnswer: 'B',
    explanation: 'Sifat dasar pertidaksamaan menyatakan bahwa jika kedua ruas pertidaksamaan dikalikan atau dibagi dengan bilangan negatif yang sama, maka tanda ketidaksamaan harus dibalik. Karena -3x < 18 dibagi dengan -3, maka tanda "<" berbalik menjadi ">", sehingga menghasilkan x > -6.'
  },

  // =================== SOAL 3 (PG - Aplikasi 50%) ===================
  {
    id: 3,
    tpCode: '3.1',
    cognitiveLevel: 'Aplikasi',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan studi kasus pengiriman buah jeruk siam Wanaraya dalam kardus dan karung ke pasar Banjarmasin',
      audience: 'Murid kelas 8',
      behavior: 'Dapat memodelkan situasi kontekstual ke dalam bentuk Persamaan Linear Satu Variabel (PLSV)'
    },
    contextRegion: 'Sentra Jeruk Siam Wanaraya, Barito Kuala',
    stimulus: {
      title: 'Distribusi Jeruk Siam Manis Khas Wanaraya',
      text: 'Kecamatan Wanaraya terkenal sebagai salah satu sentra penghasil buah jeruk siam manis di Kalimantan Selatan. Seorang pedagang buah mengemas jeruk ke dalam 4 kotak kayu berukuran sama dan masih menyisakan 15 kg jeruk di dalam keranjang kecil. Berat total keseluruhan jeruk yang siap diangkut ke Pasar Sentra Antasari Banjarmasin adalah 135 kg. Misalkan x menyatakan berat jeruk di setiap kotak kayu (dalam kg).'
    },
    prompt: 'Model persamaan linear satu variabel (PLSV) yang tepat untuk menyatakan permasalahan berat jeruk tersebut adalah ....',
    pgOptions: [
      { key: 'A', text: '4x - 15 = 135' },
      { key: 'B', text: '4x + 15 = 135' },
      { key: 'C', text: 'x + 4(15) = 135' },
      { key: 'D', text: '15x + 4 = 135' }
    ],
    pgCorrectAnswer: 'B',
    explanation: 'Ada 4 kotak kayu yang masing-masing bermuatan x kg, sehingga total jeruk di kotak adalah 4x. Ditambah sisa jeruk 15 kg di keranjang kecil, menghasilkan berat total 135 kg. Maka persamaannya adalah 4x + 15 = 135.'
  },

  // =================== SOAL 4 (PG - Aplikasi 50%) ===================
  {
    id: 4,
    tpCode: '3.2',
    cognitiveLevel: 'Aplikasi',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan persamaan linear satu variabel dengan koefisien pecahan terkait belanja bibit kelapa sawit',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menentukan nilai variabel x yang memenuhi persamaan tersebut dengan sifat kesetaraan'
    },
    contextRegion: 'Koperasi Tani Sawit Makmur Wanaraya',
    stimulus: {
      title: 'Pengadaan Bibit Sawit Bersertifikat Koperasi Tani',
      text: 'Kelompok Tani Sawit di Wanaraya menghitung kebutuhan pupuk dan bibit sawit unggul. Bendahara kelompok tani menyusun perimbangan biaya operasional melalui persamaan aljabar kesetaraan berikut: 2(3x - 4) = 4x + 10, di mana x melambangkan paket bibit siap tanam.'
    },
    prompt: 'Nilai x yang memenuhi persamaan linear 2(3x - 4) = 4x + 10 adalah ....',
    pgOptions: [
      { key: 'A', text: 'x = 7' },
      { key: 'B', text: 'x = 8' },
      { key: 'C', text: 'x = 9' },
      { key: 'D', text: 'x = 11' }
    ],
    pgCorrectAnswer: 'C',
    explanation: 'Langkah penyelesaian:\n2(3x - 4) = 4x + 10\n6x - 8 = 4x + 10\n6x - 4x = 10 + 8\n2x = 18\nx = 18 / 2 = 9.'
  },

  // =================== SOAL 5 (PG - Aplikasi 50%) ===================
  {
    id: 5,
    tpCode: '3.3',
    cognitiveLevel: 'Aplikasi',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan tabel tarif parkir dan sewa tenda di Festival Pasar Terapung Lok Baintan',
      audience: 'Murid kelas 8',
      behavior: 'Dapat memodelkan batas anggaran belanja ke dalam pertidaksamaan linear satu variabel'
    },
    contextRegion: 'Festival Budaya Pasar Terapung, Kalsel',
    stimulus: {
      title: 'Anggaran Kunjungan Edukasi Murid SMPN 1 Wanaraya ke Pasar Terapung',
      text: 'Pengurus OSIS SMPN 1 Wanaraya merencanakan kunjungan studi budaya ke Pasar Terapung. Mereka menyewa kelotok wisata dengan biaya tetap sandar dermaga sebesar Rp50.000,00 ditambah biaya sewa per jam sebesar Rp35.000,00. Anggaran maksimal yang disiapkan oleh panitia sekolah tidak boleh melebihi Rp260.000,00. Misalkan t menyatakan lama waktu sewa kelotok dalam jam.',
      tableData: {
        headers: ['Komponen Biaya', 'Tarif Resmi'],
        rows: [
          ['Biaya Sandar & Kebersihan', 'Rp50.000 (Tetap)'],
          ['Tarif Sewa Kelotok per Jam', 'Rp35.000 per jam (t)'],
          ['Maksimal Alokasi Dana OSIS', 'Tidak lebih dari Rp260.000']
        ]
      }
    },
    prompt: 'Model pertidaksamaan linear satu variabel (PtLSV) yang tepat untuk menentukan waktu maksimal t sewa kelotok adalah ....',
    pgOptions: [
      { key: 'A', text: '35.000t + 50.000 ≥ 260.000' },
      { key: 'B', text: '35.000t + 50.000 ≤ 260.000' },
      { key: 'C', text: '50.000t + 35.000 < 260.000' },
      { key: 'D', text: '35.000t - 50.000 ≤ 260.000' }
    ],
    pgCorrectAnswer: 'B',
    explanation: 'Biaya total adalah tarif per jam dikalikan t jam ditambah biaya sandar tetap: 35.000t + 50.000. Karena dana tidak boleh melebihi Rp260.000,00, maka menggunakan lambang "kurang dari atau sama dengan" (≤), sehingga modelnya: 35.000t + 50.000 ≤ 260.000.'
  },

  // =================== SOAL 6 (PG - Aplikasi 50%) ===================
  {
    id: 6,
    tpCode: '3.4',
    cognitiveLevel: 'Aplikasi',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan pertidaksamaan linear satu variabel bertanda kurung terkait kapasitas tangki air hujan di sekolah',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menentukan himpunan penyelesaian pertidaksamaan linear satu variabel untuk bilangan bulat'
    },
    contextRegion: 'SMP Negeri 1 Wanaraya, Barito Kuala',
    stimulus: {
      title: 'Sistem Penampungan Air Bersih Sekolah',
      text: 'SMP Negeri 1 Wanaraya memiliki instalasi bak penampungan air bersih untuk keperluan wudhu dan sanitasi. Pengatur debit pompa air diatur secara otomatis dengan formula teknis: 5(y - 2) - 3y ≥ y + 6, dengan y adalah bilangan bulat positif yang mewakili level bukaan katup pompa.'
    },
    prompt: 'Penyelesaian dari pertidaksamaan 5(y - 2) - 3y ≥ y + 6 adalah ....',
    pgOptions: [
      { key: 'A', text: 'y ≥ 16' },
      { key: 'B', text: 'y ≤ 16' },
      { key: 'C', text: 'y ≥ 4' },
      { key: 'D', text: 'y ≤ -16' }
    ],
    pgCorrectAnswer: 'A',
    explanation: 'Langkah penyelesaian:\n5(y - 2) - 3y ≥ y + 6\n5y - 10 - 3y ≥ y + 6\n2y - 10 ≥ y + 6\n2y - y ≥ 6 + 10\ny ≥ 16.'
  },

  // =================== SOAL 7 (PG - Aplikasi 50%) ===================
  {
    id: 7,
    tpCode: '3.5',
    cognitiveLevel: 'Aplikasi',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan pertidaksamaan linear 3x - 7 > 2 dan representasi garis bilangan',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menentukan representasi grafik garis bilangan yang tepat untuk himpunan penyelesaian'
    },
    contextRegion: 'Laboratorium Matematika SMPN 1 Wanaraya',
    stimulus: {
      title: 'Visualisasi Himpunan Penyelesaian pada Garis Bilangan',
      text: 'Pada materi aljabar Fase D, murid mempelajari bahwa penyelesaian pertidaksamaan linear dapat divisualisasikan pada garis bilangan. Lingkaran kosong (berlubang) digunakan untuk tanda ketidaksamaan murni (< atau >), sedangkan lingkaran penuh (pejal) digunakan untuk tanda pertidaksamaan tidak murni (≤ atau ≥). Arah panah menunjukkan nilai x yang memenuhi.'
    },
    prompt: 'Penyelesaian dari pertidaksamaan 3x - 7 > 2 untuk x bilangan real disajikan pada garis bilangan sebagai ....',
    pgOptions: [
      { key: 'A', text: 'Daerah ke arah kanan mulai dari titik 3 dengan bulatan kosong (berlubang)' },
      { key: 'B', text: 'Daerah ke arah kanan mulai dari titik 3 dengan bulatan penuh (pejal)' },
      { key: 'C', text: 'Daerah ke arah kiri mulai dari titik 3 dengan bulatan kosong (berlubang)' },
      { key: 'D', text: 'Daerah ke arah kanan mulai dari titik -3 dengan bulatan penuh (pejal)' }
    ],
    pgCorrectAnswer: 'A',
    explanation: '3x - 7 > 2 ↔ 3x > 9 ↔ x > 3. Karena tanda ketidaksamaan adalah ">" (lebih dari, tanpa tanda sama dengan), maka batas titik 3 diberi tanda lingkaran berlubang (kosong) dan arsiran panah mengarah ke kanan (bilangan yang lebih besar dari 3).'
  },

  // =================== SOAL 8 (PG - Aplikasi 50%) ===================
  {
    id: 8,
    tpCode: '3.2',
    cognitiveLevel: 'Aplikasi',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan masalah geometri keliling kebun kelapa sawit persegi panjang yang dinyatakan dalam aljabar',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menghitung ukuran panjang kebun sebenarnya menggunakan penyelesaian PLSV'
    },
    contextRegion: 'Kawasan Perkebunan Wanaraya, Barito Kuala',
    stimulus: {
      title: 'Pemagaran Kebun Sawit Plasma',
      text: 'Pak Rahmat memiliki sebidang kebun sawit berbentuk persegi panjang di Wanaraya. Panjang kebun tersebut adalah (3x + 4) meter dan lebarnya adalah (2x - 1) meter. Untuk mencegah gangguan hewan liar, kebun tersebut akan dipagari kawat keliling dengan total panjang pagar keliling tepat 86 meter.'
    },
    prompt: 'Berdasarkan informasi tersebut, panjang sebenarnya dari kebun sawit Pak Rahmat adalah ....',
    pgOptions: [
      { key: 'A', text: '23 meter' },
      { key: 'B', text: '25 meter' },
      { key: 'C', text: '28 meter' },
      { key: 'D', text: '31 meter' }
    ],
    pgCorrectAnswer: 'C',
    explanation: 'Keliling persegi panjang = 2(panjang + lebar)\n2[(3x + 4) + (2x - 1)] = 86\n2(5x + 3) = 86\n10x + 6 = 86\n10x = 80\nx = 8.\nPanjang kebun = 3x + 4 = 3(8) + 4 = 24 + 4 = 28 meter.'
  },

  // =================== SOAL 9 (PG - Aplikasi 50%) ===================
  {
    id: 9,
    tpCode: '3.2',
    cognitiveLevel: 'Aplikasi',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan persamaan linear satu variabel dengan bentuk pecahan aljabar satu per tiga dan satu per empat',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menyelesaikan PLSV pecahan menggunakan sifat perkalian KPK penyebut'
    },
    contextRegion: 'Ujian Matematika Semester Genap',
    stimulus: {
      title: 'Penyelesaian Persamaan Aljabar Koefisien Pecahan',
      text: 'Dalam menyelesaikan persamaan linear satu variabel yang memuat pecahan, langkah yang efektif adalah mengalikan kedua ruas persamaan dengan Kelipatan Persekutuan Terkecil (KPK) dari penyebut-penyebut pecahan tersebut sehingga menjadi persamaan bentuk bulat yang ekuivalen.'
    },
    prompt: 'Penyelesaian dari persamaan 1/3 (2x - 1) = 1/4 (x + 3) adalah ....',
    pgOptions: [
      { key: 'A', text: 'x = 2' },
      { key: 'B', text: 'x = 2,6' },
      { key: 'C', text: 'x = 3' },
      { key: 'D', text: 'x = 3,5' }
    ],
    pgCorrectAnswer: 'B',
    explanation: 'KPK dari 3 dan 4 adalah 12. Kalikan kedua ruas dengan 12:\n12 * [1/3 (2x - 1)] = 12 * [1/4 (x + 3)]\n4(2x - 1) = 3(x + 3)\n8x - 4 = 3x + 9\n8x - 3x = 9 + 4\n5x = 13\nx = 13/5 = 2,6.'
  },

  // =================== SOAL 10 (PG - Aplikasi 50%) ===================
  {
    id: 10,
    tpCode: '3.4',
    cognitiveLevel: 'Aplikasi',
    type: 'pg',
    indicatorCAB: {
      condition: 'Disajikan studi kasus daya angkut jembatan ulin gantung di pedesaan Barito Kuala',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menentukan batas maksimum banyak karung pupuk yang dapat diangkut motor roda tiga'
    },
    contextRegion: 'Jembatan Penghubung Antardesa Wanaraya',
    stimulus: {
      title: 'Beban Maksimum Jembatan Desa Wanaraya',
      text: 'Sebuah jembatan kayu ulin di desa penghubung memiliki batas beban aman tidak lebih dari 550 kg. Seorang petani mengendarai sepeda motor roda tiga dengan berat pengemudi beserta kendaraannya 220 kg. Petani tersebut hendak mengangkut karung pupuk NPK yang masing-masing berbobot 25 kg per karung.'
    },
    prompt: 'Banyak karung pupuk maksimum yang boleh dimuat pada motor roda tiga tersebut sekali jalan agar tidak melebihi batas beban jembatan adalah ....',
    pgOptions: [
      { key: 'A', text: '12 karung' },
      { key: 'B', text: '13 karung' },
      { key: 'C', text: '14 karung' },
      { key: 'D', text: '15 karung' }
    ],
    pgCorrectAnswer: 'B',
    explanation: 'Misalkan k adalah banyak karung pupuk.\n25k + 220 ≤ 550\n25k ≤ 550 - 220\n25k ≤ 330\nk ≤ 330 / 25\nk ≤ 13,2.\nKarena banyak karung harus merupakan bilangan cacah, maka banyak karung maksimum adalah 13 karung.'
  },

  // =================== SOAL 11 (PGK MCMA - Aplikasi 50%) ===================
  {
    id: 11,
    tpCode: '3.2',
    cognitiveLevel: 'Aplikasi',
    type: 'pgk_mcma',
    indicatorCAB: {
      condition: 'Disajikan narasi pembagian hasil panen semangka lahan gambut antara 3 bersaudara di Wanaraya',
      audience: 'Murid kelas 8',
      behavior: 'Dapat mengidentifikasi pernyataan-pernyataan yang bernilai benar terkait pemodelan dan nilai variabel'
    },
    contextRegion: 'Desa Sidomulyo, Wanaraya, Barito Kuala',
    stimulus: {
      title: 'Panen Semangka Manis Lahan Gambut',
      text: 'Tiga pemuda tani di Wanaraya, yaitu Aris, Bagas, dan Candra memanen semangka dari kebun bersama. Aris memanen x buah semangka. Bagas memanen 15 buah lebih banyak dari Aris. Sedangkan Candra memanen 2 kali lipat dari hasil panen Aris. Total seluruh semangka yang dipanen oleh ketiga petani tersebut adalah 175 buah.'
    },
    prompt: 'Berdasarkan informasi tersebut, pilihlah pernyataan-pernyataan berikut yang bernilai BENAR! (Jawaban benar lebih dari satu)',
    mcmaOptions: [
      { id: '11_1', statement: 'Model persamaan aljabar dari total semangka adalah 4x + 15 = 175.', isCorrect: true },
      { id: '11_2', statement: 'Banyak semangka yang dipanen oleh Aris adalah 40 buah.', isCorrect: true },
      { id: '11_3', statement: 'Banyak semangka yang dipanen oleh Bagas adalah 50 buah.', isCorrect: false },
      { id: '11_4', statement: 'Candra memanen semangka sebanyak 80 buah.', isCorrect: true }
    ],
    explanation: 'Hasil panen:\nAris = x\nBagas = x + 15\nCandra = 2x\nTotal = x + (x + 15) + 2x = 4x + 15 = 175. (Pernyataan 1 BENAR)\n4x = 160 → x = 40. Maka Aris = 40 buah. (Pernyataan 2 BENAR)\nBagas = 40 + 15 = 55 buah (Pernyataan 3 SALAH karena tertulis 50).\nCandra = 2(40) = 80 buah. (Pernyataan 4 BENAR).'
  },

  // =================== SOAL 12 (PGK MCMA - Aplikasi 50%) ===================
  {
    id: 12,
    tpCode: '3.4',
    cognitiveLevel: 'Aplikasi',
    type: 'pgk_mcma',
    indicatorCAB: {
      condition: 'Disajikan pertidaksamaan linear satu variabel pecahan 1/2(x - 4) < 1/3(x + 2)',
      audience: 'Murid kelas 8',
      behavior: 'Dapat mengidentifikasi sifat-sifat penyelesaian dan anggota bilangan cacah yang memenuhi'
    },
    contextRegion: 'Pembelajaran Matematika Fase D',
    stimulus: {
      title: 'Analisis Pertidaksamaan Linear Satu Variabel Pecahan',
      text: 'Diberikan pertidaksamaan linear satu variabel berikut:\n1/2 (x - 4) < 1/3 (x + 2)\nMurid diminta menganalisis langkah-langkah penyelesaian serta mengidentifikasi bilangan cacah yang termasuk ke dalam daerah himpunan penyelesaian pertidaksamaan tersebut.'
    },
    prompt: 'Pilihlah pernyataan-pernyataan berikut yang bernilai BENAR! (Jawaban benar lebih dari satu)',
    mcmaOptions: [
      { id: '12_1', statement: 'Mengalikan kedua ruas dengan angka 6 menghasilkan bentuk: 3(x - 4) < 2(x + 2).', isCorrect: true },
      { id: '12_2', statement: 'Penyelesaian akhir dari pertidaksamaan tersebut adalah x < 16.', isCorrect: true },
      { id: '12_3', statement: 'Bilangan x = 16 merupakan salah satu anggota himpunan penyelesaian.', isCorrect: false },
      { id: '12_4', statement: 'Jika x merupakan bilangan cacah kelipatan 5, maka nilai x yang memenuhi adalah {0, 5, 10, 15}.', isCorrect: true }
    ],
    explanation: '1. KPK dari 2 dan 3 adalah 6. Kedua ruas dikalikan 6: 3(x - 4) < 2(x + 2). (BENAR)\n2. 3x - 12 < 2x + 4 → 3x - 2x < 4 + 12 → x < 16. (BENAR)\n3. Karena tandanya "<", maka x = 16 bukan penyelesaian. (SALAH)\n4. Bilangan cacah kelipatan 5 yang kurang dari 16 adalah 0, 5, 10, 15. (BENAR).'
  },

  // =================== SOAL 13 (PGK MCMA - Penalaran HOTS 40%) ===================
  {
    id: 13,
    tpCode: '3.2',
    cognitiveLevel: 'Penalaran',
    type: 'pgk_mcma',
    indicatorCAB: {
      condition: 'Disajikan data tabel biaya produksi pengrajin Sasirangan khas Kalsel dengan sistem modal tetap dan biaya variabel',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menganalisis titik impas (break-even point) dan mengevaluasi kebenaran skenario produksi kain'
    },
    contextRegion: 'Sentra Kerajinan Sasirangan Kalsel',
    stimulus: {
      title: 'Kalkulasi Titik Impas (BEP) UMKM Kain Sasirangan',
      text: 'Sebuah UMKM kain Sasirangan mengeluarkan biaya tetap bulanan sebesar Rp3.600.000,00 untuk sewa alat dan listrik. Biaya bahan baku pewarna alami dan kain mori per lembar adalah Rp65.000,00. Setiap lembar kain Sasirangan dijual dengan harga Rp125.000,00. Keuntungan (laba) dihitung dari Total Pendapatan Penjualan dikurangi Total Biaya Produksi.',
      tableData: {
        headers: ['Komponen Aljabar', 'Besaran'],
        rows: [
          ['Biaya Tetap Operasional', 'Rp3.600.000,00'],
          ['Biaya Variabel per Lembar Kain (x)', 'Rp65.000,00 * x'],
          ['Harga Jual per Lembar Kain (x)', 'Rp125.000,00 * x']
        ]
      }
    },
    prompt: 'Berdasarkan data produksi Sasirangan tersebut, pilihlah pernyataan-pernyataan berikut yang bernilai BENAR! (Jawaban benar lebih dari satu)',
    mcmaOptions: [
      { id: '13_1', statement: 'Model persamaan untuk mencapai titik impas (BEP tanpa untung/rugi) adalah 125.000x = 65.000x + 3.600.000.', isCorrect: true },
      { id: '13_2', statement: 'Pengrajin harus memproduksi dan menjual tepat 60 lembar kain agar modal kembali (impas).', isCorrect: true },
      { id: '13_3', statement: 'Jika pengrajin berhasil menjual 80 lembar kain, maka keuntungan bersih yang diperoleh adalah Rp1.500.000,00.', isCorrect: false },
      { id: '13_4', statement: 'Untuk memperoleh laba bersih Rp2.400.000,00, jumlah kain yang harus terjual adalah 100 lembar.', isCorrect: true }
    ],
    explanation: '1. BEP tercapai saat Pendapatan = Biaya Total: 125.000x = 65.000x + 3.600.000. (BENAR)\n2. 60.000x = 3.600.000 → x = 60 lembar. (BENAR)\n3. Keuntungan 80 lembar = (80 * 125.000) - (80 * 65.000 + 3.600.000) = 10.000.000 - 8.800.000 = Rp1.200.000,00 (bukan 1.500.000). (SALAH)\n4. Laba = 60.000x - 3.600.000 = 2.400.000 → 60.000x = 6.000.000 → x = 100 lembar. (BENAR).'
  },

  // =================== SOAL 14 (PGK MCMA - Penalaran HOTS 40%) ===================
  {
    id: 14,
    tpCode: '3.4',
    cognitiveLevel: 'Penalaran',
    type: 'pgk_mcma',
    indicatorCAB: {
      condition: 'Disajikan infografis batas standar pH air kolam budidaya ikan Patin di lahan rawa pasang surut Barito Kuala',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menganalisis pertidaksamaan nilai mutlak linear satu variabel |pH - 7,2| ≤ 0,8'
    },
    contextRegion: 'Budidaya Perikanan Air Tawar Barito Kuala',
    stimulus: {
      title: 'Manajemen Keasaman (pH) Air Kolam Ikan Patin Wanaraya',
      text: 'Peternak ikan patin di Barito Kuala harus memantau derajat keasaman (pH) air kolam secara ketat. Di lahan rawa pasang surut dengan tanah sulfat masam, air cenderung asam bila pasang surut tidak terkontrol. Balai Perikanan menetapkan kondisi ideal air kolam patin berada di sekitar nilai target pH 7,2 dengan batas toleransi penyimpangan tidak lebih dari 0,8 unit. Jika p menyatakan nilai pH air kolam yang aman, maka situasinya dimodelkan dengan |p - 7,2| ≤ 0,8.'
    },
    prompt: 'Berdasarkan model toleransi pH air kolam patin tersebut, pilihlah pernyataan-pernyataan berikut yang bernilai BENAR! (Jawaban benar lebih dari satu)',
    mcmaOptions: [
      { id: '14_1', statement: 'Bentuk pertidaksamaan tersebut ekuivalen dengan -0,8 ≤ p - 7,2 ≤ 0,8.', isCorrect: true },
      { id: '14_2', statement: 'Rentang nilai pH air kolam yang aman bagi ikan patin adalah 6,4 ≤ p ≤ 8,0.', isCorrect: true },
      { id: '14_3', statement: 'Air kolam dengan pH 6,2 masih berada dalam kategori batas aman toleransi.', isCorrect: false },
      { id: '14_4', statement: 'Air kolam dengan pH 7,8 tergolong dalam rentang yang aman.', isCorrect: true }
    ],
    explanation: 'Pertidaksamaan |p - 7,2| ≤ 0,8 diubah menjadi:\n-0,8 ≤ p - 7,2 ≤ 0,8 (Pernyataan 1 BENAR).\nTambahkan 7,2 pada ketiga ruas:\n7,2 - 0,8 ≤ p ≤ 7,2 + 0,8\n6,4 ≤ p ≤ 8,0 (Pernyataan 2 BENAR).\nNilai pH 6,2 berada di bawah batas minimum 6,4 sehingga TIDAK aman (Pernyataan 3 SALAH).\nNilai pH 7,8 berada di dalam rentang 6,4 ≤ 7,8 ≤ 8,0 sehingga aman (Pernyataan 4 BENAR).'
  },

  // =================== SOAL 15 (PGK Kategori - Aplikasi 50%) ===================
  {
    id: 15,
    tpCode: '3.2',
    cognitiveLevel: 'Aplikasi',
    type: 'pgk_kategori',
    indicatorCAB: {
      condition: 'Disajikan dua timbangan analitik laboratorium sekolah yang berada dalam posisi setimbang',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menguji kebenaran pernyataan terkait nilai massa anak timbangan dan sifat kesetaraan aljabar'
    },
    contextRegion: 'Laboratorium IPA SMPN 1 Wanaraya',
    stimulus: {
      title: 'Eksperimen Kesetaraan Neraca Pegas di Laboratorium',
      text: 'Dua orang murid SMPN 1 Wanaraya melakukan eksperimen kesetaraan neraca dua lengan. Pada lengan kiri diletakkan 3 balok bermassa m gram dan beban pemberat 20 gram. Pada lengan kanan diletakkan 1 balok bermassa m gram dan beban pemberat 80 gram. Posisi kedua lengan neraca berada dalam keadaan seimbang mendatar (3m + 20 = m + 80).'
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan berikut berdasarkan data eksperimen neraca tersebut!',
    categoryStatements: [
      { id: '15_1', statement: 'Mengurangkan kedua ruas dengan m dan 20 menghasilkan persamaan ekuivalen 2m = 60.', correctAnswer: 'Benar' },
      { id: '15_2', statement: 'Massa sebuah balok m adalah 40 gram.', correctAnswer: 'Salah' },
      { id: '15_3', statement: 'Total beban pada salah satu lengan timbangan saat setimbang adalah 110 gram.', correctAnswer: 'Benar' }
    ],
    explanation: '3m + 20 = m + 80\n1. Kurangi kedua ruas dengan m dan 20: (3m - m) = 80 - 20 → 2m = 60. (BENAR)\n2. 2m = 60 → m = 30 gram (bukan 40 gram). (SALAH)\n3. Beban pada lengan kanan: m + 80 = 30 + 80 = 110 gram. Lengan kiri: 3(30) + 20 = 110 gram. (BENAR).'
  },

  // =================== SOAL 16 (PGK Kategori - Aplikasi 50%) ===================
  {
    id: 16,
    tpCode: '3.3',
    cognitiveLevel: 'Aplikasi',
    type: 'pgk_kategori',
    indicatorCAB: {
      condition: 'Disajikan aturan kuota peserta didik berprestasi dan batas nilai minimal seleksi beasiswa tingkat kabupaten',
      audience: 'Murid kelas 8',
      behavior: 'Dapat memvalidasi kalimat matematika pertidaksamaan dari syarat nilai rata-rata'
    },
    contextRegion: 'Dinas Pendidikan Kabupaten Barito Kuala',
    stimulus: {
      title: 'Kriteria Kelayakan Beasiswa Bakat Akademik Kabupaten',
      text: 'Dinas Pendidikan Kabupaten Barito Kuala membuka program beasiswa bagi murid berprestasi. Syarat penerima beasiswa adalah nilai rata-rata dari empat mata pelajaran (Matematika, IPA, Bahasa Indonesia, Bahasa Inggris) tidak boleh kurang dari 85. Seorang murid SMPN 1 Wanaraya telah memiliki nilai untuk tiga mata pelajaran, yaitu: Matematika = 88, IPA = 82, dan Bahasa Indonesia = 86. Nilai ujian Bahasa Inggris dimisalkan dengan n.'
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan berikut terkait nilai ujian Bahasa Inggris (n) yang dibutuhkan!',
    categoryStatements: [
      { id: '16_1', statement: 'Model pertidaksamaan rata-rata nilai murid tersebut adalah (256 + n) / 4 ≥ 85.', correctAnswer: 'Benar' },
      { id: '16_2', statement: 'Jumlah total minimal nilai dari keempat mata pelajaran tersebut harus mencapai 340.', correctAnswer: 'Benar' },
      { id: '16_3', statement: 'Jika murid memperoleh nilai Bahasa Inggris n = 83, maka murid tersebut sudah memenuhi syarat beasiswa.', correctAnswer: 'Salah' }
    ],
    explanation: '1. Total 3 mapel = 88 + 82 + 86 = 256. Rata-rata: (256 + n) / 4 ≥ 85. (BENAR)\n2. 256 + n ≥ 85 * 4 ↔ 256 + n ≥ 340. (BENAR)\n3. n ≥ 340 - 256 = 84. Jika n = 83, nilainya masih di bawah batas minimal 84, sehingga belum memenuhi syarat. (SALAH).'
  },

  // =================== SOAL 17 (PGK Kategori - Penalaran HOTS 40%) ===================
  {
    id: 17,
    tpCode: '3.2',
    cognitiveLevel: 'Penalaran',
    type: 'pgk_kategori',
    indicatorCAB: {
      condition: 'Disajikan perbandingan dua tarif jasa pengiriman paket kelotok dan kurir ekspres lokal Wanaraya-Banjarmasin',
      audience: 'Murid kelas 8',
      behavior: 'Dapat mengevaluasi titik impas kesetaraan biaya antar dua penyedia jasa'
    },
    contextRegion: 'Ekspedisi Wanaraya - Banjarmasin',
    stimulus: {
      title: 'Analisis Biaya Pengiriman Jeruk Wanaraya Antar Dua Jasa Ekspedisi',
      text: 'Seorang petani di Wanaraya membandingkan biaya pengiriman jeruk ke pelanggan di Banjarmasin antara dua jasa kurir lokal:\n• Jasa Kurir Kilat: mengenakan tarif dasar Rp20.000,00 ditambah Rp6.000,00 per kg.\n• Jasa Kelotok Cepat: mengenakan tarif dasar Rp35.000,00 ditambah Rp3.500,00 per kg.\nMisalkan w adalah berat barang dalam kilogram.'
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan berikut tentang perbandingan biaya kedua kurir tersebut!',
    categoryStatements: [
      { id: '17_1', statement: 'Kedua jasa pengiriman akan mematok total biaya yang sama persis saat berat barang yang dikirim adalah 6 kg.', correctAnswer: 'Benar' },
      { id: '17_2', statement: 'Jika petani mengirim paket seberat 4 kg, maka menggunakan Jasa Kelotok Cepat lebih murah dibandingkan Jasa Kurir Kilat.', correctAnswer: 'Salah' },
      { id: '17_3', statement: 'Untuk pengiriman barang dengan berat di atas 6 kg (misalnya 10 kg), Jasa Kelotok Cepat lebih ekonomis.', correctAnswer: 'Benar' }
    ],
    explanation: 'Biaya Kurir Kilat = 20.000 + 6.000w\nBiaya Kelotok Cepat = 35.000 + 3.500w\n1. Biaya sama: 20.000 + 6.000w = 35.000 + 3.500w → 2.500w = 15.000 → w = 6 kg. (BENAR)\n2. Untuk w = 4 kg: Kurir Kilat = 20.000 + 24.000 = Rp44.000. Kelotok Cepat = 35.000 + 14.000 = Rp49.000. Jadi Kurir Kilat lebih murah (pernyataan 2 SALAH).\n3. Untuk w > 6 kg, karena tarif variabel Kelotok Cepat lebih rendah (3.500 vs 6.000), maka Kelotok Cepat lebih ekonomis. (BENAR).'
  },

  // =================== SOAL 18 (PGK Kategori - Penalaran HOTS 40%) ===================
  {
    id: 18,
    tpCode: '3.4',
    cognitiveLevel: 'Penalaran',
    type: 'pgk_kategori',
    indicatorCAB: {
      condition: 'Disajikan pertidaksamaan linier satu variabel majemuk -5 ≤ 2x + 3 < 11 dalam konteks batas suhu penyimpanan benih padi',
      audience: 'Murid kelas 8',
      behavior: 'Dapat menganalisis himpunan penyelesaian pertidaksamaan majemuk dan anggotanya'
    },
    contextRegion: 'Gudang Benih Pertanian Wanaraya',
    stimulus: {
      title: 'Kendali Suhu Ruang Inkubator Benih Padi',
      text: 'Gudang benih di Wanaraya menggunakan sensor digital untuk mengendalikan suhu ruang inkubasi benih padi. Formula batas operasional pengatur tegangan inverter sensor adalah:\n-5 ≤ 2x + 3 < 11\ndengan x merupakan nilai kalibrasi mikroprosesor.'
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan matematis berikut terkait pertidaksamaan majemuk tersebut!',
    categoryStatements: [
      { id: '18_1', statement: 'Mengurangkan ketiga bagian dengan 3 menghasilkan -8 ≤ 2x < 8.', correctAnswer: 'Benar' },
      { id: '18_2', statement: 'Himpunan penyelesaian untuk x bilangan real adalah -4 ≤ x < 4.', correctAnswer: 'Benar' },
      { id: '18_3', statement: 'Bilangan x = 4 termasuk dalam himpunan penyelesaian.', correctAnswer: 'Salah' }
    ],
    explanation: '-5 ≤ 2x + 3 < 11\n1. Kurangkan 3 di semua bagian: -5 - 3 ≤ 2x < 11 - 3 → -8 ≤ 2x < 8. (BENAR)\n2. Bagi semua ruas dengan 2: -4 ≤ x < 4. (BENAR)\n3. Karena batas kanan adalah "< 4", maka x = 4 TIDAK termasuk dalam penyelesaian. (SALAH).'
  },

  // =================== SOAL 19 (PGK Kategori - Penalaran HOTS 40%) ===================
  {
    id: 19,
    tpCode: '3.5',
    cognitiveLevel: 'Penalaran',
    type: 'pgk_kategori',
    indicatorCAB: {
      condition: 'Disajikan pertidaksamaan aljabar yang melibatkan pembalikan tanda ketidaksamaan -4(x - 1) ≥ 16',
      audience: 'Murid kelas 8',
      behavior: 'Dapat mengevaluasi langkah pengerjaan dan representasi visual garis bilangannya'
    },
    contextRegion: 'Evaluasi Pembelajaran Asesmen Formatif',
    stimulus: {
      title: 'Analisis Kesalahan Konsep Operasi Ketidaksamaan',
      text: 'Seorang murid bernama Rahman mencoba menyelesaikan pertidaksamaan:\n-4(x - 1) ≥ 16\nRahman membagikan kedua ruas dengan -4 tetapi lupa membalikkan lambang ketidaksamaan, sehingga ia mendapatkan hasil akhir x - 1 ≥ -4.'
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan evaluasi terhadap penyelesaian pertidaksamaan tersebut!',
    categoryStatements: [
      { id: '19_1', statement: 'Langkah Rahman salah karena pembagian kedua ruas dengan bilangan negatif (-4) wajib membalik tanda "≥" menjadi "≤".', correctAnswer: 'Benar' },
      { id: '19_2', statement: 'Penyelesaian pertidaksamaan yang tepat adalah x ≤ -3.', correctAnswer: 'Benar' },
      { id: '19_3', statement: 'Pada garis bilangan, titik -3 digambarkan dengan bulatan kosong (tidak diisi penuh).', correctAnswer: 'Salah' }
    ],
    explanation: '1. Sifat ketidaksamaan: membagi dengan -4 harus membalik tanda dari ≥ menjadi ≤. Jadi langkah Rahman salah. (BENAR)\n2. -4(x - 1) ≥ 16 → x - 1 ≤ -4 → x ≤ -3. (BENAR)\n3. Karena menggunakan tanda "≤" (kurang dari atau sama dengan), titik -3 harus digambarkan dengan bulatan penuh (pejal), bukan berlubang. (SALAH).'
  },

  // =================== SOAL 20 (PGK Kategori - Penalaran HOTS 40%) ===================
  {
    id: 20,
    tpCode: '3.1',
    cognitiveLevel: 'Penalaran',
    type: 'pgk_kategori',
    indicatorCAB: {
      condition: 'Disajikan koneksi materi aljabar dengan geometri tabung dan infografis bangun ruang sisi lengkung (merujuk link stimulus)',
      audience: 'Murid kelas 8',
      behavior: 'Dapat merumuskan tinggi tabung menggunakan persamaan linear satu variabel dari rumus volume'
    },
    contextRegion: 'Koneksi Materi Aljabar & Bangun Ruang Sisi Lengkung',
    stimulus: {
      title: 'Koneksi Konseptual: Dimensi Tangki Silinder Air Bersih Wanaraya',
      text: 'Sesuai infografis materi Bangun Ruang Sisi Lengkung, sebuah tangki air penampungan berbentuk silinder (tabung) memiliki volume V = π * r² * t. Sebuah tangki penampungan di SMPN 1 Wanaraya memiliki jari-jari alas tetap r = 70 cm (menggunakan π = 22/7) sehingga luas alas tabung adalah π * r² = (22/7) * 70 * 70 = 15.400 cm². Kapasitas volume air yang diinginkan adalah 308.000 cm³ (setara 308 liter). Di sini, tinggi tabung t menjadi satu-satunya variabel yang belum diketahui nilainya.',
      tableData: {
        headers: ['Komponen Silinder', 'Keterangan'],
        rows: [
          ['Bentuk Tangki', 'Tabung (Bangun Ruang Sisi Lengkung)'],
          ['Jari-jari alas (r)', '70 cm'],
          ['Luas alas (A = πr²)', '15.400 cm²'],
          ['Volume Target (V)', '308.000 cm³'],
          ['Persamaan Hubungan', '15.400 * t = 308.000']
        ]
      }
    },
    prompt: 'Tentukan BENAR atau SALAH untuk setiap pernyataan matematis berikut terkait pemodelan aljabar PLSV pada tangki silinder tersebut!',
    categoryStatements: [
      { id: '20_1', statement: 'Hubungan volume tangki dengan tingginya dapat dimodelkan sebagai persamaan linear satu variabel (PLSV) 15.400t = 308.000.', correctAnswer: 'Benar' },
      { id: '20_2', statement: 'Tinggi tangki silinder (t) yang harus dibangun agar volume tepat 308 liter adalah 20 cm.', correctAnswer: 'Benar' },
      { id: '20_3', statement: 'Jika tinggi tangki ditambah 10 cm lagi, maka kapasitas volume tangki akan bertambah lebih dari 200.000 cm³.', correctAnswer: 'Salah' }
    ],
    explanation: '1. V = Luas alas * tinggi = 15.400 * t = 308.000. Ini merupakan PLSV berderajat 1 dengan variabel t. (BENAR)\n2. 15.400t = 308.000 → t = 308.000 / 15.400 = 20 cm. (BENAR)\n3. Jika tinggi bertambah 10 cm, penambahan volume = 15.400 * 10 = 154.000 cm³, yaitu kurang dari 200.000 cm³ (bukan lebih). (SALAH).'
  }
];

export const COGNITIVE_LEVEL_STATS = {
  Pemahaman: { count: 2, percentage: '10%' },
  Aplikasi: { count: 10, percentage: '50%' },
  Penalaran: { count: 8, percentage: '40%' },
  Total: 20
};

export const QUESTION_TYPE_STATS = {
  PilihanGanda: 10,
  PilihanGandaKompleks: 4,
  KategoriBenarSalah: 6,
  Total: 20
};
