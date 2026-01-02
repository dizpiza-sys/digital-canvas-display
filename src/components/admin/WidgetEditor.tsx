import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Play, Pause, Image, Video, Clock, Sliders } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDisplayStore } from '@/store/displayStore';
import { Widget, WidgetType } from '@/types/widget';
import { useToast } from '@/hooks/use-toast';

interface WidgetEditorProps {
  widget: Widget;
  pageId: string;
  onClose: () => void;
}

export function WidgetEditor({ widget, pageId, onClose }: WidgetEditorProps) {
  const { updateWidget } = useDisplayStore();
  const { toast } = useToast();
  const [localWidget, setLocalWidget] = useState(widget);

  const handleSave = () => {
    updateWidget(pageId, widget.id, localWidget);
    toast({
      title: 'ذخیره شد',
      description: 'تغییرات ویجت با موفقیت ذخیره شد',
    });
    onClose();
  };

  const updateLocal = (updates: Partial<Widget>) => {
    setLocalWidget({ ...localWidget, ...updates } as Widget);
  };

  const renderEditor = () => {
    switch (widget.type) {
      case 'clock':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="showSeconds">نمایش ثانیه</Label>
              <Switch
                id="showSeconds"
                checked={(localWidget as any).showSeconds ?? true}
                onCheckedChange={(checked) => updateLocal({ showSeconds: checked } as any)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="showDate">نمایش تاریخ</Label>
              <Switch
                id="showDate"
                checked={(localWidget as any).showDate ?? true}
                onCheckedChange={(checked) => updateLocal({ showDate: checked } as any)}
              />
            </div>
          </div>
        );

      case 'weather':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="city">شهر</Label>
              <Input
                id="city"
                value={(localWidget as any).city ?? 'تهران'}
                onChange={(e) => updateLocal({ city: e.target.value } as any)}
                placeholder="نام شهر"
              />
            </div>
          </div>
        );

      case 'video':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="videoSrc">آدرس ویدیو</Label>
              <Input
                id="videoSrc"
                value={(localWidget as any).src ?? ''}
                onChange={(e) => updateLocal({ src: e.target.value } as any)}
                placeholder="https://example.com/video.mp4"
                dir="ltr"
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoplay">پخش خودکار</Label>
              <Switch
                id="autoplay"
                checked={(localWidget as any).autoplay ?? true}
                onCheckedChange={(checked) => updateLocal({ autoplay: checked } as any)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="loop">تکرار</Label>
              <Switch
                id="loop"
                checked={(localWidget as any).loop ?? true}
                onCheckedChange={(checked) => updateLocal({ loop: checked } as any)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="muted">بی‌صدا</Label>
              <Switch
                id="muted"
                checked={(localWidget as any).muted ?? true}
                onCheckedChange={(checked) => updateLocal({ muted: checked } as any)}
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="imageSrc">آدرس تصویر</Label>
              <Input
                id="imageSrc"
                value={(localWidget as any).src ?? ''}
                onChange={(e) => updateLocal({ src: e.target.value } as any)}
                placeholder="https://example.com/image.jpg"
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aspectRatio">نسبت تصویر</Label>
              <Select
                value={(localWidget as any).aspectRatio ?? '3:4'}
                onValueChange={(value) => updateLocal({ aspectRatio: value } as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="انتخاب نسبت" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3:4">۳:۴ (عمودی)</SelectItem>
                  <SelectItem value="16:9">۱۶:۹ (افقی)</SelectItem>
                  <SelectItem value="1:1">۱:۱ (مربع)</SelectItem>
                  <SelectItem value="A3">A3 (پوستر)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'slideshow':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>تصاویر اسلایدشو</Label>
              <div className="space-y-2">
                {((localWidget as any).images || []).map((img: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <Input
                      value={img}
                      onChange={(e) => {
                        const newImages = [...((localWidget as any).images || [])];
                        newImages[idx] = e.target.value;
                        updateLocal({ images: newImages } as any);
                      }}
                      placeholder={`تصویر ${idx + 1}`}
                      dir="ltr"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => {
                        const newImages = ((localWidget as any).images || []).filter((_: any, i: number) => i !== idx);
                        updateLocal({ images: newImages } as any);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const newImages = [...((localWidget as any).images || []), ''];
                  updateLocal({ images: newImages } as any);
                }}
                className="w-full"
              >
                <Image className="w-4 h-4 ml-2" />
                افزودن تصویر
              </Button>
            </div>
            <div className="space-y-2">
              <Label>سرعت تعویض (ثانیه): {(localWidget as any).interval ?? 5}</Label>
              <Slider
                value={[(localWidget as any).interval ?? 5]}
                onValueChange={([value]) => updateLocal({ interval: value } as any)}
                min={1}
                max={30}
                step={1}
              />
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>سرعت حرکت: {(localWidget as any).speed ?? 50}</Label>
              <Slider
                value={[(localWidget as any).speed ?? 50]}
                onValueChange={([value]) => updateLocal({ speed: value } as any)}
                min={10}
                max={100}
                step={5}
              />
            </div>
          </div>
        );

      default:
        return (
          <p className="text-muted-foreground text-center py-4">
            تنظیمات اضافی برای این ویجت موجود نیست
          </p>
        );
    }
  };

  const getWidgetIcon = () => {
    switch (widget.type) {
      case 'clock': return Clock;
      case 'video': return Video;
      case 'image': return Image;
      case 'slideshow': return Sliders;
      default: return Sliders;
    }
  };

  const getWidgetTitle = () => {
    switch (widget.type) {
      case 'clock': return 'ساعت';
      case 'weather': return 'آب‌وهوا';
      case 'video': return 'ویدئو';
      case 'image': return 'تصویر';
      case 'slideshow': return 'اسلایدشو';
      case 'news': return 'اخبار';
      case 'prayer-times': return 'اوقات شرعی';
      default: return 'ویجت';
    }
  };

  const Icon = getWidgetIcon();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md"
      >
        <Card className="widget-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <CardTitle>ویرایش {getWidgetTitle()}</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderEditor()}

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 ml-2" />
                ذخیره تغییرات
              </Button>
              <Button variant="outline" onClick={onClose}>
                انصراف
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
