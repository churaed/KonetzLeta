import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { ExternalLink, Play, Award, X, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { HouyhnhnmsDescription } from './HouyhnhnmsDescription';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PortfolioMediaGallery, type ProjectMedia } from './PortfolioMediaGallery';
import { houyhnhnmsMedia } from '../houyhnhnmsMedia';

// Illustration code and assets load only when this film opens.
const IslandDiscovery = lazy(() => import('./IslandDiscovery'));
const horseFilmPath = '/projects/houyhnhnms-and-us';

import mechtyOStarosti from '@/assets/images/portfolio/mechty-o-starosti.webp'
import spiachka from '@/assets/images/portfolio/spiachka.webp'
import kapiITapi from '@/assets/images/portfolio/kapi-i-tapi.webp'
import obyknovennyiDrakon from '@/assets/images/portfolio/obyknovennyi-drakon.webp'
import chtoIaZdesDelaiu from '@/assets/images/portfolio/chto-ia-zdes-delaiu.webp'
import blokadnaiaMozaika from '@/assets/images/portfolio/blokadnaia-mozaika02.webp'
import blokadnaiaMozaikaFirst from '@/assets/images/portfolio/blokadnaia-mozaika.webp'
import blokadnaiaMozaikaThird from '@/assets/images/portfolio/blokadnaia-mozaika03.webp'
import bumZemliKakEtoBylo from '@/assets/images/portfolio/bum-zemli-kak-eto-bylo.webp'
import gospodinVelikii from '@/assets/images/portfolio/gospodin-velikii.webp'
import mifyOGefesteBogeIStroiotriade from '@/assets/images/portfolio/mify-o-gefeste-boge-i-stroiotriade.webp'
import strashnyiGorod from '@/assets/images/portfolio/strashnyi-gorod.webp'
import peizazhSOzhidaniem from '@/assets/images/portfolio/peizazh-s-ozhidaniem.webp'
import novyiVkus from '@/assets/images/portfolio/novyi-vkus.webp'
import narkoz from '@/assets/images/portfolio/narkoz.webp'

type ProjectStatus = 'released' | 'in_production' | 'in_development';

interface PortfolioItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string; // Genre/Mood/Year
  tagline?: string; // New short description for grid hover
  status: ProjectStatus;
  description: string;
  credits?: string;
  image: string;
  size: 'small' | 'medium' | 'large';
  videoUrl?: string;
  media?: ProjectMedia[];
  awards?: string[];
  links?: { label: string; url: string }[];
  partner?: { label: string; name: string; logo: string };
  followDescription?: string;
  component?: React.ReactNode;
}

export function PortfolioSection() {
  const { t, i18n } = useTranslation();
  
  // --- ADD THESE HELPERS ---
  const getLinks = (key: string) => {
    const data = t(key, { returnObjects: true });
    return Array.isArray(data) ? data : [];
  };

  const getAwards = (key: string) => {
    const data = t(key, { returnObjects: true });
    return Array.isArray(data) ? data : [];
  };
  // -------------------------

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const rawParam = searchParams.get('project');
  const onHorseFilmPage = location.pathname.replace(/\/$/, '') === horseFilmPath;
  const selectedParam = onHorseFilmPage ? 'houyhnhnms-and-us' : rawParam;
  const closeProject = useCallback(() => {
    if (onHorseFilmPage) navigate('/#portfolio');
    else setSearchParams({});
  }, [onHorseFilmPage, navigate, setSearchParams]);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [showAllAwards, setShowAllAwards] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrackedSlug = useRef<string | null>(null);
  const [viewCount, setViewCount] = useState<string | null>(null);

  const portfolioItems: PortfolioItem[] = [
    // Houyhnhnms and Us / Гуингмы и мы
    {
      id: 130,
      slug: 'houyhnhnms-and-us',
      title: t('portfolio.items.houyhnhnms.title'),
      subtitle: t('portfolio.items.houyhnhnms.subtitle'),
      tagline: t('portfolio.items.houyhnhnms.tagline', { defaultValue: '' }),
      status: 'in_production',
      description: t('portfolio.items.houyhnhnms.description'),
      credits: t('portfolio.items.houyhnhnms.credits'),
      image: '/media/houyhnhnms-and-us/video-02.webp',
      videoUrl: '/media/houyhnhnms-and-us/video-02.mp4',
      media: houyhnhnmsMedia.map((media): ProjectMedia => media.type === 'image' ? {
        type: 'image',
        src: media.src,
        alt: i18n.resolvedLanguage?.startsWith('ru') ? media.altRu : media.altEn,
        credit: i18n.resolvedLanguage?.startsWith('ru') ? media.creditRu : media.creditEn,
      } : { type: 'video', src: media.src, poster: media.poster }),
      size: "medium",
      partner: {
        label: t('portfolio.items.houyhnhnms.partner_label'),
        name: t('portfolio.items.houyhnhnms.partner_name'),
        logo: '/logo-kontur.png',
      },
      followDescription: t('portfolio.items.houyhnhnms.follow_description'),
      links: getLinks('portfolio.items.houyhnhnms.links') as { label: string; url: string }[],
    },
    // Landscape Waiting / Пейзаж с ожиданием
    {
      id: 5,
      slug: 'landscape-waiting',
      title: t('portfolio.items.peizazh.title'),
      subtitle: t('portfolio.items.peizazh.subtitle'),
      tagline: t('portfolio.items.peizazh.tagline', { defaultValue: '' }),
      status: 'released',
      description: t('portfolio.items.peizazh.description'),
      credits: t('portfolio.items.peizazh.credits'),
      image: peizazhSOzhidaniem,
      size: "medium",
      videoUrl: t('portfolio.items.peizazh.video'),
      awards: getAwards('portfolio.items.peizazh.awards'),
    },
    // Myths about God / Мифы о Гефесте
    {
      id: 10,
      slug: 'myths-about-god',
      title: t('portfolio.items.mify.title'),
      subtitle: t('portfolio.items.mify.subtitle'),
      tagline: t('portfolio.items.mify.tagline', { defaultValue: '' }),
      status: 'released',
      description: t('portfolio.items.mify.description'),
      credits: t('portfolio.items.mify.credits'),
      image: mifyOGefesteBogeIStroiotriade,
      size: "medium",
      videoUrl: t('portfolio.items.mify.video'),
      links: getLinks('portfolio.items.mify.links') as { label: string; url: string }[],
      awards: getAwards('portfolio.items.mify.awards'),
    },
    // Terrible City / Страшный город
    {
      id: 20,
      slug: 'terrible-city',
      title: t('portfolio.items.strashnyi.title'),
      subtitle: t('portfolio.items.strashnyi.subtitle'),
      tagline: t('portfolio.items.strashnyi.tagline', { defaultValue: '' }),
      status: 'released',
      description: t('portfolio.items.strashnyi.description'),
      credits: t('portfolio.items.strashnyi.credits'),
      image: strashnyiGorod,
      size: "medium",
      videoUrl: t('portfolio.items.strashnyi.video'),
      awards: getAwards('portfolio.items.strashnyi.awards'),
    },
    // BOOMBOOM / Бум Земли
    {
      id: 30,
      slug: 'boomboom',
      title: t('portfolio.items.bum.title'),
      subtitle: t('portfolio.items.bum.subtitle'),
      tagline: t('portfolio.items.bum.tagline', { defaultValue: '' }),
      status: 'in_production',
      description: t('portfolio.items.bum.description'),
      credits: t('portfolio.items.bum.credits'),
      image: bumZemliKakEtoBylo,
      size: "medium",
      videoUrl: t('portfolio.items.bum.video'),
      links: getLinks('portfolio.items.bum.links') as { label: string; url: string }[],
    },
    // Mr. Great / Господин Великий
    {
      id: 40,
      slug: 'mr-great',
      title: t('portfolio.items.gospodin.title'),
      subtitle: t('portfolio.items.gospodin.subtitle'),
      tagline: t('portfolio.items.gospodin.tagline', { defaultValue: '' }),
      status: 'released',
      description: t('portfolio.items.gospodin.description'),
      credits: t('portfolio.items.gospodin.credits'),
      image: gospodinVelikii,
      size: "medium",
      videoUrl: t('portfolio.items.gospodin.video'),
      links: getLinks('portfolio.items.gospodin.links') as { label: string; url: string }[],
      awards: getAwards('portfolio.items.gospodin.awards'),
    },
    // Siege Mosaic / Блокадная мозаика
    {
      id: 50,
      slug: 'siege-mosaic',
      title: t('portfolio.items.blokadnaia.title'),
      subtitle: t('portfolio.items.blokadnaia.subtitle'),
      tagline: t('portfolio.items.blokadnaia.tagline', { defaultValue: '' }),
      status: 'released',
      description: t('portfolio.items.blokadnaia.description'),
      image: blokadnaiaMozaika,
      size: "medium",
      videoUrl: t('portfolio.items.blokadnaia.video'),
      media: [
        { type: 'image', src: blokadnaiaMozaika },
        { type: 'image', src: blokadnaiaMozaikaFirst },
        { type: 'image', src: blokadnaiaMozaikaThird },
        { type: 'video', src: t('portfolio.items.blokadnaia.video'), poster: '/video/siege-mosaic.webp' },
      ],
    },
    // Dreams of Old Age / Мечты о старости
    {
      id: 60,
      slug: 'dreams-of-old-age',
      title: t('portfolio.items.mechty.title'),
      subtitle: t('portfolio.items.mechty.subtitle'),
      tagline: t('portfolio.items.mechty.tagline', { defaultValue: '' }),
      status: 'in_development',
      description: t('portfolio.items.mechty.description'),
      image: mechtyOStarosti,
      size: "medium",
      videoUrl: t('portfolio.items.mechty.video'),
    },
    // Hibernation / Спячка
    {
      id: 70,
      slug: 'hibernation',
      title: t('portfolio.items.spiachka.title'),
      subtitle: t('portfolio.items.spiachka.subtitle'),
      tagline: t('portfolio.items.spiachka.tagline', { defaultValue: '' }),
      status: 'in_development',
      description: t('portfolio.items.spiachka.description'),
      image: spiachka,
      size: "medium",
    },
    // Capi and Tapi / Капи и Тапи
    {
      id: 80,
      slug: 'capi-and-tapi',
      title: t('portfolio.items.kapi.title'),
      subtitle: t('portfolio.items.kapi.subtitle'),
      tagline: t('portfolio.items.kapi.tagline', { defaultValue: '' }),
      status: 'in_development',
      description: t('portfolio.items.kapi.description'),
      image: kapiITapi,
      size: "medium",
    },
    // Ordinary Dragon / Обыкновенный дракон
    {
      id: 90,
      slug: 'ordinary-dragon',
      title: t('portfolio.items.drakon.title'),
      subtitle: t('portfolio.items.drakon.subtitle'),
      tagline: t('portfolio.items.drakon.tagline', { defaultValue: '' }),
      status: 'in_development',
      description: t('portfolio.items.drakon.description'),
      image: obyknovennyiDrakon,
      size: "medium",
    },
    // What I am doing here? / Что я здесь делаю?
    {
      id: 100,
      slug: 'what-i-am-doing-here',
      title: t('portfolio.items.chto.title'),
      subtitle: t('portfolio.items.chto.subtitle'),
      tagline: t('portfolio.items.chto.tagline', { defaultValue: '' }),
      status: 'in_production',
      description: t('portfolio.items.chto.description'),
      credits: t('portfolio.items.chto.credits'),
      image: chtoIaZdesDelaiu,
      size: "medium",
      videoUrl: t('portfolio.items.chto.video'),
      links: getLinks('portfolio.items.chto.links') as { label: string; url: string }[],
      awards: getAwards('portfolio.items.chto.awards'),
    },
    // SkotAI / СкотИИна
    {
      id: 110,
      slug: 'skotai',
      title: t('portfolio.items.novyi.title'),
      subtitle: t('portfolio.items.novyi.subtitle'),
      tagline: t('portfolio.items.novyi.tagline', { defaultValue: '' }),
      status: 'in_production',
      description: t('portfolio.items.novyi.description'),
      credits: t('portfolio.items.novyi.credits'),
      image: novyiVkus,
      size: "medium",
      videoUrl: t('portfolio.items.novyi.video'),
      links: getLinks('portfolio.items.novyi.links') as { label: string; url: string }[],
    },
    // Anesthesia / Эфирный наркоз
    {
      id: 120,
      slug: 'anesthesia',
      title: t('portfolio.items.narkoz.title'),
      subtitle: t('portfolio.items.narkoz.subtitle'),
      tagline: t('portfolio.items.narkoz.tagline', { defaultValue: '' }),
      status: 'in_production',
      description: t('portfolio.items.narkoz.description'),
      image: narkoz,
      size: "medium",
      links: getLinks('portfolio.items.narkoz.links') as { label: string; url: string }[],
    }
  ];
  
  const selectedItem = portfolioItems.find(item => item.slug === selectedParam || (selectedParam !== null && item.id === Number(selectedParam)));
  const selectedSlug = selectedItem?.slug;
  const selectedTitle = selectedItem?.title;

  // Keep old slug and numeric query links working, with one canonical horse-film URL.
  useEffect(() => {
    if (selectedParam === null) return;
    if (!selectedSlug) {
      navigate('/', { replace: true });
    } else if (selectedSlug === 'houyhnhnms-and-us' && (location.pathname !== horseFilmPath || location.search)) {
      navigate(horseFilmPath, { replace: true });
    } else if (selectedParam !== selectedSlug) {
      setSearchParams({ project: selectedSlug }, { replace: true });
    }
  }, [selectedParam, selectedSlug, location.pathname, location.search, navigate, setSearchParams]);

  useEffect(() => {
    setShowAllAwards(false);
    if (!selectedSlug) {
      lastTrackedSlug.current = null;
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (modalScrollRef.current) modalScrollRef.current.scrollTop = 0;
    let wait: ReturnType<typeof setInterval> | undefined;
    if (selectedSlug !== lastTrackedSlug.current) {
      let retries = 0;
      wait = setInterval(() => {
        retries++;
        if (window.goatcounter?.count) {
          clearInterval(wait);
          wait = undefined;
          lastTrackedSlug.current = selectedSlug;
          window.goatcounter.count({ path: `/projects/${selectedSlug}`, title: selectedTitle, event: false });
        } else if (retries >= 30) {
          clearInterval(wait);
          wait = undefined;
        }
      }, 100);
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      if (wait) clearInterval(wait);
    };
  }, [selectedSlug, selectedTitle]);

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'large':
        return 'lg:col-span-2 md:col-span-2 h-[400px] lg:h-[500px]';
        case 'medium':
          return 'lg:col-span-2 md:col-span-1 h-[350px] lg:h-[400px]';
          default:
            return 'lg:col-span-1 md:col-span-1 h-[280px] lg:h-[350px]';
    }
  };

  const getStatusLabel = (status: ProjectStatus) => {
    return t(`portfolio.status.${status}`);
  };

  useEffect(() => {
    if (!selectedSlug) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const frame = requestAnimationFrame(() => dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus({ preventScroll: true }));
    return () => {
      cancelAnimationFrame(frame);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [selectedSlug]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!selectedSlug) return;
      if (event.key === 'Escape') closeProject();
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const elements = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]'))
        .filter(element => element.getClientRects().length > 0);
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && (document.activeElement === first || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        last.focus({ preventScroll: true });
      } else if (!event.shiftKey && (document.activeElement === last || !dialogRef.current.contains(document.activeElement))) {
        event.preventDefault();
        first.focus({ preventScroll: true });
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSlug, closeProject]);

  useEffect(() => {
    if (selectedSlug !== 'houyhnhnms-and-us' || !selectedTitle) return;
    const previousTitle = document.title;
    document.title = `${selectedTitle} · Конец лета`;
    return () => { document.title = previousTitle; };
  }, [selectedSlug, selectedTitle]);


  useEffect(() => {
    const slug = selectedItem?.slug;
    if (!slug) {
      setViewCount(null);
      return;
    }
    setViewCount(null);
    fetch(`https://churaed.goatcounter.com/counter//projects/${slug}.json`)
      .then(r => r.json())
      .then(data => setViewCount(data.count))
      .catch(() => setViewCount(null));
  }, [selectedItem?.slug]);

  return (
    <section id="portfolio" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 space-y-8"
        >
          <h2 className="text-6xl md:text-8xl font-cormorant italic text-white leading-tight">
            {t('portfolio.title')}
          </h2>

          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <p className="text-xl font-cormorant italic text-gray-300 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {t('portfolio.intro')}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {portfolioItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.slug === 'houyhnhnms-and-us' ? horseFilmPath : `/?project=${item.slug}`}
              id={`portfolio-item-${item.id}`}
              className={`relative group cursor-pointer ${getSizeClasses(item.size)}`}
              initial={{ opacity: 0, y: 100, rotateY: -20 }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                rotateY: 0
              } : {
                opacity: 0,
                y: 100,
                rotateY: -20
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                if (item.slug === 'houyhnhnms-and-us') navigate(horseFilmPath);
                else setSearchParams({ project: item.slug });
              }}
              onFocus={() => setHoveredItem(item.id)}
              onBlur={() => setHoveredItem(null)}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800/50">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent"
                  initial={{ opacity: 0.6 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 0.9 : 0.6
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Status Badge (Top Left) - Shows on Hover */}
                <AnimatePresence>
                  {hoveredItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="absolute top-4 left-4 z-20"
                    >
                      <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-white/90 font-mono shadow-xl">
                        {getStatusLabel(item.status)}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Video indicator (Top Right) */}
                {item.videoUrl && (
                  <div className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/10 group-hover:border-red-400/50 transition-colors z-20">
                    <Play size={14} className="text-white/80 group-hover:text-red-400 ml-0.5 transition-colors" />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full z-10 pointer-events-none">
                  
                  {/* Metadata Container */}
                  <div className="relative">
                    
                    {/* Always Visible Label */}
                    <motion.p 
                      className="text-xs font-mono text-red-400 mb-2 uppercase tracking-[0.2em]"
                      animate={{ opacity: hoveredItem === item.id ? 1 : 0.8 }}
                    >
                      {item.subtitle}
                    </motion.p>
                    
                    {/* Always Visible Title */}
                    <h3 className="text-2xl md:text-3xl font-cormorant italic text-white leading-tight transition-colors group-hover:text-red-50">
                      {item.title}
                    </h3>

                    {/* Sliding Tagline BELOW */}
                    <AnimatePresence>
                      {hoveredItem === item.id && item.tagline && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, height: 0 }}
                          animate={{ opacity: 1, y: 0, height: 'auto' }}
                          exit={{ opacity: 0, y: 10, height: 0 }}
                          transition={{ 
                            duration: 0.5, 
                            ease: [0.22, 1, 0.36, 1],
                            opacity: { duration: 0.3 }
                          }}
                          className="mt-4"
                        >
                          <p className="text-lg md:text-xl font-cormorant italic text-gray-200 leading-tight">
                            {item.tagline}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>
                </div>

                {/* Decorative border */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.2), transparent)",
                    padding: "1px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "subtract",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedParam && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-start justify-center pt-20 p-4 md:pt-24 md:p-10 bg-black/80 backdrop-blur-xl"
              onClick={closeProject}
            >

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                ref={dialogRef}
                className={`relative w-full max-w-6xl ${selectedItem.slug === 'houyhnhnms-and-us' ? 'island-host' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-title"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-3 z-50 p-2 text-red-400 opacity-50 hover:opacity-100 hover:bg-white/10 rounded-full transition-all"
                  onClick={closeProject}
                  aria-label={t('portfolio.close_project')}
                >
                  <X size={24} />
                </button>

                <div className={`${selectedItem.slug === 'houyhnhnms-and-us' ? 'island-card' : ''} relative w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col max-h-[85vh] overflow-x-hidden`}>
                  {selectedItem.slug === 'houyhnhnms-and-us' && (
                    <Suspense fallback={null}><IslandDiscovery /></Suspense>
                  )}
                  <div className="flex flex-col w-full h-full overflow-hidden">


                    {/* Content Section */}
                    {/* OPTION 2: Centered "Festival" Layout */}
                    <div 
                      ref={modalScrollRef}
                      className="w-full flex flex-col overflow-y-auto custom-scrollbar flex-1 bg-gray-900 min-h-0"
                    >

                      <PortfolioMediaGallery
                        key={selectedItem.slug}
                        title={selectedItem.title}
                        subtitle={selectedItem.subtitle}
                        media={selectedItem.media?.length ? selectedItem.media : selectedItem.videoUrl ? [
                          {
                            type: 'video',
                            src: selectedItem.videoUrl,
                            poster: selectedItem.videoUrl.replace(/\.(mp4|webm)$/, '.webp'),
                          },
                        ] : [{ type: 'image', src: selectedItem.image }]}
                      />

                      {/* Editorial Content Layout */}
                      <div className="island-editorial relative px-6 py-12 md:py-16 md:px-20 flex flex-col items-center text-center">
                        
                        {/* 1. Meta Eyebrow */}
                        <div className="flex items-center gap-3 text-xs md:text-sm font-mono uppercase tracking-widest text-gray-500 mb-6">
                           <span className={selectedItem.status === 'released' ? 'text-green-400' : 'text-blue-400'}>
                             {getStatusLabel(selectedItem.status)}
                           </span>
                           <span className="w-1 h-1 bg-gray-600 rounded-full" />
                           <span className="text-gray-400">{selectedItem.subtitle}</span>
                        </div>

                        {/* 2. Title (Huge Serif) */}
                        <h2 id="project-title" className="text-5xl md:text-7xl font-cormorant italic text-white mb-8 leading-none max-w-4xl">
                          {selectedItem.title}
                        </h2>

                        {/* 3. Awards (Centered Row) */}
                        {selectedItem.awards && selectedItem.awards.length > 0 && (
                          <div className="mb-10 w-full max-w-4xl">
                            <motion.div 
                              layout
                              className="flex flex-wrap justify-center gap-3 md:gap-x-6 md:gap-y-3"
                            >
                              {(showAllAwards ? selectedItem.awards : selectedItem.awards.slice(0, 6)).map((award, i) => (
                                <motion.div 
                                  key={i} 
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3, delay: i * 0.05 }}
                                  className="flex items-center gap-2 text-red-300/80 bg-red-950/20 px-3 py-1.5 rounded-full border border-red-900/20"
                                >
                                  <Award size={14} className="shrink-0" />
                                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider">{award}</span>
                                </motion.div>
                              ))}

                              {selectedItem.awards.length > 6 && (
                                <motion.button
                                  layout
                                  onClick={() => setShowAllAwards(!showAllAwards)}
                                  className="flex items-center gap-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full border border-white/10 transition-colors"
                                >
                                  <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider">
                                    {showAllAwards 
                                      ? t('portfolio.awards_show_less') 
                                      : `${t('portfolio.awards_show_all')} (+${selectedItem.awards.length - 6})`}
                                  </span>
                                </motion.button>
                              )}
                            </motion.div>
                          </div>
                        )}

                        {/* 4. Divider */}
                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-10" />

                        {/* 5. Description */}
                        <div className={`${selectedItem.slug === 'houyhnhnms-and-us' ? 'w-full max-w-4xl' : 'prose prose-invert prose-lg max-w-2xl'} mb-12 text-left`}>
                          {selectedItem.slug === 'houyhnhnms-and-us' ? (
                            <HouyhnhnmsDescription description={selectedItem.description} />
                          ) : (
                           <p className="text-gray-300 font-light leading-relaxed text-lg md:text-xl whitespace-pre-line">
                             {selectedItem.description.split('\n').map((line, i) => {
                               const boldMatch = line.match(/^(· )(Мустанги|Зоологи|Кинематографисты|ML-специалисты|Mustangs|Zoologists|Filmmakers|ML specialists)( — )/);
                               if (boldMatch) {
                                 return <span key={i}>{boldMatch[1]}<strong>{boldMatch[2]}</strong>{boldMatch[3]}{line.slice(boldMatch[0].length)}<br /></span>;
                               }
                               return <span key={i}>{line}<br /></span>;
                             })}
                           </p>
                          )}
                        </div>

                        {selectedItem.partner && (
                          <div className="mb-12 flex flex-col items-center gap-4">
                            <p className="text-sm font-mono uppercase tracking-widest text-gray-400">
                              {selectedItem.partner.label}
                            </p>
                            <div className="rounded-2xl bg-white px-6 py-4">
                              <img
                                src={selectedItem.partner.logo}
                                alt={selectedItem.partner.name}
                                className="h-10 w-auto max-w-[200px] object-contain"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}

                        {/* 6. Credits (Clean Grid or List) */}
                        {selectedItem.credits && (
                          <div className="w-full max-w-3xl border-t border-gray-800/50 pt-10 pb-12 mb-4">
                             <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm font-mono text-gray-500 leading-relaxed">
                               {selectedItem.credits.split('|').map((credit, idx) => (
                                 <span key={idx} className="whitespace-nowrap">
                                   {credit.trim()}
                                 </span>
                               ))}
                             </div>
                          </div>
                        )}

                        {/* 6.5 View Count */}
                        {viewCount && (
                          <div className="mb-6 flex items-center justify-center gap-2">
                            <Eye size={14} className="text-gray-500" />
                            <span className="text-sm font-mono tabular-nums tracking-normal text-gray-500">
                              {viewCount}
                            </span>
                          </div>
                        )}

                        {/* 7. Action Links */}
                        {selectedItem.followDescription && (
                          <p className="mb-6 max-w-2xl text-base md:text-lg leading-relaxed text-gray-300">
                            {selectedItem.followDescription}
                          </p>
                        )}
                        <div className="flex flex-wrap justify-center gap-4 mb-4 w-full max-w-2xl">
                          {/* FIX: Check Array.isArray() before mapping */}
                          {Array.isArray(selectedItem.links) && selectedItem.links.map((link, idx) => (
                            <a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-red-500 hover:text-white transition-all duration-300 rounded-full group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                            >
                              <span className="font-mono text-xs uppercase tracking-widest font-bold">
                                {link.label}
                              </span>
                              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                          ))}
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
