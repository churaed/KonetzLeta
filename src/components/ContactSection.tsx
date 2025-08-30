import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Phone, MapPin, ArrowRight, Send, Heart, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "konetzleta@gmail.com",
      action: "mailto:konetzleta@gmail.com"
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "+79041745621",
      action: "https://wa.me/79041745621"
    },
    {
      icon: Phone,
      label: "Телефон",
      value: "+79022610028",
      action: "tel:+79022610028"
    },
    {
      icon: MapPin,
      label: "Студия",
      value: "Екатеринбург, Россия",
      action: "#"
    }
  ];

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-red-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
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
            Связаться
            <br />
            <span className="text-red-400">с нами</span>
          </h2>
          
          <motion.div
            className="w-32 h-px bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-xl font-cormorant italic text-gray-300 leading-relaxed">
              У вас есть идея? Мы готовы её оживить.
              <br />
              Расскажите нам о своём проекте — и мы найдём способ удивить.
            </p>
            
            <p className="text-sm font-mono text-gray-500 tracking-wide">
              Обычно отвечаем в течение 24 часов
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-3xl font-cormorant italic text-white mb-4">
              Начнём диалог
            </h3>
            <p className="text-gray-400 font-mono text-sm mb-8 leading-relaxed">
              Расскажите о вашем проекте, целях, аудитории и временных рамках. 
              Мы любим амбициозные задачи и нестандартные решения.
            </p>
          </div>
      
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <label className="block text-sm font-mono text-gray-300 mb-2 tracking-wide">
                  Имя
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-400 focus:outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="Ваше имя"
                />
              </motion.div>
      
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label className="block text-sm font-mono text-gray-300 mb-2 tracking-wide">
                  Компания
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-400 focus:outline-none transition-all duration-300 font-mono text-sm"
                  placeholder="Ваша компания"
                />
              </motion.div>
            </div>
      
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <label className="block text-sm font-mono text-gray-300 mb-2 tracking-wide">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-400 focus:outline-none transition-all duration-300 font-mono text-sm"
                placeholder="your@email.com"
              />
            </motion.div>
      
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <label className="block text-sm font-mono text-gray-300 mb-2 tracking-wide">
                Тип проекта
              </label>
              <select className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-red-400 focus:outline-none transition-all duration-300 font-mono text-sm">
                <option value="">Выберите тип проекта</option>
                <option value="full-length">Полный метр / Сериал</option>
                <option value="animation-inserts">Анимационные вставки и титры</option>
                <option value="titles">Анимационное сопровождение спектаклей</option>
                <option value="educational">Научпоп анимация</option>
                <option value="festival">Фестивальный проект</option>
                <option value="museum">Музейная инсталляция</option>
                <option value="other">Другое</option>
              </select>
            </motion.div>
      
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <label className="block text-sm font-mono text-gray-300 mb-2 tracking-wide">
                Расскажите о проекте
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-red-400 focus:outline-none transition-all duration-300 resize-none font-mono text-sm leading-relaxed"
                placeholder="Опишите вашу идею, цели, аудиторию, временные рамки и бюджет. Мы любим подробности и амбициозные планы..."
              />
            </motion.div>
      
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-mono py-4 rounded-lg group transition-all duration-300 border border-red-400/50"
              >
                <motion.div 
                  className="flex items-center justify-center space-x-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Send size={18} />
                  <span className="tracking-wide">Отправить сообщение</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Button>
            </motion.div>
          </form>
        </motion.div>
      
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-3xl font-cormorant italic text-white mb-4">
              Давайте знакомиться
            </h3>
            <p className="text-gray-400 font-mono text-sm mb-8 leading-relaxed">
              Мы всегда рады обсудить новые проекты и поделиться идеями. 
              Кофе, чай или просто хороший разговор — выбирайте!
            </p>
          </div>
      
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.action}
                className="flex items-center space-x-4 p-4 rounded-lg bg-gray-900/30 border border-gray-800/50 hover:border-red-400/50 transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <method.icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-mono tracking-wide">{method.label}</div>
                  <div className="text-white font-mono text-sm group-hover:text-red-400 transition-colors">
                    {method.value}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
      
          {/* Philosophy box */}
          <motion.div
            className="p-6 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-red-400/20"
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
          </motion.div>
      
          {/* Social preview text */}
          <motion.div
            className="text-center p-6 rounded-lg border border-gray-800/50 bg-black/30"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="text-sm font-mono text-gray-500 italic leading-relaxed">
              "Конец лета" — студия авторской коммерческой анимации
            </p>
          </motion.div>
        </motion.div>
      </div>

      </div>
    </section>
  );
}