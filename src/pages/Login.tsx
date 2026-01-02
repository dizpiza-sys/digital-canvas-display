import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Monitor, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Mock users for demo
const mockUsers = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'editor', password: 'editor123', role: 'editor' },
];

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = mockUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Store user in localStorage for demo
      localStorage.setItem('currentUser', JSON.stringify({
        username: user.username,
        role: user.role,
        loginTime: new Date().toISOString(),
      }));

      toast({
        title: 'ورود موفق',
        description: `خوش آمدید ${user.username}`,
      });

      navigate('/admin');
    } else {
      toast({
        title: 'خطا در ورود',
        description: 'نام کاربری یا رمز عبور اشتباه است',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/20 flex items-center justify-center glow-primary"
          >
            <Monitor className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ورود به <span className="gradient-text">پنل مدیریت</span>
          </h1>
          <p className="text-muted-foreground">
            برای دسترسی به پنل مدیریت وارد شوید
          </p>
        </div>

        <Card className="widget-card">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">نام کاربری</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="نام کاربری را وارد کنید"
                  required
                  dir="ltr"
                  className="text-left"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">رمز عبور</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="رمز عبور را وارد کنید"
                    required
                    dir="ltr"
                    className="text-left pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <LogIn className="w-4 h-4 ml-2" />
                    ورود
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-xl bg-secondary/50">
              <p className="text-sm text-muted-foreground text-center mb-2">
                کاربران نمونه:
              </p>
              <div className="text-sm text-center space-y-1">
                <p><span className="text-primary">admin</span> / admin123</p>
                <p><span className="text-primary">editor</span> / editor123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
