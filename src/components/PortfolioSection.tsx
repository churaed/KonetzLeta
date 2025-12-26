import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ExternalLink, Play, Award, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PortfolioVideoPlayer } from './PortfolioVideoPlayer';

import mechtyOStarosti from '@/assets/images/portfolio/mechty-o-starosti.webp'
import spiachka from '@/assets/images/portfolio/spiachka.webp'
import kapiITapi from '@/assets/images/portfolio/kapi-i-tapi.webp'
import obyknovennyiDrakon from '@/assets/images/portfolio/obyknovennyi-drakon.webp'
import chtoIaZdesDelaiu from '@/assets/images/portfolio/chto-ia-zdes-delaiu.webp'
import blokadnaiaMozaika from '@/assets/images/portfolio/blokadnaia-mozaika02.webp'
import bumZemliKakEtoBylo from '@/assets/images/portfolio/bum-zemli-kak-eto-bylo.webp'
import gospodinVelikii from '@/assets/images/portfolio/gospodin-velikii.webp'
import mifyOGefesteBogeIStroiotriade from '@/assets/images/portfolio/mify-o-gefeste-boge-i-stroiotriade.webp'
import strashnyiGorod from '@/assets/images/portfolio/strashnyi-gorod.webp'
import peizazhSOzhidaniem from '@/assets/images/portfolio/peizazh-s-ozhidaniem.webp'
import novyiVkus from '@/assets/images/portfolio/novyi-vkus.webp'

type ProjectStatus = 'released' | 'in_production' | 'in_development';

interface PortfolioItem {
  id: number;
  title: string;
  subtitle: string; // Genre/Mood/Year
  tagline?: string; // New short description for grid hover
  status: ProjectStatus;
  description: string;
  credits?: string;
  image: string;
  size: 'small' | 'medium' | 'large';
  videoUrl?: string; // Presence of this URL determines if it's a video
  awards?: string[];
  links?: { label: string; url: string }[];
  component?: React.ReactNode;
}

export function PortfolioSection() {
  const { t } = useTranslation();
  
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
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showAllAwards, setShowAllAwards] = useState(false);

  useEffect(() => {
    setShowAllAwards(false);
  }, [selectedId]);

  const portfolioItems: PortfolioItem[] = [
    // Landscape Waiting / Пейзаж с ожиданием
    {
      id: 5,
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
      title: t('portfolio.items.blokadnaia.title'),
      subtitle: t('portfolio.items.blokadnaia.subtitle'),
      tagline: t('portfolio.items.blokadnaia.tagline', { defaultValue: '' }),
      status: 'released',
      description: t('portfolio.items.blokadnaia.description'),
      image: blokadnaiaMozaika,
      size: "medium",
      videoUrl: t('portfolio.items.blokadnaia.video'),
    },
    // Dreams of Old Age / Мечты о старости
    {
      id: 60,
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
    }
  ];
  
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

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedId === null) return;
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedId);
    const nextIndex = (currentIndex + 1) % portfolioItems.length;
    setSelectedId(portfolioItems[nextIndex].id);
  }, [selectedId, portfolioItems]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedId === null) return;
    const currentIndex = portfolioItems.findIndex(item => item.id === selectedId);
    const prevIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
    setSelectedId(portfolioItems[prevIndex].id);
  }, [selectedId, portfolioItems]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedId === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedId(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, handleNext, handlePrev]);

  const selectedItem = portfolioItems.find(item => item.id === selectedId);

  // Helper to get embed URL (Basic YouTube/Vimeo/Drive support)
  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1] || url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&modestbranding=1&rel=0`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
    }
    if (url.includes('drive.google.com')) {
      return url.replace('/view?usp=sharing', '/preview').replace('/view', '/preview');
    }
    return null;
  };

  // Helper to determine if a URL is local
  const isLocalVideo = (url: string) => {
    return url && (url.startsWith('/video/') || url.endsWith('.mp4') || url.endsWith('.webm'));
  };

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
            <motion.div
              key={item.id}
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
              onClick={() => setSelectedId(item.id)}
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
                      className="text-[10px] font-mono text-red-400 mb-2 uppercase tracking-[0.2em]"
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
            </motion.div>
          ))}
        </motion.div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedId && selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-xl"
              onClick={() => setSelectedId(null)}
            >

              {/* Navigation Arrows */}
              <button
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
                onClick={handlePrev}
              >
                <ChevronLeft size={40} />
              </button>

              <button
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
                onClick={handleNext}
              >
                <ChevronRight size={40} />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-6xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute -top-12 right-0 md:-right-12 md:top-0 z-50 p-2 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full backdrop-blur-sm transition-all"
                  onClick={() => setSelectedId(null)}
                >
                  <X size={24} />
                </button>

                <div className="relative w-full bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex flex-col max-h-[85vh]">
                  <div className="flex flex-col w-full h-full overflow-hidden">


                    {/* Content Section */}
                    {/* OPTION 2: Centered "Festival" Layout */}
                    <div className="w-full flex flex-col overflow-y-auto custom-scrollbar flex-1 bg-gray-900 min-h-0">

                      {/* Top Element: Poster/Media (Fixed Height for cinematic feel) */}
                      <div className="w-full h-[45vh] md:h-[55vh] relative bg-black shrink-0 border-b border-gray-800">
                        {selectedItem.videoUrl && getEmbedUrl(selectedItem.videoUrl) ? (
                          <iframe
                            key={selectedItem.id}
                            src={getEmbedUrl(selectedItem.videoUrl) || ''}
                            className="w-full h-full object-cover"
                            title={selectedItem.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : selectedItem.videoUrl && isLocalVideo(selectedItem.videoUrl) ? (
                          <PortfolioVideoPlayer
                            key={selectedItem.id}
                            videoUrl={selectedItem.videoUrl}
                            poster={selectedItem.videoUrl.replace(/\.(mp4|webm)$/, '.webp')}
                            overlayTitle={selectedItem.title}
                            overlaySubtitle={selectedItem.subtitle}
                          />
                        ) : (
                          <>
                            <ImageWithFallback
                              src={selectedItem.image}
                              alt={selectedItem.title}
                              className="w-full h-full object-contain md:object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                          </>
                        )}
                      </div>

                      {/* Editorial Content Layout */}
                      <div className="relative px-6 py-12 md:py-16 md:px-20 flex flex-col items-center text-center">
                        
                        {/* 1. Meta Eyebrow */}
                        <div className="flex items-center gap-3 text-xs md:text-sm font-mono uppercase tracking-widest text-gray-500 mb-6">
                           <span className={selectedItem.status === 'released' ? 'text-green-400' : 'text-blue-400'}>
                             {getStatusLabel(selectedItem.status)}
                           </span>
                           <span className="w-1 h-1 bg-gray-600 rounded-full" />
                           <span className="text-gray-400">{selectedItem.subtitle}</span>
                        </div>

                        {/* 2. Title (Huge Serif) */}
                        <h2 className="text-5xl md:text-7xl font-cormorant italic text-white mb-8 leading-none max-w-4xl">
                          {selectedItem.title}
                        </h2>

                        {/* 3. Awards (Centered Row) */}
                        {selectedItem.awards && selectedItem.awards.length > 0 && (
                          <div className="mb-10 w-full max-w-4xl">
                            <motion.div 
                              layout
                              className="flex flex-wrap justify-center gap-x-6 gap-y-3"
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
                        <div className="prose prose-invert prose-lg max-w-2xl mb-12 text-center">
                           <p className="text-gray-300 font-light leading-relaxed text-lg md:text-xl inline-block whitespace-pre-line">
                             {selectedItem.description}
                           </p>
                        </div>

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

                        {/* 7. Action Links */}
                        <div className="flex flex-wrap justify-center gap-4 mb-4">
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
                          
                          {/* Fallback for projects with only videoUrl and no explicit links */}
                          {(!Array.isArray(selectedItem.links) || selectedItem.links.length === 0) && selectedItem.videoUrl && (
                            <a
                              href={selectedItem.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black hover:bg-red-500 hover:text-white transition-all duration-300 rounded-full group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]"
                            >
                              <span className="font-mono text-xs uppercase tracking-widest font-bold">
                                {t('portfolio.watch_project')}
                              </span>
                              <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                          )}
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