import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  Image,
  Play,
  Menu,
  X,
  Monitor,
  Newspaper,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sidebarLinks = [
  { path: '/admin', icon: LayoutDashboard, label: 'داشبورد' },
  { path: '/admin/widgets', icon: Monitor, label: 'ویجت‌ها' },
  { path: '/admin/news', icon: Newspaper, label: 'اخبار' },
  { path: '/admin/media', icon: Image, label: 'رسانه‌ها' },
  { path: '/admin/users', icon: Users, label: 'کاربران' },
  { path: '/admin/logs', icon: Clock, label: 'لاگ‌ها' },
  { path: '/admin/settings', icon: Settings, label: 'تنظیمات' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex w-full">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 280 : 80 }}
        className="bg-card border-l border-border flex flex-col h-screen sticky top-0"
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {sidebarOpen && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold gradient-text"
            >
              پنل مدیریت
            </motion.h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {link.label}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Preview Link */}
        <div className="p-4 border-t border-border">
          <Link
            to="/kiosk"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-3 bg-accent text-accent-foreground rounded-xl font-medium transition-all hover:opacity-90"
          >
            <Play className="w-4 h-4" />
            {sidebarOpen && <span>مشاهده صفحه نمایش</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
