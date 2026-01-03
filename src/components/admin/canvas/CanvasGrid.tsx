interface CanvasGridProps {
  width: number;
  height: number;
  gridSize: number;
}

export function CanvasGrid({ width, height, gridSize }: CanvasGridProps) {
  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      width={width}
      height={height}
    >
      <defs>
        <pattern
          id="grid"
          width={gridSize}
          height={gridSize}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}
