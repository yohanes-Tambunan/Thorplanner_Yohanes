import { useMemo, useState } from 'react';
import { Activity, ArrowUpRight, HeartPulse, Search, ShieldCheck, X } from 'lucide-react';
import ExerciseCard from '../components/ExerciseCard';
import Modal from '../components/Modal';
import { EXERCISES, MUSCLE_GROUPS } from '../data/exercises';
import { useGym } from '../context/GymContext';
import { getFocusCopy, getTrainingDose, getWeeklyPlan } from '../utils/personalization';

function ExerciseDetail({ exercise, dose }) {
  return (
    <div className="exercise-detail">
      <div className="exercise-detail-meta"><span className="filter-chip active">{exercise.muscle}</span><span className="filter-chip">{exercise.equipment}</span><span className="filter-chip">{exercise.type === 'cardio' ? 'Cardio' : 'Strength'}</span></div>
      <p className="exercise-detail-description">{exercise.description}</p>
      <div className="exercise-prescription">
        <div><strong>{dose.sets}</strong><span>{exercise.type === 'cardio' ? 'Sesi' : 'Sets'}</span></div>
        <div><strong>{dose.reps}</strong><span>{exercise.type === 'cardio' ? 'Durasi' : 'Repetisi'}</span></div>
        <div><strong>{dose.rest}</strong><span>Istirahat</span></div>
      </div>
      <div className="exercise-video-block">
        <div className="exercise-video-heading"><span><Activity size={16}/> VIDEO DEMONSTRASI</span><small>{exercise.videoSource}</small></div>
        <div className="exercise-video-frame">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${exercise.videoId}${exercise.videoStart ? `?start=${exercise.videoStart}` : ''}`}
            title={`Tutorial ${exercise.name}`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <a className="video-external-link" href={`https://www.youtube.com/watch?v=${exercise.videoId}${exercise.videoStart ? `&t=${exercise.videoStart}s` : ''}`} target="_blank" rel="noreferrer">Buka video di YouTube <ArrowUpRight size={14}/></a>
      </div>
      <h3>Langkah penggunaan</h3>
      <ol className="instruction-list">{exercise.instructions.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span>{step}</li>)}</ol>
      <p className="safety-note"><ShieldCheck size={15}/> Pilih beban yang masih bisa dikontrol. Minta bantuan instruktur untuk mengatur mesin atau mempelajari teknik baru, dan hentikan latihan jika terasa nyeri.</p>
    </div>
  );
}

export default function Exercise() {
  const { profile } = useGym();
  const [search, setSearch] = useState('');
  const [activeGroup, setActiveGroup] = useState('Semua');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const focusCopy = getFocusCopy(profile);
  const weeklyPlan = getWeeklyPlan(profile);
  const recommendedExerciseIds = new Set(weeklyPlan.flatMap((day) => day.exerciseIds));

  const filtered = useMemo(() => EXERCISES.filter((exercise) => {
    const matchesGroup = activeGroup === 'Semua' || exercise.muscle === activeGroup;
    const matchesSearch = `${exercise.name} ${exercise.muscle} ${exercise.equipment}`.toLowerCase().includes(search.toLowerCase());
    return matchesGroup && matchesSearch;
  }), [activeGroup, search]);

  return (
    <div className="page-stack">
      <section className="page-intro-row">
        <div><p className="eyebrow">MOVE WITH PURPOSE</p><h2>Exercise library</h2><p className="page-description">Pilih gerakan, pelajari cara pakainya lewat video, lalu ikuti dosis latihan sesuai levelmu.</p></div>
        <div className="exercise-total"><Activity size={18}/><strong>{EXERCISES.length}</strong><span>gerakan</span></div>
      </section>

      <section className="personal-plan-banner panel">
        <div className="personal-plan-copy"><span className="plan-tag">{focusCopy.tag}</span><h3>{focusCopy.title}</h3><p>{focusCopy.body}</p><div className="personal-plan-meta"><span>{profile.experience || 'Pemula'}</span><span>{profile.weeklyFrequency || 3} hari / minggu</span><span>{profile.gender || 'Gender tidak diisi'}</span></div></div>
        <div className="plan-focus-icon"><HeartPulse size={35}/></div>
      </section>

      <section className="weekly-plan-strip panel">
        <div className="weekly-plan-title"><div><p className="eyebrow">YOUR WEEK AT A GLANCE</p><h3>Rencana latihan mingguan</h3></div><span>{weeklyPlan.length} sesi terencana</span></div>
        <div className="weekly-plan-days">{weeklyPlan.map((day) => <article key={day.day} className={`weekly-plan-day ${day.kind === 'cardio' ? 'cardio-day' : ''}`}><small>{day.day}</small><strong>{day.title}</strong><span>{day.duration}</span></article>)}</div>
      </section>

      <section className="exercise-controls panel">
        <label className="search-field exercise-search"><Search size={17}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari gerakan atau alat gym..." aria-label="Cari latihan"/>{search && <button type="button" onClick={() => setSearch('')} aria-label="Hapus pencarian"><X size={15}/></button>}</label>
        <div className="filter-row" aria-label="Filter kelompok otot">{MUSCLE_GROUPS.map((group) => <button key={group} type="button" className={`filter-chip ${activeGroup === group ? 'active' : ''}`} onClick={() => setActiveGroup(group)}>{group}</button>)}</div>
      </section>

      {filtered.length ? <section className="exercise-grid">{filtered.map((exercise) => {
        const dose = getTrainingDose(profile, exercise);
        return <ExerciseCard key={exercise.id} exercise={{ ...exercise, sets: dose.sets, reps: dose.reps, trainingLevel: profile.experience || 'Pemula', isRecommended: recommendedExerciseIds.has(exercise.id) }} onSelect={() => setSelectedExercise(exercise)} />;
      })}</section> : <div className="panel empty-state"><Search size={25}/><strong>Gerakan tidak ditemukan</strong><span>Coba kata kunci atau kelompok otot yang berbeda.</span></div>}

      <div className="info-strip"><span className="info-strip-icon"><ShieldCheck size={17}/></span><p><strong>Jaga teknik sebelum menambah beban.</strong> Jumlah set dan repetisi di atas merupakan saran awal berdasarkan level, bukan target yang harus dipaksakan.</p></div>

      {selectedExercise && <Modal title={selectedExercise.name} subtitle={`${selectedExercise.muscle} · ${selectedExercise.equipment}`} onClose={() => setSelectedExercise(null)}><ExerciseDetail exercise={selectedExercise} dose={getTrainingDose(profile, selectedExercise)}/></Modal>}
    </div>
  );
}
