import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck } from 'lucide-react';

export function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          // Animate from bottom of the screen
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: '0%' }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="
            fixed bottom-0 left-0 right-0 z-50
            flex items-center justify-between w-full
            px-6 py-3
            bg-black/80 backdrop-blur-lg
            border-t border-gray-800/50
          "
          role="alert"
        >
          {/* Left side: Icon and Text */}
          <div className="flex items-center space-x-3">
            <ShieldCheck className="size-5 flex-shrink-0 text-red-400" />
            {/* Responsive text: shorter on mobile, longer on larger screens */}
            <p className="text-sm font-mono text-gray-300 hidden sm:block">
              Мы не используем cookie и не собираем никаких персональных данных.
            </p>
            <p className="text-sm font-mono text-gray-300 sm:hidden">
              Мы не собираем ваши данные.
            </p>
          </div>

          {/* Right side: Dismiss Button */}
          <motion.button
            onClick={() => setIsVisible(false)}
            className="
              flex-shrink-0 px-5 py-2 rounded-full
              bg-red-500/90 hover:bg-red-500
              text-white text-sm font-mono tracking-wide
              transition-colors duration-200
            "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Спасибо, понятно"
          >
            Спасибо
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}