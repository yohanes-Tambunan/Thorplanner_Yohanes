import { useMemo, useState } from 'react';
import { Activity, CalendarDays, Pencil, Ruler, Save, UserRound, Weight, Users } from 'lucide-react';
import { useGym } from '../context/GymContext';
import { calculateBMI, getBMICategory } from '../utils/personalization';

export default function Profile() {
  const { profile, updateProfile, history } = useGym();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(profile);
  const currentBMI = useMemo(() => calculateBMI(profile.weight, profile.height), [profile.weight, profile.height]);
  const currentBMIInfo = getBMICategory(currentBMI, profile.age);

  function startEditing() { setForm(profile); setEditing(true); }
  function handleChange(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); }

  function handleSubmit(event) {
    event.preventDefault();
    const bmi = calculateBMI(form.weight, form.height);
    const bmiInfo = getBMICategory(bmi, form.age);
    updateProfile({
      ...form,
      name: form.name.trim(),
      age: Number(form.age) || 0,
      height: Number(form.height) || 0,
      weight: Number(form.weight) || 0,
      weeklyFrequency: Number(form.weeklyFrequency) || 3,
      bmi,
      bmiCategory: bmiInfo.key,
    });
    setEditing(false);
  }

  const initials = (profile.name || 'FP').split(' ').filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('');

  return (
    <div className="page-stack">
      <section className="page-intro-row"><div><p className="eyebrow">YOUR SPACE</p><h2>Personal profile</h2><p className="page-description">Informasi yang digunakan ThorPlanner untuk menyesuaikan rekomendasi latihan.</p></div><button className="button button-secondary" type="button" onClick={startEditing}><Pencil size={16}/> Edit profile</button></section>
      <section className="profile-hero panel"><div className="profile-avatar-large">{initials || 'FP'}</div><div className="profile-hero-info"><span className="profile-member-tag">ThorPlanner MEMBER</span><h2>{profile.name}</h2><p><Users size={15}/> {profile.gender || 'Gender belum diisi'} · {profile.age} tahun</p><span className="profile-since"><CalendarDays size={14}/> Member sejak {profile.joinedAt ? new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date(profile.joinedAt)) : 'hari ini'}</span></div><div className="profile-session-count"><strong>{history.length}</strong><span>Workout sessions<br/>recorded</span></div></section>

      {editing ? (
        <form className="panel profile-form form-stack" onSubmit={handleSubmit}>
          <div className="panel-heading"><div><p className="eyebrow">PROFILE DETAILS</p><h2>Edit your information</h2></div></div>
          <div className="form-row"><label className="form-field">Nama lengkap<input name="name" value={form.name || ''} onChange={handleChange} maxLength={50} required/></label><label className="form-field">Gender<select name="gender" value={form.gender || ''} onChange={handleChange} required><option value="">Pilih gender</option><option>Laki-laki</option><option>Perempuan</option><option>Memilih tidak menjawab</option></select></label></div>
          <div className="form-row three-fields"><label className="form-field">Usia (tahun)<input name="age" type="number" min="13" max="100" value={form.age || ''} onChange={handleChange} required/></label><label className="form-field">Tinggi (cm)<input name="height" type="number" min="100" max="250" value={form.height || ''} onChange={handleChange} required/></label><label className="form-field">Berat (kg)<input name="weight" type="number" min="20" max="300" step="0.1" value={form.weight || ''} onChange={handleChange} required/></label></div>
          <div className="form-row"><label className="form-field">Pengalaman gym<select name="experience" value={form.experience || 'Pemula'} onChange={handleChange}><option>Pemula</option><option>Menengah</option><option>Berpengalaman</option></select></label><label className="form-field">Frekuensi per minggu<select name="weeklyFrequency" value={form.weeklyFrequency || 3} onChange={handleChange}>{[1,2,3,4,5,6].map((n) => <option key={n} value={n}>{n} kali per minggu</option>)}</select></label></div>
          <div className="modal-actions"><button className="button button-secondary" type="button" onClick={() => setEditing(false)}>Batal</button><button className="button button-primary" type="submit"><Save size={16}/> Simpan perubahan</button></div>
        </form>
      ) : (
        <>
          <section className="profile-details-grid">
            <article className="panel profile-detail-card"><div className="profile-detail-icon"><UserRound size={18}/></div><span>Pengalaman</span><strong className="profile-goal-value">{profile.experience || '—'}</strong></article>
            <article className="panel profile-detail-card"><div className="profile-detail-icon"><Ruler size={18}/></div><span>Tinggi badan</span><strong>{profile.height || '—'} <small>cm</small></strong></article>
            <article className="panel profile-detail-card"><div className="profile-detail-icon"><Weight size={18}/></div><span>Berat badan</span><strong>{Number(profile.weight) ? Number(profile.weight).toFixed(1) : '—'} <small>kg</small></strong></article>
            <article className="panel profile-detail-card"><div className="profile-detail-icon"><Activity size={18}/></div><span>Frekuensi gym</span><strong>{profile.weeklyFrequency || '—'} <small>hari / minggu</small></strong></article>
          </section>
          <section className="panel profile-bmi-panel"><div><p className="eyebrow">BODY MASS INDEX</p><h3>{currentBMI == null ? 'Belum tersedia' : currentBMI.toFixed(1)} <small>BMI</small></h3><span>{currentBMIInfo.label}</span></div><p>{currentBMIInfo.description || 'Lengkapi data tinggi dan berat untuk menghitung BMI.'}</p></section>
        </>
      )}
      <div className="profile-disclaimer"><span><Activity size={17}/></span><p>ThorPlanner menyimpan profil pada browser perangkat ini. BMI hanya alat skrining dan bukan diagnosis. Jika memiliki kondisi kesehatan, sedang hamil, mengalami nyeri, atau ragu memulai latihan, konsultasikan rencana dengan tenaga kesehatan atau instruktur yang kompeten.</p></div>
    </div>
  );
}
