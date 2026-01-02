import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useDisplayStore } from '@/store/displayStore';
import { useNewsData } from '@/hooks/useApiData';

interface NewsWidgetProps {
  speed?: number;
}

export function NewsWidget({ speed = 50 }: NewsWidgetProps) {
  const { newsItems } = useDisplayStore();
  const { news: apiNews, loading } = useNewsData();
  const containerRef = useRef<HTMLDivElement>(null);

  // Combine store news with API news
  const allNews = newsItems.length > 0 
    ? newsItems 
    : apiNews.map(n => ({ id: n.id, title: n.title }));

  const newsText = allNews.map(item => item.title).join('  •  ');

  if (loading && newsItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full w-full flex items-center justify-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10"
      >
        <span className="text-muted-foreground">در حال بارگذاری اخبار...</span>
      </motion.div>
    );
  }

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
              duration: allNews.length * (100 / speed) * 5,
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
