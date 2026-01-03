import { useDisplayStore } from '@/store/displayStore';
import { CanvasEditor } from '@/components/admin/canvas';

export default function PageEditor() {
  const { activePage } = useDisplayStore();

  if (!activePage) {
    return (
      <div className="h-[calc(100vh-2rem)] flex items-center justify-center">
        <p className="text-muted-foreground">صفحه‌ای انتخاب نشده است</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-2rem)]">
      <CanvasEditor pageId={activePage.id} />
    </div>
  );
}
