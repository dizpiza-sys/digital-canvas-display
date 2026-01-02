export type WidgetType = 
  | 'clock'
  | 'weather'
  | 'image'
  | 'video'
  | 'news'
  | 'poster'
  | 'prayer-times'
  | 'slideshow'
  | 'livestream';

export interface WidgetPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface WidgetBase {
  id: string;
  type: WidgetType;
  position: WidgetPosition;
  title?: string;
}

export interface ClockWidget extends WidgetBase {
  type: 'clock';
  showSeconds?: boolean;
  showDate?: boolean;
}

export interface WeatherWidget extends WidgetBase {
  type: 'weather';
  city?: string;
}

export interface ImageWidget extends WidgetBase {
  type: 'image';
  src: string;
  aspectRatio?: '3:4' | '16:9' | '1:1' | 'A3';
}

export interface VideoWidget extends WidgetBase {
  type: 'video';
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface NewsWidget extends WidgetBase {
  type: 'news';
  items: NewsItem[];
  speed?: number;
}

export interface NewsItem {
  id: string;
  title: string;
  content?: string;
  timestamp?: string;
}

export interface PosterWidget extends WidgetBase {
  type: 'poster';
  src: string;
}

export interface PrayerTimesWidget extends WidgetBase {
  type: 'prayer-times';
}

export interface SlideshowWidget extends WidgetBase {
  type: 'slideshow';
  images: string[];
  interval: number; // seconds
}

export interface LivestreamWidget extends WidgetBase {
  type: 'livestream';
  url: string;
}

export type Widget = 
  | ClockWidget
  | WeatherWidget
  | ImageWidget
  | VideoWidget
  | NewsWidget
  | PosterWidget
  | PrayerTimesWidget
  | SlideshowWidget
  | LivestreamWidget;

export interface DisplayPage {
  id: string;
  name: string;
  widgets: Widget[];
  backgroundImage?: string;
  backgroundColor?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  lastLogin?: string;
}

export interface LoginLog {
  id: string;
  userId: string;
  username: string;
  timestamp: string;
  ip: string;
}
