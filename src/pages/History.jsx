import { useMemo, useState } from 'react';
import { Activity, CalendarDays, Clock3, Dumbbell, Filter, Trophy } from 'lucide-react';
import { useGym } from '../context/GymContext';
import { formatDate, isDateInCurrentWeek } from '../utils/dateUtils';

export default function History() {
  const { history } = useGym();
  const [period, setPeriod] = useState('all');
  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(now.getDate() - 6);
  const sevenDaysISO = `${sevenDaysAgo.getFullYear()}-${String(sevenDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(sevenDaysAgo.getDate()).padStart(2, '0')}`;
  const filtered = useMemo(() => [...history]
    .filter((item) => period === 'all' || (period === 'week' ? isDateInCurrentWeek(item.date) : item.date >= sevenDaysISO))
    .sort((a, b) => `${b.date}T${b.completedAt || ''}`.localeCompare(`${a.date}T${a.completedAt || ''}`)), [history, period, sevenDaysISO]);
  const totalMinutes = filtered.reduce((sum, item) => sum + Number(item.duration || 0), 0);
  const average = filtered.length ? Math.round(totalMinutes / filtered.length) : 0;

  return (
    <div className="page-stack">
      <section className="page-intro-row"><div><p className="eyebrow">EVERY SESSION COUNTS</p><h2>Workout history</h2><p className="page-description">Semua latihan yang sudah kamu tandai selesai akan tersimpan di sini.</p></div><div className="history-total-pill"><Trophy size={17} /><span>{history.length} sessions logged</span></div></section>
      <section className="history-stats-grid"><div className="history-stat"><span className="history-stat-icon"><Dumbbell size={18} /></span><div><strong>{filtered.length}</strong><span>Sesi latihan</span></div></div><div className="history-stat"><span className="history-stat-icon history-orange"><Clock3 size={18} /></span><div><strong>{totalMinutes} <small>min</small></strong><span>Total durasi</span></div></div><div className="history-stat"><span className="history-stat-icon history-blue"><Activity size={18} /></span><div><strong>{average} <small>min</small></strong><span>Rata-rata per sesi</span></div></div></section>
      <section className="panel history-table-panel">
        <div className="panel-heading panel-heading-row"><div><p className="eyebrow">YOUR JOURNEY</p><h2>Completed sessions</h2><p className="panel-subtitle">Catatan sesi latihan yang telah diselesaikan.</p></div><label className="select-with-icon"><Filter size={15} /><select value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Filter periode"><option value="all">Semua waktu</option><option value="week">Minggu ini</option><option value="7days">7 hari terakhir</option></select></label></div>
        {filtered.length ? (
          <div className="history-table-wrap"><table className="history-table"><thead><tr><th>Workout</th><th>Muscle focus</th><th>Date</th><th>Duration</th><th>Status</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><div className="table-workout-name"><span className="table-dumbbell"><Dumbbell size={16} /></span><strong>{item.workoutName}</strong></div></td><td>{item.focus}</td><td>{formatDate(item.date, { day: 'numeric', month: 'short', year: 'numeric' })}</td><td><span className="duration-value"><Clock3 size={14} /> {item.duration} min</span></td><td><span className="completed-tag"><span className="status-dot" /> Completed</span></td></tr>)}</tbody></table></div>
        ) : <div className="empty-state"><CalendarDays size={26} /><strong>Belum ada catatan latihan</strong><span>{period === 'all' ? 'Selesaikan jadwal latihan untuk mulai membangun riwayatmu.' : 'Tidak ada latihan selesai pada periode yang dipilih.'}</span></div>}
      </section>
      <div className="info-strip"><span className="info-strip-icon"><Trophy size={17} /></span><p><strong>Progress is not always linear.</strong> Riwayat membantu melihat konsistensi latihan, bukan untuk membandingkan diri dengan orang lain.</p></div>
    </div>
  );
}
