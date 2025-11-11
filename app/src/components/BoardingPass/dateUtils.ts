import { DateTime } from 'luxon';

interface FormattedTime {
  hours: string;
  minutes: string;
  timezone?: string | null;
}

export const formatTime = (dateString: string): FormattedTime => {
  const date = DateTime.fromISO(dateString, { setZone: true });
  return {
    hours: date.hour.toString().padStart(2, '0'),
    minutes: date.minute.toString().padStart(2, '0'),
    timezone: date.offsetNameShort
  };
};

export const formatDate = (dateString: string, includeYear = false): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
};

export const formatDay = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en', { weekday: 'short' });
};

export const getBoardingTime = (departureTime: string): string => {
  return DateTime.fromISO(departureTime).minus({ minutes: 40 }).toISO() || '';
};
