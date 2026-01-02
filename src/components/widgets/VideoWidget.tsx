import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoWidgetProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export function VideoWidget({ 
  src, 
  autoplay = true, 
  loop = true, 
  muted = true 
}: VideoWidgetProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && autoplay) {
      videoRef.current.play().catch(console.error);
    }
  }, [autoplay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full w-full overflow-hidden rounded-xl aspect-video"
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoplay}
        loop={loop}
        muted={muted}
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
