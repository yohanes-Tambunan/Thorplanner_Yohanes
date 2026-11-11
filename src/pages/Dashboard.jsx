import { Link } from 'react-router-dom';
import {
  ArrowRight, CalendarDays, CheckCircle2, Clock3, Dumbbell,
  Flame, Plus, Target, TrendingUp,
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { useGym } from '../context/GymContext';
import { formatShortDate, getRelativeDateLabel, getWeekDays, isDateInCurrentWeek } from '../utils/dateUtils';

function WeeklyActivity({ history }) {
  const days = getWeekDays();
  const values = days.map((day) => history
    .filter((item) => item.date === day)
    .reduce((total, item) => total + Number(item.duration || 0), 0));
  const max = Math.max(...values, 60);

  return (
    <div className="weekly-chart">
      <div className="chart-y-labels"><span>60m</span><span>40m</span><span>20m</span><span>0</span></div>
      <div className="chart-bars-area">
        <div className="chart-grid-lines"><i /><i /><i /><i /></div>
        {days.map((day, index) => (
          <div className="chart-day" key={day}>
            <div className="chart-bar-track" title={`${values[index]} menit`}>
              <div className={`chart-bar ${values[index] > 0 ? 'has-value' : ''}`} style={{ height: `${values[index] ? Math.max(12, (values[index] / max) * 100) : 5}%` }} />
            </div>
            <span className="chart-day-label">{new Intl.DateTimeFormat('id-ID', { weekday: 'short' }).format(new Date(`${day}T12:00:00`))}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { workouts, schedules, history, goals, profile } = useGym();
  const completedThisWeek = history.filter((item) => isDateInCurrentWeek(item.date));
  const totalMinutes = completedThisWeek.reduce((sum, item) => sum + Number(item.duration || 0), 0);
  const target = Number(goals.weeklyWorkoutTarget) || 1;
  const goalPercent = Math.min(100, Math.round((completedThisWeek.length / target) * 100));
  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const upcoming = [...schedules]
    .filter((item) => item.status === 'planned' && item.date >= todayISO)
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, 3);
  const recent = [...history].sort((a, b) => `${b.date}T${b.completedAt || ''}`.localeCompare(`${a.date}T${a.completedAt || ''}`)).slice(0, 4);
  const firstName = (profile.name || 'Member').trim().split(' ')[0];

  return (
    <div className="page-stack">
      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="welcome-kicker"><span className="live-dot" /> YOUR TRAINING SPACE</span>
          <h2>Keep showing up,<br /><em>{firstName}.</em></h2>
          <p>Set your pace, follow your plan, and make every session count.</p>
          <div className="welcome-actions">
            <Link className="button button-primary" to="/workouts"><Plus size={16} /> Plan a workout</Link>
            <Link className="button button-ghost" to="/progress">View progress <ArrowRight size={15} /></Link>
          </div>
        </div>
        <div className="welcome-visual" aria-hidden="true">
          <div className="welcome-ring ring-outer" />
          <div className="welcome-ring ring-inner" />
          <div className="welcome-disc"><Dumbbell size={76} strokeWidth={1.1} /></div>
          <span className="visual-caption caption-top">MOVE WITH PURPOSE</span>
          <span className="visual-caption caption-bottom">01 — CONSISTENCY</span>
          <span className="visual-spark spark-one">✳</span>
          <span className="visual-spark spark-two">+</span>
        </div>
        <div className="banner-index">FIT / 001</div>
      </section>

      <section className="stats-grid" aria-label="Ringkasan aktivitas">
        <StatCard label="Workout this week" value={completedThisWeek.length} helper="Sesi yang sudah selesai" icon={Dumbbell} trend={`${goalPercent}% of goal`} />
        <StatCard label="Training minutes" value={`${totalMinutes} min`} helper="Total durasi minggu ini" icon={Clock3} accent="orange" />
        <StatCard label="Active programs" value={workouts.length} helper="Program latihan tersimpan" icon={Target} accent="blue" />
        <StatCard label="Weekly target" value={`${goalPercent}%`} helper={`${completedThisWeek.length} dari ${target} sesi`} icon={Flame} accent="purple" />
      </section>

      <section className="dashboard-grid">
        <article className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">YOUR CONSISTENCY</p>
              <h2>Weekly activity</h2>
              <p className="panel-subtitle">Durasi latihan yang sudah dicatat minggu ini.</p>
            </div>
            <span className="panel-icon"><TrendingUp size={18} /></span>
          </div>
          <WeeklyActivity history={history} />
          <div className="chart-footer">
            <div><strong>{totalMinutes} min</strong><span>Total this week</span></div>
            <div><strong>{completedThisWeek.length} sessions</strong><span>Completed</span></div>
            <Link to="/history" className="inline-link">View history <ArrowRight size={14} /></Link>
          </div>
        </article>

        <article className="panel goal-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">STAY ON TRACK</p>
              <h2>Weekly goal</h2>
            </div>
            <span className="panel-icon"><Target size={18} /></span>
          </div>
          <div className="goal-progress-wrap">
            <div className="goal-progress-ring" style={{ '--progress': `${goalPercent * 3.6}deg` }}>
              <div><strong>{goalPercent}%</strong><span>complete</span></div>
            </div>
            <div className="goal-progress-copy">
              <strong>{completedThisWeek.length} of {target} sessions</strong>
              <p>{goalPercent >= 100 ? 'Target mingguanmu sudah tercapai. Pertahankan ritmenya!' : `${Math.max(0, target - completedThisWeek.length)} sesi lagi untuk mencapai target minggu ini.`}</p>
              <Link to="/goals" className="inline-link">Manage goals <ArrowRight size={14} /></Link>
            </div>
          </div>
          <div className="goal-footnote"><CheckCircle2 size={15} /> Progress dihitung dari riwayat latihan yang selesai.</div>
        </article>
      </section>

      <section className="dashboard-grid lower-dashboard-grid">
        <article className="panel schedule-panel">
          <div className="panel-heading panel-heading-row">
            <div>
              <p className="eyebrow">UP NEXT</p>
              <h2>Upcoming sessions</h2>
            </div>
            <Link to="/schedule" className="inline-link">Full schedule <ArrowRight size={14} /></Link>
          </div>
          {upcoming.length ? (
            <div className="upcoming-list">
              {upcoming.map((item) => (
                <div className="upcoming-item" key={item.id}>
                  <div className="upcoming-date"><strong>{formatShortDate(item.date).split(' ')[0]}</strong><span>{formatShortDate(item.date).split(' ').slice(1).join(' ')}</span></div>
                  <div className="upcoming-info"><strong>{item.workoutName}</strong><span>{item.focus}</span></div>
                  <div className="upcoming-time"><Clock3 size={14} /> {item.time}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state compact-empty"><CalendarDays size={22} /><strong>No sessions planned</strong><span>Tambahkan jadwal agar latihanmu lebih terarah.</span><Link to="/schedule" className="text-button">Create schedule <ArrowRight size={14} /></Link></div>
          )}
        </article>

        <article className="panel history-panel">
          <div className="panel-heading panel-heading-row">
            <div>
              <p className="eyebrow">KEEP MOVING</p>
              <h2>Recent activity</h2>
            </div>
            <Link to="/history" className="inline-link">See all <ArrowRight size={14} /></Link>
          </div>
          {recent.length ? (
            <div className="recent-list">
              {recent.map((item) => (
                <div className="recent-item" key={item.id}>
                  <div className="recent-icon"><CheckCircle2 size={17} /></div>
                  <div className="recent-info"><strong>{item.workoutName}</strong><span>{getRelativeDateLabel(item.date)} · {item.duration} min</span></div>
                  <span className="completed-tag">Done</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state compact-empty"><Dumbbell size={22} /><strong>Belum ada riwayat</strong><span>Riwayat akan muncul setelah kamu menyelesaikan jadwal.</span></div>
          )}
        </article>
      </section>
      <p className="dashboard-note">One session at a time. Your progress is built in the small things.</p>
    </div>
  );
}
