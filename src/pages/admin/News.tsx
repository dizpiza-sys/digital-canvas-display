import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Save, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useDisplayStore } from '@/store/displayStore';
import { NewsItem } from '@/types/widget';
import { toPersianNumber } from '@/lib/persianDate';

export default function NewsPage() {
  const { newsItems, addNewsItem, removeNewsItem, updateNewsItem } = useDisplayStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAdd = () => {
    if (!newTitle.trim()) return;

    const newItem: NewsItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
      timestamp: new Date().toISOString(),
    };

    addNewsItem(newItem);
    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  const handleUpdate = (id: string) => {
    if (!newTitle.trim()) return;

    updateNewsItem(id, {
      title: newTitle.trim(),
      content: newContent.trim(),
    });
    setEditingId(null);
    setNewTitle('');
    setNewContent('');
  };

  const startEditing = (item: NewsItem) => {
    setEditingId(item.id);
    setNewTitle(item.title);
    setNewContent(item.content || '');
  };

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">مدیریت اخبار</h1>
          <p className="text-muted-foreground">
            اخبار نمایش داده شده در نوار خبری را مدیریت کنید
          </p>
        </div>
        <Button onClick={() => setIsAdding(true)} disabled={isAdding}>
          <Plus className="w-4 h-4 ml-2" />
          خبر جدید
        </Button>
      </motion.div>

      {/* Add New Form */}
      {isAdding && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6"
        >
          <Card className="widget-card">
            <CardContent className="p-6 space-y-4">
              <Input
                placeholder="عنوان خبر"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="text-lg"
              />
              <Textarea
                placeholder="متن خبر (اختیاری)"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button onClick={handleAdd}>
                  <Save className="w-4 h-4 ml-2" />
                  ذخیره
                </Button>
                <Button variant="ghost" onClick={() => setIsAdding(false)}>
                  <X className="w-4 h-4 ml-2" />
                  انصراف
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* News List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        {newsItems.length > 0 ? (
          newsItems.map((item, index) => (
            <Card key={item.id} className="widget-card">
              <CardContent className="p-4">
                {editingId === item.id ? (
                  <div className="space-y-4">
                    <Input
                      placeholder="عنوان خبر"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="متن خبر"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleUpdate(item.id)}>
                        <Save className="w-4 h-4 ml-2" />
                        ذخیره
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                        <X className="w-4 h-4 ml-2" />
                        انصراف
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {toPersianNumber(index + 1)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                      {item.content && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {item.content}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" onClick={() => startEditing(item)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => removeNewsItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="widget-card">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">هیچ خبری ثبت نشده است</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
