import React, { useMemo } from "react";
import { 
  eachDayOfInterval, 
  startOfMonth, 
  endOfMonth, 
  getDay, 
  format,
  getDate
} from 'date-fns';
import clsx from 'clsx';

interface DaySelectPorps {
  date: Date,
  onSelect: (daySelected: number) => void
}

const DaySelect: React.FC<DaySelectPorps> = ({ date, onSelect }) => {
  const days = useMemo(() => { 
    const firsDay = startOfMonth(date);
    const lastDay = endOfMonth(date);
    return eachDayOfInterval({
      start: firsDay,
      end: lastDay,
    });
  }, [date]);

  const ofset = useMemo(() => getDay(days[0]), [days]);

  const handleSelect = (day: Date) => {
    onSelect(getDate(day))
  }

  const selectedDay = useMemo(() => getDate(date), [date]);

  return(
    <div className="mt-5">
      <div className="grid grid-cols-7 gap-2 text-center text-gray-600 mb-3">
        <div>Dom</div>
        <div>Lun</div>
        <div>Mar</div>
        <div>Mié</div>
        <div>Jue</div>
        <div>Vie</div>
        <div>Sáb</div>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {Array(ofset).fill(0).map((_, index) => (
          <div key={index}></div>
        ))}
        {days.map((d) => (
          <button
            onClick={() => handleSelect(d)}
            className={clsx({
              'p-2 transition hover:bg-red-500 rounded hover:shadow hover:text-white': selectedDay !== getDate(d),
              'bg-red-500 text-white rounded shadow p-2': selectedDay === getDate(d),
            })} 
            key={d.getTime()}
          >
              {format(d, 'dd')}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DaySelect;
