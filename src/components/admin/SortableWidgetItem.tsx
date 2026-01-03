import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Widget, WidgetType } from '@/types/widget';

interface SortableWidgetItemProps {
  widget: Widget;
  widgetInfo: {
    type: WidgetType;
    label: string;
    icon: React.ElementType;
    description: string;
  };
  onEdit: () => void;
  onRemove: () => void;
}

export function SortableWidgetItem({ 
  widget, 
  widgetInfo, 
  onEdit, 
  onRemove 
}: SortableWidgetItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={isDragging ? 'z-50' : ''}
    >
      <Card className={`widget-card group transition-all ${isDragging ? 'shadow-2xl ring-2 ring-primary scale-105' : ''}`}>
        <CardContent className="p-4 flex items-center gap-4">
          <div 
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing opacity-50 group-hover:opacity-100 transition-opacity touch-none"
          >
            <GripVertical className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <widgetInfo.icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground">{widgetInfo.label}</h3>
            <p className="text-sm text-muted-foreground">ID: {widget.id}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="ghost"
              onClick={onEdit}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive"
              onClick={onRemove}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
