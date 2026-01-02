import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPersianDate, getPersianTime } from '@/lib/persianDate';

interface ClockWidgetProps {
  showSeconds?: boolean;
  showDate?: boolean;
}

export function ClockWidget({ showSeconds = true, showDate = true }: ClockWidgetProps) {
  const [time, setTime] = useState(getPersianTime());
  const [date, setDate] = useState(getPersianDate());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getPersianTime());
      setDate(getPersianDate());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col items-center justify-center p-6"
    >
      <div className="text-center">
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-6xl lg:text-8xl font-bold gradient-text tracking-tight">
            {time.hours}
          </span>
          <motion.span
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-5xl lg:text-7xl font-bold text-primary"
          >
            :
          </motion.span>
          <span className="text-6xl lg:text-8xl font-bold gradient-text tracking-tight">
            {time.minutes}
          </span>
          {showSeconds && (
            <>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-3xl lg:text-5xl font-bold text-primary/60"
              >
                :
              </motion.span>
              <span className="text-4xl lg:text-6xl font-medium text-muted-foreground">
                {time.seconds}
              </span>
            </>
          )}
        </div>
        
        {showDate && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-xl lg:text-2xl text-muted-foreground"
          >
            <span className="text-accent font-medium">{date.weekDay}</span>
            <span className="mx-2 text-border">|</span>
            <span>{date.day} {date.month} {date.year}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
