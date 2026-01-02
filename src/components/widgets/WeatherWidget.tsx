import { motion } from 'framer-motion';
import { Cloud, Sun, CloudRain, CloudSnow, Wind } from 'lucide-react';
import { toPersianNumber } from '@/lib/persianDate';

interface WeatherWidgetProps {
  city?: string;
}

// Mock weather data - in production, use a weather API
const mockWeather = {
  condition: 'sunny' as const,
  temperature: 24,
  humidity: 45,
  windSpeed: 12,
  description: 'آفتابی',
};

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snowy: CloudSnow,
  windy: Wind,
};

export function WeatherWidget({ city = 'تهران' }: WeatherWidgetProps) {
  const Icon = weatherIcons[mockWeather.condition];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full flex flex-col items-center justify-center p-4"
    >
      <div className="text-center">
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotate: mockWeather.condition === 'sunny' ? [0, 5, 0, -5, 0] : 0 
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-3"
        >
          <Icon className="w-16 h-16 lg:w-20 lg:h-20 text-weather-sunny mx-auto" />
        </motion.div>
        
        <div className="text-4xl lg:text-5xl font-bold text-foreground mb-1">
          {toPersianNumber(mockWeather.temperature)}°
        </div>
        
        <div className="text-lg text-accent font-medium mb-2">
          {mockWeather.description}
        </div>
        
        <div className="text-sm text-muted-foreground">
          {city}
        </div>
        
        <div className="flex justify-center gap-4 mt-3 text-xs text-muted-foreground">
          <span>رطوبت: {toPersianNumber(mockWeather.humidity)}%</span>
          <span>باد: {toPersianNumber(mockWeather.windSpeed)} km/h</span>
        </div>
      </div>
    </motion.div>
  );
}
