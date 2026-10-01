import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PortfolioVideoPlayer } from './PortfolioVideoPlayer';
import { PortfolioGalleryNavigation } from './PortfolioGalleryNavigation';

export type ProjectMedia = (
  | { type: 'image'; src: string; alt?: string }
  | { type: 'video'; src: string; poster?: string }
) & { credit?: string };

function getEmbedUrl(src: string): string | undefined {
  try {
    const url = new URL(src);
    const host = url.hostname.replace(/^www\./, '');
    if (host === 'youtube.com' || host === 'youtu.be') {
      const id = host === 'youtu.be' ? url.pathname.slice(1) :
        url.searchParams.get('v') || url.pathname.split('/')[2];
      if (id) return `https://www.youtube.com/embed/${encodeURIComponent(id)}?rel=0`;
    }
    if (host === 'vimeo.com') {
      const id = url.pathname.split('/').filter(Boolean).pop();
      if (id) return `https://player.vimeo.com/video/${encodeURIComponent(id)}`;
    }
    if (host === 'drive.google.com') {
      return src.replace(/\/view.*$/, '/preview');
    }
  } catch {
    // Relative URLs are played by the local video player.
  }
}

interface PortfolioMediaGalleryProps {
  media: ProjectMedia[];
  title: string;
  subtitle: string;
}

export function PortfolioMediaGallery({ media, title, subtitle }: PortfolioMediaGalleryProps) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const galleryRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (media.length < 2) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const target = event.target;
      if (target instanceof HTMLElement && (
        target.isContentEditable || target.closest('input, textarea, select, video')
      )) return;
      event.preventDefault();
      // A moving marker window can remove the focused button on the next slide.
      if (target instanceof HTMLElement && target.closest('button') && galleryRef.current?.contains(target)) {
        galleryRef.current.focus({ preventScroll: true });
      }
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      setIndex(current => (current + direction + media.length) % media.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [media.length]);
  const active = media[index];
  if (!active) return null;
  const hasMultiple = media.length > 1;
  const move = (direction: number) => setIndex(current => (current + direction + media.length) % media.length);
  const embedUrl = active.type === 'video' ? getEmbedUrl(active.src) : undefined;
  const buttonClass = 'absolute top-1/2 -translate-y-1/2 z-10 flex size-[44px] items-center justify-center rounded-full bg-black/65 text-white shadow-lg hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 active:scale-[0.96] transition-[background-color,scale]';

  return (
    <section
      ref={galleryRef}
      aria-label={t('portfolio.gallery.label', { title })}
      aria-roledescription={t('portfolio.gallery.carousel')}
      tabIndex={hasMultiple ? 0 : undefined}
      className="shrink-0 focus-visible:outline-2 focus-visible:outline-red-400 focus-visible:-outline-offset-2"
    >
      <div className="w-full h-[45vh] md:h-[55vh] relative bg-black border-b border-gray-800">
        <div key={`${index}:${active.src}`} className="w-full h-full">
          {active.type === 'image' ? (
            <div className="flex w-full h-full items-center justify-center">
              <div className="relative max-w-full">
                <ImageWithFallback
                  src={active.src}
                  alt={active.alt || title}
                  className="block w-auto h-auto max-w-full max-h-[45vh] md:max-h-[55vh] object-contain"
                />
                {active.credit && (
                  <p className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 text-left">
                    <span className="inline-block rounded-md bg-black/70 px-3 py-1.5 text-xs text-white/90">
                      {t('portfolio.gallery.credit', { name: active.credit })}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <PortfolioVideoPlayer
              videoUrl={active.src}
              poster={active.poster}
              overlayTitle={title}
              overlaySubtitle={subtitle}
              blurPreview={!hasMultiple}
            />
          )}
        </div>
        {hasMultiple && (
          <>
            <button type="button" className={`${buttonClass} left-3 md:left-5`} aria-label={t('portfolio.gallery.previous')} onClick={() => move(-1)}>
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button type="button" className={`${buttonClass} right-3 md:right-5`} aria-label={t('portfolio.gallery.next')} onClick={() => move(1)}>
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </>
        )}
      </div>
      {hasMultiple && (
        <PortfolioGalleryNavigation
          media={media}
          index={index}
          onSelect={setIndex}
        />
      )}
    </section>
  );
}
