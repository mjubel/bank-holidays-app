import { addMonths, isWithinInterval, parseISO } from 'date-fns';
import { GovResponse, Holiday } from '../types';

export const processHolidays = (data: GovResponse): Holiday[] => {
  const today = new Date();
  const limit = addMonths(today, 6);

  const allEvents = Object.values(data).flatMap(region => region.events);

  const uniqueHolidays = new Map<string, Holiday>();

  allEvents.forEach((event) => {
    const holidayDate = parseISO(event.date);
    const key = event.title.toLowerCase();

    const isUpcoming = isWithinInterval(holidayDate, { start: today, end: limit });

    if (!uniqueHolidays.has(key) && isUpcoming) {
      uniqueHolidays.set(key, { 
        ...event, 
        id: `${event.date}-${event.title}` 
      });
    }
  });

  return Array.from(uniqueHolidays.values())
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
    .slice(0, 5);
};