import { useState, useRef } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { Edit2, Move } from 'lucide-react';
import { Widget } from '@/types/widget';
import { Button } from '@/components/ui/button';
import { WidgetPreview } from './WidgetPreview';

interface CanvasWidgetProps {
  widget: Widget;
  isSelected: boolean;
  onSelect: () => void;
  onResize: (widgetId: string, width: number, height: number) => void;
  gridSize: number;
}

export function CanvasWidget({
  widget,
  isSelected,
  onSelect,
  onResize,
  gridSize,
}: CanvasWidgetProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: widget.id,
    data: {
      widget,
    },
  });

  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{ startX: number; startY: number; startW: number; startH: number } | null>(null);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startW: widget.position.width,
      startH: widget.position.height,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizeRef.current) return;
      const deltaX = moveEvent.clientX - resizeRef.current.startX;
      const deltaY = moveEvent.clientY - resizeRef.current.startY;
      const newWidth = Math.max(gridSize, resizeRef.current.startW + deltaX);
      const newHeight = Math.max(gridSize, resizeRef.current.startH + deltaY);
      onResize(widget.id, newWidth, newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      resizeRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      ref={setNodeRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        absolute rounded-lg overflow-hidden
        ${isSelected ? 'ring-2 ring-primary z-10' : 'ring-1 ring-border'}
        ${isDragging ? 'opacity-50' : ''}
        ${isResizing ? 'cursor-nwse-resize' : ''}
      `}
      style={{
        left: widget.position.x,
        top: widget.position.y,
        width: widget.position.width,
        height: widget.position.height,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Widget Content */}
      <div className="w-full h-full bg-card">
        <WidgetPreview widget={widget} />
      </div>

      {/* Selection Overlay */}
      {isSelected && (
        <>
          {/* Drag Handle */}
          <div
            {...listeners}
            {...attributes}
            className="absolute top-2 right-2 w-8 h-8 bg-primary rounded-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            <Move className="w-4 h-4 text-primary-foreground" />
          </div>

          {/* Widget Type Label */}
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 rounded text-xs font-medium text-foreground">
            {getWidgetLabel(widget.type)}
          </div>

          {/* Resize Handle */}
          <div
            onMouseDown={handleResizeStart}
            className="absolute bottom-0 left-0 w-4 h-4 bg-primary cursor-nwse-resize rounded-tr-lg"
            style={{ cursor: 'nwse-resize' }}
          />
        </>
      )}
    </motion.div>
  );
}

function getWidgetLabel(type: string): string {
  const labels: Record<string, string> = {
    clock: 'ساعت',
    weather: 'آب‌وهوا',
    'prayer-times': 'اوقات شرعی',
    news: 'اخبار',
    image: 'تصویر',
    video: 'ویدئو',
    slideshow: 'اسلایدشو',
    text: 'متن',
    html: 'HTML',
  };
  return labels[type] || type;
}
