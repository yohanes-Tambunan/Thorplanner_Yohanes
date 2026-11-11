import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { createInitialData } from '../data/initialData';
import { calculateBMI, getBMICategory } from '../utils/personalization';

const GymContext = createContext(null);
const STORAGE_KEY = 'ThorPlanner-data-v1';

function readSavedData() {
  if (typeof window === 'undefined') return createInitialData();
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return createInitialData();
    const parsed = JSON.parse(saved);
    const initial = createInitialData();
    return {
      ...initial,
      ...parsed,
      workouts: Array.isArray(parsed.workouts) ? parsed.workouts : initial.workouts,
      schedules: Array.isArray(parsed.schedules) ? parsed.schedules : initial.schedules,
      history: Array.isArray(parsed.history) ? parsed.history : initial.history,
      measurements: Array.isArray(parsed.measurements) ? parsed.measurements : initial.measurements,
      goals: { ...initial.goals, ...(parsed.goals || {}) },
      profile: { ...initial.profile, ...(parsed.profile || {}) },
    };
  } catch {
    return createInitialData();
  }
}

export function GymProvider({ children }) {
  const [data, setData] = useState(readSavedData);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.warn('Data ThorPlanner tidak dapat disimpan ke localStorage.', error);
    }
  }, [data]);

  const notify = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  const addWorkout = useCallback((input) => {
    const workout = { ...input, id: `workout-${Date.now()}` };
    setData((current) => ({ ...current, workouts: [workout, ...current.workouts] }));
    notify('Program latihan berhasil ditambahkan.');
    return workout;
  }, [notify]);

  const updateWorkout = useCallback((id, input) => {
    setData((current) => ({
      ...current,
      workouts: current.workouts.map((item) => item.id === id ? { ...item, ...input } : item),
    }));
    notify('Program latihan berhasil diperbarui.');
  }, [notify]);

  const deleteWorkout = useCallback((id) => {
    setData((current) => ({
      ...current,
      workouts: current.workouts.filter((item) => item.id !== id),
    }));
    notify('Program latihan dihapus.');
  }, [notify]);

  const addSchedule = useCallback((input) => {
    const schedule = { ...input, id: `schedule-${Date.now()}`, status: 'planned' };
    setData((current) => ({ ...current, schedules: [...current.schedules, schedule] }));
    notify('Jadwal latihan berhasil dibuat.');
  }, [notify]);

  const updateSchedule = useCallback((id, input) => {
    setData((current) => ({
      ...current,
      schedules: current.schedules.map((item) => item.id === id ? { ...item, ...input } : item),
    }));
    notify('Jadwal latihan berhasil diperbarui.');
  }, [notify]);

  const deleteSchedule = useCallback((id) => {
    setData((current) => ({
      ...current,
      schedules: current.schedules.filter((item) => item.id !== id),
    }));
    notify('Jadwal latihan dihapus.');
  }, [notify]);

  const completeSchedule = useCallback((id) => {
    setData((current) => {
      const selected = current.schedules.find((item) => item.id === id);
      if (!selected || selected.status === 'completed') return current;
      const historyEntry = {
        id: `history-${Date.now()}`,
        workoutName: selected.workoutName,
        focus: selected.focus,
        date: selected.date,
        duration: Number(selected.duration) || 0,
        completedAt: new Date().toISOString(),
      };
      return {
        ...current,
        schedules: current.schedules.map((item) => item.id === id ? { ...item, status: 'completed' } : item),
        history: [historyEntry, ...current.history],
      };
    });
    notify('Latihan selesai. Riwayat dan dashboard sudah diperbarui.');
  }, [notify]);

  const addMeasurement = useCallback((input) => {
    setData((current) => {
      const latestMeasurement = current.measurements.reduce(
        (latest, item) => (!latest || item.date > latest.date ? item : latest),
        null,
      );
      const shouldUpdateCurrentWeight = !latestMeasurement || input.date >= latestMeasurement.date;
      return {
        ...current,
        measurements: [...current.measurements, { ...input, id: `measurement-${Date.now()}` }]
          .sort((a, b) => a.date.localeCompare(b.date)),
        profile: shouldUpdateCurrentWeight
          ? (() => {
              const nextWeight = Number(input.weight);
              const bmi = calculateBMI(nextWeight, current.profile.height);
              const bmiCategory = getBMICategory(bmi, current.profile.age).key;
              return { ...current.profile, weight: nextWeight, bmi, bmiCategory };
            })()
          : current.profile,
      };
    });
    notify('Catatan berat badan berhasil disimpan.');
  }, [notify]);

  const updateGoals = useCallback((input) => {
    setData((current) => ({ ...current, goals: { ...current.goals, ...input } }));
    notify('Target kebugaran berhasil diperbarui.');
  }, [notify]);

  const updateProfile = useCallback((input) => {
    setData((current) => ({ ...current, profile: { ...current.profile, ...input } }));
    notify('Profil berhasil diperbarui.');
  }, [notify]);

  const dismissToast = useCallback(() => setToast(null), []);

  const value = useMemo(() => ({
    ...data,
    toast,
    notify,
    dismissToast,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    addSchedule,
    updateSchedule,
    deleteSchedule,
    completeSchedule,
    addMeasurement,
    updateGoals,
    updateProfile,
  }), [
    data, toast, notify, dismissToast, addWorkout, updateWorkout, deleteWorkout,
    addSchedule, updateSchedule, deleteSchedule, completeSchedule, addMeasurement,
    updateGoals, updateProfile,
  ]);

  return <GymContext.Provider value={value}>{children}</GymContext.Provider>;
}

export function useGym() {
  const context = useContext(GymContext);
  if (!context) throw new Error('useGym harus digunakan di dalam GymProvider.');
  return context;
}
