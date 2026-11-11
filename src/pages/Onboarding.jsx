import { useMemo, useState } from 'react';
import { Activity, ArrowLeft, ArrowRight, Check, Dumbbell, HeartPulse, UserRound, Weight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGym } from '../context/GymContext';
import { calculateBMI, getBMICategory, getFocusCopy, getWeeklyPlan } from '../utils/personalization';

const initialForm = {
  name: '', gender: '', age: '', weight: '', height: '', experience: '', weeklyFrequency: '3',
};

const levels = [
  { value: 'Pemula', title: 'Pemula', detail: 'Baru mulai atau belum rutin latihan', icon: '01' },
  { value: 'Menengah', title: 'Menengah', detail: 'Sudah konsisten dan mengenal teknik dasar', icon: '02' },
  { value: 'Berpengalaman', title: 'Berpengalaman', detail: 'Sudah rutin dan memahami progres latihan', icon: '03' },
];

function Field({ label, children, hint }) {
  return <label className="onboard-field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const { profile, updateProfile, updateGoals } = useGym();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ ...initialForm, ...profile, weeklyFrequency: String(profile.weeklyFrequency || 3) });
  const [error, setError] = useState('');

  const bmi = useMemo(() => calculateBMI(form.weight, form.height), [form.weight, form.height]);
  const bmiInfo = useMemo(() => getBMICategory(bmi, form.age), [bmi, form.age]);
  const focusCopy = getFocusCopy({ bmiCategory: bmiInfo.key });
  const weekPlan = getWeeklyPlan({ experience: form.experience || 'Pemula', weeklyFrequency: form.weeklyFrequency, bmiCategory: bmiInfo.key });

  function change(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setError('');
  }

  function goNext() {
    if (step === 1) {
      if (!form.name.trim() || !form.gender || !form.age || Number(form.age) < 13 || Number(form.age) > 100) {
        setError('Isi nama, gender, dan usia dengan benar sebelum melanjutkan.');
        return;
      }
    }
    if (step === 2) {
      if (!form.weight || !form.height || Number(form.weight) < 20 || Number(form.weight) > 300 || Number(form.height) < 100 || Number(form.height) > 250) {
        setError('Masukkan berat 20–300 kg dan tinggi 100–250 cm.');
        return;
      }
    }
    if (step === 3 && !form.experience) {
      setError('Pilih tingkat pengalaman gym terlebih dahulu.');
      return;
    }
    setError('');
    setStep((current) => Math.min(4, current + 1));
  }

  function finish() {
    const numericBMI = calculateBMI(form.weight, form.height);
    const category = getBMICategory(numericBMI, form.age);
    updateProfile({
      name: form.name.trim(),
      gender: form.gender,
      age: Number(form.age),
      height: Number(form.height),
      weight: Number(form.weight),
      bmi: numericBMI,
      bmiCategory: category.key,
      experience: form.experience,
      weeklyFrequency: Number(form.weeklyFrequency),
      fitnessGoal: category.key === 'underweight' ? 'Meningkatkan massa otot' : category.key === 'overweight' || category.key === 'obesity' ? 'Meningkatkan kebugaran dan kardio' : 'Kebugaran seimbang',
      onboardingComplete: true,
      joinedAt: new Date().toISOString(),
    });
    updateGoals({ weeklyWorkoutTarget: Number(form.weeklyFrequency) });
    navigate('/exercises', { replace: true });
  }

  return (
    <main className="onboarding-shell">
      <aside className="onboarding-aside">
        <div className="onboarding-brand"><span><Dumbbell size={23} /></span><strong>fitplanner<span>.</span></strong></div>
        <div className="onboarding-aside-copy">
          <p className="onboarding-kicker">YOUR TRAINING STARTS HERE</p>
          <h1>Build a routine<br />that <em>fits you.</em></h1>
          <p>Kenali profil tubuhmu, pilih ritme latihan, lalu mulai dengan rencana yang realistis.</p>
        </div>
        <div className="onboarding-quote"><span>“</span><p>Progress is personal.<br />Your plan should be, too.</p></div>
        <div className="onboarding-aside-foot"><span>01 / PERSONAL FITNESS PROFILE</span><span>FITPLANNER © 2026</span></div>
      </aside>

      <section className="onboarding-main">
        <div className="onboarding-topline"><span>LET'S SET UP YOUR SPACE</span><span>STEP {step} OF 4</span></div>
        <div className="onboarding-progress"><span style={{ width: `${step * 25}%` }} /></div>

        {step === 1 && (
          <div className="onboarding-content">
            <div className="onboarding-heading"><span className="onboard-icon"><UserRound size={20} /></span><p className="eyebrow">01 — ABOUT YOU</p><h2>Kenalan dulu, yuk.</h2><p>Isi profil dasar agar pengalaman FitPlanner terasa lebih personal.</p></div>
            <div className="onboard-form-grid">
              <Field label="Nama lengkap"><input autoFocus name="name" value={form.name} onChange={change} placeholder="Nama yang ingin kami gunakan" maxLength="50" /></Field>
              <Field label="Usia" hint="Dibutuhkan untuk menentukan cara membaca hasil BMI."><input name="age" type="number" min="13" max="100" value={form.age} onChange={change} placeholder="Contoh: 21" /></Field>
            </div>
            <Field label="Gender"><div className="onboard-choice-grid three-choice">
              {[['Laki-laki', 'Pria'], ['Perempuan', 'Wanita'], ['Memilih tidak menjawab', 'Prefer not to say']].map(([value, label]) => <button key={value} type="button" className={`onboard-choice ${form.gender === value ? 'selected' : ''}`} onClick={() => setForm((current) => ({ ...current, gender: value }))}><span className="choice-check">{form.gender === value ? <Check size={13} /> : null}</span><strong>{label}</strong></button>)}
            </div></Field>
            <p className="onboard-helper">Gender hanya disimpan dalam profil. Gerakan dan volume latihan tidak dibedakan secara otomatis berdasarkan gender; rekomendasi mengikuti pengalaman, frekuensi, dan kondisi masing-masing.</p>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-content">
            <div className="onboarding-heading"><span className="onboard-icon"><Weight size={20} /></span><p className="eyebrow">02 — BODY METRICS</p><h2>Kenali titik awalmu.</h2><p>Masukkan tinggi dan berat badan untuk menghitung Body Mass Index (BMI).</p></div>
            <div className="onboard-form-grid">
              <Field label="Berat badan" hint="Satuan kilogram (kg)."><div className="input-with-unit"><input autoFocus name="weight" type="number" min="20" max="300" step="0.1" value={form.weight} onChange={change} placeholder="70" /><span>kg</span></div></Field>
              <Field label="Tinggi badan" hint="Satuan sentimeter (cm)."><div className="input-with-unit"><input name="height" type="number" min="100" max="250" step="0.1" value={form.height} onChange={change} placeholder="170" /><span>cm</span></div></Field>
            </div>
            <div className="bmi-preview">
              <div className="bmi-preview-head"><span><Activity size={17} /> BMI CALCULATOR</span><small>Berat ÷ tinggi²</small></div>
              <div className="bmi-number-row"><strong>{bmi == null ? '—' : bmi.toFixed(1)}</strong><span>{bmi == null ? 'Masukkan data tubuhmu' : bmiInfo.label}</span></div>
              {bmi != null && <p>{bmiInfo.description}</p>}
              {bmiInfo.key !== 'youth' && <><div className="bmi-scale"><i className="under"/><i className="normal"/><i className="over"/><i className="obese"/></div><div className="bmi-scale-labels"><span>Kurang</span><span>Sehat</span><span>Berlebih</span><span>Obesitas</span></div></>}
            </div>
            <p className="onboard-helper">BMI adalah alat skrining sederhana, bukan diagnosis.</p>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-content">
            <div className="onboarding-heading"><span className="onboard-icon"><Zap size={20} /></span><p className="eyebrow">03 — TRAINING HABITS</p><h2>Atur ritme latihanmu.</h2><p>Kami akan menyesuaikan jumlah set, repetisi, dan pembagian latihan dari pilihan ini.</p></div>
            <Field label="Seberapa berpengalaman kamu di gym?"><div className="onboard-level-list">{levels.map((level) => <button key={level.value} type="button" className={`onboard-level ${form.experience === level.value ? 'selected' : ''}`} onClick={() => setForm((current) => ({ ...current, experience: level.value }))}><span className="level-number">{level.icon}</span><span className="level-copy"><strong>{level.title}</strong><small>{level.detail}</small></span><span className="choice-check">{form.experience === level.value ? <Check size={13} /> : null}</span></button>)}</div></Field>
            <Field label="Berapa kali seminggu kamu bisa ke gym?"><div className="frequency-grid">{[1, 2, 3, 4, 5, 6].map((value) => <button key={value} type="button" className={`frequency-option ${Number(form.weeklyFrequency) === value ? 'selected' : ''}`} onClick={() => setForm((current) => ({ ...current, weeklyFrequency: String(value) }))}><strong>{value}</strong><span>{value === 1 ? 'hari' : 'hari'}</span></button>)}</div></Field>
            <p className="onboard-helper">Pilih jumlah hari yang realistis. Hari istirahat tetap bagian penting dari program latihan.</p>
          </div>
        )}

        {step === 4 && (
          <div className="onboarding-content">
            <div className="onboarding-heading"><span className="onboard-icon"><HeartPulse size={20} /></span><p className="eyebrow">04 — YOUR STARTING PLAN</p><h2>Ini titik awalmu, {form.name.split(' ')[0]}.</h2><p>Ringkasan profil dan gambaran program yang akan kamu temukan di FitPlanner.</p></div>
            <div className="onboard-summary-grid">
              <div><small>BODY MASS INDEX</small><strong>{bmi?.toFixed(1) || '—'}</strong><span>{bmiInfo.label}</span></div>
              <div><small>EXPERIENCE</small><strong>{form.experience}</strong><span>{form.weeklyFrequency} kali per minggu</span></div>
            </div>
            <div className="onboard-recommendation"><span className="recommendation-icon"><Activity size={19}/></span><div><small>{focusCopy.tag}</small><strong>{focusCopy.title}</strong><p>{focusCopy.body}</p></div></div>
            <div className="onboard-week-preview"><div className="week-preview-heading"><strong>Rencana mingguan awal</strong><span>{weekPlan.length} sesi</span></div>{weekPlan.map((day) => <div className="week-preview-row" key={day.day}><strong>{day.day}</strong><span>{day.title}</span><small>{day.duration}</small></div>)}</div>
            <p className="onboard-helper">Rencana ini adalah titik awal umum. Sesuaikan beban agar teknik tetap baik dan berhenti bila muncul nyeri atau gejala yang tidak biasa.</p>
          </div>
        )}

        {error && <div className="onboard-error" role="alert">{error}</div>}
        <div className="onboarding-footer">
          {step > 1 ? <button type="button" className="button button-secondary" onClick={() => { setError(''); setStep((current) => current - 1); }}><ArrowLeft size={16} /> Kembali</button> : <span className="onboarding-secure">Data disimpan di browser perangkat ini.</span>}
          {step < 4 ? <button type="button" className="button button-primary" onClick={goNext}>Lanjutkan <ArrowRight size={16} /></button> : <button type="button" className="button button-primary" onClick={finish}>Masuk ke FitPlanner <ArrowRight size={16} /></button>}
        </div>
      </section>
    </main>
  );
}
