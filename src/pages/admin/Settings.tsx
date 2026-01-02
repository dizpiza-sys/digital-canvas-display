import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Image, Palette, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useDisplayStore } from '@/store/displayStore';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { backgroundImage, setBackgroundImage } = useDisplayStore();
  const [bgInput, setBgInput] = useState(backgroundImage);
  const [showWeather, setShowWeather] = useState(true);
  const [showClock, setShowClock] = useState(true);
  const [showPrayer, setShowPrayer] = useState(true);
  const { toast } = useToast();

  const handleSave = () => {
    setBackgroundImage(bgInput);
    toast({
      title: 'تنظیمات ذخیره شد',
      description: 'تغییرات با موفقیت اعمال شدند',
    });
  };

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">تنظیمات</h1>
          <p className="text-muted-foreground">
            تنظیمات کلی سیستم نمایشگر را مدیریت کنید
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="w-4 h-4 ml-2" />
          ذخیره تغییرات
        </Button>
      </motion.div>

      <div className="grid gap-6">
        {/* Background Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="widget-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                تصویر پس‌زمینه
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bg-url">آدرس تصویر</Label>
                <Input
                  id="bg-url"
                  placeholder="https://example.com/background.jpg"
                  value={bgInput}
                  onChange={(e) => setBgInput(e.target.value)}
                  dir="ltr"
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  اگر خالی باشد، از تصویر پیش‌فرض استفاده می‌شود
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Widget Visibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="widget-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                نمایش ویجت‌ها
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>نمایش ساعت</Label>
                  <p className="text-sm text-muted-foreground">
                    ساعت و تاریخ شمسی را نمایش دهید
                  </p>
                </div>
                <Switch checked={showClock} onCheckedChange={setShowClock} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>نمایش آب‌وهوا</Label>
                  <p className="text-sm text-muted-foreground">
                    وضعیت آب‌وهوای شهر را نمایش دهید
                  </p>
                </div>
                <Switch checked={showWeather} onCheckedChange={setShowWeather} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>نمایش اوقات شرعی</Label>
                  <p className="text-sm text-muted-foreground">
                    اوقات شرعی روز را نمایش دهید
                  </p>
                </div>
                <Switch checked={showPrayer} onCheckedChange={setShowPrayer} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cloud Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="widget-card border-primary/50 bg-primary/5">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-primary/10">
                <Cloud className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">
                  با اتصال به Cloud امکانات بیشتری در دسترس خواهد بود
                </h3>
                <p className="text-sm text-muted-foreground">
                  آپلود فایل، مدیریت کاربران، ذخیره‌سازی دائمی و API آب‌وهوا
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
