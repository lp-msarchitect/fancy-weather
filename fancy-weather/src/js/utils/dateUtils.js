export function getDayOfWeek(date, isShort = true) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return isShort ? days[date.getDay()].slice(0, 3) : days[date.getDay()];
}

export function getMonth(date) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[date.getMonth()];
}
