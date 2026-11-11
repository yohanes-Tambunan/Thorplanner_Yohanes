export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(value) {
  if (!value) return new Date();
  return new Date(`${value}T12:00:00`);
}

export function addDays(value, amount) {
  const date = typeof value === 'string' ? parseLocalDate(value) : new Date(value);
  date.setDate(date.getDate() + amount);
  return toISODate(date);
}

export function formatDate(value, options = {}) {
  if (!value) return 'Belum ditentukan';
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(parseLocalDate(value));
}

export function formatShortDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short' }).format(parseLocalDate(value));
}

export function formatDay(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('id-ID', { weekday: 'long' }).format(parseLocalDate(value));
}

export function getWeekStart(date = new Date()) {
  const start = new Date(date);
  start.setHours(12, 0, 0, 0);
  const day = start.getDay();
  start.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
  return toISODate(start);
}

export function getWeekDays(referenceDate = new Date()) {
  const start = parseLocalDate(getWeekStart(referenceDate));
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return toISODate(date);
  });
}

export function isDateInCurrentWeek(value) {
  const weekStart = getWeekStart();
  const weekEnd = addDays(weekStart, 6);
  return value >= weekStart && value <= weekEnd;
}

export function getRelativeDateLabel(value) {
  if (!value) return '';
  const today = toISODate(new Date());
  if (value === today) return 'Hari ini';
  if (value === addDays(today, 1)) return 'Besok';
  if (value === addDays(today, -1)) return 'Kemarin';
  return formatDate(value, { weekday: 'long', day: 'numeric', month: 'short' });
}
