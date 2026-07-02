import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DateInputProps {
  day: string;
  month: string;
  year: string;
  onChange: (field: 'day' | 'month' | 'year', value: string) => void;
  onSubmit: (d: string, m: string, y: string) => void;
  isError: boolean;
  disabled?: boolean;
}

export const DateInput = ({ day, month, year, onChange, onSubmit, isError, disabled }: DateInputProps) => {
  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    onChange('day', val);
    if (val.length === 2) monthRef.current?.focus();
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    onChange('month', val);
    if (val.length === 2) yearRef.current?.focus();
    if (val.length === 0 && e.nativeEvent instanceof InputEvent && e.nativeEvent.inputType === 'deleteContentBackward') {
      dayRef.current?.focus();
    }
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    onChange('year', val);
    if (val.length === 4) {
      onSubmit(day, month, val);
      yearRef.current?.blur();
    }
    if (val.length === 0 && e.nativeEvent instanceof InputEvent && e.nativeEvent.inputType === 'deleteContentBackward') {
      monthRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: 'day' | 'month' | 'year') => {
    if (e.key === 'Backspace') {
      if (field === 'month' && month === '') {
        dayRef.current?.focus();
      } else if (field === 'year' && year === '') {
        monthRef.current?.focus();
      }
    } else if (e.key === 'Enter') {
      onSubmit(day, month, year);
    }
  };

  // Shake animation configuration
  const shakeVariants = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    },
    idle: { x: 0 }
  };

  const inputClass = `text-center bg-white/20 border-2 backdrop-blur-md text-pink-700 font-medium 
    focus:outline-none focus:ring-4 focus:ring-pink-300/50 transition-all shadow-inner
    ${isError ? 'border-red-400 bg-red-50/30 text-red-600' : 'border-pink-200/50 hover:bg-white/40 focus:bg-white/60 focus:border-pink-300'}`;

  return (
    <motion.div 
      className="flex justify-center items-center gap-2 sm:gap-4 my-6"
      variants={shakeVariants}
      animate={isError ? "shake" : "idle"}
    >
      <div className="flex flex-col items-center">
        <input
          ref={dayRef}
          type="text"
          inputMode="numeric"
          placeholder="DD"
          value={day}
          onChange={handleDayChange}
          onKeyDown={(e) => handleKeyDown(e, 'day')}
          disabled={disabled}
          className={`w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl rounded-2xl ${inputClass}`}
        />
        <span className="text-xs text-pink-500/70 mt-2 font-medium uppercase tracking-wider">Ngày</span>
      </div>
      
      <span className="text-2xl font-light text-pink-300 mb-6">/</span>
      
      <div className="flex flex-col items-center">
        <input
          ref={monthRef}
          type="text"
          inputMode="numeric"
          placeholder="MM"
          value={month}
          onChange={handleMonthChange}
          onKeyDown={(e) => handleKeyDown(e, 'month')}
          disabled={disabled}
          className={`w-16 h-16 sm:w-20 sm:h-20 text-xl sm:text-2xl rounded-2xl ${inputClass}`}
        />
        <span className="text-xs text-pink-500/70 mt-2 font-medium uppercase tracking-wider">Tháng</span>
      </div>
      
      <span className="text-2xl font-light text-pink-300 mb-6">/</span>
      
      <div className="flex flex-col items-center">
        <input
          ref={yearRef}
          type="text"
          inputMode="numeric"
          placeholder="YYYY"
          value={year}
          onChange={handleYearChange}
          onKeyDown={(e) => handleKeyDown(e, 'year')}
          disabled={disabled}
          className={`w-20 h-16 sm:w-28 sm:h-20 text-xl sm:text-2xl rounded-2xl ${inputClass}`}
        />
        <span className="text-xs text-pink-500/70 mt-2 font-medium uppercase tracking-wider">Năm</span>
      </div>
    </motion.div>
  );
};
