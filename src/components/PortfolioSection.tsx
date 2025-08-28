import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ExternalLink, Play, Award, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import mechtyOStarosti from '@/assets/images/portfolio/mechty-o-starosti.webp'
import spiachka from '@/assets/images/portfolio/spiachka.webp'
import kapiITapi from '@/assets/images/portfolio/kapi-i-tapi.webp'
import obyknovennyiDrakon from '@/assets/images/portfolio/obyknovennyi-drakon.webp'
import chtoIaZdesDelaiu from '@/assets/images/portfolio/chto-ia-zdes-delaiu.webp'
import blokadnaiaMozaika from '@/assets/images/portfolio/blokadnaia-mozaika.webp'
import bumZemliKakEtoBylo from '@/assets/images/portfolio/bum-zemli-kak-eto-bylo.webp'
import gospodinVelikii from '@/assets/images/portfolio/gospodin-velikii.webp'
import mifyOGefesteBogeIStroiotriade from '@/assets/images/portfolio/mify-o-gefeste-boge-i-stroiotriade.webp'
import strashnyiGorod from '@/assets/images/portfolio/strashnyi-gorod.webp'

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
    title: "Анимационные вставки и титры для фильма А. Федорченко «Мифы о Гефесте, Боге и Стройотряде»",
    subtitle: "Полнометражный документальный фильм",
    category: "Анимационные вставки",
    year: "2025",
    description: "Анимационные истории о жизни Гефеста-бога, рассказанные с помощью значков, рисунков и нашивок на стройотрядовской спецовке - целинке.",
    image: mifyOGefesteBogeIStroiotriade,
    size: "large",
    isVideo: false,
  },
  {
  id: 2,
  title: "Страшный город",
  subtitle: "Документальная анимация",
  category: "Короткометражный анимационный фильм",
  year: "2024",
  description: "Иммерсивная анимация, разворачивающаяся перед колесами ночного трамвая. Три страшные истории, которые случились с тремя разными героями в городе Екатеринбурге.",
  image: strashnyiGorod,
  size: "large",
  isVideo: false,
  },
    {
  id: 3,
  title: "«Бум Земли. Как это было»",
  subtitle: "Телеграм-канал и подкаст",
  category: "Продвижение",
  year: "2024-",
  description: "История и хроники создания первого уральского анимационного сериала «Бум Земли»",
  image: bumZemliKakEtoBylo,
  size: "large",
  isVideo: false,
  },
    {
  id: 4,
  title: "Анимационные вставки в фильм Э.Тухарели «Господин Великий»",
  subtitle: "Полнометражный документальный фильм",
  category: "Анимационные вставки",
  year: "2024",
  description: "Ожившие летописные иллюстрации повествуют об истории становления Новгородского музейного комплекса и его преобразований в связи с приходом нового директора.",
  image: gospodinVelikii,
  size: "large",
  isVideo: false,
  },
    {
  id: 5,
  title: "Разработка анимационной технологии для проекта А. Федорченко «Блокадная мозаика»",
  subtitle: "Полнометражный игровой фильм",
  category: "Анимационные вставки",
  year: "2024",
  description: "Рассказывание блокадных историй с помощью оживших объемных скульптур из мозаичной смальты",
  image: blokadnaiaMozaika,
  size: "large",
  isVideo: false,
  },
  {
    id: 6,
    title: "Мечты о старости",
    subtitle: "Лаборатория, веб-сериал, радость жизни",
    category: "Социокультурный проект",
    year: "",
    description: "Анимационные шортсы из жизни двух пожилых соседей. Мы хотели бы напомнить пожилым людям, а заодно и самим себе, как получать удовольствие от мгновений, чувствовать настоящее, радоваться тому, что есть, и не скорбеть о том, что уже ушло и потеряно.",
    image: mechtyOStarosti,
    size: "large",
    isVideo: false,
  },
  {
    id: 7,
    title: "Спячка",
    subtitle: "Фэнтези для подростков",
    category: "Полнометражный анимационный фильм",
    year: "",
    description: "Паркурщица и пранкерша, лесная мышка Соня, считающая сон самым скучным занятием на свете, впадает в спячку против своей воли и путешествует по миру чужих сновидений в поисках выхода и себя",
    image: spiachka,
    size: "large",
    isVideo: false,
  },
  {
    id: 8,
    title: "Капи и Тапи",
    subtitle: "Плюшевые приключения в дебрях Амазонки",
    category: "Анимационный сериал",
    year: "",
    description: "Две подружки Капибара и Тапир вместе с хищным другом Ягуаром каждый день делают невозможное возможным.",
    image: kapiITapi,
    size: "large",
    isVideo: false,
  },
  {
    id: 9,
    title: "Обыкновенный дракон",
    subtitle: "Не брызгай кетчупом на мой гобелен .",
    category: "Анимационный сериал",
    year: "",
    description: "Очень правильный дракон знакомится с очень неправильной королевской семьей.",
    image: obyknovennyiDrakon,
    size: "large",
    isVideo: false,
  },
  {
    id: 10,
    title: "Что я здесь делаю?",
    subtitle: "Докуменотально-анимационная комедия",
    category: "Полнометражный фильм",
    year: "",
    description: "Две девушки решают покорить кинематограф самым неочевидным способом.",
    image: chtoIaZdesDelaiu,
    size: "large",
    isVideo: false,
  }
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