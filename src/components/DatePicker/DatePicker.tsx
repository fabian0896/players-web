import React, {ChangeEventHandler, Fragment, MouseEventHandler, useEffect, useMemo, useState} from "react";
import { Dialog, Transition } from '@headlessui/react'
import { 
  setYear, 
  setMonth, 
  setDate as setDay,
  format, 
} from 'date-fns';
import { es } from 'date-fns/locale';
import NumberFormat from 'react-number-format';
import { FaRegCalendar } from 'react-icons/fa';

import { Input } from "..";
import YearSelect from "./YearSelect";
import MonthSelect from "./MonthSelect";
import DaySelect from './DaySelect';

type Step = 'year' | 'month' | 'day';

interface DatePickerProps {
  onChange: (date: Date) => void;
  value: Date,
  label?: string,
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, label, value }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(value);
  const [step, setStep] = useState<Step>('year');
  const [inputValue, setInputValue] = useState<string>('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen: MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleYeraSelect = (selectedYear: number) => {
    const newDate = setYear(date, selectedYear);
    setDate(newDate);
    // onChange(newDate);
    setStep('month');
  };

  const handleMonthSelect = (selectedMonth: number) => {
    const newDate = setMonth(date, selectedMonth);
    setDate(newDate);
    // onChange(newDate)
    setStep('day');
  };

  const handleDaySelect = (selectedDay: number) => {
    const newDate = setDay(date, selectedDay);
    // setDate(newDate);
    onChange(newDate);
    setOpen(false);
    setInputValue(format(newDate, 'dd/MM/yyy'));
  };

  const title = useMemo(() => {
    if (step === 'month') {
      return format(date, 'yyy', { locale: es })
    } else if (step === 'day') {
      return format(date, 'MMMM yyy', { locale: es })
    }
    return 'Selecciona un año';
  }, [date, step]);

  const handleGoBack = () => {
    if (step === 'day') {
      setStep('month');
    } else if (step === 'month') {
      setStep('year');
    }
  }

  const handleChangeDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    const [days, months, year] = value.split('/').map(v => Number(v));
    
    let tempDate = new Date(date);

    if (!isNaN(days)) {
      tempDate = setDay(tempDate, days);
    }

    if (!isNaN(months)){
      tempDate = setMonth(tempDate, months - 1);
    }

    if (!isNaN(year)) {
      tempDate = setYear(tempDate, year);
    }
    //setDate(tempDate);
    if (!isNaN(days) && !isNaN(months) && !isNaN(year)) {
      onChange(tempDate);
    } 
    setInputValue(value);
  }

  useEffect(() => {
    setInputValue(format(value, 'dd/MM/yyy'));
  }, [value])


  
  return(
    <Fragment>
      <div className="relative">
        <NumberFormat
          label={label}
          onClick={handleOpen}
          value={inputValue}
          placeholder="dd/mm/aaaa"
          format="##/##/####"
          onChange={handleChangeDate}
          icon={FaRegCalendar}
          mask={['d', 'd', 'm', 'm', 'a', 'a', 'a', 'a']}
          customInput={Input}
        />
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={handleClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out transition duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-60"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-800 opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <Dialog.Title
                  onClick={handleGoBack}
                  as="h3"
                  className="text-xl cursor-pointer font-medium leading-6 text-gray-900 text-center"
                >
                  {title}
                </Dialog.Title>
                {step === 'day' && <DaySelect onSelect={handleDaySelect} date={value} />}
                {step === 'month' && <MonthSelect onSelect={handleMonthSelect} date={value} />}
                {step === 'year' && <YearSelect onSelect={handleYeraSelect} date={value} />}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default DatePicker;