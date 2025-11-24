import { motion, useInView, AnimatePresence } from 'motion/react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ExternalLink, Play, Award, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface PortfolioItem {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  image: string;
  size: 'small' | 'medium' | 'large';
  isVideo?: boolean;
  awards?: string[];
  url?: string;
  component?: React.ReactNode;
}

export function PortfolioSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const portfolioItems: PortfolioItem[] = [
    {
      id: 999,
      title: "Test Project Title",
      subtitle: "Test Project Subtitle",
      category: "Test Category",
      year: "2025",
      description: "This is a detailed description for testing purposes. It should be long enough to test the scrolling behavior in the modal. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Deserunt sint dolor velit velit irure qui culpa magna incididunt. Esse dolore dolor deserunt commodo aliquip sit ipsum voluptate amet. Velit aute duis culpa Lorem laboris amet duis pariatur cupidatat minim sint. Enim proident laborum ullamco nulla eu anim. Excepteur elit enim aliqua. Aute dolor ea ad eu minim et. Sint amet cillum fugiat ad esse do deserunt eu irure aliqua aute qui ipsum elit. Est cupidatat duis ea mollit.Eiusmod nostrud nisi magna dolor ea dolor anim aliqua ullamco laborum amet minim magna nisi. Fugiat aute enim consequat aliqua ad do cillum. Eu amet cupidatat quis aliqua quis exercitation labore et elit dolore nulla commodo. Reprehenderit ea est excepteur dolor ipsum aute cillum ea nisi. Velit do ullamco nulla.Deserunt cillum nostrud dolor fugiat cupidatat Lorem amet adipisicing nostrud culpa. Nulla elit dolor eu proident voluptate occaecat proident. Lorem aliquip enim commodo velit Lorem. Occaecat amet tempor incididunt eiusmod exercitation. Deserunt nostrud eu excepteur excepteur sunt incididunt. Ut magna aliquip ipsum sit eu dolor esse. Eiusmod ad reprehenderit id amet dolore non anim aliqua esse consectetur voluptate minim. Ex adipisicing deserunt anim excepteur nostrud nostrud mollit consequat.",
      image: peizazhSOzhidaniem,
      size: "medium",
      isVideo: true,
      awards: ["Best Test Project 2025", "Gold Medal in Testing", "Audience Award"],
      url: "https://example.com",
    },
    {
      id: 5,
      title: t('portfolio.items.peizazh.title'),
      subtitle: t('portfolio.items.peizazh.subtitle'),
      category: t('portfolio.items.peizazh.category'),
      year: "2025",
      description: t('portfolio.items.peizazh.description'),
      image: peizazhSOzhidaniem,
      size: "medium",
      isVideo: false,
      awards: t('portfolio.items.peizazh.awards', { returnObjects: true }) as string[],
    },
    {
      id: 10,
      title: t('portfolio.items.mify.title'),
      subtitle: t('portfolio.items.mify.subtitle'),
      category: t('portfolio.items.mify.category'),
      year: "2025",
      description: t('portfolio.items.mify.description'),
      image: mifyOGefesteBogeIStroiotriade,
      size: "medium",
      isVideo: false,
    },
    {
      id: 20,
      title: t('portfolio.items.strashnyi.title'),
      subtitle: t('portfolio.items.strashnyi.subtitle'),
      category: t('portfolio.items.strashnyi.category'),
      year: "2024",
      description: t('portfolio.items.strashnyi.description'),
      image: strashnyiGorod,
      size: "medium",
      isVideo: false,
    },
    {
      id: 30,
      title: t('portfolio.items.bum.title'),
      subtitle: t('portfolio.items.bum.subtitle'),
      category: t('portfolio.items.bum.category'),
      year: "2024",
      description: t('portfolio.items.bum.description'),
      image: bumZemliKakEtoBylo,
      size: "medium",
      isVideo: false,
    },
    {
      id: 40,
      title: t('portfolio.items.gospodin.title'),
      subtitle: t('portfolio.items.gospodin.subtitle'),
      category: t('portfolio.items.gospodin.category'),
      year: "2024",
      description: t('portfolio.items.gospodin.description'),
      image: gospodinVelikii,
      size: "medium",
      isVideo: false,
    },
    {
      id: 50,
      title: t('portfolio.items.blokadnaia.title'),
      subtitle: t('portfolio.items.blokadnaia.subtitle'),
      category: t('portfolio.items.blokadnaia.category'),
      year: "2024",
      description: t('portfolio.items.blokadnaia.description'),
      image: blokadnaiaMozaika,
      size: "medium",
      isVideo: false,
    },
    {
      id: 60,
      title: t('portfolio.items.mechty.title'),
      subtitle: t('portfolio.items.mechty.subtitle'),
      category: t('portfolio.items.mechty.category'),
      year: "",
      description: t('portfolio.items.mechty.description'),
      image: mechtyOStarosti,
      size: "medium",
      isVideo: false,
    },
    {
      id: 70,
      title: t('portfolio.items.spiachka.title'),
      subtitle: t('portfolio.items.spiachka.subtitle'),
      category: t('portfolio.items.spiachka.category'),
      year: "",
      description: t('portfolio.items.spiachka.description'),
      image: spiachka,
      size: "medium",
      isVideo: false,
    },
    {
      id: 80,
      title: t('portfolio.items.kapi.title'),
      subtitle: t('portfolio.items.kapi.subtitle'),
      category: t('portfolio.items.kapi.category'),
      year: "",
      description: t('portfolio.items.kapi.description'),
      image: kapiITapi,
      size: "medium",
      isVideo: false,
    },
    {
      id: 90,
      title: t('portfolio.items.drakon.title'),
      subtitle: t('portfolio.items.drakon.subtitle'),
      category: t('portfolio.items.drakon.category'),
      year: "",
      description: t('portfolio.items.drakon.description'),
      image: obyknovennyiDrakon,
      size: "medium",
      isVideo: false,
    },
    {
      id: 100,
      title: t('portfolio.items.chto.title'),
      subtitle: t('portfolio.items.chto.subtitle'),
      category: t('portfolio.items.chto.category'),
      year: "",
      description: t('portfolio.items.chto.description'),
      image: chtoIaZdesDelaiu,
      size: "medium",
      isVideo: false,
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
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800/50">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                  initial={{ opacity: 0.7 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 0.95 : 0.7
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Awards badge (top-left) */}
                {item.awards && (
                  <motion.div
                    className="absolute top-4 left-4 flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Award size={16} className="text-red-400" />
                  </motion.div>
                )}

                {/* Video indicator */}
                {item.isVideo && (
                  <motion.div
                    className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center border border-red-400/30"
                    whileHover={{
                      scale: 1.1,
                      borderColor: "rgba(239, 68, 68, 0.8)"
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Play size={16} className="text-red-400 ml-0.5" />
                  </motion.div>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end h-full">
                  <div>
                    {/* Category and year */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-red-400 tracking-wider">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1 text-xs font-mono text-gray-500">
                        <Calendar size={12} />
                        <span>{item.year}</span>
                      </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-cormorant italic text-white mb-1 leading-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm font-mono text-gray-400 mb-3">
                      {item.subtitle}
                    </p>

                    {/* Collapsible content container - Simplified for grid view */}
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0 }}
                      animate={{
                        height: hoveredItem === item.id ? 'auto' : 0,
                      }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                      <p className="text-gray-300 text-xs font-mono leading-relaxed mb-2 pt-1 line-clamp-3">
                        {item.description}
                      </p>

                    </motion.div>
                  </div>
                </div>

                {/* Decorative border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.3), transparent)",
                    padding: "1px",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "subtract",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
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
              className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-md"
              onClick={() => setSelectedId(null)}
            >

              {/* Navigation Arrows */}
              <button
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
                onClick={handlePrev}
              >
                <ChevronLeft size={40} />
              </button>

              <button
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50"
                onClick={handleNext}
              >
                <ChevronRight size={40} />
              </button>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-5xl"
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
                    <div className="w-full flex flex-col overflow-y-auto custom-scrollbar flex-1 bg-gray-900 min-h-0">
                      {/* Image Section */}
                      <div className="w-full h-[25vh] md:h-[35vh] relative bg-black shrink-0">
                        <ImageWithFallback
                          src={selectedItem.image}
                          alt={selectedItem.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
                      </div>
                      <div className="p-6 md:p-10">
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-mono text-red-400 tracking-wider uppercase">
                              {selectedItem.category}
                            </span>
                            <div className="flex items-center space-x-2 text-sm font-mono text-gray-500">
                              <Calendar size={14} />
                              <span>{selectedItem.year}</span>
                            </div>
                          </div>

                          <h2 className="text-3xl md:text-4xl font-cormorant italic text-white mb-2 leading-tight">
                            {selectedItem.title}
                          </h2>
                          <p className="text-lg font-mono text-gray-400">
                            {selectedItem.subtitle}
                          </p>
                        </div>

                        <div className="prose prose-invert prose-sm max-w-none mb-8">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {selectedItem.description}
                          </p>
                        </div>

                        {selectedItem.awards && (
                          <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="flex items-center space-x-2 mb-3">
                              <Award size={18} className="text-red-400" />
                              <h4 className="text-sm font-mono text-white/90 uppercase tracking-wide">{t('portfolio.awards_title')}</h4>
                            </div>
                            <div className="space-y-2">
                              {selectedItem.awards.map((award, idx) => (
                                <div key={idx} className="flex items-start space-x-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                  <span className="text-sm font-mono text-gray-300">
                                    {award}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mt-auto pt-6 border-t border-gray-800">
                          {(selectedItem.url || selectedItem.component) && (
                            <a
                              href={selectedItem.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center w-full py-3 px-6 bg-white text-black font-mono text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-lg group"
                            >
                              <span>{t('portfolio.watch_project')}</span>
                              <ExternalLink size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
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