import React, { useMemo, useState } from "react";
import { getYear } from 'date-fns';
import { Transition } from '@headlessui/react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

import clsx from 'clsx';

interface YearSelectProps {
  onSelect: (yearSelected: number) => void,
  date: Date
}

const YearSelect: React.FC<YearSelectProps> = ({ onSelect, date }) => {
  const [year, setYear] = useState<number>(() => getYear(new Date()))

  const years: number[] = useMemo(
    () => Array(9).fill(0).map((_, index) => year - index).reverse(), 
    [year]
  )

  const noFoward = useMemo(() => years[years.length - 1] >= getYear(new Date()), [years])

  const handleBack = () => {
    setYear(years[0] - 1);
  };

  const handleFoward = () => {
    setYear(years[years.length - 1] + 9);
  };

  const selectedYear = useMemo(() => getYear(date), [date]);

  return (
    <div className="flex">
      <div className="flex items-center mr-4">
        <button onClick={handleBack}>
          <IoChevronBack size={30} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5 flex-1">
          {years.map((y) => (
            <Transition
              as={'button'}
              enter="transition transform duration-300"
              enterFrom="opacity-0 translate-x-6"
              enterTo="opacity-100 translate-x-0"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              appear 
              className={clsx('w-full py-2 text-center rounded transition ', {
                'hover:bg-red-500 hover:text-white border': selectedYear !== y,
                'bg-red-500 text-white': selectedYear === y,
              })}
              key={y}
              onClick={() => onSelect(y)}
            >
              {y}
            </Transition>
          ))}
      </div>
      <div className="flex items-center ml-4">
        <button
          className={`transition ${noFoward ? 'opacity-40' : ''}`}
          disabled={noFoward} 
          onClick={handleFoward}
        >
          <IoChevronForward size={30} />
        </button>
      </div>
    </div>
  );
};

export default YearSelect;