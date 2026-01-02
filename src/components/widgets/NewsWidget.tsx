import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDisplayStore } from '@/store/displayStore';

interface NewsWidgetProps {
  speed?: number;
}

export function NewsWidget({ speed = 50 }: NewsWidgetProps) {
  const { newsItems } = useDisplayStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const newsText = newsItems.map(item => item.title).join('  •  ');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 flex items-center"
    >
      <div className="relative w-full overflow-hidden" ref={containerRef}>
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: ['100%', '-100%'],
          }}
          transition={{
            x: {
              duration: newsItems.length * (100 / speed) * 5,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
        >
          <span className="text-xl lg:text-2xl font-medium text-foreground px-8">
            📰 {newsText}
          </span>
          <span className="text-xl lg:text-2xl font-medium text-foreground px-8">
            📰 {newsText}
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
