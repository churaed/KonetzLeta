import { Play, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { ProjectMedia } from './PortfolioMediaGallery';

interface Props {
  media: ProjectMedia[];
  index: number;
  onSelect: (index: number) => void;
}

const focusClass = 'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-red-400';

export function PortfolioGalleryNavigation({ media, index, onSelect }: Props) {
  const { t } = useTranslation();
  const total = media.length;
  const label = (i: number) => t(`portfolio.gallery.${media[i].type}`, { number: i + 1 });
  const start = Math.max(0, Math.min(index - 2, total - Math.min(5, total)));
  const nearby = media.slice(start, start + 5);
  const marker = (item: ProjectMedia, i: number) => (
    <button
      key={i}
      type="button"
      aria-label={label(i)}
      aria-current={i === index ? 'true' : undefined}
      data-media-type={item.type}
      onClick={() => onSelect(i)}
      className={`flex size-[40px] shrink-0 items-center justify-center rounded-full ${focusClass} ${i === index ? 'text-red-400' : 'text-gray-500 hover:text-gray-200'}`}
    >
      {item.type === 'video' ? <Play size={i === index ? 13 : 10} fill="currentColor" aria-hidden="true" /> : (
        <span aria-hidden="true" className={`rounded-full transition-[background-color,scale] ${i === index ? 'size-2.5 bg-current' : 'size-1.5 bg-current'}`} />
      )}
    </button>
  );
  const ends = (direction: 'first' | 'last') => (
    <button type="button" aria-label={t(`portfolio.gallery.${direction}`)} onClick={() => onSelect(direction === 'first' ? 0 : total - 1)} className={`flex size-[40px] shrink-0 items-center justify-center rounded-full text-gray-500 hover:text-white ${focusClass}`}>
      {direction === 'first' ? <ChevronsLeft size={14} aria-hidden="true" /> : <ChevronsRight size={14} aria-hidden="true" />}
    </button>
  );

  return (
    <div data-gallery-navigation="compact" className="bg-gray-900">
      <div className="flex flex-col items-center px-4 pb-2 pt-4">
        <div aria-hidden="true" className="flex items-baseline gap-2 font-mono tabular-nums">
          <span className="text-lg text-white">{String(index + 1).padStart(2, '0')}</span>
          <span className="text-xs text-gray-500">/ {String(total).padStart(2, '0')}</span>
        </div>
        <div className="flex items-center justify-center">
          <div className="hidden sm:contents">{ends('first')}</div>
          {nearby.map((item, i) => marker(item, start + i))}
          <div className="hidden sm:contents">{ends('last')}</div>
        </div>
      </div>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {t('portfolio.gallery.position', { current: index + 1, total })}
      </span>
    </div>
  );
}
