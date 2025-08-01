import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DateContextType {
  selectedMonth: string;
  setSelectedMonth: (month: string) => void;
  getMonthOptions: () => { value: string; label: string }[];
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const useDate = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};

interface DateProviderProps {
  children: ReactNode;
}

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const getMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    
    // Generate last 12 months
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const label = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      options.push({ value, label });
    }
    
    return options;
  };

  return (
    <DateContext.Provider value={{ 
      selectedMonth, 
      setSelectedMonth, 
      getMonthOptions
    }}>
      {children}
    </DateContext.Provider>
  );
};