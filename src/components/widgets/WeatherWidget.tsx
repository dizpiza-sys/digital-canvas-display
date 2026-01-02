import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Loader2 } from 'lucide-react';
import { toPersianNumber } from '@/lib/persianDate';
import { useWeatherData } from '@/hooks/useApiData';

interface WeatherWidgetProps {
  city?: string;
}

export function WeatherWidget({ city = 'تهران' }: WeatherWidgetProps) {
  const { weather, loading, error } = useWeatherData(city);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center"
      >
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </motion.div>
    );
  }

  if (error || !weather) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center text-muted-foreground"
      >
        {error || 'خطا در دریافت اطلاعات'}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col items-center justify-center p-4"
    >
      <div className="text-center">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-3 text-5xl lg:text-6xl"
        >
          {weather.icon}
        </motion.div>
        
        <div className="text-4xl lg:text-5xl font-bold text-foreground mb-1">
          {toPersianNumber(weather.temperature)}°
        </div>
        
        <div className="text-lg text-accent font-medium mb-2">
          {weather.description}
        </div>
        
        <div className="text-sm text-muted-foreground">
          {city}
        </div>
        
        <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <span>رطوبت: {toPersianNumber(weather.humidity)}%</span>
          <span>باد: {toPersianNumber(weather.windSpeed)} km/h</span>
        </div>
      </div>
    </motion.div>
  );
}
