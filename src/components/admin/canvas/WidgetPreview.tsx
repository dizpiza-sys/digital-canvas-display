import { Widget, TextWidget, HtmlWidget } from '@/types/widget';
import { Clock, Cloud, Sun, Newspaper, Image, Video, Play } from 'lucide-react';

interface WidgetPreviewProps {
  widget: Widget;
}

export function WidgetPreview({ widget }: WidgetPreviewProps) {
  switch (widget.type) {
    case 'clock':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 p-4">
          <Clock className="w-8 h-8 text-primary mb-2" />
          <span className="text-2xl font-bold text-foreground">۱۲:۳۰</span>
          {widget.showDate && (
            <span className="text-sm text-muted-foreground">شنبه ۱۵ دی</span>
          )}
        </div>
      );

    case 'weather':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500/20 to-blue-500/5 p-4">
          <Cloud className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-2xl font-bold text-foreground">۲۲°</span>
          <span className="text-sm text-muted-foreground">{widget.city || 'تهران'}</span>
        </div>
      );

    case 'prayer-times':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-500/20 to-amber-500/5 p-4">
          <Sun className="w-8 h-8 text-amber-500 mb-2" />
          <span className="text-lg font-bold text-foreground">اوقات شرعی</span>
          <span className="text-sm text-muted-foreground">اذان ظهر: ۱۲:۱۵</span>
        </div>
      );

    case 'news':
      return (
        <div className="w-full h-full flex items-center bg-gradient-to-r from-primary/10 to-transparent p-4">
          <Newspaper className="w-6 h-6 text-primary ml-3" />
          <span className="text-foreground truncate">خبر نمونه - این یک نوار خبری متحرک است</span>
        </div>
      );

    case 'image':
      return (
        <div className="w-full h-full relative bg-muted">
          {widget.src ? (
            <img
              src={widget.src}
              alt="Widget"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
        </div>
      );

    case 'video':
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <Video className="w-12 h-12 text-muted-foreground" />
        </div>
      );

    case 'slideshow':
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-purple-500/5">
          <Play className="w-12 h-12 text-purple-500" />
        </div>
      );

    case 'text':
      const textWidget = widget as TextWidget;
      return (
        <div
          className="w-full h-full p-4 overflow-hidden"
          style={{
            textAlign: textWidget.textAlign || 'right',
            fontSize: textWidget.fontSize || 16,
            backgroundColor: textWidget.backgroundColor || 'transparent',
            color: textWidget.textColor || 'inherit',
          }}
          dangerouslySetInnerHTML={{ __html: textWidget.content || '<p>متن نمونه</p>' }}
        />
      );

    case 'html':
      const htmlWidget = widget as HtmlWidget;
      return (
        <div
          className="w-full h-full overflow-hidden"
          dangerouslySetInnerHTML={{ __html: htmlWidget.htmlContent || '<div>محتوای HTML</div>' }}
        />
      );

    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-muted">
          <span className="text-muted-foreground">{widget.type}</span>
        </div>
      );
  }
}
