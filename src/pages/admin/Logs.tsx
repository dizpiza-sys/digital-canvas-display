import { motion } from 'framer-motion';
import { Clock, MapPin, Monitor, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { toPersianNumber } from '@/lib/persianDate';

const mockLogs = [
  { id: '1', username: 'admin', timestamp: '۱۴۰۴/۱۰/۱۲ - ۱۴:۳۰:۲۵', ip: '192.168.1.100', device: 'Chrome / Windows' },
  { id: '2', username: 'editor1', timestamp: '۱۴۰۴/۱۰/۱۲ - ۱۲:۱۵:۴۰', ip: '192.168.1.105', device: 'Firefox / macOS' },
  { id: '3', username: 'admin', timestamp: '۱۴۰۴/۱۰/۱۱ - ۰۹:۰۰:۱۰', ip: '192.168.1.100', device: 'Chrome / Windows' },
  { id: '4', username: 'viewer1', timestamp: '۱۴۰۴/۱۰/۱۰ - ۱۷:۴۵:۳۰', ip: '192.168.1.110', device: 'Safari / iOS' },
  { id: '5', username: 'editor1', timestamp: '۱۴۰۴/۱۰/۱۰ - ۱۱:۲۰:۰۰', ip: '192.168.1.105', device: 'Firefox / macOS' },
];

export default function LogsPage() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">لاگ ورود کاربران</h1>
        <p className="text-muted-foreground">
          تاریخچه ورود کاربران به سیستم
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <Card className="widget-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-primary">{toPersianNumber(5)}</p>
            <p className="text-sm text-muted-foreground">ورود امروز</p>
          </CardContent>
        </Card>
        <Card className="widget-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-accent">{toPersianNumber(23)}</p>
            <p className="text-sm text-muted-foreground">ورود این هفته</p>
          </CardContent>
        </Card>
        <Card className="widget-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-weather-rainy">{toPersianNumber(3)}</p>
            <p className="text-sm text-muted-foreground">کاربران فعال</p>
          </CardContent>
        </Card>
        <Card className="widget-card">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-green-500">{toPersianNumber(0)}</p>
            <p className="text-sm text-muted-foreground">ورود ناموفق</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Logs List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4">تاریخچه ورود (نمونه)</h2>
        <div className="space-y-3">
          {mockLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <Card className="widget-card">
                <CardContent className="p-4">
                  <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                    <div className="flex items-center gap-2 text-foreground font-medium min-w-[100px]">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs text-primary">
                          {log.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {log.username}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      {log.timestamp}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Globe className="w-4 h-4" />
                      <span dir="ltr">{log.ip}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Monitor className="w-4 h-4" />
                      {log.device}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
