import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import {
  Clock,
  Cloud,
  Sun,
  Newspaper,
  Image,
  Video,
  Play,
  Type,
  Code,
} from 'lucide-react';
import { WidgetType } from '@/types/widget';

const widgets: { type: WidgetType; label: string; icon: React.ElementType }[] = [
  { type: 'clock', label: 'ساعت', icon: Clock },
  { type: 'weather', label: 'آب‌وهوا', icon: Cloud },
  { type: 'prayer-times', label: 'اوقات شرعی', icon: Sun },
  { type: 'news', label: 'اخبار', icon: Newspaper },
  { type: 'image', label: 'تصویر', icon: Image },
  { type: 'video', label: 'ویدئو', icon: Video },
  { type: 'slideshow', label: 'اسلایدشو', icon: Play },
  { type: 'text', label: 'متن', icon: Type },
  { type: 'html', label: 'HTML', icon: Code },
];

export function CanvasWidgetPalette() {
  return (
    <div className="w-64 bg-card border-l border-border flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="font-bold text-foreground">ویجت‌ها</h2>
        <p className="text-xs text-muted-foreground mt-1">
          ویجت را به صفحه بکشید
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {widgets.map((widget) => (
          <DraggableWidgetItem
            key={widget.type}
            type={widget.type}
            label={widget.label}
            icon={widget.icon}
          />
        ))}
      </div>
    </div>
  );
}

interface DraggableWidgetItemProps {
  type: WidgetType;
  label: string;
  icon: React.ElementType;
}

function DraggableWidgetItem({ type, label, icon: Icon }: DraggableWidgetItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `palette-${type}`,
    data: {
      type,
      fromPalette: true,
    },
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        flex items-center gap-3 p-3 rounded-xl cursor-grab active:cursor-grabbing
        bg-secondary/50 hover:bg-secondary border border-border
        transition-colors
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="font-medium text-foreground">{label}</span>
    </motion.div>
  );
}
