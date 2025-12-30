import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchBankHolidays } from '../api/holidayApi';
import { Holiday } from '../types';

interface HolidayContextType {
  holidays: Holiday[];
  loading: boolean;
  updateHoliday: (id: string, title: string, date: string) => void;
  refresh: () => Promise<void>;
}

const HolidayContext = createContext<HolidayContextType | undefined>(undefined);

export const HolidayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  const loadHolidays = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchBankHolidays();
      setHolidays(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHolidays();
  }, [loadHolidays]);

  const updateHoliday = (id: string, title: string, date: string) => {
    setHolidays(current => 
      current.map(h => h.id === id ? { ...h, title, date } : h)
    );
  };

  return (
    <HolidayContext.Provider 
      value={{ 
        holidays, 
        loading, 
        updateHoliday, 
        refresh: loadHolidays 
      }}
    >
      {children}
    </HolidayContext.Provider>
  );
};

export const useHolidays = () => {
  const context = useContext(HolidayContext);
  if (!context) {
    throw new Error('useHolidays must be used within a HolidayProvider');
  }
  return context;
};