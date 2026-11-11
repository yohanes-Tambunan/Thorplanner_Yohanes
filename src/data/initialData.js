export function createInitialData() {
  const workouts = [
    {
      id: 'workout-push',
      name: 'Push Day',
      focus: 'Chest, Shoulders, Triceps',
      duration: 60,
      level: 'Menengah',
      description: 'Sesi latihan gerakan mendorong untuk membangun kekuatan tubuh bagian atas.',
      exerciseIds: ['ex-chest-press', 'ex-shoulder-press', 'ex-triceps-pushdown'],
    },
    {
      id: 'workout-pull',
      name: 'Pull Day',
      focus: 'Back, Biceps',
      duration: 55,
      level: 'Menengah',
      description: 'Latihan gerakan menarik untuk punggung dan bisep.',
      exerciseIds: ['ex-lat-pulldown', 'ex-seated-row', 'ex-biceps-curl'],
    },
    {
      id: 'workout-legs',
      name: 'Leg Day',
      focus: 'Quadriceps, Hamstring, Glutes',
      duration: 65,
      level: 'Menengah',
      description: 'Sesi latihan tubuh bagian bawah dengan gerakan compound dan aksesori.',
      exerciseIds: ['ex-leg-press', 'ex-squat', 'ex-rdl'],
    },
    {
      id: 'workout-full',
      name: 'Full Body',
      focus: 'Full Body',
      duration: 50,
      level: 'Pemula',
      description: 'Program dasar untuk melatih beberapa kelompok otot dalam satu sesi.',
      exerciseIds: ['ex-chest-press', 'ex-lat-pulldown', 'ex-leg-press', 'ex-plank'],
    },
  ];

  const schedules = [];
  const history = [];

  const measurements = [];

  return {
    workouts,
    schedules,
    history,
    measurements,
    goals: {
      weeklyWorkoutTarget: 3,
      targetWeight: null,
      targetDate: '',
    },
    profile: {
      name: '',
      email: '',
      gender: '',
      age: '',
      height: '',
      weight: '',
      bmi: null,
      bmiCategory: 'unknown',
      experience: '',
      weeklyFrequency: 3,
      fitnessGoal: '',
      onboardingComplete: false,
    },
  };
}
