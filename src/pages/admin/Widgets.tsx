import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Clock, Cloud, Sun, Newspaper, Image, Video, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDisplayStore } from '@/store/displayStore';
import { WidgetType } from '@/types/widget';

const availableWidgets: { type: WidgetType; label: string; icon: React.ElementType; description: string }[] = [
  { type: 'clock', label: 'ساعت', icon: Clock, description: 'نمایش ساعت و تاریخ شمسی' },
  { type: 'weather', label: 'آب‌وهوا', icon: Cloud, description: 'نمایش وضعیت آب‌وهوا' },
  { type: 'prayer-times', label: 'اوقات شرعی', icon: Sun, description: 'نمایش اوقات شرعی روز' },
  { type: 'news', label: 'اخبار', icon: Newspaper, description: 'نوار خبری متحرک' },
  { type: 'image', label: 'تصویر', icon: Image, description: 'نمایش تصویر با نسبت‌های مختلف' },
  { type: 'video', label: 'ویدئو', icon: Video, description: 'پخش ویدئو با نسبت ۱۶:۹' },
  { type: 'slideshow', label: 'اسلایدشو', icon: Play, description: 'نمایش خودکار تصاویر' },
];

export default function WidgetsPage() {
  const { activePage, addWidget, removeWidget } = useDisplayStore();
  const [selectedType, setSelectedType] = useState<WidgetType | null>(null);

  const handleAddWidget = (type: WidgetType) => {
    if (!activePage) return;

    const newWidget: any = {
      id: `${type}-${Date.now()}`,
      type,
      position: { x: 0, y: 0, width: 2, height: 2 },
    };

    switch (type) {
      case 'clock':
        newWidget.showSeconds = true;
        newWidget.showDate = true;
        break;
      case 'weather':
        newWidget.city = 'تهران';
        break;
      case 'news':
        newWidget.items = [];
        newWidget.speed = 50;
        break;
      case 'slideshow':
        newWidget.images = [];
        newWidget.interval = 5;
        break;
    }

    addWidget(activePage.id, newWidget);
  };

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">مدیریت ویجت‌ها</h1>
        <p className="text-muted-foreground">
          ویجت‌های مورد نظر را به صفحه نمایش اضافه کنید
        </p>
      </motion.div>

      {/* Available Widgets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-foreground mb-4">ویجت‌های موجود</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {availableWidgets.map((widget) => (
            <Card
              key={widget.type}
              className="widget-card cursor-pointer hover:border-primary transition-all"
              onClick={() => handleAddWidget(widget.type)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <widget.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{widget.label}</h3>
                <p className="text-sm text-muted-foreground">{widget.description}</p>
                <Button size="sm" variant="outline" className="mt-4">
                  <Plus className="w-4 h-4 ml-2" />
                  افزودن
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Active Widgets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4">ویجت‌های فعال</h2>
        {activePage?.widgets.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {activePage.widgets.map((widget, index) => {
              const widgetInfo = availableWidgets.find(w => w.type === widget.type);
              if (!widgetInfo) return null;

              return (
                <Card key={widget.id} className="widget-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <widgetInfo.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{widgetInfo.label}</h3>
                      <p className="text-sm text-muted-foreground">ID: {widget.id}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => removeWidget(activePage.id, widget.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="widget-card">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">هیچ ویجتی فعال نیست</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
