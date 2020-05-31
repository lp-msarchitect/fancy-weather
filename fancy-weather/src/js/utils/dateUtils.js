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

export function getSeason(date) {
  const month = date.getMonth();

  let season = '';
  switch (`${month}`) {
    case '12':
    case '1':
    case '2':
      season = 'winter';
      break;
    case '3':
    case '4':
    case '5':
      season = 'spring';
      break;
    case '6':
    case '7':
    case '8':
      season = 'summer';
      break;
    case '9':
    case '10':
    case '11':
      season = 'fall';
      break;
  }
  return season;
}
