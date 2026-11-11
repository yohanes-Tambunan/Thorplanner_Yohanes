export function calculateBMI(weight, heightCm) {
  const weightNumber = Number(weight);
  const heightNumber = Number(heightCm) / 100;
  if (!weightNumber || !heightNumber || weightNumber <= 0 || heightNumber <= 0) return null;
  return Number((weightNumber / (heightNumber * heightNumber)).toFixed(1));
}

export function getBMICategory(bmi, age) {
  if (bmi == null) return { key: 'unknown', label: 'Belum tersedia' };
  if (Number(age) < 20) {
    return {
      key: 'youth',
      label: 'Perlu interpretasi usia',
      description: 'Untuk usia di bawah 20 tahun, kategori BMI perlu dibandingkan dengan persentil usia dan jenis kelamin. FitPlanner hanya menampilkan angka BMI, bukan kategorinya.',
    };
  }
  if (bmi < 18.5) {
    return {
      key: 'underweight',
      label: 'Berat badan kurang',
      description: 'Prioritaskan latihan kekuatan secara bertahap untuk membangun otot. Kardio cukup ringan sebagai pemanasan atau untuk kebugaran umum.',
    };
  }
  if (bmi < 25) {
    return {
      key: 'healthy',
      label: 'Rentang sehat',
      description: 'Gunakan kombinasi latihan kekuatan dan kardio ringan–sedang untuk menjaga kebugaran secara menyeluruh.',
    };
  }
  if (bmi < 30) {
    return {
      key: 'overweight',
      label: 'Berat badan berlebih',
      description: 'Tambahkan kardio berdampak rendah secara bertahap, sambil tetap mempertahankan latihan kekuatan untuk menjaga massa otot.',
    };
  }
  return {
    key: 'obesity',
    label: 'Rentang BMI obesitas',
    description: 'Mulai dengan kardio berdampak rendah dan durasi yang nyaman. Kombinasikan dengan latihan kekuatan ringan; tingkatkan perlahan sesuai toleransi tubuh.',
  };
}

export function getFitnessFocus(profile = {}) {
  const currentBMI = calculateBMI(profile.weight, profile.height);
  const category = currentBMI != null
    ? getBMICategory(currentBMI, profile.age).key
    : (profile.bmiCategory || 'unknown');

  if (category === 'underweight') return 'muscle';
  if (category === 'overweight' || category === 'obesity') return 'cardio-strength';
  return 'balanced';
}

export function getTrainingDose(profile = {}, exercise = {}) {
  const level = profile.experience || 'Pemula';
  const isCardio = exercise.type === 'cardio';
  const focus = getFitnessFocus(profile);

  if (isCardio) {
    let minutes = level === 'Pemula' ? 10 : level === 'Menengah' ? 15 : 20;
    if (focus === 'cardio-strength') minutes += 5;
    if (focus === 'muscle') minutes = Math.max(5, minutes - 5);
    return { sets: 1, reps: `${minutes} menit`, rest: 'sesuai kebutuhan' };
  }

  const setsByLevel = { Pemula: 2, Menengah: 3, Berpengalaman: 3 };
  const repsByLevel = {
    Pemula: exercise.beginnerReps || exercise.reps || '10–12',
    Menengah: exercise.intermediateReps || exercise.reps || '8–12',
    Berpengalaman: exercise.advancedReps || exercise.reps || '8–12',
  };
  return {
    sets: setsByLevel[level] || 2,
    reps: repsByLevel[level] || '10–12',
    rest: level === 'Pemula' ? '90–120 detik' : '60–120 detik',
  };
}

const strengthExerciseIds = {
  full: ['ex-chest-press', 'ex-lat-pulldown', 'ex-leg-press', 'ex-seated-row', 'ex-plank'],
  upper: ['ex-chest-press', 'ex-lat-pulldown', 'ex-seated-row', 'ex-shoulder-press', 'ex-biceps-curl', 'ex-triceps-pushdown'],
  lower: ['ex-leg-press', 'ex-squat', 'ex-rdl', 'ex-plank'],
  push: ['ex-chest-press', 'ex-shoulder-press', 'ex-triceps-pushdown'],
  pull: ['ex-lat-pulldown', 'ex-seated-row', 'ex-biceps-curl'],
  legs: ['ex-leg-press', 'ex-squat', 'ex-rdl', 'ex-plank'],
  cardio: ['ex-treadmill', 'ex-elliptical', 'ex-plank'],
  mobility: ['ex-elliptical', 'ex-plank'],
};

export function getWeeklyPlan(profile = {}) {
  const frequency = Math.min(6, Math.max(1, Number(profile.weeklyFrequency) || 3));
  const level = profile.experience || 'Pemula';
  const focus = getFitnessFocus(profile);
  const baseCardioMinutes = level === 'Pemula' ? 10 : level === 'Menengah' ? 15 : 20;
  const focusAdjustment = focus === 'cardio-strength' ? 5 : focus === 'muscle' ? -5 : 0;
  const recommendedCardioMinutes = Math.max(5, baseCardioMinutes + focusAdjustment);
  const cardioDay = {
    title: 'Cardio & Core',
    kind: 'cardio',
    duration: `${recommendedCardioMinutes}–${recommendedCardioMinutes + 5} menit`,
    note: 'Kardio berdampak rendah dengan intensitas yang masih memungkinkan berbicara.',
  };
  const mobilityDay = { title: 'Recovery & Mobility', kind: 'mobility', duration: '15–20 menit', note: 'Gerak ringan, peregangan dinamis, dan pemulihan aktif.' };

  let templates;
  if (level === 'Pemula') {
    const fullBodyA = { title: 'Full Body A', kind: 'full', duration: '40–50 menit', note: 'Latihan seluruh tubuh dengan alat yang stabil dan beban ringan.' };
    const fullBodyB = { title: 'Full Body B', kind: 'full', duration: '40–50 menit', note: 'Ulangi pola gerak utama dengan variasi yang nyaman.' };
    const fullBodyC = { title: 'Full Body C', kind: 'full', duration: '35–45 menit', note: 'Fokus teknik, kontrol, dan rentang gerak.' };
    templates = frequency <= 3
      ? [fullBodyA, fullBodyB, fullBodyC]
      : [fullBodyA, cardioDay, fullBodyB, cardioDay, mobilityDay, mobilityDay];
  } else {
    templates = frequency <= 3
      ? [
          { title: 'Full Body A', kind: 'full', duration: '45–60 menit', note: 'Kombinasi gerakan dorong, tarik, dan kaki.' },
          { title: 'Full Body B', kind: 'full', duration: '45–60 menit', note: 'Latihan seluruh tubuh dengan variasi gerakan.' },
          { title: 'Full Body C', kind: 'full', duration: '45–60 menit', note: 'Latihan seimbang dengan progres bertahap.' },
        ]
      : [
          { title: 'Upper Body', kind: 'upper', duration: '45–60 menit', note: 'Fokus dada, punggung, bahu, dan lengan.' },
          { title: 'Lower Body', kind: 'lower', duration: '45–60 menit', note: 'Fokus kaki, pinggul, dan otot inti.' },
          { title: 'Push Day', kind: 'push', duration: '45–60 menit', note: 'Gerakan mendorong tubuh bagian atas.' },
          { title: 'Pull Day', kind: 'pull', duration: '45–60 menit', note: 'Gerakan menarik untuk punggung dan bisep.' },
          { title: 'Leg Day', kind: 'legs', duration: '45–60 menit', note: 'Latihan tubuh bagian bawah.' },
          cardioDay,
        ];
  }

  let selected = templates.slice(0, frequency);
  const cardioTarget = focus === 'cardio-strength'
    ? (frequency >= 4 ? 2 : frequency >= 3 ? 1 : 0)
    : (frequency >= 3 ? 1 : 0);
  let cardioCount = selected.filter((day) => day.kind === 'cardio').length;
  let strengthCount = selected.filter((day) => !['cardio', 'mobility'].includes(day.kind)).length;

  // Add dedicated cardio without removing every strength session from the plan.
  for (let index = selected.length - 1; index >= 0 && cardioCount < cardioTarget; index -= 1) {
    const day = selected[index];
    if (day.kind === 'cardio') continue;
    if (day.kind === 'mobility' || strengthCount > 2) {
      if (!['cardio', 'mobility'].includes(day.kind)) strengthCount -= 1;
      selected[index] = cardioDay;
      cardioCount += 1;
    }
  }

  if (focus === 'cardio-strength' && frequency <= 2) {
    selected = selected.map((day) => ({
      ...day,
      note: `${day.note} Tambahkan kardio berdampak rendah sesuai durasi personal di Exercise Library bila masih nyaman.`,
    }));
  }
  if (focus === 'muscle' && selected.some((day) => day.kind === 'cardio')) {
    selected = selected.map((day) => day.kind === 'cardio'
      ? { ...day, title: 'Light Cardio & Mobility', note: 'Kardio ringan untuk pemanasan dan kebugaran umum; fokus utama tetap latihan kekuatan dan pemulihan.' }
      : day);
  }

  const dayLabelsByFrequency = {
    1: ['Senin'],
    2: ['Senin', 'Kamis'],
    3: ['Senin', 'Rabu', 'Jumat'],
    4: ['Senin', 'Selasa', 'Kamis', 'Sabtu'],
    5: ['Senin', 'Selasa', 'Kamis', 'Jumat', 'Sabtu'],
    6: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  };
  const dayLabels = dayLabelsByFrequency[frequency];
  return selected.map((item, index) => ({
    ...item,
    day: dayLabels[index],
    exerciseIds: strengthExerciseIds[item.kind] || strengthExerciseIds.full,
  }));
}

export function getFocusCopy(profile = {}) {
  const focus = getFitnessFocus(profile);
  if (focus === 'muscle') return {
    title: 'Bangun kekuatan dan massa otot',
    body: 'Program memprioritaskan latihan resistance training, progres beban perlahan, asupan makan yang cukup, dan waktu pemulihan. Kardio dibuat singkat dan ringan.',
    tag: 'MUSCLE BUILDING',
  };
  if (focus === 'cardio-strength') return {
    title: 'Kardio bertahap + latihan kekuatan',
    body: 'Program memberi porsi kardio berdampak rendah lebih banyak, namun tetap menyertakan latihan beban agar kebugaran dan kekuatan otot ikut terjaga.',
    tag: 'CARDIO + STRENGTH',
  };
  return {
    title: 'Kebugaran yang seimbang',
    body: 'Program menggabungkan latihan kekuatan seluruh tubuh dengan kardio ringan–sedang dan pemulihan yang cukup.',
    tag: 'BALANCED FITNESS',
  };
}
