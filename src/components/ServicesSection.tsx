import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Film, Tv, Microscope, Trophy, Building, Drama } from 'lucide-react';

// Define interface for service data structure
interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  audience: string;
  examples: string[];
  gradient: string;
}

// Array of service objects with detailed information
const services: Service[] = [
  {
    icon: Film,
    title: "Полные метры и сериалы",
    description: "Авторские анимационные проекты полного цикла — от концепции до финального монтажа. Мы создаём истории, которые остаются в сердцах зрителей.",
    audience: "Дистрибьюторы",
    examples: ["Полнометражные фильмы", "Телесериалы", "Веб-сериалы", "Авторское кино"],
    gradient: "from-red-500 to-pink-500"
  },
  {
    icon: Tv,
    title: "Анимационные вставки и титры",
    description: "Графические и анимационные решения — от метафоричных вставок до выразительных титров и заставок. Они дополняют фильмы и игры, превращая идеи в образы и задавая тон с первых до последних кадров.",
    audience: "Кинопродюсеры",
    examples: [ "Визуальные эффекты", "Анимированная графика", "Открывающие/Финальные титры", "Фантазийные сцены" ,"Анимадок"],
    gradient: "from-orange-500 to-red-500"
  },
  {
    icon: Drama,
    title: "Анимационное сопровождение спектаклей",
    description: "Анимационный видеоарт для вашей театральной постановки. Визуальная поэзия на сцене.",
    audience: "Театральные продюсеры",
    examples: [
      "Анимированные персонажи",
      "Анимированные фоны",
      "Анимированные сцены",
      "Визуальные спецэффекты"
    ],
    gradient: "from-amber-500 to-orange-500"
  },
  {
    icon: Microscope,
    title: "Научпоп анимация",
    description: "Превращаем сложные научные концепции в увлекательные визуальные истории. Наука становится искусством.",
    audience: "Хай-тек бизнес",
    examples: ["Обучающие фильмы", "Корпоративные презентации", "Технические визуализации", "Продуктовые демо"],
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Trophy,
    title: "Фестивальные проекты",
    description: "Создаём атмосферу и идентичность фестивалей через анимацию. От заставок до полного визуального оформления.",
    audience: "Организаторы фестивалей",
    examples: ["Фестивальные заставки", "Церемонии открытия", "Номинационные ролики", "Брендинг событий"],
    gradient: "from-purple-500 to-blue-500"
  },
  {
    icon: Building,
    title: "Музейные инсталляции",
    description: "Видеоэкспонаты, VR-инсталляции и комплексное видеобрендирование музеев и галерей. Искусство в диалоге с технологиями.",
    audience: "Директора музеев и галерей",
    examples: ["VR инсталляции", "Видеоэкспонаты", "Музейный брендинг", "Интерактивные выставки"],
    gradient: "from-green-500 to-emerald-500"
  }
];

// Main ServicesSection component
export function ServicesSection() {
  // Reference for the section container
  const containerRef = useRef(null);
  // Track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Calculate background position based on scroll progress
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Check if section is in view for animations
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      {/* Animated background with gradient circles */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-red-500 to-pink-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-orange-500 to-red-500 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section header with animated title and description */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 space-y-8"
        >
          <h2 className="text-6xl md:text-8xl font-cormorant italic text-white leading-tight">
            Услуги
          </h2>

          {/* Animated underline for section title */}
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          <p className="text-xl font-cormorant italic text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Каждый проект — это диалог между художником и зрителем,
            <br />
            между технологией и душой, между идеей и её воплощением.
          </p>
        </motion.div>

        {/* Grid of service cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Individual service card component
function ServiceCard({ service, index }: { service: Service; index: number }) {
  // Reference for the card element
  const cardRef = useRef(null);
  // Check if card is in view for animations
  const cardInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      className="relative group h-full"
      initial={{
        opacity: 0,
        y: 100,
        rotateY: -30,
        transformPerspective: 1000
      }}
      animate={cardInView ? {
        opacity: 1,
        y: 0,
        rotateY: 0,
      } : {
        opacity: 0,
        y: 100,
        rotateY: -30
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      whileHover={{
        y: -15,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-800/50 h-full flex flex-col">
        {/* Gradient border effect that appears on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, transparent, rgba(248, 113, 113, 0.3), transparent)`,
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "subtract",
          }}
        />

        {/* Service icon with gradient background */}
        <motion.div
          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 relative`}
          whileHover={{
            scale: 1.1,
            rotate: 5,
            transition: { type: "spring", stiffness: 400 }
          }}
        >
          <service.icon size={28} className="text-white" />
          <motion.div
            className="absolute inset-0 rounded-xl bg-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Card content with title, description, audience, and examples */}
        <motion.div
          className="flex-1 flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        >
          <h3 className="text-2xl font-cormorant italic text-white mb-4 leading-tight">
            {service.title}
          </h3>

          <p className="text-gray-300 font-mono text-sm leading-relaxed mb-6 flex-1">
            {service.description}
          </p>

          {/* Audience badge */}
          <div className="mb-6">
            <motion.div
              className="inline-block px-3 py-1 bg-red-400/20 border border-red-400/30 rounded-full"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="text-xs font-mono text-red-400 tracking-wider">
                {service.audience}
              </span>
            </motion.div>
          </div>

          {/* List of examples with animated bullet points */}
          <div className="space-y-2">
            {service.examples.map((example, exampleIndex) => (
              <motion.div
                key={exampleIndex}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={cardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1 + 0.5 + exampleIndex * 0.1
                }}
              >
                <motion.div
                  className="w-1 h-1 bg-red-400 rounded-full"
                  whileHover={{ scale: 2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                <span className="text-xs text-gray-500 font-mono">{example}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Hover effect overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        />
      </div>
    </motion.div>
  );
}