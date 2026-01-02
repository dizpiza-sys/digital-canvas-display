import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Monitor, 
  Newspaper, 
  Image, 
  Clock, 
  Users, 
  Settings,
  TrendingUp,
  Eye,
  Calendar,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDisplayStore } from '@/store/displayStore';
import { getPersianDate, toPersianNumber } from '@/lib/persianDate';

const quickStats = [
  { label: 'ویجت‌های فعال', value: 4, icon: Monitor, color: 'text-primary' },
  { label: 'اخبار فعال', value: 3, icon: Newspaper, color: 'text-accent' },
  { label: 'رسانه‌ها', value: 0, icon: Image, color: 'text-weather-rainy' },
  { label: 'بازدید امروز', value: 128, icon: Eye, color: 'text-green-500' },
];

const quickActions = [
  { label: 'مدیریت ویجت‌ها', icon: Monitor, path: '/admin/widgets' },
  { label: 'افزودن خبر', icon: Newspaper, path: '/admin/news' },
  { label: 'آپلود رسانه', icon: Image, path: '/admin/media' },
  { label: 'مدیریت کاربران', icon: Users, path: '/admin/users' },
];

export default function AdminDashboard() {
  const { pages, newsItems } = useDisplayStore();
  const date = getPersianDate();

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              سلام، خوش آمدید 👋
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {date.fullDate}
            </p>
          </div>
          <Link
            to="/kiosk"
            target="_blank"
            className="hidden lg:flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-all hover:opacity-90"
          >
            <Eye className="w-5 h-5" />
            <span>پیش‌نمایش کیوسک</span>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {quickStats.map((stat, index) => (
          <Card key={stat.label} className="widget-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {toPersianNumber(stat.value)}
                  </p>
                </div>
                <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-foreground mb-4">دسترسی سریع</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.path}
              to={action.path}
              className="widget-card p-6 flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all group"
            >
              <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <action.icon className="w-8 h-8 text-primary" />
              </div>
              <span className="font-medium text-foreground">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent News */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">آخرین اخبار</h2>
          <Link to="/admin/news" className="text-primary hover:underline text-sm">
            مشاهده همه
          </Link>
        </div>
        <Card className="widget-card">
          <CardContent className="p-0 divide-y divide-border">
            {newsItems.slice(0, 5).map((news, index) => (
              <div key={news.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {toPersianNumber(index + 1)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{news.title}</p>
                  {news.content && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {news.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
