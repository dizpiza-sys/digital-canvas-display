import { motion } from 'framer-motion';
import {
  ZoomIn,
  ZoomOut,
  Settings,
  Trash2,
  Grid3X3,
  Eye,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

interface CanvasToolbarProps {
  zoom: number;
  onZoomChange: (zoom: number) => void;
  onToggleSettings: () => void;
  onDeleteWidget: () => void;
  hasSelectedWidget: boolean;
}

export function CanvasToolbar({
  zoom,
  onZoomChange,
  onToggleSettings,
  onDeleteWidget,
  hasSelectedWidget,
}: CanvasToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-14 bg-card border-b border-border flex items-center justify-between px-4"
    >
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-foreground ml-4">ویرایشگر صفحه</h1>
        <Separator orientation="vertical" className="h-6" />
      </div>

      {/* Center Section - Zoom */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onZoomChange(Math.max(0.25, zoom - 0.1))}
          disabled={zoom <= 0.25}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>
        <div className="w-32">
          <Slider
            value={[zoom]}
            onValueChange={([v]) => onZoomChange(v)}
            min={0.25}
            max={1.5}
            step={0.05}
          />
        </div>
        <span className="text-sm text-muted-foreground w-12">
          {Math.round(zoom * 100)}%
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onZoomChange(Math.min(1.5, zoom + 0.1))}
          disabled={zoom >= 1.5}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {hasSelectedWidget && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onDeleteWidget}
          >
            <Trash2 className="w-4 h-4 ml-2" />
            حذف ویجت
          </Button>
        )}
        <Separator orientation="vertical" className="h-6" />
        <Button variant="ghost" size="icon" onClick={onToggleSettings}>
          <Settings className="w-4 h-4" />
        </Button>
        <Link to="/kiosk" target="_blank">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 ml-2" />
            پیش‌نمایش
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
