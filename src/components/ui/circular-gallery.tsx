import React, { useState, useEffect, useRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Define the type for a single gallery item
export interface GalleryItem {
  common: string;
  binomial: string;
  photo: {
    url: string;
    text: string;
    pos?: string;
    by: string;
  };
}

// Define the props for the CircularGallery component
interface CircularGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  items: GalleryItem[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /** Card size in px. */
  itemWidth?: number;
  itemHeight?: number;
  /**
   * Element whose scroll progress drives the rotation (e.g. the tall section
   * wrapping a sticky gallery). Defaults to the whole document.
   */
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
  /** Prefix for the photo credit line. */
  creditLabel?: string;
  /** Text shown in a card whose photo failed to load. */
  fallbackLabel?: string;
  /** Makes each card a button. */
  onItemClick?: (item: GalleryItem, index: number) => void;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius = 600,
      autoRotateSpeed = 0.02,
      itemWidth = 300,
      itemHeight = 400,
      scrollTargetRef,
      creditLabel = 'Photo by:',
      fallbackLabel = 'Image unavailable',
      onItemClick,
      ...props
    },
    ref
  ) => {
    // Rotation = auto-rotation offset + scroll-driven rotation, so starting to
    // scroll never makes the ring jump back to the scroll angle.
    const [rotation, setRotation] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [reducedMotion, setReducedMotion] = useState(false);
    const [failed, setFailed] = useState<Record<number, boolean>>({});
    const autoRotationRef = useRef(0);
    const scrollRotationRef = useRef(0);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    const setRefs = (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    // Respect the visitor's reduced-motion preference
    useEffect(() => {
      const query = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => setReducedMotion(query.matches);
      update();
      query.addEventListener('change', update);
      return () => query.removeEventListener('change', update);
    }, []);

    // Pause the animation loop while the gallery is off screen
    useEffect(() => {
      const node = rootRef.current;
      if (!node || typeof IntersectionObserver === 'undefined') return;
      const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
      observer.observe(node);
      return () => observer.disconnect();
    }, []);

    // Effect to handle scroll-based rotation
    useEffect(() => {
      const getProgress = () => {
        const target = scrollTargetRef?.current;
        if (target) {
          const rect = target.getBoundingClientRect();
          const scrollable = rect.height - window.innerHeight;
          if (scrollable <= 0) return 0;
          return Math.min(1, Math.max(0, -rect.top / scrollable));
        }
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        return scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      };

      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollRotationRef.current = getProgress() * 360;
        setRotation(autoRotationRef.current + scrollRotationRef.current);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      scrollRotationRef.current = getProgress() * 360;
      setRotation(autoRotationRef.current + scrollRotationRef.current);

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [scrollTargetRef]);

    // Effect for auto-rotation when not scrolling
    useEffect(() => {
      if (isScrolling || !isVisible || reducedMotion || autoRotateSpeed === 0) return;

      const autoRotate = () => {
        autoRotationRef.current += autoRotateSpeed;
        setRotation(autoRotationRef.current + scrollRotationRef.current);
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, isVisible, reducedMotion, autoRotateSpeed]);

    const anglePerItem = 360 / items.length;

    return (
      <div
        ref={setRefs}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn('relative w-full h-full flex items-center justify-center', className)}
        style={{ perspective: '2000px' }}
        {...props}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {items.map((item, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (itemAngle + totalRotation + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);
            const opacity = Math.max(0.3, 1 - normalizedAngle / 180);
            // Only the cards facing the viewer take clicks and focus
            const facing = normalizedAngle < 60;

            const card = (
              <div className="relative w-full h-full rounded-lg shadow-2xl overflow-hidden group border border-border bg-card/70 dark:bg-card/30 backdrop-blur-lg">
                {failed[i] ? (
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-muted-foreground">
                    {fallbackLabel}
                  </div>
                ) : (
                  <img
                    src={item.photo.url}
                    alt={item.photo.text}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    onError={() => setFailed(prev => ({ ...prev, [i]: true }))}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: item.photo.pos || 'center' }}
                  />
                )}
                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-left">
                  <h2 className="text-xl font-display">{item.common}</h2>
                  <em className="text-sm italic opacity-80">{item.binomial}</em>
                  <p className="text-xs mt-2 opacity-70">
                    {creditLabel} {item.photo.by}
                  </p>
                </div>
              </div>
            );

            return (
              <div
                key={`${i}-${item.photo.url}`}
                role="group"
                aria-label={item.common}
                className="absolute"
                style={{
                  width: itemWidth,
                  height: itemHeight,
                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: -itemWidth / 2,
                  marginTop: -itemHeight / 2,
                  opacity: opacity,
                  transition: 'opacity 0.3s linear',
                  pointerEvents: facing ? 'auto' : 'none',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {onItemClick ? (
                  <button
                    type="button"
                    tabIndex={facing ? 0 : -1}
                    aria-hidden={!facing}
                    onClick={() => onItemClick(item, i)}
                    className="block w-full h-full cursor-pointer rounded-lg"
                  >
                    {card}
                  </button>
                ) : (
                  card
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
