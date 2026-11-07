import { Student } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  // Kelas 8A (Wanaraya)
  { id: '8A-01', username: '8A01', name: 'Ahmad Rifani', kelas: '8A', password: '123', token: 'WANARAYA26' },
  { id: '8A-02', username: '8A02', name: 'Nur Hidayah', kelas: '8A', password: '123', token: 'WANARAYA26' },
  { id: '8A-03', username: '8A03', name: 'Muhammad Zaini', kelas: '8A', password: '123', token: 'WANARAYA26' },
  { id: '8A-04', username: '8A04', name: 'Siti Rahmah', kelas: '8A', password: '123', token: 'WANARAYA26' },
  { id: '8A-05', username: '8A05', name: 'Bagas Aditya Pratama', kelas: '8A', password: '123', token: 'WANARAYA26' },
  { id: '8A-06', username: '8A06', name: 'Dina Amelia', kelas: '8A', password: '123', token: 'WANARAYA26' },
  { id: '8A-07', username: '8A07', name: 'Fikri Haikal', kelas: '8A', password: '123', token: 'WANARAYA26' },
  { id: '8A-08', username: '8A08', name: 'Indah Permata Sari', kelas: '8A', password: '123', token: 'WANARAYA26' },
  { id: '8A-09', username: '8A09', name: 'Reza Fauzan', kelas: '8A', password: '123', token: 'WANARAYA26' },
  { id: '8A-10', username: '8A10', name: 'Zahra Aulia', kelas: '8A', password: '123', token: 'WANARAYA26' },

  // Kelas 8B (Wanaraya)
  { id: '8B-01', username: '8B01', name: 'Budi Santoso', kelas: '8B', password: '123', token: 'WANARAYA26' },
  { id: '8B-02', username: '8B02', name: 'Citra Dewi Lestari', kelas: '8B', password: '123', token: 'WANARAYA26' },
  { id: '8B-03', username: '8B03', name: 'Danu Pratama', kelas: '8B', password: '123', token: 'WANARAYA26' },
  { id: '8B-04', username: '8B04', name: 'Elsa Putri Wardani', kelas: '8B', password: '123', token: 'WANARAYA26' },
  { id: '8B-05', username: '8B05', name: 'Farhan Saputra', kelas: '8B', password: '123', token: 'WANARAYA26' },
  { id: '8B-06', username: '8B06', name: 'Gita Maharani', kelas: '8B', password: '123', token: 'WANARAYA26' },
  { id: '8B-07', username: '8B07', name: 'Hendra Gunawan', kelas: '8B', password: '123', token: 'WANARAYA26' },
  { id: '8B-08', username: '8B08', name: 'Irma Suryani', kelas: '8B', password: '123', token: 'WANARAYA26' },
  { id: '8B-09', username: '8B09', name: 'Joko Setiawan', kelas: '8B', password: '123', token: 'WANARAYA26' },
  { id: '8B-10', username: '8B10', name: 'Kartika Sari', kelas: '8B', password: '123', token: 'WANARAYA26' }
];

export const INITIAL_SETTINGS = {
  schoolName: 'SMP Negeri 1 Wanaraya',
  academicYear: '2026/2027',
  examTitle: 'Ujian Formatif: Persamaan dan Pertidaksamaan Linier Satu Variabel (PLSV & PtLSV)',
  examDurationMinutes: 80,
  activeToken: 'WANARAYA26',
  googleAppsScriptUrl: '', // Dapat diisi di admin panel
  sheetUserLoginName: 'UserLogin',
  sheetJawabanName: 'JawabanUjian',
  discussionPassword: 'GURUWANARAYA2026',
  shuffleQuestions: false
};
