import { useState } from 'react';
import { Activity, ArrowUpRight, CalendarDays, Plus, Search, Dumbbell, ListFilter, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import WorkoutCard from '../components/WorkoutCard';
import { useGym } from '../context/GymContext';
import { getFocusCopy, getWeeklyPlan } from '../utils/personalization';
import { EXERCISES } from '../data/exercises';

const emptyForm = { name: '', focus: '', duration: 45, level: 'Pemula', description: '' };

function WorkoutForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || emptyForm);
  const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name.trim() || !form.focus.trim()) return;
    onSave({ ...form, name: form.name.trim(), focus: form.focus.trim(), duration: Math.max(1, Number(form.duration) || 45), exerciseIds: initial?.exerciseIds || [] });
  }

  return (
    <form className="form-stack" onSubmit={handleSubmit}>
      <label className="form-field">Nama program<input autoFocus name="name" value={form.name} onChange={handleChange} placeholder="Contoh: Upper Body" maxLength={40} required /></label>
      <label className="form-field">Fokus otot<input name="focus" value={form.focus} onChange={handleChange} placeholder="Contoh: Chest, Back, Arms" maxLength={80} required /></label>
      <div className="form-row"><label className="form-field">Durasi (menit)<input name="duration" type="number" min="1" max="300" value={form.duration} onChange={handleChange} required /></label><label className="form-field">Level<select name="level" value={form.level} onChange={handleChange}><option>Pemula</option><option>Menengah</option><option>Berpengalaman</option></select></label></div>
      <label className="form-field">Deskripsi<textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Detail program (opsional)." maxLength={220} /></label>
      <div className="modal-actions"><button className="button button-secondary" type="button" onClick={onCancel}>Batal</button><button className="button button-primary" type="submit">Simpan program</button></div>
    </form>
  );
}

function WeeklyRecommendation({ profile, onExplore }) {
  const plan = getWeeklyPlan(profile);
  const focusCopy = getFocusCopy(profile);
  return (
    <section className="recommended-program panel">
      <div className="recommended-heading"><div><p className="eyebrow">MADE AROUND YOUR ROUTINE</p><h3>Program yang disarankan untukmu</h3><p>{focusCopy.body}</p></div><span className="recommendation-stamp"><Activity size={20}/></span></div>
      <div className="recommended-day-grid">{plan.map((day) => {
        const names = day.exerciseIds.map((id) => EXERCISES.find((item) => item.id === id)?.name).filter(Boolean).slice(0, 4);
        return <article className={`recommended-day ${day.kind === 'cardio' ? 'recommended-day-cardio' : ''}`} key={day.day}><div className="recommended-day-top"><span>{day.day}</span><small>{day.duration}</small></div><h4>{day.title}</h4><p>{day.note}</p><div className="recommended-exercise-list">{names.map((name) => <span key={name}>{name}</span>)}</div><button type="button" className="text-action" onClick={onExplore}>Lihat demonstrasi <ArrowUpRight size={14}/></button></article>;
      })}</div>
      <div className="recommended-footnote"><HeartPulse size={15}/><span>Rekomendasi awal berdasarkan level {profile.experience || 'Pemula'} dan ketersediaan {profile.weeklyFrequency || 3} hari per minggu. Sesuaikan dengan kondisi tubuh dan waktu pemulihan.</span></div>
    </section>
  );
}

export default function Workout() {
  const { workouts, addWorkout, updateWorkout, deleteWorkout, profile } = useGym();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [search, setSearch] = useState('');
  const filtered = workouts.filter((item) => `${item.name} ${item.focus}`.toLowerCase().includes(search.toLowerCase()));

  function handleSave(input) {
    if (editingWorkout) updateWorkout(editingWorkout.id, input);
    else addWorkout(input);
    setShowForm(false);
    setEditingWorkout(null);
  }

  function handleDelete(id) {
    const selected = workouts.find((item) => item.id === id);
    if (selected && window.confirm(`Hapus program "${selected.name}"? Jadwal yang sudah dibuat tidak ikut terhapus.`)) deleteWorkout(id);
  }

  function handlePlan(workout) { navigate('/schedule', { state: { workoutId: workout.id } }); }

  return (
    <div className="page-stack">
      <section className="page-intro-row"><div><p className="eyebrow">BUILD YOUR ROUTINE</p><h2>Training programs</h2><p className="page-description">Program mingguan disesuaikan dengan profil dan pengalaman latihanmu.</p></div><button className="button button-primary" type="button" onClick={() => { setEditingWorkout(null); setShowForm(true); }}><Plus size={17}/> Create program</button></section>

      <WeeklyRecommendation profile={profile} onExplore={() => navigate('/exercises')}/>

      <section className="workout-toolbar panel panel-toolbar"><div className="toolbar-title"><Dumbbell size={18}/><span><strong>{workouts.length} programs</strong><small>Program latihan tersimpan</small></span></div><label className="search-field"><Search size={16}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari program latihan..." aria-label="Cari program latihan"/></label></section>
      {filtered.length ? <section className="workout-grid">{filtered.map((workout) => <WorkoutCard key={workout.id} workout={workout} onEdit={(selected) => { setEditingWorkout(selected); setShowForm(true); }} onDelete={handleDelete} onPlan={handlePlan}/>)}</section> : <div className="panel empty-state"><ListFilter size={25}/><strong>{search ? 'Program tidak ditemukan' : 'Belum ada program latihan'}</strong><span>{search ? 'Coba gunakan kata kunci lain.' : 'Buat program sendiri atau mulai dari rencana mingguan yang disarankan.'}</span>{!search && <button className="button button-primary" onClick={() => setShowForm(true)} type="button"><Plus size={16}/> Create program</button>}</div>}
      <div className="info-strip"><span className="info-strip-icon"><CalendarDays size={17}/></span><p><strong>Recovery is part of training.</strong> Beri jeda untuk kelompok otot yang sama dan tingkatkan beban hanya ketika teknik gerak sudah stabil.</p></div>
      {showForm && <Modal title={editingWorkout ? 'Edit workout program' : 'Create workout program'} subtitle="Isi informasi dasar untuk program latihanmu." onClose={() => { setShowForm(false); setEditingWorkout(null); }}><WorkoutForm initial={editingWorkout || undefined} onSave={handleSave} onCancel={() => { setShowForm(false); setEditingWorkout(null); }}/></Modal>}
    </div>
  );
}
