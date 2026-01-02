import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DisplayPage, Widget, NewsItem } from '@/types/widget';

interface DisplayStore {
  pages: DisplayPage[];
  activePage: DisplayPage | null;
  newsItems: NewsItem[];
  backgroundImage: string;
  
  // Page actions
  addPage: (page: DisplayPage) => void;
  updatePage: (id: string, updates: Partial<DisplayPage>) => void;
  deletePage: (id: string) => void;
  setActivePage: (id: string | null) => void;
  publishPage: (id: string) => void;
  
  // Widget actions
  addWidget: (pageId: string, widget: Widget) => void;
  updateWidget: (pageId: string, widgetId: string, updates: Partial<Widget>) => void;
  removeWidget: (pageId: string, widgetId: string) => void;
  
  // News actions
  addNewsItem: (item: NewsItem) => void;
  removeNewsItem: (id: string) => void;
  updateNewsItem: (id: string, updates: Partial<NewsItem>) => void;
  
  // Background
  setBackgroundImage: (url: string) => void;
}

const defaultWidgets: Widget[] = [
  {
    id: 'clock-1',
    type: 'clock' as const,
    position: { x: 0, y: 0, width: 3, height: 2 },
    showSeconds: true,
    showDate: true,
  },
  {
    id: 'weather-1',
    type: 'weather' as const,
    position: { x: 3, y: 0, width: 2, height: 2 },
    city: 'تهران',
  },
  {
    id: 'prayer-1',
    type: 'prayer-times' as const,
    position: { x: 5, y: 0, width: 2, height: 2 },
  },
  {
    id: 'news-1',
    type: 'news' as const,
    position: { x: 0, y: 5, width: 12, height: 1 },
    items: [],
    speed: 50,
  },
];

const defaultPage: DisplayPage = {
  id: 'default',
  name: 'صفحه اصلی',
  widgets: defaultWidgets,
  isPublished: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const defaultNews: NewsItem[] = [
  { id: '1', title: 'به سیستم نمایشگر دیجیتال خوش آمدید', content: 'این سیستم برای مدیریت محتوای نمایشگرهای دیجیتال طراحی شده است.' },
  { id: '2', title: 'امکان افزودن ویجت‌های مختلف', content: 'ساعت، آب‌وهوا، اخبار، تصاویر و ویدئو را به صفحه نمایش اضافه کنید.' },
  { id: '3', title: 'مدیریت آسان محتوا', content: 'از پنل مدیریتی برای تنظیم محتوا استفاده کنید.' },
];

export const useDisplayStore = create<DisplayStore>()(
  persist(
    (set) => ({
      pages: [defaultPage],
      activePage: defaultPage,
      newsItems: defaultNews,
      backgroundImage: '',
      
      addPage: (page) => set((state) => ({ 
        pages: [...state.pages, page] 
      })),
      
      updatePage: (id, updates) => set((state) => ({
        pages: state.pages.map((p) => 
          p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
        ),
        activePage: state.activePage?.id === id 
          ? { ...state.activePage, ...updates, updatedAt: new Date().toISOString() } 
          : state.activePage,
      })),
      
      deletePage: (id) => set((state) => ({
        pages: state.pages.filter((p) => p.id !== id),
        activePage: state.activePage?.id === id ? null : state.activePage,
      })),
      
      setActivePage: (id) => set((state) => ({
        activePage: id ? state.pages.find((p) => p.id === id) || null : null,
      })),
      
      publishPage: (id) => set((state) => ({
        pages: state.pages.map((p) => ({
          ...p,
          isPublished: p.id === id,
        })),
      })),
      
      addWidget: (pageId, widget) => set((state) => {
        const newPages = state.pages.map((p) =>
          p.id === pageId
            ? { ...p, widgets: [...p.widgets, widget], updatedAt: new Date().toISOString() }
            : p
        );
        const newActivePage = state.activePage?.id === pageId
          ? { ...state.activePage, widgets: [...state.activePage.widgets, widget] }
          : state.activePage;
        return { pages: newPages, activePage: newActivePage };
      }),
      
      updateWidget: (pageId, widgetId, updates) => set((state) => {
        const newPages = state.pages.map((p) =>
          p.id === pageId
            ? {
                ...p,
                widgets: p.widgets.map((w) =>
                  w.id === widgetId ? { ...w, ...updates } as Widget : w
                ),
                updatedAt: new Date().toISOString(),
              }
            : p
        );
        const newActivePage = state.activePage?.id === pageId
          ? {
              ...state.activePage,
              widgets: state.activePage.widgets.map((w) =>
                w.id === widgetId ? { ...w, ...updates } as Widget : w
              ),
            }
          : state.activePage;
        return { pages: newPages, activePage: newActivePage };
      }),
      
      removeWidget: (pageId, widgetId) => set((state) => {
        const newPages = state.pages.map((p) =>
          p.id === pageId
            ? {
                ...p,
                widgets: p.widgets.filter((w) => w.id !== widgetId),
                updatedAt: new Date().toISOString(),
              }
            : p
        );
        const newActivePage = state.activePage?.id === pageId
          ? {
              ...state.activePage,
              widgets: state.activePage.widgets.filter((w) => w.id !== widgetId),
            }
          : state.activePage;
        return { pages: newPages, activePage: newActivePage };
      }),
      
      addNewsItem: (item) => set((state) => ({
        newsItems: [...state.newsItems, item],
      })),
      
      removeNewsItem: (id) => set((state) => ({
        newsItems: state.newsItems.filter((n) => n.id !== id),
      })),
      
      updateNewsItem: (id, updates) => set((state) => ({
        newsItems: state.newsItems.map((n) =>
          n.id === id ? { ...n, ...updates } : n
        ),
      })),
      
      setBackgroundImage: (url) => set({ backgroundImage: url }),
    }),
    {
      name: 'display-store',
    }
  )
);
