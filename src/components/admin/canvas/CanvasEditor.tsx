import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core';
import { useDisplayStore } from '@/store/displayStore';
import { Widget, WidgetType, CanvasSettings, DisplayPage } from '@/types/widget';
import { CanvasToolbar } from './CanvasToolbar';
import { CanvasGrid } from './CanvasGrid';
import { CanvasWidgetPalette } from './CanvasWidgetPalette';
import { CanvasWidget } from './CanvasWidget';
import { CanvasSettingsPanel } from './CanvasSettingsPanel';

// Droppable Canvas Area Component
interface CanvasDropAreaProps {
  canvasSettings: CanvasSettings;
  activePage: DisplayPage | null;
  zoom: number;
  canvasRef: React.RefObject<HTMLDivElement>;
  selectedWidgetId: string | null;
  setSelectedWidgetId: (id: string | null) => void;
  handleWidgetResize: (widgetId: string, width: number, height: number) => void;
}

function CanvasDropArea({
  canvasSettings,
  activePage,
  zoom,
  canvasRef,
  selectedWidgetId,
  setSelectedWidgetId,
  handleWidgetResize,
}: CanvasDropAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-drop-area',
  });

  return (
    <div
      ref={setNodeRef}
      className={`relative mx-auto shadow-2xl rounded-lg overflow-hidden transition-all border border-border ${
        isOver ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
      }`}
      style={{
        width: canvasSettings.width * zoom,
        height: canvasSettings.height * zoom,
        backgroundColor: activePage?.backgroundColor || 'hsl(222 47% 11%)',
        minHeight: 200,
      }}
    >
      <div
        ref={canvasRef as any}
        className="absolute inset-0 origin-top-left"
        style={{
          width: canvasSettings.width,
          height: canvasSettings.height,
          transform: `scale(${zoom})`,
        }}
        onClick={() => setSelectedWidgetId(null)}
      >
        {/* Grid */}
        {canvasSettings.showGrid && (
          <CanvasGrid
            width={canvasSettings.width}
            height={canvasSettings.height}
            gridSize={canvasSettings.gridSize}
          />
        )}

        {/* Background Image */}
        {activePage?.backgroundImage && (
          <img
            src={activePage.backgroundImage}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        )}

        {/* Widgets */}
        {activePage?.widgets.map((widget) => (
          <CanvasWidget
            key={widget.id}
            widget={widget}
            isSelected={selectedWidgetId === widget.id}
            onSelect={() => setSelectedWidgetId(widget.id)}
            onResize={handleWidgetResize}
            gridSize={canvasSettings.gridSize}
          />
        ))}
      </div>
    </div>
  );
}

interface CanvasEditorProps {
  pageId: string;
}

const defaultCanvasSettings: CanvasSettings = {
  width: 1920,
  height: 1080,
  gridSize: 40,
  showGrid: true,
};

export function CanvasEditor({ pageId }: CanvasEditorProps) {
  const { activePage, addWidget, updateWidget, removeWidget, updatePage } = useDisplayStore();
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [draggedWidget, setDraggedWidget] = useState<Widget | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [zoom, setZoom] = useState(0.5);
  const canvasRef = useRef<HTMLDivElement>(null);

  const canvasSettings = activePage?.canvasSettings || defaultCanvasSettings;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const widgetType = active.data.current?.type as WidgetType | undefined;
    const existingWidget = active.data.current?.widget as Widget | undefined;

    if (existingWidget) {
      setDraggedWidget(existingWidget);
    } else if (widgetType) {
      // Creating new widget from palette
      setDraggedWidget({
        id: 'temp',
        type: widgetType,
        position: { x: 0, y: 0, width: 4, height: 3 },
      } as Widget);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over, delta } = event;
    setDraggedWidget(null);

    if (!activePage || !canvasRef.current) return;

    const widgetType = active.data.current?.type as WidgetType | undefined;
    const existingWidget = active.data.current?.widget as Widget | undefined;
    const isFromPalette = active.data.current?.fromPalette;

    if (isFromPalette && widgetType && over?.id === 'canvas-drop-area') {
      // Add new widget from palette
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.round((event.activatorEvent as PointerEvent).clientX - rect.left) / zoom;
      const y = Math.round((event.activatorEvent as PointerEvent).clientY - rect.top) / zoom;

      const gridX = Math.round(x / canvasSettings.gridSize) * canvasSettings.gridSize;
      const gridY = Math.round(y / canvasSettings.gridSize) * canvasSettings.gridSize;

      const newWidget = createDefaultWidget(widgetType, gridX, gridY, canvasSettings.gridSize);
      addWidget(pageId, newWidget);
    } else if (existingWidget) {
      // Move existing widget
      const newX = existingWidget.position.x + Math.round(delta.x / zoom / canvasSettings.gridSize) * canvasSettings.gridSize;
      const newY = existingWidget.position.y + Math.round(delta.y / zoom / canvasSettings.gridSize) * canvasSettings.gridSize;

      updateWidget(pageId, existingWidget.id, {
        position: {
          ...existingWidget.position,
          x: Math.max(0, newX),
          y: Math.max(0, newY),
        },
      });
    }
  };

  const handleWidgetResize = useCallback((widgetId: string, newWidth: number, newHeight: number) => {
    const gridWidth = Math.max(1, Math.round(newWidth / canvasSettings.gridSize));
    const gridHeight = Math.max(1, Math.round(newHeight / canvasSettings.gridSize));

    updateWidget(pageId, widgetId, {
      position: {
        ...activePage?.widgets.find(w => w.id === widgetId)?.position!,
        width: gridWidth * canvasSettings.gridSize,
        height: gridHeight * canvasSettings.gridSize,
      },
    });
  }, [pageId, canvasSettings.gridSize, updateWidget, activePage]);

  const handleCanvasSettingsChange = (settings: Partial<CanvasSettings>) => {
    updatePage(pageId, {
      canvasSettings: { ...canvasSettings, ...settings },
    });
  };

  const handleDeleteWidget = () => {
    if (selectedWidgetId && activePage) {
      removeWidget(pageId, selectedWidgetId);
      setSelectedWidgetId(null);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full bg-background" dir="ltr">
        {/* Widget Palette - Left Side */}
        <CanvasWidgetPalette />

        {/* Main Canvas Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Toolbar */}
          <CanvasToolbar
            zoom={zoom}
            onZoomChange={setZoom}
            onToggleSettings={() => setShowSettings(!showSettings)}
            onDeleteWidget={handleDeleteWidget}
            hasSelectedWidget={!!selectedWidgetId}
          />

          {/* Canvas Container */}
          <div className="flex-1 overflow-auto bg-muted/30 p-4 flex items-start justify-center">
            <CanvasDropArea
              canvasSettings={canvasSettings}
              activePage={activePage}
              zoom={zoom}
              canvasRef={canvasRef}
              selectedWidgetId={selectedWidgetId}
              setSelectedWidgetId={setSelectedWidgetId}
              handleWidgetResize={handleWidgetResize}
            />
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <CanvasSettingsPanel
            settings={canvasSettings}
            onSettingsChange={handleCanvasSettingsChange}
            onClose={() => setShowSettings(false)}
          />
        )}
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {draggedWidget && (
          <motion.div
            initial={{ opacity: 0.8, scale: 1.05 }}
            animate={{ opacity: 0.8, scale: 1.05 }}
            className="rounded-lg bg-primary/20 border-2 border-primary border-dashed p-4"
            style={{
              width: draggedWidget.position.width || 160,
              height: draggedWidget.position.height || 120,
            }}
          >
            <span className="text-primary font-medium">{draggedWidget.type}</span>
          </motion.div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

function createDefaultWidget(type: WidgetType, x: number, y: number, gridSize: number): Widget {
  const baseWidget = {
    id: `${type}-${Date.now()}`,
    type,
    position: { x, y, width: gridSize * 4, height: gridSize * 3 },
  };

  switch (type) {
    case 'clock':
      return { ...baseWidget, type: 'clock', showSeconds: true, showDate: true };
    case 'weather':
      return { ...baseWidget, type: 'weather', city: 'تهران' };
    case 'prayer-times':
      return { ...baseWidget, type: 'prayer-times' };
    case 'news':
      return { ...baseWidget, type: 'news', items: [], speed: 50, position: { x, y, width: gridSize * 10, height: gridSize * 2 } };
    case 'image':
      return { ...baseWidget, type: 'image', src: 'https://picsum.photos/400/300', aspectRatio: '16:9' };
    case 'video':
      return { ...baseWidget, type: 'video', src: '', autoplay: true, loop: true, muted: true };
    case 'slideshow':
      return { ...baseWidget, type: 'slideshow', images: [], interval: 5 };
    case 'text':
      return { ...baseWidget, type: 'text', content: '<p>متن نمونه</p>', fontSize: 16, textAlign: 'right' };
    case 'html':
      return { ...baseWidget, type: 'html', htmlContent: '<div style="padding: 1rem;">محتوای HTML</div>' };
    default:
      return baseWidget as Widget;
  }
}
