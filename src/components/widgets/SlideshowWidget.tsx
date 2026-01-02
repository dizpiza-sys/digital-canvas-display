import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SlideshowWidgetProps {
  images: string[];
  interval?: number;
}

export function SlideshowWidget({ images, interval = 5 }: SlideshowWidgetProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images.length) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-secondary/50 rounded-xl">
        <span className="text-muted-foreground">بدون تصویر</span>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden rounded-xl relative">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover absolute inset-0"
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-primary' : 'bg-foreground/30'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
