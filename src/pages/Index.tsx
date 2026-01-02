import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, Settings, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-primary/20 flex items-center justify-center glow-primary"
        >
          <Monitor className="w-12 h-12 text-primary" />
        </motion.div>
        
        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
          سیستم <span className="gradient-text">نمایشگر دیجیتال</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          مدیریت محتوای کیوسک و نمایشگرهای بزرگ با رابط کاربری ساده و فارسی
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/kiosk">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              <Play className="w-5 h-5" />
              مشاهده صفحه نمایش
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
              <Settings className="w-5 h-5" />
              ورود به پنل مدیریت
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
