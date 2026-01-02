import jalaali from 'jalaali-js';

const persianMonths = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const persianWeekDays = [
  'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
];

export function toPersianNumber(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, (d) => persianDigits[parseInt(d)]);
}

export function getPersianDate(): {
  year: string;
  month: string;
  day: string;
  weekDay: string;
  fullDate: string;
} {
  const now = new Date();
  const { jy, jm, jd } = jalaali.toJalaali(now);
  const dayOfWeek = now.getDay();

  return {
    year: toPersianNumber(jy),
    month: persianMonths[jm - 1],
    day: toPersianNumber(jd),
    weekDay: persianWeekDays[dayOfWeek],
    fullDate: `${persianWeekDays[dayOfWeek]} ${toPersianNumber(jd)} ${persianMonths[jm - 1]} ${toPersianNumber(jy)}`
  };
}

export function getPersianTime(): {
  hours: string;
  minutes: string;
  seconds: string;
  fullTime: string;
} {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return {
    hours: toPersianNumber(hours.toString().padStart(2, '0')),
    minutes: toPersianNumber(minutes.toString().padStart(2, '0')),
    seconds: toPersianNumber(seconds.toString().padStart(2, '0')),
    fullTime: `${toPersianNumber(hours.toString().padStart(2, '0'))}:${toPersianNumber(minutes.toString().padStart(2, '0'))}`
  };
}

// Mock prayer times - in production, use an API
export function getPrayerTimes(): {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
} {
  return {
    fajr: toPersianNumber('۰۵:۱۵'),
    sunrise: toPersianNumber('۰۶:۴۵'),
    dhuhr: toPersianNumber('۱۲:۱۵'),
    asr: toPersianNumber('۱۵:۳۰'),
    maghrib: toPersianNumber('۱۸:۰۰'),
    isha: toPersianNumber('۱۹:۳۰'),
  };
}
