import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(newLang);
    };

    return (
        <motion.button
            onClick={toggleLanguage}
            className="text-white/80 hover:text-white font-mono text-sm tracking-wider uppercase transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {i18n.language === 'ru' ? 'EN' : 'RU'}
        </motion.button>
    );
}
