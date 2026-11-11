import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, CheckCircle2, Flame, Pencil, Target, Weight } from 'lucide-react';
import { useGym } from '../context/GymContext';
import { formatDate, isDateInCurrentWeek } from '../utils/dateUtils';

export default function Goals() {
  const { goals, updateGoals, history, measurements, profile } = useGym();
  const [editing, setEditing] = useState(false);
  const [weeklyTarget, setWeeklyTarget] = useState(String(goals.weeklyWorkoutTarget));
  const [targetWeight, setTargetWeight] = useState(goals.targetWeight ? String(goals.targetWeight) : '');
  const [targetDate, setTargetDate] = useState(goals.targetDate || '');
  const completedThisWeek = history.filter((item) => isDateInCurrentWeek(item.date)).length;
  const weeklyPercent = Math.min(100, Math.round((completedThisWeek / Math.max(1, Number(goals.weeklyWorkoutTarget))) * 100));
  const currentWeight = measurements.length ? Number(measurements[measurements.length - 1].weight) : Number(profile.weight) || null;
  const targetWeightDifference = currentWeight === null || !goals.targetWeight ? null : currentWeight - Number(goals.targetWeight);

  function save(event) {
    event.preventDefault();
    updateGoals({ weeklyWorkoutTarget: Math.min(14, Math.max(1, Number(weeklyTarget) || 1)), targetWeight: targetWeight.trim() ? Number(targetWeight) : null, targetDate });
    setEditing(false);
  }

  return (
    <div className="page-stack">
      <section className="page-intro-row"><div><p className="eyebrow">DEFINE YOUR DIRECTION</p><h2>Personal goals</h2><p className="page-description">Target yang realistis membantu kamu tetap fokus dan konsisten.</p></div><button className="button button-secondary" type="button" onClick={() => setEditing((value) => !value)}><Pencil size={16} /> {editing ? 'Close editor' : 'Edit goals'}</button></section>
      <section className="goal-hero-card"><div className="goal-hero-copy"><span className="goal-hero-kicker"><Target size={15} /> WEEKLY COMMITMENT</span><h2>Consistency<br /><em>over intensity.</em></h2><p>Target bukan tentang menjadi sempurna. Target membantu kamu kembali ke jalur saat rutinitas terasa sulit.</p></div><div className="goal-hero-progress"><div className="goal-hero-circle" style={{ '--progress': `${weeklyPercent * 3.6}deg` }}><div><strong>{weeklyPercent}%</strong><span>this week</span></div></div><div className="goal-hero-count"><strong>{completedThisWeek}<span> / {goals.weeklyWorkoutTarget}</span></strong><small>sessions completed</small></div></div><span className="goal-hero-decoration">FIT / GOALS</span></section>

      {editing && <form className="panel goal-editor form-stack" onSubmit={save}><div className="panel-heading"><div><p className="eyebrow">MAKE IT YOURS</p><h2>Update your targets</h2></div></div><div className="form-row"><label className="form-field">Target latihan per minggu<input type="number" min="1" max="14" value={weeklyTarget} onChange={(event) => setWeeklyTarget(event.target.value)} required /><small className="field-hint">Pilih 1–14 sesi per minggu.</small></label><label className="form-field">Target berat badan (kg)<input type="number" min="20" max="300" step="0.1" value={targetWeight} onChange={(event) => setTargetWeight(event.target.value)} placeholder="Opsional" /></label></div><label className="form-field">Tanggal target (opsional)<input type="date" value={targetDate} onChange={(event) => setTargetDate(event.target.value)} /></label><div className="modal-actions"><button className="button button-secondary" type="button" onClick={() => setEditing(false)}>Cancel</button><button className="button button-primary" type="submit">Save goals</button></div></form>}

      <section className="goals-grid"><article className="panel individual-goal-card"><div className="individual-goal-heading"><span className="goal-card-icon goal-card-lime"><Flame size={19} /></span><span className="goal-status">IN PROGRESS</span></div><p className="eyebrow">TRAINING FREQUENCY</p><h3>{goals.weeklyWorkoutTarget} <small>sessions / week</small></h3><p>Bangun rutinitas yang bisa kamu pertahankan, dengan waktu istirahat yang cukup.</p><div className="simple-progress-track"><span style={{ width: `${weeklyPercent}%` }} /></div><div className="goal-card-footer"><span>{completedThisWeek} completed</span><strong>{weeklyPercent}%</strong></div></article>
        <article className="panel individual-goal-card"><div className="individual-goal-heading"><span className="goal-card-icon goal-card-blue"><Weight size={19} /></span><span className="goal-status">PERSONAL TARGET</span></div><p className="eyebrow">BODY WEIGHT</p><h3>{goals.targetWeight ? Number(goals.targetWeight).toFixed(1) : 'Belum diatur'} <small>kg target</small></h3><p>{!goals.targetWeight ? 'Tentukan target berat badanmu sendiri bila memang diperlukan; tidak ada angka target bawaan.' : currentWeight === null ? 'Tambahkan pengukuran pertama untuk membandingkan progres.' : `Berat terakhir ${currentWeight.toFixed(1)} kg${targetWeightDifference === 0 ? ', tepat di target.' : targetWeightDifference > 0 ? `, selisih ${targetWeightDifference.toFixed(1)} kg dari target.` : `, ${Math.abs(targetWeightDifference).toFixed(1)} kg di bawah target.`}`}</p><div className="goal-target-date"><CalendarDays size={15} /><span>{goals.targetDate ? `Target date: ${formatDate(goals.targetDate)}` : 'Belum ada tanggal target'}</span></div><div className="goal-card-footer"><span>See your measurements</span><Link to="/progress">Open progress ↗</Link></div></article></section>
      <div className="info-strip"><span className="info-strip-icon"><CheckCircle2 size={17} /></span><p><strong>Set goals that support your wellbeing.</strong> Perubahan target bisa dilakukan kapan saja sesuai kondisi dan kemampuanmu.</p></div>
    </div>
  );
}
