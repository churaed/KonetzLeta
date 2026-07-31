import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, PlayCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Contact section component
export function ContactSection() {
  const { t } = useTranslation();
  // Ref for scroll-based animation
  const ref = useRef(null);
  // Hook to check if the component is in view for animations
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Defines contact methods with icons, labels, values, and actions
  const contactMethods = [
    {
      icon: Mail,
      label: t('contact.email'),
      value: "konetzleta@gmail.com",
      action: "mailto:konetzleta@gmail.com",
      disabled: false,
      multiline: false
    },
    {
      icon: Send,
      label: t('contact.telegram'),
      value: "t.me/konetzleta",
      action: "https://t.me/konetzleta",
      disabled: false,
      multiline: false
    },
    {
      icon: Instagram,
      label: t('contact.instagram'),
      value: "@endofsummer.fun",
      action: "https://www.instagram.com/endofsummer.fun?igsh=a2FjcjJhc2N6N3Fw",
      disabled: false,
      multiline: false
    },
    {
      icon: PlayCircle,
      label: t('contact.rutube'),
      value: t('contact.rutube_value'),
      action: undefined,
      disabled: true,
      multiline: false
    },
    {
      icon: Phone,
      label: t('contact.phone'),
      value: "+79022610028",
      action: "tel:+79022610028",
      disabled: false,
      multiline: false
    },
    {
      icon: MapPin,
      label: t('contact.studio'),
      value: t('contact.studio_address'),
      action: "https://xlebozavod6.ru/",
      disabled: false,
      multiline: true
    }
  ];

  return (
    // Main contact section with background gradient
    <section id="contact" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background animation for visual flair */}
      <div className="absolute inset-0 opacity-10">
        {/* Renders multiple animated dots */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-red-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            // Animates opacity and scale of each dot
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            // Defines animation transitions
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section title and introductory text */}
        <motion.div
          ref={ref}
          // Animation for the title block
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20 space-y-8"
        >
          {/* Main heading */}
          <h2 className="text-6xl md:text-8xl font-cormorant italic text-white leading-tight">
            {t('contact.title_part1')}{' '}
            <br />
            <span className="text-red-400">{t('contact.title_part2')}</span>
          </h2>

          {/* Decorative divider line */}
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
            // Animation for the divider
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Introductory paragraph */}
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl font-cormorant italic text-gray-300 leading-relaxed whitespace-pre-line">
              {t('contact.intro')}
            </p>
          </div>
        </motion.div>


        {/* Contact Information section */}
        <motion.div
          // Animation for the contact info block
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8"
        >

          {/* Renders contact methods dynamically */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => {
              // Shared animation + inner content for every card variant
              const motionProps = {
                initial: { opacity: 0, y: 20 },
                animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
                transition: { duration: 0.6, delay: 0.6 + index * 0.1 }
              };
              const valueClass = method.multiline
                ? "text-white font-mono text-sm whitespace-pre-line leading-snug"
                : "text-white font-mono text-sm group-hover:text-red-400 transition-colors";
              const inner = (
                <>
                  {/* Icon for the contact method */}
                  <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-red-400 to-red-300 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <method.icon size={18} className="text-white" />
                  </div>
                  {/* Label and value for the contact method */}
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500 font-mono tracking-wide">{method.label}</div>
                    <div className={valueClass}>{method.value}</div>
                  </div>
                </>
              );
              // Disabled cards (e.g. Rutube before launch) render as inert divs
              if (method.disabled) {
                return (
                  <motion.div
                    key={index}
                    {...motionProps}
                    aria-disabled="true"
                    className="group flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 opacity-50 cursor-not-allowed"
                  >
                    {inner}
                  </motion.div>
                );
              }
              return (
                <motion.a
                  key={index}
                  href={method.action}
                  target={method.action?.startsWith('http') ? '_blank' : undefined}
                  rel={method.action?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:border-red-500/50 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/10"
                  {...motionProps}
                >
                  {inner}
                </motion.a>
              );
            })}
          </div>

          {/* // Philosophy statement box
          <motion.div
            className="p-6 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-400/20"
            // Animation for the philosophy box
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <Heart size={20} className="text-red-400" />
              <h4 className="text-lg font-cormorant italic text-white">
                Наша философия
              </h4>
            </div>

            <p className="text-gray-400 font-mono text-sm leading-relaxed">
              «Панк жив, искусство вечно» — мы верим, что каждый проект должен
              нести в себе частичку бунтарского духа и художественной правды.
              Технологии служат искусству, а не наоборот.
            </p>
          </motion.div> */}

          {/* Social media preview text */}
          <motion.div
            className="text-center p-6 rounded-lg border border-gray-800/50 bg-black/30"
            // Animation for the social preview text
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-sm font-mono text-gray-500 italic leading-relaxed whitespace-pre-line">
              {t('contact.legal_info')}
            </p>

          </motion.div>
        </motion.div>


      </div>
    </section>
  );
}