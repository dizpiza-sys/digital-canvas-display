import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { motion } from 'framer-motion';
import { Bold, Italic, List, AlignRight, AlignCenter, AlignLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TextWidget as TextWidgetType } from '@/types/widget';

interface TextWidgetProps {
  widget: TextWidgetType;
  isEditing?: boolean;
  onContentChange?: (content: string) => void;
}

export function TextWidget({ widget, isEditing = false, onContentChange }: TextWidgetProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: widget.content || '<p>متن نمونه</p>',
    editable: isEditing,
    onUpdate: ({ editor }) => {
      onContentChange?.(editor.getHTML());
    },
  });

  if (!isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full p-4 overflow-auto"
        style={{
          textAlign: widget.textAlign || 'right',
          fontSize: widget.fontSize || 16,
          backgroundColor: widget.backgroundColor || 'transparent',
          color: widget.textColor || 'inherit',
        }}
        dangerouslySetInnerHTML={{ __html: widget.content || '<p>متن نمونه</p>' }}
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
      <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive('bold') ? 'bg-secondary' : ''}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive('italic') ? 'bg-secondary' : ''}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={editor?.isActive('bulletList') ? 'bg-secondary' : ''}
        >
          <List className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1" />
        <Button variant="ghost" size="icon">
          <AlignRight className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <AlignLeft className="w-4 h-4" />
        </Button>
      </div>

      {/* Editor */}
      <div className="flex-1 p-4 overflow-auto">
        <EditorContent
          editor={editor}
          className="prose prose-invert max-w-none h-full"
          style={{
            fontSize: widget.fontSize || 16,
          }}
        />
      </div>
    </motion.div>
  );
}
