import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Play, Award, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Последний кадр",
    subtitle: "Полнометражный фильм",
    category: "Авторское кино",
    year: "2024",
    description: "История о режиссёре, который ищет последний кадр для своего фильма в лабиринтах собственной памяти.",
    image: "https://images.unsplash.com/photo-1489599162653-5123c83bc2cb?w=800&h=600&fit=crop",
    size: "large",
    isVideo: true,
    awards: ["Гран-при Суздаль", "Лучшая анимация ММКФ"],
  },
  {
    id: 2,
    title: "Квантовые сны",
    subtitle: "Научпоп сериал",
    category: "Образовательный контент",
    year: "2024",
    description: "8-серийный анимационный сериал о квантовой физике для подростков. Сложные концепции через поэтические метафоры.",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop",
    size: "medium",
    isVideo: true,
  },
  {
    id: 3,
    title: "Титры Горького",
    subtitle: "Открывающие титры",
    category: "Кинематограф",
    year: "2023",
    description: "Анимированные титры для фильма 'Мать' в постановке театра им. Горького.",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=300&fit=crop",
    size: "small",
  },
  {
    id: 4,
    title: "Музей будущего",
    subtitle: "VR инсталляция",
    category: "Интерактив",
    year: "2023",
    description: "Иммерсивная VR-инсталляция для Государственного музея изобразительных искусств им. А.С. Пушкина.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    size: "medium",
    isVideo: true,
    awards: ["Золотая пчела"],
  },
  {
    id: 5,
    title: "Фестиваль 'Артдокфест'",
    subtitle: "Заставки и брендинг",
    category: "Фестивальный контент",
    year: "2023",
    description: "Комплексный визуальный язык фестиваля документального кино: от заставок до церемонии закрытия.",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop",
    size: "small",
  },
  // {
  //   id: 6,
  //   title: "Цифровая экосистема",
  //   subtitle: "Корпоративная анимация",
  //   category: "Коммерческий проект",
  //   year: "2024",
  //   description: "Серия анимированных роликов для IT-компании: от объяснения продукта до внутренних коммуникаций.",
  //   image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
  //   size: "medium",
  //   isVideo: true,
  // },
];

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

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
            Заготовки <span className="text-red-400">на зиму</span>
          </h2>
          
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <p className="text-xl font-cormorant italic text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Каждая работа — это диалог с времением,
            <br />
            каждый проект — попытка остановить мгновение.
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
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent"
                  initial={{ opacity: 0.7 }}
                  animate={{ 
                    opacity: hoveredItem === item.id ? 0.9 : 0.7 
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Awards */}
                {item.awards && (
                  <motion.div
                    className="absolute top-4 left-4 flex items-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Award size={16} className="text-red-400" />
                    <span className="text-xs font-mono text-red-400">Награды</span>
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

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: hoveredItem === item.id ? 0 : 10, 
                      opacity: 1 
                    }}
                    transition={{ duration: 0.3 }}
                  >
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

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-cormorant italic text-white mb-1 leading-tight">
                      {item.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-sm font-mono text-gray-400 mb-3">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <motion.p
                      className="text-gray-300 text-sm font-mono leading-relaxed mb-4"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: hoveredItem === item.id ? "auto" : 0,
                        opacity: hoveredItem === item.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.description}
                    </motion.p>

                    {/* Awards list */}
                    {item.awards && (
                      <motion.div
                        className="space-y-1 mb-4"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: hoveredItem === item.id ? "auto" : 0,
                          opacity: hoveredItem === item.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {item.awards.map((award, awardIndex) => (
                          <div key={awardIndex} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-red-400 rounded-full" />
                            <span className="text-xs font-mono text-red-400">
                              {award}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Action button */}
                  <motion.button
                    className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: hoveredItem === item.id ? 0 : 20,
                      opacity: hoveredItem === item.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-sm font-mono tracking-wide">Смотреть проект</span>
                    <ExternalLink size={14} />
                  </motion.button>
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
      </div>
    </section>
  );
}