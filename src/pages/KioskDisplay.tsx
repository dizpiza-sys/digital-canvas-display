import { motion } from 'framer-motion';
import { useDisplayStore } from '@/store/displayStore';
import { Widget } from '@/types/widget';
import {
  ClockWidget,
  WeatherWidget,
  PrayerTimesWidget,
  NewsWidget,
  ImageWidget,
  VideoWidget,
  SlideshowWidget,
} from '@/components/widgets';
import kioskBackground from '@/assets/kiosk-background.jpg';

function renderWidget(widget: Widget) {
  switch (widget.type) {
    case 'clock':
      return <ClockWidget showSeconds={widget.showSeconds} showDate={widget.showDate} />;
    case 'weather':
      return <WeatherWidget city={widget.city} />;
    case 'prayer-times':
      return <PrayerTimesWidget />;
    case 'news':
      return <NewsWidget speed={widget.speed} />;
    case 'image':
      return <ImageWidget src={widget.src} aspectRatio={widget.aspectRatio} />;
    case 'video':
      return <VideoWidget src={widget.src} autoplay={widget.autoplay} loop={widget.loop} muted={widget.muted} />;
    case 'slideshow':
      return <SlideshowWidget images={widget.images} interval={widget.interval} />;
    default:
      return null;
  }
}

export default function KioskDisplay() {
  const { activePage, backgroundImage, newsItems } = useDisplayStore();

  const bgImage = backgroundImage || kioskBackground;
  
  // Filter widgets by type for layout
  const clockWidget = activePage?.widgets.find(w => w.type === 'clock');
  const weatherWidget = activePage?.widgets.find(w => w.type === 'weather');
  const prayerWidget = activePage?.widgets.find(w => w.type === 'prayer-times');
  const newsWidget = activePage?.widgets.find(w => w.type === 'news');
  const mediaWidgets = activePage?.widgets.filter(w => 
    ['image', 'video', 'slideshow', 'poster'].includes(w.type)
  ) || [];

  return (
    <div 
      className="kiosk-fullscreen bg-background"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-background/40 backdrop-blur-sm" />
      
      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col p-6 lg:p-10">
        {/* Top Section - Info Widgets */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Clock */}
          <div className="glass-card col-span-1 lg:col-span-1">
            {clockWidget ? renderWidget(clockWidget) : <ClockWidget showSeconds showDate />}
          </div>
          
          {/* Weather */}
          <div className="glass-card">
            {weatherWidget ? renderWidget(weatherWidget) : <WeatherWidget city="تهران" />}
          </div>
          
          {/* Prayer Times */}
          <div className="glass-card">
            {prayerWidget ? renderWidget(prayerWidget) : <PrayerTimesWidget />}
          </div>
        </motion.div>
        
        {/* Middle Section - Media Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 my-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {mediaWidgets.length > 0 ? (
            mediaWidgets.map((widget, index) => (
              <motion.div
                key={widget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-card overflow-hidden"
              >
                {renderWidget(widget)}
              </motion.div>
            ))
          ) : (
            // Placeholder content area
            <div className="col-span-full flex items-center justify-center">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center glow-primary">
                  <span className="text-6xl">🖥️</span>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  نمایشگر دیجیتال
                </h2>
                <p className="text-xl text-muted-foreground">
                  محتوای شما اینجا نمایش داده می‌شود
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
        
        {/* Bottom Section - News Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="glass-card h-20 overflow-hidden"
        >
          <NewsWidget speed={50} />
        </motion.div>
      </div>
    </div>
  );
}
