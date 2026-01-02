import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image, Video, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
}

export default function MediaPage() {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [urlInput, setUrlInput] = useState('');

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;

    const isVideo = urlInput.match(/\.(mp4|webm|ogg)$/i) || urlInput.includes('youtube') || urlInput.includes('vimeo');
    
    const newItem: MediaItem = {
      id: Date.now().toString(),
      type: isVideo ? 'video' : 'image',
      url: urlInput.trim(),
      name: urlInput.split('/').pop() || 'رسانه جدید',
    };

    setMediaItems([...mediaItems, newItem]);
    setUrlInput('');
  };

  const handleDelete = (id: string) => {
    setMediaItems(mediaItems.filter(item => item.id !== id));
  };

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">مدیریت رسانه‌ها</h1>
        <p className="text-muted-foreground">
          تصاویر و ویدئوهای نمایشی را مدیریت کنید
        </p>
      </motion.div>

      {/* Add URL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="widget-card">
          <CardContent className="p-6">
            <h3 className="font-bold text-foreground mb-4">افزودن رسانه با لینک</h3>
            <div className="flex gap-4">
              <Input
                placeholder="آدرس تصویر یا ویدئو را وارد کنید"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1"
                dir="ltr"
              />
              <Button onClick={handleAddUrl}>
                <Upload className="w-4 h-4 ml-2" />
                افزودن
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="widget-card border-dashed border-2">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Upload className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">آپلود رسانه</h3>
            <p className="text-muted-foreground mb-4">
              برای آپلود فایل، نیاز به اتصال به Cloud دارید
            </p>
            <Button variant="outline" disabled>
              فعلاً غیرفعال
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Media Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-4">رسانه‌های موجود</h2>
        {mediaItems.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mediaItems.map((item) => (
              <Card key={item.id} className="widget-card overflow-hidden group">
                <div className="aspect-video relative bg-secondary">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x225?text=Error';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Video className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="text-destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm text-foreground truncate">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.type === 'image' ? 'تصویر' : 'ویدئو'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="widget-card">
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">هیچ رسانه‌ای آپلود نشده است</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}
