const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

const MONTHS_SHORT = MONTHS.map((month) => month.slice(0, 3));

export const WEEKDAYS_SHORT = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;

export function startOfWeek(date: Date): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const offset = (result.getDay() + 6) % 7;
  result.setDate(result.getDate() - offset);
  return result;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function toDateKey(date: Date): string {
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function fromDateKey(key: string): Date {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export function getWeekDates(date: Date): Date[] {
  const monday = startOfWeek(date);
  return Array.from({ length: 7 }, (_, index) => addDays(monday, index));
}

export function getMonthGrid(date: Date): (Date | null)[][] {
  const first = startOfMonth(date);
  const grid: (Date | null)[][] = [];
  const current = startOfWeek(first);

  for (let week = 0; week < 6; week++) {
    const row: (Date | null)[] = [];
    for (let day = 0; day < 7; day++) {
      const cell = addDays(current, week * 7 + day);
      row.push(isSameMonth(cell, first) ? cell : null);
    }
    grid.push(row);
  }

  return grid;
}

export function formatDay(date: Date): string {
  return `${WEEKDAYS_SHORT[(date.getDay() + 6) % 7]}, ${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatDayShort(date: Date): string {
  return `${WEEKDAYS_SHORT[(date.getDay() + 6) % 7]} ${date.getDate()}`;
}

export function formatWeekRange(monday: Date): string {
  const sunday = addDays(monday, 6);
  const sameMonth = monday.getMonth() === sunday.getMonth();
  const start = `${MONTHS_SHORT[monday.getMonth()]} ${monday.getDate()}`;
  const end = sameMonth
    ? sunday.getDate()
    : `${MONTHS_SHORT[sunday.getMonth()]} ${sunday.getDate()}`;
  return `${start} – ${end}, ${monday.getFullYear()}`;
}

export function formatMonthYear(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatIsoDate(key: string): string {
  const date = fromDateKey(key);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  const period = hours24 < 12 ? "AM" : "PM";
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} ${hours12}:${minutes} ${period}`;
}
