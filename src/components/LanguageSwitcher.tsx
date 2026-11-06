import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'motion/react';

export function LanguageSwitcher() {
    const reducedMotion = useReducedMotion();
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(newLang);
    };

    return (
        <motion.button
            onClick={toggleLanguage}
            className="text-white/80 hover:text-white font-mono text-sm tracking-wider uppercase transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            whileHover={reducedMotion ? undefined : { scale: 1.05 }}
            whileTap={reducedMotion ? undefined : { scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
        >
            {i18n.language === 'ru' ? 'EN' : 'RU'}
        </motion.button>
    );
}
