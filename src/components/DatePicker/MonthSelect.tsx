import React, { useMemo } from "react";
import { 
  startOfYear, 
  endOfYear, 
  eachMonthOfInterval, 
  format,
  getMonth
} from 'date-fns';
import clsx from 'clsx';

import { es } from 'date-fns/locale';

interface MonthSelectProps {
  date: Date,
  onSelect: (selectedMonth: number) => void
}



const MonthSelect: React.FC<MonthSelectProps> = ({ date, onSelect }) => {
  const months = useMemo(() => {
    const firstDay = startOfYear(date);
    const lastDay = endOfYear(date);
    return eachMonthOfInterval({
      start: firstDay,
      end: lastDay,
    });
  }, [date]);

  const handleSelect = (month: Date) => {
    onSelect(getMonth(month))
  }

  const selectedMonth = useMemo(() => getMonth(date), [date]);

  return(
    <div className="grid grid-cols-4 gap-4 mt-5">
      {months.map((d) => (
        <button
          onClick={() => handleSelect(d)}
          className={clsx('rounded text-center transition py-2', {
            'border hover:bg-red-500 hover:text-white': getMonth(d) !== selectedMonth,
            'bg-red-500 text-white': getMonth(d) === selectedMonth,
          })}
          key={d.getTime()}>
            {format(d, 'MMM', { locale: es })}
        </button>
      ))}
    </div>
  );
};

export default MonthSelect;
