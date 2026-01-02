import { useState, useEffect } from 'react';

// Sample images from Picsum
export const useSampleImages = (count: number = 5) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imageUrls = Array.from({ length: count }, (_, i) => 
          `https://picsum.photos/seed/${Date.now() + i}/800/600`
        );
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [count]);

  return { images, loading };
};

// Weather data from Open-Meteo (free, no API key required)
export interface WeatherData {
  temperature: number;
  weatherCode: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

const weatherCodeToDescription: Record<number, { description: string; icon: string }> = {
  0: { description: 'آسمان صاف', icon: '☀️' },
  1: { description: 'تقریباً صاف', icon: '🌤️' },
  2: { description: 'نیمه ابری', icon: '⛅' },
  3: { description: 'ابری', icon: '☁️' },
  45: { description: 'مه', icon: '🌫️' },
  48: { description: 'مه یخ‌زده', icon: '🌫️' },
  51: { description: 'نم‌نم باران', icon: '🌧️' },
  53: { description: 'باران ملایم', icon: '🌧️' },
  55: { description: 'باران شدید', icon: '🌧️' },
  61: { description: 'باران کم', icon: '🌦️' },
  63: { description: 'باران متوسط', icon: '🌧️' },
  65: { description: 'باران شدید', icon: '🌧️' },
  71: { description: 'برف کم', icon: '🌨️' },
  73: { description: 'برف متوسط', icon: '🌨️' },
  75: { description: 'برف شدید', icon: '❄️' },
  80: { description: 'رگبار', icon: '🌦️' },
  81: { description: 'رگبار متوسط', icon: '🌧️' },
  82: { description: 'رگبار شدید', icon: '⛈️' },
  95: { description: 'رعد و برق', icon: '⛈️' },
};

export const useWeatherData = (city: string = 'Tehran') => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        // Tehran coordinates
        const lat = 35.6892;
        const lon = 51.3890;
        
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m`
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather');
        
        const data = await response.json();
        const current = data.current;
        const weatherInfo = weatherCodeToDescription[current.weather_code] || { description: 'نامشخص', icon: '🌡️' };
        
        setWeather({
          temperature: Math.round(current.temperature_2m),
          weatherCode: current.weather_code,
          humidity: current.relative_humidity_2m,
          windSpeed: Math.round(current.wind_speed_10m),
          description: weatherInfo.description,
          icon: weatherInfo.icon,
        });
      } catch (err) {
        setError('خطا در دریافت اطلاعات آب‌وهوا');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000); // Update every 30 minutes
    return () => clearInterval(interval);
  }, [city]);

  return { weather, loading, error };
};

// News from JSONPlaceholder (mock API)
export interface NewsArticle {
  id: string;
  title: string;
  body: string;
  userId: number;
}

export const useNewsData = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
        if (!response.ok) throw new Error('Failed to fetch news');
        
        const data = await response.json();
        
        // Transform to Persian-style headlines
        const persianNews = data.map((item: any, index: number) => ({
          id: String(item.id),
          title: getPersianNewsTitle(index),
          body: item.body,
          userId: item.userId,
        }));
        
        setNews(persianNews);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading };
};

// Persian news titles for demo
const getPersianNewsTitle = (index: number): string => {
  const titles = [
    'افزایش سرمایه‌گذاری در بخش فناوری اطلاعات کشور',
    'برگزاری نمایشگاه بین‌المللی کتاب در تهران',
    'پیشرفت چشمگیر در صنعت خودروسازی داخلی',
    'توسعه زیرساخت‌های حمل و نقل شهری',
    'افتتاح مرکز نوآوری و فناوری جدید',
    'گسترش خدمات بهداشتی در مناطق روستایی',
    'رشد صادرات محصولات کشاورزی به بازارهای جهانی',
    'برنامه‌ریزی برای توسعه گردشگری پایدار',
    'ارائه خدمات آموزشی جدید به دانش‌آموزان',
    'بهبود شاخص‌های محیط زیست در کلانشهرها',
  ];
  return titles[index % titles.length];
};

// Sample videos from public sources
export const useSampleVideos = () => {
  const videos = [
    {
      id: '1',
      title: 'ویدئو نمونه ۱',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://picsum.photos/seed/video1/320/180',
    },
    {
      id: '2',
      title: 'ویدئو نمونه ۲',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://picsum.photos/seed/video2/320/180',
    },
    {
      id: '3',
      title: 'ویدئو نمونه ۳',
      url: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://picsum.photos/seed/video3/320/180',
    },
  ];

  return { videos };
};

// Random user avatars
export const useUserAvatars = (count: number = 5) => {
  const avatars = Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `کاربر ${i + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
  }));

  return { avatars };
};
