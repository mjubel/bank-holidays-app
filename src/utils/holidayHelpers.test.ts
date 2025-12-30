import { addMonths, format } from 'date-fns';
import { processHolidays } from './holidayHelpers';

describe('Holiday Logic Tests', () => {
  const futureDate = format(addMonths(new Date(), 1), 'yyyy-MM-dd');
  const pastDate = '2024-01-01';

  it('filters out dates older than today', () => {
    const mockData: any = {
      "england-and-wales": {
        events: [
          { title: 'Past', date: pastDate },
          { title: 'Future', date: futureDate }
        ]
      },
      "scotland": { events: [] },
      "northern-ireland": { events: [] }
    };

    const result = processHolidays(mockData);
    expect(result.length).toBe(1);
    expect(result[0].title).toBe('Future');
  });

  it('removes duplicate holidays with the same name', () => {
    const mockData: any = {
      "england-and-wales": {
        events: [{ title: 'Xmas', date: futureDate }]
      },
      "scotland": {
        events: [{ title: 'Xmas', date: futureDate }]
      },
      "northern-ireland": { events: [] }
    };

    const result = processHolidays(mockData);
    expect(result.length).toBe(1);
  });

  it('limits the list to 5 items', () => {
    const mockData: any = {
      "england-and-wales": {
        events: [
          { title: 'Holiday 1', date: futureDate },
          { title: 'Holiday 2', date: futureDate },
          { title: 'Holiday 3', date: futureDate },
          { title: 'Holiday 4', date: futureDate },
          { title: 'Holiday 5', date: futureDate },
          { title: 'Holiday 6', date: futureDate }, 
        ]
      },
      "scotland": { events: [] },
      "northern-ireland": { events: [] }
    };

    const result = processHolidays(mockData);
    
   
    expect(result.length).toBe(5);
  });
  });
