import { Student, ExamSubmission } from '../types';

/**
 * Kode Google Apps Script lengkap yang siap di-deploy sebagai Web App.
 * Menangani 2 aksi utama:
 * 1. GET (action='ping' atau action='getUsers'): membaca data siswa dari sheet 'UserLogin'
 * 2. POST (action='saveAnswer' atau action='syncUsers'): menyimpan jawaban siswa ke sheet 'JawabanUjian'
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT - LMS & CBT SMP NEGERI 1 WANARAYA (TP 2026/2027)
 * =========================================================================
 * Petunjuk Pemasangan:
 * 1. Buka Google Spreadsheet baru di Google Drive Anda.
 * 2. Beri nama Spreadsheet: "DATABASE CBT SMPN 1 WANARAYA 2026-2027"
 * 3. Klik menu: Ekstensi > Apps Script (Extensions > Apps Script)
 * 4. Hapus semua kode default di editor, lalu paste (tempel) seluruh kode di bawah ini.
 * 5. Klik ikon Disket (Simpan).
 * 6. Klik tombol biru "Terapkan" (Deploy) di kanan atas > "Deployment baru" (New deployment).
 * 7. Pilih jenis: "Aplikasi Web" (Web app).
 * 8. Konfigurasi:
 *    - Deskripsi: CBT SMPN 1 Wanaraya Webhook v1
 *    - Jalankan sebagai: "Saya" (Me - akun Anda)
 *    - Siapa yang memiliki akses: "Siapa saja" (Anyone) -> SANGAT PENTING!
 * 9. Klik "Terapkan", berikan izin akun Google Anda (Klik Lanjutan/Advanced > Buka/Go to Project).
 * 10. Salin "URL Aplikasi Web" (akhiran /exec) dan tempelkan ke menu Pengaturan di aplikasi LMS ini!
 * =========================================================================
 */

function doGet(e) {
  var params = e ? e.parameter : {};
  var action = params.action || 'ping';

  if (action === 'ping') {
    return createJsonResponse({
      status: 'success',
      message: 'Koneksi ke Google Sheets SMPN 1 Wanaraya Berhasil!',
      timestamp: new Date().toISOString()
    });
  }

  if (action === 'getUsers') {
    return handleGetUsers();
  }

  return createJsonResponse({ status: 'unknown_action', action: action });
}

function doPost(e) {
  try {
    var rawData = e.postData ? e.postData.contents : '';
    var payload = {};
    if (rawData) {
      payload = JSON.parse(rawData);
    } else if (e.parameter) {
      payload = e.parameter;
    }

    var action = payload.action || 'saveAnswer';

    if (action === 'saveAnswer') {
      return handleSaveAnswer(payload);
    } else if (action === 'saveStudent') {
      return handleSaveSingleStudent(payload);
    } else if (action === 'syncStudents') {
      return handleSyncAllStudents(payload);
    }

    return createJsonResponse({ status: 'error', message: 'Aksi tidak dikenal: ' + action });
  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  }
}

// 1. Fungsi Mengambil Data Siswa dari Sheet 'UserLogin'
function handleGetUsers() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('UserLogin');

  if (!sheet) {
    sheet = initUserLoginSheet(ss);
  }

  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) {
    return createJsonResponse({ status: 'success', users: [] });
  }

  var users = [];
  // Baris pertama adalah Header: [Kode/Username, Nama Peserta, Kelas, Password, Token]
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (row[0]) {
      users.push({
        username: String(row[0]).trim(),
        name: String(row[1]).trim(),
        kelas: String(row[2]).trim(),
        password: String(row[3]).trim(),
        token: String(row[4] || '').trim()
      });
    }
  }

  return createJsonResponse({ status: 'success', count: users.length, users: users });
}

// 2. Fungsi Menyimpan Jawaban Siswa ke Sheet 'JawabanUjian'
function handleSaveAnswer(data) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('JawabanUjian');

  if (!sheet) {
    sheet = initJawabanSheet(ss);
  }

  var now = new Date();
  var formattedTime = Utilities.formatDate(now, 'Asia/Makassar', 'yyyy-MM-dd HH:mm:ss') + ' WITA';

  // Susun kolom jawaban nomor 1 sampai 20
  var ansCols = [];
  for (var i = 1; i <= 20; i++) {
    var ans = data.answers && data.answers[i] ? data.answers[i] : '-';
    ansCols.push(ans);
  }

  // Row Data: [Timestamp, Nama, Kelas, Kode/Username, Token, Skor Akhir, Jml Benar, Durasi (Menit), No.1 s.d No.20]
  var rowData = [
    formattedTime,
    data.studentName || '-',
    data.kelas || '-',
    data.studentUsername || data.studentId || '-',
    data.tokenUsed || '-',
    Number(data.finalScore || 0),
    Number(data.correctCount || 0),
    data.durationMinutes || 0
  ];

  rowData = rowData.concat(ansCols);

  sheet.appendRow(rowData);

  return createJsonResponse({
    status: 'success',
    message: 'Data jawaban ujian ' + data.studentName + ' berhasil disimpan di spreadsheet!',
    score: data.finalScore,
    timestamp: formattedTime
  });
}

// 3. Fungsi Menyimpan/Menambah Siswa Tunggal ke Sheet 'UserLogin'
function handleSaveSingleStudent(payload) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('UserLogin');
  if (!sheet) sheet = initUserLoginSheet(ss);

  sheet.appendRow([
    payload.username,
    payload.name,
    payload.kelas,
    payload.password || '123',
    payload.token || 'WANARAYA26'
  ]);

  return createJsonResponse({ status: 'success', message: 'Siswa berhasil ditambahkan' });
}

// Inisialisasi Sheet UserLogin jika belum ada
function initUserLoginSheet(ss) {
  var sheet = ss.insertSheet('UserLogin');
  sheet.appendRow(['Kode/Username', 'Nama Peserta', 'Kelas', 'Password', 'Token']);
  sheet.getRange(1, 1, 1, 5).setBackground('#2563eb').setFontColor('#ffffff').setFontWeight('bold');
  
  // Contoh data awal SMPN 1 Wanaraya
  sheet.appendRow(['8A01', 'Ahmad Rifani', '8A', '123', 'WANARAYA26']);
  sheet.appendRow(['8A02', 'Nur Hidayah', '8A', '123', 'WANARAYA26']);
  sheet.appendRow(['8B01', 'Budi Santoso', '8B', '123', 'WANARAYA26']);
  sheet.appendRow(['8B02', 'Citra Dewi Lestari', '8B', '123', 'WANARAYA26']);
  return sheet;
}

// Inisialisasi Sheet JawabanUjian jika belum ada
function initJawabanSheet(ss) {
  var sheet = ss.insertSheet('JawabanUjian');
  var headers = ['Waktu Selesai', 'Nama Peserta', 'Kelas', 'Kode Siswa', 'Token Ujian', 'Skor Akhir (0-100)', 'Jumlah Benar', 'Durasi (Menit)'];
  for (var i = 1; i <= 20; i++) {
    headers.push('No.' + i);
  }
  sheet.appendRow(headers);
  sheet.getRange(1, 1, 1, headers.length).setBackground('#1e3a8a').setFontColor('#ffffff').setFontWeight('bold');
  return sheet;
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

/**
 * Tes koneksi ke Google Apps Script Web App
 */
export async function testGoogleAppsScriptConnection(url: string): Promise<{ success: boolean; message: string; latencyMs?: number }> {
  if (!url || !url.startsWith('https://script.google.com/macros/s/')) {
    return {
      success: false,
      message: 'Format URL Web App Google Apps Script tidak valid. Harus diawali dengan https://script.google.com/macros/s/...'
    };
  }

  const start = performance.now();
  try {
    const pingUrl = url.includes('?') ? `${url}&action=ping` : `${url}?action=ping`;
    const res = await fetch(pingUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    const latencyMs = Math.round(performance.now() - start);

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        message: data.message || 'Koneksi ke Google Sheets berhasil terhubung!',
        latencyMs
      };
    } else {
      return {
        success: false,
        message: `Server merespon dengan status ${res.status}. Pastikan hak akses Web App di-set ke "Anyone/Siapa Saja".`,
        latencyMs
      };
    }
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Gagal menghubungi server Apps Script: ${errMessage}. Pastikan Web App sudah di-deploy dengan akses Anyone.`
    };
  }
}

/**
 * Mengambil daftar siswa dari sheet 'UserLogin'
 */
export async function pullStudentsFromSheets(url: string): Promise<{ success: boolean; students?: Student[]; message: string }> {
  if (!url) {
    return { success: false, message: 'URL Google Apps Script belum diisi di Pengaturan.' };
  }

  try {
    const fetchUrl = url.includes('?') ? `${url}&action=getUsers` : `${url}?action=getUsers`;
    const res = await fetch(fetchUrl);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    if (data.status === 'success' && Array.isArray(data.users)) {
      const parsed: Student[] = data.users.map((u: any, idx: number) => ({
        id: u.username || `stu-${idx}`,
        username: u.username,
        name: u.name,
        kelas: u.kelas === '8B' ? '8B' : '8A',
        password: String(u.password || '123'),
        token: u.token || 'WANARAYA26'
      }));
      return { success: true, students: parsed, message: `Berhasil menarik ${parsed.length} data siswa dari spreadsheet!` };
    }
    return { success: false, message: data.message || 'Gagal memproses data dari spreadsheet.' };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `Gagal menarik data siswa: ${msg}` };
  }
}

/**
 * Mengirimkan hasil ujian siswa ke Google Spreadsheet sheet 'JawabanUjian'
 */
export async function sendExamResultToSheets(url: string, submission: ExamSubmission): Promise<{ success: boolean; message: string }> {
  // Format jawaban per nomor menjadi representasi ringkas
  const answersMap: Record<number, string> = {};
  for (let i = 1; i <= 20; i++) {
    const ans = submission.answers[i];
    if (!ans) {
      answersMap[i] = 'KOSONG';
      continue;
    }
    if (ans.type === 'pg') {
      answersMap[i] = ans.pgSelected || 'KOSONG';
    } else if (ans.type === 'pgk_mcma') {
      answersMap[i] = (ans.mcmaSelected && ans.mcmaSelected.length > 0)
        ? ans.mcmaSelected.map(id => id.split('_')[1] || id).join(',')
        : 'KOSONG';
    } else if (ans.type === 'pgk_kategori') {
      if (ans.categorySelected) {
        const statements = Object.entries(ans.categorySelected).map(([k, v]) => `${k.split('_')[1] || k}:${v[0]}`);
        answersMap[i] = statements.join('; ');
      } else {
        answersMap[i] = 'KOSONG';
      }
    }
  }

  const payload = {
    action: 'saveAnswer',
    studentName: submission.studentName,
    studentUsername: submission.studentId,
    kelas: submission.kelas,
    tokenUsed: submission.tokenUsed,
    finalScore: submission.finalScore,
    correctCount: submission.correctCount,
    durationMinutes: submission.durationMinutes,
    finishTime: submission.finishTime,
    answers: answersMap
  };

  if (!url) {
    return {
      success: false,
      message: 'URL Google Apps Script belum disetel. Data telah disimpan secara aman di Database Lokal browser.'
    };
  }

  try {
    // Karena Google Apps Script Web App sering melakukan redirect 302,
    // kita gunakan POST dengan mode no-cors jika fetch standar terhalang CORS.
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });

    return {
      success: true,
      message: 'Data jawaban berhasil dikirim ke Google Spreadsheet (Sheet: JawabanUjian)!'
    };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `Gagal mengirim ke spreadsheet: ${errMessage}. Data tersimpan di penyimpanan lokal.`
    };
  }
}
