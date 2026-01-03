import { motion } from 'framer-motion';
import { X, Monitor, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CanvasSettings } from '@/types/widget';

interface CanvasSettingsPanelProps {
  settings: CanvasSettings;
  onSettingsChange: (settings: Partial<CanvasSettings>) => void;
  onClose: () => void;
}

const presetDimensions = [
  { label: 'Full HD (1920×1080)', width: 1920, height: 1080 },
  { label: '4K UHD (3840×2160)', width: 3840, height: 2160 },
  { label: 'HD (1280×720)', width: 1280, height: 720 },
  { label: 'عمودی Full HD (1080×1920)', width: 1080, height: 1920 },
  { label: 'سفارشی', width: 0, height: 0 },
];

export function CanvasSettingsPanel({
  settings,
  onSettingsChange,
  onClose,
}: CanvasSettingsPanelProps) {
  const currentPreset = presetDimensions.find(
    (p) => p.width === settings.width && p.height === settings.height
  );

  const handlePresetChange = (value: string) => {
    const preset = presetDimensions.find((p) => p.label === value);
    if (preset && preset.width > 0) {
      onSettingsChange({ width: preset.width, height: preset.height });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="w-80 bg-card border-r border-border flex flex-col h-full"
    >
      <div className="h-14 flex items-center justify-between px-4 border-b border-border">
        <h2 className="font-bold text-foreground">تنظیمات صفحه</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Dimensions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground">ابعاد صفحه</h3>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label>ابعاد پیش‌فرض</Label>
              <Select
                value={currentPreset?.label || 'سفارشی'}
                onValueChange={handlePresetChange}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {presetDimensions.map((preset) => (
                    <SelectItem key={preset.label} value={preset.label}>
                      {preset.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="width">عرض (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={settings.width}
                  onChange={(e) => onSettingsChange({ width: parseInt(e.target.value) || 1920 })}
                  min={320}
                  max={7680}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">ارتفاع (px)</Label>
                <Input
                  id="height"
                  type="number"
                  value={settings.height}
                  onChange={(e) => onSettingsChange({ height: parseInt(e.target.value) || 1080 })}
                  min={240}
                  max={4320}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Grid Settings */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Grid3X3 className="w-4 h-4 text-muted-foreground" />
            <h3 className="font-medium text-foreground">شبکه</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="showGrid">نمایش شبکه</Label>
              <Switch
                id="showGrid"
                checked={settings.showGrid}
                onCheckedChange={(checked) => onSettingsChange({ showGrid: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gridSize">اندازه شبکه (px)</Label>
              <Input
                id="gridSize"
                type="number"
                value={settings.gridSize}
                onChange={(e) => onSettingsChange({ gridSize: parseInt(e.target.value) || 40 })}
                min={10}
                max={100}
                step={5}
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
