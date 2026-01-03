import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus, Clock, Cloud, Sun, Newspaper, Image, Video, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDisplayStore } from '@/store/displayStore';
import { WidgetType, Widget } from '@/types/widget';
import { WidgetEditor } from '@/components/admin/WidgetEditor';
import { SortableWidgetItem } from '@/components/admin/SortableWidgetItem';
import { useSampleImages, useSampleVideos } from '@/hooks/useApiData';

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
  const { activePage, addWidget, removeWidget, reorderWidgets } = useDisplayStore();
  const [editingWidget, setEditingWidget] = useState<Widget | null>(null);
  const { images: sampleImages } = useSampleImages(5);
  const { videos: sampleVideos } = useSampleVideos();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

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
      case 'image':
        newWidget.src = sampleImages[0] || 'https://picsum.photos/800/600';
        newWidget.aspectRatio = '3:4';
        break;
      case 'video':
        newWidget.src = sampleVideos[0]?.url || '';
        newWidget.autoplay = true;
        newWidget.loop = true;
        newWidget.muted = true;
        break;
      case 'slideshow':
        newWidget.images = sampleImages.slice(0, 3);
        newWidget.interval = 5;
        break;
    }

    addWidget(activePage.id, newWidget);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && activePage) {
      const oldIndex = activePage.widgets.findIndex((w) => w.id === active.id);
      const newIndex = activePage.widgets.findIndex((w) => w.id === over.id);
      const newWidgets = arrayMove(activePage.widgets, oldIndex, newIndex);
      reorderWidgets(activePage.id, newWidgets);
    }
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
          ویجت‌های مورد نظر را به صفحه نمایش اضافه کنید و با درگ و دراپ مرتب کنید
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

      {/* Active Widgets with Drag & Drop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4">ویجت‌های فعال</h2>
        {activePage?.widgets.length ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={activePage.widgets.map((w) => w.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {activePage.widgets.map((widget) => {
                  const widgetInfo = availableWidgets.find((w) => w.type === widget.type);
                  if (!widgetInfo) return null;

                  return (
                    <SortableWidgetItem
                      key={widget.id}
                      widget={widget}
                      widgetInfo={widgetInfo}
                      onEdit={() => setEditingWidget(widget)}
                      onRemove={() => removeWidget(activePage.id, widget.id)}
                    />
                  );
                })}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <Card className="widget-card">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">هیچ ویجتی فعال نیست</p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Widget Editor Modal */}
      <AnimatePresence>
        {editingWidget && activePage && (
          <WidgetEditor
            widget={editingWidget}
            pageId={activePage.id}
            onClose={() => setEditingWidget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
