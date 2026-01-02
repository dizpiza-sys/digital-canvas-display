import { motion } from 'framer-motion';
import { getPrayerTimes } from '@/lib/persianDate';

const prayerLabels: Record<string, string> = {
  fajr: 'اذان صبح',
  sunrise: 'طلوع آفتاب',
  dhuhr: 'اذان ظهر',
  asr: 'اذان عصر',
  maghrib: 'اذان مغرب',
  isha: 'اذان عشا',
};

export function PrayerTimesWidget() {
  const prayerTimes = getPrayerTimes();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col p-4"
    >
      <h3 className="text-lg font-bold text-accent mb-3 text-center">
        اوقات شرعی
      </h3>
      
      <div className="grid grid-cols-2 gap-2 flex-1">
        {Object.entries(prayerTimes).map(([key, time], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2"
          >
            <span className="text-sm text-muted-foreground">
              {prayerLabels[key]}
            </span>
            <span className="text-sm font-medium text-foreground">
              {time}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
