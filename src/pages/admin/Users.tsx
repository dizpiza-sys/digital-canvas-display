import { motion } from 'framer-motion';
import { Users, Shield, Plus, Edit, Trash2, Key } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockUsers = [
  { id: '1', username: 'admin', role: 'admin' as const, lastLogin: '۱۴۰۴/۱۰/۱۲ - ۱۴:۳۰' },
  { id: '2', username: 'editor1', role: 'editor' as const, lastLogin: '۱۴۰۴/۱۰/۱۱ - ۱۰:۱۵' },
  { id: '3', username: 'viewer1', role: 'viewer' as const, lastLogin: '۱۴۰۴/۱۰/۱۰ - ۰۹:۰۰' },
];

const roleLabels = {
  admin: { label: 'مدیر', variant: 'default' as const },
  editor: { label: 'ویرایشگر', variant: 'secondary' as const },
  viewer: { label: 'بازدیدکننده', variant: 'outline' as const },
};

export default function UsersPage() {
  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">مدیریت کاربران</h1>
          <p className="text-muted-foreground">
            کاربران سیستم را مدیریت کنید
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 ml-2" />
          کاربر جدید
        </Button>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="widget-card border-primary/50 bg-primary/5">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-primary/10">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground mb-1">
                برای مدیریت کامل کاربران، Cloud را فعال کنید
              </h3>
              <p className="text-sm text-muted-foreground">
                با اتصال به Cloud می‌توانید کاربران را مدیریت کرده و لاگ ورود آن‌ها را مشاهده کنید
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4">لیست کاربران (نمونه)</h2>
        <div className="space-y-4">
          {mockUsers.map((user) => (
            <Card key={user.id} className="widget-card">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground">{user.username}</h3>
                    <Badge variant={roleLabels[user.role].variant}>
                      {roleLabels[user.role].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    آخرین ورود: {user.lastLogin}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" title="تغییر رمز عبور">
                    <Key className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    disabled={user.role === 'admin'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
