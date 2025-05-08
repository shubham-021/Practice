import React, { useState } from 'react';
import { format, addDays, subDays, isToday } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';

const DateSlider = () => {
  const [centerDate, setCenterDate] = useState(new Date());
  const [direction, setDirection] = useState(0);

  const getDates = (base) => [
    subDays(base, 1),
    base,
    addDays(base, 1),
  ];

  const [dates, setDates] = useState(getDates(centerDate));

  const handleSlide = (dir) => {
    if (dir === 1 && isToday(centerDate)) return;

    setDirection(dir);
    const newCenter = dir === 1
      ? addDays(centerDate, 1)
      : subDays(centerDate, 1);

    setTimeout(() => {
      setCenterDate(newCenter);
      setDates(getDates(newCenter));
    }, 300);
  };

  const slideVariants = {
    initial: (dir) => ({ x: dir * 100, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: -dir * 100, opacity: 0 }),
  };

  const isTodayCenter = isToday(centerDate);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 space-y-4">
      <div className="flex items-center gap-6 justify-center">
        {/* Left Button */}
        <button
          onClick={() => handleSlide(-1)}
          className="text-xl px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ←
        </button>

        {/* Date Slider */}
        <div className="relative w-72 h-12 overflow-hidden flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={centerDate.toDateString()}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex gap-6 items-center absolute w-full justify-center"
            >
              {dates.map((date, idx) => (
                <div
                  key={date.toString()}
                  className={`w-20 text-center text-lg transition-all duration-300 ${
                    idx === 1
                      ? 'font-bold text-blue-600 scale-110'
                      : 'text-gray-500 scale-100'
                  }`}
                >
                  {format(date, 'MMM dd')}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Button */}
        <button
          onClick={() => handleSlide(1)}
          disabled={isTodayCenter}
          className={`text-xl px-3 py-1 rounded transition-colors duration-200 ${
            isTodayCenter
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default DateSlider;
