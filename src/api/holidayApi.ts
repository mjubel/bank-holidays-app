import { GovResponse, Holiday } from '../types';
import { processHolidays } from '../utils/holidayHelpers';

const API_URL = 'https://www.gov.uk/bank-holidays.json';

export const fetchBankHolidays = async (): Promise<Holiday[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch holidays: ${response.status}`);
    }

    const data: GovResponse = await response.json();
    
    return processHolidays(data);
  } catch (error) {

    console.error("API fetch Error:", error);
    throw error;
  }
};