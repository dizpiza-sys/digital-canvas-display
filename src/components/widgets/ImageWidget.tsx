import { motion } from 'framer-motion';

interface ImageWidgetProps {
  src: string;
  aspectRatio?: '3:4' | '16:9' | '1:1' | 'A3';
}

export function ImageWidget({ src, aspectRatio = '16:9' }: ImageWidgetProps) {
  const aspectRatioClass = {
    '3:4': 'aspect-[3/4]',
    '16:9': 'aspect-video',
    '1:1': 'aspect-square',
    'A3': 'aspect-[297/420]',
  }[aspectRatio];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`h-full w-full overflow-hidden rounded-xl ${aspectRatioClass}`}
    >
      <img
        src={src}
        alt="Display content"
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
