import { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { HtmlWidget as HtmlWidgetType } from '@/types/widget';

interface HtmlWidgetProps {
  widget: HtmlWidgetType;
  isEditing?: boolean;
  onContentChange?: (content: string) => void;
}

export function HtmlWidget({ widget, isEditing = false, onContentChange }: HtmlWidgetProps) {
  const [showPreview, setShowPreview] = useState(!isEditing);

  if (!isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full overflow-auto"
        dangerouslySetInnerHTML={{ __html: widget.htmlContent || '<div>محتوای HTML</div>' }}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full h-full flex flex-col"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">ویرایشگر HTML</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
        >
          <Play className="w-4 h-4 ml-1" />
          {showPreview ? 'کد' : 'پیش‌نمایش'}
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {showPreview ? (
          <div
            className="w-full h-full p-4"
            dangerouslySetInnerHTML={{ __html: widget.htmlContent || '<div>محتوای HTML</div>' }}
          />
        ) : (
          <Textarea
            value={widget.htmlContent || ''}
            onChange={(e) => onContentChange?.(e.target.value)}
            className="w-full h-full border-0 rounded-none resize-none font-mono text-sm"
            placeholder="<div>کد HTML خود را اینجا بنویسید</div>"
            dir="ltr"
          />
        )}
      </div>
    </motion.div>
  );
}
