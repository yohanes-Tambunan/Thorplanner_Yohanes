import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CalendarDays, Check, CheckCircle2, Clock3, Plus, Trash2, Pencil, CalendarPlus } from 'lucide-react';
import Modal from '../components/Modal';
import { useGym } from '../context/GymContext';
import { formatDate, formatDay, getRelativeDateLabel } from '../utils/dateUtils';

const todayISO = () => {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
};

function ScheduleForm({ workouts, initial, preselectedId, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    workoutId: initial?.workoutId || preselectedId || workouts[0]?.id || '',
    date: initial?.date || todayISO(),
    time: initial?.time || '17:00',
    note: initial?.note || '',
  }));
  const selectedWorkout = workouts.find((item) => item.id === form.workoutId);

  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedWorkout) return;
    onSave({
      workoutId: selectedWorkout.id,
      workoutName: selectedWorkout.name,
      focus: selectedWorkout.focus,
      duration: Number(selectedWorkout.duration),
      date: form.date,
      time: form.time,
      note: form.note.trim(),
    });
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <label className="form-field">Pilih program<select value={form.workoutId} onChange={(event) => setForm((current) => ({ ...current, workoutId: event.target.value }))} required>{workouts.map((workout) => <option key={workout.id} value={workout.id}>{workout.name} · {workout.duration} min</option>)}</select></label>
      <div className="form-row"><label className="form-field">Tanggal latihan<input type="date" value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} required /></label><label className="form-field">Waktu<input type="time" value={form.time} onChange={(event) => setForm((current) => ({ ...current, time: event.target.value }))} required /></label></div>
      <label className="form-field">Catatan<textarea rows="3" value={form.note} onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))} placeholder="Contoh: fokus pada teknik squat." maxLength={180} /></label>
      {selectedWorkout && <div className="selected-program-note"><DumbbellIcon /> <span><strong>{selectedWorkout.name}</strong><small>{selectedWorkout.focus} · {selectedWorkout.duration} menit</small></span></div>}
      <div className="modal-actions"><button className="button button-secondary" type="button" onClick={onCancel}>Batal</button><button className="button button-primary" type="submit">Simpan jadwal</button></div>
    </form>
  );
}

function DumbbellIcon() { return <span className="selected-program-icon">✳</span>; }

export default function Schedule() {
  const { workouts, schedules, addSchedule, updateSchedule, deleteSchedule, completeSchedule } = useGym();
  const location = useLocation();
  const navigate = useNavigate();
  const requestedWorkoutId = location.state?.workoutId || '';
  const [showForm, setShowForm] = useState(Boolean(requestedWorkoutId));
  const [editing, setEditing] = useState(null);
  const [preselectedId, setPreselectedId] = useState(requestedWorkoutId);

  useEffect(() => {
    if (location.state?.workoutId) {
      setPreselectedId(location.state.workoutId);
      setShowForm(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.key, location.pathname, location.state, navigate]);

  const sortedSchedules = useMemo(() => [...schedules].sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`)), [schedules]);
  const plannedCount = schedules.filter((item) => item.status === 'planned').length;
  const completedCount = schedules.filter((item) => item.status === 'completed').length;

  function saveSchedule(input) {
    if (editing) updateSchedule(editing.id, input);
    else addSchedule(input);
    setShowForm(false);
    setEditing(null);
    setPreselectedId('');
  }

  function openCreate() {
    setEditing(null);
    setPreselectedId('');
    setShowForm(true);
  }

  function handleDelete(item) {
    if (window.confirm(`Hapus jadwal ${item.workoutName} pada ${formatDate(item.date)}?`)) deleteSchedule(item.id);
  }

  return (
    <div className="page-stack">
      <section className="page-intro-row"><div><p className="eyebrow">MAKE TIME FOR YOURSELF</p><h2>Training schedule</h2><p className="page-description">Rencanakan sesi latihan dan tandai saat kamu sudah menyelesaikannya.</p></div><button className="button button-primary" type="button" onClick={openCreate}><Plus size={17} /> Add schedule</button></section>
      <section className="schedule-summary-grid"><div className="schedule-summary-card"><span className="summary-icon summary-lime"><CalendarDays size={18} /></span><div><strong>{schedules.length}</strong><span>Total jadwal</span></div></div><div className="schedule-summary-card"><span className="summary-icon summary-orange"><Clock3 size={18} /></span><div><strong>{plannedCount}</strong><span>Menunggu latihan</span></div></div><div className="schedule-summary-card"><span className="summary-icon summary-blue"><CheckCircle2 size={18} /></span><div><strong>{completedCount}</strong><span>Jadwal selesai</span></div></div></section>

      <section className="panel schedule-list-panel">
        <div className="panel-heading panel-heading-row"><div><p className="eyebrow">YOUR PLAN</p><h2>All sessions</h2><p className="panel-subtitle">Jadwal tersusun berdasarkan tanggal dan waktu.</p></div><span className="panel-icon"><CalendarDays size={18} /></span></div>
        {sortedSchedules.length ? <div className="schedule-list">{sortedSchedules.map((item) => (
          <article className={`schedule-item ${item.status === 'completed' ? 'schedule-completed' : ''}`} key={item.id}>
            <div className="schedule-date-block"><strong>{new Intl.DateTimeFormat('id-ID', { day: '2-digit' }).format(new Date(`${item.date}T12:00:00`))}</strong><span>{new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(new Date(`${item.date}T12:00:00`))}</span></div>
            <div className="schedule-main-info"><div className="schedule-day-label">{getRelativeDateLabel(item.date)} · {formatDay(item.date)}</div><h3>{item.workoutName}</h3><p>{item.focus}</p>{item.note && <span className="schedule-note">{item.note}</span>}</div>
            <div className="schedule-time-block"><Clock3 size={15} /><strong>{item.time}</strong><span>{item.duration} min</span></div>
            <div className="schedule-actions">{item.status === 'completed' ? <span className="completed-tag"><Check size={13} /> Completed</span> : <button className="button button-small button-primary" type="button" onClick={() => completeSchedule(item.id)}><Check size={14} /> Complete</button>}{item.status !== 'completed' && <button className="icon-button subtle-icon" type="button" onClick={() => { setEditing(item); setPreselectedId(item.workoutId); setShowForm(true); }} aria-label="Edit jadwal"><Pencil size={15} /></button>}<button className="icon-button subtle-icon danger-hover" type="button" onClick={() => handleDelete(item)} aria-label="Hapus jadwal"><Trash2 size={15} /></button></div>
          </article>
        ))}</div> : <div className="empty-state"><CalendarPlus size={27} /><strong>Belum ada jadwal latihan</strong><span>Pilih program latihan dan tentukan waktu latihannya.</span><button className="button button-primary" type="button" onClick={openCreate}><Plus size={16} /> Buat jadwal pertama</button></div>}
      </section>
      <p className="schedule-footnote">beri waktu istirahat yang cukup di antara sesi latihan.</p>
      {showForm && <Modal title={editing ? 'Edit training schedule' : 'Add training schedule'} subtitle="Pilih program dan tentukan waktu latihan." onClose={() => { setShowForm(false); setEditing(null); setPreselectedId(''); }}>{workouts.length ? <ScheduleForm workouts={workouts} initial={editing || undefined} preselectedId={preselectedId} onSave={saveSchedule} onCancel={() => { setShowForm(false); setEditing(null); setPreselectedId(''); }} /> : <div className="empty-state"><DumbbellIcon /><strong>Belum ada program</strong><span>Buat program latihan terlebih dahulu sebelum menambahkan jadwal.</span><button className="button button-primary" type="button" onClick={() => navigate('/workouts')}>Buka Workout Plan</button></div>}</Modal>}
    </div>
  );
}
