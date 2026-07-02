import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DateInput } from './DateInput';
import { HintBox } from './HintBox';
import { useAttemptCounter } from '@/hooks/useAttemptCounter';
import { defaultData } from '@/data/defaultData';
import { HiLockClosed } from 'react-icons/hi';

interface MemoryVerificationCardProps {
  onUnlock: (inputDate: string) => boolean;
}

export const MemoryVerificationCard = ({ onUnlock }: MemoryVerificationCardProps) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    currentHint,
    currentErrorMsg,
    incrementAttempt
  } = useAttemptCounter({
    hints: defaultData.unlockConfig.hints,
    errorMessages: defaultData.unlockConfig.errorMessages
  });

  const handleDateChange = (field: 'day' | 'month' | 'year', value: string) => {
    setIsError(false); // Clear error on change
    if (field === 'day') setDay(value);
    if (field === 'month') setMonth(value);
    if (field === 'year') setYear(value);
  };

  const handleSubmit = (submitDay: string, submitMonth: string, submitYear: string) => {
    // Basic validation to ensure they are filled
    if (submitDay.length < 1 || submitMonth.length < 1 || submitYear.length !== 4) {
      setIsError(true);
      incrementAttempt();
      return;
    }

    // Format the date to match DD-MM-YYYY
    const formattedDay = submitDay.padStart(2, '0');
    const formattedMonth = submitMonth.padStart(2, '0');
    const inputDate = `${formattedDay}-${formattedMonth}-${submitYear}`;

    const success = onUnlock(inputDate);
    
    if (success) {
      setIsSuccess(true);
    } else {
      setIsError(true);
      incrementAttempt();
      // Clear inputs slightly after error for better UX? 
      // The prompt suggests letting them "try again", so leaving the input might be fine,
      // but maybe just clear the day to force re-entry? Let's leave it as is to avoid annoyance.
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className="relative z-10 w-full max-w-lg mx-auto"
    >
      {/* Glassmorphism Card */}
      <div className="bg-white/40 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_0_rgba(255,192,203,0.3)] rounded-3xl p-8 sm:p-12 text-center overflow-hidden">
        
        {/* Decorative elements inside card */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/40 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl"></div>
        
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <HiLockClosed className="w-12 h-12 text-pink-500 mx-auto mb-6 opacity-80" />
        </motion.div>

        <h2 className="text-3xl sm:text-4xl font-dancing-script text-pink-700 mb-4 drop-shadow-sm">
          Xác minh kỷ niệm
        </h2>
        
        <p className="text-gray-700 text-lg mb-8 font-medium">
          Em còn nhớ chúng mình bắt đầu nhắn tin với nhau vào ngày nào không?
        </p>

        <DateInput 
          day={day}
          month={month}
          year={year}
          onChange={handleDateChange}
          onSubmit={handleSubmit}
          isError={isError}
          disabled={isSuccess}
        />

        {/* Error message area (reserves space to prevent layout shift) */}
        <div className="h-8 mt-2 flex items-center justify-center">
          {isError && currentErrorMsg && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-pink-600 font-medium text-sm sm:text-base bg-white/50 px-4 py-1 rounded-full inline-block"
            >
              {currentErrorMsg}
            </motion.p>
          )}
        </div>

        <HintBox hint={currentHint} />
      </div>
    </motion.div>
  );
};
